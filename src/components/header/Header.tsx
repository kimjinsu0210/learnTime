import React from "react";
import { useEffect, useState } from "react";
import { BiMessageSquareError } from "react-icons/bi";
import { Link } from "react-router-dom";
import { Session } from "@supabase/supabase-js";
import { supabase } from "supabaseClient";

const Header: React.FC = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <header className="bg-gray-200 text-gray-700 flex items-center justify-between px-4 py-2">
      <div className="flex items-center">
        <Link to="/" className="flex items-center">
          <BiMessageSquareError size="24" color="red" />
          <h1 className="text-xl ml-2">런타임</h1>
        </Link>
      </div>
      <div className="flex items-center">
        {session ? (
          <>
            <Link to="/mypage">마이페이지</Link>
            <button onClick={() => supabase.auth.signOut()} className="ml-4">
              로그아웃
            </button>
          </>
        ) : (
          <>
            <button>로그인</button>
            <button>회원가입</button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
