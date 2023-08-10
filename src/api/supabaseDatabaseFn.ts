import { supabase } from "./supabaseClient";

export const getCategoryDetail = async (categoryName?: string) => {
  const { data, error } = await supabase.from("category").select().eq("name", categoryName);
  if (error) throw new Error(`에러!! ${error.message}`);
  return data;
};
