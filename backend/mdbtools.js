import {
	versionMdbTools, version,
	tables, tablesSystem, tablesToFile, tablesAllToFile,
	queries, queriesSQL, queriesToFile, queriesSQLToFile,
	sql, sqlAsString, sqlToFile, sqlFromFile, sqlFromFileToFile,
	tableToJson
} from "@el3um4s/mdbtools/lib/index.js";

const MDB_PATH = "C:/GitHub/FoodTT/backend/mdbtools-win";

export async function mdbinit() {
	// in Windows
	const windowsPath = MDB_PATH;
	const versionW = await versionMdbTools(windowsPath);

	console.log(versionW);
	console.log("he hi");
}


export async function mdb2() {
	// in Windows
	const windowsPath = MDB_PATH;
	const database = "../database/dbfood.mdb";
	const v = await version({ database, windowsPath });
	console.log(v);
	return v;
}
export async function mdb3() {
	// table 的名
	const windowsPath = MDB_PATH;
	const database = "../database/dbfood.mdb";

	const list = await tables({ database, windowsPath });
	console.log(list);
	// [ "Fruit", "Fruit Salad", "Veggie Salad", "Muffin/Bread", "Dried"]

	console.log("---> tablesSystem");
	const listSystem = await tablesSystem({ database, windowsPath  });
	//console.log(listSystem);
	//// [ "MSysObjects", "MSysACEs", "MSysQueries", "MSysRelationships", "MSysAccessObjects", "MSysNavPaneGroupCategories", "MSysNavPaneGroups", "MSysNavPaneGroupToObjects", "MSysNavPaneObjectIDs", "MSysAccessXML", "MSysNameMap" ]


	console.log("---> tablesToFile");
	const file = "./__to_file__/tables-fruit.txt";
	const t = await tablesToFile({ database, windowsPath, file });
	console.log(t);
	// true


	console.log("---> tablesAllToFile");
	const fileWithSystem =
		"./__to_file__/tables-fruit-with-system-tables.txt";
	const ts = await tablesAllToFile({
		database,
		windowsPath,
		file: fileWithSystem,
	});
	console.log(ts);
// true
}


export async function mdb_quer() {
	// 查詢
	const windowsPath = MDB_PATH;
	const database = "../database/dbfood.mdb";

	const listQueries = await queries({ database, windowsPath });
	console.log(listQueries);
	// [ "UserA", "MainColors", "ChangeValueDogTo40", "ChangeValueDotTo4", "AddApple", "DeleteApple", "aàeèéiìoòuù"]

	const s = await queriesSQL({ database, windowsPath, query: "UserA" });
	console.log(s);
	// SELECT Users.* FROM [Users] WHERE (((Users.UserCategory)="A"))

	const file = "./test-queries.txt";
	const t = await queriesToFile({ database, windowsPath, file });
	console.log(t);
	// true

	const query = "UserA";
	const fileQuery = "./test-queries-usera.txt";
	const tq = await queriesSQLToFile({
		database,
		windowsPath,
		query,
		file: fileQuery,
	});
	console.log(tq);
// true
}


export async function mdb_sql1() {
	//sql 
	const windowsPath = MDB_PATH;
	const database = "../database/dbfood.mdb";
	const s = "SELECT * From order "// WHERE userId =2 ";

	console.log("--> sql");
	const promise = await sql({ database, windowsPath, sql: s });
	console.log(promise)
	const promise2 = promise.then(() => { console.log("successCallback");return "success"});
	return promise2;

	console.log("--> sqlAsString");
	const resultAsString = await sqlAsString({ database, windowsPath, sql: s });
	console.log(resultAsString);

	console.log("--> sqlToFile");
	const file = "./__to_file__/sql result to file.csv";
	const q = await sqlToFile({ database, windowsPath, sql: s, file });
	console.log(q);
	// true

	console.log("--> sqlFromFile");
	const inputFile = "./__to_file__/select colors.sql";
	const f = await sqlFromFile({ database, windowsPath, inputFile });
	console.log(f);


	const fileResult = "./__to_file__/sql from file to file.csv";
	const rf = await sqlFromFileToFile({
		database,
		windowsPath,
		inputFile,
		file: fileResult,
	});
	console.log(rf);
}




export async function mdb_table1() {
	const windowsPath = MDB_PATH;
	const database = "../database/dbfood.mdb";
	const table = "menu";

	const result = await tableToJson({ database, windowsPath, table });
	console.log(result);
// [
//     { Colors: "Red", Value: 10 },
//     { Colors: "Green", Value: 5 },
//     { Colors: "Blue", Value: 16 },
//     { Colors: "Black", Value: 1 },
//     { Colors: "Yellow", Value: 12 },
//     { Colors: "White", Value: 10 },
//     { Colors: "Others", Value: 0 },
// ]
}