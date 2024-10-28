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
let urlDomain = 'http://localhost:8080';
//const urlDomain = 'https://json-server-vercel-a.vercel.app';
let foodCategory = {}

let sumPrice = 0;//總價格
let theNotDoneOrders = [];//未完成的客戶訂單資料
let theAllOrders = [];//全部的客戶訂單
let theDoneOrders = [];//已完成的客戶訂單資料
let theMenu = [];//存放菜單的陣列(sortbycatId)(cat底下再放products)
let theCategory = [];//商品類別
let theFoodSubjoins = [];//食品附加選項

//#endregion

window.addEventListener("load", (event) => {
	console.log("load ")
	init();
});



//初始化
function init() {
	//檢查網址參數
	urlDomain = "http://" + window.location.hostname + ":8080";
	const urlParams = new URLSearchParams(window.location.search);
	const isInsider = urlParams.has('insider');
	if (isInsider) {
		login('A3@store.com', 'abc123');
		return;
	}
	//檢查登入狀態
	if (getDataFromLocalStorage('_user')) {
		chkTimer();
	}
	getCategory();
	getMenu();
	getFoodSubjoin();
	getAllOrders();

	//theProducts = theMenu.reduce((a, b) => [...a, ...b.products], [])


	//renderNavList();
	//renderQrCode();
	//updateFooterTotalPrice();
	//gtag('event', 'screen_view', {
	//	'app_name': '快取早餐',
	//	'screen_name': 'Index'
	//});
}





//#region ------------------------------ API ------------------------------

function getCategory() {
	console.log(`${urlDomain}/getCategory`)
	axios.get(`${urlDomain}/getCategory`).then(function (response) {
		console.log(`${urlDomain}/getCategory`)
		theCategory = response.data;
		
	}).catch(function (error) {
		console.log('error', error);
	});
}
//取得菜單資料
function getMenu() {
	console.log(`${urlDomain}/getMenu`)
	axios.get(`${urlDomain}/getMenu`).then(function (response) {
		console.log(`${urlDomain}/getMenu`)
		theMenu = response.data;
		
		theProducts = theMenu.reduce((a, b) => [...a, ...b.products], [])
		//renderMenu();
	}).catch(function (error) {
		console.log('error', error);
	});
}
//取得食品附加項目
function getFoodSubjoin() {
	axios.get(`${urlDomain}/subjoin`)
		.then(function (response) {
			theFoodSubjoins = response.data;
		}).catch(function (error) {
			console.log('error', error);
		});
}
//取得用戶歷史訂單
function getAllOrders() {
	axios.get(`${urlDomain}/getOrder`)
		.then(function (response) {
			theAllOrders = response.data;
			theNotDoneOrders = theAllOrders.filter(x => x.isDone == false);
			theDoneOrders = theAllOrders.filter(x => x.isDone == true);
			console.log('theAllOrders', theAllOrders);
			//renderUserOrdersModal();
		}).catch(function (error) {
			console.log('error', error);
			theAllOrders = [];
			//renderUserOrdersModal();
		});
}
//取得用戶歷史訂單
function getUserOrders() {
	//const userId = getDataFromLocalStorage('_user').id;
	//const token = getDataFromLocalStorage('_token');
	//const config = { headers: { 'Authorization': `Bearer ${token}` } }

	//axios.get(`${urlDomain}/600/orders?userId=${userId}`, config)
	axios.get(`${urlDomain}/getOrder`)
		.then(function (response) {
			theUserOrders = response.data;
			console.log('theUserOrders', theUserOrders);
			//renderUserOrdersModal();
		}).catch(function (error) {
			console.log('error', error);
			theUserOrders = [];
			//renderUserOrdersModal();
		});
}
//login
function login(email, password) {
	axios.post(`${urlDomain}/login`, { email: email, password: password })
		.then(function (response) {
			gtag("event", "login", {
				method: "login:" + `(${email})(${response.data.user.name})`
			});
			saveDataToLocalStorage('_token', response.data.accessToken);
			saveDataToLocalStorage('_user', response.data.user);
			saveDataToLocalStorage('_expire', { time: new Date().getTime(), expire: expireMins * 60 * 1000 });
			chkTimer();
			if (response.data.user.role == 'admin') {
				deleteDataFromLocalStorage('returnModal');
				window.location.href = 'backstage.html';
				return;
			}
			if (response.data.user.role == 'insider') {
				window.location.href = window.location.origin + window.location.pathname;
				return;
			}

			$('#loginModal').modal('hide');
			renderNavList();
			switchModal();
			if (response.data.user.role == 'insider') {
				sweetSmallSuccess(`桌號 ${response.data.user.name}，歡迎光臨`);
			} else {
				sweetSmallSuccess(`早安😀 ${response.data.user.name}，登入成功`);
			}

		}).catch(function (error) {
			sweetError('登入失敗', '帳號或密碼錯誤');
		});
}
//logout
function logout() {
	deleteDataFromLocalStorage('_token');
	deleteDataFromLocalStorage('_user');
	deleteDataFromLocalStorage('_expire');
	deleteDataFromLocalStorage('returnModal');
	renderNavList();
}
//register
function register(model) {
	axios.post(`${urlDomain}/register`, model)
		.then(function (response) {
			gtag("event", "sign_up", {
				method: "sign_up:" + `(${model.name})(${model.email})`
			});
			saveDataToLocalStorage('_token', response.data.accessToken);
			saveDataToLocalStorage('_user', response.data.user);
			//$('#loginModal').modal('hide');
			renderNavList();
			switchModal();
			sweetSmallSuccess('註冊成功');
		}).catch(function (error) {
			console.log('error', error);
		});
}
//post cart order with token
function postCartOrder(order) {
	const token = getDataFromLocalStorage('_token');
	axios.post(`${urlDomain}/mypost`, order, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	}).then(function (response) {
		gaPurchase(order);
		sweetSuccess('訂單送出成功', '將盡快為您備餐', 2500);
		switchModal();
		deleteDataFromLocalStorage('cart');
		updateFooterTotalPrice();
	}).catch(function (error) {
		sweetError('訂單送出失敗', '請重新嘗試');
		console.log('error', error);
	});
}


