import { MouseEvent, ReactNode } from "react";
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

  return (
    <div
      className="fixed top-0 left-0 z-40 flex items-center justify-center w-full h-full bg-black bg-opacity-30"
      onClick={handleClose}
    >
      <div className="max-w-lg p-5 text-white rounded-lg bg-mainDark1">{children}</div>
    </div>
  );
};

export default Modal;
