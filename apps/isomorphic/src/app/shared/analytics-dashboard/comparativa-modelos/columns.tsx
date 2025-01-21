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
import { Reorder } from 'framer-motion';


type Columns = {
  sortConfig?: any;
  onDeleteItem: (id: string) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (event: React.ChangeEvent<HTMLInputElement>, id: string) => void;
};

export const getColumnsCModelos = ({
  sortConfig,
  onDeleteItem,
  onHeaderCellClick,
}: Columns) => [
    {
      title: <HeaderCell title="Marca-Modelo"/>,
      dataIndex: 'marca',
      key: 'marca',
      width:'50px',
      render: (_: any, row: any) => (
        row.marca+'-'+row.modelo
      ),
    },
  {
    title: (
      <HeaderCell
        title="Plazo"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'plazo'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('plazo'),
    dataIndex: 'plazo',
    key: 'plazo',
    width: 100,
    render: (value: string) => (
      <Text className="font-medium text-gray-700">{value}</Text>
    ),
  },
  {
    title: (
      <HeaderCell
        title="Efectivo"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'efectivo'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('efectivo'),
    dataIndex: 'efectivo',
    key: 'efectivo',
    width: 100,
    render: (value: string) => (
      <Text className="font-medium text-gray-700">${value}</Text>
    ),
  },  {
    title: (
      <HeaderCell
        title="Cuotas"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'cuotas'
        }
      />
    ),
    onHeaderCell: () => onHeaderCellClick('cuotas'),
    dataIndex: 'cuotas',
    key: 'cuotas',
    width: 100,
    render: (value: string) => (
      <Text className="font-medium text-gray-700">${value}</Text>
    ),
  },
];


