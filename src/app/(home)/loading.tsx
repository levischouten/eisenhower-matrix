import { Loader2Icon } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex justify-center mt-16">
      <Loader2Icon className="h-8 w-8 mr-2 animate-spin" />
    </div>
  );
}
