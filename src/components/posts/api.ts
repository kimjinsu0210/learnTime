import { supabase } from "api/supabaseClient";

export const fetchData = async () => {
  const { data } = await supabase.from("posts").select();
  return data;
};

export const getCategoryId = async (params: string | undefined) => {
  const { data } = await supabase.from("category").select("uid").eq("name", params).single();
  return data;
};

export const getComments = async (postId: string | undefined) => {
  const { data } = await supabase
    .from("comments")
    .select("id, contents, users(nickname, profileImgUrl)")
    .eq("postId", postId);
  return data;
};

export const getDetailData = async (postId: string | undefined) => {
  const { data } = await supabase
    .from("posts")
    .select("title, link, contents, likes, users(nickname, profileImgUrl)")
    .eq("id", postId)
    .single();
  return data;
};
