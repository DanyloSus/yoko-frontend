export type Word = {
  id: number;
  word: string;
  translationUk: string;
};

export type Comment = {
  id: number;
  content: string;
  user: {
    id: number;
    email: string;
    name: string;
    surname: string;
  };
};

export type Collection = {
  id: number;
  name: string;
  text: string;
  translationUk: string;
  status: "pending" | "private" | "public";
  posterUrl?: string;
  bannerUrl?: string;
  likes?: number;
  views?: number;
  wordsCount?: number;
  wordsLearned?: number;
  isStarted?: boolean;
  isLiked?: 0 | 1;
  comments?: Comment[];
  userId?: number;
};

type VariantOfAnswer = {
  id: number;
  translation: string;
  isAnswer: boolean;
};

export type Question = {
  id: number;
  word: string;
  answers: VariantOfAnswer[];
};

export type Message = {
  index: number;
  message: {
    role: "assistant" | "user";
    content: string;
  };
};

export type User = {
  id: number;
  email: string;
  name?: string;
  surname?: string;
  isBlocked?: 0 | 1;
};
