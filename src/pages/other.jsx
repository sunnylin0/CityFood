import { useState } from 'react'
export const Other = () => {
    return (

        <div>
            <h1>Django網站</h1>
            <form action="/home" method="POST">
                <p>帳號：<input type="text" name="username" id="username" required /></p>
                <p>密碼：<input type="password" name="passwd" id="passwd" required /></p>
                <p><button type="submit">確定</button><button type="reset">清除</button></p>
            </form>
        </div>

    )

}


export const Other2 = () => {
    let [data, setdata] = useState(0);    
    function add(){setdata(data+=1); }
    function min(){setdata(data-=1);}
    return (

        <div>
            <div>
                <input type="button" name="add" id="add" value="+" onClick={add} />
            </div>
            <div id="val">
            {data}
            </div>
            <div>
            <input type="button" name="min" id="min" value="-" onClick={min}/>
            </div>
        </div>
    )
}

export const Other3 = () => {
    let [data, setdata] = useState(0);
    let arr=[1,2,3,4]

    function addArr(its){

        return <Card name={its} val={its*2} />;
    }
    return (

        <div>
            {
                arr.map(addArr)
            }
           

        </div>
    )
}

export const Card = (props) => {
    let [data, setdata] = useState(0);
    function add(){setdata(data+=1); }
    function min(){setdata(data-=1);}
    return (

        <div class="container">
            <div class="row">
                <div class="col-4">
                    <div class="card border-2 border-warning">
                        <img class="card-img-top img-fluid img-thumbnail" src="Pokemon.png"/>
                        <div class="card-body">
                            <div class="card-tital">{props.name}</div>
                            <div class="card-text pd-2">伊布是精靈寶可夢中，擁有最多屬性進化的寶可夢</div>
                            <a href="https:/dennyli.com/blog/post/eevee" class="btn btn-primary btn-sm">相關資訊</a>
                            <input type="button" name="add" id="add" value="+" onClick={add} class="btn btn-danger btn-sm w-25 m-3"/>
                            <input type="button" name="add" id="add" value="-" onClick={min} class="btn btn-primary btn-sm w-25 m-3"/>
                            <ul class="list-group list-group-flush">                   
                                <li class="list-group-item">{props.val}</li>
                                <li class="list-group-item">{data}</li>
                                <li class="list-group-item">火伊布：Pyro</li>
                                <li class="list-group-item">太陽伊布：Sakura</li>
                                <li class="list-group-item">月亮伊布：Tamao</li>
                                <li class="list-group-item">葉伊布：Linnea</li>
                                <li class="list-group-item">冰伊布：Rea</li>
                                <li class="list-group-item">仙子伊布：Kira</li>
                            </ul>
                        </div>
                        <div class="card-footer">
                            <div class="text-end">Pokemon Go</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}