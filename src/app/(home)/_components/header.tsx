import { SignedIn, UserButton } from "@clerk/nextjs";
import Navigation from "./navigation-menu";

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 w-full bg-white sm:items-end">
      <Navigation />
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  );
}
