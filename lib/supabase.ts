import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
export const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_KEY!);

export const saveUser = async (address: string, twitter: string) => {
  await supabase.from("twitter_auth").insert({ address, twitter });
};

export const setUserPrivyAddress = async (twitter: string, privyAddress: string) => {
  await supabase.from("twitter_auth").update({ privyAddress }).match({ twitter });
};

export const getUser = async (params: { twitter?: string; address?: string }) => {
  const { data, error } = await supabase.from("twitter_auth").select("*").match(params);
  if (error) {
    throw error;
  }
  return data[0];
};
