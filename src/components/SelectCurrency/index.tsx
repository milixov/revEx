import React, { useMemo, useState, useRef } from 'react';

import UIKit from 'uikit';

//type
import { ICurrencyData } from '@hooks/useCurrencies';

//i18n
import { useTranslation } from 'react-i18next';
import { messageExtractor as me } from '@utils/message';

//style
import style from './style.scss';

export interface ISelectCurrency {
  id: string | null;
  data: ICurrencyData | null;
  value: string | null;
  onChange?: (value: string) => void;
  valueText: number | 0;
  onChangeText?: (value: number) => void;
}

const modalMsg = 'components.selectCurrency.modal';

const SelectCurrency = (props: ISelectCurrency): JSX.Element => {
  const { id, data, value, onChange, valueText, onChangeText } = props;
  const { t } = useTranslation();

  const modal = useRef(null);
  const handleCloseModal = (value: string): void => {
    if (modal?.current) {
      setSearch('');
      UIKit?.modal(modal?.current)?.hide();
      onChange(value);
    }
  };

  const [search, setSearch] = useState<string>('');
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target.value);
  };

  const listData = useMemo((): ICurrencyData => {
    if (data) {
      const searchTerm = search.toLowerCase().trim();
      return Object.keys(data)
        .filter(
          (item: string) => item.toLowerCase().includes(searchTerm) || data[item].toLowerCase().includes(searchTerm),
        )
        .reduce((acc: ICurrencyData, value) => {
          acc[value] = data[value];
          return acc;
        }, {});
    }
  }, [search, data]);

  return (
    <>
      <div className={style.selectCurrency}>
        <input
          className={`uk-input uk-form-large ${style.input}`}
          type="number"
          pattern="[0-9]+"
          step="0.01"
          value={valueText}
          onChange={(e) => onChangeText(parseFloat(e.target.value))}
        />
        <div className={style.divider} />
        <button
          disabled={!value}
          className={`uk-button uk-button-default ${style.button}`}
          uk-toggle={`target: #${id}Modal`}
        >
          {value ? <span>{value}</span> : <div uk-spinner="ratio: 0.75" />}
          {value && <span uk-icon="chevron-down" />}
        </button>
      </div>
      <div ref={modal} id={`${id}Modal`} className="uk-flex-top" uk-modal="true">
        <div className={`uk-modal-dialog uk-margin-auto-vertical ${style.modal}`}>
          <div className={`uk-modal-header ${style.header}`}>
            <h4 className="uk-text-bold">{t('components.selectCurrency.modal.title')}</h4>
            <div className="uk-inline uk-width-expand">
              {search.length > 0 && (
                <a className="uk-form-icon uk-form-icon-flip" onClick={() => setSearch('')} uk-icon="icon: close"></a>
              )}
              <input
                className="uk-input"
                type="text"
                placeholder={t(me(modalMsg, 'search'))}
                value={search}
                onChange={handleSearchChange}
              />
            </div>
          </div>
          <div className={`uk-modal-body ${style.body}`}>
            <div className={`${style.list}`}>
              {listData &&
                Object.keys(listData).map((item, index) => (
                  <div key={`${id}_${item}`} onClick={() => handleCloseModal(item)} className={style.item}>
                    <section>
                      <div className="uk-text-default uk-text-bold">{item}</div>
                      <span className="uk-text-muted">{listData[item]}</span>
                    </section>
                    {item === value && <div className={style.dot} />}
                  </div>
                ))}
            </div>
          </div>
          <div className={`uk-modal-footer`}>
            <button
              className="uk-button uk-button-text uk-width-expand"
              onClick={() => UIKit?.modal(modal?.current)?.hide()}
            >
              {t(me(modalMsg, 'cancel'))}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectCurrency;
