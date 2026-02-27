import { useState, useEffect } from "react";
import { useTranslation } from "next-i18next";
import ShowMoreLess from "../show-more-less/ShowMoreLess";

const LanguageFallback = ({ fetchData, language, isString = false, maxTextLength, resKey = '', mainParams, showMoreLessButton = true, otherParams }) => {
    const [data, setData] = useState('');
    const { t } = useTranslation('translations');

    useEffect(() => {
        const getData = async () => {
            var params = {
                ...otherParams,
                language: language
            }
            var response = await fetchData(...mainParams, { params });
            if (response[resKey].length <= 0 || response[resKey] == null) {
                params = {
                    ...otherParams,
                    language: null
                }
                response = await fetchData(...mainParams, { params })
                if (response[resKey].length <= 0 || response[resKey] == null) {
                    return setData(t('common.descriptionNotAvailable'))
                }
            }
            setData(response[resKey])
        };
        getData();
    }, [fetchData, language]);

    return (
        isString ?
            <ShowMoreLess
                text={data}
                maxLength={maxTextLength}
                showButton={showMoreLessButton}
            />
            :
            data
    )
};

export default LanguageFallback;