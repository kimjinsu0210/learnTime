import { supabase } from "api/supabaseClient";
import defaultImg from "assets/defaultImg.png";
import { SignIn, SignOut, SignUp } from "components/auth/index";
import useSessionStore from "components/zustand/store";
import { useEffect } from "react";
import { BiSolidErrorCircle } from "react-icons/bi";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const session = useSessionStore(state => state.session);
  const setSession = useSessionStore(state => state.setSession);
  const storageUrl = process.env.REACT_APP_SUPABASE_STORAGE_URL;
  const addedSession = session?.user.user_metadata;
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, [setSession]);

  return (
    <header className="fixed top-0 z-30 flex items-center justify-between w-full px-4 py-5 text-white bg-mainDark1">
      <div className="flex items-center">
        <Link to="/" className="flex items-center">
          <BiSolidErrorCircle size="25" color="white" />
          <h1 className="ml-2 text-xl font-bold">LearnTime</h1>
        </Link>
      </div>
      <div className="flex items-center">
        {session ? (
          <>
            <Link to="/mypage">
              <img
                src={
                  addedSession?.profileImgUrl
                    ? `${storageUrl}/${addedSession?.profileImgUrl}`
                    : defaultImg
                }
                alt="profileImg"
                className="w-[30px] h-[30px] rounded-full"
              />
            </Link>
            <p className="mx-1 text-md">{addedSession?.nickname}</p>
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
