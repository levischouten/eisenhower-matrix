"use client";

import React from "react";
import { Task } from "@prisma/client";
import { CalendarIcon, MoreVerticalIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { updateTask } from "../actions";
import { CheckedState } from "@radix-ui/react-checkbox";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";

import DeleteTask from "./delete-task";
import UpdateTask from "./update-task";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

type TaskItemProps = {
  task: Task;
};

function TaskItem(props: TaskItemProps) {
  const { task } = props;

  const [showMenu, setShowMenu] = React.useState(false);

  const router = useRouter();

  async function handleCheckedChange(checked: CheckedState, task: Task) {
    const updatedTask: Task = {
      ...task,
      isResolved: !!checked,
      resolvedAt: new Date(),
    };

    await updateTask(updatedTask);
    router.refresh();
  }

  return (
    <Card key={task.id} className="flex items-center py-2 px-4 gap-4 w-full">
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
            <div className="flex items-center">
              <DropdownMenu open={showMenu} onOpenChange={setShowMenu}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost">
                    <MoreVerticalIcon className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <UpdateTask task={task} />
                  <DeleteTask task={task} />
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
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
  );
}

type TaskListProps = {
  tasks: Task[];
};

export default function TaskList(props: TaskListProps) {
  if (props.tasks.length === 0) {
    return <p className="text-sm p-2">No tasks found.</p>;
  }

  return (
    <div className="flex flex-col gap-2 overflow-auto flex-1 pb-safe pt-safe">
      {props.tasks
        .sort((a, b) => Number(a.isResolved) - Number(b.isResolved))
        .map((task) => (
          <TaskItem task={task} key={task.id} />
        ))}
    </div>
  );
}
