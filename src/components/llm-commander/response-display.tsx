"use client";

import LlmCard from "@/components/llm-commander/llm-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AVAILABLE_LLMS } from "@/lib/llms";
import type { LlmResponse } from "@/lib/types";
import { Lightbulb } from "lucide-react";

interface ResponseDisplayProps {
  optimizedPrompt: string;
  responses: LlmResponse[];
  isLoading: boolean;
  selectedLlms: string[];
}

export default function ResponseDisplay({
  optimizedPrompt,
  responses,
  isLoading,
  selectedLlms,
}: ResponseDisplayProps) {
  if (!isLoading && !optimizedPrompt && responses.length === 0) {
    return null;
  }
  
  return (
    <div className="space-y-6">
      {(optimizedPrompt || isLoading) && (
        <Card className="animate-in fade-in-0 duration-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-6 w-6 text-yellow-400" />
              Optimized Prompt
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading && !optimizedPrompt ? (
              <p className="text-muted-foreground italic">Generating optimized prompt...</p>
            ) : (
              <p className="text-muted-foreground whitespace-pre-wrap">{optimizedPrompt}</p>
            )}
          </CardContent>
        </Card>
      )}

      <Separator />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {selectedLlms.map((llmId) => {
          const llm = AVAILABLE_LLMS.find((l) => l.id === llmId);
          if (!llm) return null;

          const responseData = responses.find((r) => r.llmId === llmId);
          const isCardLoading = isLoading && !responseData;

          return (
            <LlmCard
              key={llm.id}
              llm={llm}
              response={responseData?.response}
              error={responseData?.error}
              isLoading={isCardLoading}
            />
          );
        })}
      </div>
    </div>
  );
}
