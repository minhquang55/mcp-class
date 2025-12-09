import { StarRating } from 'src/components/ui/star_rating';
import i18n from '@/lib/i18n';
import { ColumnInput } from 'src/components/utilities/table/DinamicTable';

interface Employee {
  id: number;
  name: string;
  email: string;
  position: string;
  status: string;
  rating: number;
  joinedAt: string;
}

export const columns: ColumnInput<Employee>[] = [
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
