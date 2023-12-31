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
import { createTask } from "../actions";

import TaskForm, { schema } from "./task-form";

export default function CreateTask() {
  const [open, setOpen] = React.useState(false);

  const { user } = useUser();

  const router = useRouter();

  async function handleSubmit(values: z.infer<typeof schema>) {
    if (!user) {
      throw new Error("User not defined");
    }

    await createTask({ ...values, userId: user.id });

    router.refresh();
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add task</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Task</DialogTitle>
          <DialogDescription>Fill in the following fields</DialogDescription>
        </DialogHeader>

        <TaskForm onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  );
}
