import type React from 'react';
import type { MerchantListRes } from '../../types/merchant';
import list from './MerchantList.module.css';

interface MerchantListProps {
  merchants: MerchantListRes[];
  selectedMchtCode: string | null;
  onSelect: (mchtCode: string) => void;
}

const getMerchantStatusClass = (status: string) => {
  const upper = status.toUpperCase();
  if (upper === 'READY') return list.statusReady;
  if (upper === 'ACTIVE') return list.statusActive;
  if (upper === 'INACTIVE') return list.statusInactive;
  if (upper === 'CLOSED') return list.statusClosed;
  return list.statusDefault;
};

const getMerchantStatusLabel = (status: string) => {
  const upper = status.toUpperCase();
  if (upper === 'READY') return '대기';
  if (upper === 'ACTIVE') return '영업중';
  if (upper === 'INACTIVE') return '중지';
  if (upper === 'CLOSED') return '폐업';
  return status;
};

const MerchantList: React.FC<MerchantListProps> = ({
  merchants,
  selectedMchtCode,
  onSelect,
}) => {
  return (
    <div className={list.container}>
      <div className={list.header}>
        <h2 className={list.title}>가맹점 목록</h2>
        <span className={list.count}>
          {merchants.length.toLocaleString('ko-KR')}개
        </span>
      </div>

      <div className={list.list}>
        {merchants.map((m) => {
          const isActive = m.mchtCode === selectedMchtCode;

          return (
            <button
              key={m.mchtCode}
              type="button"
              className={
                list.item + ' ' + (isActive ? list.itemActive : '')
              }
              onClick={() => onSelect(m.mchtCode)}
            >
              <div className={list.itemHeader}>
                <span className={list.mchtName}>{m.mchtName}</span>
                <span className={list.mchtCode}>{m.mchtCode}</span>
              </div>
              <div className={list.itemMeta}>
                <span className={list.badge}>{m.bizType}</span>
                <span className={`${list.status} ${getMerchantStatusClass(m.status)}`} >
                    {getMerchantStatusLabel(m.status)}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MerchantList;
