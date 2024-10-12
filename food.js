class Active {
	static getincrement() { return1; }
	static getdecrement() { return2; }
	static getopenProductModal() { return3; }
	static getcloseProductModal() { return4; }
}

//#region------------------------------全域變數------------------------------
//let theMenu=[];//存放菜單的陣列(sortbycatId)
let theProducts = [];//存放菜單的陣列(sortbyproductId)
let theUserOrders = [];//客人的歷史訂單
//let theFoodSubjoins=[];//食物附加選項
const expireMins = 30;//登入過期時間(分鐘)
//const urlDomain='http://localhost:3000';
const urlDomain = 'https://json-server-vercel-a.vercel.app';

let sumPrice = 0;//總價格
let theNotDoneOrders = [];//未完成的客戶訂單資料
let theAllOrders = [];//全部的客戶訂單
let theDoneOrders = [];//已完成的客戶訂單資料
let theMenu = [];//存放菜單的陣列(sortbycatId)(cat底下再放products)
let theCats = [];//商品類別
let theFoodSubjoins = [];//食品附加選項

//#endregion

let foodCategory = {
	"000": "全部",
	c01: "蛋餅",
	c02: "吐司",
	c03: "漢堡",
	c04: "沙拉",
	c05: "點心",
	c06: "飲品",
}

