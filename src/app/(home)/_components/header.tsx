"use client";

import { SignedIn, UserButton } from "@clerk/nextjs";
import Navigation from "./navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import React from "react";

export default function Header() {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="flex justify-between items-center p-4 w-full bg-white sm:items-end md:justify-end">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button size="icon" variant="ghost" className="md:hidden">
            <MenuIcon className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <Navigation onMenuItemClick={() => setOpen(false)} />
        </SheetContent>
      </Sheet>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  );
}
