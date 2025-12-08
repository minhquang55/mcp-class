import { Icon } from '@iconify/react/dist/iconify.js';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'src/components/ui/button';
import { Calendar } from 'src/components/ui/calendar';
import { Input } from 'src/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from 'src/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'src/components/ui/select';
import { useForm } from 'react-hook-form';
import { EmployeeFormEdit, employeeEditSchema } from 'src/schema/employee.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, SimpleField } from 'src/components/ui/form';
import { useParams } from 'react-router';
import { getEmployeeById } from 'src/api/employee.api';

const EmployeeDetail = () => {
  const { t } = useTranslation();
  const id = useParams().id;
  const [open, setOpen] = useState(false);
  const form = useForm<EmployeeFormEdit>({
    defaultValues: {
      name: '',
      email: '',
      position: undefined,
      password: '',
      startDate: undefined,
    },
    mode: 'onBlur',
    resolver: zodResolver(employeeEditSchema),
  });

  const fetchEmployee = async () => {
    const result = await getEmployeeById(id!);
    if (result) {
      form.reset({
        name: result.name,
        email: result.email,
        position: result.position as EmployeeFormEdit['position'],
        password: '',
        startDate: new Date(result.joinedAt) || undefined,
      });
    }
  };
  useEffect(() => {
    if (id) {
      fetchEmployee();
    }
  }, [id]);

  const onSubmit = (data: EmployeeFormEdit) => {
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <Form {...form}>
      <form className="grid gap-6 grid-cols-1" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6">
          <div className="rounded-xl border border-defaultBorder md:p-6 p-4">
            <div className="flex items-center justify-between">
              <h5 className="card-title">{t('employee:form.title_create')}</h5>
              <Button variant="outline" className="mt-2 w-max px-3 py-1 text-sm rounded-md">
                <Icon icon="material-symbols:add" width={24} height={24} />
                {t('button:submit')}
              </Button>
            </div>
            <div className="mt-6 flex flex-col ">
              <SimpleField
                name="name"
                control={form.control}
                label={t('employee:form.fields.name')}
              >
                {(field) => <Input {...field} type="text" />}
              </SimpleField>

              <SimpleField
                name="email"
                control={form.control}
                label={t('employee:form.fields.email')}
              >
                {(field) => <Input {...field} type="text" />}
              </SimpleField>

              <SimpleField
                name="position"
                control={form.control}
                label={t('employee:form.fields.position')}
              >
                {(field) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="mt-2 w-full">
                      <SelectValue placeholder={t('message:select_an_option')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Engineer">
                        {t('employee:form.positions.engineer')}
                      </SelectItem>
                      <SelectItem value="Developer">
                        {t('employee:form.positions.developer')}
                      </SelectItem>
                      <SelectItem value="Designer">
                        {t('employee:form.positions.designer')}
                      </SelectItem>
                      <SelectItem value="Analyst">
                        {t('employee:form.positions.analyst')}
                      </SelectItem>
                      <SelectItem value="Product Owner">
                        {t('employee:form.positions.productOwner')}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </SimpleField>
              <SimpleField
                name="password"
                control={form.control}
                label={t('employee:form.fields.password')}
              >
                {(field) => (
                  <Input
                    id="password"
                    type="password"
                    {...field}
                    placeholder={t('employee:form.fields.password')}
                    className="mt-2"
                  />
                )}
              </SimpleField>
              <SimpleField
                name="confirmPassword"
                control={form.control}
                label={t('employee:form.fields.confirmPassword')}
              >
                {(field) => (
                  <Input
                    id="confirmPassword"
                    type="password"
                    {...field}
                    onChange={(value) =>
                      field.onChange(value.target.value ? value.target.value : '')
                    }
                    placeholder={t('employee:form.fields.confirmPassword')}
                    className="mt-2"
                  />
                )}
              </SimpleField>
              <SimpleField
                name="startDate"
                control={form.control}
                label={t('employee:form.fields.startDate')}
              >
                {(field) => (
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        id="date"
                        className="w-full justify-between font-normal hover:bg-transparent focus:border-primary"
                      >
                        {field.value
                          ? field.value.toLocaleDateString()
                          : t('message:select_an_option')}
                        <Icon icon="solar:calendar-minimalistic-linear" width={18} height={18} />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value ? new Date(field.value) : undefined}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                          field.onChange(date);
                          setOpen(false);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                )}
              </SimpleField>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default EmployeeDetail;
