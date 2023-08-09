import { supabase } from "api/supabaseClient";

export const SignOut = () => {
  const signOutHandler = async () => {
    const { error } = await supabase.auth.signOut();
    console.log("signOutError", error);
    alert("로그아웃 완료");
  };
  return (
    <h1 className="text-xl font-bold cursor-pointer" onClick={signOutHandler}>
      로그아웃
    </h1>
  );
};
