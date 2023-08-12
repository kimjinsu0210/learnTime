import { useModal } from "components/overlay/modal/Modal.hooks";

import SignInForm from "./SignInForm";

export const SignIn = () => {
  const { mount, unmount } = useModal();
  const signInModalHandler = () => {
    mount("signIn", <SignInForm unmount={unmount} />);
  };

  return (
    <p className="mr-5 cursor-pointer text-md" onClick={signInModalHandler}>
      로그인
    </p>
  );
};
