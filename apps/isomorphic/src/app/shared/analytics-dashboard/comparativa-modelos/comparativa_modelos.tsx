import { routes } from '@/config/routes';
import { getColumnsCModelos} from './columns';
import BasicTableWidget from '@/app/shared/controlled-table/basic-table-widget';
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Basic Table'),
};

export const orderData = [
  {
    id: '3413',
    marca: 'Mabe',
    modelo: '825DFSDFS',
    plazo: 18,
    efectivo: 180,
    cuotas: 20
  },
  {
    id: '3455',
    marca: 'Mabe',
    modelo: '825DFSDFS',
    plazo: 18,
    efectivo: 180,
    cuotas: 20
  },
  {
    id: '3425',
    marca: 'Mabe',
    modelo: '825DFSDFS',
    plazo: 18,
    efectivo: 180,
    cuotas: 20
  },
  {
    id: '9192',
    marca: 'Mabe',
    modelo: '825DFSDFS',
    plazo: 18,
    efectivo: 180,
    cuotas: 20
  },]

export default function ComparativaModelos() {
  return (
      <div className="grid grid-cols-1 gap-6 3xl:gap-8">
        <BasicTableWidget
          variant="elegant"
          title="Classic Table"
          data={orderData}
          // @ts-ignore
          getColumns={getColumnsCModelos}
          enableSearch={false}
        />
      </div>
  );
}
