import translate from '@vitalets/google-translate-api';

export const translateText = async (text, from, to) => {
  const res = await translate(text, { from, to });
  return res.text;
};
