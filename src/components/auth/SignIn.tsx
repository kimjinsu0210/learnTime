import { useModal } from "components/overlay/modal/Modal.hooks";

import SignInForm from "./SignInForm";

export const SignIn = () => {
  const { mount, unmount } = useModal();
  const signInModalHandler = () => {
    mount("signIn", <SignInForm unmount={unmount} />);
  };

  return (
    <h1 className="text-xl font-bold cursor-pointer" onClick={signInModalHandler}>
      로그인
    </h1>
  );
};
