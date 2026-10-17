$ErrorActionPreference='Stop'
. (Join-Path $PSScriptRoot '..\tools\media-manager-publish.ps1')
$catalog=@((Get-Content (Join-Path $PSScriptRoot '..\content\media-manager-slots.json') -Raw -Encoding UTF8 | ConvertFrom-Json).events)
$slot=@($catalog|Where-Object id -eq 'goblin-permission')[0]
$oldRef=('a'*40);$treeRef=('b'*40)
$script:requests=New-Object System.Collections.ArrayList
$script:blobInputs=New-Object System.Collections.ArrayList
$script:published=''
$script:commitRequest=$null
$script:treeRequest=$null
$script:patched=$null
$script:uploadCount=0
$original = 'window.SUSLIK2_PUBLISHED_MEDIA = {"sawmillLust":["assets/user-media/manager/sawmill-lust/slot-01.gif"],"farGoblinPermission":["assets/user-media/manager/goblin-permission/slot-01.gif"]};'
$original64=[Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes($original))
function Invoke-GameGitHubRequest {
 param([string]$Method,[string]$Path,[string]$Token,$Data=$null)
 if($Token -ne 'mock-secret') {throw 'Token was lost'}
 [void]$script:requests.Add("$Method $Path")
 if($Method -eq 'GET' -and $Path -like 'git/ref/heads/*'){return @{object=@{sha=('a'*40)}}}
 if($Method -eq 'GET' -and $Path -like 'contents/*'){return @{content=$script:original64}}
 if($Method -eq 'GET' -and $Path -like 'git/commits/*'){return @{tree=@{sha=('b'*40)}}}
 if($Method -eq 'POST' -and $Path -eq 'git/blobs'){
  $bytes=[Convert]::FromBase64String($Data.content)
  $code=[Text.Encoding]::UTF8.GetString($bytes)
  [void]$script:blobInputs.Add($bytes)
  if($code.StartsWith('window.SUSLIK2_PUBLISHED_MEDIA')){$script:published=$code}
  $script:uploadCount++
  return @{sha=('c'*39)+[string]$script:uploadCount}
 }
 if($Method -eq 'POST' -and $Path -eq 'git/trees'){$script:treeRequest=$Data;return @{sha=('d'*40)}}
 if($Method -eq 'POST' -and $Path -eq 'git/commits'){$script:commitRequest=$Data;return @{sha=('e'*40)}}
 if($Method -eq 'PATCH' -and $Path -like 'git/refs/heads/*'){$script:patched=$Data;return @{object=@{sha=$Data.sha}}}
 throw "Unexpected GitHub request: $Method $Path"
}
$folder=Join-Path $env:RUNNER_TEMP 'media-publisher-fixture'
$null=New-Item -ItemType Directory -Path $folder -Force
$png=Join-Path $folder 'hello.png'
$mp4=Join-Path $folder 'clip.mp4'
$mp3=Join-Path $folder 'bad.mp3'
[IO.File]::WriteAllBytes($png,[byte[]](1,2,3))
[IO.File]::WriteAllBytes($mp4,[byte[]](10,11,12,13))
[IO.File]::WriteAllBytes($mp3,[byte[]](20,21))
$result=Publish-GameMediaSlot -Slot $slot -Chosen @($png,$mp4) -Token 'mock-secret' -Catalog $catalog
if($result.Count -ne 2 -or $result.Commit -ne ('e'*40)){throw 'Wrong success result'}
if($script:patched.force -ne $false -or $script:patched.sha -ne ('e'*40)){throw 'Branch was not updated safely'}
if($script:commitRequest.parents.Count -ne 1 -or $script:commitRequest.parents[0] -ne ('a'*40)){throw 'Commit parent changed'}
if($script:treeRequest.base_tree -ne ('b'*40)){throw 'Base tree was not retained'}
$entries=@($script:treeRequest.tree)
if(@($entries | Where-Object {$_.path -eq 'suslik-2/content/media-manager.published.js'}).Count -ne 1){throw 'Manifest missing'}
if(@($entries | Where-Object {$_.path -eq 'suslik-2/assets/user-media/manager/goblin-permission/slot-01.png'}).Count -ne 1){throw 'PNG missing'}
if(@($entries | Where-Object {$_.path -eq 'suslik-2/assets/user-media/manager/goblin-permission/slot-02.mp4'}).Count -ne 1){throw 'MP4 missing'}
if(@($entries | Where-Object {$_.path -eq 'suslik-2/assets/user-media/manager/goblin-permission/slot-01.gif' -and $null -eq $_.sha}).Count -ne 1){throw 'Stale file not cleared'}
if($script:published -notmatch 'sawmillLust' -or $script:published -notmatch 'slot-02.mp4'){throw 'Manifest lost another event'}
if($script:published -match 'slot-01.gif.*slot-01.gif'){throw 'Old entry was not replaced'}
if([Convert]::ToBase64String($script:blobInputs[0]) -ne [Convert]::ToBase64String([IO.File]::ReadAllBytes($png))){throw 'Image bytes changed'}
if([Convert]::ToBase64String($script:blobInputs[1]) -ne [Convert]::ToBase64String([IO.File]::ReadAllBytes($mp4))){throw 'Video bytes changed'}
$before=$script:requests.Count
$rejected=$false
try {$null=Publish-GameMediaSlot -Slot $slot -Chosen @($mp3) -Token 'mock-secret' -Catalog $catalog}catch{$rejected=$true}
if(-not $rejected){throw 'MP3 was accepted'}
if($script:requests.Count -ne $before){throw 'MP3 triggered GitHub request'}
Write-Host 'GitHub publisher: paths, original bytes, atomic commit, slot isolation and MP3 rejection passed.'
