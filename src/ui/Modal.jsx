import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";

const ModalContext = createContext();

function Modal({ children }) {
  const [openedModal, setOpenedModal] = useState("");
  const open = setOpenedModal;
  const close = () => setOpenedModal("");
  return (
    <ModalContext.Provider value={{ openedModal, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, modalName }) {
  const { open } = useContext(ModalContext);
  return cloneElement(children, { onClick: () => open(modalName) });
}

function Container({ children, modalName }) {
  const { close, openedModal } = useContext(ModalContext);
  const checked = modalName === openedModal;
  // const modalRef = useOutsideClick(close, true);
  if (!checked) return null;
  return createPortal(cloneElement(children, { close }), document.body);
}

Modal.Open = Open;
Modal.Container = Container;
export default Modal;
