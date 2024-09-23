import { useState } from 'react';
import ModalContent from './PModalContent';

export default function NoPortalExample() {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <button onClick={() => setShowModal(true)}>
                Show modal without a portal
            </button>
            {showModal && (
                <ModalContent onClose={() => setShowModal(false)} />
            )}
        </>
    );
}