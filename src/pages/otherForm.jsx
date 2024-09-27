


import { useState } from 'react'



let arr = ["可樂", "百香果", "糖果", "香草", "火龍果"];
export const FormTable = () => {
    let handelSubmit = (data) => {
        event.preventDefault();
    }

    return (
        <div>
            <form method="post" name="ff" onSubmit={handelSubmit}>
                <div className="row">
                    {arr.map((its, index) =>
                        <div className="col w-25" key={index}>
                            <CardItem key={index} title={its} />
                        </div>
                    )}
                </div>
                <hr />
                <input type="hidden" name="author" value="Emily" />
                <input type="submit" value="提交" />
                <input type="reset" value="重新輸入" />
            </form>
        </div>
    )
}

let CardItem = (props) => {
    let [count, setSUM] = useState(0);
    function btnAdd() {
        setSUM(count => count + 1);
    }
    function btnMin() {
        setSUM(count => count - 1);
    }
    return (
        <div className="card fs-4">
            { props.title}
            <input className="btn m-3 fs-4" type="button" value="-" onClick={btnMin} />
            <input className="btn m-3 fs-4" type="text" value={count} readOnly />
            <input className="btn m-3 fs-4" type="button" value="+" onClick={btnAdd} />
        </div>
    )
}

