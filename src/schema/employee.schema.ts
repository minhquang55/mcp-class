import i18n from 'src/lib/i18n';
import { z } from 'zod';

export const employeeSchema = z
  .object({
    name: z.string().min(1, { message: i18n.t('message:required_field') }),
    email: z.string().email({ message: i18n.t('message:invalid_format') }),
    position: z.enum(['Engineer', 'Developer', 'Designer', 'Analyst', 'Product Owner'], {
      message: i18n.t('message:invalid_format'),
    }),
    password: z.string().min(6, { message: i18n.t('message:min_length', { min: 6 }) }),
    confirmPassword: z
      .string()
      .min(6, { message: i18n.t('message:min_length', { min: 6 }) })
      .optional(),
    startDate: z
      .date()
      .nullable()
      .refine((val) => val !== null, { message: i18n.t('message:required_field') }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: i18n.t('message:confirmPassword'),
    path: ['confirmPassword'],
  });

export const employeeEditSchema = employeeSchema
  .omit({ password: true, confirmPassword: true })
  .extend({
    password: z.string().optional(),
    confirmPassword: z.string().optional(),
  });
export type EmployeeFormEdit = z.infer<typeof employeeEditSchema>;
export type EmployeeFormData = z.infer<typeof employeeSchema>;