//讀取購物車內容
function getCarts() {
	const cart = JSON.parse(localStorage.getItem('cart')) || [];
	return cart;
}

//加入購物車
function addToCart(catId, productId) {
	const products = theMenu.find(x => x.id == catId).products.find(x => x.id == productId);
	const carts = getCarts();
	const qty = parseInt($('#tempProductAmount').text());
	const comment = $('#tempProductComment').val();
	let additems = [];
	$('#foodAdditionOptions input.foodAdditionOption:checked').each(function () {
		additems.push($(this).val());
	});
	const price = parseInt($("#tempProductTotal").text());
	carts.push({
		catId: catId,
		id: products.id,
		name: products.name,
		price: price / qty,
		qty: qty,
		comment: comment,
		additems: additems,
	});
	saveDataToLocalStorage('cart', carts);
	$('#productModal').modal('hide');
	updateFooterTotalPrice();
}
//更新購物車
function updateToCart(productIndex) {
	const carts = getCarts();
	const qty = parseInt($('#tempProductAmount').text());
	const comment = $('#tempProductComment').val();
	const additems = [];
	$('#foodAdditionOptions input.foodAdditionOption:checked').each(function () {
		additems.push($(this).val());
	});
	const price = parseInt($("#tempProductTotal").text());
	carts[productIndex].qty = qty;
	carts[productIndex].comment = comment;
	carts[productIndex].additems = additems;
	carts[productIndex].price = price / qty;
	saveDataToLocalStorage('cart', carts);
	sweetSmallSuccess('已更新購物車');
	$('#productModal').modal('hide');
	showCartModal();
	updateFooterTotalPrice();
}
//送出購物車訂單
function submitCart() {
	const carts = getCarts();
	if (carts.length == 0) {
		sweetError('購物車沒有商品', '請先加入商品');
		return;
	} else if (getDataFromLocalStorage('_token') == null) {
		saveDataToLocalStorage('returnModal', 'cartModal');
		//$("#cartModal").modal('hide');
		//showLoginModal()
		return;
	}
	const order = {
		orderId: "OD" + (+new Date()).toString(),
		userId: getDataFromLocalStorage('_user').id,
		userName: getDataFromLocalStorage('_user').name,
		phone: getDataFromLocalStorage('_user').phone,
		remark: document.querySelector('#cartComment').val(),
		totalPrice: countCartTotalPrice(),
		dateTime: getTimeNow(),
		takeWay: document.querySelector('#cartTakeWay input:checked').val(),
		isDone: false,
		details: carts,
	}
	postCartOrder(order);
}

