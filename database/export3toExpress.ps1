# Search the system path (Env:Path) directories for the existence for SQLite3.exe 

# $path = (Get-ChildItem "jsd djej sjdj ajf").value.split(" ")
param($fname,$outdb)  # 取得外部 %1 %2
$fname
$outdb
$i=0
$dir ='sql_' + (Get-Date -Format "MMdd_HH")
$dir
Remove-Item -path $dir -recurse
Remove-Item $outdb -recurse
mkdir $dir
mdb-tables $fname -1 > $dir/tables
mdb-schema --default-values $fname sqlite > $dir/schema
#$scm=mdb-schema --indexes --relations --default-values --not-null $fname  sqlite
#foreach ($n in $scm){
	#$n.gettype()
	#$one=$n.Replace("CREATE TABLE","CREATE TABLE IF NOT EXISTS ")
	#$one >> $dir/schema
#}
 

$tables =(mdb-tables.exe $fname).Trim().split(' ')
Write-Host "tables name"
foreach ($n in $tables)
{
	Write-Host  table name --> $n  .. 
	$outSQL = mdb-export -D "%Y-%m-%d %H:%M:%S" -H -I sqlite $fname $n 
	if ($outSQL.Length -gt 10){
		$outSQL = $outSQL.replace('"',"'")
	}
	$outSQL>> $dir/allDB.sql
}

#get-content $dir/schema | sqlite3 $outdb

#
#$folders = Get-ChildItem  $dir\  -Recurse -Filter *.sql
#foreach ($lis in $folders) {
#	$lis.FullName
#	get-content $lis.FullName | sqlite3 $outdb
#}

#foreach ($f in $file)
#{
#	Write-Host  table write --> $n  .. 
#	get-content $f | sqlite3 $outdb
#}

#for f in $dir/*.sql ; do 
#  echo $f 
#  (echo 'BEGIN;'; cat $f; echo 'COMMIT;') | $sqlite $sql
#done
#echo "Using $dir"


# Write-Host 'user'.split("e")
#Write-Host $pp.split(' ')
#$pp.split(' ')
# foreach ($line in $path)
#    {
#        $i++; 
#		Write-Host "$line "
#    }