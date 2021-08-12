import { useQuery } from 'react-query';
import API from '@utils/api';
import { REFETCH_INTERVAL } from '@config/enum';

export interface IRateData {
  [key: string]: number;
}

interface IUseRate {
  data: IRateData;
}

const getRates = async (): Promise<IRateData | Error | null> => {
  const { data } = await API.get(`/latest.json?app_id=${process.env.OPEN_EXCHANGE_APP_ID}`);
  return data?.rates;
};

const useRates = (): IUseRate => {
  return useQuery('rates', getRates, { refetchInterval: REFETCH_INTERVAL.DEFAULT });
};

export { useRates };
