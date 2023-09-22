import { subtitle, title } from "@/components/primitives";
import { ThemeSwitch } from "@/components/theme-switch";
import { TaskTable } from "@/components/task-table";
import { HistoryTable } from "@/components/history-table";

export default function Home() {
  return (
    <>
      <div className="flex justify-between mb-10">
        <h1 className={title()}>Task tracker</h1>
        <ThemeSwitch />
      </div>
      <TaskTable />
      <h2 className={subtitle()}>Tasks history</h2>
      <HistoryTable />
    </>
  );
}
