"use server";

import { z } from "zod";
import { analyzeRecruiterFeedback } from "@/ai/flows/analyze-recruiter-feedback";

const FeedbackSchema = z.object({
  feedback: z.string().min(10, { message: "El feedback debe tener al menos 10 caracteres." }),
});

type State = {
  errors?: {
    feedback?: string[];
  };
  message?: string | null;
  analysis?: {
    areasForImprovement: string;
    personalizedSuggestions: string;
  } | null;
};

export async function analyzeFeedbackAction(prevState: State, formData: FormData): Promise<State> {
  const validatedFields = FeedbackSchema.safeParse({
    feedback: formData.get("feedback"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Error de validación. Por favor, revisa el campo.",
    };
  }

  try {
    const result = await analyzeRecruiterFeedback({ feedback: validatedFields.data.feedback });
    return {
        message: "Análisis completado.",
        analysis: result,
    }
  } catch (error) {
    console.error("Error analyzing feedback:", error);
    return {
      message: "Error al contactar al servicio de IA. Por favor, inténtalo de nuevo más tarde.",
    };
  }
}
