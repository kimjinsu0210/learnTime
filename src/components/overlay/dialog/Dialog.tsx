import { useLockBodyScroll } from "hooks/useLockBodyScroll";
import { MouseEvent, ReactNode } from "react";
import { AiFillWarning } from "react-icons/ai";

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
      className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-30 "
      onClick={close}
    >
      <div className="absolute max-w-[500px] p-8 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg left-1/2 top-1/2">
        <div className="flex">
        <AiFillWarning className="text-yellow-400 text-[30px] mb-5" />
        <p className="m-1">경고!</p>
        </div>
        <p>{children}</p>
        {type === "Confirm" ? (
          <div className="flex gap-4">
            <button onClick={onClose}>취소</button>
            <button onClick={onSucess}>확인</button>
          </div>
        ) : (
          <div className="flex justify-end gap-5">
            <button
              onClick={close}
              className="mt-4 p-[7px] text-white bg-red-500 rounded-lg text-[13px]"
            >
              확인
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
