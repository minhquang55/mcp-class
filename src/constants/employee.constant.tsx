import i18n from '@/lib/i18n';
import { StarRating } from 'src/components/ui/star_rating';
import { ColumnInput } from 'src/components/utilities/table/DinamicTable';
import { EmployeeRow } from 'src/types/apps/employee';
import { EmployeeFormData } from 'src/schema/employee.schema';

export const columns: ColumnInput<EmployeeRow>[] = [
  {
    header: i18n.t('employee:columns.id'),
    accessorKey: 'id',
  },
  {
    header: i18n.t('employee:columns.name'),
    accessorKey: 'name',
  },
  {
    header: i18n.t('employee:columns.email'),
    accessorKey: 'email',
  },
  {
    header: i18n.t('employee:columns.position'),
    accessorKey: 'position',
  },
  {
    header: i18n.t('employee:columns.status'),
    accessorKey: 'status',
  },
  {
    header: i18n.t('employee:columns.rating'),
    accessorKey: 'rating',
    cellRenderer: (ctx) => <StarRating rating={ctx.getValue() as number} />,
  },
  {
    header: i18n.t('employee:columns.joinedAt'),
    accessorKey: 'joinedAt',
  },
];

export const defaultEmployeeFormValues: EmployeeFormData = {
  name: '',
  email: '',
  position: 'Engineer',
  password: '',
  confirmPassword: '',
  startDate: null,
};
