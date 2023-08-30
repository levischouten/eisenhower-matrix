import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Task } from "@prisma/client";
import { Trash2Icon } from "lucide-react";
import { deleteTask } from "../actions";
import { useRouter } from "next/navigation";

type DeleteTaskProps = {
  task: Task;
};

export default function DeleteTask(props: DeleteTaskProps) {
  const { toast } = useToast();
  const router = useRouter();

  async function handleClickEvent(taskId: number) {
    const task = await deleteTask(taskId);

    toast({
      title: "Delete was successful",
      description: `${task.title} has been deleted`,
    });

    router.refresh();
  }

  const { task } = props;

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="sm" variant="ghost" className="hidden sm:flex">
          <Trash2Icon className="mr-2 h-4 w-4" /> Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogTrigger asChild>
        <Button size="icon" variant="ghost" className="flex sm:hidden">
          <Trash2Icon className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            task.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleClickEvent(task.id)}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
