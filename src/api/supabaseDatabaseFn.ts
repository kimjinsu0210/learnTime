import { Tables } from "types/supabase";
import { supabase } from "./supabaseClient";

export const getCategoryDetail = async (categoryName?: string) => {
  const { data, error } = await supabase
    .from("category")
    .select("*")
    .eq("name", categoryName)
    .single();
  if (error) throw new Error(`에러!! ${error.message}`);
  return data;
};

export const getCategory = async (categoryName?: string) => {
  const { data } = await supabase
    .from("category")
    .select(
      "uid, posts(id, categoryId, title, contents, link, likes, users(nickname, profileImgUrl))"
    )
    .eq("name", categoryName)
    .single();

  if (data && data.posts) {
    data.posts.sort((a: any, b: any) => b.likes - a.likes);
  }
  return data;
};

export const addPost = async (newPost: Tables<"posts">) => {
  await supabase.from("posts").insert(newPost);
};
