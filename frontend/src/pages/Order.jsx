import { useState, useEffect, useCallback} from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import { Menu } from './Menu'
import { TagList } from './TagList'
import { PopupWindows } from './Popup'

var isLoadReaw = false
export const Order = () => {
	/*    const [state, dispatch] = useStore();*/
	const [selectID, setSelectID] = useState("tagALL")
	const handleChangeMenu = () => {
		let tag_id = document.querySelector("input[name='分類標籤']:checked").id;
		setSelectID(tag_id);
	}

	const [, updateState] = useState();
	const forceUpdate = useCallback(() => updateState({}), []);
	function loadReaw() {

		if (theMenu.length > 1 && isLoadReaw == true) {
			isLoadReaw = false
			forceUpdate();
		} else if (theMenu.length == 0) {
			isLoadReaw = true;
			setTimeout(loadReaw, 1000)
		}
	}
	useEffect(loadReaw, [])

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
				<Menu selectID={selectID.substring(3, 10)} />
			</div>
			<Footer />

		</div>
	)
}