//#endregion


//#region ------------------------------ 其他 ------------------------------

//save data in local storage
function saveDataToLocalStorage(key, data) {
	localStorage.setItem(key, JSON.stringify(data));
}
//get data from local storage
function getDataFromLocalStorage(key) {
	return JSON.parse(localStorage.getItem(key));
}
//delete data from local storage
function deleteDataFromLocalStorage(key) {
	localStorage.removeItem(key);
}
// 取得當前時間(2022-01-01 00:00:00)
function getTimeNow() {
	let d = new Date();
	const theTime = d.getFullYear() + "-" + (d.getMonth() + 1).AddZero() + "-" + d.getDate().AddZero() + " " + d.getHours().AddZero() + ":" + d.getMinutes().AddZero() + ":" + d.getSeconds().AddZero();
	return theTime;
};
// 小於10的數字補0
Number.prototype.AddZero = function (b, c) {
	var l = (String(b || 10).length - String(this).length) + 1;
	return l > 0 ? new Array(l).join(c || '0') + this : this;
};
//sweetAlert 右上角 小成功
function sweetSmallSuccess(title, timer = 1500) {
	const Toast = Swal.mixin({
		toast: true,
		position: 'top-end',
		showConfirmButton: false,
		timer: timer,
		timerProgressBar: true,
		didOpen: (toast) => {
			toast.addEventListener('mouseenter', Swal.stopTimer)
			toast.addEventListener('mouseleave', Swal.resumeTimer)
		}
	})

	Toast.fire({
		icon: 'success',
		title: title
	})
}
//sweetAlert 成功
function sweetSuccess(title, text, timer = 1500) {
	Swal.fire({
		icon: 'success',
		title: title,
		text: text,
		showConfirmButton: false,
		timer: timer
	})
}
//sweetAlert 失敗
function sweetError(title, text) {
	Swal.fire({
		icon: 'error',
		title: title,
		text: text,
		showConfirmButton: false,
		timer: 1500
	})
}
//sweetAlert 資訊
function sweetInfo(title, timer = 3000) {
	const Toast = Swal.mixin({
		toast: true,
		position: 'top-end',
		showConfirmButton: false,
		timer: timer,
		timerProgressBar: true,
		didOpen: (toast) => {
			toast.addEventListener('mouseenter', Swal.stopTimer)
			toast.addEventListener('mouseleave', Swal.resumeTimer)
		}
	})

	Toast.fire({
		icon: 'info',
		title: title
	})
}
//檢查localStorage是否過期
function chkTimer() {
	var timer = setInterval(function () {
		if (localStorage.getItem('_expire')) {
			let expireTime = getDataFromLocalStorage('_expire');
			if (new Date().getTime() - expireTime.time > expireTime.expire) {
				sweetInfo('登入逾時，請重新登入', 3000);
				logout()
				clearInterval(timer);
			}
		} else {
			console.log('帳號已登出，localStorage已失效');
			clearInterval(timer);
		}
	}, 1000);
}
//gaPurchase
function gaPurchase(order) {
	gtag("event", "purchase", {
		transaction_id: order.id,
		affiliation: "快取早餐",
		value: order.price,
		currency: "TWD",
		items: order.details.map(item => {
			let itemObj = {
				item_id: item.id,
				item_name: item.name,
				currency: "TWD",
				item_category: catIdToCatName(item.catId),
				price: item.price,
				quantity: item.qty,
				item_variant: item.comment,
			}
			return itemObj;
		})
	});
}
//#endregion


//foodCategory = {
//	"000": "全部",
//	c01: "蛋餅",
//	c02: "吐司",
//	c03: "漢堡",
//	c04: "沙拉",
//	c05: "點心",
//	c06: "飲品",
//}

