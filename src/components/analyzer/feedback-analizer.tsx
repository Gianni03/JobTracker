"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { analyzeFeedbackAction } from "@/lib/actions";
import { Wand2 } from "lucide-react";

const initialState = {
    message: null,
    errors: {},
    analysis: null,
  };

export function FeedbackAnalyzer() {
    const [state, dispatch] = useActionState(analyzeFeedbackAction, initialState);

    return (
        <Card>
            <form action={dispatch}>
                <CardHeader>
                    <CardTitle>Ingresa el Feedback</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="feedback">Feedback del reclutador</Label>
                        <Textarea 
                            id="feedback"
                            name="feedback"
                            rows={8}
                            placeholder="Ej: 'Apreciamos tu interés. Si bien tu experiencia es sólida, buscamos candidatos con más experiencia en arquitectura de microservicios y AWS...'"
                            required
                        />
                        {state.errors?.feedback && state.errors.feedback.map((error: string) => (
                            <p className="text-sm font-medium text-destructive" key={error}>{error}</p>
                        ))}
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit">
                        <Wand2 className="mr-2 h-4 w-4" />
                        Analizar Feedback
                    </Button>
                </CardFooter>
            </form>
            {state.analysis && (
                <div className="p-6 border-t">
                    <h3 className="text-xl font-bold font-headline mb-4">Análisis de IA</h3>
                    <div className="space-y-6">
                        <div>
                            <h4 className="font-semibold text-lg mb-2">Áreas de Mejora</h4>
                            <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground">
                                {state.analysis.areasForImprovement.split('\n').map((line, i) => <p key={i}>{line.replace(/^- /, '')}</p>)}
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold text-lg mb-2">Sugerencias Personalizadas</h4>
                            <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground">
                               {state.analysis.personalizedSuggestions.split('\n').map((line, i) => <p key={i}>{line.replace(/^- /, '')}</p>)}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Card>
    );
}
