class Active {
    static get increment() { return 1; }
    static get decrement() { return 2; }
    static get openProductModal() { return 3; }
    static get closeProductModal() { return 4; }
}


//#region ------------------------------ 全域變數 ------------------------------
//let theMenu = []; //存放菜單的陣列(sort by catId)
let theProducts = []; //存放菜單的陣列(sort by productId)
let theUserOrders = []; //客人的歷史訂單
//let theFoodAdditions = []; //食物附加選項
const expireMins = 30; //登入過期時間(分鐘)
// const urlDomain = 'http://localhost:3000';
const urlDomain = 'https://json-server-vercel-a.vercel.app';


let theNotDoneOrders = []; //未完成的 客戶訂單資料
let theAllOrders = []; //全部的 客戶訂單
let theDoneOrders = []; //已完成的 客戶訂單資料
let theMenu = []; //存放菜單的陣列(sort by catId)(cat 底下再放 products)
let theCats = []; //商品類別
let theFoodAdditions = []; //食品附加選項


//#endregion

let foodCat = {
    c01: "前菜",
    c02: "沙拉",
    c03: "湯品",
    c04: "主菜",
    c05: "點心",
    c06: "飲品",
}


// let menuItemlistData2 = [
//     { groupNum: "c01", itemNum: "p012", caption: "起司流成河", desc: "手工餅皮+滿滿起司", cose: 30, imgPathFile: "dd1.jpg" },
//     { groupNum: "c01", itemNum: "p013", caption: "培根蛋餅", desc: "手工蛋餅皮+雙份培根", cose: 35, imgPathFile: "p013.jpg" },
//     { groupNum: "c01", itemNum: "p014", caption: "火腿蛋餅", desc: "手工蛋餅皮+整條火腿", cose: 35, imgPathFile: "p014.jpg" },
//     { groupNum: "c01", itemNum: "p015", caption: "鮪魚沙拉蛋餅", desc: "手工蛋餅皮+一整罐鮪魚", cose: 35, imgPathFile: "p015.jpg" },
//     { groupNum: "c01", itemNum: "p016", caption: "起司蛋餅", desc: "手工蛋餅皮+爆漿起司", cose: 35, imgPathFile: "p016.jpg" },
//     { groupNum: "c02", itemNum: "p021", caption: "果醬吐司", desc: "切邊烤土司+一公分厚塗果醬", cose: 15, imgPathFile: "p021.jpg" },
//     { groupNum: "c02", itemNum: "p022", caption: "鮪魚沙拉吐司", desc: "切邊烤土司+一整罐鮪魚", cose: 35, imgPathFile: "p022.jpg" },
//     { groupNum: "c02", itemNum: "p023", caption: "培根吐司", desc: "切邊烤土司+雙份培根", cose: 35, imgPathFile: "p023.jpg" },
//     { groupNum: "c02", itemNum: "p024", caption: "里肌豬排吐司", desc: "切邊烤土司+厚切里肌豬排", cose: 35, imgPathFile: "p024.jpg" },
//     { groupNum: "c03", itemNum: "p031", caption: "紐澳良豬排堡", desc: "就是豬排加生菜的漢堡啦", cose: 55, imgPathFile: "p031.jpg" },
//     { groupNum: "c03", itemNum: "p032", caption: "美味蟹堡", desc: "是誰住在深海的大鳳梨裡", cose: 45, imgPathFile: "p032.jpg" },
//     { groupNum: "c03", itemNum: "p033", caption: "阿拉斯加鱈魚堡", desc: "鱈~魚~堡~", cose: 45, imgPathFile: "p033.jpg" },
//     { groupNum: "c03", itemNum: "p034", caption: "日式和牛堡", desc: "日本來的和牛，頂級享受", cose: 100, imgPathFile: "p034.jpg" },
//     { groupNum: "c03", itemNum: "p035", caption: "薯泥堡", desc: "內含薯泥沙拉，美味蔬食", cose: 40, imgPathFile: "p035.jpg" },
//     { groupNum: "c03", itemNum: "p036", caption: "無骨雞腿堡", desc: "精選黃金右腿去骨雞腿排", cose: 55, imgPathFile: "p036.jpg" },
//     { groupNum: "c04", itemNum: "p041", caption: "經典美味沙拉", desc: "全素草食餐", cose: 55, imgPathFile: "p041.jpg" },
//     { groupNum: "c04", itemNum: "p042", caption: "低脂蛋白沙拉", desc: "很多葉子搭配水煮蛋、舒肥雞胸肉", cose: 55, imgPathFile: "p042.jpg" },
//     { groupNum: "c05", itemNum: "p051", caption: "歡樂薯餅", desc: "薯餅薯餅得第一", cose: 10, imgPathFile: "p051.jpg" },
//     { groupNum: "c05", itemNum: "p052", caption: "雞塊", desc: "一份4塊", cose: 30, imgPathFile: "p052.jpg" },
//     { groupNum: "c05", itemNum: "p053", caption: "薯條", desc: "酥脆薯條，素食可用", cose: 30, imgPathFile: "p053.jpg" },
//     { groupNum: "c05", itemNum: "p054", caption: "熱狗", desc: "國產熱狗", cose: 30, imgPathFile: "p054.jpg" },
//     { groupNum: "c05", itemNum: "p055", caption: "月亮蝦餅", desc: "泰式月亮蝦餅搭配泰式酸辣醬", cose: 30, imgPathFile: "p055.jpg" },
//     { groupNum: "c06", itemNum: "p061", caption: "早餐店奶茶", desc: "台灣特色，早餐店奶茶", cose: 15, imgPathFile: "p061.jpg" },
//     { groupNum: "c06", itemNum: "p062", caption: "經典紅茶", desc: "台灣高山茶葉沖泡", cose: 15, imgPathFile: "p062.jpg" },
// ]

  
	theMenu=
    [
	{	"id":"c01",	"name":"前菜",	"products":[
	{	"id":"p012",	"name":"布里起司塔佐蔓越莓醬",	"catId":"c01",	"img":"./Img/PC/aa1.jpg",	"comment":"蔓越莓醬佐特製布里起司",	"isSoldOut":false,	"price":180,	"additionIds":[	"AH01"	]	},
	{	"id":"p013",	"catId":"c01",	"name":"培根扇貝捲佐香醋蛋黃醬",	"price":200,	"comment":"高級培根+生食級干貝",	"img":"./Img/PC/aa9.jpg",	"additionIds":[	"AH01"	],	"isSoldOut":false	},
	{	"id":"p014",	"catId":"c01",	"name":"美味香辣惡魔蛋",	"price":130,	"comment":"放山雞蛋+特製芥末醬",	"img":"./Img/PC/aa4.jpg",	"additionIds":[	"AH01"	],	"isSoldOut":false	},
	{	"id":"p015",	"catId":"c01",	"name":"炙燒黑松露海膽",	"price":200,	"comment":"極致鮮美的海陸首選",	"img":"./Img/PC/aa2.jpg",	"additionIds":[	"AH01"	],	"isSoldOut":false	},
	{	"id":"p016",	"catId":"c01",	"name":"蜜餞山核桃蔓越莓山羊起司球",	"price":150,	"comment":"精選果乾堅果+爆漿山羊起司",	"img":"./Img/PC/aa5.jpg",	"additionIds":[	"AH01"	],	"isSoldOut":false	}	]	},
	
    {	"id":"c02",	"name":"沙拉",	"products":[
	{	"id":"p021",	"catId":"c02",	"name":"晨曦之露沙拉",	"price":130,	"comment":"清新脆口的沙拉，帶來早晨露珠般的清爽感覺",	"img":"./Img/PC/ss2.jpg",	"additionIds":[	"AH01"	],	"isSoldOut":false	},
	{	"id":"p022",	"catId":"c02",	"name":"綠野仙踪沙拉",	"price":150,	"comment":"彷彿讓人置身於森林之中，感受自然的豐富風味",	"img":"./Img/PC/ss4.jpg",	"additionIds":[	"AH01"	],	"isSoldOut":false	},
	{	"id":"p023",	"catId":"c02",	"name":"陽光綻放沙拉",	"price":130,	"comment":"充滿了陽光般的明亮色彩與活力，讓人感受到夏日的溫暖。",	"img":"./Img/PC/ss5.jpg",	"additionIds":[	"AH01"	],	"isSoldOut":false	},
	{	"id":"p024",	"catId":"c02",	"name":"彩虹果園沙拉",	"price":150,	"comment":"繽紛的水果搭配脆爽的生菜，像彩虹般絢麗的視覺享受。",	"img":"./Img/PC/ss6.jpg",	"additionIds":[	"AH01"	],	"isSoldOut":false	}	]	},
	
    {	"id":"c03",	"name":"湯品",	"products":[
//	{	"id":"p031",	"catId":"c03",	"name":"紐澳良豬排堡",	"price":55,	"comment":"就是豬排加生菜的漢堡啦",	"img":"./Img/PC/p031.jpg",	"additionIds":[	"AH01"	],	"isSoldOut":false	},
//	{	"id":"p032",	"catId":"c03",	"name":"美味蟹堡",	"price":45,	"comment":"是誰住在深海的大鳳梨裡",	"img":"./Img/PC/p032.jpg",	"additionIds":[	"AH01"	],	"isSoldOut":false	},
	{	"id":"p033",	"catId":"c03",	"name":"綠花椰菜切達起士濃湯",	"price":120,	"comment":"濃鬱、濃鬱、起司的味道。",	"img":"./Img/PC/pp2.jpg",	"additionIds":[	"AH01"	],	"isSoldOut":false	},
	{	"id":"p034",	"catId":"c03",	"name":"糯米椒白豆湯",	"price":120,	"comment":"具有美味的奶油味和白豆的舒適感",	"img":"./Img/PC/pp3.jpg",	"additionIds":[	"AH01"	],	"isSoldOut":false	},
	{	"id":"p035",	"catId":"c03",	"name":"素食玉米餅湯",	"price":120,	"comment":"豐盛、溫暖、充滿大膽的味道。",	"img":"./Img/PC/pp4.jpg",	"additionIds":[	"AH01"	],	"isSoldOut":false	},
	{	"id":"p036",	"catId":"c03",	"name":"橡子南瓜湯",	"price":120,	"comment":"木質百里香、溫暖的肉荳蔻和辣椒調味，味道鮮美",	"img":"./Img/PC/pp5.jpg",	"additionIds":[	"AH01"	],	"isSoldOut":false	}	]	},
	{	"id":"c04",	"name":"主菜",	"products":[
	{	"id":"p041",	"catId":"c04",	"name":"紅鯛魚佐柑橘醬","price":560,	"comment":"融合了原始菜餚的所有明亮、酥脆的味道",	"img":"./Img/PC/mm11.jpg",	"additionIds":[	"AH01",	"AH04"	],	"isSoldOut":false	},
    {	"id":"p042",	"catId":"c04",	"name":"紐約客牛排佐紅酒醬",	"price":650,	"comment":"特製紅酒醬配精選紐約客",	"img":"./Img/PC/mm8.jpg",	"additionIds":[	"AH01",	"AH04"	],	"isSoldOut":false	},
    {	"id":"p043",	"catId":"c04",	"name":"帕爾瑪乾酪龍蝦",	"price":780,	"comment":"閃閃發光的龍蝦鮮甜味",	"img":"./Img/PC/mm12.jpg",	"additionIds":[	"AH01",	"AH04"	],	"isSoldOut":false	},
    {	"id":"p044",	"catId":"c04",	"name":"經典油封鴨",	"price":680,	"comment":"每一口都會在嘴裡融化",	"img":"./Img/PC/mm13.jpg",	"additionIds":[	"AH01",	"AH04"	],	"isSoldOut":false	},
    {	"id":"p045",	"catId":"c04",	"name":"蔬菜煎餅半熟蛋",	"price":300,	"comment":"蛋素草食餐",	"img":"./Img/PC/mm1.jpg",	"additionIds":[	"AH01",	"AH04"	],	"isSoldOut":false	},
	{	"id":"p046",	"catId":"c04",	"name":"主廚特製早午餐",	"price":460,	"comment":"滿足一天的所需",	"img":"./Img/PC/mm2.jpg",	"additionIds":[	"AH01",	"AH04"	],	"isSoldOut":false	}	]	},
    
	{	"id":"c05",	"name":"點心",	"products":[
	{	"id":"p051",	"name":"莓好焦糖鬆餅",	"catId":"c05",	"img":"./Img/PC/dd2.jpg",	"comment":"酸甜莓果襯托出鬆餅的美好",	"isSoldOut":false,	"price":180,	"additionIds":[	"AH01",	"AH04"	]	},
	{	"id":"p052",	"catId":"c05",	"name":"經典蜂蜜鬆餅",	"price":150,	"comment":"簡單又不會尷尬的甜香",	"img":"./Img/PC/dd5.jpg",	"additionIds":[],	"isSoldOut":false	},
	{	"id":"p053",	"catId":"c05",	"name":"蔓越莓一口酥",	"price":160,	"comment":"甜香酥脆一口一個",	"img":"./Img/PC/dd6.jpg",	"additionIds":[],	"isSoldOut":false	},
	{	"id":"p054",	"catId":"c05",	"name":"晴王葡萄澎派",	"price":220,	"comment":"滿滿麝香葡萄太過癮",	"img":"./Img/PC/dd7.jpg",	"additionIds":[],	"isSoldOut":false	},
	{	"id":"p055",	"catId":"c05",	"name":"栗拔山兮蛋糕",	"price":200,	"comment":"栗子泥加上好幾顆栗子的美好",	"img":"./Img/PC/dd8.jpg",	"additionIds":[],	"isSoldOut":false	}	]	},
	{	"id":"c06",	"name":"飲品",	"products":[
	{	"id":"p061",	"catId":"c06",	"name":"夢幻咖啡拿鐵",	"price":180,	"comment":"哥倫比單品深烘培日曬處理",	"img":"./Img/PC/latte3.jpg",	"additionIds":[	"AH02",	"AH03"	],	"isSoldOut":false	},
	{	"id":"p062",	"catId":"c06",	"name":"頂級抹茶拿鐵",	"price":180,	"comment":"宇治高級抹茶配上小農鮮乳",	"img":"./Img/PC/macha2.jpg",	"additionIds":[	"AH02",	"AH03"	],	"isSoldOut":false	},
    {	"id":"p063",	"catId":"c06",	"name":"熱帶蘭姆氣旋",	"price":180,	"comment":"加勒比熱帶風情",	"img":"./Img/PC/cock1.jpg",	"additionIds":[	"AH02",	"AH03"	],	"isSoldOut":false	},
    {	"id":"p064",	"catId":"c06",	"name":"綜合水果茶",	"price":180,	"comment":"新鮮酸甜好滋味",	"img":"./Img/PC/tea1.jpg",	"additionIds":[	"AH02",	"AH03"	],	"isSoldOut":false	}	]	}	]


