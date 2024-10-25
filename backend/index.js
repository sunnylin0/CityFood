import express from 'express';
import sqlite3 from 'sqlite3';
import randomstring from 'randomstring'
import path from 'path';
import { v4 as uuidvs } from 'uuid';
import seedDatabase from './seedDatabase.js';
import cityFoodDB, { init_food } from './CityFoodDB.js';
import {
	mdbinit, mdb2, mdb3, mdb_quer,
	mdb_sql1, mdb_table1
} from './mdbtools.js';

const __dirname = path.resolve();
const DB_PATHFILE = '../database/myFood.sqlite'
//await seedDatabase();
//await cityFoodDB();


const app = express();
const port = 8080;
const headers = {
	"Content-Type": "application/json",
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Headers": "Content-Type",
	"Access-Control-Allow-Methods": "OPTIONS,GET,POST"
}

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
//app.use(function (req, res, next) {
//	// 启用 CORS
//	res.set(headers);
//	next();
//})


app.get('/ss', async (req, res) => {
	let db = new sqlite3.Database(DB_PATHFILE, async (err) => {
		if (err) {
			console.error(err);
		} else {
			console.log("op db");
		}
	})
	let data;
	let p3 = await getUsers();
	res.send(p3);
});
async function getUsers() {
	const promise = new Promise((resolve, reject) => {

		console.log("getUsers");
		const db = new sqlite3.Database(DB_PATHFILE, async (err) => {
			if (err) {
				console.error(err);
				console.log("error");
			} else {
				try {

					console.log("down 2");
					const sql = "SELECT * FROM users;";
					db.all(sql, [], (err, rows) => {
						if (err) reject(false);
						else {
							console.log("SELECT * FROM users;");
							console.log(rows);
							resolve(rows);
						}
					})
				} catch (err) {
					console.error(err);
					reject(false);
				}
			}
		});
	});
	return promise;
}


app.get('/subjoin', async (req, res) => {
	res.set(headers);
	let db = new sqlite3.Database(DB_PATHFILE, async (err) => {
		if (err) {
			console.error(err);
		} else {
			console.log("op db");
		}
	})
	let idList = await getSubCategoryId3();
	console.log("SELECT * FROM subCategory;");
	res.send(idList);

});

async function getSubCategoryId3() {
	const promise = new Promise((resolve, reject) => {

		console.log("getSubCategoryId3");

		const db = new sqlite3.Database(DB_PATHFILE, async (err) => {
			if (err) {
				console.error(err);
			} else {
				try {
					console.log("down 3");
					const sql = "SELECT * FROM subCategory;";
					db.all(sql, [], (err, rows) => {
						if (err) reject(false);
						else {

							let prolist = rows.map(async (ths, index) => {
								let p = await getSubjoinItem(ths.subCatId)
								return ({ ...ths, items: p });
							})
							console.log("prolist")
							console.log(prolist)
							Promise.all(prolist)
								.then(vales => resolve(vales))
								.catch(err => reject(err))
						}
					})
				} catch (err) {
					console.error(err);
					reject(false);
				}
			}
		});
	});
	console.log("back promise")
	console.log(promise)
	return promise;
}
async function getSubjoinItem(itemId) {
	const promise = new Promise((resolve, reject) => {
		console.log("getSubjoinItem");
		const db = new sqlite3.Database(DB_PATHFILE, async (err) => {
			if (err) {
				console.error(err);
			} else {
				try {
					let sql = `SELECT subId, subName, subPrice
						FROM  subjoin 
						WHERE subCatId = '${itemId}';`;
					console.log("down 2");
					db.all(sql, [], (err, rows) => {
						console.log("in in in 3");
						if (err) {
							console.log("error");
							console.log(err);
							reject(false);
						}
						else {
							console.log(`WHERE subjoin.subCatId = ${itemId};`);
							//console.log(rows);
							resolve(rows);
						}
					})
				} catch (err) {
					console.log("very error");
					console.error(err);
					reject(false);
				}
			}
		})
	})
	return promise;
}



