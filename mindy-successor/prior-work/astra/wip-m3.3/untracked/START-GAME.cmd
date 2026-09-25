@echo off
setlocal
cd /d "%~dp0"
if not exist "dist\index.html" (
 echo Game build is missing. Extract the COMPLETE release ZIP first.
 pause
 exit /b 1
)
if exist "runtime\node.exe" (
 "runtime\node.exe" scripts\serve.mjs --open
) else (
 where node >nul 2>nul
 if errorlevel 1 (
  echo Node.js is not installed. Install Node.js 22.18+ once, then run this file again.
  echo This source release does not include a standalone Windows executable.
  pause
  exit /b 1
 )
 node scripts\serve.mjs --open
)
if errorlevel 1 pause
endlocal
