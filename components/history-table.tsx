"use client";

import { getHistoryTasks } from "@/service/db";
import React, { useEffect, useMemo, useState } from "react";
import { Task } from "@/types";
import _ from "lodash";
import { getDate, getDayOfWeek } from "@/utils/getDate";
import {
  Chip,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/react";

const columns = [
  { name: "Task name", uid: "name" },
  { name: "Recorded time", uid: "time" },
  { name: "Actions", uid: "actions" },
];

const dayColorMap: Record<string, string> = {
  Sunday: "bg-amber-200",
  Monday: "bg-red-500",
  Tuesday: "bg-sky-700",
  Wednesday: "bg-cyan-300",
  Thursday: "bg-amber-700",
  Friday: "bg-green-600",
  Saturday: "bg-fuchsia-600",
};

export const HistoryTable = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const getGroupedTasks = useMemo(() => {
    return _.groupBy(tasks, (task) => getDate(task.created).formattedDate);
  }, [tasks]);

  useEffect(() => {
    getHistoryTasks().then((response) => response && setTasks(response));
  }, []);

  const renderCell = React.useCallback(
    (task: Task, columnKey: React.Key) => {
      const cellValue = task[columnKey as keyof Task];
      switch (columnKey) {
        case "name":
          return <span>{task.name}</span>;
        case "time":
          return <span>{task.time}</span>;
        default:
          return cellValue;
      }
    },
    [tasks]
  );

  return (
    <div className="flex flex-wrap gap-2">
      {Object.entries(getGroupedTasks).map(([date, tasks]) => (
        <div key={date}>
          <div className="mb-2">
            <Chip
              variant="flat"
              classNames={{
                base: dayColorMap[getDayOfWeek(date)],
                content: "drop-shadow shadow-black text-black",
              }}
            >
              {getDayOfWeek(date)} - {date}
            </Chip>
          </div>
          <Table aria-label="Example table with custom cells">
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn
                  key={column.uid}
                  align={column.uid === "actions" ? "center" : "start"}
                >
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody emptyContent={"No rows to display."} items={tasks}>
              {(item) => (
                <TableRow key={item.id}>
                  {(columnKey) => (
                    <TableCell>{renderCell(item, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      ))}
    </div>
  );
};
