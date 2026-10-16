@echo off
setlocal EnableExtensions
for %%I in ("%~dp0.") do set "SOURCE=%%~fI"
set "DEST=%LOCALAPPDATA%\SUSLIK2"
if not exist "%SOURCE%\offline.js" (
 echo SUSLIK 2 portable files are incomplete. Extract ZIP first.
 pause
 exit /b 1
)
if not exist "%DEST%" mkdir "%DEST%"
if /I "%SOURCE%"=="%DEST%" goto link
robocopy "%SOURCE%" "%DEST%" /E /XF "user-media.local.js" /R:1 /W:1 /NFL /NDL /NP /NJH /NJS
if errorlevel 8 (
 echo Cannot copy game files.
 pause
 exit /b 1
)
:link
if not exist "%DEST%\content\user-media.local.js" copy /Y "%SOURCE%\content\user-media.local.js" "%DEST%\content\user-media.local.js" >nul
cscript //nologo "%DEST%\CREATE DESKTOP SHORTCUT.vbs" /install
if errorlevel 1 echo Could not update desktop shortcut. Open PLAY SUSLIK 2.cmd instead.
start "" "%DEST%\index.html"
echo SUSLIK 2 installed in %DEST%. No Node.js required.
