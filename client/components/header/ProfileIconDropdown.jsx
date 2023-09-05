import { useRouter } from 'next/router';
import { Dropdown } from 'react-bootstrap';
import React, { useEffect, useRef, useState } from 'react'
import profileIconDropdownStyle from './ProfileIconDropdown.module.css'
import { useTranslation } from 'react-i18next';
import { signOut, useSession } from 'next-auth/react';
import ProgressiveLoader from '../progressive-loader/ProgressiveLoader';
import Link from 'next/link';
import ProtectedSession from '../protected-session/ProtectedSession';
import { DoorOpen, DoorOpenFill } from 'react-bootstrap-icons';
import { Popover, ThemeProvider, createTheme } from '@mui/material';

const ProfileIconDropdown = () => {
    const { t } = useTranslation('translations');
    const router = useRouter();
    const session = useSession();
    const user = session.data != null && session.data.user;
    const language = router.locale;

    const [anchorSignupOffer, setAnchorSignupOffer] = useState(null);
    const [signupOfferOpen, setSignupOfferOpen] = useState(true);
    const signupOfferRef = useRef(null);

    const handleSignupOfferClose = () => {
        setAnchorSignupOffer(null);
        setSignupOfferOpen(false);
    };

    useEffect(() => {
        setAnchorSignupOffer(signupOfferRef.current);
    })

    const open = true;
    const id = open ? 'simple-popover' : undefined;

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });


    return (
        session.data ? (
            <Dropdown align="end" className={profileIconDropdownStyle.profileDropdown}>
                <Dropdown.Toggle className={`text-white ${profileIconDropdownStyle.withoutToggle}`} variant="link" id="dropdown-basic">
                    <div className={`${profileIconDropdownStyle.profileIcon}`}>
                        {user.profileImage != "" ?
                            (<div>
                                <ProgressiveLoader
                                    isBackground={true}
                                    lowRes={null}
                                    otherClass={`rounded-circle ${profileIconDropdownStyle.profileImage}`}
                                    highRes={user.profileImage}
                                    blur={2}
                                />
                            </div>)
                            :
                            (<div className={`rounded-circle ${profileIconDropdownStyle.profileDefaultLogo}`}>
                                <Link href={`/u/${user.nickname}`}><span>{user.nickname[0].toUpperCase()}</span></Link>
                            </div>)
                        }
                    </div>
                </Dropdown.Toggle>
                <Dropdown.Menu className='bg-dark text-white'>
                    <Dropdown.Header className='text-white'>
                        <Link className='text-white' href={`/u/${user.nickname}`}>
                            <span className={`${profileIconDropdownStyle.dropdownTitle} fw-bold fs-6`}>{user.nickname}</span>
                            <br></br>
                            <span className='fw-lighter'>Zobrazit profil</span>
                        </Link>
                    </Dropdown.Header>
                    <Dropdown.Divider className='bg-secondary'></Dropdown.Divider>
                    <Dropdown.Item className={`text-white ${profileIconDropdownStyle.dropdownItem}`}>
                        <span>Seznamy</span>
                    </Dropdown.Item>
                    <Dropdown.Item className={`text-white ${profileIconDropdownStyle.dropdownItem}`}>
                        <span>Oblíbené</span>
                    </Dropdown.Item>
                    <Dropdown.Item className={`text-white ${profileIconDropdownStyle.dropdownItem}`}>
                        <span>Seznam ke shlédnutí</span>
                    </Dropdown.Item>
                    <Dropdown.Divider className='bg-secondary'></Dropdown.Divider>
                    <Dropdown.Item className={`text-white ${profileIconDropdownStyle.dropdownItem}`}>
                        <span>Upravit profil</span>
                    </Dropdown.Item>
                    <Dropdown.Item className={`text-white ${profileIconDropdownStyle.dropdownItem}`}>
                        <span>Nastavení</span>
                    </Dropdown.Item>
                    <Dropdown.Divider className='bg-secondary'></Dropdown.Divider>
                    <Dropdown.Item className={`text-white ${profileIconDropdownStyle.dropdownItem}`}>
                        <ProtectedSession user={user}>
                            <span onClick={() => signOut()}>Odhlásit se</span>
                        </ProtectedSession>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown >) : (
            <div className='d-flex'>
                <div ref={signupOfferRef}>
                    <Link className={`btn btn-dark btn-link text-white fw-bold text-decoration-none`} href={'/login'}>Sign In</Link>
                    <ThemeProvider theme={darkTheme}>
                        <Popover
                            id={id}
                            open={signupOfferOpen}
                            anchorEl={anchorSignupOffer}
                            onClose={handleSignupOfferClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                        >
                            <span>Test</span>
                        </Popover>
                    </ThemeProvider>
                </div>
            </div>
        )
    )
}

export default ProfileIconDropdown