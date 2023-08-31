"use server";

import z from "zod";
import { Task } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { schema } from "./_components/task-form";

export async function createTask(
  data: z.infer<typeof schema> & { userId: string }
) {
  return await prisma.task.create({ data });
}

export async function updateTask(data: Task) {
  return await prisma.task.update({
    where: {
      id: data.id,
    },
    data,
  });
}

export async function deleteTask(taskId: number) {
  return await prisma.task.delete({
    where: {
      id: taskId,
    },
  });
}
