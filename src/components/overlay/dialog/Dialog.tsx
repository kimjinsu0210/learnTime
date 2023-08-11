import Button from "components/button/Button";
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
      className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-30 "
      onClick={close}
    >
      <div className="absolute max-w-[500px] p-8 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg left-1/2 top-1/2">
        <p>{children}</p>
        {type === "Confirm" ? (
          <div className="flex gap-4">
            <Button onClick={onClose}>취소</Button>
            <Button onClick={onSucess}>확인</Button>
          </div>
        ) : (
          <div className="flex justify-end gap-5 mt-5">
            <Button onClick={close}>확인</Button>
          </div>
        )}
      </div>
    </div>
  );
};
