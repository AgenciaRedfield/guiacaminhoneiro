import { mockUsers } from "../data/mock/mock-data.js";
import { HttpError } from "../utils/http-error.js";

export class UserService {
  me(id: string) {
    const user = mockUsers.find((item) => item.id === id);
    if (!user) {
      throw new HttpError(404, "Usuario nao encontrado.");
    }

    const { password: _password, ...safeUser } = user;
    return safeUser;
  }

  list() {
    return mockUsers.map(({ password: _password, ...user }) => user);
  }
}
