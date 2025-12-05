import { GoogleGenAI } from "@google/genai";
import { StudentProfile } from "../types";
import { CURRENT_USER_PROFILE } from "../data/mockProfiles";

// Note: In a real production app, you would proxy this through a backend.
// For this prototype, if the key is missing, we will simulate a response.
const API_KEY = process.env.API_KEY || '';

const ai = new GoogleGenAI({ apiKey: API_KEY });

const MOCK_EXPLANATIONS = [
    "You both share a love for late-night boba runs and cramming for midterms! With your shared Computer Science background, you can debug each other's code while keeping morale high.",
    "Since you're both 'Night Owls', you'll be perfect accountability partners for those 2 AM study sessions at Gateway. Plus, you have overlapping interests in gaming!",
    "A perfect balance! Your study styles complement each other—one focuses on details while the other sees the big picture. You're both taking difficult STEM classes, so mutual support is key.",
    "You both frequent the Science Library and love K-pop. It's a match made in heaven! You can quiz each other during study breaks and trade playlists."
];

export const getMatchExplanation = async (targetProfile: StudentProfile): Promise<string> => {
  // If no API key is set, fallback to mock behavior immediately
  if (!API_KEY) {
    console.warn("No API_KEY found in environment. Using mock Gemini response.");
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
    return MOCK_EXPLANATIONS[Math.floor(Math.random() * MOCK_EXPLANATIONS.length)];
  }

  try {
    const prompt = `
      You are a friendly, enthusiastic AI assistant for a college study-buddy app called "ZotFriend" at UC Irvine.
      
      Compare these two students and explain why they would be a good study match in 2-3 fun sentences.
      Mention specific classes, major synergies, or interests. Be encouraging! Use some UCI specific slang like "Zot Zot" or "Anteater" if it fits naturally.

      Student A (User):
      - Major: ${CURRENT_USER_PROFILE.major}
      - Year: ${CURRENT_USER_PROFILE.year}
      - Classes: ${CURRENT_USER_PROFILE.classes.join(', ')}
      - Study Style: ${CURRENT_USER_PROFILE.studyStyle}
      - Interests: ${CURRENT_USER_PROFILE.interests.join(', ')}

      Student B (Potential Match):
      - Name: ${targetProfile.name}
      - Major: ${targetProfile.major}
      - Year: ${targetProfile.year}
      - Classes: ${targetProfile.classes.join(', ')}
      - Study Style: ${targetProfile.studyStyle}
      - Interests: ${targetProfile.interests.join(', ')}
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "You seem like a great match based on your shared academic goals!";
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Fallback on error
    return MOCK_EXPLANATIONS[Math.floor(Math.random() * MOCK_EXPLANATIONS.length)];
  }
};
