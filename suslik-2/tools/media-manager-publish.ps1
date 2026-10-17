# Publishing module for SUSLIK 2's media manager.
# This file uploads files by their technical slot ID. It never opens or renders media.
$GameRepo = 'Plegyer/Text'
$GameBranch = 'suslik-2/portable-canonical-20261015'
$GameRemoteManifest = 'suslik-2/content/media-manager.published.js'
$GameTokenFile = Join-Path ([Environment]::GetFolderPath('LocalApplicationData')) 'SUSLIK2\media-manager-github.token'
$GameAllowed = @('.png','.jpg','.jpeg','.webp','.gif','.mp4')

function Invoke-GameGitHubRequest {
 param([string]$Method,[string]$Path,[string]$Token,$Data = $null)
 $headers = @{
  Authorization = "Bearer $Token"
  Accept = 'application/vnd.github+json'
  'X-GitHub-Api-Version' = '2022-11-28'
  'User-Agent' = 'SUSLIK2-MediaManager'
 }
 $uri = 'https://api.github.com/repos/' + $GameRepo + '/' + $Path
 $args = @{Uri=$uri;Method=$Method;Headers=$headers;ErrorAction='Stop'}
 if ($null -ne $Data) {
  $serialized = ConvertTo-Json -InputObject $Data -Depth 16 -Compress
  $args['Body'] = [System.Text.Encoding]::UTF8.GetBytes($serialized)
  $args['ContentType'] = 'application/json; charset=utf-8'
 }
 try {
  return Invoke-RestMethod @args
 } catch {
  $code = $_.Exception.Response.StatusCode.value__
  if ($code -eq 401 -or $code -eq 403) {
   throw 'GitHub отклонил доступ. Нужен токен с правом Contents: Read and write для Plegyer/Text. Проверьте настройки доступа.'
  }
  if ($code -eq 422) {
   throw 'GitHub не принял изменение. Возможно, ветка обновилась или файл превышает лимит. Повторите попытку.'
  }
  throw ('Ошибка GitHub: ' + $_.Exception.Message)
 }
}

function Get-GamePublishedManifest {
 param([string]$Token)
 $encoded = [uri]::EscapeDataString($GameBranch)
 $source = Invoke-GameGitHubRequest GET ('contents/'+$GameRemoteManifest+'?ref='+$encoded) $Token
 $bytes = [Convert]::FromBase64String(($source.content -replace '\s',''))
 $code = [System.Text.Encoding]::UTF8.GetString($bytes).TrimStart([char]0xFEFF).Trim()
 if ($code -notmatch '(?s)^window\.SUSLIK2_PUBLISHED_MEDIA\s*=\s*(\{.*\})\s*;$') {
  throw 'Опубликованный список медиа в GitHub имеет неизвестный формат.'
 }
 return ($Matches[1] | ConvertFrom-Json)
}

