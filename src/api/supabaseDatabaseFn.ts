import { supabase } from "./supabaseClient";

import type { CategoryType } from "type/category";

export const getCategoryDetail = async (categoryName?: string) => {
  const { data, error } = await supabase.from("category").select().eq("categoryName", categoryName);
  if (error) throw new Error(`에러!! ${error.message}`);
  return data as CategoryType[];
};
