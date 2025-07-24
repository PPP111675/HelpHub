import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: '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'
});

export const askOpenAI = async (text) => {
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: text }],
    max_tokens: 300
  });

  return response.choices[0].message.content;
};