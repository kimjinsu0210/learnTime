import { ReactNode } from "react";
import { useOverlayContext } from "../Overlay.context";
import { Dialog } from "./Dialog";

export const useDialog = () => {
  const { mount: _mount, unmount: _unmount } = useOverlayContext();

  type ConfirmType = (element: ReactNode) => Promise<boolean>;
  const Confirm: ConfirmType = element => {
    return new Promise(resolve => {
      _mount(
        "Confirm",
        <Dialog
          type="Confirm"
          onClose={() => {
            resolve(false);
            _unmount("Confirm");
          }}
          onSucess={() => {
            resolve(true);
            _unmount("Confirm");
          }}
        >
          {element}
        </Dialog>
      );
    });
  };

  type AlertType = (element: ReactNode) => Promise<boolean>;
  const Alert: AlertType = element => {
    return new Promise(resolve => {
      _mount(
        "Alert",
        <Dialog
          type="Alert"
          onClose={() => {
            resolve(true);
            _unmount("Alert");
          }}
        >
          {element}
        </Dialog>
      );
    });
  };

  return { Alert, Confirm };
};