//theMenu = [
//	{
//		"id": "c01", "name": "蛋餅", "products": [
//			{ "id": "p012", "catId": "c01", "name": "玉米蛋餅", "price": 30, "comment": "手工蛋餅皮+滿滿玉米", "img": "./Img/PC/p012.jpg", "subjoinIds": ["AH01"], "isSoldOut": false },
//			{ "id": "p013", "catId": "c01", "name": "培根蛋餅", "price": 35, "comment": "手工蛋餅皮+雙份培根", "img": "./Img/PC/p013.jpg", "subjoinIds": ["AH01"], "isSoldOut": false },
//			{ "id": "p014", "catId": "c01", "name": "火腿蛋餅", "price": 35, "comment": "手工蛋餅皮+整條火腿", "img": "./Img/PC/p014.jpg", "subjoinIds": ["AH01"], "isSoldOut": false },
//			{ "id": "p015", "catId": "c01", "name": "鮪魚沙拉蛋餅", "price": 35, "comment": "手工蛋餅皮+一整罐鮪魚", "img": "./Img/PC/p015.jpg", "subjoinIds": ["AH01"], "isSoldOut": false },
//			{ "id": "p016", "catId": "c01", "name": "起司蛋餅", "price": 35, "comment": "手工蛋餅皮+爆漿起司", "img": "./Img/PC/p016.jpg", "subjoinIds": ["AH01"], "isSoldOut": false }]
//	},
//	{
//		"id": "c02", "name": "吐司", "products": [
//			{ "id": "p021", "catId": "c02", "name": "果醬吐司", "price": 15, "comment": "切邊烤土司+一公分厚塗果醬", "img": "./Img/PC/p021.jpg", "subjoinIds": ["AH01"], "isSoldOut": false },
//			{ "id": "p022", "catId": "c02", "name": "鮪魚沙拉吐司", "price": 35, "comment": "切邊烤土司+一整罐鮪魚", "img": "./Img/PC/p022.jpg", "subjoinIds": ["AH01"], "isSoldOut": false },
//			{ "id": "p023", "catId": "c02", "name": "培根吐司", "price": 35, "comment": "切邊烤土司+雙份培根", "img": "./Img/PC/p023.jpg", "subjoinIds": ["AH01"], "isSoldOut": false },
//			{ "id": "p024", "catId": "c02", "name": "里肌豬排吐司", "price": 35, "comment": "切邊烤土司+厚切里肌豬排", "img": "./Img/PC/p024.jpg", "subjoinIds": ["AH01"], "isSoldOut": false }]
//	},
//	{
//		"id": "c03", "name": "漢堡", "products": [
//			{ "id": "p031", "catId": "c03", "name": "紐澳良豬排堡", "price": 55, "comment": "就是豬排加生菜的漢堡啦", "img": "./Img/PC/p031.jpg", "subjoinIds": ["AH01"], "isSoldOut": false },
//			{ "id": "p032", "catId": "c03", "name": "美味蟹堡", "price": 45, "comment": "是誰住在深海的大鳳梨裡", "img": "./Img/PC/p032.jpg", "subjoinIds": ["AH01"], "isSoldOut": false },
//			{ "id": "p033", "catId": "c03", "name": "阿拉斯加鱈魚堡", "price": 45, "comment": "鱈~魚~堡~", "img": "./Img/PC/p033.jpg", "subjoinIds": ["AH01"], "isSoldOut": false },
//			{ "id": "p034", "catId": "c03", "name": "日式和牛堡", "price": 100, "comment": "日本來的和牛，頂級享受", "img": "./Img/PC/p034.jpg", "subjoinIds": ["AH01"], "isSoldOut": false },
//			{ "id": "p035", "catId": "c03", "name": "薯泥堡", "price": 40, "comment": "內含薯泥沙拉，美味蔬食", "img": "./Img/PC/p035.jpg", "subjoinIds": ["AH01"], "isSoldOut": true },
//			{ "id": "p036", "catId": "c03", "name": "無骨雞腿堡", "price": 55, "comment": "精選黃金右腿去骨雞腿排", "img": "./Img/PC/p036.jpg", "subjoinIds": ["AH01"], "isSoldOut": false }]
//	},
//	{
//		"id": "c04", "name": "沙拉", "products": [
//			{ "id": "p041", "catId": "c04", "name": "經典美味沙拉", "price": 55, "comment": "全素草食餐", "img": "./Img/PC/p041.jpg", "subjoinIds": ["AH01", "AH04"], "isSoldOut": false },
//			{ "id": "p042", "catId": "c04", "name": "低脂蛋白沙拉", "price": 55, "comment": "很多葉子搭配水煮蛋、舒肥雞胸肉", "img": "./Img/PC/p042.jpg", "subjoinIds": ["AH01", "AH04"], "isSoldOut": false }]
//	},
//	{
//		"id": "c05", "name": "點心", "products": [
//			{ "id": "p051", "catId": "c05", "name": "歡樂薯餅", "price": 10, "comment": "薯餅薯餅得第一", "img": "./Img/PC/p051.jpg", "subjoinIds": ["AH01", "AH04"], "isSoldOut": false },
//			{ "id": "p052", "catId": "c05", "name": "雞塊", "price": 30, "comment": "一份4塊", "img": "./Img/PC/p052.jpg", "subjoinIds": ["AH04"], "isSoldOut": false },
//			{ "id": "p053", "catId": "c05", "name": "薯條", "price": 30, "comment": "酥脆薯條，素食可用", "img": "./Img/PC/p053.jpg", "subjoinIds": ["AH04"], "isSoldOut": false },
//			{ "id": "p054", "catId": "c05", "name": "熱狗", "price": 30, "comment": "國產熱狗", "img": "./Img/PC/p054.jpg", "subjoinIds": ["AH04"], "isSoldOut": false },
//			{ "id": "p055", "catId": "c05", "name": "月亮蝦餅", "price": 30, "comment": "泰式月亮蝦餅搭配泰式酸辣醬", "img": "./Img/PC/p055.jpg", "subjoinIds": ["AH04"], "isSoldOut": false }]
//	},
//	{
//		"id": "c06", "name": "飲品", "products": [
//			{ "id": "p061", "catId": "c06", "name": "早餐店奶茶", "price": 15, "comment": "台灣特色，早餐店奶茶", "img": "./Img/PC/p061.jpg", "subjoinIds": ["AH02", "AH03", "AH04"], "isSoldOut": false },
//			{ "id": "p062", "catId": "c06", "name": "經典紅茶", "price": 15, "comment": "台灣高山茶葉沖泡", "img": "./Img/PC/p062.jpg", "subjoinIds": ["AH01", "AH02", "AH03"], "isSoldOut": false }]
//	}]