theMenu = [
	{
		"id": "c01", "name": "蛋餅", "products": [
			{ "id": "p012", "catId": "c01", "name": "玉米蛋餅", "price": 30, "comment": "手工蛋餅皮+滿滿玉米", "img": "./Img/PC/p012.jpg", "subjoinIds": ["AH01"], "isSoldOut": false },
			{ "id": "p013", "catId": "c01", "name": "培根蛋餅", "price": 35, "comment": "手工蛋餅皮+雙份培根", "img": "./Img/PC/p013.jpg", "subjoinIds": ["AH01"], "isSoldOut": false },
			{ "id": "p014", "catId": "c01", "name": "火腿蛋餅", "price": 35, "comment": "手工蛋餅皮+整條火腿", "img": "./Img/PC/p014.jpg", "subjoinIds": ["AH01"], "isSoldOut": false },
			{ "id": "p015", "catId": "c01", "name": "鮪魚沙拉蛋餅", "price": 35, "comment": "手工蛋餅皮+一整罐鮪魚", "img": "./Img/PC/p015.jpg", "subjoinIds": ["AH01"], "isSoldOut": false },
			{ "id": "p016", "catId": "c01", "name": "起司蛋餅", "price": 35, "comment": "手工蛋餅皮+爆漿起司", "img": "./Img/PC/p016.jpg", "subjoinIds": ["AH01"], "isSoldOut": false }]
	},
	{
		"id": "c02", "name": "吐司", "products": [
			{ "id": "p021", "catId": "c02", "name": "果醬吐司", "price": 15, "comment": "切邊烤土司+一公分厚塗果醬", "img": "./Img/PC/p021.jpg", "subjoinIds": ["AH01"], "isSoldOut": false },
			{ "id": "p022", "catId": "c02", "name": "鮪魚沙拉吐司", "price": 35, "comment": "切邊烤土司+一整罐鮪魚", "img": "./Img/PC/p022.jpg", "subjoinIds": ["AH01"], "isSoldOut": false },
			{ "id": "p023", "catId": "c02", "name": "培根吐司", "price": 35, "comment": "切邊烤土司+雙份培根", "img": "./Img/PC/p023.jpg", "subjoinIds": ["AH01"], "isSoldOut": false },
			{ "id": "p024", "catId": "c02", "name": "里肌豬排吐司", "price": 35, "comment": "切邊烤土司+厚切里肌豬排", "img": "./Img/PC/p024.jpg", "subjoinIds": ["AH01"], "isSoldOut": false }]
	},
	{
		"id": "c03", "name": "漢堡", "products": [
			{ "id": "p031", "catId": "c03", "name": "紐澳良豬排堡", "price": 55, "comment": "就是豬排加生菜的漢堡啦", "img": "./Img/PC/p031.jpg", "subjoinIds": ["AH01"], "isSoldOut": false },
			{ "id": "p032", "catId": "c03", "name": "美味蟹堡", "price": 45, "comment": "是誰住在深海的大鳳梨裡", "img": "./Img/PC/p032.jpg", "subjoinIds": ["AH01"], "isSoldOut": false },
			{ "id": "p033", "catId": "c03", "name": "阿拉斯加鱈魚堡", "price": 45, "comment": "鱈~魚~堡~", "img": "./Img/PC/p033.jpg", "subjoinIds": ["AH01"], "isSoldOut": false },
			{ "id": "p034", "catId": "c03", "name": "日式和牛堡", "price": 100, "comment": "日本來的和牛，頂級享受", "img": "./Img/PC/p034.jpg", "subjoinIds": ["AH01"], "isSoldOut": false },
			{ "id": "p035", "catId": "c03", "name": "薯泥堡", "price": 40, "comment": "內含薯泥沙拉，美味蔬食", "img": "./Img/PC/p035.jpg", "subjoinIds": ["AH01"], "isSoldOut": true },
			{ "id": "p036", "catId": "c03", "name": "無骨雞腿堡", "price": 55, "comment": "精選黃金右腿去骨雞腿排", "img": "./Img/PC/p036.jpg", "subjoinIds": ["AH01"], "isSoldOut": false }]
	},
	{
		"id": "c04", "name": "沙拉", "products": [
			{ "id": "p041", "catId": "c04", "name": "經典美味沙拉", "price": 55, "comment": "全素草食餐", "img": "./Img/PC/p041.jpg", "subjoinIds": ["AH01", "AH04"], "isSoldOut": false },
			{ "id": "p042", "catId": "c04", "name": "低脂蛋白沙拉", "price": 55, "comment": "很多葉子搭配水煮蛋、舒肥雞胸肉", "img": "./Img/PC/p042.jpg", "subjoinIds": ["AH01", "AH04"], "isSoldOut": false }]
	},
	{
		"id": "c05", "name": "點心", "products": [
			{ "id": "p051", "catId": "c05", "name": "歡樂薯餅", "price": 10, "comment": "薯餅薯餅得第一", "img": "./Img/PC/p051.jpg", "subjoinIds": ["AH01", "AH04"], "isSoldOut": false },
			{ "id": "p052", "catId": "c05", "name": "雞塊", "price": 30, "comment": "一份4塊", "img": "./Img/PC/p052.jpg", "subjoinIds": ["AH04"], "isSoldOut": false },
			{ "id": "p053", "catId": "c05", "name": "薯條", "price": 30, "comment": "酥脆薯條，素食可用", "img": "./Img/PC/p053.jpg", "subjoinIds": ["AH04"], "isSoldOut": false },
			{ "id": "p054", "catId": "c05", "name": "熱狗", "price": 30, "comment": "國產熱狗", "img": "./Img/PC/p054.jpg", "subjoinIds": ["AH04"], "isSoldOut": false },
			{ "id": "p055", "catId": "c05", "name": "月亮蝦餅", "price": 30, "comment": "泰式月亮蝦餅搭配泰式酸辣醬", "img": "./Img/PC/p055.jpg", "subjoinIds": ["AH04"], "isSoldOut": false }]
	},
	{
		"id": "c06", "name": "飲品", "products": [
			{ "id": "p061", "catId": "c06", "name": "早餐店奶茶", "price": 15, "comment": "台灣特色，早餐店奶茶", "img": "./Img/PC/p061.jpg", "subjoinIds": ["AH02", "AH03", "AH04"], "isSoldOut": false },
			{ "id": "p062", "catId": "c06", "name": "經典紅茶", "price": 15, "comment": "台灣高山茶葉沖泡", "img": "./Img/PC/p062.jpg", "subjoinIds": ["AH01", "AH02", "AH03"], "isSoldOut": false }]
	}]


theFoodSubjoins = [
	{
		"id": "AH01", "name": "加料", "isMulti": true, "items": [
			{ "id": "AD011", "name": "加蛋", "price": 10 },
			{ "id": "AD012", "name": "加培根", "price": 15 },
			{ "id": "AD013", "name": "加蔥花", "price": 5 },
			{ "id": "AD014", "name": "加起司", "price": 10 },
			{ "id": "AD015", "name": "加蔬菜", "price": 10 },
			{ "id": "AD016", "name": "不要醬料", "price": 0 },
			{ "id": "AH017", "name": "不要胡椒", "price": 0 }]
	},
	{
		"id": "AH02", "name": "大小", "isMulti": false, "items": [
			{ "id": "AD021", "name": "M", "price": 0 },
			{ "id": "AD022", "name": "L", "price": 10 }]
	},
	{
		"id": "AH03", "name": "溫度", "isMulti": false, "items": [
			{ "id": "AD031", "name": "熱", "price": 0 },
			{ "id": "AD032", "name": "溫", "price": 0 },
			{ "id": "AD033", "name": "去冰", "price": 0 },
			{ "id": "AD034", "name": "冰", "price": 0 }]
	},
	{
		"id": "AH04", "name": "醬料", "isMulti": true, "items": [
			{ "id": "AD041", "name": "番茄醬", "price": 0 },
			{ "id": "AD042", "name": "芥末醬", "price": 0 },
			{ "id": "AD043", "name": "辣椒醬", "price": 0 },
			{ "id": "AD044", "name": "凱薩醬", "price": 0 },
			{ "id": "AD045", "name": "胡麻醬", "price": 0 },
			{ "id": "AD046", "name": "糖醋醬", "price": 0 }]
	}]

