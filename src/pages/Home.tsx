import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import defaultImg from "assets/defaultImg.png";
import { create } from 'zustand'
// import { supabase } from "../server/supabase";

const Home = () => {
  const supabaseUrl = "https://cxtdgzstirtryhjreozm.supabase.co";
  const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4dGRnenN0aXJ0cnloanJlb3ptIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE0NjI2MzMsImV4cCI6MjAwNzAzODYzM30.LPzsZy_BG_rPpAo_RKOGOS5dNVTp3hcVheupmcHj0Ms";
  const supabase = createClient(supabaseUrl, supabaseKey);
  // const useStore = create((set) => ({
  //   count: 1,
  //   inc: () => set((state:string) => ({ count: state.count + 1 })),
  // }))
  
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [loginEmail, setLoginEmail] = useState<string>("");
  const [loginPassword, setLoginPassword] = useState<string>("");

  useEffect(() => {
    const sessionData = async () => {
      const { data, error } = await supabase.auth.getSession();
      const userData = data.session?.user;
      console.log("sessionData", data);
      console.log("sessionError", error);
      console.log("loginEmail", userData?.email);
      console.log("loginNickname", userData?.user_metadata.nickname);
      console.log("loginProfileImgUrl", userData?.user_metadata.profileImgUrl);
    };
    sessionData();
  }, []);

  // 파이어베이스와 동일하게 회원가입 시 자동 로그인 이다.
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
    console.log("signUpData", data);
    console.log("signUpError", error);
    alert("회원가입 완료");
  };
  const signInHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email:loginEmail,
      password:loginPassword,
    });

    console.log("signInData", data);
    console.log("signInError", error);
    if(error){
      alert("아이디 또는 비밀번호가 일치하지 않습니다.");
    }else{
      alert("로그인 완료");
    }
  };
  const signOutHandler = async () => {
    const { error } = await supabase.auth.signOut();
    console.log("signOutError", error);
    alert("로그아웃 완료");
  };
  return (
    <div>
      <h1 className="text-xl font-bold">회원가입</h1>
      <form onSubmit={signUpHandler}>
        <div>
          <label>이메일 주소: </label>
          <input
            className="border border-black rounded-lg w-60"
            type="text"
            value={email}
            onChange={e => {
              setEmail(e.target.value);
            }}
            autoFocus
          />
        </div>
        <div>
          <label>비밀번호: </label>
          <input
            className="border border-black rounded-lg w-30"
            type="password"
            value={password}
            onChange={e => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button className="bg-orange-200 rounded-lg p-2">가입하기</button>
      </form>
      <h1 className="text-xl font-bold">로그인</h1>
      <form onSubmit={signInHandler}>
        <div>
          <label>이메일 주소: </label>
          <input
            className="border border-black rounded-lg w-60"
            type="text"
            value={loginEmail}
            onChange={e => {
              setLoginEmail(e.target.value);
            }}
            autoFocus
          />
        </div>
        <div>
          <label>비밀번호: </label>
          <input
            className="border border-black rounded-lg w-30"
            type="password"
            value={loginPassword}
            onChange={e => {
              setLoginPassword(e.target.value);
            }}
          />
        </div>
        <button className="bg-orange-200 rounded-lg p-2">로그인</button>
      </form>
      <button className="bg-orange-200 rounded-lg p-2" onClick={signOutHandler}>
        로그아웃
      </button>
    </div>
  );
};

export default Home;
