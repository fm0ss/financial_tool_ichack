export type Message = {
  role: "system" | "user" | "assistant";
  content: any;
};

export const initialProgrammerMessages: Message[] = [
  {
    role: "system",
    content:
      "You are a financial expert, who is summarising financial reports. I will give you a list of sentences, summarise the report and say nothing else but the summary. Make it a short summary",
  },
];
