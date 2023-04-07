import i18next from "i18next";
import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

const Sorting = () => {
    const { t } = useTranslation('translations');
    const router = useRouter();
    const language = router.locale;
    const [sorting, setSorting] = useState([{}]);

    /*useEffect(() => {
        setSorting(
            [
                {value: "popularity.asc", label: t(['sorting.popularity.asc'])},
                {value: "popularity.desc", label: t(['sorting.popularity.desc'])},
                {value: "release_date.asc", label: t(['sorting.release_date.asc'])},
                {value: "release_date.desc", label: t(['sorting.release_date.desc'])},
                {value: "revenue.asc", label: t(['sorting.revenue.asc'])},
                {value: "revenue.desc", label: t(['sorting.revenue.desc'])},
                {value: "primary_release_date.asc", label: t(['sorting.primary_release_date.asc'])},
                {value: "primary_release_date.desc", label: t(['sorting.primary_release_date.desc'])},
                {value: "original_title.asc", label: t(['sorting.original_title.asc'])},
                {value: "original_title.desc", label: t(['sorting.original_title.desc'])},
                {value: "vote_average.asc", label: t(['sorting.vote_average.asc'])},
                {value: "vote_average.desc", label: t(['sorting.vote_average.desc'])},
                {value: "vote_count.asc", label: t(['sorting.vote_count.asc'])},
                {value: "vote_count.desc", label: t(['sorting.vote_count.desc'])}
            ]
        )
    }, [language])*/

    return [
        {value: "popularity.asc", label: t(['sorting.popularity.asc'])},
        {value: "popularity.desc", label: t(['sorting.popularity.desc'])},
        {value: "release_date.asc", label: t(['sorting.release_date.asc'])},
        {value: "release_date.desc", label: t(['sorting.release_date.desc'])},
        {value: "revenue.asc", label: t(['sorting.revenue.asc'])},
        {value: "revenue.desc", label: t(['sorting.revenue.desc'])},
        {value: "primary_release_date.asc", label: t(['sorting.primary_release_date.asc'])},
        {value: "primary_release_date.desc", label: t(['sorting.primary_release_date.desc'])},
        {value: "original_title.asc", label: t(['sorting.original_title.asc'])},
        {value: "original_title.desc", label: t(['sorting.original_title.desc'])},
        {value: "vote_average.asc", label: t(['sorting.vote_average.asc'])},
        {value: "vote_average.desc", label: t(['sorting.vote_average.desc'])},
        {value: "vote_count.asc", label: t(['sorting.vote_count.asc'])},
        {value: "vote_count.desc", label: t(['sorting.vote_count.desc'])}
    ];
    
}

export default Sorting