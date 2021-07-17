import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";
import Backdrop from "../Backdrop/Backdrop";
import { CSSTransition } from "react-transition-group";

const ModalOverlay = (props) => {
  const {
    className,
    footerClass,
    style,
    header,
    headerClass,
    onSubmit,
    contentClass,
    footer,
  } = props;
  const content = (
    <div className={`modal ${className}`} style={style}>
      <header className={`modal__header ${headerClass}`}>
        <h2>{header}</h2>
      </header>
      <form onSubmit={onSubmit ? onSubmit : (event) => event.preventDefault()}>
        <div className={`modal__content ${contentClass}`}>{props.children}</div>
        <footer className={`modal__footer ${footerClass}`}>{footer}</footer>
      </form>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};

const Modal = (props) => {
  const { show, onCancel } = props;
  return (
    <Fragment>
      {show && <Backdrop onClick={onCancel} />}
      <CSSTransition
        in={show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </Fragment>
  );
};

export default Modal;
