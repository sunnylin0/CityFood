
import { useState, useEffect } from 'react';
import axios from 'axios';


function login(email, password) {
	axios.post(`${urlDomain}/loginTO`, { email: email, password: password })
		.then(function (response) {
			//gtag("event", "login", {
			//	method: "login:" + `(${email})(${response.data.user.name})`
			//});
			saveDataToLocalStorage('_token', response.data.accessToken);
			saveDataToLocalStorage('_user', response.data.user);
			saveDataToLocalStorage('_expire', { time: new Date().getTime(), expire: expireMins * 60 * 1000 });
			chkTimer();
			if (response.data.user.role == 'admin') {
				deleteDataFromLocalStorage('returnModal');
				window.location.href = 'backstage.html';
				return;
			}
			if (response.data.user.role == 'insider') {
				window.location.href = window.location.origin + window.location.pathname;
				return;
			}

			$('#loginModal').modal('hide');
			renderNavList();
			switchModal();
			if (response.data.user.role == 'insider') {
				sweetSmallSuccess(`桌號 ${response.data.user.name}，歡迎光臨`);
			} else {
				sweetSmallSuccess(`早安😀 ${response.data.user.name}，登入成功`);
			}

		}).catch(function (error) {
			sweetError('登入失敗', '帳號或密碼錯誤');
		});
}


//渲染loginModal
export const LoginModal = ({ onClose, bRegister = false}) => {
	let [loginModal, setLoginModal] = useState(bRegister);
	let [username, setUsername] = useState();
	let [useremail, setUseremail] = useState();
	let [password, setPassword] = useState();
	let [phone, setPhone] = useState();

	function demoInput(name) {
		if (name == '阿姨') {
			setUseremail("anti@gmail.com")
			setPassword("0000")
		} else if (name == '小明') {
			setUseremail("cake@gmail.com")
			setPassword("0000")
		}
	}
	function btnLogin() {
		login(useremail, password);
	}

	return (
		<>
			<div className="modal fade show" id="loginModal" tabIndex="-1" aria-modal="true" role="dialog" style={{ display: "block" }} >
				<div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
					<div className="modal-content">
						<div className="modal-header border-0 pb-1">
							<button type="button" className="btn-close float-end float" data-bs-dismiss="modal" aria-label="Close" onClick={onClose}></button>
						</div>
						<div className="modal-body">
							{loginModal ?
								<div className="d-flex flex-column align-items-center gap-3">
									<p className="h4 fw-bold">會員</p>
									<input type="text" className="login-input" placeholder="Name" id="loginName" value={username}/>
									<input type="phone" className="login-input" placeholder="phone" id="loginPhone" value={phone}/>
									<input type="email" className="login-input" placeholder="Email" id="loginEmail" value={useremail}/>
									<input type="password" className="login-input" placeholder="Password" id="loginPassword" value={password}/>
									<button className="btn btn-login" onClick={() => btnRegister()}>註冊</button>
									<p>已經是會員? <span className="color-primary border-bottom finger" onClick={()=>setLoginModal((iss) => !iss)}>登入</span></p>
								</div>
								:
								<div className="d-flex flex-column align-items-center gap-3">
									<p className="h4 fw-bold">會員</p>
									<input type="email" className="login-input" placeholder="Email" id="loginEmail" value={useremail}/>
									<input type="password" className="login-input" placeholder="Password" id="loginPassword" value={password}/>
									<button className="btn btn-login" onClick={btnLogin} >登入</button>

									<p>還沒成為會員? <span className="color-primary border-bottom finger" onClick={()=>setLoginModal((iss) => !iss)}>註冊</span></p>
									<p className="fw-light">
										<span>Demo: </span>
										<span className="ms-2 finger" onClick={() => demoInput('小明')}>顧客-小明</span>
										<span className="ms-2 finger" onClick={() => demoInput('阿姨')}>老闆-阿姨</span>
									</p>
								</div>
							}
                        </div>
					</div>
				</div>
			</div>
			<div className="modal-backdrop fade show"></div>

		</ >
	)


}

