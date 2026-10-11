import { GoogleGenAI } from "@google/genai"

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
})

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has
and suggests a recipe they could make with some or all of those ingredients.

You don't need to use every ingredient they mention in your recipe.

The recipe can include additional ingredients they didn't mention, but try
not to include too many extra ingredients.

Format your response in markdown to make it easier to render to a web page.
`

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    })
  }

  try {
    const { ingredients } = req.body

    if (!Array.isArray(ingredients) || ingredients.length === 0) {
      return res.status(400).json({
        error: "Ingredients are required"
      })
    }

    const ingredientsString = ingredients.join(", ")

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: `
        I have ${ingredientsString}.
        Please give me a recipe you'd recommend I make!
      `,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        maxOutputTokens: 1024
      }
    })

    return res.status(200).json({
      recipe: response.text
    })
  } catch (error) {
    console.error("Gemini API error:", error)

    return res.status(500).json({
      error: "Failed to generate recipe"
    })
  }
}