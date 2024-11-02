$ErrorActionPreference = 'STOP'
$dbPath = '.\uuu99.sqlite'
$cs = "Data Source=$dbPath";
$needInit = !(Test-Path $dbPath)
Add-Type -Path .\System.Data.SQLite.dll
$cn = [System.Data.SQLite.SQLiteConnection]::new($cs)
$cn.Open()
$cmd = $cn.CreateCommand();
if ($needInit) {
    $cmd.CommandText = @"
    CREATE TABLE Player (
        Id VARCHAR(16),
        Name VARCHAR(32),
        CONSTRAINT Player_PK PRIMARY KEY (Id)
    )
"@
    $cmd.ExecuteNonQuery() 
}
$cmd.CommandText = 'DELETE FROM Player'
$cmd.ExecuteNonQuery() 
$cmd.CommandText = 'INSERT INTO Player VALUES (@Id, @Name)'
$cmd.Parameters.Add([System.Data.SQLite.SQLiteParameter]::new('Id', 'A1234')) | Out-Null
$p = $cmd.Parameters.Add('Name', [System.Data.DbType]::AnsiString)
$p.Value = 'Jeffrey'
$rowAffected = $cmd.ExecuteNonQuery() 
Write-Host "$rowAffected rows inserted"
$cmd.CommandText = "SELECT * FROM Player"
$cmd.Parameters.Clear()
$dr = $cmd.ExecuteReader()
while ($dr.Read()) {
    Write-Host $dr["Id"] $dr["Name"]
}
$cn.Dispose()