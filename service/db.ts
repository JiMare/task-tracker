import supabase from "./supabase";
import { DateTime } from "luxon";

const today = DateTime.now().toISODate();

export const getTodaysTasks = async () => {
  const { data } = await supabase
    .from("tasks")
    .select("*")
    .gte("created", `${today}T00:00:00Z`)
    .lte("created", `${today}T23:59:59Z`)
    .order("created", { ascending: false });
  return data;
};

export const getHistoryTasks = async () => {
  const { data } = await supabase
    .from("tasks")
    .select("*")
    .order("created", { ascending: false });
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
