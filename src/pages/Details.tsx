import { supabase } from "api/supabaseClient";
import Button from "components/button/Button";
import { getDetailData } from "components/posts/api";
import useInput from "hooks/useInput";
import { FormEvent } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router";

const COMMENTS = [
  { id: "aa", contents: "asdf", createdAt: "20231210", postId: "31231", userId: "aseff" },
  { id: "aab", contents: "asdsdsf", createdAt: "20231211", postId: "31231", userId: "asefdf" },
  { id: "abc", contents: "asdhjf", createdAt: "20231211", postId: "31231", userId: "agerh" }
];

const Details = () => {
  const [comment, handleComment, setComment] = useInput();
  const params = useParams();

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

  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      <div className="flex flex-col max-w-3xl gap-5 p-6 mx-auto my-10 bg-gray-200 rounded-lg">
        <div className="flex items-center gap-5">
          <div className="flex items-center justify-center w-16 h-16 rounded-full">
            <img
              src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}/${data?.users?.profileImgUrl}`}
              alt={`${data?.users?.profileImgUrl}`}
            />
          </div>
          <div>{data?.users?.nickname}</div>
        </div>
        <h3>{data?.title}</h3>
        <a href={`${data?.link}`}>{data?.link}</a>
        <p>{data?.contents}</p>
        <Button className="self-center w-20 px-4 py-2 m-1 text-sm text-white transition duration-300 shadow-md w rounded-3xl bg-primary hover:bg-opacity-70">
          추천 {data?.likes}
        </Button>
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
