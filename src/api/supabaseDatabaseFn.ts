import { supabase } from "./supabaseClient";

export const getCategoryDetail = async (categoryName?: string) => {
  const { data, error } = await supabase.from("category").select().eq("name", categoryName);
  if (error) throw new Error(`에러!! ${error.message}`);
  return data;
};

export const getPostsByCategory = async (categoryId?: string) => {
  const { data, error } = await supabase
    .from("posts")
    .select("id, title, likes, users(nickname, profileImgUrl)")
    .eq("categoryId", categoryId);
  if (error) throw new Error(`에러!! ${error.message}`);
  return data;
};
