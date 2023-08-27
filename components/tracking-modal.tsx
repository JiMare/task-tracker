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

type Props = {
  task: Task;
  isOpen: boolean;
  onOpenChange: () => void;
};

export const TrackingModal: React.FC<Props> = ({
  task,
  isOpen,
  onOpenChange,
}) => {
  const [isTracking, setIsTracking] = useState(true);

  useEffect(() => {
    if (isOpen) setIsTracking(true);
  }, [isOpen]);

  const onRecord = () => {
    //TODO
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
