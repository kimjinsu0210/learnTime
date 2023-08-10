import React from "react";
import { useEffect, useState } from "react";
import { BiMessageSquareError } from "react-icons/bi";
import { Link } from "react-router-dom";
import { Session } from "@supabase/supabase-js";
import { supabase } from "../../api/supabaseClient";
import { SignIn, SignOut, SignUp } from "components/auth/index";

const Header: React.FC = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      console.log("session1", session);
      // console.log("sessionData", session);
      // console.log("loginEmail", session?.user.email);
      // console.log("loginNickname", session?.user.user_metadata.nickname);
      // console.log("loginProfileImgUrl", session?.user.user_metadata.profileImgUrl);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      console.log("session2", session);
    });
  }, []);

  return (
    <header className="flex items-center justify-between px-4 py-2 text-gray-700 bg-gray-200">
      <div className="flex items-center">
        <Link to="/" className="flex items-center">
          <BiMessageSquareError size="24" color="red" />
          <h1 className="ml-2 text-xl">런타임</h1>
        </Link>
      </div>
      <div className="flex items-center">
        {session ? (
          <>
            <Link to="/mypage">마이페이지</Link>
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
