export type CardTexts = {
  translate: string;
  back: string;
};

export type UserMenuTexts = {
  umAdmin: string;
  umTheme: string;
  umThemeDark: string;
  umThemeLight: string;
  umThemeSystem: string;
  umLang: string;
  umLangUk: string;
  umLangEn: string;
  umSettings: string;
  umLogout: string;
};

export type MobileMenuTexts = {
  mmAdmUsers: string;
  mmAdmCollections: string;
  mmAdmWords: string;
  mmAdmRequests: string;
  mmUserStore: string;
  mmUserCollections: string;
  mmUserTheme: string;
  mmUserThemeDark: string;
  mmUserThemeLight: string;
  mmUserLang: string;
  mmUserLangUk: string;
  mmUserLangEn: string;
  mmExit: string;
};

export type DeleteDialogTexts = {
  delete: string;
  dialogHeading: string;
  dialogContent: string;
  cancel: string;
};

export type ImageModalText = {
  modalTitle: string;
  modalClose: string;
};

export type CommentSectionTexts = {
  comments: string;
  addComment: string;
  submit: string;
};

export type CommentSectionErrors = {
  required: string;
  minLen: string;
};

export type PropositionTexts = {
  propositionHeading: string;
  textExercise: string;
  quizExercise: string;
  cardsExercise: string;
};

export type AITexts = {
  message: string;
  startDialog: string;
  stop: string;
  send: string;
  hint: string;
  ai: string;
  placeholder: string;
  you: string;
};

export type AIErrors = {
  required: string;
};

// array for texts for ai chats
export const aiTextsArray = [
  "texts.message",
  "texts.startDialog",
  "texts.stop",
  "texts.send",
  "texts.hint",
  "texts.placeholder",
  "texts.ai",
  "texts.you",
];
