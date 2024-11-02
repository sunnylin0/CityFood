import sqlite3 from "sqlite3";

export default async function cityfoodDatabase() {

	console.log("-->cityfoodDatabase")
	const promise = new Promise((resolve, reject) => {
		const db = new sqlite3.Database('../database/myFood.sqlite', async (err) => {
			if (err) {
				console.error(err);
			} else {
				try {
					//await dropUsers(db);
					//await createUsers(db);

					await createFoodTables(db);
					await createFoodData(db);
					//await insertUsers(db, 2,"Master Account", "hardpassword");
					await showUsers(db);
					resolve(true);
				} catch (err) {
					console.error(err);
					reject(false);
				}
			}
		});
	});
	return promise;
}

//seedDatabase();

async function dropUsers(db) {
	console.log("-->dropUsers")
	const promise = new Promise((resolve, reject) => {
		db.run("DROP TABLE IF EXISTS users;", [], (err) => {
			if (err) {
				console.error(err);
				reject();
			} else
				resolve();
		});
	});
	return promise;
}

async function createUsers(db) {
	console.log("-->createUsers")
	const promise = new Promise((resolve, reject) => {
		db.run(`CREATE TABLE IF NOT EXISTS users
			(
				userId			INTEGER PRIMARY KEY,
				userName		varchar,
				phone			varchar,
				email			varchar,
				password		varchar,
				role			varchar
			);`, [], (err) => {
			if (err) {
				console.error(err);
				reject();
			} else
				resolve();
		});
	});
	return promise;
}


export async function init_food() {
	console.log("-->init_food")
	const promise = new Promise((resolve, reject) => {
		const db = new sqlite3.Database('../database/myFood.sqlite', async (err) => {
			console.log("-->new myFood")
			if (err) {
				console.error(err);
			} else {
				try {
					await dropFood(db);
					await createFoodTables(db);
					await createFoodData(db);
					//await insertUsers(db, 2,"Master Account", "hardpassword");
					//await showUsers(db);
					resolve(true);
				} catch (err) {
					console.error(err);
					reject(false);
				}
			}
		});
	});
	return promise;
}

async function dropFood(db) {
	console.log("-->dropFood")
	const promise = new Promise((resolve, reject) => {
		db.run(`
		DROP TABLE IF EXISTS users;
		DROP TABLE IF EXISTS category;
		DROP TABLE IF EXISTS subjoin;
		DROP TABLE IF EXISTS subCategory;
		DROP TABLE IF EXISTS menu;
		DROP TABLE IF EXISTS order;
		DROP TABLE IF EXISTS detail;
		DROP TABLE IF EXISTS detailSubjoin;
		DROP TABLE IF EXISTS menuSubjoinList;
		DROP TABLE IF EXISTS catTOsub;

		`, [], (err) => {
			if (err) {
				console.error(err);
				reject();
			} else
				resolve();
		});
	});
	return promise;
}


