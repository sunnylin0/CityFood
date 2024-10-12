import { useState, useEffect, useCallback } from 'react'
//import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai'
//import { focusAtom } from 'jotai-optics'
//import {singleItem } from '../store/global'
import { getCarts, saveDataToLocalStorage } from '../store/utils'
import { calCartTotalPrice } from '../store/state'


export let singleItem = {
	tokenId:"",		//流水號
	catId: "",                              //"catId": "c05",
	id: "",                                 //"id": "p053",
	name: "",                               //"name": "薯條",
	price: 30,                                  //"price": 30,
	qty: 1,                               //"qty": 2,
	//comment: "",                                //"comment": "",
	remark:"",
	subjoinItems: [],          //"subjoinItems": []
	subjoinTotalPrice: 0,
	total: 0
}

function createTokenId() {
	return Math.random().toString(32).substr(2); // remove `0.`
}

//食物的附加選項
let SubjoinContents = ({  subjoinIds ,useSingleItem }) => {
	let [singleState, setSingleState] = useSingleItem;


    //計算食物的附加選項總價
    function catSubjoinTotalPrice() {
        let listSubjoin = document.querySelectorAll(".foodSubjoinOption")
        let newSubTotalPrice = 0;
        listSubjoin.forEach((ths) => {
			if (ths.checked) newSubTotalPrice += Number(ths.dataset.subprice);
        });
		setSingleState(prev => ({ ...prev, subjoinTotalPrice: newSubTotalPrice}))
    }

	//計算食物的附加選項總價
	let handleSubjoinChange = (e) => {
		const { subjoinItems } = singleState // 取得原值
		const value = e.target.value		// 取得數據，無論勾選與取消勾選都會傳值
		const newSubjoinItems = subjoinItems.filter(item => item !== value)
		// 把非 value 的部份保留
		setSingleState(prev => ({
			...prev,
			subjoinItems:
				newSubjoinItems.length !== prev.subjoinItems.length ? newSubjoinItems : [...prev.subjoinItems, value]
		}))

		catSubjoinTotalPrice()
	}



    return (subjoinIds.map((subjoinId, key) => {
        let addObj = theFoodSubjoins.find(x => x.id == subjoinId);

        return (
            <div key={key} className="" data-addtion-id={addObj.id}>
                <label>{addObj.name}</label>
                <hr className="my-1" />
                {addObj.items.map((item, key) =>
                    <div key={key}>
                        <input type={addObj.isMulti ? 'checkbox' : 'radio'} className="btn-check foodSubjoinOption" name={addObj.name}
							id={'add-' + item.id} value={item.id} data-subprice={item.price} 
							checked={singleState.subjoinItems.indexOf(item.id) >= 0}
							onChange={handleSubjoinChange}
							/>
						<label className="btn btn-pill-primary" htmlFor={'add-' + item.id} >{item.price ? (item.name + '$' + item.price) : item.name}</label>
                    </div>
                )
                }
				{singleState.subjoinTotalPrice}
            </div>
        )
    }))
}
function getImageUrl(name) {
    if (name.charAt(0) == '.') name = name.slice(1);
    return new URL(name, import.meta.url).href;
}

