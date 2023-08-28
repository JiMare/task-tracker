import React, { useEffect, useState } from "react";
import { Task } from "./task-table";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { formatTime } from "@/utils/formatTime";
import { getNewTime } from "@/utils/getNewTime";
import { getTasks, recordTime } from "@/service/db";

type Props = {
  task: Task;
  isOpen: boolean;
  onOpenChange: () => void;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

export const TrackingModal: React.FC<Props> = ({
  task,
  isOpen,
  onOpenChange,
  setTasks,
}) => {
  const [isTracking, setIsTracking] = useState(true);
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  const reset = () => {
    setElapsedTime(0);
    setIsTracking(true);
  };

  useEffect(() => {
    if (isOpen) reset();
  }, [isOpen]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isTracking) {
      interval = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isTracking]);

  const onRecord = () => {
    recordTime(task.id, getNewTime(task.time, elapsedTime));
    getTasks().then((response) => response && setTasks(response));
  };

  return (
    <Modal
      isOpen={isOpen}
      backdrop="blur"
      onOpenChange={onOpenChange}
      isDismissable={false}
      hideCloseButton
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {task.name} {isTracking}
            </ModalHeader>
            <ModalBody>
              start: {new Date().getTime()}
              <h1>{formatTime(elapsedTime)}</h1>
              <Button
                color="secondary"
                variant="flat"
                onClick={() => setIsTracking(false)}
              >
                Stop
              </Button>
            </ModalBody>
            <ModalFooter>
              {!isTracking && (
                <>
                  <Button color="danger" onClick={onClose}>
                    Dismiss
                  </Button>
                  <Button
                    color="success"
                    onClick={() => {
                      onRecord();
                      onClose();
                    }}
                  >
                    Record
                  </Button>
                </>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
