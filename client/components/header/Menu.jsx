import { useState } from 'react'
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { List } from 'react-bootstrap-icons';
import logo from '../../assets/logo.svg';
import menuStyle from './Menu.module.css'

const Menu = () => {
    const { t } = useTranslation('translations');
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const headerNav = [
    { display: t('common.home'), path: '/' },
    { display: t('common.movies'), path: '/movie' },
    { display: t('common.tvs'), path: '/tv' },
];

    const handleMenuOpen = () => {
        setIsOpen(!isOpen);
    }
    const active = headerNav.findIndex(e => e.path === router.pathname);
    return (
        <>
            <div className={menuStyle.menu}>
                <div className={menuStyle.logo}>
                    <Link href="/"><img src={logo.src} alt="logo" /></Link>
                </div>
                <ul>
                    {
                        headerNav.map((e, i) => (
                            <li key={i} className={(i === active) ? 'active' : ''}>
                                <Link href={e.path}>{e.display}</Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className={`${menuStyle.mobileMenu} mobileMenu`}>
                <List className={menuStyle.hamburgerIcon} onClick={handleMenuOpen} color='white' size={25}></List>
                <div onClick={handleMenuOpen} className={`${menuStyle.mobileMenuWrapper} mobileMenuWrapper ${!isOpen ? menuStyle.hidden : ''}`}>
                    <div onClick={(e) => e.stopPropagation()} className={`${menuStyle.mobileMenuContent} mobileMenuContent`}>
                        <ul>
                            {
                                headerNav.map((e, i) => (
                                    <li key={i} className={(i === active) ? menuStyle.active : ''}>
                                        <Link onClick={handleMenuOpen} href={e.path}>{e.display}</Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
            <div className={menuStyle.mobileMenuLogo}>
                <Link href="/"><img src={logo.src} alt="logo" /></Link>
            </div>
        </>

    )
}

export default Menu;