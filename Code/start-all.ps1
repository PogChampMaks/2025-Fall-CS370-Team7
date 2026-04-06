param(
    [switch]$SkipInstall,
    [switch]$DryRun
)

$scriptRoot = $PSScriptRoot
if (-not $scriptRoot) {
    $scriptRoot = Split-Path -Parent $PSCommandPath
}
$frontendPath = Join-Path -Path $scriptRoot -ChildPath "frontend"

if (-not (Test-Path -LiteralPath (Join-Path $scriptRoot "mvnw.cmd"))) {
    Write-Host "mvnw.cmd not found. Run this script from the Code folder." -ForegroundColor Red
    exit 1
}

if (-not (Test-Path -LiteralPath $frontendPath)) {
    Write-Host "Frontend folder not found at: $frontendPath" -ForegroundColor Red
    exit 1
}

$backendCommand = "Set-Location -LiteralPath '$scriptRoot'; .\\mvnw.cmd spring-boot:run"

if ($SkipInstall) {
    $frontendCommand = "Set-Location -LiteralPath '$frontendPath'; npm.cmd start"
} else {
    $frontendCommand = "Set-Location -LiteralPath '$frontendPath'; if (-not (Test-Path -LiteralPath 'node_modules')) { npm.cmd install }; npm.cmd start"
}

if ($DryRun) {
    Write-Host "Backend terminal command:"
    Write-Host $backendCommand
    Write-Host ""
    Write-Host "Frontend terminal command:"
    Write-Host $frontendCommand
    exit 0
}

Start-Process -FilePath "powershell.exe" -ArgumentList "-NoExit", "-ExecutionPolicy", "Bypass", "-Command", $backendCommand | Out-Null
Start-Process -FilePath "powershell.exe" -ArgumentList "-NoExit", "-ExecutionPolicy", "Bypass", "-Command", $frontendCommand | Out-Null

Write-Host "Started backend and frontend in separate terminals."
Write-Host "Backend:  http://localhost:8080"
Write-Host "Frontend: http://localhost:3000"
