import { supabase } from "api/supabaseClient";

export const SignOut = () => {
  const signOutHandler = async () => {
    const { error } = await supabase.auth.signOut();
  };
  return (
    <h1 className="text-xl font-bold cursor-pointer" onClick={signOutHandler}>
      로그아웃
    </h1>
  );
};
