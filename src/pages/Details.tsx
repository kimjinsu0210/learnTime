import { supabase } from "api/supabaseClient";
import Button from "components/button/Button";
import { useDialog } from "components/overlay/dialog/Dialog.hooks";
import { getDetailData } from "components/posts/api";
import useSessionStore from "components/zustand/store";
import useInput from "hooks/useInput";
import { FormEvent, useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import { AiFillLike } from "react-icons/ai";
import { async } from "q";
const COMMENTS = [
  { id: "aa", contents: "asdf", createdAt: "20231210", postId: "31231", userId: "aseff" },
  { id: "aab", contents: "asdsdsf", createdAt: "20231211", postId: "31231", userId: "asefdf" },
  { id: "abc", contents: "asdhjf", createdAt: "20231211", postId: "31231", userId: "agerh" }
];

const Details = () => {
  const session = useSessionStore(state => state.session);
  const [comment, handleComment, setComment] = useInput();
  const params = useParams();
  const { Alert } = useDialog();
  const [likeState, setLikeState] = useState<Boolean>(false);
  const { data, isLoading } = useQuery({
    queryKey: ["detail", params.id],
    queryFn: () => getDetailData(params.id)
  });

  type Comment = (e: FormEvent<HTMLFormElement>) => void;
  const handleSubmitComment: Comment = async e => {
    e.preventDefault();
    await supabase.from("comments").insert({ contents: comment, postId: params.id });
    setComment("");
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data: selectData } = await supabase
        .from("likes")
        .select()
        .eq("userId", session?.user.id);
      if (selectData?.length === 0) {
        setLikeState(false);
      } else {
        setLikeState(true);
      }
    };
    fetchData();
  }, [session]);

  const likeClickHandler = async () => {
    if (session) {
      if (!likeState) {
        const { error: insertError } = await supabase
          .from("likes")
          .insert({ userId: session.user.id, postId: params.id });
        console.log("insertError", insertError);
        setLikeState(true);
      } else {
        const { error } = await supabase.from("likes").delete().eq("userId", session.user.id);
        setLikeState(false);
      }
    } else {
      return Alert("좋아요 기능은 로그인 후 이용 가능합니다. ");
    }
  };
  if (isLoading || !data) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex flex-col max-w-3xl gap-5 p-6 mx-auto my-10 bg-gray-200 rounded-lg">
        <div className="flex items-center gap-5">
          <div className="flex items-center justify-center w-16 h-16 rounded-full">
            <img
              src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}/${data.users?.profileImgUrl}`}
              alt={`${data.users?.profileImgUrl}`}
            />
          </div>
          <div>{data.users?.nickname}</div>
        </div>
        <h3>{data.title}</h3>
        <a href={`${data.link}`}>{data.link}</a>
        <p>{data.contents}</p>
        {likeState ? (
          <AiFillLike
            className="text-primary text-[50px] cursor-pointer transition-transform transition-duration-300 active:scale-[.8]"
            onClick={likeClickHandler}
          />
        ) : (
          <AiFillLike
            className="text-[#c0c0c0] text-[50px] cursor-pointer transition-transform transition-duration-300 active:scale-[.8]"
            onClick={likeClickHandler}
          />
        )}
      </div>
      <ul className="flex flex-col max-w-3xl gap-4 mx-auto">
        {COMMENTS.map(comment => (
          <li key={comment.id} className="flex items-center gap-3 text-white">
            <div className="flex items-center justify-center w-8 h-8 bg-yellow-200 rounded-full">
              <img alt="" />
            </div>
            <div className="flex w-full gap-10 pb-1 border-b border-white">
              <div>닉네임</div>
              <p>{comment.contents}</p>
            </div>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmitComment} className="flex max-w-3xl gap-4 mx-auto my-10">
        <input
          value={comment}
          onChange={handleComment}
          className="w-full px-4 m-1 text-white bg-black rounded-3xl"
        />
        <Button
          type="submit"
          className="self-center w-20 px-4 py-2 m-1 text-sm text-white transition duration-300 shadow-md min-w-fit w rounded-3xl bg-primary hover:bg-opacity-70"
        >
          입력
        </Button>
      </form>
    </div>
  );
};

export default Details;
