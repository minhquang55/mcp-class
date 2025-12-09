import React, { useMemo, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';
import type { ColumnDef, SortingState, CellContext } from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'src/components/ui/table';
import { Input } from 'src/components/ui/input';
import { Button } from 'src/components/ui/button';
import { Icon } from '@iconify/react/dist/iconify.js';
import { ArrowUp, ArrowDown, ChevronsUpDown } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'src/components/ui/select';
import { Label } from 'src/components/ui/label';
import CardBox from 'src/components/shared/CardBox';
import { useTranslation } from 'react-i18next';

const badgeColors = [
  'bg-blue-100 text-blue-700',
  'bg-green-100 text-green-700',
  'bg-yellow-100 text-yellow-700',
  'bg-purple-100 text-purple-700',
  'bg-pink-100 text-pink-700',
  'bg-indigo-100 text-indigo-700',
  'bg-teal-100 text-teal-700',
  'bg-orange-100 text-orange-700',
];

export function getColorForValue(value: string) {
  const index =
    Math.abs(value.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) %
    badgeColors.length;
  return badgeColors[index];
}

export function toTitleCase(str: string) {
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export type ColumnInput<T, TValue = unknown> = {
  header?: React.ReactNode | string;
  accessorKey?: keyof T | string;
  accessorFn?: (row: T) => TValue;
  cell?: (ctx: CellContext<T, TValue>) => React.ReactNode;
  cellRenderer?: (ctx: CellContext<T, TValue>) => React.ReactNode;
  id?: string;
  meta?: unknown;
};

interface DynamicTableProps<T> {
  data: T[];
  title?: string;
  columns: ColumnInput<T>[];
  action?: React.ReactNode;
}

const DataTable = <T,>({ data, title, columns, action }: DynamicTableProps<T>) => {
  const { t } = useTranslation();
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  const paginationOptions = useMemo(() => [5, 10, 20, 50], []);

  const normalizedColumns = useMemo(() => {
    return (columns as ColumnInput<T>[]).map((col) => {
      const c: ColumnDef<T, unknown> = {} as ColumnDef<T, unknown>;
      if (col.header !== undefined)
        c.header = col.header as unknown as ColumnDef<T, unknown>['header'];
      if (col.accessorKey !== undefined) c.accessorKey = col.accessorKey;
      if (col.accessorFn !== undefined) c.accessorFn = col.accessorFn;
      if (col.cell !== undefined) c.cell = col.cell as ColumnDef<T, unknown>['cell'];
      else if (col.cellRenderer !== undefined)
        c.cell = col.cellRenderer as ColumnDef<T, unknown>['cell'];
      if (col.meta != null) c.meta = col.meta;
      if (col.id !== undefined) c.id = col.id;
      return c;
    }) as ColumnDef<T, unknown>[];
  }, [columns]);

  const table = useReactTable({
    data,
    columns: normalizedColumns,
    state: {
      sorting,
      globalFilter,
      pagination,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  function sanitizeCellText(val: unknown) {
    if (val == null) return '';
    if (typeof val === 'string') return val.replace(/\s+/g, ' ').replace(/,/g, '');
    if (typeof val === 'number' || typeof val === 'boolean') return String(val);
    try {
      return String(val);
    } catch {
      return '';
    }
  }

  function handleDownload() {
    const headerGroups = table.getHeaderGroups();

    // ---- GET HEADERS ----
    const headers =
      headerGroups[0]?.headers.map((h) => {
        const header = h.column.columnDef.header;
        return typeof header === 'string' ? header : '';
      }) ?? [];

    // ---- GET ROW DATA ----
    const rows = table.getRowModel().rows.map((row) => {
      return row.getVisibleCells().map((cell) => {
        const value = cell.getValue();

        // Convert to safe CSV text
        if (value === null || value === undefined) return '';
        return String(value)
          .replace(/,/g, '、') // avoid CSV break
          .replace(/\n/g, ' ') // remove newline
          .trim();
      });
    });

    // ---- BUILD CSV ----
    const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

    // ---- DOWNLOAD ----
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `${(title ?? 'data-table').replace(/\s+/g, '_')}.csv`;
    a.click();

    URL.revokeObjectURL(url);
  }

  return (
    <CardBox>
      <div>
        <div className="p-4 pt-0 flex items-center justify-between flex-wrap gap-4">
          <h3 className="text-xl font-semibold mb-2">{title ?? 'Data Table'}</h3>
          <div className="flex items-center gap-2 flex-wrap">
            <Input
              type="text"
              className="max-w-96 lg:min-w-96 min-w-full placeholder:text-gray-400 dark:placeholder:text-white/20"
              value={globalFilter ?? ''}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder={t('message:searchPlaceholder')}
            />
            <Button onClick={handleDownload} className="p-2 px-4 rounded-md ">
              <Icon icon="material-symbols:download-rounded" width={24} height={24} />
            </Button>
            {action}
          </div>
        </div>

        <div className="overflow-x-auto border rounded-md border-ld">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="">
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className="cursor-pointer select-none  px-0">
                      {header.isPlaceholder ? null : (
                        <Button
                          className="flex items-center gap-1 px-4 bg-transparent hover:bg-transparent text-dark dark:text-white font-semibold"
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {{
                            asc: <ArrowUp className="w-4 h-4 inline" />,
                            desc: <ArrowDown className="w-4 h-4 inline" />,
                          }[header.column.getIsSorted() as string] ??
                            (header.column.id !== 'action' ? (
                              <ChevronsUpDown className="w-2 h-2 inline" />
                            ) : null)}
                        </Button>
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>

            {data.length === 0 ? (
              <div className="p-8 text-center text-gray-500">{t('message:emptyMessage')}</div>
            ) : (
              <TableBody>
                {table.getRowModel().rows.length > 0 ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id} className="hover:bg-primary/10 transition-colors">
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="text-gray-700 dark:text-white/70">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="text-center p-6 text-gray-500 dark:text-white/70 font-medium"
                    >
                      {t('message:noResultsFound')}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            )}
          </Table>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-t border-border dark:border-white/10">
          <div className="flex gap-2">
            <Button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              variant={'secondary'}
            >
              {t('button:previous')}
            </Button>
            <Button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
              {t('button:next')}
            </Button>
          </div>

          <div className="text-forest-black dark:text-white/90 font-medium text-base">
            {t('message:page')} {table.getState().pagination.pageIndex + 1} {t('message:of')}{' '}
            {table.getPageCount()}
          </div>

          <div className="flex items-center gap-2">
            <Label
              htmlFor="pageSize"
              className="mr-0 text-forest-black dark:text-white/90 text-base font-medium whitespace-nowrap min-w-32"
            >
              {t('message:rowsPerPage')}
            </Label>
            <Select
              value={String(table.getState().pagination.pageSize)}
              onValueChange={(value) => table.setPageSize(Number(value))}
            >
              <SelectTrigger className="!w-18 cursor-pointer">
                <SelectValue placeholder="Page size" />
              </SelectTrigger>
              <SelectContent>
                {paginationOptions.map((size) => (
                  <SelectItem key={size} value={String(size)}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </CardBox>
  );
};

export default DataTable;
