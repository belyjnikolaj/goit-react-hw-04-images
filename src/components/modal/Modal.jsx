import React, { useEffect } from "react";
import css from './Modal.module.css';
import { createPortal } from "react-dom";

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ children, onClose }) => {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.code === 'Escape') {
                onClose();
            }
        }
        window.addEventListener('keydown', handleKeyDown);
        
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [onClose]);

    const handleBackdropClick = event => {
        if (event.currentTarget === event.target) {
            onClose();
        }
    }

    return createPortal(
        <div className={css.overlay} onClick={handleBackdropClick}>
            <div className={css.modal}>
                {children}
            </div>
        </div>,
        modalRoot
    );
}
 
export default Modal;
