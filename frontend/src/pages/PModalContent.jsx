import image9 from "~/img/PC/image-9.png"
function ModalContent22({ onClose }) {
    console.log("Modal load")
    return (
        <>
            <div className="modal33">
                <div>I'm a modal dialog</div>
                <button onClick={onClose}>Close</button>
            </div>
            <div className="modal-backdrop fade show"></div>
        </>
    )

}
export default function ModalContent({ onClose }) {
    return (
        <>
            <div className="modal fade show" id="adModal" tabIndex="-1" aria-modal="true" role="dialog" style={{display:"block"}} >
                <div className="modal-dialog modal-dialog-centered modal-xl">
                    <div className="modal-content adBackground">
                        <div className="modal-header border-0 pb-0">
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={ onClose}></button>
                        </div>
                        <div className="modal-body d-flex flex-wrap border-0 pt-0">
                            <div className="d-flex flex-column justify-content-center align-items-center align-items-lg-end col-12 col-lg-6 adsContent g-5 fw-bold fs-3">
                                <span className="">Catch Breakfast</span>
                                <span className="">快取早餐 歡慶上線</span>
                                <span>即日起至12/31</span>
                                <span>自備環保餐具</span>
                                <span>飲料無限暢飲</span>
                            </div>
                            <div className="col-12 col-lg-6 adsImg">
                                <img src={image9 } alt="" />

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop fade show"></div>
        </>
    )


}