import React from "react";
import { supabase } from "api/supabaseClient";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { getCategoryDetail } from "api/supabaseDatabaseFn";

import type { CategoryType } from "type/category";

export default function CategoryDetail() {
  const param = useParams();
  const paramCategoryName = param.category;

  const useFetchCategory = () => {
    return useQuery<CategoryType[], Error>({
      queryKey: "category",
      queryFn: () => getCategoryDetail(paramCategoryName),
      refetchOnWindowFocus: false
    });
  };

  const { data: categoryData, error, isLoading } = useFetchCategory();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>error</div>;

  return (
    <div className="bg-gray-200 max-w-3xl mx-auto rounded-lg p-6">
      {categoryData?.map(data => (
        <div key={data.id}>
          <h2 className="text-2xl mb-4">{data.categoryName}</h2>
          <a href={`${data.link}`} target="_blank">
            <p>{data.linkTitle}</p>
          </a>
        </div>
      ))}
    </div>
  );
}
