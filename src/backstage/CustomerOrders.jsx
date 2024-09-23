//附加選項id轉name
function additionIdToName(additionId) {
    let name = Object.values(theFoodAdditions).reduce((a, b) => [...a, ...b.items], []).find(item => item.id == additionId)?.name
    return name ? name : '';
}
let DetailItem = (props) => {
    return (
        <div className="餐點內容">
            <div><span>{props.name}</span></div>
            <div className="fw-light d-flex justify-content-end"><span>{props.comment}</span></div>
            <div className="fw-light d-flex justify-content-end"><span>{props.additems.map(addi => additionIdToName(addi)).join("/")}</span></div>
            <div className="fw-light d-flex justify-content-end"><span>{props.qty}份</span></div>
        </div>
    )
}
//顯示客戶訂單資訊
export function CustomerOrders({ status  }) {

    let targetArr = theNotDoneOrders;
    switch (status) {
        case 'true':
            targetArr = theDoneOrders;
            break;
        case 'all':
            targetArr = theAllOrders;
            break;
        case 'false':
            targetArr = theNotDoneOrders;
            break;
        default:
            targetArr = theNotDoneOrders;
            break;
    }

    let orderContents = [];
    return targetArr.map((item, index)=> {
        let { id, name, phone, comment, price, orderDate, orderTime, takeWay, isPaid, isDone, details } = item;

        return(
            <div className="" key={index}>
                <div className="foodCard">
                    <div className="顧客資訊">
                        <div className="d-flex justify-content-between mb-2">
                            <span className="py-1"><u>{isDone ? '已完成' : '處理中'}</u></span>
                            {isDone ? '' :
                                <div className="d-flex justify-content-end">
                                    <button className="btn btn-my-primary" onClick={() => finishOrder('${id}')}>完成此訂單</button>
                                </div>}
                        </div>
                        <div className="d-flex justify-content-between"><span>編號</span><span>{id}</span></div>
                        <div className="d-flex justify-content-between"><span>訂購人</span><span>{name}</span></div>
                        <div className="d-flex justify-content-between"><span>電話</span><span>{phone}</span></div>
                        <div className="d-flex justify-content-between"><span>總金額</span><span className="text-danger">{'$' + price}</span></div>
                    </div>
                    <hr className="m-1" />
                    {details.map((props, idx) => <DetailItem key={idx} {...props} />)}
                </div>
            </div>
        )
    })
}

