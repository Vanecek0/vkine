import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown } from 'react-bootstrap';
import ComboBox from '../combo-box/ComboBox';
import { useTranslation } from 'next-i18next';
import i18next from 'i18next';
import tmdbApi from '../../pages/api/tmdbApi';
import { ArrowClockwise } from 'react-bootstrap-icons';
import languageDropdownStyle from './LanguageDropdown.module.css'
import { useRouter } from 'next/router';

const LanguageDropdown = () => {
  const { t } = useTranslation('translations');
  const router = useRouter();
  const language = router.locale;
  const [regions, setRegions] = useState([]);
  const [changing, setChanging] = useState(false);
  const languages = [
    {
      code: 'cs',
      name: 'Čeština',
      iso: 'cs_CZ',
      country_code: 'cz'
    },
    {
      code: 'sk',
      name: 'Slovenština',
      iso: 'sk_SK',
      country_code: 'sk'
    },
    {
      code: 'en',
      name: 'Angličtina (Spojené státy)',
      iso: 'en_US',
      country_code: 'us'
    },
  ];

  useEffect(() => {
    const getRegions = async () => {
      const params = { language: language }
      const formatedArr = [{ label: t(['header.selectRegionText']), value: '' }];
      try {
        const response = await tmdbApi.getRegions({ params });
        response.results.map((region, i) => {
          formatedArr.push({ label: region.native_name, value: region.iso_3166_1 });
        })
        setRegions(formatedArr)
      } catch (e) {
        return e;
      }
    }
    getRegions();
  }, [language])

  return (
    <Dropdown className={languageDropdownStyle.languageSelector}>
      <Dropdown.Toggle className='text-white' variant="link" id="dropdown-basic">
        {languages.filter(lang => lang.code === language).map(({ country_code }, i) => (
          <div key={i} className='d-inline'>
            <span className={`fi fi-${country_code} me-2`} />
          </div>
        ))}
      </Dropdown.Toggle>
      <Dropdown.Menu className='bg-dark text-white p-3'>
        <span className={languageDropdownStyle.dropdownTitle}>{t(['header.languageTitle'])}</span>
        <div className={languageDropdownStyle.languageSelect}>
          {languages.map(({ code, name, country_code }) => (
            <Dropdown.Item key={country_code} className={`text-white ${language == code && languageDropdownStyle.selected}`} onClick={() => router.push(router.asPath, undefined, {locale: code})}><span className={`fi fi-${country_code} me-2`} />{name}</Dropdown.Item>
          ))}
        </div>
        <span className={languageDropdownStyle.dropdownTitle}>{t(['header.regionText'])}</span>
        <div className={languageDropdownStyle.regionSelect}>
          {<ComboBox placeholder={t(['header.regionText'])} items={regions} handleChange={setChanging} setToLocalStorage={true} localStorageTitle="REGION_SELECTED_OPTION"></ComboBox>}
        </div>
        <div className='d-flex justify-content-center'>
          <button type="button" onClick={() => window.location.reload(false)} className='btn btn-primary mt-2 mb-2 w-100' disabled={!changing ? true : false}>Znovu načíst stránku <ArrowClockwise /></button>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default LanguageDropdown