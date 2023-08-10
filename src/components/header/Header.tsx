import { useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "api/supabaseClient";
import { SignIn, SignOut, SignUp } from "components/auth/index";
import useSessionStore from "components/zustand/store";
import { BiMessageSquareError } from "react-icons/bi";
import { FaSpinner } from "react-icons/fa";
import logo from "assets/learntime_logo.gif";
import logo2 from "assets/learntime_logo2.gif";

const Header: React.FC = () => {
  const session = useSessionStore(state => state.session);
  const setSession = useSessionStore(state => state.setSession);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      console.log("sessionData", session);
      console.log("loginEmail", session?.user.email);
      console.log("loginNickname", session?.user.user_metadata.nickname);
      console.log("loginProfileImgUrl", session?.user.user_metadata.profileImgUrl);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, [setSession]);

  return (
    <header className="flex items-center justify-between px-4 py-2 text-gray-700 bg-gray-200">
      <div className="flex items-center">
        <Link to="/" className="flex items-center">
          <BiMessageSquareError size="24" color="red" />
          <div className="flex items-center justify-center animate-spin">
            <FaSpinner className="text-4xl text-red-500" />
          </div>
          <img src={logo} alt="" className="w-[40px]" />
          <img src={logo2} alt="" className="w-[40px]" />
          <h1 className="ml-2 text-xl font-bold">런타임</h1>
        </Link>
      </div>
      <div className="flex items-center">
        {session ? (
          <>
            <Link to="/mypage">
              <img
                src={session?.user.user_metadata.profileImgUrl}
                alt="profileImg"
                className="w-[40px] rounded-full"
              />
            </Link>
            <p>{session?.user.user_metadata.nickname}</p>
            <SignOut />
          </>
        ) : (
          <>
            <SignIn />
            <SignUp />
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
