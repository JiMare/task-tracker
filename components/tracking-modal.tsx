import React, { useEffect, useState } from "react";
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
import { getTodaysTasks, recordTime } from "@/service/db";
import { DateTime } from "luxon";
import { Task } from "@/types";

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
  const [start, setStart] = useState(DateTime.now());

  const reset = () => {
    setElapsedTime(0);
    setIsTracking(true);
    setStart(DateTime.now());
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
    getTodaysTasks().then((response) => response && setTasks(response));
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
              Start tracking: {start.toFormat('HH:mm:ss')}
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
