# Search the system path (Env:Path) directories for the existence for SQLite3.exe 

# $path = (Get-ChildItem "jsd djej sjdj ajf").value.split(" ")
param($path,$outdb)  # 取得外部 %1 %2

Remove-Item $outdb -recurse

#get-content MDB_JET3_CHARSET="cp1256" MDB_ICONV="UTF-8;" $path/schema | sqlite3 $outdb
$strSCH ="$path/schema "
#MDB_JET3_CHARSET="cp1256" MDB_ICONV="UTF-8"

"PRAGMA encoding='UTF-8';"| sqlite3 $outdb
get-content $strSCH | sqlite3 $outdb
# PRAGMA encoding="UTF-8";
$folders = Get-ChildItem  $path  -Recurse -Filter *.sql
$i=0
$dataStr=""
foreach ($lis in $folders) {
	$i , $lis.FullName
	$dataStr = get-content $lis.FullName
	$dataStr ='PRAGMA encoding="UTF-8";' + $dataStr
	$dataStr | sqlite3 $outdb
}


