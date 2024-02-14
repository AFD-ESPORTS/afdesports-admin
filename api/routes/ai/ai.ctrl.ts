import { Request, Response, NextFunction } from "express";
import axios from "axios";

export default async (req: Request, res: Response, next: NextFunction) => {
  res.locals.data = await explainCode(code);
};

async function explainCode(code: string) {
  const response = await axios.post(
    "https://api.openai.com/v1/engines/davinci-codex/completions",
    {
      prompt: `Expliquez ce que fait ce code : \n\n${code}`,
      max_tokens: 200,
    },
    {
      headers: {
        Authorization: `Bearer votre-clé-api`,
        "Content-Type": "application/json",
      },
    }
  );

  console.log(response.data.choices[0].text);
}

const code = `
import * as fs from 'fs';

const data = fs.readFileSync('/path/to/file', 'utf8');
console.log(data);
`;
