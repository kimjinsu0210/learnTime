import { Tables } from "types/supabase";

interface Props {
  categoryData: Tables<"category">[] | undefined;
}

export default function CategoryDetail({ categoryData }: Props) {
  return (
    <div className="max-w-3xl p-6 mx-auto bg-gray-200 rounded-lg">
      {categoryData?.map(data => (
        <div key={data.uid}>
          <h2 className="mb-4 text-2xl">{data.name}</h2>
          <a href={`${data.link}`} target="_blank" rel="noreferrer">
            <div className="flex bg-white rounded h-36">
              <div className="flex-auto px-4 py-5">
                <h3 className="mb-2 text-lg font-bold text-ellipsis line-clamp-1">
                  {data.ogTitle}
                </h3>
                <p className="text-sm text-gray-500 whitespace-normal text-ellipsis line-clamp-3">
                  {data.ogDescription}
                </p>
              </div>
              {data.ogImgUrl && (
                <img className="flex-initial w-64" src={data.ogImgUrl} alt={data.name} />
              )}
            </div>
          </a>
        </div>
      ))}
    </div>
  );
}
