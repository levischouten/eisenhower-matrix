"use server";

import z from "zod";
import { schema } from "./_components/create-task";
import { PrismaClient, Task } from "@prisma/client";

export async function createTask(
  data: z.infer<typeof schema> & { userId: string }
) {
  const prisma = new PrismaClient();

  return await prisma.task.create({ data });
}

export async function updateTask(data: Task) {
  const prisma = new PrismaClient();

  return await prisma.task.update({
    where: {
      id: data.id,
    },
    data,
  });
}
