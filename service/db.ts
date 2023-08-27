import supabase from "./supabase";

export const getTasks = async () => {
  const { data } = await supabase.from("tasks").select("*");
  return data;
};

export const addTask = async (name: string) => {
  const { data, error } = await supabase
    .from("tasks")
    .insert({ name, time: "00:00" })
    .select("*");

  if (error) {
    throw error;
  }
  return data;
};
