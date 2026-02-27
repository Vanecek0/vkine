import { useTranslation } from 'next-i18next'
import { withI18n } from '../helper/with18n'

export default function Custom404() {
  const { t } = useTranslation()

  return (
    <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "100vh"}}>
      <h1 className='text-center text-white'>{t('errors.notFound')}</h1>
      <h2 className='text-center text-gray'>404 - page not found</h2>
    </div>

  );
}

export const getStaticProps = withI18n();