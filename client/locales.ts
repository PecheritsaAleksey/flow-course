interface DictionaryEntry {
  hello: string;
}

export const dictionary: Record<string, DictionaryEntry> = {
  en: {
    hello: "Hello",
  },
  ru: {
    hello: "Привет",
  },
};
