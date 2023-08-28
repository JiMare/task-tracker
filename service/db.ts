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

export const recordTime = async (taskId: number, newTime: string) => {
  const { error } = await supabase
    .from("tasks")
    .update({ time: newTime })
    .eq("id", taskId);

  if (error) {
    throw error;
  }
};
