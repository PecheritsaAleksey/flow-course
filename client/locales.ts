interface DictionaryEntry {
  hello: string;
  heroTitle: string;
}

export const dictionary: Record<string, DictionaryEntry> = {
  en: {
    hello: "Hello",
    heroTitle: "Best Online Course Platform",
  },
  ru: {
    hello: "Привет",
    heroTitle: "Лучший платформа для онлайн обучения",
  },
};
