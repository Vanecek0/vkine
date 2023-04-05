import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import { XLg } from 'react-bootstrap-icons';
import modalStyle from './Modal.module.css';

const Modal = (props) => {
    const [active, setActive] = useState(false);

    useEffect(() => {
        setActive(props.active);
    }, [props.active])

    const modalRef = useRef(null);

    const closeModal = () => {
        modalRef.current.classList.remove('modal-active');
        props.onClose();
    }

  return (
    <div ref={modalRef} id={props.id} className={`${modalStyle.modal} ${active ? 'modal-active': ''}`} onClick={closeModal}>
        {props.children}
    </div>
  )
}

Modal.propTypes = {
    active: PropTypes.bool,
    id: PropTypes.string
}

export const ModalContent = (props) => {
    const contentRef = useRef(null);

    const closeModal = () => {
        contentRef.current.parentNode.classList.remove('modal-active');
        if (props.onClose) props.onClose();
    }

    return (
        <div ref={contentRef} className={modalStyle.modal___content}>
            <div className={modalStyle.modal___children}>
                {props.children}
            </div>
            <div className={modalStyle.modal__content__close} onClick={closeModal}>
                <button><XLg size={25}></XLg></button>
            </div>
        </div>
    )
}

ModalContent.propTypes = {
    onClose: PropTypes.func
}

export default Modal;