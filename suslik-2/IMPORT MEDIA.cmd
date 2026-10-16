@echo off
setlocal
if not exist "%~dp0MEDIA IMPORT.ps1" (
  echo Media importer is missing. Extract the SUSLIK 2 folder completely.
  pause
  exit /b 1
)
powershell.exe -NoProfile -ExecutionPolicy Bypass -STA -File "%~dp0MEDIA IMPORT.ps1" -GameDirectory "%~dp0"
if errorlevel 1 (
  echo Could not import media. Check the message above.
  pause
)
