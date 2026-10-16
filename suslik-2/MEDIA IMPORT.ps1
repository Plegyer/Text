# Generic local scene-media importer. No user media is redistributed with SUSLIK 2.
param([string]$GameDirectory = $PSScriptRoot)
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing

$root = [System.IO.Path]::GetFullPath($GameDirectory)
$target = Join-Path $root 'assets\user-media\goblin-peace'
$manifest = Join-Path $root 'content\user-media.local.js'

$form = New-Object System.Windows.Forms.Form
$form.Text = 'SUSLIK 2 — Подключение медиа'
$form.Width = 570; $form.Height = 255
$form.StartPosition = 'CenterScreen'
$form.FormBorderStyle = 'FixedDialog'
$form.MaximizeBox = $false

$info = New-Object System.Windows.Forms.Label
$info.Location = New-Object System.Drawing.Point(20,17)
$info.Size = New-Object System.Drawing.Size(515,55)
$info.Text = 'Выберите до пяти файлов изображения или видео для сцены. Форматы: MP4, WebM, PNG, JPG, GIF. Файлы копируются в игру; её код менять не нужно.'
$form.Controls.Add($info)

$chosen = @()
$description = New-Object System.Windows.Forms.Label
$description.Location = New-Object System.Drawing.Point(20,119)
$description.Size = New-Object System.Drawing.Size(510,40)
$description.Text = 'Файлы пока не выбраны.'
$form.Controls.Add($description)

$choose = New-Object System.Windows.Forms.Button
$choose.Text = 'Выбрать файлы…'
$choose.Location = New-Object System.Drawing.Point(20,82)
$choose.Size = New-Object System.Drawing.Size(180,30)
$choose.Add_Click({
  $dialog = New-Object System.Windows.Forms.OpenFileDialog
  $dialog.Filter = 'Медиа (*.mp4;*.webm;*.png;*.jpg;*.jpeg;*.gif)|*.mp4;*.webm;*.png;*.jpg;*.jpeg;*.gif'
  $dialog.Multiselect = $true
  if ($dialog.ShowDialog() -eq [System.Windows.Forms.DialogResult]::OK) {
    $script:chosen = @($dialog.FileNames | Sort-Object)
    if ($script:chosen.Count -gt 5) {
      [System.Windows.Forms.MessageBox]::Show('Допустимо не более пяти файлов.') | Out-Null
      $script:chosen=@();return
    }
    $description.Text = 'Выбрано файлов: ' + $script:chosen.Count
  }
})
$form.Controls.Add($choose)

$import = New-Object System.Windows.Forms.Button
$import.Text = 'Подключить'
$import.Location = New-Object System.Drawing.Point(345,170)
$import.Size = New-Object System.Drawing.Size(100,30)
$import.Add_Click({
  if($script:chosen.Count -eq 0){
    [System.Windows.Forms.MessageBox]::Show('Сначала выберите файлы.') | Out-Null;return
  }
  try {
    New-Item -ItemType Directory -Force -Path $target | Out-Null
    $paths = New-Object System.Collections.Generic.List[string]
    for($i=0; $i -lt $script:chosen.Count; $i++) {
      $ext=[System.IO.Path]::GetExtension($script:chosen[$i]).ToLowerInvariant()
      if($ext -notin @('.mp4','.webm','.png','.jpg','.jpeg','.gif')){throw 'Неподдерживаемый формат.'}
      $name='slot-' + ($i+1).ToString('00') + $ext
      Copy-Item -LiteralPath $script:chosen[$i] -Destination (Join-Path $target $name) -Force
      $paths.Add('assets/user-media/goblin-peace/'+$name)
    }
    # Keep per-user file independent of code and preserve local customizations on updates.
    $safeJson=ConvertTo-Json -InputObject @($paths.ToArray()) -Compress
    if ($script:chosen.Count -eq 1) { $safeJson = '[' + (ConvertTo-Json -InputObject $paths[0] -Compress) + ']' }
    $manifestContents = 'window.SUSLIK2_USER_MEDIA = {farGoblinPermission:' + $safeJson + '};'
    [System.IO.File]::WriteAllText($manifest,$manifestContents,[System.Text.UTF8Encoding]::new($false))
    [System.Windows.Forms.MessageBox]::Show('Файлы подключены. Запустите игру заново, чтобы увидеть изменения.') | Out-Null
    $form.Close()
  }catch {
    [System.Windows.Forms.MessageBox]::Show('Не удалось подключить файлы: ' + $_.Exception.Message) | Out-Null
  }
})
$form.Controls.Add($import)

$cancel = New-Object System.Windows.Forms.Button
$cancel.Text = 'Отмена'
$cancel.Location = New-Object System.Drawing.Point(450,170)
$cancel.Size = New-Object System.Drawing.Size(80,30)
$cancel.Add_Click({$form.Close()})
$form.Controls.Add($cancel)
[void]$form.ShowDialog()
