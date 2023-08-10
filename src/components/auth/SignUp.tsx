import { useModal } from "components/overlay/modal/Modal.hooks";
import SignUpForm from "components/auth/SignUpForm";

export const SignUp = () => {
  const { mount, unmount } = useModal();
  const signUpModalHandler = () => {
    mount("signUp", <SignUpForm unmount={unmount} />);
  };
  return (
    <p className="text-md cursor-pointer text-gray-200" onClick={signUpModalHandler}>
      회원가입
    </p>
  );
};