//渲染產品Modal
export function ProductModal({ productId, editProduct, onClose }) {
	console.log('load ProductModal')
	let myProductObj
	let flagEdit = false		//是否是編輯旗標
	if (productId) {
		myProductObj = theProducts.find(productObj => productObj.id == productId);
	} else if (editProduct) {
		let pID = editProduct.id
		flagEdit = true
		myProductObj = theProducts.find(productObj => productObj.id == pID);
		myProductObj = { ...myProductObj, ...editProduct }
	} else return <></>
	let { tokenId = createTokenId(), catId, id, name, comment, price, img, isSoldOut, subjoinIds,
		qty = 1, total = 0, subjoinItems = [], subjoinTotalPrice = 0, Remark = "" } = myProductObj;

	//singleItem = { ...singleItem, catId, id, name, price, tokenId };
	let [state, setState] = useState({
		...singleItem,
		...myProductObj
		//catId, id, name, price, tokenId,
		//qty: 1,								//商品數量
		//total: 0,							//總價
		//subjoinItems: [],			//選擇附加選項物件
		//subjoinTotalPrice: 0,		//附加選項價格
		//remark: ""							//備註
	});

	let handleInputChange = (e) => {
		setState(prev=>({
			...prev, [e.target.name]: e.target.value
		}))
	}

	//調整商品數量
	const handleAdd = () => {
		setState(prev => ({ ...prev, qty: prev.qty + 1 }));
		countCurrentPrice();
	}
    const handleMin=()=> {
		if (state.qty > 1)
			setState(prev => ({ ...prev, qty: prev.qty - 1 }));
		else
			setState(prev => ({ ...prev, qty: 1 }));

        countCurrentPrice();
    }

    //計算產品總價
	const countCurrentPrice = () => {
		setState(prev => ({ ...prev, total: prev.qty * (prev.subjoinTotalPrice + price) }))
    }


	useEffect(countCurrentPrice, [state.qty,state.subjoinTotalPrice])

    //加入購物車
    function putToCart() {
        const carts = getCarts();  
		if (flagEdit == false) {
			carts.push({
				//...singleItem,
				...state
			});
		} else {
			carts.forEach(prev => {
				if (prev.tokenId == state.tokenId)
					prev = {
						...state
					}
			})
		}
		saveDataToLocalStorage('cart', carts);
		calCartTotalPrice();
		onClose();
    }

	////更新購物車
	//function updateToCart(productIndex) {
	//	const carts = getCarts();
	//	const qty = parseInt($('#tempProductAmount').text());
	//	const comment = $('#tempProductComment').val();
	//	const subjoinItems = [];
	//	$('#foodSubjoinOptions input.foodSubjoinOption:checked').each(function () {
	//		subjoinItems.push($(this).val());
	//	});
	//	const price = parseInt($("#tempProductTotal").text());
	//	carts[productIndex].qty = qty;
	//	carts[productIndex].comment = comment;
	//	carts[productIndex].subjoinItems = subjoinItems;
	//	carts[productIndex].price = price / qty;
	//	saveDataToLocalStorage('cart', carts);
	//	sweetSmallSuccess('已更新購物車');
	//	$('#productModal').modal('hide');
	//	showCartModal();
	//	updateFooterTotalPrice();
	//}

    return (
        <div>
            <div className="modal fade show" id="productModal" tabIndex="-1" aria-modal="true" role="dialog" style={{ display: "block" }} >
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header d-block pb-1" style={{ "borderWidth": 0 }}>
                            <button type="button" className="btn-close float-end float" data-bs-dismiss="modal" onClick={onClose}></button>
                            <h5 className="text-center fw-bolder">{name}</h5>
                        </div>

                        <div className="modal-body pt-1">
                            {/*<!-- 介紹 -->*/}
                            <div>
                                <img src={getImageUrl(img)} className="modalFoodImg mb-3" alt="" />
                                <p className="h6 fw-light">{comment}</p>
                                <p className="h6 fw-light"></p>
                                <p className="h5">${price}</p>
                            </div>
                            {/*<!-- 選項 -->*/}
                            <div id="foodSubjoinOptions">
                                <SubjoinContents
									subjoinIds={subjoinIds}
									useSingleItem={[state,setState]}
									name="subjoin" />
                            </div>

                            <br />
                            {/*<!-- 備註 -->*/}
                            <div>
                                <p className="h6">餐點備註</p>
								<textarea className="form-control" id="tempProductRemark" rows="2"
									name ="remark"
									value={state.remark}
									onChange={handleInputChange}></textarea>
                            </div>
                        </div>
                        <div className="modal-footer flex-column">
                            {/*<!-- 數量 -->*/}
                            <div className="d-flex align-items-center">
                                <button className="btn rounded-circle btn-sm btn-minus" onClick={handleMin}><i className="fa-solid fa-minus small"></i></button>
                                <span className="mx-4" id="tempProductAmount">{state.qty}</span>
                                <button className="btn rounded-circle btn-sm btn-add" onClick={handleAdd}><i className="fa-solid fa-plus small"></i></button>
                            </div>

                            {/* <!-- 加入購物車 -->*/}
							<button type="button" className="btn btn-addToCart my-1" id="btnAddToCart" onClick={putToCart} >
                                <span className=""> 加入購物車($</span>
								<span className="" id="tempProductTotal" data-food-price={price} data-add-price="0" >{state.total}</span>
                                <span className="">)</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop fade show"></div>
        </div>
    )

}


