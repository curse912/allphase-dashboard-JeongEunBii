import board from './dashboard.module.css';
import { usePayments } from '../../hooks/usePayments';
import type { PaymentListRes } from '../../types/payment';
import type { SummaryData } from '../../components/dashboard/SummaryCards';

// 대시보드 카드
import SummaryCards from '../../components/dashboard/SummaryCards';
import PaymentChart from '../../components/dashboard/PaymentChart';
import RecentChart from '../../components/dashboard/RecentChart';
import PaymentTable from '../../components/dashboard/paymentTable';

const DashboardPage = () => {

  const { data, isLoading, isError } = usePayments();

  if (isLoading){
    return (
      <div className={board.state}>Loading...</div> 
    )
  }

  if (isError || !data){
    return (
      <div className={board.state}>Loading Error... </div>
    )
  }
  
  const paymensts : PaymentListRes[] = data.data ?? [];

  const totalCount = paymensts.length;
  const successPayments = paymensts.filter((p) => p.status === 'SUCCESS');
  const cancelledPayments = paymensts.filter((p) => p.status === 'CANCELLED');

  const totalAmount = successPayments.reduce((sum, p) => {
    const n = Number(p.amount) ;
    return sum + (Number.isNaN(n) ? 0 : n);
  }, 0);

  const successRate = totalCount === 0 ? 0 : (successPayments.length / totalCount) * 100;
  const refundRate = totalCount === 0 ? 0 : (cancelledPayments.length / totalCount) * 100;

  const summary : SummaryData = {
    totalAmount,
    totalCount,
    successRate,
    refundRate
  };


  return (
    <div className={board.wrapper}>
      <div className={board.container}>
        <SummaryCards data={summary} />
      </div>
      <div className={board.row}>
        <div className={board.containerH}>
          <PaymentChart payments={paymensts} />
        </div>
        <div className={board.containerH}>
          <RecentChart payments={paymensts} />
        </div>
      </div>
      <div className={board.container}>
        <PaymentTable payments={paymensts} />
      </div>
    </div>
  );
}

export default DashboardPage;