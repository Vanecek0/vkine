import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import footerStyle from './Footer.module.css';
import Link from 'next/link';

const Footer = () => {


  return (
    <>
      <div className={footerStyle.footer}>
        <div className={`${footerStyle.footer_content} container`}>
        </div>
        <div className={footerStyle.copyright}>
          <span>© {new Date().getFullYear()} vkine.cz</span>
          <Link className={footerStyle.buyMeACoffeeDonate} href="https://www.buymeacoffee.com/vkinecz" target='_blank'><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=vkinecz&button_colour=5F7FFF&font_colour=ffffff&font_family=Arial&outline_colour=000000&coffee_colour=FFDD00" /></Link>
        </div>
      </div>
    </>
  );
}

export default Footer;