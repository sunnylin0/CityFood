import a3qrcode from '~/img/PC/A3-qrcode.png'
export const GuideModal = ({ onClose }) => {

	function login(email, password) {
		console.log(`${urlDomain}/loginTO/`)
		//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
		//const response = wait axios({
		//	url: "http://localhost:3000/api/auth"
		//	method: 'POST',
		//	data: {
		//		使用者名稱: 'user',
		//		密碼: 'pass123'
		//	},
		//});

		let config = {
			headers: {
				//"Cache-Control": "no-cache",
				"Content-Type": "application/json;charset=utf-8",
				"Access-Control-Allow-Origin": "*",
				//	"Access-Control-Allow-Headers": "Content-Type",
			},
		}
		//axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
		//axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
		axios.post(`${urlDomain}/loginTO/`, { email, password }, config)
			.then(function (response) {
				//gtag("event", "login", {
				//	method: "login:" + `(${email})(${response.data.user.name})`
				//});
				console.log("response.data")
				console.log(response.data)
				saveDataToLocalStorage('_token', response.data.accessToken);
				saveDataToLocalStorage('_user', response.data.user);
				saveDataToLocalStorage('_expire', { time: new Date().getTime(), expire: expireMins * 60 * 1000 });
				chkTimer();
				if (response.data.user.role == 'admin') {
					deleteDataFromLocalStorage('returnModal');
					//window.location.href = '/backstage';
					navigate('/backstage')
					onClose()
					return;
				}

				//if (//response.data.user.role == 'insider' ||
				//	response.data.user.role == 'customer') {
				//	navigate('/order')
				//	onClose()
				//	return;
				//}

				//$('#loginModal').modal('hide');
				//renderNavList();
				//switchModal();
				if (response.data.user.role == 'insider') {
					sweetSmallSuccess(`桌號 ${response.data.user.userName}，歡迎光臨`);
				} else {
					sweetSmallSuccess(`早安😀 ${response.data.user.userName}，登入成功`);
				}

				//navigate('/order')
				onClose()
			}).catch(function (error) {
				console.log("catch(function (error)")
				sweetError('登入失敗', '帳號或密碼錯誤');
			});
	}

	function btnLogin() {
		login('A3@store.com', '0000');
	}
	


    /*<!--導覽Modal -->*/
    //<div className="modal fade show" id="adModal" tabIndex="-1" aria-modal="true" role="dialog" style={{ display: "block" }} >
    //    <div className="modal-dialog modal-dialog-centered modal-xl">
    return (
        <>

            <div className="modal fade show" id="guideModal" tabIndex="-1" aria-modal="true" role="dialog" style={{ display: "block" }}>
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content" style={{ 'minHeight': "360px" }}>
                        <div className="modal-header d-block pb-1 position-relative border-0" >
                            <button type="button" className="btn-close position-absolute" data-bs-dismiss="modal"
                                aria-label="Close" style={{ right: "1.5rem" }} onClick={onClose}></button>
                            <h5 className="text-center fw-bold">功能介紹</h5>
                        </div>
                        <div className="modal-body">
                            <ul className="nav nav-tabs row-cols-3" id="myTab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link w-100 active" data-bs-toggle="tab" data-bs-target="#guideOnline" type="button" role="tab">
                                        線上點餐
                                    </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link w-100" data-bs-toggle="tab" data-bs-target="#guideTable" type="button" role="tab">桌邊點餐</button>
                                </li>

                                <li className="nav-item" role="presentation">
                                    <button className="nav-link w-100" data-bs-toggle="tab" data-bs-target="#guideBack" type="button" role="tab">後台管理</button>
                                </li>
                            </ul>
                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade show active" id="guideOnline" role="tabpanel">
                                    <div className="d-flex flex-column justify-content-center align-items-center pt-4">
                                        <ul>
                                            <li>登入與註冊會員</li>
                                            <li>瀏覽精緻菜單</li>
                                            <li>提供點餐服務</li>
                                            <li>調整購物車內容</li>
                                            <li>查詢歷史訂單</li>
                                        </ul>
                                        <span>可使用demo帳號
                                            <span className="finger" onClick={() => goToLoginModalWithName('小明')}>
                                                <b><u>小明</u></b>
                                            </span>
                                        </span>
                                        <span>進行操作體驗</span>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="guideTable" role="tabpanel">
									<div className="btn d-flex flex-column justify-content-center align-items-center pt-4" onClick={btnLogin }>
                                        <div className="text-center">請掃描QR Code後進行點餐</div>
                                        <div className="mt-3" id="qrCode">
                                            <img src={a3qrcode} alt="https://coldingpotato.github.io/onlineOrder/redirect.html?insider=A3" />                                       </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="guideBack" role="tabpanel">
                                    <div className="d-flex flex-column justify-content-center align-items-center pt-4">
                                        <ul>
                                            <li>出餐管理(顯示即時訂單)</li>
                                            <li>菜單管理(新增、調整與停售)</li>
                                            <li>營業狀況之圖表分析</li>
                                        </ul>
                                        <span>可使用demo帳號
                                            <span className="finger" onClick={() => goToLoginModalWithName('阿姨')}>
                                                <b><u>阿姨</u></b>
                                            </span>
                                        </span>
                                        <span>進行操作體驗</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer flex-column border-0"></div>
                    </div>
                </div>

            </div >
            <div className="modal-backdrop fade show" onClick={onClose}></div>
        </>
    )


}