import { supabase } from "api/supabaseClient";

export const fetchData = async () => {
  const { data } = await supabase.from("POSTS").select();
  return data;
};
