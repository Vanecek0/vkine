import { useTranslation } from "next-i18next";
import d_translations from '../../public/locales/cs/translations.json'

const GENDER = {
    UNKNOWN: 'Unknown',
    FEMALE: 'Female',
    MALE: 'Male',
    NON_BINARY: 'Non-binary'
};

const GendersConst = ({genderNum = 0}) => {
    const { t } = useTranslation('translations');
    let gender;
    switch (genderNum) {
        case 1:
        gender = GENDER.FEMALE;
        break;
        case 2:
        gender = GENDER.MALE;
        break;
        case 3:
        gender = GENDER.NON_BINARY;
        break;
        default:
        gender = GENDER.UNKNOWN;
    }

    return t(`genders.${gender.toLowerCase()}`, d_translations.genders[gender.toLowerCase()]);
    
}

export default GendersConst;