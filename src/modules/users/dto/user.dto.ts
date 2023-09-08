export type CreateUserDTO = {
  username: string;
  password: string;
  email: string;
  name: string;
};

export type UserCreatedDTO = {
  id: string;
  createdAt: Date;
} & CreateUserDTO;

export type UsernameAndEmail = {
  username: string;
  email: string;
};
