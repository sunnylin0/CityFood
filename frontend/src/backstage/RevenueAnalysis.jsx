
import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import logo from '~/img/logo.svg';
import { BackHeader } from './BackHeader'


export const RevenueAnalysis = () => {
	let [postSelectOptionList, setSelectOptionList] = useState()


	//取得訂單細節資料, 選大類
	function getDetailToCat(catId = 'ALL') {
		const token = getDataFromLocalStorage('_token');
		const config = { headers: { 'Authorization': `Bearer ${token}` } }
		return new Promise((resolve, reject) => {
			axios.post(`${urlDomain}/detailAnalysis/${catId}`, [], config)
				.then(function (response) {
					console.log(response.data.length)
					resolve(response.data)
				}).catch(function (error) {
					console.log('error', error);
					reject(error)
				});
		})
	}

	//渲染營收分析
	async function renderRevenueAnalysis() {
		let selectOptions =
			theCategory.map((cat, index) => {
				let obj
				if (index == 0) {
					obj = <>
						<option key={index} value="all">全品項</option>
						<option key={index + 1} value={cat.catId}>{cat.catName}</option>
					</>
				}
				else
					obj = <option key={index + 2} value={cat.catId}>{cat.catName}</option>
				return obj
			});
		setSelectOptionList(selectOptions)
		//$("#selectCat").html(selectOptions.join(""));
		renderSingleProductAnalysis('all');
		//let allSoldProducts = Object.values(theAllOrders).reduce((a, b) => [...a, ...b.details], [])
		let allSoldProducts = await getDetailToCat()
		let catAnalysisPrice = []
		let catAnalysisCount = []
		theCategory.forEach(cat => {
			let soldProducts = allSoldProducts.filter(x => x.catId == cat.catId);
			let soldCount = soldProducts.reduce((a, b) => a + b.qty, 0);
			let soldPrice = soldProducts.reduce((a, b) => a + (b.price * b.qty), 0);
			catAnalysisPrice.push([cat.catName, soldPrice])
			catAnalysisCount.push([cat.catName, soldCount])
		})
		var chart2 = c3.generate({
			bindto: "#chart2", // 綁定的 HTML 元素
			data: {
				columns: catAnalysisCount,
				type: 'donut',
			},
			donut: {
				title: "銷售數量"
			},
			size: {
				width: 350,
			}
		});
		var chart3 = c3.generate({
			bindto: "#chart3", // 綁定的 HTML 元素
			data: {
				columns: catAnalysisPrice,
				type: 'donut',
			},
			donut: {
				title: "銷售金額"
			},
			size: {
				width: 350,
			}
		});
	}
	//渲染單品銷售概況(sort by cat)(chart1)
	async function renderSingleProductAnalysis(catOption = 'all') {
		//let allSoldProducts = Object.values(theAllOrders).reduce((a, b) => [...a, ...b.details], [])
		let allSoldProducts = await getDetailToCat()
		let productMenu = ["品項"];
		let productAnalysisPrice = ["金額"];
		let productAnalysisCount = ["銷量"];
		theMenu.forEach(menu => {
			if (catOption == 'all' || menu.catId == catOption) {
				menu.products.forEach(product => {
					let soldProducts = allSoldProducts.filter(x => x.menuId == product.menuId);
					let soldCount = soldProducts.reduce((a, b) => a + b.qty, 0);
					let soldPrice = soldProducts.reduce((a, b) => a + (b.price * b.qty), 0);
					if (catOption != 'all' || soldCount > 0) {
						productMenu.push(product.menuName);
						productAnalysisPrice.push(soldPrice)
						productAnalysisCount.push(soldCount)
					}
				})
			}
		})

		let q1 = [productMenu, productAnalysisCount, productAnalysisPrice];

		var chart1 = c3.generate({
			bindto: "#chart1", // 綁定的 HTML 元素
			data: {
				x: "品項",
				columns: q1,
				axes: {
					"銷量": "y",
					"金額": "y2"
				},
				type: 'bar',
				selection: {
					enabled: true,
					grouped: true
				},
				labels: {
					format: {
						"金額": d3.format("$"),
						"銷量": d3.format(",")
					}
				},
				order: 'asc'
			},
			bar: {
				width: {
					ratio: 0.85 // this makes bar width 50% of length between ticks
				}
			},
			axis: {
				x: { type: 'category' },
				y: {
					label: {
						text: 'Count',
						position: 'outer-middle'
					}
				},
				y2: {
					show: true,
					tick: {
						format: d3.format("$")
					},
					label: {
						text: 'Price',
						position: 'outer-middle'
					}
				}
			},
		});
	}

	function handleSelectChange(e) {
		let selectObj=e.target
		let optionList = e.target.options
		console.log(e.target.options)
		console.log(e.target.selectedIndex)
		renderSingleProductAnalysis(optionList[selectObj.selectedIndex].value)
	}

	useEffect(renderRevenueAnalysis, [])


	return (
		<div className="">
			{/*<!-- 最上方標題導覽列 -->*/}
			<BackHeader />
			{/*<!-- 中間主要內容 -->*/}
			<div className="main-content ">
				{/*<!-- 營收分析 -->*/}
				<div className="page revenueAnalysis container" style={{ display: "block" }}>
					<div id="revenueAnalysis">
						<h4>單品銷售概況
							<select className="ms-2" id="selectCat" onChange={handleSelectChange} >
								{/*() => renderSingleProductAnalysis(catId)}>*/}
							{postSelectOptionList  }
						</select></h4>
						<div id="chart1" className="c3" style={{ "maxHeight": "320px", position: "relative" }}>	</div>
						<br />
						<h4>各類型銷售概況</h4>
						<div className="row row-cols-1 row-cols-lg-2">
							<div id="chart2" className="*col-6 text-center c3" style={{ "maxHeight": "320px", position: "relative" }}>
								<div className="c3-tooltip-container" style={{ position: "absolute", "pointerEvents": "none", display: "none" }}></div>
							</div>
							<div id="chart3" className="*col-6 text-center c3" style={{ "maxHeight": "320px", position: "relative" }}>
								<div className="c3-tooltip-container" style={{ position: "absolute", "pointerEvents": "none", display: "none" }}></div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/*<!-- 頁尾 -->*/}
			<div className="footer py-2">
				<div className="container">
				</div>
			</div>
		</div >
	)
}