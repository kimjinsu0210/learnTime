import { useLockBodyScroll } from "hooks/useLockBodyScroll";
import { MouseEvent, ReactNode } from "react";

interface Props {
  onClose: any;
  onSucess?: any;
  type: "Confirm" | "Alert";
  children: ReactNode;
}

export const Dialog = ({ onClose, onSucess, type, children }: Props) => {
  type CloseDialog = (event: MouseEvent<HTMLDivElement | HTMLElement>) => void;
  const close: CloseDialog = event => {
    const { target, currentTarget } = event;
    if (target !== currentTarget) return;
    onClose();
  };

  useLockBodyScroll(true);

  return (
    <div
      className="bg-black bg-opacity-30 fixed top-0 left-0 flex justify-center items-center w-full h-full z-50 "
      onClick={close}
    >
      <div className="bg-white w-48 p-5 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <img alt="체크아이콘" />
        <p>{children}</p>
        {type === "Confirm" ? (
          <div className="flex gap-4">
            <button onClick={onClose}>취소</button>
            <button onClick={onSucess}>확인</button>
          </div>
        ) : (
          <div className="flex gap-5">
            <button onClick={close}>확인</button>
          </div>
        )}
      </div>
    </div>
  );
};
