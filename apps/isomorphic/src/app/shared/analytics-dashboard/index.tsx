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

export default function AnalyticsDashboard() {
  return (
    <div className="@container">
      <div className="grid grid-cols-1 gap-6 @4xl:grid-cols-2 @7xl:grid-cols-12 3xl:gap-8">
        <StatCards className="grid-cols-1 @xl:grid-cols-2 @4xl:col-span-2 @6xl:grid-cols-4 @7xl:col-span-12" />
      </div> <br />
      <div className="grid grid-cols-1 gap-6 @4xl:grid-cols-12 @7xl:grid-cols-12 3xl:gap-8">
        <EfectivoPorEmpresa className="@4xl:col-span-5 @7xl:col-span-6" />

        <EvolutivoEfectivo className="@4xl:col-span-7 @7xl:col-span-6" />
      </div>
      <br />
      <div className="grid grid-cols-1 gap-6 @4xl:grid-cols-1 @7xl:grid-cols-1 3xl:gap-8">
      <ComparativaCrecos className="@4xl:col-span-1 @7xl:col-span-1 " />
      </div>
      <br />
      <div className="grid grid-cols-1 gap-6 @4xl:grid-cols-1 @7xl:grid-cols-1 3xl:gap-8">
      <ComparativaModelos className="@4xl:col-span-1 @7xl:col-span-1 " />
      </div>
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
      </div>
    </div>
  );
}
