"use client";

import type { ApiKeys } from "@/lib/types";
import { BotMessageSquare, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SettingsDialog } from "@/components/llm-commander/settings-dialog";
import { ThemeToggle } from "@/components/llm-commander/theme-toggle";

interface HeaderProps {
  apiKeys: ApiKeys;
  setApiKeys: (keys: ApiKeys) => void;
}

export default function Header({ apiKeys, setApiKeys }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <a className="mr-6 flex items-center space-x-2" href="/">
            <BotMessageSquare className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block font-headline">
              LLM Commander
            </span>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <SettingsDialog apiKeys={apiKeys} setApiKeys={setApiKeys}>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Button>
          </SettingsDialog>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
