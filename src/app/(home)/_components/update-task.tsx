"use client";

import React from "react";
import z from "zod";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { updateTask } from "../actions";

import TaskForm, { schema } from "./task-form";
import { Task } from "@prisma/client";
import { PencilIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

type UpdateTaskProps = {
  task: Task;
};

export default function UpdateTask(props: UpdateTaskProps) {
  const [open, setOpen] = React.useState(false);

  const { toast } = useToast();
  const { user } = useUser();

  const router = useRouter();

  async function handleSubmit(values: z.infer<typeof schema>) {
    if (!user) {
      throw new Error("User not defined");
    }

    const task = await updateTask({ ...props.task, ...values });

    toast({
      title: "Update was successful",
      description: `${task.title} has been updated`,
    });

    router.refresh();
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="ghost" className="hidden sm:flex">
          <PencilIcon className="mr-2 h-4 w-4" /> Update
        </Button>
      </DialogTrigger>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost" className="flex sm:hidden">
          <PencilIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Task</DialogTitle>
          <DialogDescription>Fill in the following fields</DialogDescription>
        </DialogHeader>

        <TaskForm onSubmit={handleSubmit} task={props.task} />
      </DialogContent>
    </Dialog>
  );
}
