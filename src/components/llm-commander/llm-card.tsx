"use client";

import { AlertTriangle, Bot } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import type { LLM } from '@/lib/types';
import { cn } from '@/lib/utils';

interface LlmCardProps {
  llm: LLM;
  response?: string;
  error?: string;
  isLoading: boolean;
}

export default function LlmCard({ llm, response, error, isLoading }: LlmCardProps) {
  const CardIcon = llm.Icon || Bot;

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      );
    }
    if (error) {
      return (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Request Failed</AlertTitle>
          <AlertDescription>
            {error}
          </AlertDescription>
        </Alert>
      )
    }
    return <p className="whitespace-pre-wrap text-sm leading-relaxed">{response}</p>;
  };

  return (
    <Card className={cn("flex flex-col animate-in fade-in-50 slide-in-from-bottom-5 duration-500", 
      {'border-destructive/50': error},
      {'border-dashed': isLoading}
    )}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <CardIcon className="h-6 w-6" />
          {llm.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        {renderContent()}
      </CardContent>
    </Card>
  );
}
