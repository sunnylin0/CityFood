import { useState } from 'react'
import { createPortal } from 'react-dom'
import { CartModal } from '@/modal/CartModal'

export const ProductEditModal = ({ onClose }) => {
    return (
        <>
            <div className="modal fade show" id="productEditModal" tabIndex="-1" style={{ display: "block" }} aria-modal="true" role="dialog">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header d-block">
                            <h4 className="text-center d-inline-block mb-0">編輯產品內容</h4>
                            <button type="button" className="btn-close float-end float" data-bs-dismiss="modal" aria-label="Close" onClick={onClose}></button>
                        </div>
                        <div className="modal-body" data-id="">
                            <div className="item">
                                <label forhtml="" className="col-2">品項名稱</label>
                                <input type="text" value="" id="" name="name" />
                            </div>
                            <div className="item">
                                <label forhtml="" className="col-2">類別</label>
                                <select name="catId" id=""><option value="c01">蛋餅</option><option value="c02">吐司</option><option value="c03">漢堡</option><option value="c04">沙拉</option><option value="c05">點心</option><option value="c06">飲品</option></select>
                            </div>
                            <div className="item">
                                <label forhtml="" className="col-2">圖片網址</label>
                                <input type="text" value="" id="" name="img" />
                            </div>
                            <div className="item">
                                <label forhtml="" className="col-2">簡介</label>
                                <input type="text" value="" id="" name="comment" />
                            </div>
                            <div className="item">
                                <label forhtml="" className="col-2">附加項目</label>
                                <div name="subjoinIds">
                                    <input type="checkbox" className="btn-check" name="subjoinIds" id="edit-add-AH01" value="AH01" />
                                    <label className="btn btn-pill-primary" forhtml="edit-add-AH01">加料</label>

                                    <input type="checkbox" className="btn-check" name="subjoinIds" id="edit-add-AH02" value="AH02" />
                                    <label className="btn btn-pill-primary" forhtml="edit-add-AH02">大小</label>

                                    <input type="checkbox" className="btn-check" name="subjoinIds" id="edit-add-AH03" value="AH03" />
                                    <label className="btn btn-pill-primary" forhtml="edit-add-AH03">溫度</label>

                                    <input type="checkbox" className="btn-check" name="subjoinIds" id="edit-add-AH04" value="AH04" />
                                    <label className="btn btn-pill-primary" forhtml="edit-add-AH04">醬料</label>
                                </div>
                            </div>
                            <div className="item">
                                <label forhtml="" className="col-2">狀態</label>
                                <div>
                                    <input type="radio" className="btn-check" name="isSoldOut" id="isSoldOut1" value="false" autoComplete="off" checked="" />
                                    <label className="btn btn-radio" forhtml="isSoldOut1">販售中</label>
                                    <input type="radio" className="btn-check" name="isSoldOut" id="isSoldOut2" value="true" autoComplete="off" />
                                    <label className="btn btn-radio" forhtml="isSoldOut2">已售完</label>
                                </div>
                            </div>
                            <div className="item">
                                <label forhtml="" className="col-2">價格</label>
                                <input type="number" value="" id="" name="price" />
                            </div>
                        </div>
                        <div className="modal-footer justify-content-center">
                            <button type="button" className="btn btn-my-primary px-3" onClick={() => btnSaveNewProduct()}>儲存</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop fade show adsfsade" onClick={onClose}></div>
        </>
    )
}