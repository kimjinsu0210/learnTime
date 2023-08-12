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
  return (
    <div>
      {categories.map(item => (
        <div key={item.uid} className="container flex justify-center py-4">
          <div className="items-center max-w-sm p-6 px-10 mx-auto text-3xl font-semibold text-white transition-transform duration-300 transform hover:text-primary hover:font-extrabold hover:scale-110">
            <Link to={`/${item.name}`}>{item.name}</Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
