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

export type FileDTO = {
  originalname: string;
  filename: string;
  encoding: string;
  size: number;
  mimetype: string;
  buffer: Buffer;
};

export type AvatarDTO = {
  userId: string;
  file: FileDTO;
};
