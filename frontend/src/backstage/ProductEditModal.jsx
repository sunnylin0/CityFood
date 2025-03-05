import { useState ,useEffect } from 'react'


export const ProductEditModal = ({ menuId, onClose ,onIsModify}) => {
	let [postCategoryList, setCategoryList] = useState();
	let [postSubjoinContents, setSubjoinContents] = useState();
	let [postMenuData, setMenuData] = useState({
		menuId: "",
		menuName: "",
		catId: "",
		comment: "",
		price: 0,
		img: "",
		isSoldOut: false,
		subjoinIds: [],

	});

	let handleInputChange = (e) => {
		let getValue;
		console.log('handleInputChange')
		console.log(e.target.value)
		console.log(postMenuData)
		switch (e.target.name) {
			case 'price':
				getValue = parseInt(e.target.value);
				break;
			case 'isSoldOut':
				if (e.target.value == 'true')
					getValue =true
				else
					getValue = false
				break;
			default:
				getValue = e.target.value;
				break;
		}
		setMenuData(prev => ({
			...prev, [e.target.name]: getValue
		}))
		
	}

	//編輯商品
	function initEditProduct() {
		if (menuId) {
			let myProduct = theProducts.find(x => x.menuId == menuId);
			setMenuData(myProduct)

			console.log(myProduct)
			renderProductEditModal(myProduct);
		}
	}
	//渲染產品編輯Modal
	function renderProductEditModal(model) {
		//let catContents = theCats.map(x => `<option value="${x.id}" ${model.catId == x.id ? 'selected' : ''}>${x.name}</option>`);

		let catContents = theCategory.map((catObj, index) => <option key={index} value={catObj.catId} selected={model.catId == catObj.catId}>{catObj.catName}</option>)

		let subjoinContents = theFoodSubjoins.map((subjoin, index) =>							
			<label key={index} className="btn btn-pill-primary" htmlFor={"edit-sub-" + subjoin.subCatId}>
				{subjoin.subCatName}
				<input type="checkbox" className="btn-check" name="subjoinIds" id={"edit-sub-" + subjoin.subCatId} value={subjoin.subCatId}
					onClick={handleInputChange} checked={model.subjoinIds.includes('AH02') ? true : false} />
			</label>			
		)
		setCategoryList(catContents)
		setSubjoinContents(subjoinContents)
		//$("#productEditModal .modal-body").attr('data-id', model.id);
		//$("#productEditModal .modal-body input[name='name']").val(model.name);
		//let catContents = theCats.map(x => `<option value="${x.id}" ${model.catId == x.id ? 'selected' : ''}>${x.name}</option>`);
		//$("#productEditModal .modal-body select[name='catId']").html(catContents);
		//$("#productEditModal .modal-body input[name='img']").val(model.img);
		//$("#productEditModal .modal-body input[name='comment']").val(model.comment);
		//$("#productEditModal .modal-body div[name='additionIds']").html(additionContents.join(""));
		//$(`#productEditModal .modal-body input[name='isSoldOut']`).prop('checked', false);
		//$(`#productEditModal .modal-body input[name='isSoldOut'][value='${model.isSoldOut}']`).prop('checked', true);
		//$("#productEditModal .modal-body input[name='price']").val(model.price);
		//$("#productEditModal .modal-footer button").attr('onclick', `${model?.id ? 'btnSaveEditProduct()' : 'btnSaveNewProduct()'}`);
		//$("#productEditModal").modal("show")
	}
	function btnSaveEditProduct() {
		//let id = $("#productEditModal .modal-body").attr('data-id');
		//let name = $("#productEditModal .modal-body input[name='name']").val();
		//let catId = $("#productEditModal .modal-body select[name='catId']").val();
		//let img = $("#productEditModal .modal-body input[name='img']").val();
		//let comment = $("#productEditModal .modal-body input[name='comment']").val();
		//let isSoldOut = $("#productEditModal .modal-body input[name='isSoldOut']:checked").val() == 'true';
		//let price = parseInt($("#productEditModal .modal-body input[name='price']").val());
		//let additionIds = [];
		//$("#productEditModal .modal-body input[name='additionIds']:checked").each((index, x) => additionIds.push(x.value));

		let model = { ...postMenuData, menuId};
		updateProduct(menuId, model);


	}
	function btnSaveNewProduct() { }


	//更新產品資料
	function updateProduct(menuId, model) {

		const token = getDataFromLocalStorage('_token');
		const config = { headers: { 'Authorization': `Bearer ${token}` ,
					'Content-Type': 'application/json' // 確保 Content-Type 是 application/json }
		}};
		axios.put(`${urlDomain}/products/${menuId}`, model, config)
			.then(function (response) {				
				sweetSuccess('更新成功', '商品已更新');
				onIsModify(true,model);
				onClose();
			}).catch(function (error) {
				console.log('error', error);
				sweetError('更新失敗', '請檢查網路連線或稍後再試');
			});
	}
	//新增產品資料
	function addNewProduct(model) {
		const token = getDataFromLocalStorage('_token');
		const config = { headers: { 'Authorization': `Bearer ${token}` } }
		axios.post(`${urlDomain}/products`, model, config)
			.then(function (response) {
				getMenu();
				$("#productEditModal").modal("hide")
				sweetSuccess('新增成功', '商品已新增');
			}).catch(function (error) {
				console.log('error', error);
			});
	}


	useEffect(initEditProduct, [])
    return (
        <>
            <div className="modal fade show" id="productEditModal" tabIndex="-1" style={{ display: "block" }} aria-modal="true" role="dialog">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header d-block">
                            <h4 className="text-center d-inline-block mb-0">編輯產品內容</h4>
                            <button type="button" className="btn-close float-end float" data-bs-dismiss="modal" aria-label="Close" onClick={onClose}></button>
                        </div>
                        <div className="modal-body" data-id="">
                            <div className="item">
								<label htmlFor="" className="col-2">品項名稱</label>
								<input type="text" value={postMenuData.menuName} id="" name="menuName" onChange={handleInputChange}/>
                            </div>
                            <div className="item">
								<label htmlFor="" className="col-2">類別</label>
								<select name="catId" id="">
									{postCategoryList}
								</select>
                            </div>
                            <div className="item">
								<label htmlFor="" className="col-2">圖片網址</label>
								<input type="text" value={postMenuData.img} id="" name="img" onChange={handleInputChange}/>
                            </div>
                            <div className="item">
								<label htmlFor="" className="col-2">簡介</label>
								<input type="text" value={postMenuData.comment} id="" name="comment" onChange={handleInputChange}/>
                            </div>
                            <div className="item">
								<label htmlFor="" className="col-2">附加項目</label>
                                <div name="subjoinIds">
									{postSubjoinContents}
                                </div>
                            </div>
                            <div className="item">
								<label htmlFor="" className="col-2">狀態</label>
                                <div>
									<input type="radio" className="btn-check" name="isSoldOut" id="isSoldOut1" value="false" 
										onChange={handleInputChange} checked={postMenuData.isSoldOut == false} />
									<label className="btn btn-radio" htmlFor="isSoldOut1">販售中</label>
									<input type="radio" className="btn-check" name="isSoldOut" id="isSoldOut2" value="true" 
										onChange={handleInputChange} checked={postMenuData.isSoldOut == true} />
									<label className="btn btn-radio" htmlFor="isSoldOut2">已售完</label>
								</div>
							</div>
                            <div className="item">
								<label htmlFor="" className="col-2">價格</label>
								<input type="number" value={postMenuData.price} id="" name="price" onChange={handleInputChange}/>
                            </div>
                        </div>
						<div className="modal-footer justify-content-center">
							{menuId ?
								<button type="button" className="btn btn-my-primary px-3" onClick={btnSaveEditProduct}>更新</button>
								:
								<button type="button" className="btn btn-my-primary px-3" onClick={btnSaveNewProduct}>新增</button>
							}                          
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop fade show adsfsade" onClick={onClose}></div>
        </>
    )
}