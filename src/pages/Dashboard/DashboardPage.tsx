import board from './dashboard.module.css';
import SummaryCards from '../../components/dashboard/SummaryCards';
import type { SummaryData } from '../../components/dashboard/SummaryCards';
import { usePayments } from '../../hooks/usePayments';
import type { PaymentListRes } from '../../types/payment';

const DashboardPage = () => {

  const { data, isLoading, isError } = usePayments();

  if (isLoading){
    return (
      <div className={board.state}>
        Loading...
      </div>
    )
  }

  if (isError || !data){
    return (
      <div className={board.state}>
        로딩실패...
      </div>
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
      <SummaryCards data={summary} />
    </div>
  );
}
export default DashboardPage;