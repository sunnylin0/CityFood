
import { atom } from 'jotai'
import { getCarts, saveDataToLocalStorage } from '../store/utils'


export let editProductModal = atom(false)
export let editProductObj = atom({})

export let cardTotalPrice = atom(0)
//�p���`����
export function calCartTotalPrice() {
	let cartList = getCarts();
	let totalPrice = cartList.reduce(function (total, productObj) {
		return total + productObj.total
	}, 0)
	console.log("State calCartTotalPrice:" + totalPrice)
	cardTotalPrice = atom(totalPrice)
	//setTotalPrice(totalPrice);
}