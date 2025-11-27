param(
    [switch]$Install
)

# Simple PowerShell wrapper that uses the cmd-based npm executable
# to avoid PowerShell execution policy issues with npm.ps1.

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "Node.js not found. Please install Node.js and ensure it's on PATH." -ForegroundColor Red
    exit 1
}

Push-Location -LiteralPath (Split-Path -LiteralPath $MyInvocation.MyCommand.Path -Parent)

if ($Install) {
    Write-Host "Running 'npm.cmd install'..."
    & npm.cmd install
}

Write-Host "Starting dev server with 'npm.cmd start'..."
& npm.cmd start

Pop-Location
