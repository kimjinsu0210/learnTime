import { supabase } from "api/supabaseClient";

export const SignOut = () => {
  const signOutHandler = async () => {
    const { error } = await supabase.auth.signOut();
  };
  return (
    <p className="text-xl font-bold cursor-pointer" onClick={signOutHandler}>
      로그아웃
    </p>
  );
};