app.get('/getMenu', async (req, res) => {
	res.set(headers);
	let idList = await getMenuCatList();
	console.log("SELECT * FROM menu;");
	res.send(idList);

});

async function getMenuCatList() {
	const promise = new Promise((resolve, reject) => {

		console.log("getCategoryList");
		const db = new sqlite3.Database(DB_PATHFILE, async (err) => {
			if (err) {
				console.error(err);
			} else {
				try {
					const sql = `SELECT * FROM category;`;
					console.log("menu 2");
					db.all(sql, [], (err, rows) => {
						console.log("in in 577");
						if (err) {
							console.log(err);
							reject(false);
						}
						else {
							console.log("go home 13");
							let prolist = rows.map(async (ths, index) => {
								let p = (await getMenuCatProductsList(ths.catId))								
								console.log("p = (await getMenuCatProductsList(ths.catId))")
								console.log(p)
								return ({ ...ths, products: p });
							})
							console.log("prolist 334")
							console.log(prolist)
							Promise.all(prolist)
								.then(vales => resolve(vales))
								.catch(err => reject(err))
						}
					})
				} catch (err) {
					console.error(err);
					reject(false);
				}
			}
		});
	});
	console.log("back promise")
	console.log(promise)
	return promise;
}


async function getMenuCatProductsList(catId) {
	const promise = new Promise((resolve, reject) => {

		console.log("getSubCategoryId3");
		const db = new sqlite3.Database(DB_PATHFILE, async (err) => {
			if (err) {
				console.error(err);
			} else {
				try {
					console.log("down 3");
					const sql = `SELECT menuId, catId, menuNameEn, menuName, comment, price, img, isSoldOut	FROM menu
								WHERE catId = ?;`;
					db.all(sql, [catId], (err, rows) => {
						if (err) reject(false);
						else {
							let prolist = rows.map(async (ths, index) => {
								let p = (await getMenuSubjoinList(ths.menuId))
									.map(its => its.subCatId)
								console.log("p=await getMenuSubjoinList(ths.menuId)")

								console.log(p)
								return ({ ...ths, subjoinIds: p });
							})
							console.log("prolist")
							console.log(prolist)
							Promise.all(prolist)
								.then(vales => resolve(vales))
								.catch(err => reject(err))
						}
					})
				} catch (err) {
					console.error(err);
					reject(false);
				}
			}
		});
	});
	console.log("back promise")
	console.log(promise)
	return promise;
}
async function getMenuSubjoinList(menuId) {
	const promise = new Promise((resolve, reject) => {
		console.log("getMenuSubjoinList");
		const db = new sqlite3.Database(DB_PATHFILE, async (err) => {
			if (err) {
				console.error(err);
			} else {
				try {
					let sql = `SELECT subCatId
						FROM  menuSubjoinList
						WHERE menuId = '${menuId}';`;
					console.log("menu 2");
					db.all(sql, [], (err, rows) => {
						console.log("in in 5");
						if (err) {
							console.log("error");
							console.log(err);
							reject(false);
						}
						else {
							console.log(`WHERE menuId = '${menuId}';`);
							//console.log(rows);
							resolve(rows);
						}
					})
				} catch (err) {
					console.log("very error");
					console.error(err);
					reject(false);
				}
			}
		})
	})
	return promise;
}




app.get('/getCategory', async (req, res) => {
	res.set(headers);
	let idList = await getCategoryList();
	console.log("SELECT * FROM Category;");
	res.send(idList);

});

async function getCategoryList() {
	const promise = new Promise((resolve, reject) => {

		console.log("getCategoryList");
		const db = new sqlite3.Database(DB_PATHFILE, async (err) => {
			if (err) {
				console.error(err);
			} else {
				try {
					console.log("getCategoryList 7");
					const sql = `SELECT * FROM category;`;
					db.all(sql, [], (err, rows) => {
						if (err) reject(false);
						else {
							resolve(rows);
						}
					})
				} catch (err) {
					console.error(err);
					reject(false);
				}
			}
		});
	});
	console.log("back promise")
	console.log(promise)
	return promise;
}


