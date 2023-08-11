import Button from "components/button/Button";
import { useModal } from "components/overlay/modal/Modal.hooks";
import PostForm from "components/posts/PostForm";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import { getCategory } from "api/supabaseDatabaseFn";
import { Link } from "react-router-dom";

export default function PostListByCategory() {
  const { mount } = useModal();
  const param = useParams();
  const paramCategoryName = param.category;

  const useFetchPosts = () => {
    return useQuery({
      queryKey: ["getCategory", paramCategoryName],
      queryFn: () => getCategory(paramCategoryName)
    });
  };
  const { data: PostData, error, isLoading } = useFetchPosts();

  if (isLoading || !PostData) return <div>Loading...</div>;
  if (error) return <div>error</div>;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mt-10 mb-5 text-right">
        <Button onClick={() => mount("post", <PostForm categoryId={PostData?.uid} />)}>
          강의 노트 공유하기
        </Button>
      </div>
      <div className="p-6 rounded-lg bg-mainDark1">
        <h3 className="mb-4 text-xl text-white">같이 공부!</h3>
        {PostData.posts.length !== 0 ? (
          <ul className="bg-white rounded-lg">
            {PostData.posts.map(post => {
              return (
                <Link to={`/details/${post.id}`}>
                  <li className="grid grid-cols-12 p-2 transition duration-300 border-b border-gray-300 last:border-0 group hover:bg-[#c5c5c5] hover:rounded-lg cursor-pointer">
                    <div className="flex col-span-3">
                      <img
                        className="inline-block w-6 h-6 mr-2 rounded-full ring-1"
                        src={`${process.env.REACT_APP_SUPABASE_STORAGE_URL}/${post.users?.profileImgUrl}`}
                        alt={`${post.users?.nickname} 프로필 이미지`}
                      />
                      <p className="text-ellipsis line-clamp-1">{post.users?.nickname}</p>
                    </div>
                    <p className="col-span-7 text-ellipsis line-clamp-1">{post.title}</p>
                    <p className="col-span-2 text-center text-gray-600">
                      추천수 {post.likes ?? `0`}
                    </p>
                  </li>
                </Link>
              );
            })}
          </ul>
        ) : (
          <div className="px-3 py-2 bg-white rounded-lg">등록된 글이 없습니다.</div>
        )}
      </div>
    </div>
  );
}
