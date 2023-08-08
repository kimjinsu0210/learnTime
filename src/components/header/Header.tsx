import React from "react";
import { Link } from "react-router-dom";
import { BiMessageSquareError } from "react-icons/bi";

const Header: React.FC = () => {
  return (
    <header className="bg-gray-200 text-gray-700 flex items-center justify-between px-4 py-2">
      <div className="flex items-center">
        <Link to="/" className="flex items-center">
          <BiMessageSquareError size="24" color="red" />
          <h1 className="text-xl ml-2">런타임</h1>
        </Link>
      </div>
      <div className="flex items-center">로그인 회원가입</div>
    </header>
  );
};

export default Header;
