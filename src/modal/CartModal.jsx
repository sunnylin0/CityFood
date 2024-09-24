
export const CartModal = ({ onClose }) => {
    return (
        <>
            <div className="modal fade show" id="cartModal" tabIndex="-1" aria-modal="true" role="dialog" style={{ display: "block" }} >
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header d-block pb-1">
                            <button type="button" className="btn-close float-end float" data-bs-dismiss="modal" aria-label="Close" onClick={onClose}></button>
                            <h5 className="text-center fw-bold">購物車資訊</h5>
                        </div>
                        <div className="modal-body"><div name="商品明細" className="mb-3">
                            <h5 className="fw-bolder">商品明細</h5>
                            <hr className="my-2" />

                            <div className="cartfoodCard d-block mb-2" data-id="p016" data-price="35">
                                <div className="d-flex justify-content-between mb-2">
                                    <span className="h6 fw-bolder">起司蛋餅</span>
                                    <div className="">
                                        <button className="btn rounded-circle btn-sm cartEdit" onClick={() => editCartProduct('p016', '0')}><i className="fa-solid fa-pencil"></i></button>
                                        <button className="btn rounded-circle btn-sm cartDelete" onClick={() => deleteCartProduct('0')}><i className="fa-solid fa-trash-can"></i></button>
                                    </div>
                                </div>

                                <span className="h6 fw-light d-block"></span>
                                <span className="h6 fw-light d-block"></span>
                                <div className="d-flex justify-content-between">

                                    <span className="fw-light">$35 / 1份</span>
                                    <div className="text-danger fw-bold">$35</div>
                                </div>
                            </div>

                            <div className="cartfoodCard d-block mb-2" data-id="p024" data-price="35">
                                <div className="d-flex justify-content-between mb-2">
                                    <span className="h6 fw-bolder">里肌豬排吐司</span>
                                    <div className="">
                                        <button className="btn rounded-circle btn-sm cartEdit" onClick={() => editCartProduct('p024', '1')}><i className="fa-solid fa-pencil"></i></button>
                                        <button className="btn rounded-circle btn-sm cartDelete" onClick={() => deleteCartProduct('1')}><i className="fa-solid fa-trash-can"></i></button>
                                    </div>
                                </div>

                                <span className="h6 fw-light d-block"></span>
                                <span className="h6 fw-light d-block"></span>
                                <div className="d-flex justify-content-between">

                                    <span className="fw-light">$35 / 1份</span>
                                    <div className="text-danger fw-bold">$35</div>
                                </div>
                            </div>

                        </div>
                            <div name="取餐方式" className="mb-3" id="cartTakeWay">
                                <h5 className="fw-bolder">取餐方式</h5>
                                <hr className="my-2" />
                                <input type="radio" className="btn-check" name="取餐方式" id="tag外帶" value="外帶" autoComplete="off" defaultChecked/>
                                <label className="btn btn-cat-tag" forhtml="tag外帶">外帶</label>

                                <input type="radio" className="btn-check" name="取餐方式" id="tag內用" value="內用" autoComplete="off" />
                                <label className="btn btn-cat-tag" forhtml="tag內用">內用</label>
                            </div>
                            <div name="訂單備註" className="mb-3">
                                <h5 className="fw-bolder">訂單備註</h5>
                                <hr className="my-2" />
                                <textarea className="form-control" id="cartComment" rows="2"></textarea>
                            </div></div>
                        <div className="modal-footer flex-column">
                            {/*<!-- 加入購物車 -->*/}
                            <button type="button" className="btn btn-addToCart my-1" onClick={()=>submitCart()}>
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
//渲染購物車Modal

//export function CartModal() {
//    let cartList = getCarts()
//    let contentCartList = [];
//    if (cartList.length > 0) {
//        contentCartList = cartList.map((productObj, index) => {
//            const { id, name, price, qty, comment, additems } = productObj;
//            return (
//        <div className="cartfoodCard d-block mb-2" data-id={id} data-price={price}>
//            <div className="d-flex justify-content-between mb-2">
//                <span className="h6 fw-bolder">{name}</span>
//                <div className="">
//                    <button className="btn rounded-circle btn-sm cartEdit" onClick={()=>editCartProduct(id,index)}><i className="fa-solid fa-pencil"></i></button>
//                    <button className="btn rounded-circle btn-sm cartDelete" onClick={()=>deleteCartProduct(index)}><i className="fa-solid fa-trash-can"></i></button>
//                </div>
//            </div>

//            <span className="h6 fw-light d-block">{comment ? (comment) : ""}</span>
//            <span className="h6 fw-light d-block">{additems.map(x => additionIdToName(x)).join("/")}</span>
//            <div className="d-flex justify-content-between">

//                <span className="fw-light">$${price} / ${qty}份</span>
//                <div className="text-danger fw-bold">$${price * qty}</div>
//            </div>
//        </div>
//        )
//        })
//    } else {
//        contentCartList.push(`<div className="text-center">購物車內沒有商品</div>`)
//    }

//    let content = `<div name="商品明細" className="mb-3">
//                <h5 className="fw-bolder">商品明細</h5>
//                <hr className="my-2" />
//                ${contentCartList.join("")}
//            </div>
//            <div name="取餐方式" className="mb-3" id="cartTakeWay">
//                <h5 className="fw-bolder">取餐方式</h5>
//                <hr className="my-2" />
//                <input type="radio" className="btn-check" name="取餐方式" id="tag外帶" value="外帶" autocomplete="off" checked />
//                <label className="btn btn-cat-tag" for="tag外帶">外帶</label>

//                <input type="radio" className="btn-check" name="取餐方式" id="tag內用" value="內用" autocomplete="off" />
//                <label className="btn btn-cat-tag" for="tag內用">內用</label>
//            </div>
//            <div name="訂單備註" className="mb-3">
//                <h5 className="fw-bolder">訂單備註</h5>
//                <hr className="my-2" />
//                <textarea className="form-control" id="cartComment" rows="2"></textarea>
//            </div>`

//    $("#cartModal .modal-body").html(content);
//    $("#tempCartTotalPrice").html(`($${countCartTotalPrice()})`);
//}