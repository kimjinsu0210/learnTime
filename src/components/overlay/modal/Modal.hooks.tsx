import { ReactNode } from "react";
import { useOverlayContext } from "../Overlay.context";
import Modal from "./Modal";

export const useModal = () => {
  const { mount: _mount, unmount: _unmount } = useOverlayContext();

  type Mount = (name: string, element: ReactNode) => void;
  const mount: Mount = (name, element) => {
    _mount(name, <Modal name={name}>{element}</Modal>);
  };

  const unmount = (name: string) => {
    _unmount(name);
  };

  return { mount, unmount };
};
