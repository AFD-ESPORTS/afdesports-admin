import { ExtendedRequest } from "#types/customTypes";

export const testToken = async (req: ExtendedRequest): Promise<object> => {
  console.log("Token route:", req.body);
  console.log("User:", req.user);

  return { message: req.user };
};
