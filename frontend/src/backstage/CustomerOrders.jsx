//附加選項id轉name
function subjoinIdToName(subjoinId) {
    let name = Object.values(theFoodSubjoins).reduce((a, b) => [...a, ...b.items], []).find(item => item.subId == subjoinId)?.subName
    return name ? name : '';
}
let DetailItem = (props) => {
    return (
        <div className="餐點內容">
			<div><span>{props.menuName}</span></div>
			<div className="fw-light d-flex justify-content-end"><span>{props.remark}</span></div>
			<div className="fw-light d-flex justify-content-end"><span>{props.subItems.map(addi => subjoinIdToName(addi)).join("/")}</span></div>
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
		let { orderId, userName, phone, comment, totalPrice, dateTime, takeWay,  isDone, details } = item;

        return(
            <div className="" key={index}>
                <div className="foodCard">
                    <div className="顧客資訊">
                        <div className="d-flex justify-content-between mb-2">
                            <span className="py-1"><u>{isDone ? '已完成' : '處理中'}</u></span>
                            {isDone ? '' :
                                <div className="d-flex justify-content-end">
									<button className="btn btn-my-primary" onClick={() => finishOrder('${orderId}')}>完成此訂單</button>
                                </div>}
                        </div>
						<div className="d-flex justify-content-between"><span>編號</span><span>{orderId}</span></div>
						<div className="d-flex justify-content-between"><span>訂購人</span><span>{userName}</span></div>
                        <div className="d-flex justify-content-between"><span>電話</span><span>{phone}</span></div>
						<div className="d-flex justify-content-between"><span>總金額</span><span className="text-danger">{'$' + totalPrice}</span></div>
                   
						<hr className="m-1" />
						{details.map((props, idx) => <DetailItem key={idx} {...props} />)}
					</div>
                </div>
            </div>
        )
    })
}

