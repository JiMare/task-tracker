"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Chip,
  useDisclosure,
} from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { getDate } from "@/utils/getDate";
import { TrackingModal } from "./tracking-modal";
import { AddNewTask } from "./add-new-task";
import { getTasks } from "@/service/db";

export type Task = {
  id: number;
  name: string;
  created: string;
  time: string;
};

const dayColorMap: Record<string, string> = {
  Sunday: "bg-amber-200",
  Monday: "bg-red-500",
  Tuesday: "bg-sky-700",
  Wednesday: "bg-cyan-300",
  Thursday: "bg-amber-700",
  Friday: "bg-green-600",
  Saturday: "bg-fuchsia-600",
};

const columns = [
  { name: "Task name", uid: "name" },
  { name: "Date", uid: "date" },
  { name: "Recorded time", uid: "time" },
  { name: "Time-tracking", uid: "tracking" },
  { name: "Actions", uid: "actions" },
];

export const TaskTable: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [trackingTask, setTrackingTask] = useState<number | null>(null);

  console.log(tasks)

  useEffect(() => {
    getTasks().then((response) => response && setTasks(response));
  }, []);

  const onOpenTrackingModal = (id: number) => {
    setTrackingTask(id);
    onOpen();
  };

  const renderCell = React.useCallback(
    (task: Task, columnKey: React.Key) => {
      const cellValue = task[columnKey as keyof Task];

      switch (columnKey) {
        case "name":
          return <span>{task.name}</span>;
        case "date":
          return (
            <Chip
              variant="flat"
              classNames={{
                base: dayColorMap[getDate(task.created).dayOfWeek],
                content: "drop-shadow shadow-black text-black",
              }}
            >
              {getDate(task.created).dayOfWeek} -{" "}
              {getDate(task.created).formattedDate}
            </Chip>
          );
        case "time":
          return <span>{task.time}</span>;
        case "tracking":
          return (
            <Button
              color="secondary"
              onClick={() => onOpenTrackingModal(task.id)}
            >
              Start
            </Button>
          );

        default:
          return cellValue;
      }
    },
    [tasks]
  );

  return (
    <>
      <div className="flex justify-end mb-5">
        <AddNewTask onAdd={setTasks} />
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
        <TableBody emptyContent={"No rows to display."} items={tasks.reverse()}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      {tasks.find((task) => task.id === trackingTask) && (
        <TrackingModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          task={tasks.find((task) => task.id === trackingTask)!}
        />
      )}
    </>
  );
};
