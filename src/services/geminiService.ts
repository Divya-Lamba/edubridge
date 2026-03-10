import { GoogleGenAI, Type } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const geminiService = {
  async chat(message: string, history: { role: 'user' | 'model', parts: { text: string }[] }[] = []) {
    const model = "gemini-3-flash-preview";
    
    const chat = ai.chats.create({
      model,
      config: {
        systemInstruction: "You are EduBridge AI, a helpful and encouraging tutor for students in rural areas. Your goal is to explain complex technical concepts in simple, relatable terms. Use analogies from daily life or nature when possible. Support multiple languages if the user asks.",
      },
      history: history.map(h => ({
        role: h.role,
        parts: h.parts
      }))
    });

    const result = await chat.sendMessage({ message });
    return result.text;
  },

  async generateQuiz(topic: string) {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a 3-question multiple choice quiz about ${topic}. Return it in JSON format.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING },
              options: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              correctAnswer: { type: Type.STRING }
            },
            required: ["question", "options", "correctAnswer"]
          }
        }
      }
    });
    return JSON.parse(response.text);
  },

  async explainConcept(concept: string) {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Explain the concept of "${concept}" to a 15-year-old student living in a rural village. Use a simple analogy related to farming, community, or nature.`,
    });
    return response.text;
  },

  async generateLessonPlan(topic: string) {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a structured lesson plan for the topic: "${topic}". Include learning objectives, key concepts, and suggested activities. Return it in JSON format.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            topic: { type: Type.STRING },
            learningObjectives: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            keyConcepts: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  concept: { type: Type.STRING },
                  explanation: { type: Type.STRING }
                },
                required: ["concept", "explanation"]
              }
            },
            suggestedActivities: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["topic", "learningObjectives", "keyConcepts", "suggestedActivities"]
        }
      }
    });
    return JSON.parse(response.text);
  },

  async generateLearningPath(goal: string) {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a personalized learning path for the goal: "${goal}". Include 5 milestones with titles and descriptions. Return it in JSON format.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING }
            },
            required: ["title", "description"]
          }
        }
      }
    });
    return JSON.parse(response.text);
  },

  async analyzePerformance(stats: any) {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze these student performance statistics and provide 3 actionable insights: ${JSON.stringify(stats)}. Return it in JSON format.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              insight: { type: Type.STRING },
              recommendation: { type: Type.STRING }
            },
            required: ["insight", "recommendation"]
          }
        }
      }
    });
    return JSON.parse(response.text);
  },

  async recommendCourses(interests: string[]) {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Based on these interests: ${interests.join(', ')}, recommend 3 course titles and brief descriptions. Return it in JSON format.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING }
            },
            required: ["title", "description"]
          }
        }
      }
    });
    return JSON.parse(response.text);
  }
};
