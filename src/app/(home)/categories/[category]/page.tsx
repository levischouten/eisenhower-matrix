import TaskList from "@/app/(home)/_components/task-list";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const DESCRIPTIONS = {
  do: "Tasks with deadlines or consequences",
  schedule: "Tasks with unclear deadlines that contribute to long-term success",
  delegate:
    "Tasks that must get done but don't require your specific skill set",
  delete: "Distractions and unnecessary tasks",
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
    <div>
      <p className="capitalize font-semibold">{category}</p>
      <p className="text-sm mb-4">{DESCRIPTIONS[category]}</p>
      <TaskList tasks={tasks} />
    </div>
  );
}
