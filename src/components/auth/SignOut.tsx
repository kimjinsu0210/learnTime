import { supabase } from "api/supabaseClient";
import { useNavigate } from "react-router";

export const SignOut = () => {
  const navigate = useNavigate();
  const signOutHandler = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };
  return (
    <p className="cursor-pointer text-md" onClick={signOutHandler}>
      로그아웃
    </p>
  );
};
