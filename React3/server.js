import "dotenv/config"
import express from "express"
import { GoogleGenAI } from "@google/genai"

const app = express()
const PORT = 3000

app.use(express.json())

const genai = new GoogleGenAI({
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

app.post("/api/recipe", async (req, res) => {
  try {
    const { ingredients } = req.body

    if (!Array.isArray(ingredients) || ingredients.length === 0) {
      return res.status(400).json({
        error: "Ingredients are required"
      })
    }

    const ingredientsString = ingredients.join(", ")

    const response = await genai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: `
        I have ${ingredientsString}.
        Please give me a recipe you'd recommend I make!
      `,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        maxOutputTokens: 1024
      }
    })

    const recipe = response.text

    return res.status(200).json({
      recipe
    })

  } catch (error) {
    console.error("Gemini API error:")
    console.error(error)

    return res.status(500).json({
      error: "Failed to generate recipe"
    })
  }
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})