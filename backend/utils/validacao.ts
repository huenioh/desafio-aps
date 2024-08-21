import { ZodType, ZodError } from 'zod';

export function validacao<T>(data: unknown, schema: ZodType<T>): T {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof ZodError) {
      throw new Error(error.errors.map(e => e.message).join(', '));
    }
    throw error;
  }
}