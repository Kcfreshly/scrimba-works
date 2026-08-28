import OpenAI from "openai"
import { getCurrentWeather, getLocation } from "./tools.js"
import dotenv from "dotenv"
dotenv.config({ path: "../../.env" })

export const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
})

const availableFunctions = {
    getCurrentWeather,
    getLocation
}

/**
 * Goal - build an agent that can answer any questions that might require knowledge about my current location and the current weather at my location.
 */

const systemPrompt = `
You cycle through Thought, Action, PAUSE, Observation. At the end of the loop you output a final Answer. Your final answer should be highly specific to the observations you have from running
the actions.
1. Thought: Describe your thoughts about the question you have been asked.
2. Action: run one of the actions available to you - then return PAUSE.
3. PAUSE
4. Observation: will be the result of running those actions.

Available actions:
- getCurrentWeather: 
    E.g. getCurrentWeather: Salt Lake City
    Returns the current weather of the location specified.
- getLocation:
    E.g. getLocation: null
    Returns user's location details. No arguments needed.

Example session:
Question: Please give me some ideas for activities to do this afternoon.
Thought: I should look up the user's location so I can give location-specific activity ideas.
Action: getLocation: null
PAUSE

You will be called again with something like this:
Observation: "New York City, NY"

Then you loop again:
Thought: To get even more specific activity ideas, I should get the current weather at the user's location.
Action: getCurrentWeather: New York City
PAUSE

You'll then be called again with something like this:
Observation: { location: "New York City, NY", forecast: ["sunny"] }

You then output:
Answer: <Suggested activities based on sunny weather that are highly specific to New York City and surrounding areas.>
`


async function agent(query) {
    let messages = [
        {
            role: "system",
            content: systemPrompt
        },
        {
            role: "user",
            content: query
        }
    ]

    const MAX_ITERATIONS = 5
    const actionRegex = /^Action: (\w+): (.+)$/

    for (let i = 0; i < MAX_ITERATIONS; i++) {
        console.log(`Iteration ${i + 1}: Sending messages to OpenAI API...`)
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: messages,
            temperature: 0.7,
        })

        const assistantMessage = response.choices[0].message.content.trim()
        console.log(`Assistant message: ${assistantMessage}`)
        messages.push({
            role: "assistant",
            content: assistantMessage
        })

        const responseLines = assistantMessage.split("\n")
        const actionLine = responseLines.find(line => line.startsWith("Action:"))
        
        if (actionLine) {
            const match = actionLine.match(actionRegex)
            if (match) {
                const actionName = match[1]
                const actionArg = match[2]

                if (availableFunctions[actionName]) {
                    console.log(`Executing action: ${actionName} with argument: ${actionArg}`)
                    const observation = await availableFunctions[actionName](actionArg)
                    console.log(`Observation: ${JSON.stringify(observation)}`)
                    messages.push({
                        role: "user",
                        content: `Observation: ${JSON.stringify(observation)}`
                    })
                } else {
                    console.error(`Action ${actionName} is not available.`)
                    break
                }
            }
        } else {
            console.log("No action found. Assuming final answer is provided.")
            break
        }
    }

    const finalResponse = messages[messages.length - 1].content
    console.log(`Final response from assistant: ${finalResponse}`)
    return finalResponse
}

await agent("Please give me some ideas for activities to do this afternoon.")