import { useState } from 'react'
import { createPortal } from 'react-dom'
import { CartModal } from '@/modal/CartModal'




export function Footer({ onClose }) {
    const [showCartModal, setShowCartModal] = useState(false);

    function openCartModal() { setShowCartModal(true); }
    function closeCartModal() { setShowCartModal(false); }

    return (
        <div className="footer py-2">
            {showCartModal && createPortal(<CartModal onClose={closeCartModal} />, document.body)}
            <div className="container">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="border-left fw-bolder">
                        <span className="ms-2">訂單小計</span>
                        <span className="text-danger" id="footerTotalPrice">$0</span>
                    </div>
                    <div>
                        <button className="btn btn-chkOrder" onClick={() => openCartModal()}>查看購物車</button>
                    </div>
                </div>
            </div>
        </div>
    );
}