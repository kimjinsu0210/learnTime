import Button from "components/button/Button";
import { useModal } from "components/overlay/modal/Modal.hooks";
import PostForm from "components/posts/PostForm";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import { getCategoryId } from "./api";
import { getPostsByCategory } from "api/supabaseDatabaseFn";
import { Link } from "react-router-dom";

export default function PostListByCategory() {
  const { mount } = useModal();
  const param = useParams();
  const paramCategoryName = param.category;

  const { data: categoryId } = useQuery({
    queryKey: ["categoryId", paramCategoryName],
    queryFn: () => getCategoryId(paramCategoryName)
  });

  console.log(categoryId?.uid);

  const useFetchPosts = () => {
    return useQuery({
      queryKey: "postByCategory",
      queryFn: () => getPostsByCategory(categoryId?.uid),
      refetchOnWindowFocus: false
    });
  };
  const { data: PostData, error, isLoading } = useFetchPosts();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>error</div>;

  console.log(PostData);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-right mt-10 mb-5">
        <Button onClick={() => mount("post", <PostForm categoryId={categoryId?.uid} />)}>
          강의 노트 공유하기
        </Button>
      </div>
      <div className="bg-mainDark1 rounded-lg p-6">
        <h3 className="mb-4 text-white text-xl">같이 공부!</h3>
        <ul className="bg-white rounded-lg">
          {PostData?.map(post => {
            return (
              <li className="grid grid-cols-12 p-2 border-b border-gray-300 last:border-0">
                <div className="col-span-3 flex">
                  <img
                    className="inline-block h-6 w-6 rounded-full ring-1 mr-2"
                    src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}/${post?.users?.profileImgUrl}`}
                    alt={`${post?.users?.nickname} 프로필 이미지`}
                  />
                  <p className="text-ellipsis line-clamp-1">{post.users?.nickname}</p>
                </div>
                <p className="col-span-7 text-ellipsis line-clamp-1 hover:text-primary">
                  <Link to={`details/${post.id}`}>{post.title}</Link>
                </p>
                <p className="col-span-2 text-center text-gray-600">추천수 {post.likes ?? `0`}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
