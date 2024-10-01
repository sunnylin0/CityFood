


import { useState } from 'react'




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
                            <CardItem id={index} {...its} />
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
        setSUM(count => {
            count +=1;
            arr[props.id].num = count;
            arr[props.id].sum = count * props.price;
            return count;
        });
        
        console.log(arr)
    }
    function btnMin() {
        setSUM(count => count - 1);
        console.log(arr)
    }
    return (
        <div className="card fs-4">
            {props.title}
            <br />
            { "　價格:" + props.price + "　總價:" + count * props.price}
            <input className="btn m-１ fs-4" type="button" value="-" onClick={btnMin} />
            <input className="btn m-１ fs-4" type="text" value={count} readOnly />
            <input className="btn m-１ fs-4" type="button" value="+" onClick={btnAdd} />
        </div>
    )
}

