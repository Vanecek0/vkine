import { getSession, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'next-i18next'
import d_translations from '../../public/locales/cs/translations.json'
import tmdbApi, { movieType } from '../api/tmdbApi';
import noBackground from '../../assets/default_background1.png';
import { Autocomplete, FormControl, FormGroup, IconButton, Input, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { PrismaClient } from '@prisma/client';
import ProgressiveLoader from '../../components/progressive-loader/ProgressiveLoader';
import { ThemeProvider, createTheme } from '@mui/material/styles'
import registerStyle from './Signup.module.css';
import { Eye, EyeSlash, Facebook, GlobeAmericas, Google, Twitter } from 'react-bootstrap-icons';
import config from '../api/config';
import countryCodes from '../../components/constants/CountryCodes.json'
import getUnicodeFlagIcon from 'country-flag-icons/unicode'
import { Controller, useForm } from 'react-hook-form';

export default function signUp() {
  const session = useSession()
  const { t } = useTranslation('translations')
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [signupBackground, setSignupBackground] = useState('');
  const dateNow = new Date();
  const year = dateNow.getFullYear();
  const monthWithOffset = dateNow.getUTCMonth() + 1;
  const month =
    monthWithOffset.toString().length < 2
      ? `0${monthWithOffset}`
      : monthWithOffset;
  const date =
    dateNow.getUTCDate().toString().length < 2
      ? `0${dateNow.getUTCDate()}`
      : dateNow.getUTCDate();

  const materialDateInput = `${year}-${month}-${date}`;
  const userProviderData = (session.data && session.data.user.provider != 'credentials') ? session.data.user : '';

  const { register, reset, handleSubmit, control, getValues } = useForm({
    defaultValues: useMemo(() => {
      return {
        ...userProviderData,
        provider: userProviderData.provider
      };
    }, [userProviderData])
  });

  const onSubmitForm = async (d) => {
    try {
      d = { ...d, email: (d.email ? d.email.toLowerCase() : ''), password: (!userProviderData ? await sha512(d.username + d.username[0] + d.password) : await sha512(d.username + d.username[0] + d.id)) }
      const response = await fetch('../api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(d),
      });

      console.log(response.status);
      if (response.status === 200) {
        router.push(`/login`);
      } else {
        console.log('Request failed');
      }
    } catch (error) {
      console.log('An error occurred', error);
    }
  }

  useEffect(() => {
    reset(userProviderData);
  }, [userProviderData]);

  const getRandomMVBackground = async () => {
    const params = {
      page: 1,
      with_original_language: process.env.NEXT_PUBLIC_LIST_ORIGINAL_LANGUAGES,
      without_keywords: process.env.NEXT_PUBLIC_LIST_HIDDEN_GENRES
    }
    var response = await tmdbApi.getMoviesList(movieType.upcoming, { params });
    setSignupBackground(response.results[Math.floor(Math.random() * (response.results).length)].backdrop_path)
  }

  useEffect(() => {
    getRandomMVBackground();
  }, [])

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  async function sha512(str) {
    const buf = await crypto.subtle.digest("SHA-512", new TextEncoder("utf-8").encode(str));
    return Array.prototype.map.call(new Uint8Array(buf), x => (('00' + x.toString(16)).slice(-2))).join('');
  }

  const countries = countryCodes.countries;

  /*const getOpObj = option => {
    if (!option.label) option = countries.find(op => op.label === option);
    return option;
  };*/


  return (
    <div className={`container-fluid`}>
      <div className={`container d-flex flex-wrap justify-content-center ${registerStyle.signupContainer}`}>
        <div className={`d-flex justify-content-center align-items-center ${registerStyle.signupContent}`}>
          <div className='w-100'>
            <h1>{t('signupPage.headline', d_translations.signupPage.headline)}</h1>
            <p>Vyplňte níže své údaje a zaregistrujte se</p>
            <form onSubmit={handleSubmit(onSubmitForm)} className='d-flex flex-column'>
              <ThemeProvider theme={darkTheme}>
                <FormGroup>
                  <div className={`${registerStyle.formSection}`}>
                    <p className='text-start m-0 py-1'>Základní údaje</p>
                    <div className={`d-flex justify-content-between ${registerStyle.inputGroup}`}>
                      <TextField {...register('firstname', { required: true })} id="firstname" placeholder='Jan' type={'text'} label="Jméno" variant="standard" InputLabelProps={getValues('firstname') ? { shrink: true } : {}} />
                      <TextField {...register('lastname', { required: true })} id="lastname" placeholder='Novák' type={'text'} label="Příjmení" variant="standard" InputLabelProps={getValues('lastname') ? { shrink: true } : {}} />
                    </div>
                    <FormControl variant='standard' required>
                      <InputLabel id="gender">Pohlaví</InputLabel>
                      <Select
                        labelId="gender"
                        {...register('gender', { required: true })}
                        className='text-start'
                        id="gender-select"
                        defaultValue={getValues('gender')}
                        label="Pohlaví"
                      >
                        <MenuItem value={2}>Muž</MenuItem>
                        <MenuItem value={1}>Žena</MenuItem>
                        <MenuItem value={0}>Jiné</MenuItem>
                      </Select>
                    </FormControl>
                    <TextField
                      {...register('birthday', { required: true })}
                      InputLabelProps={{ shrink: true }}
                      id="birthday"
                      type={'date'}
                      defaultValue={materialDateInput}
                      label="Datum narození"
                      variant="standard"
                      className='mt-3'
                      required
                    />
                  </div>

                  <div className={`${registerStyle.formSection}`}>
                    <p className='text-start m-0 py-1'>Kontaktní údaje</p>
                    <TextField {...register('email', { required: true })} id="email" type={'email'} placeholder='jan.novak@example.cz' label="E-mail" variant="standard" className='my-1' InputLabelProps={getValues('email') ? { shrink: true } : {}} inputProps={{ disabled: (userProviderData.email ? true : false) }} required />
                    <TextField {...register('phone', { required: false })} id="phone" type={'text'} inputProps={{ pattern: "^\\+\\d{1,3} \\d+$" }} placeholder='+### #########' label="Telefon" variant="standard" className='my-1' />
                    <Controller
                      name="locale"
                      render={({ field: { onChange, value } }) => (
                        <Autocomplete
                          disablePortal
                          onChange={(event, option) => onChange(option)}
                          value={value}
                          className='my-1 w-100'
                          options={countries}
                          getOptionLabel={option => (option.label ? option.label : "")}
                          getOptionSelected={(option, value) => {
                            value === undefined || value === "" || option.label === value.label
                          }}
                          sx={{ width: 300 }}
                          renderOption={(props, option) => (
                            <li {...props}><span className='pe-2'>{getUnicodeFlagIcon(option.code)}</span>{option.label}</li>
                          )}
                          renderInput={(params) => <TextField {...params} label="Země" variant='standard' InputProps={{
                            ...params.InputProps
                          }}
                            required
                          />
                          }
                        />
                      )
                      }
                      control={control}
                    />
                  </div>

                  <div className={`${registerStyle.formSection}`}>
                    <p className='text-start m-0 py-1'>Přihlašovací údaje</p>
                    <TextField {...register('username', { required: true })} id="username" type={'text'} label="Uživatelské jméno" variant="standard" className='my-1' required />
                    {
                      !userProviderData &&
                      <>
                        <TextField {...register('password', { required: true })} id="password" defaultValue={''} label="Heslo" variant='standard' className='my-1'
                          type={showPassword ? 'text' : 'password'}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                  onMouseDown={(event) => event.preventDefault()}
                                >
                                  {showPassword ? <EyeSlash fontSize={20} /> : <Eye fontSize={20} />}
                                </IconButton>
                              </InputAdornment>
                            )
                          }}
                          required
                        />
                        <TextField id="password-repeat" defaultValue={''} label="Heslo znovu" variant='standard' className='my-1' type={showPassword ? 'text' : 'password'} required />
                      </>
                    }
                  </div>
                </FormGroup>
              </ThemeProvider>
              <small className='fw-light '>Kliknutím na tlačítko "Zaregistrovat se" níže potvrzuji, že jsem si přečetl(a) podmínky používání vkine.cz a zásady ochrany osobních údajů a že s nimi souhlasím.</small>
              <button type='submit' className='btn btn-primary my-4'>{t('signupPage.signupBtn', d_translations.signupPage.signupBtn)}</button>
            </form>
          </div>
        </div>

      </div>
      <ProgressiveLoader
        isBackground={true}
        otherClass={registerStyle.signup_bac}
        lowRes={signupBackground ? config.w300(signupBackground) : null}
        highRes={signupBackground ? config.mainImage(signupBackground) : config.noBac(noBackground)}
        blur={5}
      />
    </div>
  )
}
export const getServerSideProps = async (context) => {
  const prisma = new PrismaClient();
  const session = await getSession(context);
  var userData = null;

  if (session) {
    try {
      userData = await prisma.user.findFirst({
        where: {
          email: session.user.email
        },
        select: {
          username: true,
        }
      })
    } catch (error) {
      throw new Error(error)
    } finally {
      await prisma.$disconnect();
    }
    if (userData) {
      return {
        redirect: {
          destination: `/u/${userData.username}`,
          permanent: false,
        },
        props: { data: userData }
      }
    } else {
      return {
        props: { data: {} }
      }
    }
  }
  else {
    return {
      props: { data: {} }
    }
  }
}