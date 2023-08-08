import { useLockBodyScroll } from "hooks/useLockBodyScroll";
import { MouseEvent, ReactNode } from "react";
import { createPortal } from "react-dom";
import { useOverlayContext } from "../Overlay.context";

interface Props {
  children: ReactNode;
  name: string;
}

const Modal = ({ children, name }: Props) => {
  const { unmount } = useOverlayContext();

  type CloseModal = (event: MouseEvent<HTMLDivElement>) => void;
  const handleClose: CloseModal = event => {
    const { target, currentTarget } = event;

    if (target !== currentTarget) return;

    unmount(name);
  };

  useLockBodyScroll(true);

  return createPortal(
    <div
      className="bg-black bg-opacity-30 fixed left-0 top-0 flex justify-center items-center w-full h-full z-40"
      onClick={handleClose}
    >
      <div className="bg-white w-48 p-5">{children}</div>
    </div>,
    document.getElementById("modal") as HTMLElement
  );
};

export default Modal;
