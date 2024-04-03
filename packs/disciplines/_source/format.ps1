$files = Get-ChildItem -Path .\ -Filter *.json -Recurse -File -Name

ForEach($file in $files) {
    ((Get-Content -Path $file) -replace 'Vampire/Icones/', 'modules/miels-character-importer/media/artwork/vtm5e/icons/') | Set-Content -Path $file
    ((Get-Content -Path $file) -replace 'animalisme.png', 'animalism.png') | Set-Content -Path $file
    ((Get-Content -Path $file) -replace 'celerite.png', 'celerity.png') | Set-Content -Path $file
    ((Get-Content -Path $file) -replace 'forcedame.png', 'fortitude.png') | Set-Content -Path $file
    ((Get-Content -Path $file) -replace 'obtenebration.png', 'oblivion.png') | Set-Content -Path $file
    ((Get-Content -Path $file) -replace 'occultation.png', 'obfuscate.png') | Set-Content -Path $file
}