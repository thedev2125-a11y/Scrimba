import { InferenceClient } from "@huggingface/inference"

const hf = new InferenceClient(process.env.HF_ACCESS_TOKEN)

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page
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

        const response = await hf.chatCompletion({
            model: "openai/gpt-oss-120b:fastest",
            messages: [
                {
                    role: "system",
                    content: SYSTEM_PROMPT
                },
                {
                    role: "user",
                    content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!`
                }
            ],
            max_tokens: 1024
        })

        const recipe = response.choices[0].message.content

        return res.status(200).json({
            recipe
        })
    } catch (error) {
        console.error(error)

        return res.status(500).json({
            error: "Failed to generate recipe"
        })
    }
}