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
  return data;
};

export const addPost = async (newPost: Tables<"posts">) => {
  await supabase.from("posts").insert(newPost);
};

// {
//   title,
//   link,
//   contents,
//   categoryId,
//   userId: session?.user.id,
//   userEmail: session?.user.email,
// likes: 0
// }

// export type DbResult<T> = T extends PromiseLike<infer U> ? U : never;
// export type DbResultOk<T> = T extends PromiseLike<{ data: infer U }> ? Exclude<U, null> : never;
// export type DbResultErr = PostgrestError;

// const postType = supabase
//   .from("posts")
//   .select(`title, link, contents, categoryId, userId, userEmail, likes`);

// export const addPost = async (newPost: DbResult<typeof postType>) => {
//   await supabase.from("posts").insert(newPost);
// };
