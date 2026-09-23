//import { HfInference } from '@huggingface/inference'

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page
`

// Vite exposes browser environment variables only when they use the VITE_ prefix.
// Set VITE_OPENAI_API_KEY in .env.
const openaiApiKey = import.meta.env.VITE_OPENAI_API_KEY

export async function getRecipeFromChefClaude(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ")

    const response = await fetch("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${openaiApiKey}`,
        },
        body: JSON.stringify({
            model: "gpt-5",
            instructions: SYSTEM_PROMPT,
            input: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!`,
        }),
    })

    if (!response.ok) {
        throw new Error(`OpenAI request failed: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    return data.output
        ?.flatMap(item => item.content ?? [])
        .find(content => content.type === "output_text")?.text ?? ""
}

// Make sure you set an environment variable in Scrimba 
// for HF_ACCESS_TOKEN
// const hf = new HfInference(process.env.HF_ACCESS_TOKEN)

// export async function getRecipeFromMistral(ingredientsArr) {
//     const ingredientsString = ingredientsArr.join(", ")
//     try {
//         const response = await hf.chatCompletion({
//             model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
//             messages: [
//                 { role: "system", content: SYSTEM_PROMPT },
//                 { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
//             ],
//             max_tokens: 1024,
//         })
//         return response.choices[0].message.content
//     } catch (err) {
//         console.error(err.message)
//     }
// }
