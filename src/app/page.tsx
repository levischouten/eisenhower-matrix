import { auth } from "@clerk/nextjs";
import CreateTask from "./_components/create-task";
import TaskList from "./_components/task-list";
import { prisma } from "@/lib/prisma";

// used to hide outdated resolved tasks
const EXPIRATION_TIME = new Date();
EXPIRATION_TIME.setHours(EXPIRATION_TIME.getHours() - 12);

export default async function Home() {
  const { userId } = auth();

  if (!userId) {
    throw new Error("User not defined");
  }

  const tasks = await prisma.task.findMany({
    where: {
      OR: [
        {
          userId,
          isResolved: true,
          resolvedAt: {
            gt: EXPIRATION_TIME,
          },
        },
        {
          userId,
          isResolved: false,
        },
      ],
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
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Inbox</h1>
        <CreateTask />
      </div>
      <div>
        <TaskList tasks={tasks} />
      </div>
    </div>
  );
}
