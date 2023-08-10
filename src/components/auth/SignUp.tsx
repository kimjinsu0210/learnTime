import { useModal } from "components/overlay/modal/Modal.hooks";
import SignUpForm from "components/auth/SignUpForm";

export const SignUp = () => {
  const { mount, unmount } = useModal();
  const signUpModalHandler = () => {
    mount("signUp", <SignUpForm unmount={unmount} />);
  };
  return (
    <p className="text-xl font-bold cursor-pointer" onClick={signUpModalHandler}>
      회원가입
    </p>
  );
};
