﻿import { useState, useEffect, useCallback } from 'react'
import { atom, useAtom, useAtomValue , useSetAtom } from 'jotai'
import {  focusAtom } from 'jotai-optics'
//import {singleItem } from '../store/global'


export let singleItem = {
    catId: "",                              //"catId": "c05",
    id: "",                                 //"id": "p053",
    name: "",                               //"name": "薯條",
    price: 30,                                  //"price": 30,
    qty: atom(1),                               //"qty": 2,
    comment: "",                                //"comment": "",
    additems: atom(["A011", "A022"]),          //"additems": []
    addTotalPrice: atom(0),
    total: atom(0)
}

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


//讀取購物車內容
function getCarts() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    return cart;
}


//食物的附加選項
let AdditionContents = ({ additionIds }) => {
    let [additems, setAdditionItems] = useAtom(singleItem.additems);       //附加選項 項目
    let [additionTotalPrice, setAdditionTotalPrice] = useAtom(singleItem.addTotalPrice);       //附加選項價格
    
    //let [sItem, setSItem] = useAtom(singleItem);

    //let [additems] = useAtom(atom((get) => get(singleItem).additems))
    //let [additionTotalPrice] = useAtom(atom((get) => get(singleItem).addTotalPrice))
    //const setAdditionTotalPrice = useFocusAddPrice(singleItem);
    //const setAdditionItems = useFocusAddItems(singleItem);

    //計算食物的附加選項總價
    function handleClickAddition(idName,isChecked){
        let listAddition = document.querySelectorAll(".foodAdditionOption")
        let addTotalPrice = 0;
        listAddition.forEach((ths) => {
            if (ths.checked) addTotalPrice += Number(ths.dataset.addprice);
            console.log("addTotalPrice=" + addTotalPrice);
        });
        //setAdditionTotalPrice(() => addTotlePrice);

        let filterNotIsIdname = additems.filter((item, index, array)=>
            item != idName
        );
        if (isChecked) filterNotIsIdname.push(idName);
        console.log(filterNotIsIdname);
        console.log(additems);
        // 更新 附加選項
        //setSItem(() => { return { ...sItem, additems: filterNotIsIdname, addTotalPrice} }  )
        setAdditionTotalPrice(addTotalPrice)
        setAdditionItems(filterNotIsIdname)
    }

    return (additionIds.map((additionId, key) => {
        let addObj = theFoodAdditions.find(x => x.id == additionId);

        return (
            <div key={key} className="" data-addtion-id={addObj.id}>
                <label>{addObj.name}</label>
                <hr className="my-1" />
                {addObj.items.map((item, key) =>
                    <div key={key}>
                        <input type={addObj.isMulti ? 'checkbox' : 'radio'} className="btn-check foodAdditionOption" name={addObj.name}
                            id={'add-' + item.id} value={item.id} data-addprice={item.price} onChange={(e) => handleClickAddition(item.id,e.target.checked)} />
                        <label className="btn btn-pill-primary" htmlFor={'add-' + item.id} >{item.name + '$' + item.price}</label>
                    </div>
                )
                }
                {/* {sItem.addTotalPrice}*/}
                {additionTotalPrice}
            </div>
        )
    }))
}
function getImageUrl(name) {
    if (name.charAt(0) == '.')  name=name.slice(1);
    return new URL(name, import.meta.url).href;
}

//渲染產品Modal
export function ProductModal({ productId, onClose }) {
    const myProductObj = theProducts.find(productObj => productObj.id == productId);
    const { catId, id, name, comment, price, img, isSoldOut, additionIds } = myProductObj;


    let [countProductAmount, setProductAmount] = useAtom(singleItem.qty);      //商品數量
    let [countProductTotal, setProductTotal] = useAtom(singleItem.total);      //總價
    let [additionTotalPrice] = useAtom(singleItem.addTotalPrice);       //附加選項價格

    //調整商品數量
    function handleAdd() {
        setProductAmount(() => countProductAmount + 1);
        countCurrentPrice();
    }
    function handleMin() {
        if (countProductAmount > 1)
            setProductAmount(() => countProductAmount - 1)
        else
            setProductAmount(() => 1)
        countCurrentPrice();
    }



    //計算產品總價
    function countCurrentPrice() {
        setProductTotal(
            () => (price + additionTotalPrice) * countProductAmount
        )
    }





    useEffect(countCurrentPrice, [countProductAmount, additionTotalPrice])

    let qty= useAtomValue(singleItem.qty);
    let additems= useAtomValue(singleItem.additems);
    let addTotalPrice= useAtomValue(singleItem.addTotalPrice);
    let total= useAtomValue(singleItem.total);

    //加入購物車
    function addToCart() {
        //const products = theMenu.find(x => x.id == catId).products.find(x => x.id == productId);
        const carts = getCarts();
        //const qty = parseInt($('#tempProductAmount').text());
        //const comment = $('#tempProductComment').val();
        //let additems = [];
        //$('#foodAdditionOptions input.foodAdditionOption:checked').each(function () {
        //    additems.push($(this).val());
        //});
        //const price = parseInt($("#tempProductTotal").text());        
        carts.push({
            ...singleItem, qty, additems, addTotalPrice, total
        });
        saveDataToLocalStorage('cart', carts);
        //$('#productModal').modal('hide');
        //updateFooterTotalPrice();
    }





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
                            <div id="foodAdditionOptions">
                                <AdditionContents additionIds={additionIds} />
                            </div>

                            <br />
                            {/*<!-- 備註 -->*/}
                            <div>
                                <p className="h6">餐點備註</p>
                                <textarea className="form-control" id="tempProductComment" rows="2"></textarea>
                            </div>
                        </div>
                        <div className="modal-footer flex-column">
                            {/*<!-- 數量 -->*/}

                            <div className="d-flex align-items-center">
                                <button className="btn rounded-circle btn-sm btn-minus" onClick={handleMin}><i className="fa-solid fa-minus small"></i></button>
                                <span className="mx-4" id="tempProductAmount">{countProductAmount}</span>
                                <button className="btn rounded-circle btn-sm btn-add" onClick={handleAdd}><i className="fa-solid fa-plus small"></i></button>
                            </div>

                            {/* <!-- 加入購物車 -->*/}
                            <button type="button" className="btn btn-addToCart my-1" id="btnAddToCart" onClick={addToCart} >
                                <span className=""> 加入購物車($</span>
                                <span className="" id="tempProductTotal" data-food-price={price} data-add-price="0" data-total-price={countProductTotal}>{countProductTotal}</span>
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
    function btnAdditionChange() {
        let addPrice = 0;
        $("#foodAdditionOptions input.foodAdditionOption:checked").each(function () {
            addPrice += parseInt($(this).attr('data-add-price'));
        })
        $('#tempProductTotal').attr('data-add-price', addPrice);
        countCurrentPrice();
    }

    //計算產品總價
    function countCurrentPrice() {
        const foodPrice = parseInt($('#tempProductTotal').attr('data-food-price'));
        const additionPrice = parseInt($('#tempProductTotal').attr('data-add-price'));
        const qty = parseInt($('#tempProductAmount').text());
        const currentPrice = (foodPrice + additionPrice) * qty;
        $('#tempProductTotal').text(currentPrice);
    }
}