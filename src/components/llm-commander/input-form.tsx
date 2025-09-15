"use client";

import * as React from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { AVAILABLE_LLMS } from "@/lib/llms";

interface InputFormProps {
  rawPrompt: string;
  setRawPrompt: (prompt: string) => void;
  temperature: number[];
  setTemperature: (temp: number[]) => void;
  selectedLlms: string[];
  setSelectedLlms: (llms: string[]) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export default function InputForm({
  rawPrompt,
  setRawPrompt,
  temperature,
  setTemperature,
  selectedLlms,
  setSelectedLlms,
  onSubmit,
  isLoading,
}: InputFormProps) {

  const handleLlmSelection = (llmId: string, checked: boolean | "indeterminate") => {
    setSelectedLlms(
      checked ? [...selectedLlms, llmId] : selectedLlms.filter((id) => id !== llmId)
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Commander Console</CardTitle>
        <CardDescription>Configure your prompt and select your models.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-2">
          <Label htmlFor="prompt">Raw Prompt</Label>
          <Textarea
            id="prompt"
            placeholder="e.g., Explain the theory of relativity in simple terms."
            value={rawPrompt}
            onChange={(e) => setRawPrompt(e.target.value)}
            rows={4}
            className="text-base"
          />
        </div>

        <div className="grid gap-4">
          <Label>Parameters</Label>
          <div className="flex items-center gap-4 rounded-lg border p-4">
            <Label htmlFor="temperature" className="min-w-[80px]">Temperature</Label>
            <div className="flex-1">
               <Slider
                id="temperature"
                min={0}
                max={1}
                step={0.1}
                value={temperature}
                onValueChange={setTemperature}
                />
            </div>
            <span className="w-12 rounded-md bg-muted px-2 py-1 text-center text-sm font-mono">
              {temperature[0]}
            </span>
          </div>
        </div>

        <div className="grid gap-2">
          <Label>Select Models</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 rounded-lg border p-4">
            {AVAILABLE_LLMS.map((llm) => (
              <div key={llm.id} className="flex items-center space-x-3">
                <Checkbox
                  id={llm.id}
                  checked={selectedLlms.includes(llm.id)}
                  onCheckedChange={(checked) => handleLlmSelection(llm.id, checked)}
                />
                <Label
                  htmlFor={llm.id}
                  className="flex items-center gap-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  <llm.Icon className="h-5 w-5" />
                  {llm.name}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Button onClick={onSubmit} disabled={isLoading} size="lg" className="w-full">
          <Sparkles className="mr-2 h-5 w-5" />
          {isLoading ? "Executing..." : "Optimize and Query Models"}
        </Button>
      </CardContent>
    </Card>
  );
}
