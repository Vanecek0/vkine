import React, { useEffect } from 'react';
import footerStyle from './Footer.module.css';
import Link from 'next/link';
import logo from '../../assets/logo.svg';
import Socials from '../socials/Socials';

const Footer = () => {


  return (
    <>
      <div className={footerStyle.footer}>
        <div className={`${footerStyle.footer_content} container`}>
        </div>
        <div className={`${footerStyle.logoContainer}`}>
          <div className={footerStyle.logo}>
            <Link href="/"><img src={logo.src} alt="logo" /></Link>
          </div>
          <Link href={'#'} className='btn btn-primary text-center'>Připojit se ke komunitě</Link>
        </div>
        <nav className={`${footerStyle.footerNav} d-flex justify-content-center text-white my-4 justify-content-evenly`}>
          <div>
            <h4>Základní informace</h4>
            <Link href={'#'}>O VKINE.CZ</Link>
            <Link href={'#'}>Kontaktujte nás</Link>
            <Link href={'#'}>Stav hostingu</Link>
          </div>
          <div>
            <h4>Zapojit se</h4>
            <Link href={'#'}>Pokyny</Link>
            <Link href={'#'}>Založit účet</Link>
            <Link href={'#'}>Přidat nový film</Link>
            <Link href={'#'}>Přidat nový seriál</Link>
            <Link href={'#'}>Přidat herce</Link>
          </div>
          <div>
            <h4>Právní informace</h4>
            <Link href={'/documents'}>Dokumenty</Link>
            <Link href={'/documents/terms-of-use'}>Podmínky použití</Link>
            <Link href={'/documents/privacy-policy'}>Zásady ochrany osobních údajů</Link>
          </div>
        </nav>
        <hr className='text-muted'></hr>
        <div className={footerStyle.socialIcons}>
          <Socials darkMode={true} iconsSize={35}></Socials>
        </div>
        <div className={`${footerStyle.copyright} text-muted`}>
          <span>© 2022-{new Date().getFullYear()} by vkine.cz</span>
        </div>
      </div>
    </>
  );
}

export default Footer;