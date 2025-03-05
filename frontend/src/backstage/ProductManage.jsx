import { useState ,useEffect} from 'react'
import { createPortal } from 'react-dom'
import { BackHeader } from './BackHeader'
import { ProductEditModal } from './ProductEditModal'



export const ProductManage = () => {
	//let [showEditModal, setShowEditModal] = useState();
	let [postEditMenuId, setEditMenuId] = useState();
	let [showContents, setContents] = useState([]);
	let [postIsModify, setIsModify] = useState(false);
	//function openEditModal(idName) { setShowEditModal(idName); }
	let handleIsModify=(isModify,mfyModel)=>{
		if(isModify){			
			getMenu(); 
			theProducts.forEach((product, index,arr) => {
				let { menuId, menuName, price, catId, comment, img, isSoldOut, subjoinIds } = product;
				if(mfyModel.menuId==menuId){
					arr[index]=mfyModel;
				}		
		})
			init();
			setIsModify(true);
			//useEffect(init,[!postEditMenuId]);
		}
	}
	function closeEditModal() { setEditMenuId(false); }
	
	/* 新增品項 */
	function btnAddProduct() {
		setShowEditModal("add");
	}
	function init() {
		let contents = theProducts.map((product, index) => {
			let { menuId, menuName, price, catId, comment, img, isSoldOut, subjoinIds } = product;
			let subjoinName =
				subjoinIds.map(myadd =>
					theFoodSubjoins.find(theAdd =>
						theAdd.subCatId == myadd)?.subCatName
				)
			let content =
				<tr className="text-center" key={index}>
				<td>{menuName}</td>
				 <td>{theCategory.find(x => x.catId == catId)?.catName || catId}</td>
				<td>
					<img src={img} alt="" className="tableFoodImg" />
				</td>
				<td width="25%">{comment}</td>
				<td>{subjoinName}</td>
				<td className={isSoldOut ? 'text-danger' : ''}>{isSoldOut ? '已售完' : '販售中'}</td>
				<td>${price}</td>
				<td>
						<button className="btn btn-sm btn-outline-primary" onClick={() => setEditMenuId(menuId)}>編輯</button>
					<button className="btn btn-sm btn-outline-danger" onClick={() => deleteProduct(menuId)} hidden>刪除</button>
				</td>
				</tr>
			return content
		})
		setContents(contents)
	}
	useEffect(init,[])
	return (
		<>
			{postEditMenuId && createPortal(<ProductEditModal menuId={postEditMenuId} onIsModify={handleIsModify} onClose={closeEditModal} />, document.body)}
			{/*<!-- 最上方標題導覽列 -->*/}
			<BackHeader />
			{/*<!-- 中間主要內容 -->*/}
			<div className="main-content ">
				<div className="page productManage container" style={{ display: "block" }}>
					<div className="table-scroll h-100vh pb-5" id="productManage">
						<table className={"table IS_" + postIsModify}>
							<thead> 
								<tr className="text-center">
									<th>品項名稱</th>
									<th>類別</th>
									<th>圖片</th>
									<th>簡介</th>
									<th>附加項目</th>
									<th>狀態</th>
									<th>價格</th>
									<th>編輯</th>
								</tr>
							</thead>
							<tbody id="productManageList">
								{showContents}
			
							</tbody>
						</table>
					</div>
				</div>
			</div>
			{/*<!-- 頁尾 -->*/}
			<div className="footer py-2">
				<div className="container">
					<div className="page productManage" style={{ display: "block" }}>
						<div className="d-flex justify-content-end align-items-center py-2 pe-3">
							<button className="btn btn-sm btn-my-primary" onClick={() => btnAddProduct()}>新增品項</button>
						</div>
					</div>
				</div>
			</div>

		</>
	)
}