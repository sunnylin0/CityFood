
export const TagList = (props) =>
        <div className="tagArea mx-3" {...props}>
            <ul className="tagList" >
                <TagRadio title='全部' />
                <TagRadio title='蛋餅' />
                <TagRadio title='吐司' />
                <TagRadio title='漢堡' />
                <TagRadio title='沙拉' />
                <TagRadio title='點心' />
                <TagRadio title='飲品' />
            </ul>
        </div>


let TagRadio = ({ title }) => (
    <li >
        <input type="radio" className="btn-check" name="分類標籤" id={'tag' + title} value={title}
            autoComplete="off" />
        <label className="btn btn-cat-tag" htmlFor={'tag' + title}>{title}</label>
    </li>
);

