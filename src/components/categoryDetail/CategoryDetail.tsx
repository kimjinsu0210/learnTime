import React from "react";
import { supabase } from "api/supabaseClient";
import { useQuery } from "react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getCategoryDetail } from "api/supabaseDatabaseFn";
import { Tables } from "types/supabase";

interface Props {
  categoryData: Tables<"category">[] | undefined;
}

export default function CategoryDetail({ categoryData }: Props) {
  return (
    <div className="bg-gray-200 max-w-3xl mx-auto rounded-lg p-6">
      {categoryData?.map(data => (
        <div key={data.uid}>
          <h2 className="text-2xl mb-4">{data.name}</h2>
          <a href={`${data.link}`} target="_blank">
            <div className="h-36 flex bg-white rounded">
              <div className="flex-auto px-4 py-5">
                <h3 className="font-bold text-lg text-ellipsis line-clamp-1 mb-2">
                  {data.ogTitle}
                </h3>
                <p className="text-ellipsis line-clamp-3 whitespace-normal text-sm text-gray-500">
                  {data.ogDescription}
                </p>
              </div>
              {data.ogImgUrl && <img className="flex-initial w-64" src={data.ogImgUrl} />}
            </div>
          </a>
        </div>
      ))}
    </div>
  );
}
