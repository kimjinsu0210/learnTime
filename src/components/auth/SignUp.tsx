import { useModal } from "components/overlay/modal/Modal.hooks";
import SignUpForm from "components/auth/SignUpForm";

export const SignUp = () => {
  const { mount, unmount } = useModal();
  const signUpModalHandler = () => {
    mount("signUp", <SignUpForm unmount={unmount} />);
  };
  return (
    <p className="cursor-pointer text-md" onClick={signUpModalHandler}>
      회원가입
    </p>
  );
};
