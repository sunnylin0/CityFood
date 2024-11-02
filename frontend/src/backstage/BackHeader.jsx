import { useState } from 'react'
import { createPortal } from 'react-dom'
import { NavLink, useNavigate } from 'react-router-dom'
import logo from '~/img/logoB.png';
import { AdModal } from '@/modal/AdModal'
import { GuideModal } from '@/modal/GuideModal'
import { UserOrdersModal } from '@/modal/UserOrdersModal'
import { LoginModal } from '@/modal/LoginModal'


export const BackHeader = () => {
    const [showAdModal, setShowAdModal] = useState(false);
    const [showGuideModal, setShowGuideModal] = useState(false);
    const [showUserOrderModal, setShowUserOrderModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);

    function goToCustomerOrdersPage() { setShowAdModal(true); }
    function goToProductManagePage() { setShowGuideModal(true); console.log('openGuideModal')}
    function goToRevenueAnalysisPage() { setShowUserOrderModal(true); console.log('openGuideModal')}
	function goToIndex() { }
	let uLink = useNavigate();
	function hanledLogout() {
		logout()
		uLink('/order')
	}
    //function logout() { setShowLoginModal(true); console.log('setShowLoginModal') }
    function closeAdmodal() { setShowAdModal(false); }
    function closeGuideModal() { setShowGuideModal(false); }
    function closeUserOrderModal() { setShowUserOrderModal(false);  }
    function xxgoToBackstage() { }
    function closeLoginModal() { setShowLoginModal(false);  }


	//渲染NAV清單
	let isLogin = getDataFromLocalStorage('_token') ? true : false;
	let userNameContent = "";
	let loginoutContent = `<span class="nav-link finger" href="" onclick="showLoginModal('login')">登入/註冊</span>`;
	if (isLogin) {
		userNameContent =
			<li className="nav-item" id="navLoginArea">
			<span className="nav-link" href="" id="">早安!  <b> {getDataFromLocalStorage('_user').userName}</b></span>
			</li>
	}

    return(
        <div className="header">
            {showAdModal && createPortal(<AdModal onClose={closeAdmodal} />, document.body)}
            {showGuideModal && createPortal(<GuideModal onClose={closeGuideModal} />, document.body)}
            {showUserOrderModal && createPortal(<UserOrdersModal onClose={closeUserOrderModal} />, document.body)}
            {showLoginModal && createPortal(<LoginModal onClose={closeLoginModal} />, document.body)}


            <nav className="navbar navbar-expand-lg navbar-light *bg-c-secondary">
                <div className="container *container-fluid">
					<span className="btn navbar-brand m-0" id="logo" onClick={() => uLink('/order') }>
                        <img className="logo" src={logo} alt="" />
                    </span>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0" id="navList">
							{userNameContent}
                            <HeadeLink to="/backstage" title='出餐管理' />
                            <HeadeLink to="/productmanage" title='菜單管理' />
                            <HeadeLink to="/revenueanalysis" title='營收分析'/>
                            <HeadeLink to="/order" title='切換至前台' />
							<HeadeItem onClick={hanledLogout} title='登出' />
                        </ul>
                    </div>
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
