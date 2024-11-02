
export const TagList = (props) =>
        <div className="tagArea mx-3" {...props}>
            <ul className="tagList" >
			<TagRadio title='全部' pos="ALL"/>
			{theCategory.map((the, index) => <TagRadio key={index} pos={the.catId } title={the.catName} />
			)}
            </ul>
        </div>


let TagRadio = ({ title ,pos}) => (
    <li >
		<input type="radio" className="btn-check" name="分類標籤" id={'tag' + pos} value={title}
            autoComplete="off" />
		<label className="btn btn-cat-tag" htmlFor={'tag' + pos}>{title}</label>
    </li>
);

