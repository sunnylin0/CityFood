import { useState } from 'react'
import { createPortal } from 'react-dom'
import logo from '~/img/logo.svg';
import { AdModal } from '@/modal/AdModal'
import { GuideModal } from '@/modal/GuideModal'
import { UserOrdersModal } from '@/modal/UserOrdersModal'
import { LoginModal } from '@/modal/LoginModal'
import { BackHeader } from './BackHeader'
import { CustomerOrders } from './CustomerOrders'
import './BackStage.css'
export const BackStage = (props) => {
    const [switchOrders,setSwitchOrders] = useState('false')
    return (
        <div >
            {/*<!-- 最上方標題導覽列 -->*/}
            <BackHeader />
            {/*<!-- 中間主要內容 -->*/}
            <div className="main-content container">
                {/*<!-- 出餐管理 -->*/}
                <div className="page customerOrders" style={{ display: 'block' }}>
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-3 pb-5" id="customerOrders">
                        <CustomerOrders status={switchOrders}/>
                    </div>
                </div>

            

                {/*<!-- 商品管理 -->*/}

            </div>
            {/*<!-- 頁尾 -->*/}
            <div className="footer py-2">
                <div className="container">
                    {/*<!-- 出餐管理 -->*/}
                    <div className="page customerOrders" style={{ display: 'block' }}>
                        <div className="d-flex justify-content-end align-items-center py-2">
                            <div className="border-left me-3 fw-bolder finger" onClick={() => setSwitchOrders('all')}>
                                <span className="ms-2">全部訂單</span>
                                <span className="*text-danger" id="allOrdersCount">8</span>
                            </div>
                            <div className="border-left me-3 fw-bolder finger" onClick={() => setSwitchOrders('true')}>
                                <span className="ms-2">已完成</span>
                                <span className="*text-danger" id="doneOrdersCount">5</span>
                            </div>
                            <div className="border-left me-3 fw-bolder finger" onClick={() => setSwitchOrders('false')}>
                                <span className="ms-2">未完成</span>
                                <span className="text-danger" id="notDoneOrdersCount">3</span>
                            </div>
                        </div>
                    </div>
                    <div className="page productManage" style={{ display: 'none' }}>
                        <div className="d-flex justify-content-end align-items-center py-2 pe-3">
                            <button className="btn btn-sm btn-my-primary" onClick={() => btnAddProduct()}>新增品項</button>
                        </div>
                    </div>
                    </div>
                </div>
        </div>
    )
}