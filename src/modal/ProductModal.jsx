

//食物的附加選項
let AdditionContents = ({ additionIds }) => {
    return (additionIds.map((additionId, key) => {
        let addObj = theFoodAdditions.find(x => x.id == additionId);

        return (
            <div key={key} className="" data-addtion-id={addObj.id}>
                <label>{addObj.name}</label>
                <hr className="my-1" />
                {addObj.items.map((item, key) =>
                    <div key={key}>
                        <input type={addObj.isMulti ? 'checkbox' : 'radio'} className="btn-check foodAdditionOption" name={addObj.name}
                            id={'add-' + item.id} value={item.id} data-add-price={item.price} />
                        <label className="btn btn-pill-primary" htmlFor={'add-' + item.id} >{item.name + '$' + item.price}</label>
                    </div>
                )
                }
            </div>
        )
    }))
}
function getImageUrl(name) {
    if (name.charAt(0) == '.')  name=name.slice(1);
    return new URL(name, import.meta.url).href;
}

//渲染產品Modal
export function ProductModal({ productId, onClose, addToCart }) {
    const myProductObj = theProducts.find(productObj => productObj.id == productId);
    const { catId, id, name, comment, price, img, isSoldOut, additionIds } = myProductObj;

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
                                <button className="btn rounded-circle btn-sm btn-minus" onClick={() => adjAmount(price, 'minus')}><i className="fa-solid fa-minus small"></i></button>
                                <span className="mx-4" id="tempProductAmount">1</span>
                                <button className="btn rounded-circle btn-sm btn-add" onClick={() => adjAmount(price, 'add')}><i className="fa-solid fa-plus small"></i></button>
                            </div>

                            {/* <!-- 加入購物車 -->*/}
                            <button type="button" className="btn btn-addToCart my-1" id="btnAddToCart" onClick={() => addToCart(catId, id)} >
                                <span className=""> 加入購物車($</span>
                                <span className="" id="tempProductTotal" data-food-price={price} data-add-price="0" data-total-price={price}>{price}</span>
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