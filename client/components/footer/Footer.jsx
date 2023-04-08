import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import footerStyle from './Footer.module.css';
import DonateButton from './donateButton';

const Footer = () => {


  return (
    <>
      <div className={footerStyle.footer}>
        <div className={`${footerStyle.footer_content} container`}>
        </div>
        <div className={footerStyle.copyright}>
          <span>© {new Date().getFullYear()} vkine.cz</span>
          <DonateButton/>
        </div>
      </div>
    </>
  );
}

export default Footer;