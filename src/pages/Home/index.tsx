import React, { useEffect, useState } from 'react';

import SelectCurrency from '@components/SelectCurrency';

//hooks
import { useCurrency } from '@hooks/useCurrencies';
import { useRates } from '@hooks/useRates';

//i18n
import { useTranslation } from 'react-i18next';
import { messageExtractor as me } from '@utils/message';

import style from './style.scss';

const titleMsg = 'home.title';

const Home = (): JSX.Element => {
  const { t } = useTranslation();

  const [sell, setSell] = useState<boolean>(false);

  const [base, setBase] = useState<string | null>(null);
  const [baseInput, setBaseInput] = useState<number>(0);

  const [rate, setRate] = useState<string | null>(null);
  const [rateInput, setRateInput] = useState<number>(0);

  const { data: currencies } = useCurrency();
  const { data: rates } = useRates();

  useEffect(() => {
    if (currencies) {
      if (currencies.hasOwnProperty('USD')) {
        setBase('USD');
      }

      if (currencies.hasOwnProperty('EUR')) {
        setRate('EUR');
      }
    }
  }, [currencies]);

  useEffect(() => {
    if (base && rates) {
      setBaseInput(rates[base]);
    }
  }, [base, rates]);

  useEffect(() => {
    if (rate && rates) {
      setRateInput(rates[rate]);
    }
  }, [rate, rates]);

  return (
    <div>
      <div className={style.header}>
        <h2 className="uk-modal-title uk-text-bold">
          {`${t(me(titleMsg, sell ? 'sell' : 'buy')).toUpperCase()} ${base || ''}`}
        </h2>
      </div>
      <div className={style.body}>
        <SelectCurrency
          id="base"
          data={currencies}
          value={base}
          onChange={(value: string) => setBase(value)}
          valueText={baseInput}
          onChangeText={(value) => setBaseInput(value)}
        />
        <button className={`uk-button uk-button-secondary ${style.switch}`} onClick={() => setSell(!sell)}>
          <span uk-icon={sell ? 'arrow-up' : 'arrow-down'} />
        </button>
        <SelectCurrency
          id="rate"
          data={currencies}
          value={rate}
          onChange={(value: string) => setRate(value)}
          valueText={rateInput}
          onChangeText={(value: number) => setRateInput(value)}
        />
      </div>
    </div>
  );
};

export default Home;
