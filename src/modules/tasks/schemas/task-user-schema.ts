import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const CreateTaskUserSchema = z.object({
  title: z.string().min(3).max(255),
  description: z.string().min(3).max(255),
  priority: z.enum(['BAIXA', 'MEDIA', 'ALTA']),
  status: z.enum(['PENDENTE', 'ANDAMENTO', 'CONCLUIDA']),
  startAt: z.string().transform((value) => new Date(value)),
  endAt: z.string().transform((value) => new Date(value)),
});

export class CreateTaskUserSchemaDTO extends createZodDto(
  CreateTaskUserSchema,
) {}
