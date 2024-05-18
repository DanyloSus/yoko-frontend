import { AxiosResponse } from "axios";
import { Collection, Comment, Message, Question, User, Word } from "./elements";

type TypicalResponse<T> = AxiosResponse<{
  status: string;
  message: string | null;
  data: T;
}>;

type PaginationData<T, K extends string> = {
  currentPage: number;
  lastPage: number;
  size: number;
} & Record<K, T>;

type ResponseWithPagination<T, K extends string> = TypicalResponse<
  PaginationData<T, K>
>;

export type WordResponse = TypicalResponse<Word>;

export type CollectionResponse = TypicalResponse<Collection>;

export type TextExerciseResponse = TypicalResponse<{
  text: {
    id: number;
    text: string;
    translationUk: string;
  };
  words: Word[];
}>;

export type QuizExerciseResponse = TypicalResponse<Question[]>;

export type CardExerciseResponse = TypicalResponse<Word[]>;

export type CollectionsResponse = ResponseWithPagination<Collection[], "data">;

export type CommentResponse = TypicalResponse<Comment>;

export type ChatGptResponse = AxiosResponse<{
  message: Message;
}>;

export type WordsResponse = ResponseWithPagination<Word[], "words">;

export type UsersResponse = ResponseWithPagination<User[], "users">;

export type RequestsResponse = ResponseWithPagination<Collection[], "requests">;
