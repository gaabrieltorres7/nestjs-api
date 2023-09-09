import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const CreateUserSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  username: z.string().min(3).max(15),
  password: z.string(),
});

export class CreateUserSchemaDTO extends createZodDto(CreateUserSchema) {}

// export const CreateUserResponseSchemaDTO = CreateUserSchema.omit({ if I want to omit password from response
//   password: true,
// });

// export type CreateUserResponseSchemaDTO = z.infer<
//   typeof CreateUserResponseSchemaDTO
// >;