//theFoodSubjoins = [
//	{
//		"id": "AH01", "name": "加料", "isMulti": true, "items": [
//			{ "id": "AD011", "name": "加蛋", "price": 10 },
//			{ "id": "AD012", "name": "加培根", "price": 15 },
//			{ "id": "AD013", "name": "加蔥花", "price": 5 },
//			{ "id": "AD014", "name": "加起司", "price": 10 },
//			{ "id": "AD015", "name": "加蔬菜", "price": 10 },
//			{ "id": "AD016", "name": "不要醬料", "price": 0 },
//			{ "id": "AH017", "name": "不要胡椒", "price": 0 }]
//	},
//	{
//		"id": "AH02", "name": "大小", "isMulti": false, "items": [
//			{ "id": "AD021", "name": "M", "price": 0 },
//			{ "id": "AD022", "name": "L", "price": 10 }]
//	},
//	{
//		"id": "AH03", "name": "溫度", "isMulti": false, "items": [
//			{ "id": "AD031", "name": "熱", "price": 0 },
//			{ "id": "AD032", "name": "溫", "price": 0 },
//			{ "id": "AD033", "name": "去冰", "price": 0 },
//			{ "id": "AD034", "name": "冰", "price": 0 }]
//	},
//	{
//		"id": "AH04", "name": "醬料", "isMulti": true, "items": [
//			{ "id": "AD041", "name": "番茄醬", "price": 0 },
//			{ "id": "AD042", "name": "芥末醬", "price": 0 },
//			{ "id": "AD043", "name": "辣椒醬", "price": 0 },
//			{ "id": "AD044", "name": "凱薩醬", "price": 0 },
//			{ "id": "AD045", "name": "胡麻醬", "price": 0 },
//			{ "id": "AD046", "name": "糖醋醬", "price": 0 }]
//	}]

