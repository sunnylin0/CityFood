

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom'
import { useAtom } from 'jotai'
import { getCarts, saveDataToLocalStorage } from '../store/utils'
import { ProductModal } from './ProductModal'
import { editProductModal, editProductObj } from '../store/state'


//附加選項id轉name
function additionIdToName(additionId) {
	let name = Object.values(theFoodAdditions).reduce((a, b) => [...a, ...b.items], []).find(item => item.id == additionId)?.name
	return name ? name : '';
}


//計算購物車總金額
function countCartTotalPrice() {
	let cartList = getCarts();
	let totalPrice = 0;
	cartList.forEach(productObj => {
		totalPrice += productObj.price * productObj.qty;
	})
	return totalPrice;
}


let CartFoodCard = ({ index, productObj, deleteCartProduct, editCartProduct }) => {
	const { id, name, price, qty, comment, additems } = productObj;

	return (
		<div className="cartfoodCard d-block mb-2" data-id={id} data-price={price}>
			<div className="d-flex justify-content-between mb-2">
				<span className="h6 fw-bolder">{name}</span>
				<div className="">
					<button className="btn rounded-circle btn-sm cartEdit" onClick={()=>editCartProduct(id, index)}><i className="fa-solid fa-pencil"></i></button>
					<button className="btn rounded-circle btn-sm cartDelete" onClick={()=>deleteCartProduct(index)}><i className="fa-solid fa-trash-can"></i></button>
				</div>
			</div>

			<span className="h6 fw-light d-block">{comment ? (comment) : ""}</span>
			<span className="h6 fw-light d-block">{additems.map(x => additionIdToName(x)).join("/")}</span>
			<div className="d-flex justify-content-between">

				<span className="fw-light">${price} / {qty}份</span>
				<div className="text-danger fw-bold">${price * qty}</div>
			</div>
		</div>
	)
}

export let CartModal = ({ onClose }) => {
	//let cartList = getCarts()
	let [cartList, setCartList] = useState(getCarts())
	let contentCartList = [];	
	let [showModal, setShowModal] = useState(false)
	//let editProductObj;
	let [showEidtProductModal, setShowEditProductModal] = useAtom(editProductModal)
	let [postEditProductObj, setEditProductObj] = useAtom(editProductObj)

	//刪除購物車商品
	let deleteCartProduct=(productIndex)=>{
		cartList.splice(productIndex, 1);
		setCartList(() => [...cartList]);		
		saveDataToLocalStorage('cart', cartList);		
		//renderCartModal();
		//updateFooterTotalPrice();
	}
	//編輯購物車商品
	function editCartProduct(productId, productIndex) {
		//$('#cartModal').modal('hide');
		//renderProductModal(productId);
		let cartList = getCarts();
		console.log('editCartProduct')
		setEditProductObj(cartList[productIndex]);
		onClose();
		setShowEditProductModal(() => true)
		//$('#tempProductAmount').text(productObj.qty);
		//$('#tempProductComment').val(productObj.comment);
		//$('#tempProductTotal').text(`${productObj.price * productObj.qty}`);
		//$('#btnAddToCart').attr('onclick', `updateToCart(${productIndex})`);
		//$('#productModal').modal('show');
		//productObj.additems.forEach(additem => {
		//	$(`#foodAdditionOptions input[value=${additem}]`).prop('checked', true);
		//})
	}
	useEffect(() => setShowModal(true), [showModal]);
	return (
		<>
		
			<div className="modal fade show" id="cartModal" tabIndex="-1" aria-modal="true" role="dialog" style={{ display: "block" }} >
				<div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
					<div className="modal-content">
						<div className="modal-header d-block pb-1">
							<button type="button" className="btn-close float-end float" data-bs-dismiss="modal" aria-label="Close" onClick={onClose}></button>
							<h5 className="text-center fw-bold">購物車資訊</h5>
						</div>
						<div className="modal-body">
							<div name="商品明細" className="mb-3">
								<h5 className="fw-bolder">商品明細</h5>
								<hr className="my-2" />
								{
									(cartList.length > 0) ?
										cartList.map((productObj, index) => {
											//const { id, name, price, qty, comment, additems } = productObj;
											return <CartFoodCard key={index} index={index}
												productObj={productObj}
												deleteCartProduct={deleteCartProduct}
												editCartProduct={editCartProduct}
											/>
										})
										: <div className="text-center">購物車內沒有商品</div>
								}
							</div>
							<div name="取餐方式" className="mb-3" id="cartTakeWay">
								<h5 className="fw-bolder">取餐方式</h5>
								<hr className="my-2" />
								<input type="radio" className="btn-check" name="取餐方式" id="tag外帶" value="外帶" autoComplete="off" defaultChecked />
								<label className="btn btn-cat-tag" forhtml="tag外帶">外帶</label>

								<input type="radio" className="btn-check" name="取餐方式" id="tag內用" value="內用" autoComplete="off" />
								<label className="btn btn-cat-tag" forhtml="tag內用">內用</label>
							</div>
							<div name="訂單備註" className="mb-3">
								<h5 className="fw-bolder">訂單備註</h5>
								<hr className="my-2" />
								<textarea className="form-control" id="cartComment" rows="2"></textarea>
							</div>
						</div>
						<div className="modal-footer flex-column">
							{/*<!-- 加入購物車 -->*/}
							<button type="button" className="btn btn-addToCart my-1" onClick={() => submitCart()}>
								<span className=""> 送出訂單</span>
								<span id="tempCartTotalPrice">($70)</span>
							</button>
						</div>
					</div>
				</div>
			</div>

			<div className="modal-backdrop fade show" onClick={onClose}></div>
		</>

	)



}