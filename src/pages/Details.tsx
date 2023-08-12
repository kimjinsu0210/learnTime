import { supabase } from "api/supabaseClient";
import { DeleteIcon, UpdateIcon } from "assets";
import Button from "components/button/Button";
import { useDialog } from "components/overlay/dialog/Dialog.hooks";
import { getComments, getDetailData } from "components/posts/api";
import useSessionStore from "components/zustand/store";
import useInput from "hooks/useInput";
import { FormEvent, useEffect, useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { TiArrowBack } from "react-icons/ti";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router";
import defaultImg from "assets/defaultImg.png";

interface Props {
  commentId: string;
  contents: string;
}

const Details = () => {
  const session = useSessionStore(state => state.session);
  const [comment, handleComment, setComment] = useInput();
  const params = useParams();

  const queryClient = useQueryClient();
  const { Alert, Confirm } = useDialog();
  const [likeState, setLikeState] = useState<Boolean>(false);
  const [postLikes, setPostLikes] = useState<number | null>(null);
  const [isUpdate, setIsUpdate] = useState<string>("");
  const [contents, handleContents, setContents] = useInput();

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

  const { mutate: updateMutate } = useMutation({
    mutationFn: async ({ commentId, contents }: Props) => {
      await supabase.from("comments").update({ contents: contents }).eq("id", commentId);
    },
    onSuccess: async () => {
      queryClient.invalidateQueries(["comments"]);
      setIsUpdate("");
      setContents("");
      await Alert("댓글이 수정되었습니다.");
    }
  });

  type SubmitCommentUpdate = (e: FormEvent<HTMLFormElement>, commentId: string) => void;
  const handleSubmitUpdateComment: SubmitCommentUpdate = (e, commentId) => {
    e.preventDefault();
    updateMutate({ commentId, contents });
    setComment("");
  };

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

  type UpdateComment = (commentId: string) => void;
  const handleCommentUpdate: UpdateComment = commentId => {
    console.log(commentId);
    setIsUpdate(commentId);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (session) {
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
      }
      const { data } = await supabase.from("posts").select("likes").eq("id", params.id).single();

      if (data) {
        setPostLikes(data.likes);
      }
    };
    fetchData();
  }, [session, params, postLikes]);

  const likeClickHandler = async () => {
    if (session) {
      if (!likeState) {
        await supabase.from("likes").insert({ userId: session.user.id, postId: params.id });
        setLikeState(true);
      } else {
        await supabase.from("likes").delete().eq("userId", session.user.id).eq("postId", params.id);
        setLikeState(false);
      }
      postLikeCount();
    } else {
      return Alert("좋아요 기능은 로그인 후 이용 가능합니다. ");
    }
  };

  const postLikeCount = async () => {
    if (postLikes || postLikes === 0) {
      const newLikes = likeState ? postLikes - 1 : postLikes + 1;
      setPostLikes(newLikes);
      await supabase.from("posts").update({ likes: newLikes }).eq("id", params.id);
    }
  };

  if (postIsLoading || !postDetailData || commentsIsLoading || !commentsData)
    return <div>Loading...</div>;

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="min-height-calc">
      <div className="flex flex-col max-w-3xl gap-5 p-6 mx-auto my-10 bg-gray-200 rounded-lg">
        <div className="flex items-center gap-5">
          <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
            <img
              src={
                postDetailData.users?.profileImgUrl
                  ? `${process.env.REACT_APP_SUPABASE_STORAGE_URL}/${postDetailData.users?.profileImgUrl}`
                  : defaultImg
              }
              alt={`${postDetailData.users?.profileImgUrl}`}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="text-[18px]">{postDetailData.users?.nickname}</div>
        </div>
        <h3 className="font-bold text-[16px]">{postDetailData.title}</h3>
        <a
          className="text-blue-500 underline decoration-1 w-[fit-content]"
          href={`${postDetailData.link}`}
        >
          {postDetailData.link}
        </a>
        <p>{postDetailData.contents}</p>
        <div className="flex justify-between">
          <TiArrowBack
            className="text-[50px] cursor-pointer transition-transform transition-duration-300 active:scale-[.8] hover:scale-[1.1]"
            onClick={handleGoBack}
          />
          <div className="flex align-middle">
            {likeState ? (
              <AiFillLike
                className="text-primary text-[40px] cursor-pointer transition-transform transition-duration-300 active:scale-[.8] hover:scale-[1.1]"
                onClick={likeClickHandler}
              />
            ) : (
              <AiFillLike
                className="text-[#c0c0c0] text-[40px] cursor-pointer transition-transform transition-duration-300 active:scale-[.8] hover:scale-[1.1]"
                onClick={likeClickHandler}
              />
            )}
            <p className="text-[25px] ml-3 mt-1">{postLikes}</p>
          </div>
        </div>
      </div>
      <ul className="flex flex-col max-w-3xl gap-4 mx-auto">
        {commentsData.length === 0 && (
          <div className="text-center text-gray-500">댓글이 없습니다.</div>
        )}
        {commentsData.map(comment => (
          <li key={comment.id} className="flex flex-col text-white">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center overflow-hidden bg-black rounded-full w-7 h-7">
                <img
                  src={
                    comment.users?.profileImgUrl
                      ? `${process.env.REACT_APP_SUPABASE_STORAGE_URL}/${comment.users?.profileImgUrl}`
                      : defaultImg
                  }
                  alt={`${comment.users?.nickname}`}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex w-full gap-10 pb-1 border-b border-white">
                <div>{comment.users?.nickname}</div>
                <p>{comment.contents}</p>
              </div>
              {session?.user.id === comment.users?.id && (
                <div className="flex gap-2">
                  <UpdateIcon
                    onClick={() => handleCommentUpdate(comment.id)}
                    className="w-5 h-5 cursor-pointer stroke-white fill-white"
                  />
                  <DeleteIcon
                    className="w-5 h-5 cursor-pointer stroke-white fill-white"
                    onClick={() => handleCommentDelete(comment.id)}
                  />
                </div>
              )}
            </div>
            {isUpdate === comment.id && (
              <form
                onSubmit={e => handleSubmitUpdateComment(e, comment.id)}
                className="flex max-w-3xl gap-4 my-5"
              >
                <input
                  value={contents}
                  onChange={handleContents}
                  className="w-full px-4 m-1 text-white bg-black rounded-3xl"
                />
                <Button
                  type="submit"
                  className="self-center w-20 px-4 py-2 m-1 text-sm text-white transition duration-300 shadow-md min-w-fit w rounded-3xl bg-primary hover:bg-opacity-70"
                >
                  수정
                </Button>
                <Button
                  onClick={() => setIsUpdate("")}
                  className="self-center w-20 px-4 py-2 m-1 text-sm text-white transition duration-300 shadow-md min-w-fit w rounded-3xl bg-primary hover:bg-opacity-70"
                >
                  취소
                </Button>
              </form>
            )}
          </li>
        ))}
      </ul>
      {session ? (
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
      ) : (
        <div className="max-w-3xl mx-auto my-10 text-center text-gray-500">
          댓글 기능은 로그인 후 가능합니다.
        </div>
      )}
    </div>
  );
};

export default Details;
