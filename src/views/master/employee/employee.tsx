import DynamicTable from '@/components/utilities/table/DinamicTable';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getListEmployees } from 'src/api/employee.api';
import { columns } from '@/views/master/employee/employee-column';
import { Button } from 'src/components/ui/button';
import { generatePath, useNavigate } from 'react-router';
import { ROUTES } from 'src/constants/routes';
import { Icon } from '@iconify/react';

const Employee = () => {
  const { t } = useTranslation();
  const [data, setData] = useState<Array<any>>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const employees = await getListEmployees();
      setData(employees);
    };
    fetchData();
  }, []);
  return (
    <DynamicTable
      columns={columns}
      data={data}
      title={t('employee:title')}
      onRowClick={(row) =>
        navigate(generatePath(ROUTES.MASTER.EMPLOYEE.EMPLOYEE_DETAIL, { id: row.id }))
      }
      action={
        <Button
          onClick={() => navigate(ROUTES.MASTER.EMPLOYEE.EMPLOYEE_ADD)}
          className="p-2 px-4 rounded-md "
        >
          <Icon icon="material-symbols:add" width={24} height={24} />
        </Button>
      }
    />
  );
};

export default Employee;
