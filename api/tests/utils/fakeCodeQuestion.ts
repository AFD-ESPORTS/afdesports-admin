import { CodeQuestion } from "../../types/codeQuestion";

export function serialized(override: Partial<CodeQuestion>) {
  const codeQuestion: Object = {
    id: 1,
    question: "What is the meaning of life?",
    answer: "42",
    difficulty: "easy",
  };
  return codeQuestion;
}

export default serialized;
