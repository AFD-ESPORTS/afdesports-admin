import { User } from "../../types/user";

export function serialized(override: Partial<User>) {
  const user: Object = {
    id: 1,
    username: "fakeuser",
    password: "fakepassword",
    is_superuser: false,
    first_name: "Fake",
    last_name: "USER",
    email: "fake.user@fakeemail.com",
  };
  return user;
}
