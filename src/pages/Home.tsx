import { supabase } from "api/supabaseClient";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Tables } from "types/supabase";

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
          <div className="text-3xl p-6 max-w-sm mx-auto text-white font-semibold px-10 items-center hover:text-primary hover:font-extrabold transition-transform duration-300 transform hover:scale-110">
            <Link to={`/${item.name}`}>{item.name}</Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
