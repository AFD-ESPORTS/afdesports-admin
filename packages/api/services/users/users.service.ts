import { Users } from "./users.model";

export const addUser = async (username: string, accessLevel: number) => {
  const testUser = await Users.create({
    username,
    access_level: accessLevel,
  });
  console.log("User added: ", testUser);
};

export const getUser = async (username: string) => {
  const user = await Users.findOne({ where: { username }, logging: false });
  return user;
};
