import React, { useEffect, useRef, useState } from 'react';
import './Header.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HeaderStyle from "./Header.module.css"
import MultiSearch from '../multi-search/MultiSearch';
import {Search} from 'react-bootstrap-icons';
//import '../../assets/flags/flags.css';
import Menu from './Menu';
import LanguageDropdown from './LanguageDropdown';

const Header = () => {
  const headerRef = useRef(null);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const searchHandler = (e) => {
    setIsSearchActive(current => !current)
    document.getElementById("search-input").focus();
  }

  useEffect(() => {
    const shrinkHeader = () => {
      if(document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        headerRef.current.classList.add('shrink', HeaderStyle.shrink);
      } else {
        headerRef.current.classList.remove('shrink', HeaderStyle.shrink);
      }
    }
    window.addEventListener('scroll', shrinkHeader);
    return () => {
      window.removeEventListener('scroll', shrinkHeader);
      window.scrollTo(0,0)
    }
  },[])

  return (
    <>
    <div ref={headerRef} className={`${HeaderStyle.header} header`}>
      <div className={`${HeaderStyle.header__wrap} header__wrap container`}>
        <div className={`${HeaderStyle.header__nav} header__nav`}>
          <Menu/>
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
    </>
  );
}

export default Header;