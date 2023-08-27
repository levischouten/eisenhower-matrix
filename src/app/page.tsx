import { PrismaClient } from "@prisma/client";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { auth } from "@clerk/nextjs";
import CreateTask from "./_components/create-task";
import { Calendar } from "lucide-react";

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
  });

  return (
    <main className="flex flex-col gap-2 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Inbox</h1>
        <CreateTask />
      </div>
      <div>
        {tasks.map((task) => (
          <div key={task.id} className="flex items-start p-2">
            <Checkbox className="my-2 mx-4" />
            <div className="flex flex-col gap-1">
              <p className="font-medium">{task.title}</p>
              <p className="text-sm">{task.description}</p>
              <div className="flex gap-1 items-center">
                {task.dueDate && (
                  <div className="text-sm flex items-center gap-1">
                    <Calendar size={16} />
                    <span>{task.dueDate.toDateString()}</span>
                  </div>
                )}
                {task.isImportant && <Badge variant="outline">Important</Badge>}
                {task.isUrgent && <Badge variant="outline">Urgent</Badge>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
