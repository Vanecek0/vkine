import React, { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import d_translations from '../../public/locales/cs/translations.json'
import { PrismaClient } from '@prisma/client';
import { getSession, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ProgressiveLoader from '../../components/progressive-loader/ProgressiveLoader';
import listStyle from './list.module.css'
import config from '../api/config';

const List = (listData) => {
    const item = listData.data[0];
    console.log(item)

    return (
        <>
    
            <ProgressiveLoader
                isBackground={true}
                otherClass={listStyle.banner}
                lowRes={item.listWallpaper ? config.w300(item.listWallpaper) : null}
                highRes={item.listWallpaper ? config.mainImage(item.listWallpaper) : ''}
                blur={5}
            />
            <div className={`${listStyle.listWrapper}`}>
                <div className={`mb-3 container ${listStyle.listContainer}`}>
                    <h1>{item.title}</h1>
                </div>
            </div>
        </>
    )
}

export const getServerSideProps = async (context) => {
    const prisma = new PrismaClient();
    const session = await getSession(context);
    const { listID } = context.params
    var listData = null;

    try {
        listData = await prisma.list.findMany({
            where: {
                id: parseInt(listID),
            }
        })
    } catch (error) {
        throw new Error("Chyba:" + error)
    } finally {
        await prisma.$disconnect();
    }

    if (!listData || listData.length == 0) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            data: JSON.parse(JSON.stringify(listData)),
        }
    }
}

export default List