theFoodAdditions =
    [
        {
            "id": "AH01",
            "name": "餐點特製",
            "isMulti": true,
            "items": [
                {
                    "id": "AD011",
                    "name": "減油",
                    "price": 0
                },
                {
                    "id": "AD012",
                    "name": "減鹽",
                    "price": 0
                },
                {
                    "id": "AD013",
                    "name": "減糖",
                    "price": ""
                },
                //{
                //     "id": "AD014",
                //     "name": "加起司",
                //     "price": 10
                // },
                // {
                //     "id": "AD015",
                //     "name": "加蔬菜",
                //     "price": 10
                // },
                // {
                //     "id": "AD016",
                //     "name": "不要醬料",
                //     "price": 0
                // },
                // {
                //     "id": "AH017",
                //     "name": "不要胡椒",
                //     "price": 0
                // }
            ]
        },
        {
            "id": "AH02",
            "name": "大小",
            "isMulti": false,
            "items": [
                {
                    "id": "AD021",
                    "name": "M",
                    "price": 0
                },
                {
                    "id": "AD022",
                    "name": "L",
                    "price": 10
                }
            ]
        },
        {
            "id": "AH03",
            "name": "溫度",
            "isMulti": false,
            "items": [
                {
                    "id": "AD031",
                    "name": "熱",
                    "price": 0
                },
                {
                    "id": "AD032",
                    "name": "溫",
                    "price": 0
                },
                {
                    "id": "AD033",
                    "name": "去冰",
                    "price": 0
                },
                {
                    "id": "AD034",
                    "name": "冰",
                    "price": 0
                }
            ]
        },
        {
            "id": "AH04",
            "name": "醬料",
            "isMulti": true,
            "items": [
                {
                    "id": "AD041",
                    "name": "紅酒醬",
                    "price": 0
                },
                {
                    "id": "AD042",
                    "name": "胡椒醬",
                    "price": 0
                },
                {
                    "id": "AD043",
                    "name": "奶油蘑菇醬",
                    "price": 0
                },
                {
                    "id": "AD044",
                    "name": "荷蘭醬",
                    "price": 0
                },
                // {
                //     "id": "AD045",
                //     "name": "胡麻醬",
                //     "price": 0
                // },
                // {
                //     "id": "AD046",
                //     "name": "糖醋醬",
                //     "price": 0
                // }
            ]
        }
    ]


theAllOrders=   [
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
                "detailID":"103",
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
                "detailID":"104",
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
