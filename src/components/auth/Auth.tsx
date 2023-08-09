import { useEffect } from "react";
import { create } from "zustand";
import { supabase } from "api/supabaseClient";
import { SignUp, SignIn, SignOut } from "./index";

const Auth = () => {
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

  return (
    <>
      <SignUp />
      <SignIn />
      <SignOut />
    </>
  );
};

export default Auth;
