"use server";

import z from "zod";
import { schema } from "./_components/create-task";
import { Task } from "@prisma/client";
import { prisma } from "@/lib/prisma";

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
