
import { useState, useEffect } from 'react';
import axios from 'axios';

import { useNavigate } from "react-router-dom";


//渲染loginModal
export const LoginModal = ({ onClose, bRegister = false }) => {
	let [loginModal, setLoginModal] = useState(bRegister);
	let [userdata, setUserdata] = useState({
		username: "",
		useremail: "",
		password: "",
		phone: ""
	})
	const navigate = useNavigate();
	//let [username, setUsername] = useState("");
	//let [useremail, setUseremail] = useState("");
	//let [password, setPassword] = useState("");
	//let [phone, setPhone] = useState("");

	function demoInput(name) {
		if (name == '阿姨') {
			setUserdata(function () {
				return {
					...userdata,
					useremail: "anti@gmail.com",
					password: "0000"
				}
			})
			//setUseremail("anti@gmail.com")
			//setPassword("0000")
		} else if (name == '小明') {
			setUserdata(function () {
				return {
					...userdata,
					useremail: "cake@gmail.com",
					password: "0000"
				}
			})
			//setUseremail("cake@gmail.com")
			//setPassword("0000")
		}
	}
	function btnLogin() {
		login(userdata.useremail, userdata.password);
	}
	function handleChange(e) {
		console.log(e)
		setUserdata(function () {
			return { ...userdata, [e.target.name]: e.target.value }
		})
	}
	function handleLoginModal(isModal) {
		if (isModal) {
			setLoginModal(() => isModal)
		} else {
			setLoginModal(() => isModal)
		}
	}
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

				navigate('/order')
				onClose()
			}).catch(function (error) {
				console.log("catch(function (error)")
				sweetError('登入失敗', '帳號或密碼錯誤');
			});
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
									<div className="row">

										<label className="col-2 mt-3" htmlFor="loginName"> 名字 : </label>
										<input type="text" className="login-input col-10 mt-2" placeholder="name" id="loginName" name="username"
											value={userdata.username} onChange={handleChange} />
										<label className="col-2 mt-3" htmlFor="loginPhone"> 電話 : </label>
										<input type="phone" className="login-input col-10 mt-2" placeholder="phone" id="loginPhone" name="phone"
											value={userdata.phone} onChange={handleChange} />
										<label className="col-2 mt-3" htmlFor="loginEmail"> E-Mail : </label>
										<input type="email" className="login-input col-10 mt-2" placeholder="email" id="loginEmail" name="useremail"
											value={userdata.useremail} onChange={handleChange} />
										<label className="col-2 mt-3" htmlFor="loginPassword"> 密碼 : </label>
										<input type="password" className="login-input col-10 mt-2" placeholder="password" id="loginPassword" name="password"
											value={userdata.password} onChange={handleChange} />
									</div>
									<button className="btn btn-login" onClick={() => btnRegister()}>註冊</button>
									<p>已經是會員? <span className="color-primary border-bottom finger" onClick={() => handleLoginModal(false)}>登入</span></p>
								</div>
								:
								<div className="d-flex flex-column align-items-center gap-3">
									<p className="h4 fw-bold">會員</p>
									<div className="row">
										<label className="col-2 mt-3" htmlFor="loginEmail"> E-Mail : </label>
										<input type="email" className="login-input col-10 mt-2" placeholder="email" id="loginEmail" name="useremail"
											value={userdata.useremail} onChange={handleChange} />
										<label className="col-2 mt-3" htmlFor="loginPassword"> 密碼 : </label>
										<input type="password" className="login-input col-10 mt-2" placeholder="password" id="loginPassword" name="password"
											value={userdata.password} onChange={handleChange} />
									</div>
									<button className="btn btn-login" onClick={btnLogin} >登入</button>

									<p>還沒成為會員? <span className="color-primary border-bottom finger" onClick={() => handleLoginModal(true)}>註冊</span></p>
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



//渲染loginModal

//export function LoginModal(method = 'login') {

//    if (method == 'login') {
//        return (
//            <div className="d-flex flex-column align-items-center gap-3">
//                <p className="h4 fw-bold">會員</p>
//                <input type="email" className="login-input" placeholder="Email" id="loginEmail" />
//                <input type="password" className="login-input" placeholder="Password" id="loginPassword" />
//                <button className="btn btn-login" onClick={btnLogin}>登入</button>

//                <p>還沒成為會員? <span className="color-primary border-bottom finger" onClick={() => renderLoginModal('register')} >註冊</span></p>
//                <p className="fw-light">
//                    <span>Demo: </span>
//                    <span className="ms-2 finger" onClick={() => demoInput('小明')}>顧客-小明</span>
//                    <span className="ms-2 finger" onClick={() => demoInput('阿姨')}>老闆-阿姨</span>
//                </p>
//            </div>
//        )
//        //註冊
//    } else if (method == 'register') {
//        return (
//            <div className="d-flex flex-column align-items-center gap-3">
//                <p className="h4 fw-bold">會員</p>
//                <input type="text" className="login-input" placeholder="Name" id="loginName" />
//                <input type="phone" className="login-input" placeholder="phone" id="loginPhone" />
//                <input type="email" className="login-input" placeholder="Email" id="loginEmail" />
//                <input type="password" className="login-input" placeholder="Password" id="loginPassword" />
//                <button className="btn btn-login" onClick={() => btnRegister()}>註冊</button>

//                <p>已經是會員? <span className="color-primary border-bottom finger" onClick={() => renderLoginModal('login')}>登入</span></p>
//            </div>
//        )
//    }
//}