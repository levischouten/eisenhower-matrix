"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { NavigationMenuList } from "@radix-ui/react-navigation-menu";
import {
  BellDotIcon,
  CalendarCheckIcon,
  CalendarDaysIcon,
  ContactIcon,
  InboxIcon,
  Trash2Icon,
} from "lucide-react";
import Link from "next/link";
import React from "react";

const GENERAL_LINKS = [
  {
    href: "/",
    title: "Inbox",
    icon: InboxIcon,
  },
  {
    href: "/today",
    title: "Today",
    icon: CalendarDaysIcon,
  },
];

const CATEGORY_LINKS = [
  {
    href: "/categories/do",
    title: "Do",
    icon: BellDotIcon,
  },
  {
    href: "/categories/schedule",
    title: "Schedule",
    icon: CalendarCheckIcon,
  },
  {
    href: "/categories/delegate",
    title: "Delegate",
    icon: ContactIcon,
  },
  {
    href: "/categories/delete",
    title: "Delete",
    icon: Trash2Icon,
  },
];

type NavigationProps = {
  onMenuItemClick?: () => void;
};

export default function Navigation(props: NavigationProps) {
  return (
    <NavigationMenu className="flex flex-col w-full py-4 gap-4">
      <div className="flex flex-col">
        <p className="font-semibold text-md">General</p>
        <NavigationMenuList>
          <NavigationMenuItem>
            {GENERAL_LINKS.map(({ href, icon, title }) => (
              <Link key={href} href={href} legacyBehavior>
                <NavigationMenuLink
                  onClick={props.onMenuItemClick}
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "flex gap-2 items-center justify-start w-full"
                  )}
                >
                  {React.createElement(icon, { className: "w-4 h-4" })}
                  {title}
                </NavigationMenuLink>
              </Link>
            ))}
          </NavigationMenuItem>
        </NavigationMenuList>
      </div>
      <div className="flex flex-col">
        <p className="font-semibold text-md">Categories</p>
        <NavigationMenuList>
          <NavigationMenuItem>
            {CATEGORY_LINKS.map(({ href, icon, title }) => (
              <Link key={href} href={href} legacyBehavior>
                <NavigationMenuLink
                  onClick={props.onMenuItemClick}
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "flex gap-2 items-center justify-start w-full"
                  )}
                >
                  {React.createElement(icon, { className: "w-4 h-4" })}
                  {title}
                </NavigationMenuLink>
              </Link>
            ))}
          </NavigationMenuItem>
        </NavigationMenuList>
      </div>
    </NavigationMenu>
  );
}
