"use client";

import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AVAILABLE_LLMS } from "@/lib/llms";
import type { ApiKeys } from "@/lib/types";

interface SettingsDialogProps {
  children: ReactNode;
  apiKeys: ApiKeys;
  setApiKeys: (keys: ApiKeys) => void;
}

export function SettingsDialog({ children, apiKeys, setApiKeys }: SettingsDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [localKeys, setLocalKeys] = useState<ApiKeys>(apiKeys);

  const handleSave = () => {
    setApiKeys(localKeys);
    setIsOpen(false);
  };

  // Sync local state if props change from outside
  useState(() => {
    setLocalKeys(apiKeys);
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>API Keys</DialogTitle>
          <DialogDescription>
            Manage your API keys here. Your keys are saved securely in your browser's local storage and never sent to our servers.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {AVAILABLE_LLMS.map((llm) => (
            <div key={llm.id} className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor={llm.id} className="text-right flex items-center gap-2">
                <llm.Icon className="h-4 w-4" />
                {llm.name}
              </Label>
              <Input
                id={llm.id}
                type="password"
                value={localKeys[llm.id as keyof ApiKeys]}
                onChange={(e) =>
                  setLocalKeys({ ...localKeys, [llm.id]: e.target.value })
                }
                className="col-span-3"
              />
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
