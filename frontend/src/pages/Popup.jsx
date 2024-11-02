import NoPortalExample from './PNoModalContent';
import PortalExample from './PPortalExample';

export function PopupWindows() {
    return (
        <>
            11111
            <div className="clipping-container">
                <NoPortalExample />
                aaa
            </div>
            22222
            <div className="clipping-container">
                <PortalExample />
                bbb
            </div>
        </>
    );
}