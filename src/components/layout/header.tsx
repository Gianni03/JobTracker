"use client";

import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { SidebarTrigger } from "../ui/sidebar";
import Link from "next/link";

function DonateButton() {
    return (
        <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 animate-beat shadow-lg">
            <Link href="https://cafecito.app/gianni03" target="_blank" rel="noopener noreferrer">
                <Heart className="mr-2 h-4 w-4" />
                Apóyame con un Cafecito
            </Link>
        </Button>
    )
}


export function Header() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b bg-background px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="md:hidden"/>
      </div>
      <DonateButton />
    </header>
  );
}
