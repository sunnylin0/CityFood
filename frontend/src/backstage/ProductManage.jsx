import { useState } from 'react'
import { createPortal } from 'react-dom'
import { BackHeader } from './BackHeader'
import { ProductEditModal } from './ProductEditModal'



export const ProductManage = () => {
    const [showEditModal, setShowEditModal] = useState(false);
    function openEditModal(idName) { setShowEditModal(idName); }
    function closeEditModal() { setShowEditModal(false); }

    /* 新增品項 */
    function btnAddProduct() {
        setShowEditModal("add");
    }
    return (
        <>
            {showEditModal && createPortal(<ProductEditModal idName={showEditModal} onClose={closeEditModal} />, document.body)}
            {/*<!-- 最上方標題導覽列 -->*/}
            <BackHeader />
            {/*<!-- 中間主要內容 -->*/}
            <div className="main-content container">
                <div className="page productManage" style={{ display: "block" }}>
                    <div className="table-scroll h-100vh pb-5" id="productManage">
                        <table className="table">
                            <thead>
                                <tr className="text-center">
                                    <th>品項名稱</th>
                                    <th>類別</th>
                                    <th>圖片</th>
                                    <th>簡介</th>
                                    <th>附加項目</th>
                                    <th>狀態</th>
                                    <th>價格</th>
                                    <th>編輯</th>
                                </tr>
                            </thead>
                            <tbody id="productManageList">
                                <tr className="text-center">
                                    <td>玉米蛋餅</td>
                                    <td>蛋餅</td>
                                    <td>
                                        <img src="https://raw.githubusercontent.com/ColdingPoTaTo/resCollection/main/breakfast/menu/p012.jpg" alt="" className="tableFoodImg" />
                                    </td>
                                    <td width="25%">手工蛋餅皮+滿滿玉米</td>
                                    <td>加料</td>
                                    <td className="">販售中</td>
                                    <td>$30</td>
                                    <td>
                                        <button className="btn btn-sm btn-outline-primary" onClick={() => setShowEditModal('p012')}>編輯</button>
                                        <button className="btn btn-sm btn-outline-danger" onClick={() => deleteProduct('p012')} hidden="">刪除</button>
                                    </td>
                                </tr>

                                <tr className="text-center">
                                    <td>培根蛋餅</td>
                                    <td>蛋餅</td>
                                    <td>
                                        <img src="https://raw.githubusercontent.com/ColdingPoTaTo/resCollection/main/breakfast/menu/p013.jpg" alt="" className="tableFoodImg" />
                                    </td>
                                    <td width="25%">手工蛋餅皮+雙份培根</td>
                                    <td>加料</td>
                                    <td className="">販售中</td>
                                    <td>$35</td>
                                    <td>
                                        <button className="btn btn-sm btn-outline-primary" onClick={() => setShowEditModal('p013')}>編輯</button>
                                        <button className="btn btn-sm btn-outline-danger" onClick={() => deleteProduct('p013')} hidden="">刪除</button>
                                    </td>
                                </tr>

                                <tr className="text-center">
                                    <td>火腿蛋餅</td>
                                    <td>蛋餅</td>
                                    <td>
                                        <img src="https://raw.githubusercontent.com/ColdingPoTaTo/resCollection/main/breakfast/menu/p014.jpg" alt="" className="tableFoodImg" />
                                    </td>
                                    <td width="25%">手工蛋餅皮+整條火腿</td>
                                    <td>加料</td>
                                    <td className="">販售中</td>
                                    <td>$35</td>
                                    <td>
                                        <button className="btn btn-sm btn-outline-primary" onClick={() => setShowEditModal('p014')}>編輯</button>
                                        <button className="btn btn-sm btn-outline-danger" onClick={() => deleteProduct('p014')} hidden="">刪除</button>
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {/*<!-- 頁尾 -->*/}
            <div className="footer py-2">
                <div className="container">
                    <div className="page productManage" style={{ display: "block" }}>
                        <div className="d-flex justify-content-end align-items-center py-2 pe-3">
                            <button className="btn btn-sm btn-my-primary" onClick={() => btnAddProduct()}>新增品項</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}