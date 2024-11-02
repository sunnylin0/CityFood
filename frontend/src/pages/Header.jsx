import { useState } from 'react'
import { createPortal } from 'react-dom'
import logo from '~/img/logoB.png';
import { AdModal } from '@/modal/AdModal'
import { GuideModal } from '@/modal/GuideModal'
import { UserOrdersModal } from '@/modal/UserOrdersModal'
import { LoginModal } from '@/modal/LoginModal'
import { BackStage } from '@/backstage/BackStage'

import { NavLink, useNavigate} from "react-router-dom";


export const Header = () => {
    const [showAdModal, setShowAdModal] = useState(false);
    const [showGuideModal, setShowGuideModal] = useState(false);
    const [showUserOrderModal, setShowUserOrderModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showBackStage, setShowBackStage] = useState(false);
	let uLink = useNavigate();
    function openAdmodal() { setShowAdModal(true); }
    function openGuideModal() { setShowGuideModal(true); console.log('openGuideModal')}
    function openUserOrderModal() { setShowUserOrderModal(true); console.log('openGuideModal')}
    function goToBackstage() {
        let uLink = useNavigate();
        return uLink(-1);
    }
    function openLoginModal() { setShowLoginModal(true); console.log('setShowLoginModal') }
    function closeAdmodal() { setShowAdModal(false); }
    function closeGuideModal() { setShowGuideModal(false); }
    function closeUserOrderModal() { setShowUserOrderModal(false);  }
    function xxgoToBackstage() { }
    function closeLoginModal() { setShowLoginModal(false);  }
	function hanledLogout() {
		logout()
		uLink('/order')
	}
	let isLogin = getDataFromLocalStorage('_token') ? true : false;
	let isAdmin = getDataFromLocalStorage('_user') ? getDataFromLocalStorage('_user').role == 'admin' : false;
	let UserNameContent =()=> <div></div>;
	let loginoutContent = `<span className="nav-link finger" href="" onclick="showLoginModal('login')">登入/註冊</span>`;
	if (isLogin) {
		let helloStr = getDataFromLocalStorage('_user').role == 'insider' ? '桌號 ' : '早安!';
		UserNameContent =()=>
			<li className="nav-item" id="navLoginArea">
				<span className="nav-link" href="" id="">{helloStr}  <b>{getDataFromLocalStorage('_user').userName}</b></span>
			</li>;
	}



    return(
        <div className="header">
            {showAdModal && createPortal(<AdModal onClose={closeAdmodal} />, document.body)}
            {showGuideModal && createPortal(<GuideModal onClose={closeGuideModal} />, document.body)}
            {showUserOrderModal && createPortal(<UserOrdersModal onClose={closeUserOrderModal} />, document.body)}
            {showLoginModal && createPortal(<LoginModal onClose={closeLoginModal} />, document.body)}

            <nav className="navbar navbar-expand-lg navbar-light *bg-c-secondary">
                <div className="container *container-fluid">
					<span className="btn navbar-brand m-0" id="logo" onClick={() => uLink('/order')}>
                        <img className="logo" src={logo} alt="" />
                    </span>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                        <span className="navbar-toggler-icon"></span>
                    </button>
					{isLogin ?
						<div className="collapse navbar-collapse" id="navbarSupportedContent">
							<ul className="navbar-nav ms-auto mb-2 mb-lg-0" id="navList">
								<UserNameContent />
								<HeadeItem onClick={openAdmodal} title='活動快訊' />
								<HeadeItem onClick={openGuideModal} title='功能介紹' />
								<HeadeItem onClick={openUserOrderModal} title='訂單查詢' />
								{isAdmin?<HeadeLink to="/backstage" title='切換至後台' />:""}
								<HeadeItem onClick={hanledLogout} title='登出' />								
							</ul>
						</div>:
						<div className="collapse navbar-collapse" id="navbarSupportedContent">
							<ul className="navbar-nav ms-auto mb-2 mb-lg-0" id="navList">
								<HeadeItem onClick={openAdmodal} title='活動快訊' />
								<HeadeItem onClick={openGuideModal} title='功能介紹' />								
								<HeadeItem onClick={openLoginModal} title='登入/註冊' />								
                            {/*<NavLink className="nav-link finger"  to="./backstage">後台</NavLink>*/}
							</ul>
						</div>
						}
                </div>
            </nav>
        </div>
    )
}
const HeadeItem = (props) =>
    <li className="nav-item" {...props}>
        <span className="nav-link finger" >{props.title}</span>
    </li>
const HeadeLink = (props) =>
    <li className="nav-item" >
        <NavLink className="nav-link finger" {...props}>{props.title}</NavLink>
    </li>

