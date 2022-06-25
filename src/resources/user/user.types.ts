export interface INewUser {
  __id?: string;
  username?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  createdAt?: Date;
  role?: string;
}
export interface IUserToRegister {
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
  role: string;
}

export interface IUserToReturn {
  __id?: string;
  username?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  createdAt?: Date;
  token: string;
  refreshToken?: string;
  role?: string;
}
export interface IUser {
  __id?: string;
  username?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  createdAt?: Date;
  role?: string;
}

export interface ITokenList {
  [key: string]: IUserToReturn;
}

export interface IUserRepository {
  getAll(): Promise<Array<IUser>>;
  getByUsername(username: string): Promise<IUser | null>;
  getById(__id: string): Promise<IUser | null>;
  save(user: INewUser): Promise<IUser | null>;
  update(__id: string, fieldsToUpdate: INewUser): Promise<IUser>;
}

export interface IUserService {
  repository: IUserRepository;
  getAll(): Promise<Array<IUser>>;
  getByUsername(username: string): Promise<IUser | null>;
  getById(__id: string): Promise<IUser | null>;
  save(user: INewUser): Promise<IUser | null>;
  update(__id: string, fieldsToUpdate: INewUser): Promise<IUser>;
}

export interface IUserController {
  update({ __id, fieldsToUpdate }: { __id: string; fieldsToUpdate: INewUser }): Promise<IUser>;
  updatePassword({
    __id,
    password,
    newPassword,
  }: {
    __id: string;
    password: string;
    newPassword: string;
  }): Promise<IUser>;
  register(userToRegister: IUserToRegister): Promise<IUser>;
  authenticate(userToRegister: IUserToRegister): Promise<IUser>;
  tokenize({ refreshToken: oldRefreshToken }: { refreshToken: string }): Promise<IUser>;
}
