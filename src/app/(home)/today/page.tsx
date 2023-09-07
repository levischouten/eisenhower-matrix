import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import TaskList from "../_components/task-list";

const END_OF_DAY = new Date();
END_OF_DAY.setHours(23, 59, 59, 999);

export default async function Today() {
  const { userId } = auth();

  if (!userId) {
    throw new Error("User not defined");
  }

  const tasks = await prisma.task.findMany({
    where: {
      userId,
      isResolved: false,
      OR: [
        {
          dueDate: {
            lte: END_OF_DAY,
          },
        },
        {
          isUrgent: true,
          isImportant: true,
        },
      ],
    },
    orderBy: [
      {
        id: "desc",
      },
      {
        isImportant: "desc",
      },
      {
        isUrgent: "desc",
      },
    ],
  });

  return (
    <div className="flex flex-col gap-6 max-h-full">
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-bold">Today</h1>
        <p className="text-sm">
          All important and urgent tasks & tasks that are due for today
        </p>
      </div>
      <div className="overflow-auto max-h-full">
        <TaskList tasks={tasks} />
      </div>
    </div>
  );
}
