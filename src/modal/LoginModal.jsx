//渲染loginModal
export const LoginModal = ({ onClose }) => {
    function demoInput(name) { }
    function btnLogin() { }

    return (
        <>
            <div className="modal fade show" id="loginModal" tabIndex="-1" aria-modal="true" role="dialog" style={{ display: "block" }} >
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header border-0 pb-1">
                            <button type="button" className="btn-close float-end float" data-bs-dismiss="modal" aria-label="Close" onClick={onClose }></button>
                        </div>
                        <div className="modal-body">
                            <div className="d-flex flex-column align-items-center gap-3">
                                <p className="h4 fw-bold">會員</p>
                                <input type="email" className="login-input" placeholder="Email" id="loginEmail" />
                                <input type="password" className="login-input" placeholder="Password" id="loginPassword" />
                                <button className="btn btn-login" onClick={btnLogin} >登入</button>

                                <p>還沒成為會員? <span className="color-primary border-bottom finger" onClick={() => renderLoginModal('register')}>註冊</span></p>
                                <p className="fw-light">
                                    <span>Demo: </span>
                                    <span className="ms-2 finger" onClick={()=>demoInput('小明')}>顧客-小明</span>
                                    <span className="ms-2 finger" onClick={() =>demoInput('阿姨')}>老闆-阿姨</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop fade show">3254131</div>

        </>
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