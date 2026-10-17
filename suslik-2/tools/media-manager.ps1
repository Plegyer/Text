param(
 [string]$GameDirectory = (Split-Path -Parent $PSScriptRoot),
 [string]$EventKey = '',
 [string[]]$Files = @()
)
$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'media-manager-publish.ps1')
$root = [System.IO.Path]::GetFullPath($GameDirectory)
$catalogPath = Join-Path $root 'content\media-manager-slots.json'
$statePath = Join-Path $root 'content\media-manager-state.json'
$jsPath = Join-Path $root 'content\media-manager.local.js'
$catalog = @((Get-Content -LiteralPath $catalogPath -Raw -Encoding UTF8 | ConvertFrom-Json).events)
$allowed = @('.png','.jpg','.jpeg','.webp','.gif','.mp4')
$utf8 = New-Object System.Text.UTF8Encoding($false)
if ($catalog.Count -eq 0) { throw 'Список событий пуст.' }
function Read-MediaState {
 $state = [ordered]@{}
 if (Test-Path -LiteralPath $statePath) {
  $saved = Get-Content -LiteralPath $statePath -Raw -Encoding UTF8 | ConvertFrom-Json
  foreach ($prop in $saved.PSObject.Properties) {
   if ($prop.Name -match '^[a-zA-Z][a-zA-Z0-9]{0,70}$') {
    $state[$prop.Name] = @($prop.Value | Where-Object { $_ -is [string] })
   }
  }
 }
 foreach ($slot in $catalog) { if (-not $state.Contains($slot.key)) { $state[$slot.key] = @() } }
 return $state
}
function Resolve-Slot([string]$id) {
 $slot = @($catalog | Where-Object { $_.id -eq $id })
 if ($slot.Count -ne 1) { throw 'Неизвестное событие.' }
 if ($id -notmatch '^[a-z][a-z0-9-]{1,50}$' -or $slot[0].key -notmatch '^[a-zA-Z][a-zA-Z0-9]{0,70}$') {
  throw 'Недопустимый идентификатор события.'
 }
 return $slot[0]
}
function Existing-Selection($slot) {
 $state = Read-MediaState
 $paths = @()
 foreach ($path in @($state[$slot.key])) {
  if ($path -notmatch '^assets/user-media/manager/[a-z0-9-]+/slot-[0-9][0-9]\.(png|jpg|jpeg|webp|gif|mp4)$') { continue }
  $absolute = Join-Path $root ($path.Replace('/','\'))
  if (Test-Path -LiteralPath $absolute -PathType Leaf) { $paths += $absolute }
 }
 # When the installation is updated, pre-published slots should be visible.
 if ($paths.Count -eq 0) {
  $publishedPath = Join-Path $root 'content\media-manager.published.js'
  if (Test-Path -LiteralPath $publishedPath) {
   $code = [IO.File]::ReadAllText($publishedPath).TrimStart([char]0xFEFF).Trim()
   if ($code -match '(?s)^window\.SUSLIK2_PUBLISHED_MEDIA\s*=\s*(\{.*\})\s*;$') {
    $manifest = $Matches[1] | ConvertFrom-Json
    $entry = $manifest.PSObject.Properties[$slot.key]
    if ($null -ne $entry) {
     foreach ($path in @($entry.Value)) {
      if ($path -notmatch '^assets/user-media/manager/[a-z0-9-]+/slot-[0-9][0-9]\.(png|jpg|jpeg|webp|gif|mp4)$') { continue }
      $absolute = Join-Path $root ($path.Replace('/','\'))
      if (Test-Path -LiteralPath $absolute -PathType Leaf) { $paths += $absolute }
     }
    }
   }
  }
 }
 return ,$paths
}
function Write-Utf8([string]$path,[string]$contents) {
 [System.IO.File]::WriteAllText($path,$contents,$utf8)
}
function Install-Slot($slot,[string[]]$chosen) {
 $max = [int]$slot.maxFiles
 if ($max -lt 1 -or $max -gt 30 -or $chosen.Count -gt $max) { throw "Для события допускается не более $max файлов." }
 $storage = Join-Path $root ('assets\user-media\manager\' + $slot.id)
 $parent = Split-Path -Parent $storage
 New-Item -ItemType Directory -Path $parent -Force | Out-Null
 $tag = [Guid]::NewGuid().ToString('N')
 $stage = Join-Path $parent ('.stage-' + $tag)
 $backup = Join-Path $parent ('.backup-' + $tag)
 $relative = New-Object System.Collections.Generic.List[string]
 $oldState = if (Test-Path -LiteralPath $statePath) { [System.IO.File]::ReadAllText($statePath) } else { $null }
 $oldJS = if (Test-Path -LiteralPath $jsPath) { [System.IO.File]::ReadAllText($jsPath) } else { $null }
 $movedOriginal = $false
 $movedNew = $false
 try {
  New-Item -ItemType Directory -Path $stage -Force | Out-Null
  for ($i=0; $i -lt $chosen.Count; $i++) {
   $file = [System.IO.Path]::GetFullPath($chosen[$i])
   if (-not (Test-Path -LiteralPath $file -PathType Leaf)) { throw "Файл не найден: $file" }
   $ext = [System.IO.Path]::GetExtension($file).ToLowerInvariant()
   if ($allowed -notcontains $ext) { throw "Этот формат не поддерживается: $ext" }
   $name = 'slot-{0:D2}{1}' -f ($i+1),$ext
   Copy-Item -LiteralPath $file -Destination (Join-Path $stage $name) -ErrorAction Stop
   $relative.Add('assets/user-media/manager/'+$slot.id+'/'+$name)
  }
  $state = Read-MediaState
  $state[$slot.key] = @($relative.ToArray())
  $json = ConvertTo-Json -InputObject $state -Depth 5 -Compress
  if (Test-Path -LiteralPath $storage) { Move-Item -LiteralPath $storage -Destination $backup; $movedOriginal = $true }
  Move-Item -LiteralPath $stage -Destination $storage
  $movedNew = $true
  Write-Utf8 $statePath ($json+[Environment]::NewLine)
  Write-Utf8 $jsPath ('window.SUSLIK2_MANAGED_MEDIA = ' + $json + ';' + [Environment]::NewLine)
  if ($movedOriginal) { Remove-Item -LiteralPath $backup -Recurse -Force }
  return $chosen.Count
 } catch {
  if ($movedNew -and (Test-Path -LiteralPath $storage)) { Remove-Item -LiteralPath $storage -Recurse -Force }
  if ($movedOriginal -and (Test-Path -LiteralPath $backup)) { Move-Item -LiteralPath $backup -Destination $storage }
  if ($null -ne $oldState) { Write-Utf8 $statePath $oldState } elseif (Test-Path -LiteralPath $statePath) { Remove-Item -LiteralPath $statePath -Force }
  if ($null -ne $oldJS) { Write-Utf8 $jsPath $oldJS } elseif (Test-Path -LiteralPath $jsPath) { Remove-Item -LiteralPath $jsPath -Force }
  throw
 } finally {
  if (Test-Path -LiteralPath $stage) { Remove-Item -LiteralPath $stage -Recurse -Force }
 }
}
if ($EventKey) {
 $slot = Resolve-Slot $EventKey
 $count = Install-Slot $slot $Files
 Write-Output ("Подключено: $count из " + $slot.maxFiles + " (" + $slot.title + ").")
 return
}
Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing
[System.Windows.Forms.Application]::EnableVisualStyles()
$form = New-Object System.Windows.Forms.Form
$form.Text = 'SUSLIK 2 — Менеджер медиа'
$form.Width = 720; $form.Height = 580
$form.MinimumSize = New-Object System.Drawing.Size(650,540)
$form.StartPosition = 'CenterScreen'
$form.Font = New-Object System.Drawing.Font('Segoe UI',10)
$header = New-Object System.Windows.Forms.Label
$header.SetBounds(20,15,655,42)
$header.Text = 'Выберите событие, добавьте файлы по порядку и нажмите «Опубликовать в GitHub». Медиа не просматриваются.'
$form.Controls.Add($header)
$eventLabel = New-Object System.Windows.Forms.Label
$eventLabel.SetBounds(20,73,150,25);$eventLabel.Text = 'Событие:'
$form.Controls.Add($eventLabel)
$script:pick = New-Object System.Windows.Forms.ComboBox
$script:pick.DropDownStyle = 'DropDownList'
$script:pick.SetBounds(20,103,650,34)
foreach ($entry in $catalog) { [void]$script:pick.Items.Add($entry.title) }
$form.Controls.Add($script:pick)
$script:status = New-Object System.Windows.Forms.Label
$script:status.SetBounds(20,151,650,46)
$form.Controls.Add($script:status)
$script:rows = New-Object System.Windows.Forms.ListBox
$script:rows.SetBounds(20,205,500,247)
$script:rows.Anchor = 'Top,Left,Right,Bottom'
$form.Controls.Add($script:rows)
$script:selected = New-Object 'System.Collections.Generic.List[string]'
function Current-Slot { return $catalog[$script:pick.SelectedIndex] }
function Refresh-List {
 $script:rows.Items.Clear()
 foreach ($file in $script:selected) { [void]$script:rows.Items.Add([System.IO.Path]::GetFileName($file)) }
 $slot = Current-Slot
 $stageNote = if ($slot.connected -eq $true) { 'Используется в игре' } else { 'Ожидает разработки игровой сцены' }
 $script:status.Text = ('Файлов: ' + $script:selected.Count + ' из ' + $slot.maxFiles + '.  ' + $stageNote + '.')
}
$script:pick.Add_SelectedIndexChanged({
 $script:selected.Clear()
 foreach ($file in (Existing-Selection (Current-Slot))) { $script:selected.Add([string]$file) }
 Refresh-List
})
function Add-ManagerButton([string]$label,[int]$x,[int]$y,[int]$w,$handler) {
 $button=New-Object System.Windows.Forms.Button
 $button.Text=$label;$button.SetBounds($x,$y,$w,34)
 $button.Anchor = 'Top,Right'
 $button.Add_Click($handler);$form.Controls.Add($button)
 return $button
}
$add = Add-ManagerButton 'Добавить…' 536 207 135 {
 $slot = Current-Slot
 $remaining = [int]$slot.maxFiles - $script:selected.Count
 if($remaining -lt 1){[System.Windows.Forms.MessageBox]::Show('Для этого события места заполнены.')|Out-Null;return}
 $dialog=New-Object System.Windows.Forms.OpenFileDialog
 $dialog.Title='Выберите изображения или видео для события'
 $dialog.Filter='Изображения и видео|*.png;*.jpg;*.jpeg;*.webp;*.gif;*.mp4'
 $dialog.Multiselect=$true
 if($dialog.ShowDialog() -ne [System.Windows.Forms.DialogResult]::OK){return}
 if($dialog.FileNames.Count -gt $remaining){[System.Windows.Forms.MessageBox]::Show("Можно добавить не более $remaining файлов.")|Out-Null;return}
 foreach($file in $dialog.FileNames){$script:selected.Add($file)}
 Refresh-List
}
$remove = Add-ManagerButton 'Убрать' 536 249 135 {
 $i=$script:rows.SelectedIndex
 if($i -ge 0){$script:selected.RemoveAt($i);Refresh-List}
}
$up = Add-ManagerButton 'Выше ↑' 536 291 135 {
 $i=$script:rows.SelectedIndex
 if($i -gt 0){
  $item=$script:selected[$i];$script:selected.RemoveAt($i);$script:selected.Insert($i-1,$item)
  Refresh-List;$script:rows.SelectedIndex=$i-1
 }
}
$down = Add-ManagerButton 'Ниже ↓' 536 333 135 {
 $i=$script:rows.SelectedIndex
 if($i -ge 0 -and $i -lt $script:selected.Count-1){
  $item=$script:selected[$i];$script:selected.RemoveAt($i);$script:selected.Insert($i+1,$item)
  Refresh-List;$script:rows.SelectedIndex=$i+1
 }
}
$script:save=New-Object System.Windows.Forms.Button
$script:save.Text='Опубликовать в GitHub'
$script:save.SetBounds(275,472,235,38)
$script:save.Anchor='Bottom,Right'
$script:save.Add_Click({
 $chosen=@($script:selected.ToArray())
 if($chosen.Count -eq 0){
  $answer=[System.Windows.Forms.MessageBox]::Show('Удалить все ранее опубликованные файлы этого события из списка игры?', 'Подтверждение', 'YesNo', 'Warning')
  if($answer -ne [System.Windows.Forms.DialogResult]::Yes){return}
 }
 $auth=Prompt-GameGitHubToken
 if($null -eq $auth){return}
 $script:save.Enabled=$false
 $form.UseWaitCursor=$true
 try {
  $result=Publish-GameMediaSlot -Slot (Current-Slot) -Chosen $chosen -Token $auth.Token -Catalog $catalog
  $note=''
  if($auth.Remember){
   try{Save-GameGitHubToken -Token $auth.Token}catch{$note+="`nТокен не удалось запомнить; он будет запрошен снова."}
  }
  try {
   $null=Install-Slot (Current-Slot) $chosen
   $script:selected.Clear()
   foreach($file in (Existing-Selection (Current-Slot))) {$script:selected.Add([string]$file)}
   Refresh-List
  } catch { $note+="`nФайлы опубликованы, но их локальная копия не обновлена." }
  [System.Windows.Forms.MessageBox]::Show("Опубликовано в GitHub: $($result.Count) файлов.`nСобытие: $((Current-Slot).title)`n`nФайлы доступны в канонической ветке SUSLIK 2. Для установленной игры нужно обновление.`n`n$($result.Url)$note", 'SUSLIK 2 — опубликовано') | Out-Null
 } catch {
  [System.Windows.Forms.MessageBox]::Show("НЕ опубликовано в GitHub.`n" + $_.Exception.Message,'Ошибка публикации') | Out-Null
 } finally {
  $form.UseWaitCursor=$false
  $script:save.Enabled=$true
 }
})
$form.Controls.Add($script:save)
$credentials=New-Object System.Windows.Forms.Button
$credentials.Text='Сменить доступ GitHub'
$credentials.SetBounds(20,472,217,38)
$credentials.Anchor='Bottom,Left'
$credentials.Add_Click({
 if(Test-Path -LiteralPath $GameTokenFile) {Remove-Item -LiteralPath $GameTokenFile -Force}
 [System.Windows.Forms.MessageBox]::Show('При следующей публикации будет запрошен новый токен. Если используется GitHub CLI, настройте доступ там.', 'GitHub') | Out-Null
})
$form.Controls.Add($credentials)
$close=New-Object System.Windows.Forms.Button
$close.Text='Закрыть';$close.SetBounds(526,472,145,38)
$close.Anchor='Bottom,Right';$close.Add_Click({$form.Close()})
$form.Controls.Add($close)
$script:pick.SelectedIndex=0
[void]$form.ShowDialog()