//theAllOrders = [
//	{
//		"id": "OD1669619419597",
//		"userId": 2,
//		"name": "Cake",
//		"phone": "0958783183",
//		"comment": "不用塑膠袋",
//		"price": 70,
//		"orderDate": "2022-11-28",
//		"orderTime": "15:10:19",
//		"takeWay": "外帶",
//		"isPaid": false,
//		"isDone": false,
//		"details": [
//			{
//				"catId": "c05",
//				"id": "p051",
//				"name": "歡樂薯餅",
//				"additems": [],
//				"price": 10,
//				"qty": 4,
//				"comment": "請幫我加很多番茄醬"
//			},
//			{
//				"catId": "c06",
//				"id": "p061",
//				"name": "早餐店奶茶",
//				"additems": [],
//				"price": 15,
//				"qty": 1,
//				"comment": ""
//			},
//			{
//				"catId": "c02",
//				"id": "p021",
//				"name": "果醬吐司",
//				"additems": [],
//				"price": 15,
//				"qty": 1,
//				"comment": ""
//			}
//		]
//	},
//	{
//		"id": "OD1669622562629",
//		"userId": 3,
//		"name": "小明",
//		"phone": "0911333555",
//		"comment": "第一次來這邊點餐",
//		"price": 115,
//		"orderDate": "2022-11-28",
//		"orderTime": "16:02:42",
//		"takeWay": "外帶",
//		"isPaid": false,
//		"isDone": true,
//		"details": [
//			{
//				"catId": "c03",
//				"id": "p034",
//				"name": "日式和牛堡",
//				"additems": [],
//				"price": 100,
//				"qty": 1,
//				"comment": ""
//			},
//			{
//				"catId": "c06",
//				"id": "p062",
//				"name": "經典紅茶",
//				"additems": [],
//				"price": 15,
//				"qty": 1,
//				"comment": ""
//			}
//		]
//	},
//	{
//		"id": "OD1670063897679",
//		"userId": 3,
//		"name": "小明",
//		"phone": "0911333555",
//		"comment": "謝謝老闆",
//		"price": 115,
//		"orderDate": "2022-12-03",
//		"orderTime": "18:38:17",
//		"takeWay": "外帶",
//		"isPaid": false,
//		"isDone": false,
//		"details": [
//			{
//				"catId": "c06",
//				"id": "p061",
//				"name": "早餐店奶茶",
//				"price": 15,
//				"qty": 1,
//				"comment": "",
//				"additems": [
//					"AD021",
//					"AD034"
//				]
//			},
//			{
//				"catId": "c01",
//				"id": "p012",
//				"name": "玉米蛋餅",
//				"price": 50,
//				"qty": 2,
//				"comment": "裝在一起",
//				"additems": [
//					"AD011",
//					"AD014"
//				]
//			}
//		]
//	},
//	{
//		"id": "OD1670067346035",
//		"userId": 5,
//		"name": "杰倫",
//		"phone": "0926398045",
//		"comment": "",
//		"price": 270,
//		"orderDate": "2022-12-03",
//		"orderTime": "19:35:46",
//		"takeWay": "外帶",
//		"isPaid": false,
//		"isDone": true,
//		"details": [
//			{
//				"catId": "c05",
//				"id": "p051",
//				"name": "歡樂薯餅",
//				"price": 10,
//				"qty": 4,
//				"comment": "",
//				"additems": [
//					"AD041"
//				]
//			},
//			{
//				"catId": "c04",
//				"id": "p042",
//				"name": "低脂蛋白沙拉",
//				"price": 80,
//				"qty": 1,
//				"comment": "",
//				"additems": [
//					"AD011",
//					"AD012",
//					"AD044"
//				]
//			},
//			{
//				"catId": "c01",
//				"id": "p013",
//				"name": "培根蛋餅",
//				"price": 40,
//				"qty": 2,
//				"comment": "",
//				"additems": [
//					"AD013"
//				]
//			},
//			{
//				"catId": "c06",
//				"id": "p062",
//				"name": "經典紅茶",
//				"price": 15,
//				"qty": 2,
//				"comment": "",
//				"additems": [
//					"AD021",
//					"AD034"
//				]
//			},
//			{
//				"catId": "c06",
//				"id": "p061",
//				"name": "早餐店奶茶",
//				"price": 25,
//				"qty": 1,
//				"comment": "",
//				"additems": [
//					"AD022",
//					"AD032"
//				]
//			},
//			{
//				"catId": "c06",
//				"id": "p061",
//				"name": "早餐店奶茶",
//				"price": 15,
//				"qty": 1,
//				"comment": "",
//				"additems": [
//					"AD021",
//					"AD034"
//				]
//			}
//		]
//	},
//	{
//		"id": "OD1670121729628",
//		"userId": 6,
//		"name": "楓K",
//		"phone": "0911321123",
//		"comment": "",
//		"price": 155,
//		"orderDate": "2022-12-04",
//		"orderTime": "10:42:09",
//		"takeWay": "內用",
//		"isPaid": false,
//		"isDone": true,
//		"details": [
//			{
//				"catId": "c03",
//				"id": "p034",
//				"name": "日式和牛堡",
//				"price": 120,
//				"qty": 1,
//				"comment": "",
//				"additems": [
//					"AD011",
//					"AD014"
//				]
//			},
//			{
//				"catId": "c05",
//				"id": "p051",
//				"name": "歡樂薯餅",
//				"price": 10,
//				"qty": 2,
//				"comment": "",
//				"additems": [
//					"AD041"
//				]
//			},
//			{
//				"catId": "c06",
//				"id": "p061",
//				"name": "早餐店奶茶",
//				"price": 15,
//				"qty": 1,
//				"comment": "",
//				"additems": [
//					"AD021",
//					"AD032"
//				]
//			}
//		]
//	},
//	{
//		"id": "OD1670122266392",
//		"userId": 7,
//		"name": "章魚哥",
//		"phone": "0911123123",
//		"comment": "",
//		"price": 70,
//		"orderDate": "2022-12-04",
//		"orderTime": "10:51:06",
//		"takeWay": "外帶",
//		"isPaid": false,
//		"isDone": true,
//		"details": [
//			{
//				"catId": "c03",
//				"id": "p032",
//				"name": "美味蟹堡",
//				"price": 55,
//				"qty": 1,
//				"comment": "",
//				"additems": [
//					"AD015"
//				]
//			},
//			{
//				"catId": "c06",
//				"id": "p062",
//				"name": "經典紅茶",
//				"price": 15,
//				"qty": 1,
//				"comment": "",
//				"additems": [
//					"AD021"
//				]
//			}
//		]
//	},
//	{
//		"id": "OD1670122368461",
//		"userId": 8,
//		"name": "珊迪",
//		"phone": "0912123222",
//		"comment": "",
//		"price": 140,
//		"orderDate": "2022-12-04",
//		"orderTime": "10:52:48",
//		"takeWay": "外帶",
//		"isPaid": false,
//		"isDone": true,
//		"details": [
//			{
//				"catId": "c01",
//				"id": "p013",
//				"name": "培根蛋餅",
//				"price": 35,
//				"qty": 1,
//				"comment": "",
//				"additems": []
//			},
//			{
//				"catId": "c04",
//				"id": "p042",
//				"name": "低脂蛋白沙拉",
//				"price": 80,
//				"qty": 1,
//				"comment": "",
//				"additems": [
//					"AD011",
//					"AD012",
//					"AD044"
//				]
//			},
//			{
//				"catId": "c06",
//				"id": "p061",
//				"name": "早餐店奶茶",
//				"price": 25,
//				"qty": 1,
//				"comment": "",
//				"additems": [
//					"AD022",
//					"AD034"
//				]
//			}
//		]
//	},
//	{
//		"id": "OD1670122492366",
//		"userId": 9,
//		"name": "派大星",
//		"phone": "0911123333",
//		"comment": "",
//		"price": 215,
//		"orderDate": "2022-12-04",
//		"orderTime": "10:54:52",
//		"takeWay": "外帶",
//		"isPaid": false,
//		"isDone": false,
//		"details": [
//			{
//				"catId": "c05",
//				"id": "p052",
//				"name": "雞塊",
//				"price": 30,
//				"qty": 1,
//				"comment": "",
//				"additems": []
//			},
//			{
//				"catId": "c05",
//				"id": "p053",
//				"name": "薯條",
//				"price": 30,
//				"qty": 2,
//				"comment": "",
//				"additems": []
//			},
//			{
//				"catId": "c05",
//				"id": "p051",
//				"name": "歡樂薯餅",
//				"price": 10,
//				"qty": 4,
//				"comment": "",
//				"additems": [
//					"AD041"
//				]
//			},
//			{
//				"catId": "c05",
//				"id": "p054",
//				"name": "熱狗",
//				"price": 30,
//				"qty": 2,
//				"comment": "",
//				"additems": [
//					"AD041"
//				]
//			},
//			{
//				"catId": "c06",
//				"id": "p061",
//				"name": "早餐店奶茶",
//				"price": 25,
//				"qty": 1,
//				"comment": "",
//				"additems": [
//					"AD022",
//					"AD034"
//				]
//			}
//		]
//	}
//]

