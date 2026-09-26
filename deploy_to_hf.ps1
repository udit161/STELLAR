$HF_USERNAME = "uditkumar16"
$SPACE_NAME = "satquery-ai-agent"
$TMP_DIR = "hf-space-deploy"

Write-Host ""
Write-Host "SatQuery AI Agent -- HF Spaces Deployment" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan

if (Test-Path $TMP_DIR) {
    Write-Host "[1/5] Removing old deploy folder..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force $TMP_DIR
}

Write-Host "[2/5] Cloning HF Space repo..." -ForegroundColor Yellow
Write-Host "      When asked for password, use your HF Access Token" -ForegroundColor Gray
Write-Host "      Get token at: https://huggingface.co/settings/tokens" -ForegroundColor Gray
git clone "https://huggingface.co/spaces/$HF_USERNAME/$SPACE_NAME" $TMP_DIR

if (-not (Test-Path $TMP_DIR)) {
    Write-Host "Clone failed. Check your HF credentials." -ForegroundColor Red
    exit 1
}

Write-Host "[3/5] Preparing Space contents..." -ForegroundColor Yellow
Get-ChildItem "$TMP_DIR" -Exclude ".git" | Remove-Item -Recurse -Force

Write-Host "[4/5] Copying AI agent files..." -ForegroundColor Yellow

Copy-Item -Recurse "ai_agent" "$TMP_DIR/ai_agent"
Copy-Item "ai_agent/Dockerfile.hf" "$TMP_DIR/Dockerfile"
Copy-Item "ai_agent/README_HF.md" "$TMP_DIR/README.md"
Copy-Item "ai_agent/requirements.txt" "$TMP_DIR/requirements.txt"

$envFiles = Get-ChildItem "$TMP_DIR" -Recurse -File | Where-Object { $_.Name -match "^\.env" }
foreach ($f in $envFiles) {
    Write-Host "      Removing secret file: $($f.FullName)" -ForegroundColor Gray
    Remove-Item $f.FullName -Force
}

Get-ChildItem "$TMP_DIR" -Recurse -Directory -Filter "__pycache__" | Remove-Item -Recurse -Force -ErrorAction SilentlyContinue
Get-ChildItem "$TMP_DIR" -Recurse -File -Include "*.pyc","*.db","*.sqlite" | Remove-Item -Force -ErrorAction SilentlyContinue

if (Test-Path "$TMP_DIR/ai_agent/checkpoints") { Remove-Item "$TMP_DIR/ai_agent/checkpoints" -Recurse -Force }
if (Test-Path "$TMP_DIR/ai_agent/uploads")     { Remove-Item "$TMP_DIR/ai_agent/uploads"     -Recurse -Force }
if (Test-Path "$TMP_DIR/ai_agent/eval_report.json") { Remove-Item "$TMP_DIR/ai_agent/eval_report.json" -Force }

$gitignoreContent = ".env`n.env.*`n__pycache__/`n*.pyc`n*.db`n*.sqlite`nuploads/`ncheckpoints/"
Set-Content -Path "$TMP_DIR/.gitignore" -Value $gitignoreContent

Write-Host "[5/5] Committing and pushing to HF Spaces..." -ForegroundColor Yellow
Set-Location $TMP_DIR

git add .
git commit -m "Deploy SatQuery AI Agent (FastAPI + Docker)"

Write-Host "      Pushing... enter HF token when prompted for password" -ForegroundColor Gray
git push

Set-Location ..

Write-Host ""
Write-Host "Done! HF will now build your Docker image (5-10 min)." -ForegroundColor Green
Write-Host ""
Write-Host "Watch the build at:" -ForegroundColor Cyan
Write-Host "  https://huggingface.co/spaces/$HF_USERNAME/$SPACE_NAME" -ForegroundColor White
Write-Host ""
Write-Host "Your AI Agent URL after build:" -ForegroundColor Cyan
Write-Host "  https://$HF_USERNAME-$SPACE_NAME.hf.space/health" -ForegroundColor White
Write-Host ""
