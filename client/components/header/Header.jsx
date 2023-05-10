import React, { useEffect, useRef, useState } from 'react';
import './Header.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderStyle from "./Header.module.css"
import MultiSearch from '../multi-search/MultiSearch';
import { Search } from 'react-bootstrap-icons';
import Menu from './Menu';
import LanguageDropdown from './LanguageDropdown';
import Head from 'next/head';
import Script from 'next/script';
import CookieConsent, { Cookies } from "react-cookie-consent";

const Header = () => {
  const headerRef = useRef(null);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const searchHandler = (e) => {
    setIsSearchActive(current => !current)
    document.getElementById("search-input").focus();
  }

  useEffect(() => {
    const shrinkHeader = () => {
      if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        headerRef.current.classList.add('shrink', HeaderStyle.shrink);
      } else {
        headerRef.current.classList.remove('shrink', HeaderStyle.shrink);
      }
    }
    window.addEventListener('scroll', shrinkHeader);
    return () => {
      window.removeEventListener('scroll', shrinkHeader);
      window.scrollTo(0, 0)
    }
  }, [])

  return (
    <>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#90cdf4" />
        <noscript>
          <style type="text/css">
            {"\
            html, body{\
              margin: 0;\
              height: 100%;\
              overflow: hidden;\
            }\
            .noscriptmsg{\
            position: fixed;\
            left: 0;\
            right: 0;\
            bottom: 0;\
            top: 0;\
            background-color: black;\
            color: white;\
            display: flex;\
            flex-direction: column;\
            justify-content: center;\
            align-items: center;\
            text-align: center;\
            }\
          "}
          </style>
          <div className="noscriptmsg">
            <h1>You don't have javascript enabled!</h1>
            <h2>Please turn it on and have a great user experience here! :)</h2>
          </div>
        </noscript>
        <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5585538415879907" crossOrigin="anonymous"></Script>
      </Head>
      <div ref={headerRef} className={`${HeaderStyle.header} header`}>
        <div className={`${HeaderStyle.header__wrap} header__wrap container`}>
          <div className={`${HeaderStyle.header__nav} header__nav`}>
            <Menu />
            <div className={`${HeaderStyle.header__other} d-inline-flex justify-content-end align-items-baseline`}>
              <button className={`${HeaderStyle.searchButton} ${HeaderStyle.rounded}`} onClick={searchHandler}>
                <Search fontSize={20} fontWeight={80} className='text-white'></Search>
              </button>
              <LanguageDropdown />
            </div>
          </div>
        </div>
      </div>
      <MultiSearch isActive={isSearchActive} setIsActive={setIsSearchActive}></MultiSearch>
      <CookieConsent
        location="bottom"
        buttonText="Souhlasím"
        containerClasses="d-flex align-items-center"
        cookieName="cookie_consent"
        style={{ background: "#151616" }}
        buttonStyle={{ color: "#fff", background: "#0d6efd", fontSize: "15px" }}
        expires={30}
      >
          <b>Tato webová stránka používá cookies</b>
          <p>Dalším procházením tohoto webu vyjadřujete souhlas s jejich používáním.</p>
      </CookieConsent>
    </>
  );
}

export default Header;