function Publish-GameMediaSlot {
 param($Slot,[string[]]$Chosen,[string]$Token,$Catalog)
 if ([string]::IsNullOrWhiteSpace($Token)) { throw 'Не указан доступ к GitHub.' }
 if ($Slot.id -notmatch '^[a-z][a-z0-9-]{1,50}$' -or $Slot.key -notmatch '^[a-zA-Z][a-zA-Z0-9]{0,70}$') {
  throw 'Недопустимый идентификатор события.'
 }
 $maximum = [int]$Slot.maxFiles
 if ($maximum -lt 1 -or $maximum -gt 30 -or $Chosen.Count -gt $maximum) {
  throw "Слишком много файлов. Лимит события: $maximum."
 }
 $upload = @()
 for ($i=0;$i -lt $Chosen.Count;$i++) {
  $path = [IO.Path]::GetFullPath($Chosen[$i])
  if (-not (Test-Path -LiteralPath $path -PathType Leaf)) { throw "Файл не найден: $path" }
  $ext = [IO.Path]::GetExtension($path).ToLowerInvariant()
  if ($GameAllowed -notcontains $ext) { throw "Неподдерживаемый формат: $ext" }
  $size = (Get-Item -LiteralPath $path).Length
  if ($size -gt 95MB) { throw 'GitHub принимает файлы до 100 МБ. Этот файл больше безопасного предела 95 МБ.' }
  $dest = 'suslik-2/assets/user-media/manager/' + $Slot.id + ('/slot-{0:D2}{1}' -f ($i+1),$ext)
  $upload += @{source=$path;dest=$dest}
 }
 # The HEAD and the manifest must be from the same revision.
 $refPath = 'git/ref/heads/' + $GameBranch
 $head = Invoke-GameGitHubRequest GET $refPath $Token
 $oldSha = [string]$head.object.sha
 if ($oldSha -notmatch '^[a-f0-9]{40}$') { throw 'Не удалось прочитать текущую ветку GitHub.' }
 $remoteCode = Get-GamePublishedManifest $Token
 $afterRead = Invoke-GameGitHubRequest GET $refPath $Token
 if ($afterRead.object.sha -ne $oldSha) { throw 'Ветка изменилась во время загрузки. Повторите.' }
 $existing = [ordered]@{}
 foreach ($entry in $Catalog) {
  $prop = $remoteCode.PSObject.Properties[$entry.key]
  if ($null -ne $prop) {
   $paths = @()
   foreach ($p in @($prop.Value)) {
    if ($p -is [string] -and $p -match '^assets/user-media/manager/[a-z0-9-]+/slot-[0-9][0-9]\.(png|jpg|jpeg|webp|gif|mp4)$') {
     $paths += $p
    }
   }
   $existing[$entry.key] = $paths
  }
 }
 $before = @()
 if ($existing.Contains($Slot.key)) { $before = @($existing[$Slot.key]) }
 $prefix = 'assets/user-media/manager/' + $Slot.id + '/'
 $relative = @($upload | ForEach-Object { $_.dest.Substring('suslik-2/'.Length) })
 $existing[$Slot.key] = $relative
 $entries = New-Object System.Collections.ArrayList
 # Remove outdated extensions and removed slots only within this event.
 foreach ($oldPath in $before) {
  if ($oldPath.StartsWith($prefix,[StringComparison]::Ordinal) -and $relative -notcontains $oldPath) {
   [void]$entries.Add(@{path='suslik-2/'+$oldPath;mode='100644';type='blob';sha=$null})
  }
 }
 foreach ($item in $upload) {
  $encoded = [Convert]::ToBase64String([IO.File]::ReadAllBytes($item.source))
  $blob = Invoke-GameGitHubRequest POST 'git/blobs' $Token @{content=$encoded;encoding='base64'}
  if ([string]$blob.sha -notmatch '^[a-f0-9]{40}$') { throw 'GitHub не сохранил файл.' }
  [void]$entries.Add(@{path=$item.dest;mode='100644';type='blob';sha=[string]$blob.sha})
 }
 $json = ConvertTo-Json -InputObject $existing -Depth 8 -Compress
 $published = 'window.SUSLIK2_PUBLISHED_MEDIA = ' + $json + ';' + [Environment]::NewLine
 $manifestBase64 = [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes($published))
 $manifestBlob = Invoke-GameGitHubRequest POST 'git/blobs' $Token @{content=$manifestBase64;encoding='base64'}
 [void]$entries.Add(@{path=$GameRemoteManifest;mode='100644';type='blob';sha=[string]$manifestBlob.sha})
 $commit = Invoke-GameGitHubRequest GET ('git/commits/'+$oldSha) $Token
 $tree = Invoke-GameGitHubRequest POST 'git/trees' $Token @{base_tree=[string]$commit.tree.sha;tree=@($entries.ToArray())}
 $next = Invoke-GameGitHubRequest POST 'git/commits' $Token @{message=('Publish SUSLIK 2 media: '+$Slot.id);tree=[string]$tree.sha;parents=@($oldSha)}
 # Never force-push. If another collaborator committed meanwhile, GitHub rejects this.
 $latest = Invoke-GameGitHubRequest GET $refPath $Token
 if ($latest.object.sha -ne $oldSha) { throw 'Ветка GitHub изменилась. Ничего не перезаписано. Нажмите «Опубликовать» ещё раз.' }
 $null = Invoke-GameGitHubRequest PATCH ('git/refs/heads/'+$GameBranch) $Token @{sha=[string]$next.sha;force=$false}
 return @{Commit=[string]$next.sha;Count=$Chosen.Count;Paths=$relative;Url=('https://github.com/'+$GameRepo+'/commit/'+$next.sha)}
}

