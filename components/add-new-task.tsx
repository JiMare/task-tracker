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
import { Task } from "@/types";
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
      onAdd((prev) => [...response, ...prev]);
    });
  };

  return (
    <>
      <Button color="secondary" variant="bordered" onClick={onOpen}>
        Add new task
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
                    color="secondary"
                    variant="bordered"
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
