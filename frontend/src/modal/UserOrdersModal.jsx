import { useState, useEffect } from 'react'

//渲染歷史訂單Modal //todo
export function UserOrdersModal({ onClose }) {
	let [userOrders, setUserOrders] = useState(theUserOrders)
	let contents = [];
	let content
	let [userOrdersPage, setUserOrdersPage] = useState()


	//取得用戶歷史訂單
	function getUserOrders() {
		const userId = getDataFromLocalStorage('_user').userId;
		const token = getDataFromLocalStorage('_token');
		const config = { headers: { 'Authorization': `Bearer ${token}` } }

		//axios.get(`${urlDomain}/600/orders?userId=${userId}`, config)
		return new Promise((resolve, reject) => {
			axios.get(`${urlDomain}/orders?userId=${userId}`, config)
				.then(response => {
					console.log('ok');
					console.log('theUserOrders', response);
					theUserOrders = response.data;
					resolve = theUserOrders
					//console.log('theUserOrders', theUserOrders);
					renderUserOrdersModal();
					setUserOrders(() => theUserOrders)
				}).catch((error) => {
					console.log('error', error);
					theUserOrders = [];
					reject = theUserOrders
					//renderUserOrdersModal();
				});
		})
	}

	function hanledUserOrders() {
		try {
			let _promes = getUserOrders()
				.then(res =>
					console.log("hanledUserOrders ok ")
				).catch(() => { console.log('hanledUserOrders error thing') }
				).finally(() => { console.log('hanledUserOrders finally thing') });


			//	Promise.all([pagination]).then(report => {
			//	console.log("UserOrdersModal log ok")
			//	console.log(report)
			//}).catch(function (error) {
			//	console.log('UserOrdersModal error', error);		
			//	//renderUserOrdersModal();
			//});
			renderUserOrdersModal();
		} catch (e) {
			console.log("hanledUserOrders error")
			logMyErrors(e); // 把例外物件傳給錯誤處理器
		}
	}
	useEffect(getUserOrders, [])

	//渲染歷史訂單Modal //todo
	function renderUserOrdersModal() {
		if (theUserOrders.length > 0) {
			setUserOrdersPage(() => theUserOrders.map((orderObj, index) => {
				//let { orderId, userId, userName, phone, comment, price, orderDate, isPaid, isDone, details } = orderObj;
				let { orderId, userId, userName, phone, remark, totalPrice, dateTime, takeAway, isDone, details } = orderObj;
				let cartfoodCard =
					<div
						className="cartfoodCard d-flex mb-2"
						data-order-id={orderId}
						data-bs-toggle="collapse"
						data-bs-target={"#collapseOrder-" + orderId}
					>

						<div>
							<div className="">
								<span className="h6 fw-bolder">訂單日期</span>
								<span className="fw-light">{dateTime}</span>
							</div>
							<div>
								<span className="h6 fw-bolder">訂單編號</span>
								<span className="fw-light">{orderId}</span>
							</div>
						</div>
						<div className="d-flex flex-column ms-auto">
							<span>{isDone ? '已完成' : '製作中'}</span>
							<span className="text-danger fw-bold ms-auto">${totalPrice}</span>
						</div>
					</div>


				let detailContent = details.map((foodObj, index) => {
					return (
						<div key={index} className="cartfoodCard d-block mb-2" data-id={foodObj.orderId} data-price={foodObj.price}>
							<span className="h6 fw-bolder text-start">{foodObj.menuName}</span>
							<br />
							<span className="fw-light">{foodObj.remark ? (foodObj.remark + " / ") : ''}</span>
							<span className="fw-light">{foodObj.subItems.length > 0 ? foodObj.subItems.map(x => x.subName).join("/") : ''}</span>
							<div className="d-flex justify-content-between">
								<span className="fw-light">{foodObj.qty}份</span>
								<div className="text-danger fw-bold">${foodObj.price * foodObj.qty}</div>
							</div>
						</div>)
				})

				let content =
					<div key={index} >
						{cartfoodCard}
						<div className="collapse px-3 pt-0 pb-3" id={"collapseOrder-" + orderId}>
							{detailContent}
						</div>
					</div>
				return content

			}))
		} else {
			setUserOrdersPage(() => <div className="text-center" > 沒有訂單</div >)
		}
	}


	return <>
		<div className="modal fade show" id="userOrdersModal" tabIndex="-1" aria-modal="true" role="dialog" style={{ display: "block" }} >

			<div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
				<div className="modal-content">
					<div className="modal-header d-block pb-1">
						<button type="button" className="btn-close float-end float" data-bs-dismiss="modal" aria-label="Close" onClick={onClose}></button>
						<h5 className="text-center fw-bold">歷史訂單</h5>
					</div>
					<div className="modal-body">
						{userOrdersPage}
					</div>
					<div className="modal-footer flex-column border-0"></div>
				</div>
			</div>
		</div>
		<div className="modal-backdrop fade show" onClick={onClose}></div>
	</ >
}

