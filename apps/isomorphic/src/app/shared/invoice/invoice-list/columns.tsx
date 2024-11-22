'use client';

import Link from 'next/link';
import { type Invoice } from '@/data/invoice-data';
import { routes } from '@/config/routes';
import { Text, Badge, Tooltip, Checkbox, ActionIcon } from 'rizzui';
import { HeaderCell } from '@/app/shared/table';
import EyeIcon from '@components/icons/eye';
import PencilIcon from '@components/icons/pencil';
import AvatarCard from '@ui/avatar-card';
import DateCell from '@ui/date-cell';
import DeletePopover from '@/app/shared/delete-popover';

function getStatusBadge(status: string) {
  switch (status.toLowerCase()) {
    case 'pending':
      return (
        <div className="flex items-center">
          <Badge color="warning" renderAsDot />
          <Text className="ms-2 font-medium text-orange-dark">{status}</Text>
        </div>
      );
    case 'paid':
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium text-green-dark">{status}</Text>
        </div>
      );
    case 'overdue':
      return (
        <div className="flex items-center">
          <Badge color="danger" renderAsDot />
          <Text className="ms-2 font-medium text-red-dark">{status}</Text>
        </div>
      );
    default:
      return (
        <div className="flex items-center">
          <Badge renderAsDot className="bg-gray-400" />
          <Text className="ms-2 font-medium text-gray-600">{status}</Text>
        </div>
      );
  }
}

type Columns = {
  data: any[];
  sortConfig?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onDeleteItem: (id: string) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
};

export const getColumns = ({
  data,
  sortConfig,
  checkedItems,
  onDeleteItem,
  onHeaderCellClick,
  handleSelectAll,
  onChecked,
}: Columns) => [/*
  {
    title: (
      <div className="ps-2">
        <Checkbox
          title={'Select All'}
          onChange={handleSelectAll}
          checked={checkedItems.length === data.length}
          className="cursor-pointer"
        />
      </div>
    ),
    dataIndex: 'checked',
    key: 'checked',
    width: 15,
    render: (_: any, row: any) => (
      <div className="inline-flex ps-2">
        <Checkbox
          className="cursor-pointer"
          checked={checkedItems.includes(row.id)}
          {...(onChecked && { onChange: () => onChecked(row.id) })}
        />
      </div>
    ),
  },*/
  {
    title: <HeaderCell title="Num. Factura" />,
    dataIndex: 'id_factura',
    key: 'id_factura',
    width: 30,
    render: (value: number) => (
      <div className="flex items-center justify-center gap-3 pe-3">
        {value}
      </div>
    ),
  },
  /*
  {
    title: <HeaderCell title="Fecha" />,
    dataIndex: 'email',
    key: 'email',
    width: 250,
    render: (email: string) => email.toLowerCase(),
  },
  */
  {
    title: (
      <HeaderCell
        title="Fecha"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'fecha'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('fecha'),
    dataIndex: 'fecha',
    key: 'fecha',
    width: 30,
    render: (value: string) =>(
      <Text className="font-medium text-gray-700 dark:text-gray-600">
        {value}
      </Text>
    ),
  },
  /*{
    title: (
      <HeaderCell
        title="Due Date"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'dueDate'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('dueDate'),
    dataIndex: 'dueDate',
    key: 'dueDate',
    width: 200,
    render: (value: Date) => <DateCell date={value} />,
  },*/
  {
    title: (
      <HeaderCell
        title="Importe Facturado"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'total'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('total'),
    dataIndex: 'total',
    key: 'total',
    width: 30,
    render: (value: number) => (
      <div className="flex items-center justify-center gap-3 pe-3">
        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)} USD
      </div>
    ),
  },
  /*
  {
    title: <HeaderCell title="Status" />,
    dataIndex: 'status',
    key: 'status',
    width: 120,
    render: (value: string) => getStatusBadge(value),
  },*/
  {
    title: <HeaderCell title="Ver Detalles" />,
    dataIndex: 'action',
    key: 'action',
    width: 20,
    render: (_: string, row: any) => (
      <div className="flex items-center justify-center gap-3 pe-3">
        {/*
        <Tooltip
          size="sm"
          content={'Edit Invoice'}
          placement="top"
          color="invert"
        >
          <Link href={routes.invoice.edit(row.id)}>
            <ActionIcon
              as="span"
              size="sm"
              variant="outline"
              className="hover:!border-gray-900 hover:text-gray-700"
            >
              <PencilIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>*/}
        <Tooltip
          size="sm"
          content={'View Invoice'}
          placement="top-start"
          color="invert"
        >
          <Link href={routes.invoice.details(row.id_factura)}>
            <ActionIcon
              as="span"
              size="sm"
              variant="outline"
              className="hover:!border-gray-900 hover:text-gray-700"
            >
              <EyeIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
         {/*
        <DeletePopover
          title={`Delete the invoice`}
          description={`Are you sure you want to delete this #${row.id} invoice?`}
          onDelete={() => onDeleteItem(row.id)}
        />*/}
      </div>
    ),
  },
];