app.get('/getOrder', async (req, res) => {
	res.set(headers);
	let idList = await getOrderList();
	//console.log("SELECT * FROM Order;");
	//console.log(idList)
	res.send(idList);
});

async function getOrderList() {
	const promise = new Promise((resolve, reject) => {
		console.log("getOrderList 7");
		const db = new sqlite3.Database(DB_PATHFILE, async (err) => {
			if (err) {
				console.log("err 3");
				console.error(err);
			} else {
				try {
					console.log("down 3");
					//					const sql = `SELECT * FROM 'order' ;`;
					const sql = `SELECT 'order'.orderId, 'order'.userId, 'order'.userName, users.phone, 'order'.remark, 'order'.dateTime, 'order'.totalPrice, 'order'.takeAway, 'order'.isDone, detail.detailId
FROM 'users' INNER JOIN ('order' INNER JOIN 'detail' ON 'order'.orderId = detail.orderId) ON users.userId = 'order'.userId;`
					db.all(sql, [], (err, rows) => {
						if (err) {
							console.log("err go home 19");
							reject(false);
						}
						else {
							console.log("go home 13");
							let prolist = rows.map(async (ths, index) => {
								let p = (await getOrderDetailList(ths.orderId))
								//.map(its => its.subCatId)
								console.log("p=await getOrderDetailList(ths.orderId))")


								console.log(p)
								return ({ ...ths, details: p });
							})
							console.log("prolist")
							console.log(prolist)
							Promise.all(prolist)
								.then(vales => resolve(vales))
								.catch(err => reject(err))
						}
					})
				} catch (err) {
					console.error(err);
					reject(false);
				}
			}
		});
	});
	return promise;
}

async function getOrderDetailList(orderId) {
	const promise = new Promise((resolve, reject) => {
		console.log("getOrderDetailList");
		const db = new sqlite3.Database(DB_PATHFILE, async (err) => {
			if (err) {
				console.error(err);
			} else {
				try {
					const sql = `SELECT [order].orderId, detail.detailId, detail.menuId, detail.menuName, detail.price, detail.subPrice, detail.qty, detail.remark
				FROM [order] INNER JOIN detail ON [order].orderId = detail.orderId
				WHERE detail.orderId = '${orderId}';`;
					console.log("menu 2");
					db.all(sql, [], (err, rows) => {
						console.log("in in 5");
						if (err) {
							console.log("error");
							console.log(err);
							reject(false);
						}
						else {
							console.log("go home 13");
							let prolist = rows.map(async (ths, index) => {
								let p = (await getOrderDetailSubjoinList(ths.detailId))
								//.map(its => its.subCatId)
								console.log("p=await getOrderDetailSubjoinList(ths.detailId)")
								console.log(p)
								return ({ ...ths, subItems: p });
							})
							console.log("prolist")
							console.log(prolist)
							Promise.all(prolist)
								.then(vales => resolve(vales))
								.catch(err => reject(err))
						}
					})
				} catch (err) {
					console.log("very error");
					console.error(err);
					reject(false);
				}
			}
		})
	})
	return promise;
}


async function getOrderDetailSubjoinList(detailId) {
	const promise = new Promise((resolve, reject) => {
		console.log("getOrderDetailSubjoinList");
		const db = new sqlite3.Database(DB_PATHFILE, async (err) => {
			if (err) {
				console.error(err);
			} else {
				try {
					const sql =
						`
			SELECT subjoin.subId, subjoin.subCatId, subjoin.subName, subjoin.subPrice
			FROM subjoin INNER JOIN (detail INNER JOIN detailSubjoin ON detail.detailId = detailSubjoin.detailId)
			ON subjoin.subId = detailSubjoin.subId
			WHERE detailSubjoin.detailId = ?;`;


					console.log("subjoin 2");
					db.all(sql, [detailId], (err, rows) => {
						console.log("in in 25");
						if (err) {
							console.log("error");
							console.log(err);
							reject(false);
						}
						else {
							console.log(`WHERE detail.orderId = '${detailId}';`)
							//console.log(rows);
							resolve(rows);
						}
					})
				} catch (err) {
					console.log("very error");
					console.error(err);
					reject(false);
				}
			}
		})
	})
	return promise;
}





