'use client'
import WebsiteMetrics from '@/app/shared/analytics-dashboard/website-metrics/table-widget';
import AccountRetention from '@/app/shared/analytics-dashboard/account-retention';
import Acquisition from '@/app/shared/analytics-dashboard/acquisition';
import ConversionRates from '@/app/shared/analytics-dashboard/conversion-rates';
import DeviceSessions from '@/app/shared/analytics-dashboard/device-sessions';
import GoalAccomplished from '@/app/shared/analytics-dashboard/goal-accomplished';
import StatCards from '@/app/shared/analytics-dashboard/stat-cards';
import TopTrafficSource from '@/app/shared/analytics-dashboard/top-traffic-source';
import UserMetrics from '@/app/shared/analytics-dashboard/user-metrics';
import PageMetrics from '@/app/shared/analytics-dashboard/page-metric/table-widget';
import EfectivoPorEmpresa from './efectivo_por_empresa';
import EvolutivoEfectivo from './evolutivo_efectivo';
import ComparativaCrecos from './comparativa-crecos/comparativa_crecos';
import ComparativaModelos from './comparativa-de-modelos/comparativa_modelos';
import Efectivo_Empresa_Pie from './efectivo_por_empresa_pie';
import PageHeader from '../page-header';
import CajaFiltro from './filtros/caja-filtro';
import { Button, MultiSelect } from 'rizzui';
import ComparativaTabs from './comparativa_pestañas';
import { socialMediaOptions } from '@/data/social-media-dashboard-data';
import { renderCustomSocialMultiOption, renderDisplayValue } from '../social-media/dashboard/utils';
import { useEffect, useState } from 'react';
import { Producto, obtenerProductobyId } from '@/app/services/producto.service';
import { useParams } from 'next/navigation';
import { loginUsuarioSi, Usuario, UsuarioLogin } from '@/app/services/usuario.service';
import Meses, {
  Filtro,
  obtenerAñosFiltro,
  obtenerEmpresasFiltro,
  obtenerMarcasFiltro,
  obtenerGamasFiltro,
  obtenerCaracteristicasFiltro,
  obtenerModelosFiltro,
} from '@/app/services/consulta.service';

const id = "8";
const FiltrosComponent = () => {
  // Estados para almacenar los datos de cada filtro
  const [años, setAños] = useState<Filtro[]>([]);
  const [empresas, setEmpresas] = useState<Filtro[]>([]);
  const [marcas, setMarcas] = useState<Filtro[]>([]);
  const [gamas, setGamas] = useState<Filtro[]>([]);
  const [caracteristicas, setCaracteristicas] = useState<Filtro[]>([]);
  const [modelos, setModelos] = useState<Filtro[]>([]);

  // Función para agregar la opción "Quitar todas" a un arreglo de opciones
  const agregarQuitarTodas = (opciones: Filtro[]): Filtro[] => {
    return [{ value: 'quitar_todas', label: 'Quitar todas' }, ...opciones];
  };

  // Efecto para cargar los datos al montar el componente
  useEffect(() => {
    // Obtener años
    obtenerAñosFiltro(id)
      .then((data) => setAños(agregarQuitarTodas(data)))
      .catch((error) => console.error('Error al obtener años:', error));

    // Obtener empresas
    obtenerEmpresasFiltro(id)
      .then((data) => setEmpresas(agregarQuitarTodas(data)))
      .catch((error) => console.error('Error al obtener empresas:', error));

    // Obtener marcas
    obtenerMarcasFiltro(id)
      .then((data) => setMarcas(agregarQuitarTodas(data)))
      .catch((error) => console.error('Error al obtener marcas:', error));

    // Obtener gamas
    obtenerGamasFiltro(id)
      .then((data) => setGamas(agregarQuitarTodas(data)))
      .catch((error) => console.error('Error al obtener gamas:', error));

    // Obtener características
    obtenerCaracteristicasFiltro(id)
      .then((data) => setCaracteristicas(agregarQuitarTodas(data)))
      .catch((error) => console.error('Error al obtener características:', error));

    // Obtener modelos
    obtenerModelosFiltro(id)
      .then((data) => setModelos(agregarQuitarTodas(data)))
      .catch((error) => console.error('Error al obtener modelos:', error));
  }, []);
};


