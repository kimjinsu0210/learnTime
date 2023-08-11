import { getCategoryDetail } from "api/supabaseDatabaseFn";
import CategoryDetail from "components/categoryDetail/CategoryDetail";
import PostListByCategory from "components/posts/PostListByCategory";
import { useQuery } from "react-query";
import { useParams } from "react-router";

const Category = () => {
  const param = useParams();
  const paramCategoryName = param.category;

  const useFetchCategory = () => {
    return useQuery({
      queryKey: "category",
      queryFn: () => getCategoryDetail(paramCategoryName),
      refetchOnWindowFocus: false
    });
  };

  const { data: categoryData, error, isLoading } = useFetchCategory();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>error</div>;

  const test = categoryData?.uid;

  return (
    <main className="py-10 min-height-calc">
      <CategoryDetail categoryData={categoryData} />
      <PostListByCategory />
    </main>
  );
};

export default Category;