function aass() {
    //加入購物車
    function addToCart(catId, productId) {
        const products = theMenu.find(x => x.id == catId).products.find(x => x.id == productId);
        const carts = getCarts();
        const qty = parseInt($('#tempProductAmount').text());
        const comment = $('#tempProductComment').val();
        let subjoinItems = [];
        $('#foodSubjoinOptions input.foodSubjoinOption:checked').each(function () {
            subjoinItems.push($(this).val());
        });
        const price = parseInt($("#tempProductTotal").text());
        carts.push({
            catId: catId,
            id: products.id,
            name: products.name,
            price: price / qty,
            qty: qty,
            comment: comment,
            subjoinItems: subjoinItems,
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
        const subjoinItems = [];
        $('#foodSubjoinOptions input.foodSubjoinOption:checked').each(function () {
            subjoinItems.push($(this).val());
        });
        const price = parseInt($("#tempProductTotal").text());
        carts[productIndex].qty = qty;
        carts[productIndex].comment = comment;
        carts[productIndex].subjoinItems = subjoinItems;
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
            $("#cartModal").modal('hide');
            showLoginModal()
            return;
        }
        const order = {
            id: "OD" + (+new Date()).toString(),
            userId: getDataFromLocalStorage('_user').id,
            name: getDataFromLocalStorage('_user').name,
            phone: getDataFromLocalStorage('_user').phone,
            comment: $('#cartComment').val(),
            price: countCartTotalPrice(),
            orderDate: getTimeNow().split(" ")[0],
            orderTime: getTimeNow().split(" ")[1],
            takeWay: $('#cartTakeWay input:checked').val(),
            isPaid: false,
            isDone: false,
            details: carts,
        }
        postCartOrder(order);
    }
    //更新footer的訂單小計
    function updateFooterTotalPrice() {
        $("#footerTotalPrice").text(countCartTotalPrice());
    }
    //讀取購物車內容
    function getCarts() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        return cart;
    }
    //調整商品數量
    function adjAmount(price, method) {
        let tempProductAmount = parseInt($('#tempProductAmount').text());
        if (method == 'add') {
            tempProductAmount++;
        } else if (method == 'minus' && tempProductAmount > 1) {
            tempProductAmount--;
        }
        $('#tempProductAmount').text(tempProductAmount);
        countCurrentPrice();
        //$('#tempProductTotal').text(`${price * tempProductAmount}`);
    }
    //附加選項增減
    function btnSubjoinChange() {
        let subPrice = 0;
        $("#foodSubjoinOptions input.foodSubjoinOption:checked").each(function () {
            subPrice += parseInt($(this).attr('data-add-price'));
        })
        $('#tempProductTotal').attr('data-add-price', subPrice);
        countCurrentPrice();
    }

    //計算產品總價
    function countCurrentPrice() {
        const foodPrice = parseInt($('#tempProductTotal').attr('data-food-price'));
        const subjoinPrice = parseInt($('#tempProductTotal').attr('data-add-price'));
        const qty = parseInt($('#tempProductAmount').text());
        const currentPrice = (foodPrice + subjoinPrice) * qty;
        $('#tempProductTotal').text(currentPrice);
    }
}