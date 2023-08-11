import { supabase } from "api/supabaseClient";

export const SignOut = () => {
  const signOutHandler = async () => {
    const { error } = await supabase.auth.signOut();
  };
  return (
    <p className="cursor-pointer text-md" onClick={signOutHandler}>
      로그아웃
    </p>
  );
};
