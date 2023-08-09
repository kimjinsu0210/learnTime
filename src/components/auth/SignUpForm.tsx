import { useState } from "react";
import defaultImg from "assets/defaultImg.png";
import { AiFillCloseCircle } from "react-icons/ai";
import { supabase } from "api/supabaseClient";

const SignUpForm = ({ unmount }: { unmount: (name: string) => void }) => {
  
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const signUpHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nickname: "김진수",
          profileImgUrl: defaultImg
        }
      }
    });
    if (error) {
      alert("이미 일치하는 회원이 존재합니다.");
    } else {
      alert("회원가입 완료");
    }
  };

  return (
    <form onSubmit={signUpHandler} className="p-[20px]">
      <div className="flex justify-end">
        <AiFillCloseCircle
          className="text-3xl text-red-500 cursor-pointer"
          onClick={() => unmount("signUp")}
        />
      </div>
      <div className="flex flex-col gap-4">
        <label>이메일</label>
        <input
          className="border-b border-gray-400 border-solid w-[300px] h-[35px]"
          placeholder="예)learntime@learntime.com"
          type="text"
          value={email}
          onChange={e => {
            setEmail(e.target.value);
          }}
          autoFocus
        />
        <label>비밀번호</label>
        <input
          className="border-b border-gray-400 border-solid w-[300px] h-[35px]"
          type="password"
          value={password}
          onChange={e => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <div className="flex justify-end">
        <button className="p-2 mt-8 text-white bg-red-500 rounded-lg">가입하기</button>
      </div>
    </form>
  );
};

export default SignUpForm;
