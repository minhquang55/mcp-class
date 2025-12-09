import { zodResolver } from '@hookform/resolvers/zod';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import { getEmployeeById } from 'src/api/employee.api';
import { Button } from 'src/components/ui/button';
import { Calendar } from 'src/components/ui/calendar';
import { Form, SimpleField } from 'src/components/ui/form';
import { Input } from 'src/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from 'src/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'src/components/ui/select';
import { defaultEmployeeFormValues } from 'src/constants/employee.constant';
import { ROUTES } from 'src/constants/routes';
import {
  EmployeeFormData,
  EmployeeFormEdit,
  employeeEditSchema,
  employeeSchema,
} from 'src/schema/employee.schema';

type EmployeeFormType = EmployeeFormData | EmployeeFormEdit;

type EmployeeFormProps = {
  isEdit?: boolean;
};

const EmployeeForm = ({ isEdit = false }: EmployeeFormProps) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const form = useForm<EmployeeFormType>({
    defaultValues: defaultEmployeeFormValues,
    mode: 'onBlur',
    resolver: zodResolver(isEdit ? employeeEditSchema : employeeSchema),
  });


  useEffect(() => {
    const fetchEmployee = async () => {
      if (!id) return;
      const result = await getEmployeeById(id);
      if (result) {
        form.reset({
          name: result.name,
          email: result.email,
          position: result.position as EmployeeFormEdit['position'],
          password: '',
          confirmPassword: '',
          startDate: new Date(result.joinedAt) || null,
        });
      }
    };

    if (isEdit) {
      fetchEmployee();
    }
  }, [form, id, isEdit]);

  const onSubmit = (data: EmployeeFormType) => {
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="rounded-xl border border-defaultBorder md:p-6 p-4">
          <h5 className="card-title">
            {isEdit ? t('employee:form.title_edit') : t('employee:form.title_create')}
          </h5>
          <div className="mt-6 grid gap-y-2 gap-x-4 md:grid-cols-2">
            <div className="md:col-span-1">
              <SimpleField
                name="name"
                control={form.control}
                label={t('employee:form.fields.name')}
              >
                {(field) => <Input {...field} type="text" />}
              </SimpleField>
            </div>
            <div className="md:col-span-1">
              <SimpleField
                name="email"
                control={form.control}
                label={t('employee:form.fields.email')}
              >
                {(field) => <Input {...field} type="text" />}
              </SimpleField>
            </div>
            <div className="md:col-span-1">
              <SimpleField
                name="position"
                control={form.control}
                label={t('employee:form.fields.position')}
              >
                {(field) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full !h-[40px]">
                      <SelectValue placeholder={t('message:select_an_option')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manager">
                        {t('employee:form.positions.manager')}
                      </SelectItem>
                      <SelectItem value="developer">
                        {t('employee:form.positions.developer')}
                      </SelectItem>
                      <SelectItem value="designer">
                        {t('employee:form.positions.designer')}
                      </SelectItem>
                      <SelectItem value="qa">{t('employee:form.positions.qa')}</SelectItem>
                      <SelectItem value="hr">{t('employee:form.positions.hr')}</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </SimpleField>
            </div>
            <div className="md:col-span-1">
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
                  />
                )}
              </SimpleField>
            </div>
            <div className="md:col-span-1">
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
                  />
                )}
              </SimpleField>
            </div>
            <div className="md:col-span-1">
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
          <div className="mt-6 flex w-full items-center justify-between gap-3">
            <Button
              type="button"
              variant="outline"
              className="border-black-20 text-black-60"
              onClick={() => navigate(ROUTES.MASTER.EMPLOYEE.EMPLOYEE)}
            >
              {t('button:cancel')}
            </Button>
            <Button type="submit">{t('button:submit')}</Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default EmployeeForm;