export default function AnalyticsDashboard() {
  const [usuario, setUsuario] = useState<UsuarioLogin | null>(null);

  const user = {
    usuario: 'alexischuga12345@gmail.com', // Asegúrate de usar la propiedad correcta (no "usuario")
    password: 'y0SW5mER'
  };

  useEffect(() => {
    loginUsuarioSi(user)
      .then((data) => {
        setUsuario(data); 
        console.log('Token VVV:', localStorage.getItem('token'));
      })
      .catch((error) => {
        console.error('Error al hacer login:', error);
      });
  }, []);


  const id = "8";
  const [producto, setProducto] = useState<Producto | null>(null);
  useEffect(() => {
    obtenerProductobyId(id)
      .then((data) => {
        setProducto(data); // Guarda los datos en el estado.
      })
      .catch((error) => {
        console.error('Error al obtener los Productos:', error);
      });
  }, [id]); 
  const pageHeader = {
    title: producto?.nombre,
    breadcrumb: [
    ],
  };


  // Función para agregar la opción "Quitar todas" a un arreglo de opciones
  const agregarQuitarTodas = (opciones: Filtro[]): Filtro[] => {
    return [{ value: 'quitar_todas', label: 'Quitar todas' }, ...opciones];
  };

  const [años, setAños] = useState<Filtro[]>([]);
  const meses = agregarQuitarTodas(Meses)
  const [empresas, setEmpresas] = useState<Filtro[]>([]);
  const [marcas, setMarcas] = useState<Filtro[]>([]);
  const [gamas, setGamas] = useState<Filtro[]>([]);
  const [caracteristicas, setCaracteristicas] = useState<Filtro[]>([]);
  const [modelos, setModelos] = useState<Filtro[]>([]);
  // Efecto para cargar los datos al montar el componente
  useEffect(() => {
    // Obtener años
    obtenerAñosFiltro(id)
      .then((data) => setAños(agregarQuitarTodas(data)))
      .catch((error) => console.error('Error al obtener años:', error));
  
    // Obtener empresas
    obtenerEmpresasFiltro(id)
      .then((data) => setEmpresas(agregarQuitarTodas(data)))
      .catch((error) => console.error('Error al obtener empresas:', error));
  
    // Obtener marcas
    obtenerMarcasFiltro(id)
      .then((data) => setMarcas(agregarQuitarTodas(data)))
      .catch((error) => console.error('Error al obtener marcas:', error));
  
    // Obtener gamas
    obtenerGamasFiltro(id)
      .then((data) => setGamas(agregarQuitarTodas(data)))
      .catch((error) => console.error('Error al obtener gamas:', error));
  
    // Obtener características
    obtenerCaracteristicasFiltro(id)
      .then((data) => setCaracteristicas(agregarQuitarTodas(data)))
      .catch((error) => console.error('Error al obtener características:', error));
  
    // Obtener modelos
    obtenerModelosFiltro(id)
      .then((data) => setModelos(agregarQuitarTodas(data)))
      .catch((error) => console.error('Error al obtener modelos:', error));
  }, [id]); // Se ejecutará solo cuando `id` cambie
  

  const [stateAños, setStateAños] = useState<string[]>([]);
  const [stateMeses, setStateMeses] = useState<string[]>([]);
  const [stateEmpresas, setStateEmpresas] = useState<string[]>([]);
  const [stateMarcas, setStateMarcas] = useState<string[]>([]);
  const [stateGamas, setStateGamas] = useState<string[]>([]);
  const [stateCaracteristicas, setStateCaracteristicas] = useState<string[]>([]);
  const [stateModelos, setStateModelos] = useState<string[]>([]);

  const handleSelectionChangeAños = (selected: string[]) => {
    if (selected.includes('quitar_todas')) {
      setStateAños([]);
    } else {
      setStateAños(selected);
    }
    console.log("Opciones seleccionadas:", selected);
  };

  const handleSelectionChangeMeses = (selected: string[]) => {
    if (selected.includes('quitar_todas')) {
      setStateMeses([]);
    } else {
      setStateMeses(selected);
    }
    console.log("Opciones seleccionadas:", selected);
  };
  const handleSelectionChangeEmpresas = (selected: string[]) => {
    if (selected.includes('quitar_todas')) {
      setStateEmpresas([]);
    } else {
      setStateEmpresas(selected);
    }
    console.log("Opciones seleccionadas:", selected);
  };
  const handleSelectionChangeMarcas = (selected: string[]) => {
    if (selected.includes('quitar_todas')) {
      setStateMarcas([]);
    } else {
      setStateMarcas(selected);
    }
    console.log("Opciones seleccionadas:", selected);
  };
  const handleSelectionChangeGamas = (selected: string[]) => {
    if (selected.includes('quitar_todas')) {
      setStateGamas([]);
    } else {
      setStateGamas(selected);
    }
    console.log("Opciones seleccionadas:", selected);
  };

  const handleSelectionChangeCaracteristicas = (selected: string[]) => {
    if (selected.includes('quitar_todas')) {
      setStateCaracteristicas([]);
    } else {
      setStateCaracteristicas(selected);
    }
    console.log("Opciones seleccionadas:", selected);
  };
  const handleSelectionChangeModelos = (selected: string[]) => {
    if (selected.includes('quitar_todas')) {
      setStateModelos([]);
    } else {
      setStateModelos(selected);
    }
    console.log("Opciones seleccionadas:", selected);
  };



  return (
    <div className="@container">
      <h1 className="text-2xl font-bold font-lexend mb-4 text-center">{pageHeader.title}</h1>
      <div className="grid grid-cols-1 gap-6 @4xl:grid-cols-2 @7xl:grid-cols-12 3xl:gap-8">
        <StatCards className="grid-cols-1 @xl:grid-cols-2 @4xl:col-span-2 @6xl:grid-cols-3 @7xl:col-span-12" />
      </div> <br />
      <div className="grid grid-cols-1 gap-3 @4xl:grid-cols-8 @7xl:grid-cols-8 3xl:gap-8" style={{ alignItems: "center" }}>
        <CajaFiltro className="@4xl:col-span-1 @7xl:col-span-1" key="filtro_años">
          <div className="w-full text-center font-semibold">Año</div>
          <MultiSelect
          key={`multi-select-años-${stateAños.join(",")}`}
            value={stateAños}
            onChange={handleSelectionChangeAños}
            options={años}
            placeholder="Select Platform.."
            selectClassName="ring-0 min-h-9 h-9 w-full px-0"
            selectedItemClassName="hidden first:contents border-0"

          />
        </CajaFiltro>
        <CajaFiltro className="@4xl:col-span-1 @7xl:col-span-1">
          <div className="w-full text-center font-semibold">Mes</div>
          <MultiSelect
          key={`multi-select-años-${stateMeses.join(",")}`}
            value={stateMeses}
            onChange={handleSelectionChangeMeses}
            options={meses}
            placeholder="Select Platform.."
            selectClassName="ring-0 min-h-9 h-9 w-full px-0"
            selectedItemClassName="hidden first:contents border-0"
          />
        </CajaFiltro>
        <CajaFiltro className="@4xl:col-span-1 @7xl:col-span-1">
          <div className="w-full text-center font-semibold">Empresa</div>
          <MultiSelect
           key={`multi-select-años-${stateEmpresas.join(",")}`}
            value={stateEmpresas}
            onChange={handleSelectionChangeEmpresas}
            options={empresas}
            placeholder="Select Platform.."
            selectClassName="ring-0 min-h-9 h-9 w-full px-0"
            selectedItemClassName="hidden first:contents border-0"
          />
        </CajaFiltro>
        <CajaFiltro className="@4xl:col-span-1 @7xl:col-span-1">
          <div className="w-full text-center font-semibold">Marca</div>
          <MultiSelect
           key={`multi-select-años-${stateMarcas.join(",")}`}
            value={stateMarcas}
            onChange={handleSelectionChangeMarcas}
            options={marcas}
            placeholder="Select Platform.."
            selectClassName="ring-0 min-h-9 h-9 w-full px-0"
            selectedItemClassName="hidden first:contents border-0"
          />
        </CajaFiltro>
        <CajaFiltro className="@4xl:col-span-1 @7xl:col-span-1">
          <div className="w-full text-center font-semibold">Gama</div>
          <MultiSelect
           key={`multi-select-años-${stateGamas.join(",")}`}
            value={stateGamas}
            onChange={handleSelectionChangeGamas}
            options={gamas}
            placeholder="Select Platform.."
            selectClassName="ring-0 min-h-9 h-9 w-full px-0"
            selectedItemClassName="hidden first:contents border-0"
          />
        </CajaFiltro>
        <CajaFiltro className="@4xl:col-span-1 @7xl:col-span-1">
          <div className="w-full text-center font-semibold">Caracteristica</div>
          <MultiSelect
           key={`multi-select-años-${stateCaracteristicas.join(",")}`}
            value={stateCaracteristicas}
            onChange={handleSelectionChangeCaracteristicas}
            options={caracteristicas}
            optionCheckBox={true}
            placeholder="Select Platform.."
            searchable={true} 
            selectClassName="ring-0 min-h-9 h-9 w-full px-0"
            selectedItemClassName="hidden first:contents border-0"
          />
        </CajaFiltro>
        <CajaFiltro className="@4xl:col-span-1 @7xl:col-span-1">
          <div className="w-full text-center font-semibold">Modelo</div>
          <MultiSelect
           key={`multi-select-años-${stateModelos.join(",")}`}
            value={stateModelos}
            onChange={handleSelectionChangeModelos}
            options={modelos}
            placeholder="Select Platform.."
            searchable={true}
            selectClassName="ring-0 min-h-9 h-9 w-full px-0"
            selectedItemClassName="hidden first:contents border-0"
          />
        </CajaFiltro>

        <Button size="xl" className="w-full">
          Buscar
        </Button>
      </div> <br />
      <div className="grid grid-cols-1 gap-6 @4xl:grid-cols-12 @7xl:grid-cols-12 3xl:gap-8">
        <EfectivoPorEmpresa className="@4xl:col-span-7 @7xl:col-span-7" />
        <Efectivo_Empresa_Pie className="@4xl:col-span-5 @7xl:col-span-5" />
      </div>
      <br />
      <div className="grid grid-cols-1 gap-6 @4xl:grid-cols-1 @7xl:grid-cols-1 3xl:gap-8">
        <EvolutivoEfectivo className="@4xl:col-span-1 @7xl:col-span-1" />
      </div>
      <br />
      <div className="grid grid-cols-1 gap-6 @4xl:grid-cols-1 @7xl:grid-cols-1 3xl:gap-8">
        <ComparativaTabs className="@4xl:col-span-1 @7xl:col-span-1 " />
      </div>
      {/* 
      <br />
      <div className="grid grid-cols-1 gap-6 @4xl:grid-cols-2 @7xl:grid-cols-12 3xl:gap-8">


        <Acquisition className="@7xl:col-span-4" />

        <DeviceSessions className="@7xl:col-span-4" />

        <Acquisition className="@7xl:col-span-4" />

        <DeviceSessions className="@7xl:col-span-4" />

        <TopTrafficSource className="@7xl:col-span-4" />

        <UserMetrics className="@4xl:col-span-2 @7xl:col-span-12" />

        <ConversionRates className="@7xl:col-span-6 @[90rem]:col-span-7 @[112rem]:col-span-8" />

        <GoalAccomplished className="@4xl:col-start-2 @4xl:row-start-3 @7xl:col-span-6 @7xl:col-start-auto @7xl:row-start-auto @[90rem]:col-span-5 @[112rem]:col-span-4" />

        <PageMetrics className="@4xl:col-span-2 @4xl:row-start-5 @7xl:col-span-12 @7xl:row-start-auto @[90rem]:col-span-7 @[112rem]:col-span-8" />

        <AccountRetention className="@7xl:col-span-12 @[90rem]:col-span-5 @[112rem]:col-span-4" />

        <WebsiteMetrics className="@4xl:col-span-2 @7xl:col-span-12" />
      </div>*/}
    </div>
  );
}
