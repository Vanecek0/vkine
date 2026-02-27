import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'react-bootstrap-icons';
import { useTranslation } from 'next-i18next';
import d_translations from '../../../public/locales/cs/translations.json'

const ShowMoreLess = ({ text, maxLength, truncatedEnding = '...', moreLabel, lessLabel, showButton = true }) => {
  const [expanded, setExpanded] = useState(false);
  const { t } = useTranslation('translations')
  moreLabel = moreLabel == null ? t('common.showMore', d_translations.common.showMore) : moreLabel;
  lessLabel = lessLabel == null ? t('common.showLess', d_translations.common.showLess) : lessLabel;

  return (
    <div>
      <p className='mb-1'>{(expanded) ? text : (text.length > maxLength) ? text.substring(0, maxLength) + truncatedEnding : text}</p>
      {((text.length > maxLength) && showButton) && (
        <button className='btn btn-link p-0 text-decoration-none' onClick={() => setExpanded(!expanded)}>

          {expanded ? (
            <span>{lessLabel} <ChevronUp /></span>
          )
            :
            (
              <>
                <span>{moreLabel} <ChevronDown /></span>
              </>

            )
          }
        </button>
      )}
    </div>
  );
}

export default ShowMoreLess