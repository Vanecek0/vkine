import React, { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import d_translations from '../../public/locales/cs/translations.json'
import loginStyle from './Login.module.css';
import { Eye, EyeSlash, Facebook, Google, Twitter } from 'react-bootstrap-icons';
import { useSession, signIn, signOut, getSession } from 'next-auth/react';
import { FormControl, FormGroup, IconButton, Input, InputAdornment, InputLabel, TextField } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { useRouter } from 'next/router';
import tmdbApi, { movieType } from '../api/tmdbApi';
import ProgressiveLoader from '../../components/progressive-loader/ProgressiveLoader';
import config from '../api/config';
import noBackground from '../../assets/default_background1.png';
import { PrismaClient } from '@prisma/client';

const Login = ({ data }) => {
  const { t } = useTranslation('translations')
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const router = useRouter();
  const [loginBackground, setLoginBackground] = useState('');

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [userInfo, setUserInfo] = useState({ email: '', password: '' })

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signIn('credentials', {
      email: userInfo.email,
      password: userInfo.password,
      redirect: false
    });

    if (res.error) {
      throw (res.error)
    } else {
      router.push('/u');
    }
  }

  const getRandomMVBackground = async () => {
    const params = {
      page: 1,
      with_original_language: process.env.NEXT_PUBLIC_LIST_ORIGINAL_LANGUAGES,
      without_keywords: process.env.NEXT_PUBLIC_LIST_HIDDEN_GENRES
    }
    var response = await tmdbApi.getMoviesList(movieType.upcoming, { params });
    setLoginBackground(response.results[Math.floor(Math.random() * (response.results).length)].backdrop_path)
  }

  useEffect(() => {
    getRandomMVBackground();
  }, [])

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <div className={`container-fluid`}>
      <div className={`container d-flex flex-wrap justify-content-center ${loginStyle.loginContainer}`}>
        <div className={`d-flex justify-content-center align-items-center ${loginStyle.loginContent}`}>
          <div>
            <h1>{t('loginPage.headline', d_translations.loginPage.headline)}</h1>
            <form onSubmit={handleSubmit} className='d-flex flex-column'>
              <ThemeProvider theme={darkTheme}>
                <FormControl>
                  <FormGroup>
                    <TextField id="email" type={'email'} value={userInfo.email} onChange={({ target }) => setUserInfo({ ...userInfo, email: target.value })} label="E-mail" variant="standard" className='my-1' />
                    <TextField id="password" value={userInfo.password} onChange={({ target }) => setUserInfo({ ...userInfo, password: target.value })} label="Heslo" variant='standard' className='my-1'
                      type={showPassword ? 'text' : 'password'}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {showPassword ? <EyeSlash fontSize={20} /> : <Eye fontSize={20} />}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  </FormGroup>
                </FormControl>

              </ThemeProvider>
              <button type='submit' className='btn btn-primary my-4'>{t('loginPage.loginBtn', d_translations.loginPage.loginBtn)}</button>
              <button className='btn btn-link text-light'>{t('loginPage.forgottenPsw', d_translations.loginPage.forgottenPsw)}</button>
            </form>
            <hr />
            <h2>{t('loginPage.socialNetworks', d_translations.loginPage.socialNetworks)}</h2>
            <div className={loginStyle.social}>
              <button className='btn btn-link' onClick={() => signIn('facebook')}><Facebook fontSize={30} /></button>
              <button className='btn btn-link' onClick={() => signIn('google')}><Google fontSize={30} /></button>
              <button className='btn btn-link' onClick={() => signIn('twitter')}><Twitter fontSize={30} /></button>
            </div>
          </div>
        </div>

        {/*<div className={`container d-flex justify-content-center align-items-center rounded-end ${loginStyle.registerContent}`}>
          <div>
            <h1>{t('loginPage.newHere', d_translations.loginPage.newHere)}</h1>
            <p>{t('loginPage.newHereDescription', d_translations.loginPage.newHereDescription)}</p>
            <button className='btn btn-primary'>{t('loginPage.registerBtn', d_translations.loginPage.registerBtn)}</button>
          </div>
                    </div>*/}
      </div>
      <ProgressiveLoader
        isBackground={true}
        otherClass={loginStyle.login_bac}
        lowRes={loginBackground ? config.w300(loginBackground) : null}
        highRes={loginBackground ? config.mainImage(loginBackground) : config.noBac(noBackground)}
        blur={5}
      />
    </div>
  )
}

export const getServerSideProps = async (context) => {
  const prisma = new PrismaClient();
  const session = await getSession(context);
  if (session) {
    const userData = await prisma.user.findFirst({
      where: {
        email: session.user.email
      },
      select: {
        username: true,
      }
    })
    if (!userData) {
      return {
        redirect: {
          destination: `/register`,
          permanent: false,
        },
        props: {}
      }
    } else {
      return {
        redirect: {
          destination: `/u/${userData.username}`,
          permanent: false,
        },
        props: {}
      }
    }
  }
  else {
    return {
      props: {}
    }
  }
}

export default Login