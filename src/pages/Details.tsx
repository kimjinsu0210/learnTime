import { supabase } from "api/supabaseClient";
import { DeleteIcon, UpdateIcon } from "assets";
import Button from "components/button/Button";
import { useDialog } from "components/overlay/dialog/Dialog.hooks";
import { getComments, getDetailData } from "components/posts/api";
import useSessionStore from "components/zustand/store";
import useInput from "hooks/useInput";
import { FormEvent, useEffect, useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router";

const Details = () => {
  const session = useSessionStore(state => state.session);
  const [comment, handleComment, setComment] = useInput();
  const params = useParams();

  const queryClient = useQueryClient();
  const { Alert, Confirm } = useDialog();
  const [likeState, setLikeState] = useState<Boolean>(false);

  const { data: postDetailData, isLoading: postIsLoading } = useQuery({
    queryKey: ["detail", params.id],
    queryFn: () => getDetailData(params.id)
  });

  const { data: commentsData, isLoading: commentsIsLoading } = useQuery({
    queryKey: ["comments", params.id],
    queryFn: () => getComments(params.id)
  });

  const { mutate: postMutate } = useMutation({
    mutationFn: async () => {
      await supabase
        .from("comments")
        .insert({ contents: comment, postId: params.id, userId: session?.user.id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["comments"]);
    }
  });

  const { mutate: deleteMutate } = useMutation({
    mutationFn: async (commentId: string) => {
      await supabase.from("comments").delete().eq("id", commentId);
    },
    onSuccess: async () => {
      await Alert("댓글이 삭제되었습니다.");
      queryClient.invalidateQueries(["comments"]);
    }
  });

  type SubmitComment = (e: FormEvent<HTMLFormElement>) => void;
  const handleSubmitComment: SubmitComment = e => {
    e.preventDefault();
    postMutate();
    setComment("");
  };

  type DeleteComment = (commentId: string) => void;
  const handleCommentDelete: DeleteComment = async commentId => {
    if (!(await Confirm("댓글을 삭제하시겠습니까?"))) {
      return;
    }
    deleteMutate(commentId);
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data: selectData } = await supabase
        .from("likes")
        .select()
        .eq("userId", session?.user.id)
        .eq("postId", params.id);
      if (selectData?.length === 0) {
        setLikeState(false);
      } else {
        setLikeState(true);
      }
    };
    fetchData();
  }, [session, params]);

  const likeClickHandler = async () => {
    if (session) {
      if (!likeState) {
        const { error: insertError } = await supabase
          .from("likes")
          .insert({ userId: session.user.id, postId: params.id });
        console.log("insertError", insertError);
        setLikeState(true);
      } else {
        await supabase.from("likes").delete().eq("userId", session.user.id).eq("postId", params.id);
        setLikeState(false);
      }
    } else {
      return Alert("좋아요 기능은 로그인 후 이용 가능합니다. ");
    }
  };

  if (postIsLoading || !postDetailData || commentsIsLoading || !commentsData)
    return <div>Loading...</div>;

  return (
    <div>
      <div className="flex flex-col max-w-3xl gap-5 p-6 mx-auto my-10 bg-gray-200 rounded-lg">
        <div className="flex items-center gap-5">
          <div className="flex items-center justify-center w-16 h-16 rounded-full">
            <img
              src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}/${postDetailData.users?.profileImgUrl}`}
              alt={`${postDetailData.users?.profileImgUrl}`}
            />
          </div>
          <div>{postDetailData.users?.nickname}</div>
        </div>
        <h3>{postDetailData.title}</h3>
        <a href={`${postDetailData.link}`}>{postDetailData.link}</a>
        <p>{postDetailData.contents}</p>
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
        {commentsData.length === 0 && (
          <div className="text-gray-500 text-center">댓글이 없습니다.</div>
        )}
        {commentsData.map(comment => (
          <li key={comment.id} className="flex items-center gap-3 text-white">
            <div className="flex items-center justify-center w-8 h-8 bg-black overflow-hidden rounded-full">
              <img
                src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}/${comment.users?.profileImgUrl}`}
                alt={`${comment.users?.nickname}`}
              />
            </div>
            <div className="flex w-full gap-10 pb-1 border-b border-white">
              <div>{comment.users?.nickname}</div>
              <p>{comment.contents}</p>
            </div>
            {session?.user.id === comment.users?.id && (
              <div className="flex gap-2 absolute right-0 -translate-x-full">
                <UpdateIcon className="w-5 cursor-pointer stroke-white fill-white" />
                <DeleteIcon
                  className="w-5 cursor-pointer stroke-white fill-white"
                  onClick={() => handleCommentDelete(comment.id)}
                />
              </div>
            )}
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
