"use client";

import React from "react";
import { Task } from "@prisma/client";
import { Calendar } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { updateTask } from "../actions";
import { CheckedState } from "@radix-ui/react-checkbox";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

type TaskListProps = {
  tasks: Task[];
};

export default function TaskList(props: TaskListProps) {
  const router = useRouter();

  async function handleCheckedChange(checked: CheckedState, task: Task) {
    const updatedTask = { ...task, isResolved: !!checked };

    await updateTask(updatedTask);
    router.refresh();
  }

  return props.tasks
    .sort((a, b) => Number(a.isResolved) - Number(b.isResolved))
    .map((task) => (
      <div key={task.id} className="flex items-start p-2">
        <Checkbox
          className="my-2 mx-4"
          defaultChecked={task.isResolved}
          onCheckedChange={(checked) => handleCheckedChange(checked, task)}
        />
        <div
          className={cn("flex flex-col gap-1", {
            "line-through": task.isResolved,
          })}
        >
          <p className="font-medium">{task.title}</p>
          <p className="text-sm">{task.description}</p>
          <div className="flex gap-1 items-center">
            {task.dueDate && (
              <div className="text-sm flex items-center gap-1">
                <Calendar size={16} />
                <span>{task.dueDate.toDateString()}</span>
              </div>
            )}
            {task.isImportant && <Badge variant="outline">Important</Badge>}
            {task.isUrgent && <Badge variant="outline">Urgent</Badge>}
          </div>
        </div>
      </div>
    ));
}