app.get('/getOrder2', async (req, res) => {
	res.set(headers);
	let orderSQL = `SELECT 'order'.orderId, 'order'.userId, 'order'.userName, users.phone, 'order'.remark, 'order'.dateTime, 'order'.totalPrice, 'order'.takeAway, 'order'.isDone, detail.detailId
FROM 'users' INNER JOIN ('order' INNER JOIN 'detail' ON 'order'.orderId = detail.orderId) ON users.userId = 'order'.userId;`
	let orderList = await getTableList(orderSQL);

	let detailSQL = `SELECT [order].orderId, detail.detailId, detail.menuId, detail.menuName, detail.price, detail.subPrice, detail.qty, detail.remark
				FROM [order] INNER JOIN detail ON [order].orderId = detail.orderId
				WHERE detail.orderId = ?;`;

	//const detailList = new Promise((resolve, reject) => {
	let prolist = orderList.map(async (ths, index) => {
		console.log("ddd")
		return (await getTableListTest(detailSQL, [ths.orderId]))

		//console.log(ddd)
		//return ddd;
		//	return ({ ...ths, detail: p });

	})
	//Promise.all(prolist)
	//	.then(vales => resolve(vales))
	//	.catch(err => reject(err))	

	console.log("prolist" + prolist)
	console.log(prolist)
	res.send(prolist);
});

async function getTableListTest(sql, arrayWhereId = []) {
	const promise = new Promise((resolve, reject) => {
		const db = new sqlite3.Database(DB_PATHFILE, async (err) => {
			console.log(".....getTableListTest")
			if (err) {
				console.error(err);
			} else {
				try {
					db.all(sql, arrayWhereId, (err, rows) => {
						if (err) {
							console.log(err);
							reject(false);
						}
						else {
							console.log(sql);
							console.log("id:" + arrayWhereId);
							console.log(rows);
							resolve(rows);
						}
					})
				} catch (err) {
					console.error(err);
					reject(false);
				}
			}
		})
	})
	return promise;
}

async function getTableList(sql, arrayWhereId = []) {
	const promise = new Promise((resolve, reject) => {
		const db = new sqlite3.Database(DB_PATHFILE, async (err) => {
			if (err) {
				console.error(err);
			} else {
				try {
					db.all(sql, arrayWhereId, (err, rows) => {
						if (err) {
							console.log(err);
							reject(false);
						}
						else {
							resolve(rows);
						}
					})
				} catch (err) {
					console.error(err);
					reject(false);
				}
			}
		})
	})
	return promise;
}




app.get("/mdbinit", (req, res) => {
	console.log("mdbinit function");
	mdbinit();
	res.send("Healthy");
});
app.get("/mdb2", (req, res) => {
	console.log("mdbinit function 2");
	let result = mdb2();
	res.send("mdbinit function 2\n" +
		JSON.stringify(result).toString());
});
app.get("/mdb3", (req, res) => {
	console.log("mdb table function 3");
	let result = mdb3();
	res.send("mdb tabld function 3\n" +
		JSON.stringify(result).toString());
});
app.get("/quer", (req, res) => {
	console.log("mdb table function mdb_quer");
	let result = mdb_quer();
	res.send("mdb tabld function mdb_quer" +
		JSON.stringify(result).toString());
});
app.get("/sql1", (req, res) => {
	console.log("mdb table function sql 1");
	let result = mdb_sql1();
	console.log("result=")
	console.log(result)

	console.log("JSON.stringify(result).toString()=")
	console.log(JSON.stringify(result).toString())
	res.send("mdb tabld function sql 1\n" +
		JSON.stringify(result).toString());
});

