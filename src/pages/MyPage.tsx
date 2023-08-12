import { supabase } from "api/supabaseClient";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Tables } from "types/supabase";

import useSessionStore from "components/zustand/store";
import { SignIn, SignOut, SignUp } from "components/auth";
import defaultImg from "assets/defaultImg.png";
import Button from "components/button/Button";

import { useDialog } from "components/overlay/dialog/Dialog.hooks";

const MyPage = () => {
  const session = useSessionStore(state => state.session);
  // const setSession = useSessionStore(state => state.setSession);
  const storageUrl = process.env.REACT_APP_SUPABASE_STORAGE_URL;
  const addedSession = session?.user.user_metadata;

  const { Alert } = useDialog();

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
  }, [session]);

  // useEffect(() => {
  //   supabase.auth.getSession().then(({ data: { session } }) => {
  //     setSession(session);
  //   });
  //   supabase.auth.onAuthStateChange((_event, session) => {
  //     setSession(session);
  //   });
  // }, [setSession]);

  console.log("session data ->", session);

  const handleDeleteButtonClick = async (postId: string) => {
    try {
      await supabase.from("posts").delete().eq("id", postId);

      Alert("삭제 완료");
      loadMyPosts();
    } catch (error) {
      Alert("게시글 삭제 중 오류 발생");
    }
  };

  console.log("loadData ->", myPostList);

  return (
    <div className="min-height-calc ">
      <h1 className="p-8 text-2xl font-bold text-center text-white">My Page</h1>
      {session ? (
        <div className="container justify-center max-w-sm mx-auto my-8 text-center text-white">
          <img
            src={
              addedSession?.profileImgUrl
                ? `${storageUrl}/${addedSession?.profileImgUrl}`
                : defaultImg
            }
            alt="profileImg"
            className="w-[100px] h-[100px] rounded-full inline-block mb-4"
          />
          <p className="mb-4 text-xl text-white text-md ">{addedSession?.nickname}</p>
          <Button>
            <SignOut />
          </Button>
        </div>
      ) : (
        <div className="flex justify-center my-8 text-center text-white">
          <SignIn />
          <SignUp />
        </div>
      )}

      {myPostList?.map((item, index) => (
        <div key={item.id}>
          <div className="container flex flex-col justify-center max-w-3xl py-4 mb-5 space-y-4 bg-white rounded-xl ">
            <div className="flex">
              <div className="flex-none p-2 mx-2 text-base">{index + 1}</div>
              <div className="flex-none max-w-sm p-2 mx-auto ml-2 text-base">
                <Link to={`/details/${item.id}`} className="cursor-pointer">
                  {item.title}
                </Link>
              </div>
              <div className="flex-none max-w-sm p-2 px-4 mx-4 text-base font-bold">
                {item.category ? item.category.name : "Unknown Category"}
              </div>
              <div className="flex-none max-w-sm p-2 mr-4 text-base">Likes {item.likes}</div>
              <div className="mr-3">
                <Button onClick={() => handleDeleteButtonClick(item.id)}>삭제</Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyPage;
