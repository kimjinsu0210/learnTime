import { supabase } from "api/supabaseClient";
import Button from "components/button/Button";
import { getComments, getDetailData } from "components/posts/api";
import useSessionStore from "components/zustand/store";
import useInput from "hooks/useInput";
import { FormEvent } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router";

const Details = () => {
  const [comment, handleComment, setComment] = useInput();
  const params = useParams();
  const session = useSessionStore(state => state.session);
  const queryClient = useQueryClient();

  const { data: postDetailData, isLoading: postIsLoading } = useQuery({
    queryKey: ["detail", params.id],
    queryFn: () => getDetailData(params.id)
  });

  const { data: commentsData, isLoading: commentsIsLoading } = useQuery({
    queryKey: ["comments", params.id],
    queryFn: () => getComments(params.id)
  });

  const { mutate } = useMutation({
    mutationFn: async () => {
      await supabase
        .from("comments")
        .insert({ contents: comment, postId: params.id, userId: session?.user.id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["comments"]);
    }
  });

  type SubmitComment = (e: FormEvent<HTMLFormElement>) => void;
  const handleSubmitComment: SubmitComment = e => {
    e.preventDefault();
    mutate();
    setComment("");
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
        <a href={postDetailData.link}>{postDetailData.link}</a>
        <p>{postDetailData.contents}</p>
        <Button className="px-4 py-2 w-20 self-center m-1 w rounded-3xl transition duration-300 shadow-md text-white text-sm bg-primary hover:bg-opacity-70">
          추천 {postDetailData.likes}
        </Button>
      </div>
      <ul className="flex flex-col max-w-3xl gap-4 mx-auto">
        {commentsData.length === 0 && <div>댓글이 없습니다.</div>}
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
