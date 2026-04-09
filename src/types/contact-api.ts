export type ContactApiResponse = {
  success: boolean;
  message: string;
  fieldErrors?: Record<string, string>;
};
