import { supabase } from "api/supabaseClient";
import { useDialog } from "components/overlay/dialog/Dialog.hooks";
import { useState } from "react";
import Button from "components/button/Button";

const SignInForm = ({ unmount }: { unmount: (name: string) => void }) => {
  const [loginEmail, setLoginEmail] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");
  const { Alert } = useDialog();
  const signInHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: loginPassword
    });
    if (error) Alert("아이디 또는 비밀번호가 일치하지 않습니다.");
    else unmount("signIn");
  };

  return (
    <form onSubmit={signInHandler} className="p-[5px]">
      <div className="mb-5 flex justify-center">로그인</div>
      <div className="flex flex-col m-2 gap-2">
        {/* <label>이메일</label> */}
        <input
          className="auth-input"
          placeholder=" email"
          type="text"
          value={loginEmail}
          onChange={e => {
            setLoginEmail(e.target.value);
          }}
          autoFocus
        />
        {/* <label>비밀번호</label> */}
        <input
          className="auth-input"
          placeholder=" password"
          type="password"
          value={loginPassword}
          onChange={e => {
            setLoginPassword(e.target.value);
          }}
        />
      </div>
      <div className="flex justify-center">
        <Button onClick={() => unmount("signIn")}>취소</Button>
        <Button>로그인</Button>
      </div>
    </form>
  );
};

export default SignInForm;
