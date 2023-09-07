import TaskList from "@/app/(home)/_components/task-list";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const DESCRIPTIONS = {
  do: "Do tasks that are urgent and important immediately.",
  schedule: "Plan a time to focus on important, but not urgent tasks.",
  delegate: "Delegate urgent but not important tasks if possible.",
  delete: "Eliminate or reduce tasks that are neither urgent nor important",
};

const WHERE = {
  do: {
    isImportant: true,
    isUrgent: true,
  },
  schedule: {
    isImportant: true,
    isUrgent: false,
  },
  delegate: {
    isImportant: false,
    isUrgent: true,
  },
  delete: {
    isImportant: false,
    isUrgent: false,
  },
};

export default async function Category({
  params,
}: {
  params: { category: string };
}) {
  const { userId } = auth();

  if (!userId) {
    throw new Error("User not defined");
  }

  const category = params.category as keyof typeof DESCRIPTIONS;

  if (!(category in DESCRIPTIONS)) {
    redirect("/categories/do");
  }

  const tasks = await prisma.task.findMany({
    where: {
      ...WHERE[category],
      isResolved: false,
      userId,
    },
  });

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold capitalize">{category}</h1>
      </div>
      <p className="text-sm mb-4">{DESCRIPTIONS[category]}</p>
      <TaskList tasks={tasks} />
    </div>
  );
}
