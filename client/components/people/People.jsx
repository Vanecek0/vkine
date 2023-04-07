import React from 'react'
import Link from 'next/link';
import config from '../../pages/api/config';
import noImagePerson from '../../assets/noimage_person.svg';
import peopleStyle from "./People.module.css"

const People = (props) => {
    const item = props.item;
    var bg = '';
    const nameDashed = (item.title || item.name) != null ? (item.title || item.name).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[\s:,]+/g, '-').replace(/[\/\\]+/g, '-') : '';
    const link = '/person/' + item.id + '-' + nameDashed;

    (item.profile_path != null) ? bg = config.w300(item.profile_path) : bg = config.noImage(noImagePerson).src;

    return (
        <>
            <div className={peopleStyle.cast__item}>
                <Link href={link}>
                    <div className={peopleStyle.cast__item__img} style={{ backgroundImage: `url(${bg})` }}></div>
                    <p className={peopleStyle.cast__item__name}>{item.name}</p>
                    <p className={peopleStyle.cast__item__character}>{item.character}</p>
                </Link>
            </div>
        </>
    )
}

export default People
