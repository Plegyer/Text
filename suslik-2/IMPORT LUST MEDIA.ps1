param([string]$GameDirectory=$PSScriptRoot)
$ErrorActionPreference='Stop'
Add-Type -AssemblyName System.Windows.Forms
$form=New-Object System.Windows.Forms.OpenFileDialog
$form.Title='SUSLIK 2 — изображения и видео события Похоти на лесопилке'
$form.Filter='Медиа (*.mp4;*.webm;*.png;*.jpg;*.jpeg;*.gif)|*.mp4;*.webm;*.png;*.jpg;*.jpeg;*.gif'
$form.Multiselect=$true
if($form.ShowDialog() -ne [System.Windows.Forms.DialogResult]::OK){exit}
$files=@($form.FileNames)
if($files.Count -gt 20){[System.Windows.Forms.MessageBox]::Show('Не больше 20 файлов.')|Out-Null;exit 1}
$destination=Join-Path $GameDirectory 'assets\user-media\lust-sawmill'
New-Item -ItemType Directory -Force -Path $destination | Out-Null
$paths=New-Object System.Collections.Generic.List[string]
for($i=0;$i -lt $files.Count;$i++){
 $ext=[IO.Path]::GetExtension($files[$i]).ToLowerInvariant()
 if($ext -notin @('.mp4','.webm','.png','.jpg','.jpeg','.gif')){throw 'Invalid extension'}
 $name=('slot-{0:D2}{1}' -f ($i+1),$ext)
 Copy-Item -LiteralPath $files[$i] -Destination (Join-Path $destination $name) -Force
 $paths.Add('assets/user-media/lust-sawmill/'+$name)
}
$json=ConvertTo-Json -InputObject @($paths.ToArray()) -Compress
if($files.Count -eq 1){$json='['+(ConvertTo-Json -InputObject $paths[0] -Compress)+']'}
$manifest='window.SUSLIK2_USER_LUST_MEDIA = {sawmill:'+$json+'};'
[IO.File]::WriteAllText((Join-Path $GameDirectory 'content\user-media-lust.local.js'),$manifest,[Text.UTF8Encoding]::new($false))
[System.Windows.Forms.MessageBox]::Show('Медиа подключены. Перезапустите игру.')|Out-Null
