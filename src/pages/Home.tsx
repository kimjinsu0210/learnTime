import { supabase } from "api/supabaseClient";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/button/Button";

type Category = {
  id: number;
  name: string;
  linkTitle: string;
  link: string;
  order: number;
};

const Home = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    loadCategory();
  }, []);

  const loadCategory = async () => {
    let { data } = await supabase.from("category").select("*").order("order", { ascending: true });
    setCategories(data || []);
  };

  console.log("loadData->", categories);

  return (
    <div>
      {categories.map(item => (
        <div className="container py-4 flex justify-center">
          <div className="p-6 max-w-sm mx-auto bg-gray-200 text-black font-medium px-10 py-2 rounded-3xl shadow-md items-center  hover:bg-primary hover:text-white inline-block">
            <Link to={`/${item.name}`}>{item.name}</Link>
          </div>
        </div>
      ))}
      <Button>버튼 컴포넌트 예시</Button>
      <Button className="px-2 py-1 mx-2 my-2 bg-black text-yellow-400 text-xs">
        커스텀 버튼 예시
      </Button>
    </div>
  );
};

export default Home;
