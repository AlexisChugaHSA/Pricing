'use client';

import Link from 'next/link';
import { HeaderCell } from '@/app/shared/table';
import { Badge, Text, Tooltip, ActionIcon } from 'rizzui';
import { routes } from '@/config/routes';
import EyeIcon from '@components/icons/eye';
import PencilIcon from '@components/icons/pencil';
import TableAvatar from '@ui/avatar-card';
import DateCell from '@ui/date-cell';
import DeletePopover from '@/app/shared/delete-popover';
import { PiArrowDownRight, PiArrowUpRight } from 'react-icons/pi';
import TrendingDownIcon from '@components/icons/trending-down';
import TrendingUpIcon from '@components/icons/trending-up';

function getStatusBadge(status: string) {
  switch (status.toLowerCase()) {
    case 'pending':
      return (
        <div className="flex items-center">
          <Badge color="warning" renderAsDot />
          <Text className="ms-2 font-medium text-orange-dark">{status}</Text>
        </div>
      );
    case 'completed':
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium text-green-dark">{status}</Text>
        </div>
      );
    case 'cancelled':
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
  sortConfig?: any;
  onDeleteItem: (id: string) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (event: React.ChangeEvent<HTMLInputElement>, id: string) => void;
};

export const getColumnsCCrecos = ({
  sortConfig,
  onDeleteItem,
  onHeaderCellClick,
}: Columns) => [

  {
    title: <span className="text-base font-bold text-gray-800">Empresa</span>,
    dataIndex: 'nombre',
    key: 'nombre',
    width: 10,
    className: 'flex-column',
    render: (_: any, row: any) => (
        row.nombre
    ),
  },
  {
    title:<span className="text-base font-bold text-gray-800"> 
      <HeaderCell
        title="Efectivo"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'efectivo'
        }
      />
    </span>,
    onHeaderCell: () => onHeaderCellClick('efectivo'),
    dataIndex: 'efectivo',
    key: 'efectivo',
    width: 10,
    render: (_: any, record: { efectivo: string; porcentaje_efectivo: string }) => {
      const isNegative = record.porcentaje_efectivo.includes('-');
      return (
        <Text className="font-medium text-gray-700 flex items-center gap-1">
          ${record.efectivo} {/* Muestra el valor de efectivo */}
          <span className={`flex items-center gap-1 text-sm ${isNegative ? 'text-green-600' : 'text-red-600'}`}>
           ( {isNegative ? (
              <TrendingDownIcon className="h-auto w-4" />
            ) : (
              <TrendingUpIcon className="h-auto w-4" />
            )}
            {record.porcentaje_efectivo}%)
          </span>
        </Text>
      );
    },
  },
  {
    title: <span className="text-base font-bold text-gray-800"> 
      <HeaderCell
        title="Cuota"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'cuota'
        }
      />
    </span>,
    onHeaderCell: () => onHeaderCellClick('cuota'),
    dataIndex: 'cuota',
    key: 'cuota',
    width: 10,
    render: (_: any, record: { cuota: string; porcentaje_cuota: string }) => {
      const isNegative = record.porcentaje_cuota.includes('-');
      return (
        <Text className="font-medium text-gray-700 flex items-center gap-1">
          {record.cuota}
          <span className={`flex items-center gap-1 text-sm ${isNegative ? 'text-green-600' : 'text-red-600'}`}>
           ( {isNegative ? (
              <TrendingDownIcon className="h-auto w-4" />
            ) : (
              <TrendingUpIcon className="h-auto w-4" />
            )}
            {record.porcentaje_cuota}%)
          </span>
        </Text>
      );
    },
  },
  {
    title:  <span className="text-base font-bold text-gray-800">
      <HeaderCell
        title="Plazo"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'plazo'
        }
      />
      </span>,
    onHeaderCell: () => onHeaderCellClick('plazo'),
    dataIndex: 'plazo',
    key: 'plazo',
    width: 10,
    render: (value: string) => (
      <Text className="font-medium text-gray-700">${value}</Text>
    ),
  },
];

export const getWidgetColumns = ({
  sortConfig,
  onDeleteItem,
  onHeaderCellClick,
}: Columns) => [
  {
    title: (
      <HeaderCell title="Order ID" className="ps-4 [&>div]:whitespace-nowrap" />
    ),
    dataIndex: 'id',
    key: 'id',
    width: 90,
    render: (value: string, row: any) => (
      <Link
        href={routes.eCommerce.editOrder(row.id)}
        className="ps-4 hover:text-gray-900 hover:underline"
      >
        #{value}
      </Link>
    ),
  },
  {
    title: <HeaderCell title="Customer" />,
    dataIndex: 'customer',
    key: 'customer',
    width: 300,
    render: (_: any, row: any) => (
      <TableAvatar
        src={row.avatar}
        name={row.name}
        description={row.email.toLowerCase()}
      />
    ),
  },
  {
    title: <HeaderCell title="Items" />,
    dataIndex: 'items',
    key: 'items',
    width: 150,
    render: (value: string) => (
      <Text className="font-medium text-gray-700">{value}</Text>
    ),
  },
  {
    title: (
      <HeaderCell
        title="Price"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'price'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('price'),
    dataIndex: 'price',
    key: 'price',
    width: 150,
    render: (value: string) => (
      <Text className="font-medium text-gray-700">${value}</Text>
    ),
  },
  {
    title: (
      <HeaderCell
        title="Created"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'createdAt'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('createdAt'),
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 200,
    render: (createdAt: Date) => <DateCell date={createdAt} />,
  },
  {
    title: (
      <HeaderCell
        title="Modified"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'updatedAt'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('updatedAt'),
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    width: 200,
    render: (value: Date) => <DateCell date={value} />,
  },
  {
    title: <HeaderCell title="Status" />,
    dataIndex: 'status',
    key: 'status',
    width: 140,
    render: (value: string) => getStatusBadge(value),
  },
  {
    // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
    title: <HeaderCell title="Actions" className="opacity-0" />,
    dataIndex: 'action',
    key: 'action',
    width: 130,
    render: (_: string, row: any) => (
      <div className="flex items-center justify-end gap-3 pe-4">
        <Tooltip
          size="sm"
          content={'Edit Order'}
          placement="top"
          color="invert"
        >
          <Link href={routes.eCommerce.editOrder(row.id)}>
            <ActionIcon
              as="span"
              size="sm"
              variant="outline"
              aria-label={'Edit Order'}
              className="hover:text-gray-700"
            >
              <PencilIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        <Tooltip
          size="sm"
          content={'View Order'}
          placement="top"
          color="invert"
        >
          <Link href={routes.eCommerce.orderDetails(row.id)}>
            <ActionIcon
              as="span"
              size="sm"
              variant="outline"
              aria-label={'View Order'}
              className="hover:text-gray-700"
            >
              <EyeIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
        <DeletePopover
          title={`Delete the order`}
          description={`Are you sure you want to delete this #${row.id} order?`}
          onDelete={() => onDeleteItem(row.id)}
        />
      </div>
    ),
  },
];
