import { Icon } from '@iconify/react/dist/iconify.js';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'src/components/ui/button';
import { Calendar } from 'src/components/ui/calendar';
import { Input } from 'src/components/ui/input';
import { Label } from 'src/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from 'src/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'src/components/ui/select';

const EmployeeForm = () => {
  const { t } = useTranslation();
  const [time, setTime] = useState('');

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);

  return (
    <div className="grid gap-6 grid-cols-1">
      <div className="flex flex-col gap-6">
        <div className="rounded-xl border border-defaultBorder md:p-6 p-4">
          <div className="flex items-center justify-between">
            <h5 className="card-title">{t('employee:form.title_create')}</h5>
            <Button variant="outline" className="mt-2 w-max px-3 py-1 text-sm rounded-md">
              <Icon icon="material-symbols:add" width={24} height={24} />
              {t('button:submit')}
            </Button>
          </div>
          <div className="mt-6 flex flex-col gap-6">
            <div>
              <Label htmlFor="name">{t('employee:form.fields.name')}</Label>
              <Input
                id="name"
                type="text"
                required
                className="mt-2"
                placeholder={t('employee:form.fields.name')}
              />
            </div>

            <div>
              <Label htmlFor="firstname">{t('employee:form.fields.email')}</Label>
              <Input
                id="firstname"
                type="text"
                placeholder={t('employee:form.fields.email')}
                required
                className="mt-2"
              />
            </div>

            {/* Select */}
            <div>
              <Label htmlFor="position">{t('employee:form.fields.position')}</Label>
              <Select>
                <SelectTrigger className="mt-2 w-full">
                  <SelectValue placeholder={t('message:select_an_option')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manager">{t('employee:form.positions.manager')}</SelectItem>
                  <SelectItem value="developer">
                    {t('employee:form.positions.developer')}
                  </SelectItem>
                  <SelectItem value="designer">{t('employee:form.positions.designer')}</SelectItem>
                  <SelectItem value="qa">{t('employee:form.positions.qa')}</SelectItem>
                  <SelectItem value="hr">{t('employee:form.positions.hr')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="password">{t('employee:form.fields.password')}</Label>
              <Input
                id="password"
                type="password"
                placeholder={t('employee:form.fields.password')}
                required
                className="mt-2"
              />
            </div>

            <div className="flex flex-col gap-3">
              <Label htmlFor="date" className="px-1">
                {t('employee:form.fields.startDate')}
              </Label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="date"
                    className="w-full justify-between font-normal hover:bg-transparent focus:border-primary"
                  >
                    {date ? date.toLocaleDateString() : t('message:select_an_option')}
                    <Icon icon="solar:calendar-minimalistic-linear" width={18} height={18} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                      setDate(date);
                      setOpen(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeForm;
