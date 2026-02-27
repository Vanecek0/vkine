import { useEffect, useState } from 'react'
import config from '../../pages/api/config';
import tmdbApi from '../../pages/api/tmdbApi';
import { useRouter } from 'next/router';
import 'react-lazy-load-image-component/src/effects/blur.css';
import personStyle from './Person.module.css'
import dateFormat from "dateformat";
import { Facebook, Instagram, Link45deg, Twitter } from 'react-bootstrap-icons';
import CastMedia from '../../components/cast-media/CastMedia';
import CastTimeline from '../../components/cast-timeline/CastTimeline';
import noImage from '../../assets/noimage_person.png'
import ProgressiveLoader from '../../components/progressive-loader/ProgressiveLoader';
import { useTranslation } from 'next-i18next';
import GendersConst from '../../components/constants/Genders';
import LanguageFallback from '../../components/universal_components/language-fallback/LanguageFallback';
import PageNotFound from '../page-not-found/PageNotFound';
import Head from 'next/head';
import { withI18n } from '../../helper/with18n';

const Person = () => {
  const router = useRouter()
  const { isReady } = router;
  const { personID } = router.query;
  const [item, setItem] = useState();
  const [social, setSocial] = useState({});
  const language = router.locale;
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation('translations')
  var bg = config.noImage(noImage);
  const calculate_age = (birth, death) => {
    return Math.abs(death.getUTCFullYear() - birth.getUTCFullYear());
  }

  useEffect(() => {
    const getPeople = async () => {
      const params = { language: language };
      try {
        const response = await tmdbApi.getPeople(personID, { params })
        setItem(response);
        const nameDashed = response.name.toLowerCase().normalize("NFD")
          .replace(/[\u0300-\u036f]+/g, '')
          .replace(/\s+/g, '-')
          .replace(/–/g, '-')
          .replace(/[\/\\"':;,\.\-\!\?\(\)\[\]\{\}\+\*\/=<>\|%~^&#@$€£¥]+/g, '-')
          .replace(/\.{2,}/g, '-')
          .replace(/-{2,}/g, '-')
          .replace(/-+$/g, '');
        (personID != (response.id + '-' + nameDashed)) ? router.push({ pathname: '../person/' + response.id + '-' + nameDashed }) : null;
        setLoading(false)
      } catch (e) { setItem({ status_code: 34 }); setLoading(false); }
      window.scrollTo(0, 0)
    }
    const getPeopleSocial = async () => {
      const response = await tmdbApi.getPeopleSocial(personID)
      setSocial(response);
    }
    if (isReady) {
      getPeopleSocial();
      getPeople();
    }
  }, [isReady, personID, language])

  if (!isReady) {
    return null;
  }

  return (
    <div className={`${loading ? 'pending' : 'peopleContent'}`}>
      {
        item && (
          <>
            {item.status_code !== 34 ? (
              <>
                <Head>
                  <title>{item.name} – Vkine.cz</title>
                  <meta property="og:title" content={`${item.name} – Vkine.cz`}></meta>
                  <meta name='description' content={t('head.description')}></meta>
                  <meta property="og:description" content={t('head.description')}></meta>
                  <meta name='keywords' content={t('head.keywords')}></meta>
                  <link rel="canonical" href={`https://www.vkine.cz/`}></link>
                  <meta property="og:locale" content="cs_CZ"></meta>
                  <meta property="og:locale:alternate" content="sk_SK"></meta>
                  <meta property="og:locale:alternate" content="en_US"></meta>
                  <meta property="og:type" content="website"></meta>
                  <meta property="og:url" content={`https://www.vkine.cz/`}></meta>
                  <meta property="og:site_name" content={`${item.name} – Vkine.cz`}></meta>
                  <meta property="og:image" content="https://www.vkine.cz/vkine_meta.png"></meta>
                  <meta property="og:image:secure_url" content="https://www.vkine.cz/vkine_meta.png"></meta>
                  <meta property="og:image:width" content="1588"></meta>
                  <meta property="og:image:height" content="1588"></meta>
                  <meta property="og:image:alt" content={`${item.name} – Vkine.cz`}></meta>
                  <meta property="og:image:type" content="image/png"></meta>
                  <meta name="twitter:card" content="summary_large_image"></meta>
                  <meta name="twitter:image" content="https://www.vkine.cz/vkine_meta.png"></meta>
                  <meta name="twitter:title" content={`${item.name} – Vkine.cz`}></meta>
                  <meta name="twitter:description" content={t('head.description')}></meta>
                </Head>
                <div>
                  <div className={personStyle.banner} />
                  <div className={`mb-3 ${personStyle.person_content} container`}>
                    <div className={personStyle.person_poster}>
                      <ProgressiveLoader
                        otherClass={personStyle.person_content__img}
                        isBackground={true}
                        lowRes={(item.profile_path != null) ? config.w185(item.profile_path) : null}
                        highRes={(item.profile_path != null) ? config.w500(item.profile_path) : bg}
                        blur={2}
                      />
                      <div className={`${personStyle.person_info} mt-4 text-light`}>
                        <div className={personStyle.mobTitle}>
                          <h1>{item.name}</h1>
                        </div>
                        <div className={`${personStyle.social} mb-4`}>
                          {social.facebook_id != null && <a target="_blank" rel="noopener noreferrer" href={"https://www.facebook.com/" + social.facebook_id}><Facebook /></a>}
                          {social.twitter_id != null && <a target="_blank" rel="noopener noreferrer" href={"https://www.twitter.com/" + social.twitter_id}><Twitter /></a>}
                          {social.instagram_id != null && <a target="_blank" rel="noopener noreferrer" href={"https://www.instagram.com/" + social.instagram_id}><Instagram /></a>}
                          {item.homepage != null && <a target="_blank" rel="noopener noreferrer" href={item.homepage}><Link45deg /></a>}
                        </div>
                        <h3>{t('people.informationTitle')}</h3>
                        {item.known_for_department != null ? <p><b>{t('people.knownFromText')}:</b><br></br>{t(`departments.${item.known_for_department}`)}</p> : null}
                        {item.gender != null ? <p><b>{t('people.genderText')}:</b><br></br> <GendersConst genderNum={item.gender} /></p> : null}
                        {item.birthday != null ? <p><b>{t('people.birthText')}:</b><br></br> {dateFormat(new Date(item.birthday), "d. m. yyyy")}</p> : null}
                        {item.deathday != null ? <p><b>{t('people.deathText')}:</b><br></br> {dateFormat(new Date(item.deathday), "d. m. yyyy")} ({calculate_age(new Date(item.birthday), new Date(item.deathday))} let) </p> : null}
                        {item.place_of_birth != null ? <p><b>{t('people.birthPlaceText')}:</b><br></br> {item.place_of_birth}</p> : null}
                        {item.also_known_as.length > 0 ? <p><b>{t('people.alsoKnownAsText')}:</b><br></br> {item.also_known_as.map((name, i) => <span key={i}><span key={i}>{name}</span><br></br></span>)}</p> : null}
                      </div>
                    </div>
                    <div className={personStyle.person_content__info}>
                      <div className={personStyle.webTitle}>
                        <h1>{item.name}</h1>
                      </div>
                      <div className={`${personStyle.biography} mt-3 mb-1`}>
                      </div>
                      <div className={`${personStyle.biographyContent} mt-4 mb-4`}>
                        <h4 className="text-white">{t('people.biographyLabel')}</h4>
                        <LanguageFallback
                          language={language}
                          resKey={'biography'}
                          fetchData={tmdbApi.getPeople}
                          mainParams={[item.id]}
                          maxTextLength={510}
                          isString={true}
                          otherParams={{ language: 'en' }}
                        />
                      </div>
                      <div className={`${personStyle.knownFor} mt-4 mb-5`}>
                        <h4 className='text-white'>{t('people.knownFromLabel')}</h4>
                        <CastMedia personId={personID} language={language} />
                      </div>

                      <div className={`${personStyle.actor} mt-5 mb-4`}>
                        <CastTimeline personId={personID} title={t('people.actorTitle')} type='cast'></CastTimeline>
                      </div>
                      <div className={`${personStyle.crew} mt-5 mb-4`}>
                        <CastTimeline personId={personID} title={t('people.crewTitle')} type='crew'></CastTimeline>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : <PageNotFound />}
          </>
        )
      }
    </div>
  )
}
export const getServerSideProps = withI18n();
export default Person