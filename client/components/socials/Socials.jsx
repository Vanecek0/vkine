import React from 'react'
import socialsStyle from './socials.module.css'
import { Github, Instagram } from 'react-bootstrap-icons';
import Link from 'next/link';

const Socials = (props) => {
    const instagramURL = "https://www.instagram.com/vkine.cz/";
    const githubURL = "https://github.com/Vanecek0/vkine_translations";

    return (
        <div className={socialsStyle.socials}>
            <div className={socialsStyle.socialIcons}>
                <div className={(props.darkMode ? socialsStyle.darkMode : '')}>
                    <Link target='_blank' href={githubURL}><Github size={props.iconsSize} className='p-1'></Github></Link>
                    <Link target='_blank' href={instagramURL}><Instagram size={props.iconsSize} className='p-1'></Instagram></Link>
                </div>
            </div>
        </div>
    )
}

export default Socials