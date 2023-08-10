import { supabase } from "api/supabaseClient";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Tables } from "types/supabase";
import Button from "../components/button/Button";

const Home = () => {
  const [categories, setCategories] = useState<Tables<"category">[]>([]);
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
    </div>
  );
};

export default Home;
