import { supabase } from "api/supabaseClient";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Tables } from "types/supabase";

import useSessionStore from "components/zustand/store";
import { SignIn, SignOut, SignUp } from "components/auth";
import defaultImg from "assets/defaultImg.png";
import Button from "components/button/Button";

const MyPage = () => {
  // 게시글 제목, 어디서 작성했는지 해당 카테고리 값 불러오기
  // 내가 쓴 게시글만 불러오기
  // 클릭해서 디테일 자세히 보기
  // 삭제 버튼 추가

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

  const handleDeleteButtonClick = async (postId: string) => {
    try {
      await supabase.from("posts").delete().eq("id", postId);

      alert("삭제 완료");
      window.location.reload();
    } catch (error) {
      alert("데이터를 삭제 실패");
    }
  };

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
        <div key={item.id}>
          <div className="container mb-6 flex flex-col py-4 space-y-4 justify-center bg-white rounded-xl ">
            <div className="flex">
              <div className="flex-none text-base p-2 mx-2">{index + 1}</div>
              <div className="flex-none text-base p-2 max-w-sm mx-auto ml-2">
                <Link to={`/details/${item.id}`} className="cursor-pointer">
                  {item.title}
                </Link>
              </div>
              <div className="flex-none text-base p-2 max-w-sm mx-4 px-4 font-bold">
                {item.category ? item.category.name : "Unknown Category"}
              </div>
              <div className="flex-none text-base p-2 max-w-sm mr-4">Likes {item.likes}</div>
              <button
                className="bg-primary px-6 text-white rounded-xl mr-2"
                onClick={() => handleDeleteButtonClick(item.id)}
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default MyPage;
