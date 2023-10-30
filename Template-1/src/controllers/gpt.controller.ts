import { Message } from "../constants/message";
import { Request, Response } from "express";
import { templates } from "../constants/templates";
import { OpenAI } from "openai";

const apiKey: string = process.env.OPEN_API_KEY;
const openai = new OpenAI({ apiKey });

const messages: any[] = [];

const createAssessment = async (req: Request, res: Response) => {
  try {
    const { description } = req.body;

    // The chat history will be combined with the prompt and used by the template.
    let chatHistory = "";

    // Create the history messages by joining chat message contents.
    if (chatHistory.length > 0) {
      messages.map((message) => message.content).join("\n");
    }

    // Use the assessment description and add it to the prompt.
    const prompt = templates.generateAssessmentTemplate(
      description,
      chatHistory
    );

    // Generate responses using the OpenAI GPT-3.5 model.
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You're an expert assessment generator who can generate in depth exams, surveys, questionnaires or personality tests for assessment builders.",
        },
        { role: "user", content: prompt },
      ],
    });

    // This is where the assessment is converted and imported into Brainsbuilder.
    console.log(response);

    // return the result
    res.send(response.choices[0].message.content as string);
  } catch (error) {
    res.status(500).send("An error occurred: " + error);
  }
};

export { createAssessment };
