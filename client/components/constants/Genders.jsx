import { useTranslation } from "react-i18next";

const GENDER = {
    UNKNOWN: 'Unknown',
    FEMALE: 'Female',
    MALE: 'Male',
    NON_BINARY: 'Non-binary'
};

const GendersConst = ({genderNum = 0}) => {
    const { t } = useTranslation();
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

    return t(`genders.${gender.toLowerCase()}`);
    
}

export default GendersConst;