function Save-GameGitHubToken {
 param([string]$Token)
 $folder = Split-Path -Parent $GameTokenFile
 if (-not (Test-Path $folder)) { New-Item -ItemType Directory -Path $folder -Force | Out-Null }
 $secured = ConvertTo-SecureString -String $Token -AsPlainText -Force
 $secured | ConvertFrom-SecureString | Set-Content -LiteralPath $GameTokenFile -Encoding UTF8
}
function Read-GameGitHubToken {
 if (Get-Command gh.exe -ErrorAction SilentlyContinue) {
  $ghToken = & gh.exe auth token 2>$null
  if ($LASTEXITCODE -eq 0 -and $ghToken) { return @{Token=[string]$ghToken.Trim();Remember=$false} }
 }
 if (Test-Path -LiteralPath $GameTokenFile) {
  try {
   $secure = Get-Content -LiteralPath $GameTokenFile -Raw -Encoding UTF8 | ConvertTo-SecureString
   $ptr=[Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure)
   try {return @{Token=[Runtime.InteropServices.Marshal]::PtrToStringBSTR($ptr);Remember=$false}}
   finally {[Runtime.InteropServices.Marshal]::ZeroFreeBSTR($ptr)}
  } catch { }
 }
 return $null
}
function Prompt-GameGitHubToken {
 $known = Read-GameGitHubToken
 if ($null -ne $known) { return $known }
 $dlg=New-Object System.Windows.Forms.Form
 $dlg.Text='GitHub — разрешение на публикацию'
 $dlg.StartPosition='CenterParent'
 $dlg.Width=580;$dlg.Height=290;$dlg.FormBorderStyle='FixedDialog'
 $dlg.MaximizeBox=$false;$dlg.MinimizeBox=$false
 $info=New-Object System.Windows.Forms.Label
 $info.SetBounds(16,14,530,94)
 $info.Text='Один раз потребуется токен GitHub для проекта Plegyer/Text. Создайте Fine-grained token с доступом к репозиторию Plegyer/Text: Contents — Read and write. Программа не сохраняет токен в проекте.'
 $dlg.Controls.Add($info)
 $link=New-Object System.Windows.Forms.LinkLabel
 $link.SetBounds(16,105,530,24)
 $link.Text='Открыть страницу создания токена GitHub'
 $link.Add_LinkClicked({Start-Process 'https://github.com/settings/personal-access-tokens/new'})
 $dlg.Controls.Add($link)
 $box=New-Object System.Windows.Forms.TextBox
 $box.UseSystemPasswordChar=$true;$box.SetBounds(16,138,527,29)
 $dlg.Controls.Add($box)
 $remember=New-Object System.Windows.Forms.CheckBox
 $remember.SetBounds(16,179,480,24)
 $remember.Text='Запомнить защищённо на этом компьютере'
 $remember.Checked=$true;$dlg.Controls.Add($remember)
 $ok=New-Object System.Windows.Forms.Button
 $ok.Text='Продолжить';$ok.SetBounds(315,213,112,30)
 $ok.Add_Click({ if(-not [string]::IsNullOrWhiteSpace($box.Text)){$dlg.DialogResult='OK';$dlg.Close()} })
 $dlg.Controls.Add($ok)
 $cancel=New-Object System.Windows.Forms.Button
 $cancel.Text='Отмена';$cancel.SetBounds(433,213,108,30)
 $cancel.Add_Click({$dlg.DialogResult='Cancel';$dlg.Close()})
 $dlg.Controls.Add($cancel)
 $result=$dlg.ShowDialog()
 if ($result -ne [System.Windows.Forms.DialogResult]::OK) {return $null}
 return @{Token=$box.Text.Trim();Remember=$remember.Checked}
}
