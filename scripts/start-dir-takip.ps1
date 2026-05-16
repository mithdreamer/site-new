$ErrorActionPreference = "Stop"

$RepoUrl = "https://github.com/mithdreamer/ithalat.git"
$ProjectRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
$ExternalRoot = Join-Path $ProjectRoot "external"
$AppDir = Join-Path $ExternalRoot "ithalat"
$EnvFile = Join-Path $AppDir ".env.local"
$AppUrl = "http://localhost:3000"

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  throw "Git is required to download the DIR takip app."
}

if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
  throw "Node.js and npm are required to run the DIR takip app."
}

if (-not (Test-Path $AppDir)) {
  New-Item -ItemType Directory -Path $ExternalRoot -Force | Out-Null
  git clone $RepoUrl $AppDir
}

Push-Location $AppDir
try {
  git pull --ff-only

  if (-not (Test-Path $EnvFile)) {
    if ($env:GEMINI_API_KEY) {
      "GEMINI_API_KEY=$($env:GEMINI_API_KEY)" | Set-Content -Path $EnvFile -Encoding UTF8
    } else {
      "GEMINI_API_KEY=" | Set-Content -Path $EnvFile -Encoding UTF8
      Write-Warning "GEMINI_API_KEY is empty. Add your key to external\ithalat\.env.local before using AI features."
    }
  }

  npm install

  Start-Job -ScriptBlock {
    param($Url)
    Start-Sleep -Seconds 3
    Start-Process $Url
  } -ArgumentList $AppUrl | Out-Null

  npm run dev
} finally {
  Pop-Location
}
