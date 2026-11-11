param([int]$Port = 8766)
Set-Location -LiteralPath $PSScriptRoot
python -m http.server $Port --bind 127.0.0.1