theAllOrders = [
	{
		"id": "OD1669619419597",
		"userId": 2,
		"name": "Cake",
		"phone": "0958783183",
		"comment": "不用塑膠袋",
		"price": 70,
		"orderDate": "2022-11-28",
		"orderTime": "15:10:19",
		"takeWay": "外帶",
		"isPaid": false,
		"isDone": false,
		"details": [
			{
				"catId": "c05",
				"id": "p051",
				"name": "歡樂薯餅",
				"additems": [],
				"price": 10,
				"qty": 4,
				"comment": "請幫我加很多番茄醬"
			},
			{
				"catId": "c06",
				"id": "p061",
				"name": "早餐店奶茶",
				"additems": [],
				"price": 15,
				"qty": 1,
				"comment": ""
			},
			{
				"catId": "c02",
				"id": "p021",
				"name": "果醬吐司",
				"additems": [],
				"price": 15,
				"qty": 1,
				"comment": ""
			}
		]
	},
	{
		"id": "OD1669622562629",
		"userId": 3,
		"name": "小明",
		"phone": "0911333555",
		"comment": "第一次來這邊點餐",
		"price": 115,
		"orderDate": "2022-11-28",
		"orderTime": "16:02:42",
		"takeWay": "外帶",
		"isPaid": false,
		"isDone": true,
		"details": [
			{
				"catId": "c03",
				"id": "p034",
				"name": "日式和牛堡",
				"additems": [],
				"price": 100,
				"qty": 1,
				"comment": ""
			},
			{
				"catId": "c06",
				"id": "p062",
				"name": "經典紅茶",
				"additems": [],
				"price": 15,
				"qty": 1,
				"comment": ""
			}
		]
	},
	{
		"id": "OD1670063897679",
		"userId": 3,
		"name": "小明",
		"phone": "0911333555",
		"comment": "謝謝老闆",
		"price": 115,
		"orderDate": "2022-12-03",
		"orderTime": "18:38:17",
		"takeWay": "外帶",
		"isPaid": false,
		"isDone": false,
		"details": [
			{
				"catId": "c06",
				"id": "p061",
				"name": "早餐店奶茶",
				"price": 15,
				"qty": 1,
				"comment": "",
				"additems": [
					"AD021",
					"AD034"
				]
			},
			{
				"catId": "c01",
				"id": "p012",
				"name": "玉米蛋餅",
				"price": 50,
				"qty": 2,
				"comment": "裝在一起",
				"additems": [
					"AD011",
					"AD014"
				]
			}
		]
	},
	{
		"id": "OD1670067346035",
		"userId": 5,
		"name": "杰倫",
		"phone": "0926398045",
		"comment": "",
		"price": 270,
		"orderDate": "2022-12-03",
		"orderTime": "19:35:46",
		"takeWay": "外帶",
		"isPaid": false,
		"isDone": true,
		"details": [
			{
				"catId": "c05",
				"id": "p051",
				"name": "歡樂薯餅",
				"price": 10,
				"qty": 4,
				"comment": "",
				"additems": [
					"AD041"
				]
			},
			{
				"catId": "c04",
				"id": "p042",
				"name": "低脂蛋白沙拉",
				"price": 80,
				"qty": 1,
				"comment": "",
				"additems": [
					"AD011",
					"AD012",
					"AD044"
				]
			},
			{
				"catId": "c01",
				"id": "p013",
				"name": "培根蛋餅",
				"price": 40,
				"qty": 2,
				"comment": "",
				"additems": [
					"AD013"
				]
			},
			{
				"catId": "c06",
				"id": "p062",
				"name": "經典紅茶",
				"price": 15,
				"qty": 2,
				"comment": "",
				"additems": [
					"AD021",
					"AD034"
				]
			},
			{
				"catId": "c06",
				"id": "p061",
				"name": "早餐店奶茶",
				"price": 25,
				"qty": 1,
				"comment": "",
				"additems": [
					"AD022",
					"AD032"
				]
			},
			{
				"catId": "c06",
				"id": "p061",
				"name": "早餐店奶茶",
				"price": 15,
				"qty": 1,
				"comment": "",
				"additems": [
					"AD021",
					"AD034"
				]
			}
		]
	},
	{
		"id": "OD1670121729628",
		"userId": 6,
		"name": "楓K",
		"phone": "0911321123",
		"comment": "",
		"price": 155,
		"orderDate": "2022-12-04",
		"orderTime": "10:42:09",
		"takeWay": "內用",
		"isPaid": false,
		"isDone": true,
		"details": [
			{
				"catId": "c03",
				"id": "p034",
				"name": "日式和牛堡",
				"price": 120,
				"qty": 1,
				"comment": "",
				"additems": [
					"AD011",
					"AD014"
				]
			},
			{
				"catId": "c05",
				"id": "p051",
				"name": "歡樂薯餅",
				"price": 10,
				"qty": 2,
				"comment": "",
				"additems": [
					"AD041"
				]
			},
			{
				"catId": "c06",
				"id": "p061",
				"name": "早餐店奶茶",
				"price": 15,
				"qty": 1,
				"comment": "",
				"additems": [
					"AD021",
					"AD032"
				]
			}
		]
	},
	{
		"id": "OD1670122266392",
		"userId": 7,
		"name": "章魚哥",
		"phone": "0911123123",
		"comment": "",
		"price": 70,
		"orderDate": "2022-12-04",
		"orderTime": "10:51:06",
		"takeWay": "外帶",
		"isPaid": false,
		"isDone": true,
		"details": [
			{
				"catId": "c03",
				"id": "p032",
				"name": "美味蟹堡",
				"price": 55,
				"qty": 1,
				"comment": "",
				"additems": [
					"AD015"
				]
			},
			{
				"catId": "c06",
				"id": "p062",
				"name": "經典紅茶",
				"price": 15,
				"qty": 1,
				"comment": "",
				"additems": [
					"AD021"
				]
			}
		]
	},
	{
		"id": "OD1670122368461",
		"userId": 8,
		"name": "珊迪",
		"phone": "0912123222",
		"comment": "",
		"price": 140,
		"orderDate": "2022-12-04",
		"orderTime": "10:52:48",
		"takeWay": "外帶",
		"isPaid": false,
		"isDone": true,
		"details": [
			{
				"catId": "c01",
				"id": "p013",
				"name": "培根蛋餅",
				"price": 35,
				"qty": 1,
				"comment": "",
				"additems": []
			},
			{
				"catId": "c04",
				"id": "p042",
				"name": "低脂蛋白沙拉",
				"price": 80,
				"qty": 1,
				"comment": "",
				"additems": [
					"AD011",
					"AD012",
					"AD044"
				]
			},
			{
				"catId": "c06",
				"id": "p061",
				"name": "早餐店奶茶",
				"price": 25,
				"qty": 1,
				"comment": "",
				"additems": [
					"AD022",
					"AD034"
				]
			}
		]
	},
	{
		"id": "OD1670122492366",
		"userId": 9,
		"name": "派大星",
		"phone": "0911123333",
		"comment": "",
		"price": 215,
		"orderDate": "2022-12-04",
		"orderTime": "10:54:52",
		"takeWay": "外帶",
		"isPaid": false,
		"isDone": false,
		"details": [
			{
				"catId": "c05",
				"id": "p052",
				"name": "雞塊",
				"price": 30,
				"qty": 1,
				"comment": "",
				"additems": []
			},
			{
				"catId": "c05",
				"id": "p053",
				"name": "薯條",
				"price": 30,
				"qty": 2,
				"comment": "",
				"additems": []
			},
			{
				"catId": "c05",
				"id": "p051",
				"name": "歡樂薯餅",
				"price": 10,
				"qty": 4,
				"comment": "",
				"additems": [
					"AD041"
				]
			},
			{
				"catId": "c05",
				"id": "p054",
				"name": "熱狗",
				"price": 30,
				"qty": 2,
				"comment": "",
				"additems": [
					"AD041"
				]
			},
			{
				"catId": "c06",
				"id": "p061",
				"name": "早餐店奶茶",
				"price": 25,
				"qty": 1,
				"comment": "",
				"additems": [
					"AD022",
					"AD034"
				]
			}
		]
	}
]
theNotDoneOrders = theAllOrders.filter(x => x.isDone == false);
theDoneOrders = theAllOrders.filter(x => x.isDone == true);

theProducts = theMenu.reduce((a, b) => [...a, ...b.products], [])
