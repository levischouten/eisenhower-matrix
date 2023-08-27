import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <main className="flex w-screen h-screen items-center justify-center">
      <SignUp />
    </main>
  );
}
