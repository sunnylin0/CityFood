$ErrorActionPreference = 'STOP'
$dbPath = 'uuu4.sqlite'
$cs = "Data Source=$dbPath";
$needInit = !(Test-Path $dbPath)
Add-Type -Path .\System.Data.SQLite.dll
$cn = [System.Data.SQLite.SQLiteConnection]::new($cs)
$cn.Open()
$cmd = $cn.CreateCommand();
if ($needInit) {
    $cmd.CommandText = @"
CREATE TABLE `category`
 (
	`catId`			varchar, 
	`catName`			varchar
);
"@

    $cmd.ExecuteNonQuery() 
}

$cmd.CommandText =@"
INSERT INTO `category` (`catId`, `catName`)
VALUES ('c01','前菜'), 
('c02','沙拉'), 
('c03','湯品'), 
('c04','主菜'), 
('c05','點心'), 
('c06','飲品');
"@
$cmd.ExecuteNonQuery() | Out-Null

$cn.Dispose()