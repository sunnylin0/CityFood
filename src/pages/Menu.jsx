import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useAtom } from 'jotai'
import { Header } from './Header'
import { Footer } from './Footer'
import ModalContent from './PModalContent'
import { AdModal } from '../modal/AdModal'
import { ProductModal } from '../modal/ProductModal'
import { editProductModal, editProductObj } from '../store/state'

export const Menu = ({ selectName }) => {
	let [showEidtProductModal, setShowEditProductModal] = useAtom(editProductModal)
	let [postEidtProductObj, setEditProductObj] = useAtom(editProductObj)
    const [showModal, setShowModal] = useState(
        {
            show: false,
            selectId:""
        });

    let showProductModal = (catId, Id) => {   
        setShowModal({
            show: true,
            selectId:Id
        });
    }

	return <div className="menu container pb-6" id="menu">
		{showModal.show &&
			createPortal(<ProductModal productId={showModal.selectId} onClose={() => setShowModal({ show: false })} />, document.body)}
		{showEidtProductModal &&
			createPortal(<ProductModal editProduct={postEidtProductObj} onClose={() => setEditProductObj(false)} />, document.body)}
        {
            theMenu.map((catObj, index) =>
                <div className={(catObj.name == selectName || selectName == "全部") ? "" : "d-none"}
                    key={index} name="foodCat" data-cat={catObj.name} >
                    <div className="catTitle my-3" data-cat={catObj.name}>
                        <span className="h4 fw-bolder">{catObj.name}</span>
                    </div>
                    <div className="menu-cards row g-3" data-cat={catObj.name}>
                        {
                            catObj.products.map((productObj, index) =>
                                <div key={index} className="col-12 col-md-6 col-xl-4 position-relative" >
                                    <div className={'foodCard ' + (productObj.isSoldOut ? 'soldout' : '')} onClick={() => showProductModal(productObj.catId, productObj.id)}>
                                        <div className="d-flex flex-column w-60">
                                            <p className="h5">{productObj.name}</p>
                                            <p className="h6">{productObj.comment}</p>
                                            <p className="h5 mt-auto">{'$' + productObj.price}</p>
                                        </div>
                                        <div className="d-inline-block ms-auto">
                                            <img className="menuCardImg" src={productObj.img} alt="" />
                                        </div>
                                        <div className={'soldoutMask ' + (productObj.isSoldOut ? '' : 'd-none')}>已售完</div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            )
        }
    </div>
}