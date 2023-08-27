import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs";
import CreateTask from "./_components/create-task";
import TaskList from "./_components/task-list";

export default async function Home() {
  const { userId } = auth();

  const prisma = new PrismaClient();

  if (!userId) {
    throw new Error("User not defined");
  }

  const tasks = await prisma.task.findMany({
    where: {
      userId,
    },
    orderBy: [
      {
        id: "asc",
      },
      {
        isResolved: "asc",
      },
    ],
  });

  return (
    <main className="flex flex-col gap-2 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Inbox</h1>
        <CreateTask />
      </div>
      <div>
        <TaskList tasks={tasks} />
      </div>
    </main>
  );
}
