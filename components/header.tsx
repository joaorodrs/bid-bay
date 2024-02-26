"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { twMerge } from "tailwind-merge";
import { NavigationMenuItemProps } from "@radix-ui/react-navigation-menu";

export function Header() {
  return (
    <header className="flex w-full flex-col items-center justify-center pb-4">
      <div className="relative h-20 w-1/2">
        <Image
          src="/logo-light.webp"
          alt="bid bay"
          fill
          className="object-cover"
        />
      </div>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationItem title="home">
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <ListItem href="/" title="for you">
                posts from tags you follow
              </ListItem>
              <ListItem href="/#recents" title="recents">
                the most recent posts in our site
              </ListItem>
            </ul>
          </NavigationItem>
          <NavigationItem title="tags">
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <ListItem href="/tags" title="best tags">
                tags that people like
              </ListItem>
              <ListItem href="/tags" title="create tag">
                create your own tag if you feel like
              </ListItem>
            </ul>
          </NavigationItem>
          <NavigationMenuItem>
            <Link href="/docs" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                profile
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
}

const NavigationItem = ({
  title,
  children,
}: NavigationMenuItemProps & { title: string }) => (
  <NavigationMenuItem>
    <NavigationMenuTrigger>{title}</NavigationMenuTrigger>
    {!!children && <NavigationMenuContent>{children}</NavigationMenuContent>}
  </NavigationMenuItem>
);

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={twMerge(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
