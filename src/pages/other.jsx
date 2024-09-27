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

    function addArr(its,index){

        return <Card key={index} name={its} val={its*2} />;
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

        <div className="container">
            <div className="row">
                <div className="col-4">
                    <div className="card border-2 border-warning">
                        <img className="card-img-top img-fluid img-thumbnail" src="Pokemon.png"/>
                        <div className="card-body">
                            <div className="card-tital">{props.name}</div>
                            <div className="card-text pd-2">伊布是精靈寶可夢中，擁有最多屬性進化的寶可夢</div>
                            <a href="https:/dennyli.com/blog/post/eevee" className="btn btn-primary btn-sm">相關資訊</a>
                            <input type="button" name="add" id="add" value="+" onClick={add} className="btn btn-danger btn-sm w-25 m-3"/>
                            <input type="button" name="add" id="add" value="-" onClick={min} className="btn btn-primary btn-sm w-25 m-3"/>
                            <ul className="list-group list-group-flush">                   
                                <li className="list-group-item">{props.val}</li>
                                <li className="list-group-item">{data}</li>
                                <li className="list-group-item">火伊布：Pyro</li>
                                <li className="list-group-item">太陽伊布：Sakura</li>
                                <li className="list-group-item">月亮伊布：Tamao</li>
                                <li className="list-group-item">葉伊布：Linnea</li>
                                <li className="list-group-item">冰伊布：Rea</li>
                                <li className="list-group-item">仙子伊布：Kira</li>
                            </ul>
                        </div>
                        <div className="card-footer">
                            <div className="text-end">Pokemon Go</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

let cardData=[{
    title:"夢幻的綠園(一)",
    sub:"迪士尼擴大其經營範圍，專注於戲劇、音樂及網路媒體！"
},{
    title:"開擴景色(二)",
    sub:"迪士尼擴大其經營範圍，專注於戲劇、音樂及網路媒體！"
},
{
    title:"荷蘭的風車(三)",
    sub:"荷蘭鹿特丹和阿姆斯特丹近郊，有很多風車的磨坊和造紙業！"
},
{
    title:"美麗的花朵(四)",
    sub:"迎風搖曳的小野花在秋天的原野中綻放，令人感到心曠神怡！"
},
]

export const Other4 = () => {
    function addArr(its, index){
        return <Card2 name={its} key={index} />;
    }
    return (
        <Card2/>
    )
}

export const Card2 = (props) => {
    return (
        <div className="container">
            <div className="row">           
                {cardData.map((its,index)=>{
                    return <Carditm key={index} title={its.title} sub={its.sub}></Carditm>
                } )}
            </div>
        </div>
    )
}

export const Carditm = (props) => {
    let [data, setdata] = useState(0);
    function add(){setdata(data+=1); }
    function min(){setdata(data-=1);}
    return (
        <div className="col-lg-3 col-md-6">                                  
            <div className="card" style={{width: 250}}>
                <img className="card-img-top" src="photo1.jpg"/>
                <div className="card-body">
                    <div className="card-title">{props.title}</div>
                    <div className="card-text pb-3">{props.sub}</div>
                    <a href="A02-bs-兩大分格欄位+變底色+首標改變.htm" className="btn btn-primary btn-sm">相關資訊</a>
                </div>
            </div>
        </div>
    )
}