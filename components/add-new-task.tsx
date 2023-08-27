import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { Task } from "./task-table";
import { getDate } from "@/utils/getDate";
import supabase from "@/service/supabase";
import { addTask } from "@/service/db";

type Props = {
  onAdd: React.Dispatch<React.SetStateAction<Task[]>>;
};

export const AddNewTask: React.FC<Props> = ({ onAdd }) => {
  const [name, setName] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    setName("");
  }, [isOpen]);

  const onAddTask = async () => {
    addTask(name).then((response) => {
      console.log(response);
      onAdd((prev) => [...prev, ...response]);
    });

    //addTask(name)
    //TODO odeslat na be a z odpovedi vzit id a cele uložit do stavu
    /*   const newTask = {
      id: 3,
      name: name,
      date: getDate().formattedDate,
      day: getDate().dayOfWeek,
      time: "00:00",
      isTracking: false,
    };
    onAdd((prev) => [newTask, ...prev]); */
  };

  return (
    <>
      <Button color="secondary" variant="bordered" onClick={onOpen}>
        Add new
      </Button>
      <Modal isOpen={isOpen} backdrop="blur" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add new task
              </ModalHeader>
              <ModalBody>
                <label>Task name</label>
                <Input type="text" value={name} onValueChange={setName} />
              </ModalBody>
              <ModalFooter>
                {name && (
                  <Button
                    onClick={() => {
                      onAddTask();
                      onClose();
                    }}
                  >
                    Add +
                  </Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
