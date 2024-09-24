
//渲染歷史訂單Modal //todo
export function UserOrdersModal({ onClose }) {
    return <>
        <div className="modal fade show" id="userOrdersModal" tabIndex="-1" aria-modal="true" role="dialog" style={{ display: "block" }} >

            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header d-block pb-1">
                        <button type="button" className="btn-close float-end float" data-bs-dismiss="modal" aria-label="Close" onClick={onClose}></button>
                        <h5 className="text-center fw-bold">歷史訂單</h5>
                    </div>
                    <div className="modal-body">
                        <div className="cartfoodCard d-flex mb-2" data-order-id="OD1670063897679" data-bs-toggle="collapse" data-bs-target="#collapseOrder-OD1670063897679">
                            <div>
                                <div className="">
                                    <span className="h6 fw-bolder">訂單日期</span>
                                    <span className="fw-light">2022-12-03 18:38:17</span>
                                </div>
                                <div>
                                    <span className="h6 fw-bolder">訂單編號</span>
                                    <span className="fw-light">OD1670063897679</span>
                                </div>
                            </div>
                            <div className="d-flex flex-column ms-auto">
                                <span>製作中</span>
                                <span className="text-danger fw-bold ms-auto">$115</span>
                            </div>
                        </div>
                        <div className="collapse px-3 pt-0 pb-3" id="collapseOrder-OD1670063897679">

                            <div className="cartfoodCard d-block mb-2" data-id="p061" data-price="15">
                                <span className="h6 fw-bolder text-start">早餐店奶茶</span>
                                <br />
                                <span className="fw-light"></span>
                                <span className="fw-light">M/冰</span>
                                <div className="d-flex justify-content-between">
                                    <span className="fw-light">1份</span>
                                    <div className="text-danger fw-bold">$15</div>
                                </div>
                            </div>
                            <div className="cartfoodCard d-block mb-2" data-id="p012" data-price="50">
                                <span className="h6 fw-bolder text-start">玉米蛋餅</span>
                                <br />
                                <span className="fw-light">裝在一起 / </span>
                                <span className="fw-light">加蛋/加起司</span>
                                <div className="d-flex justify-content-between">
                                    <span className="fw-light">2份</span>
                                    <div className="text-danger fw-bold">$100</div>
                                </div>
                            </div>
                        </div>
                        <div className="cartfoodCard d-flex mb-2" data-order-id="OD1669622562629" data-bs-toggle="collapse" data-bs-target="#collapseOrder-OD1669622562629">
                            <div>
                                <div className="">
                                    <span className="h6 fw-bolder">訂單日期</span>
                                    <span className="fw-light">2022-11-28 16:02:42</span>
                                </div>
                                <div>
                                    <span className="h6 fw-bolder">訂單編號</span>
                                    <span className="fw-light">OD1669622562629</span>
                                </div>
                            </div>
                            <div className="d-flex flex-column ms-auto">
                                <span>已完成</span>
                                <span className="text-danger fw-bold ms-auto">$115</span>
                            </div>
                        </div>
                        <div className="collapse px-3 pt-0 pb-3" id="collapseOrder-OD1669622562629">

                            <div className="cartfoodCard d-block mb-2" data-id="p034" data-price="100">
                                <span className="h6 fw-bolder text-start">日式和牛堡</span>
                                <br />
                                <span className="fw-light"></span>
                                <span className="fw-light"></span>
                                <div className="d-flex justify-content-between">
                                    <span className="fw-light">1份</span>
                                    <div className="text-danger fw-bold">$100</div>
                                </div>
                            </div>
                            <div className="cartfoodCard d-block mb-2" data-id="p062" data-price="15">
                                <span className="h6 fw-bolder text-start">經典紅茶</span>
                                <br />
                                <span className="fw-light"></span>
                                <span className="fw-light"></span>
                                <div className="d-flex justify-content-between">
                                    <span className="fw-light">1份</span>
                                    <div className="text-danger fw-bold">$15</div>
                                </div>
                            </div>
                        </div></div>
                    <div className="modal-footer flex-column border-0"></div>
                </div>
            </div>
        </div>
        <div className="modal-backdrop fade show" onClick={onClose}></div>
    </ >
    //let contents = [];
    //if (theUserOrders.length > 0) {
    //    theUserOrders.forEach(orderObj => {
    //        let { id, userId, name, phone, comment, price, orderDate, orderTime, isPaid, isDone, details } = orderObj;
    //        let detailContent = details.map(foodObj => {
    //            let str = `
    //    <div className="cartfoodCard d-block mb-2" data-id="${foodObj.id}" data-price="${foodObj.price}">
    //        <span className="h6 fw-bolder text-start">${foodObj.name}</span>
    //        <br/>
    //        <span className="fw-light">${foodObj.comment ? (foodObj.comment + " / ") : ''}</span>
    //        <span className="fw-light">${foodObj.additems.length > 0 ? foodObj.additems.map(x => additionIdToName(x)).join("/") : ''}</span>
    //        <div className="d-flex justify-content-between">
    //            <span className="fw-light">${foodObj.qty}份</span>
    //            <div className="text-danger fw-bold">$${foodObj.price * foodObj.qty}</div>
    //        </div>
    //    </div>`
    //            return str;
    //        })
    //        let content = `
    //<div
    //    className="cartfoodCard d-flex mb-2"
    //    data-order-id="${id}"
    //    data-bs-toggle="collapse"
    //    data-bs-target="#collapseOrder-${id}"
    //>
    //    <div>
    //        <div className="">
    //            <span className="h6 fw-bolder">訂單日期</span>
    //            <span className="fw-light">${orderDate} ${orderTime}</span>
    //        </div>
    //        <div>
    //            <span className="h6 fw-bolder">訂單編號</span>
    //            <span className="fw-light">${id}</span>
    //        </div>
    //    </div>
    //    <div className="d-flex flex-column ms-auto">
    //        <span>${isDone ? '已完成' : '製作中'}</span>
    //        <span className="text-danger fw-bold ms-auto">$${price}</span>
    //    </div>
    //</div>
    //<div className="collapse px-3 pt-0 pb-3" id="collapseOrder-${id}">
    //    ${detailContent.join("")}
    //</div>`
    //        contents.push(content);
    //    })
    //} else {
    //    contents.push(`<div className="text-center">沒有訂單</div>`)
    //}
    //$("#userOrdersModal .modal-body").html(contents.join(""));
    //$('#userOrdersModal').modal('show');
}