export async function createFoodTables(db) {
	console.log("-->createFoodTables")
	db.serialize(() => {
		db.run(`CREATE TABLE IF NOT EXISTS  'users'
 (
	'userId'			INTEGER auto_increment,
	'userName'			varchar,
	'phone'			varchar,
	'email'			varchar,
	'password'			varchar,
	'role'			varchar DEFAULT 'customer',
	PRIMARY KEY ('userId')
);`);
		db.run(`
CREATE TABLE IF NOT EXISTS  'category'
 (
	'catId'			varchar,
	'catName'			varchar,
	PRIMARY KEY ('catId')
);`);
		db.run(`
CREATE TABLE IF NOT EXISTS  'subjoin'
 (
	'subPrice'			INTEGER DEFAULT 0,
	'subCatId'			varchar,
	'subId'			INTEGER auto_increment,
	'subName'			varchar,
	PRIMARY KEY ('subId')
);`);
		db.run(`
CREATE TABLE IF NOT EXISTS  'subCategory'
 (
	'subCatId'			varchar,
	'subCatName'			varchar,
	'isMulti'			INTEGER DEFAULT 0,
	PRIMARY KEY ('subCatId')
);`);
		db.run(`
CREATE TABLE IF NOT EXISTS  'menu'
 (
	'menuName'			varchar,
	'catId'			varchar,
	'img'			varchar,
	'comment'			varchar,
	'isSoldOut'			INTEGER DEFAULT 0,
	'menuId'			varchar,
	'menuNameEn'			varchar,
	'price'			INTEGER DEFAULT 0,
	PRIMARY KEY ('menuId')
);`);
		db.run(`
CREATE TABLE IF NOT EXISTS  'order'
 (
	'userId'			INTEGER,
	'userName'			varchar,
	'totalPrice'		INTEGER,
	'dateTime'			DateTime DEFAULT (DateTime('now')),
	'orderId'			varchar,
	'isDone'			INTEGER DEFAULT 0,
	'remark'			TEXT,
	'takeAway'			INTEGER DEFAULT FALSE,
	PRIMARY KEY ('orderId')
);`);
		db.run(`
CREATE TABLE IF NOT EXISTS  'detail'
 (
	'detailId'			INTEGER auto_increment,
	'menuId'			varchar,
	'menuName'			varchar,
	'price'			INTEGER,
	'subPrice'			INTEGER,
	'qty'			INTEGER,
	'remark'			varchar,
	'orderId'			varchar,
	PRIMARY KEY ('detailId')
);`);
		db.run(`
CREATE TABLE IF NOT EXISTS  'detailSubjoin'
 (
	'dsId'			INTEGER auto_increment,
	'detailId'			INTEGER,
	'subId'			INTEGER,
	PRIMARY KEY ('dsId')
);`);
		db.run(`
CREATE TABLE IF NOT EXISTS  'menuSubjoinList'
 (
	'menuId'			varchar,
	'subCatId'			varchar,
	'menuSubListId'			INTEGER auto_increment,
	PRIMARY KEY ('menuSubListId')
);`);
		db.run(`
CREATE TABLE IF NOT EXISTS  'catTOsub'
 (
	'cad2subId'				INTEGER auto_increment,
	'cadId'			varchar,
	'subCatId'			INTEGER DEFAULT 0,
	PRIMARY KEY ('cad2subId')
);`);
	});

}
export async function createFoodData(db) {
	const promise = new Promise((resolve, reject) => {
		db.run(`INSERT INTO 'users' ('userId', 'userName', 'phone', 'email', 'password', 'role') VALUES (2,'薯餅','912345678','potato@gmail.com','0000','admin'), (3,'小明','958783183','cake@gmail.com','0000','customer'), (4,'大明','911333555','ming@gmail.com','0000','user'), (5,'阿姨','988168168','anti@gmail.com','0000','admin'), (6,'杰倫','926398045','jay@gmail.com','0000','customer'), (7,'楓K','911321123','karen@gmail.com','0000','customer'), (8,'章魚哥','911123123','squidward@gmail.com','0000','customer'), (9,'珊迪','912123222','sandy@gmail.com','0000','customer'), (10,'派大星','911123333','patrick@gmail.comcustomer','0000',NULL), (11,'A2','9','A2@store.com','null','insider'), (12,'A3','9','A3@store.com','null','insider'), (13,'A4','9','A4@store.com','null','insider');
INSERT INTO 'category' ('catId', 'catName') VALUES ('c01','前菜'), ('c02','沙拉'), ('c03','湯品'), ('c04','主菜'), ('c05','點心'), ('c06','飲品');
INSERT INTO 'subjoin' ('subPrice', 'subCatId', 'subId', 'subName') VALUES (0,'AH03',7,'溫'), (0,'AH03',8,'去冰'), (0,'AH01',1,'減油'), (0,'AH01',2,'減鹽'), (0,'AH01',3,'減糖'), (0,'AH02',4,'M'), (10,'AH02',5,'L'), (0,'AH03',6,'熱'), (0,'AH03',9,'冰'), (0,'AH04',10,'紅酒醬'), (0,'AH04',11,'胡椒醬'), (0,'AH04',12,'奶油蘑菇醬'), (0,'AH04',13,'荷蘭醬'), (0,'AH04',14,'胡麻醬'), (0,'AH04',15,'糖醋醬');
INSERT INTO 'subCategory' ('subCatId', 'subCatName', 'isMulti') VALUES ('AH01','餐點特製',1), ('AH02','大小',0), ('AH03','溫度',0), ('AH04','醬料',1);
INSERT INTO 'menu' ('menuName', 'catId', 'img', 'comment', 'isSoldOut', 'menuId', 'menuNameEn', 'price') VALUES ('布里起司塔佐蔓越莓醬','c01','./Img/PC/aa1.jpg','蔓越莓醬佐特製布里起司',0,'p012','cheese_tar',180), ('培根扇貝捲佐香醋蛋黃醬','c01','./Img/PC/aa9.jpg','高級培根+生食級干貝',0,'p013','bacon_scallops',200), ('美味香辣惡魔蛋','c01','./Img/PC/aa4.jpg','放山雞蛋+特製芥末醬',0,'p014','devil_egg',130), ('炙燒黑松露海膽','c01','./Img/PC/aa2.jpg','極致鮮美的海陸首選',0,'p015','uni_truffle',200), ('蜜餞山核桃蔓越莓山羊起司球','c01','./Img/PC/aa5.jpg','精選果乾堅果+爆漿山羊起司',0,'p016','cheese_ball',150), ('晨曦之露沙拉','c02','./Img/PC/ss2.jpg','清新脆口的沙拉帶來早晨露珠般的清爽感覺',0,'p021','dawn_salad',130), ('綠野仙?沙拉','c02','./Img/PC/ss4.jpg','彷彿讓人置身於森林之中感受自然的豐富風味',0,'p022','green_salad',150), ('陽光綻放沙拉','c02','./Img/PC/ss5.jpg','充滿了陽光般的明亮色彩與活力讓人感受到夏日的溫暖。',0,'p023','sun_salad',130), ('彩虹果園沙拉','c02','./Img/PC/ss6.jpg','繽紛的水果搭配脆爽的生菜像彩虹般絢麗的視覺享受。',0,'p024','rainbow_salad',150), ('紐澳良豬排堡','c03','./Img/PC/p031.jpg','就是豬排加生菜的漢堡啦',1,'p031','ee1',55), ('美味蟹堡','c03','./Img/PC/p032.jpg','是誰住在深海的大鳳梨裡',1,'p032','ee2',45), ('綠花椰菜切達起士濃湯','c03','./Img/PC/pp2.jpg','濃鬱、濃鬱、起司的味道。',0,'p033','cheese_soup',120), ('糯米椒白豆湯','c03','./Img/PC/pp3.jpg','具有美味的奶油味和白豆的舒適感',0,'p034','bean_soup',120), ('素食玉米餅湯','c03','./Img/PC/pp4.jpg','豐盛、溫暖、充滿大膽的味道。',0,'p035','tortilla_soup',120), ('橡子南瓜湯','c03','./Img/PC/pp5.jpg','木質百里香、溫暖的肉荳蔻和辣椒調味味道鮮美',0,'p036','squash_soup',120), ('紅鯛魚佐柑橘醬','c04','./Img/PC/mm11.jpg','融合了原始菜餚的所有明亮、酥脆的味道',0,'p041','red_snappe',560), ('紐約客牛排佐紅酒醬','c04','./Img/PC/mm8.jpg','特製紅酒醬配精選紐約客',0,'p042','ny_steak',650), ('帕爾瑪乾酪龍蝦','c04','./Img/PC/mm12.jpg','閃閃發光的龍蝦鮮甜味',0,'p043','lobster',780), ('經典油封鴨','c04','./Img/PC/mm13.jpg','每一口都會在嘴裡融化',0,'p044','class_duck',680), ('蔬菜煎餅半熟蛋','c04','./Img/PC/mm1.jpg','蛋素草食餐',0,'p045','pancake_egg',300), ('主廚特製早午餐','c04','./Img/PC/mm2.jpg','滿足一天的所需',0,'p046','special_brunch',460), ('莓好焦糖鬆餅','c05','./Img/PC/dd2.jpg','酸甜莓果襯托出鬆餅的美好',0,'p051','berry_waffles',180), ('經典蜂蜜鬆餅','c05','./Img/PC/dd5.jpg','簡單又不會尷尬的甜香',0,'p052','honey_waffles',150), ('蔓越莓一口酥','c05','./Img/PC/dd6.jpg','甜香酥脆一口一個',0,'p053','Cranberry_puffs',160), ('晴王葡萄澎派','c05','./Img/PC/dd7.jpg','滿滿麝香葡萄太過癮',0,'p054','grape_puff',220), ('栗拔山兮蛋糕','c05','./Img/PC/dd8.jpg','栗子泥加上好幾顆栗子的美好',0,'p055','Chestnut_cake',200), ('夢幻咖啡拿鐵','c06','./Img/PC/latte3.jpg','哥倫比單品深烘培日曬處理',0,'p061','coffee_latte',180), ('頂級抹茶拿鐵','c06','./Img/PC/macha2.jpg','宇治高級抹茶配上小農鮮乳',0,'p062','macha_latte',180), ('熱帶蘭姆氣旋','c06','./Img/PC/cock1.jpg','加勒比熱帶風情',0,'p063','cocktail_rum',180), ('綜合水果茶','c06','./Img/PC/tea1.jpg','新鮮酸甜好滋味',0,'p064','fruits_tea',180);
INSERT INTO 'order' ('userId', 'userName', 'totalPrice', 'dateTime', 'orderId', 'isDone', 'remark', 'takeAway') VALUES (7,'小明',115,'2022-12-03 00:00:00','OD1670063897679',0,'謝謝老闆',1), (2,'Cake',70,'2022-11-28 00:00:00','OD1669619419597',0,NULL,1), (3,'小明',115,'2022-11-28 00:00:00','OD1669622562629',1,NULL,1), (5,'杰倫',270,'2022-12-03 00:00:00','OD1670067346035',1,NULL,1), (6,'楓K',155,'2022-12-04 00:00:00','OD1670121729628',1,NULL,0), (7,'章魚哥',70,'2022-12-04 00:00:00','OD1670122266392',1,NULL,1), (8,'珊迪',140,'2022-12-04 00:00:00','OD1670122368461',1,NULL,1), (9,'派大星',215,'2022-12-04 00:00:00','OD1670122492366',0,NULL,1);
INSERT INTO 'detail' ('detailId', 'menuId', 'menuName', 'price', 'subPrice', 'qty', 'remark', 'orderId') VALUES (1,'p051','歡樂薯餅',10,0,4,'請幫我加很多番茄醬','OD1669619419597'), (3,'p021','果醬吐司',15,0,1,NULL,'OD1669619419597'), (2,'p061','早餐店奶茶',15,0,1,NULL,'OD1669619419597'), (4,'p034','日式和牛堡',100,NULL,1,NULL,'OD1669622562629'), (5,'p062','經典紅茶',15,NULL,1,NULL,'OD1669622562629'), (6,'p061','早餐店奶茶',15,10,1,NULL,'OD1670063897679'), (7,'p012','玉米蛋餅',50,0,2,NULL,'OD1670063897679'), (8,'p051','歡樂薯餅',10,0,4,NULL,'OD1670067346035'), (9,'p042','低脂蛋白沙拉',80,0,1,NULL,'OD1670067346035'), (10,'p013','培根蛋餅',40,0,2,NULL,'OD1670067346035'), (11,'p062','經典紅茶',15,0,2,NULL,'OD1670067346035'), (12,'p061','早餐店奶茶',15,10,1,NULL,'OD1670067346035'), (13,'p061','早餐店奶茶',15,0,1,NULL,'OD1670067346035'), (14,'p034','日式和牛堡',120,0,1,NULL,'OD1670121729628'), (15,'p051','歡樂薯餅',10,0,2,NULL,'OD1670121729628'), (16,'p061','早餐店奶茶',15,0,1,NULL,'OD1670121729628'), (17,'p032','美味蟹堡',55,0,1,NULL,'OD1670122266392'), (18,'p062','經典紅茶',15,0,1,NULL,'OD1670122266392');
INSERT INTO 'menuSubjoinList' ('menuId', 'subCatId', 'menuSubListId') VALUES ('p012','AH01',1), ('p013','AH01',2), ('p014','AH01',3), ('p015','AH01',4), ('p016','AH01',5), ('p021','AH01',6), ('p022','AH01',7), ('p023','AH01',8), ('p024','AH01',9), ('p031','AH01',10), ('p032','AH01',11), ('p033','AH01',12), ('p034','AH01',13), ('p035','AH01',14), ('p036','AH01',15), ('p041','AH01',16), ('p042','AH01',17), ('p043','AH01',18), ('p044','AH01',19), ('p045','AH01',20), ('p046','AH01',21), ('p041','AH04',22), ('p042','AH04',23), ('p043','AH04',24), ('p044','AH04',25), ('p045','AH04',26), ('p046','AH04',27), ('p051','AH01',28), ('p051','AH04',29), ('p061','AH02',30), ('p062','AH02',31), ('p063','AH02',32), ('p064','AH02',33), ('p061','AH03',34), ('p062','AH03',35), ('p063','AH03',36), ('p064','AH03',37);
			`,
			[], (err) => {
				if (err) {
					console.error(err);
					reject();
				} else
					resolve();
			});
	});
	return promise;
}

async function insertUsers(db, id, name, passowrd) {
	console.log("-->insertUsers")
	const promise = new Promise((resolve, reject) => {
		db.run("INSERT INTO users( userName, password) VALUES( ?, ?);", [name, passowrd], (err) => {
			if (err) {
				console.error(err);
				reject();
			} else
				resolve();
		});
	});
	return promise;
}

async function showUsers(db) {
	console.log("-->showUsers")
	const promise = new Promise((resolve, reject) => {
		db.all("SELECT * FROM users", (err, rows) => {
			if (rows && err == null) {
				console.log(rows);
				resolve();
			} else {
				console.error(err);
				reject();
			}
		});
	});
	return promise;
}