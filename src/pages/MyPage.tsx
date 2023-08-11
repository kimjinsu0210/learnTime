import { supabase } from "api/supabaseClient";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Tables } from "types/supabase";

import useSessionStore from "components/zustand/store";
import { SignIn, SignOut, SignUp } from "components/auth";
import defaultImg from "assets/defaultImg.png";

const MyPage = () => {
  // 게시글 제목, 어디서 작성했는지 해당 카테고리 값 불러오기
  // 내가 쓴 게시글만 불러오기
  // 클릭해서 디테일 자세히 보기
  // 삭제 버튼 추가 삭제 하기

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

  console.log("session data ->", session);

  const [myPostList, setMyPostList] = useState<Tables<"posts">[]>([]);

  const loadMyPosts = async () => {
    if (session?.user) {
      const { data, error } = await supabase
        .from("posts")
        .select(
          `*,
      category (
        name
      )`
        )
        .eq("userId", session.user.id);

      if (!error) {
        setMyPostList(data || []);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await loadMyPosts();
    };

    fetchData();
  }, []);

  console.log("loadData ->", myPostList);

  return (
    <>
      <h1 className="text-2xl text-white text-center p-8 font-bold">My Page</h1>
      {session ? (
        <div className="container text-white text-center justify-center my-8 max-w-sm mx-auto">
          <img
            src={
              addedSession?.profileImgUrl
                ? `${storageUrl}/${addedSession?.profileImgUrl}`
                : defaultImg
            }
            alt="profileImg"
            className="w-[100px] h-[100px] rounded-full inline-block mb-4"
          />
          <p className="mx-1 text-md text-white ">{addedSession?.nickname}</p>
          <SignOut />
        </div>
      ) : (
        <div className="text-white text-center flex justify-center my-8">
          <SignIn />
          <SignUp />
        </div>
      )}

      {myPostList?.map((item, index) => (
        <Link key={item.id} to={`/details/${item.id}`}>
          <div className="container mb-6 flex flex-col py-4 space-y-4 justify-center bg-white rounded-xl ">
            <div className="flex">
              <div className="flex-none text-base p-2 mx-2">{index + 1}</div>
              <div className="flex-none text-base p-2 max-w-sm mx-auto ml-2">{item.title}</div>
              <div className="flex-none text-base p-2 max-w-sm mx-auto ml-2 text-red-600">
                {item.userId}
              </div>
              <div className="flex-none text-base p-2 max-w-sm mx-4">
                {item.category ? item.category.name : "Unknown Category"}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
};

export default MyPage;
