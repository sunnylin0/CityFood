import { useState } from 'react'
import { createPortal } from 'react-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { Menu } from './Menu'
import { TagList } from './TagList'
import { PopupWindows } from './Popup'
import { useAtom } from 'jotai'
import { ProductModal } from '../modal/ProductModal'
import { editProductModal, editProductObj} from '../store/state'

export const Order = () => {
    /*    const [state, dispatch] = useStore();*/
    let [selectName, setSelectName] = useState("全部")
    let [showEidtProductModal, setShowEditProductModal] = useAtom(editProductModal)
    const handleChangeMenu = () => {
        let name = document.querySelector("input[name='分類標籤']:checked").value;
        setSelectName(name);
    }

    return (
        <div>
            {showEidtProductModal &&
            createPortal(<ProductModal editProduct={editProductObj} onClose={() => setShowModal(false)} />, document.body)}
            <Header />
            <div className="main-content">
                <Footer />

                <div className="container">
                    <div className="d-flex py-2 justify-content-center">

                        <TagList onChange={handleChangeMenu} />
                    </div>
                </div>
                <Menu selectName={selectName} />
            </div>
            <Footer />

        </div>
    )
}