import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
export const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || "", process.env.NEXT_PUBLIC_SUPABASE_KEY || "");

export const saveUser = async (privyAddress: string, twitter: string) => {
  await supabase.from("twitter_auth").insert({ privyAddress, twitter });
};

export const setUserAddress = async (address: string, privyAddress: string) => {
  await supabase.from("twitter_auth").update({ address }).match({ privyAddress });
};