app.get("/tab1", (req, res) => {
	console.log("mdb table function mdb_table1");
	let result = mdb_table1();
	res.send("mdb tabld function mdb_table1" +
		JSON.stringify(result));
});
app.get("/init", (req, res) => {
	console.log("mdb table function mdb_table1");
	let result = init_food();
	res.send("mdb tabld function mdb_table1" +
		JSON.stringify(result));
});





app.get("/health", (req, res) => {
	console.log("Health check endpoint is reached");
	res.send("Healthy");
});

app.get("/hello", (req, res) => {
	console.log("GET Hello World");
	console.log("Body:", req.body);
	res.set(headers);

	const db = new sqlite3.Database('../database/myapp.sqlite3', async (err) => {
		if (err)
			console.error(err);
		else {
			db.all("SELECT * FROM users;", [], (err, rows) => {
				if (rows && err == null) {
					res.send({ message: "Hello World from backend", rows: rows });
				}
			});
		}
	});
});

app.options("/hello", (req, res) => {
	res.set(headers);
	res.send("preflight response");
});

const logger = (req, res, next) => {
	console.log("Unexpected path:", req.url);
	next();
}

app.use(logger);
// 運行這個 port，參數分別為 port 和要執行的 function
const server = app.listen(port, () => {
	console.log("Listening on port:", port);
});

async function closeGracefully(signal) {
	console.log(`Received termated signal: ${signal}; process terminated...`);
	await server.close();
	process.exit();
}
process.on("SIGINT", closeGracefully);
process.on("SIGTERM", closeGracefully);


app.get('/', (req, res) => {
	delete req.headers['X-Frame-Options'];
	console.log(req)
	res.sendFile(path.join(__dirname + '/index.html'))
});


const GENDER = ["MALE", "FEMALE"]
let count = 0;

app.get('/api/user', (req, res) => {
	delete req.headers['X-Frame-Options'];
	count += 1;
	const { query: { requestId } } = req;
	const responseJson = {
		id: randomstring.generate(13),
		adId: requestId,
		salutation: GENDER[Math.round(Math.random())],
		firstname: randomstring.generate({
			length: 5,
			charset: 'alphabetic'
		}),
		lastname: randomstring.generate({
			length: 5,
			charset: 'alphabetic'
		}),
		birthday: "1999-12-25",
		phoneNumber: "0049" + randomstring.generate({
			length: 9,
			charset: 'numeric'
		}),
		email: randomstring.generate({
			length: 5,
			charset: 'alphabetic'
		}) + randomstring.generate({
			length: 4,
			charset: 'numeric'
		}) + "@ssssss.sdf",
		schufaAgreementAccepted: (Math.round(Math.random()) > 0),
		newsletterSubscription: (Math.round(Math.random()) > 0)
	}
	console.log(responseJson)
	res.json(responseJson)


});

app.post('/mypost', express.json({ type: '*/*' }), (req, res) => {
	// echo json
	res.json(req.body);
});

app.post('/login2', express.json({ type: '*/*' }), (req, res) => {
	// echo json
	let data = req.body
	console.log(req.body)
	let mess = `E-Mail: ${data.email }   password:${data.password}`
	res.json(mess);
});

app.post('/login', express.json({ type: '*/*' }), async (req, res) => {
	res.set(headers);
	let data = req.body
	console.log(req.body)

	let idList = await getUserList(data?.email, data?.password);
	
	res.send(idList);


});

async function getUserList(_email,_password) {
	const promise = new Promise((resolve, reject) => {
		console.log("getUserList 45");
		const db = new sqlite3.Database(DB_PATHFILE, async (err) => {
			if (err) {
				console.error(err);
			} else {
				try {
					console.log("down 3");
					const sql = `SELECT * FROM 'users';`
					db.all(sql, [], (err, rows) => {
						if (err) {
							console.log("err go home 19");
							reject(false);
						}
						else {
							console.log("go home 133");
							console.log(rows)
							resolve(rows)
						}
					})
				} catch (err) {
					console.error(err);
					reject(false);
				}
			}
		});
	});
	return promise;
}

