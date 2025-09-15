"use client";

import { useState, useEffect, useCallback } from "react";
import type { ApiKeys, LlmResponse } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

import Header from "@/components/llm-commander/header";
import InputForm from "@/components/llm-commander/input-form";
import ResponseDisplay from "@/components/llm-commander/response-display";

import { optimizePrompt } from "@/ai/flows/optimize-prompt";
import { queryLlm } from "@/ai/flows/query-llm-flow";
import { AVAILABLE_LLMS } from "@/lib/llms";

export default function Home() {
  const [apiKeys, setApiKeys] = useState<ApiKeys>({ gemini: "", openai: "", claude: "" });
  const [rawPrompt, setRawPrompt] = useState<string>("");
  const [temperature, setTemperature] = useState<number[]>([0.7]);
  const [selectedLlms, setSelectedLlms] = useState<string[]>(['gemini']);
  
  const [isLoading, setIsLoading] = useState(false);
  const [optimizedPrompt, setOptimizedPrompt] = useState<string>("");
  const [responses, setResponses] = useState<LlmResponse[]>([]);

  const { toast } = useToast();

  useEffect(() => {
    const storedKeys = localStorage.getItem("llm-api-keys");
    if (storedKeys) {
      setApiKeys(JSON.parse(storedKeys));
    }
  }, []);

  const handleApiKeysChange = (newKeys: ApiKeys) => {
    setApiKeys(newKeys);
    localStorage.setItem("llm-api-keys", JSON.stringify(newKeys));
    toast({
      title: "API Keys Saved",
      description: "Your API keys have been saved locally.",
    });
  };

  const handleOptimizeAndQuery = useCallback(async () => {
    if (!rawPrompt.trim()) {
      toast({ variant: 'destructive', title: "Error", description: "Prompt cannot be empty." });
      return;
    }
    if (selectedLlms.length === 0) {
      toast({ variant: 'destructive', title: "Error", description: "Please select at least one LLM to query." });
      return;
    }

    setIsLoading(true);
    setOptimizedPrompt("");
    setResponses([]);

    try {
      // 1. Start prompt optimization, but don't wait for it yet.
      const optimizationPromise = optimizePrompt({ rawPrompt })
        .then(({ optimizedPrompt: newOptimizedPrompt }) => {
          setOptimizedPrompt(newOptimizedPrompt);
          return newOptimizedPrompt;
        })
        .catch(error => {
          const errorMessage = error instanceof Error ? error.message : "An unknown error occurred during prompt optimization.";
          toast({ variant: 'destructive', title: "Optimization Failed", description: errorMessage });
          console.error("An error occurred during optimization:", error);
          // Return the raw prompt as a fallback
          return rawPrompt;
        });

      // 2. Query LLMs in parallel using the optimized prompt when it's ready.
      const llmPromises = selectedLlms.map(async (llmId) => {
        const currentOptimizedPrompt = await optimizationPromise;
        return queryLlm({
          llmId,
          prompt: currentOptimizedPrompt,
          apiKey: apiKeys[llmId as keyof ApiKeys],
          temperature: temperature[0]
        })
          .then(response => ({ llmId, response: response.response, error: undefined } as LlmResponse))
          .catch(error => ({ llmId, response: "", error: error.message } as LlmResponse));
      });

      for (const promise of llmPromises) {
        promise.then(result => {
          setResponses(prev => [...prev.filter(r => r.llmId !== result.llmId), result]);
          if (result.error) {
            toast({ variant: 'destructive', title: `Error with ${AVAILABLE_LLMS.find(l => l.id === result.llmId)?.name}`, description: result.error });
          }
        });
      }

      await Promise.allSettled(llmPromises);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
      toast({ variant: 'destructive', title: "An Error Occurred", description: errorMessage });
      console.error("An error occurred:", error);
    } finally {
      setIsLoading(false);
    }
  }, [rawPrompt, selectedLlms, apiKeys, toast, temperature]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header apiKeys={apiKeys} setApiKeys={handleApiKeysChange} />
      <main className="flex-1 px-4 py-6 md:px-10 md:py-8">
        <div className="mx-auto grid w-full max-w-6xl gap-6">
          <div className="space-y-2">
            <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              LLM Commander
            </h1>
            <p className="text-muted-foreground md:text-lg">
              Refine your prompt and command a squadron of LLMs. Compare results side-by-side.
            </p>
          </div>
          <InputForm
            rawPrompt={rawPrompt}
            setRawPrompt={setRawPrompt}
            temperature={temperature}
            setTemperature={setTemperature}
            selectedLlms={selectedLlms}
            setSelectedLlms={setSelectedLlms}
            onSubmit={handleOptimizeAndQuery}
            isLoading={isLoading}
          />
          <ResponseDisplay
            optimizedPrompt={optimizedPrompt}
            responses={responses}
            isLoading={isLoading}
            selectedLlms={selectedLlms}
          />
        </div>
      </main>
    </div>
  );
}
