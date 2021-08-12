import { useQuery } from 'react-query';
import API from '@utils/api';

export interface ICurrencyData {
  [key: string]: string;
}

interface IUseCurrency {
  data: ICurrencyData;
}

const getCurrencies = async (): Promise<ICurrencyData | Error | null> => {
  const result = await API.get(`/currencies.json?app_id=${process.env.OPEN_EXCHANGE_APP_ID}`);
  return result.data;
};

const useCurrency = (): IUseCurrency => {
  return useQuery('currency', getCurrencies);
};

export { useCurrency };
