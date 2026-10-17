@echo off
setlocal
if not exist "%~dp0tools\media-manager.ps1" (
 echo Media manager is missing. Please extract the whole SUSLIK 2 folder.
 pause
 exit /b 1
)
powershell.exe -NoProfile -ExecutionPolicy Bypass -STA -File "%~dp0tools\media-manager.ps1" -GameDirectory "%~dp0"
if errorlevel 1 (
 echo The media manager could not start.
 pause
)
