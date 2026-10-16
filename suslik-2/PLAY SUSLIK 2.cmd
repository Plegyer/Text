@echo off
setlocal
if not exist "%~dp0index.html" (
 echo SUSLIK 2 files missing. Extract the ZIP completely.
 pause
 exit /b 1
)
start "" "%~dp0index.html"
