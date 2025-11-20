import { useEffect, useState } from 'react';
import merchant from './MerchantsPage.module.css';
import { useMerchantList } from '../../hooks/useMerchants';
import { usePayments } from '../../hooks/usePayments';
import MerchantList from '../../components/merchants/MerchantList';
import MerchantDetailPanel from '../../components/merchants/MerchantDetailPanel';
import type { MerchantListRes } from '../../types/merchant';
import type { PaymentListRes } from '../../types/payment';

const MerchantsPage = () => {

  const { data: merchantData, isLoading: isMerchantLoading, isError: isMerchantError } =
    useMerchantList();
  const { data: paymentData, isLoading: isPaymentLoading, isError: isPaymentError } =
    usePayments();

  const merchants: MerchantListRes[] = merchantData?.data ?? [];
  const payments: PaymentListRes[] = paymentData?.data ?? [];

  const [selectedMchtCode, setSelectedMchtCode] = useState<string | null>(null);

  // 리스트가 로딩 완료되면 첫 번째 가맹점 선택
  useEffect(() => {
    if (merchants.length > 0 && !selectedMchtCode) {
      setSelectedMchtCode(merchants[0].mchtCode);
    }
  }, [merchants, selectedMchtCode]);

  if (isMerchantLoading || isPaymentLoading) {
    return <div className={merchant.state}>가맹점/결제 데이터를 불러오는 중입니다...</div>;
  }

  if (isMerchantError || isPaymentError) {
    return <div className={merchant.state}>데이터를 불러오지 못했습니다.</div>;
  }

  if (merchants.length === 0) {
    return <div className={merchant.state}>등록된 가맹점이 없습니다.</div>;
  }

  return (
    <div className={merchant.wrapper}>
      <section className={merchant.header}>
        <div>
          <h1 className={merchant.title}>가맹점 정보</h1>
          <p className={merchant.subtitle}>
            가맹점 목록을 조회하고 상세 정보를 확인할 수 있습니다.
          </p>
        </div>
      </section>

      <div className={merchant.content}>
        <div className={merchant.listColumn}>
          <MerchantList
            merchants={merchants}
            selectedMchtCode={selectedMchtCode}
            onSelect={setSelectedMchtCode}
          />
        </div>

        <div className={merchant.detailColumn}>
          <MerchantDetailPanel mchtCode={selectedMchtCode} payments={payments} />
        </div>
      </div>
    </div>
  );
};

export default MerchantsPage;
