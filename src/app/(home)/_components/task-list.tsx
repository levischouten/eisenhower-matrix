"use client";

import React from "react";
import { Task } from "@prisma/client";
import { CalendarIcon, Trash2Icon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { deleteTask, updateTask } from "../actions";
import { CheckedState } from "@radix-ui/react-checkbox";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";

type TaskListProps = {
  tasks: Task[];
};

export default function TaskList(props: TaskListProps) {
  const router = useRouter();
  const { toast } = useToast();

  async function handleCheckedChange(checked: CheckedState, task: Task) {
    const updatedTask: Task = {
      ...task,
      isResolved: !!checked,
      resolvedAt: new Date(),
    };

    await updateTask(updatedTask);
    router.refresh();
  }

  async function handleClickEvent(taskId: number) {
    const task = await deleteTask(taskId);

    toast({
      title: "Delete was successful",
      description: `${task.title} has been deleted`,
    });

    router.refresh();
  }

  if (props.tasks.length === 0) {
    return <p className="text-sm p-2">No tasks found.</p>;
  }

  return (
    <div className="flex flex-col gap-2">
      {props.tasks
        .sort((a, b) => Number(a.isResolved) - Number(b.isResolved))
        .map((task) => (
          <Card
            key={task.id}
            className="flex items-center py-2 px-4 gap-4 w-full"
          >
            <Checkbox
              defaultChecked={task.isResolved}
              onCheckedChange={(checked) => handleCheckedChange(checked, task)}
            />
            <div
              className={cn("flex flex-col gap-2 flex-1", {
                "line-through": task.isResolved,
              })}
            >
              <div className="flex flex-col">
                <div className="flex justify-between items-center">
                  <p className="font-medium">{task.title}</p>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="hidden sm:flex"
                      >
                        <Trash2Icon className="mr-2 h-4 w-4" /> Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogTrigger asChild>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="flex sm:hidden"
                      >
                        <Trash2Icon className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>

                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete this task.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleClickEvent(task.id)}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
                <p className="text-sm">{task.description}</p>
              </div>

              <div className="flex gap-2 items-center">
                {task.dueDate && (
                  <div className="text-sm flex items-center gap-1">
                    <CalendarIcon className="h-4 w-4" />
                    <span>{task.dueDate.toDateString()}</span>
                  </div>
                )}
                {task.isImportant && <Badge variant="outline">Important</Badge>}
                {task.isUrgent && <Badge variant="outline">Urgent</Badge>}
              </div>
            </div>
          </Card>
        ))}
    </div>
  );
}
