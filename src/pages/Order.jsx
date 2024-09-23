import { useState } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import { Menu } from './Menu'
import { TagList } from './TagList'
import { PopupWindows } from './Popup'
export const Order = () => {
    /*    const [state, dispatch] = useStore();*/
    const [selectName, setSelectName] = useState("全部")
    const handleChangeMenu = () => {
        let name = document.querySelector("input[name='分類標籤']:checked").value;
        setSelectName(name);
    }


    //const [show, setShow] = useState(false);

    //const handleClose = () => setShow(false);
    //const handleShow = () => setShow(true);



    return (
        <div>
            <Header />
            <div className="main-content">
                <Footer />

                <div className="container">
                    <div className="d-flex py-2 justify-content-center">

                        <TagList onChange={handleChangeMenu} />
                    </div>
                </div>
                <Menu selectName={selectName} />
            </div>
            <Footer />

        </div>
    )
}