import { PrismaClient } from '@prisma/client';
import { getSession, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import userStyle from './user.module.css'
import d_translations from '../../public/locales/cs/translations.json'
import ProgressiveLoader from '../../components/progressive-loader/ProgressiveLoader';
import { useTranslation } from 'react-i18next';
import MovieList from '../../components/movie-list/MovieList';
import { movieType, mvtvType } from '../api/tmdbApi';
import { Facebook, Instagram, Link45deg, Twitter, Youtube } from 'react-bootstrap-icons';
import AreaVChart from '../../components/charts/AreaChart';
import RadarGroupChart from '../../components/charts/RadarGroupChart';
import ChartsTabs, { ChartTab } from '../../components/charts/ChartsTabs';

export default function Profile({ data, actualUser }) {
    const user = data;
    const userData = user.userData;
    const router = useRouter()
    const { t } = useTranslation('translations');
    const language = router.locale;

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className={`px-2 py-2 rounded bg-dark`}>
                    <span className="label">{`${payload[0].payload.customLabel}`}</span>
                    <br></br>
                    <span>{`${payload[0].value} úprav`}</span>
                </div>
            );
        }

        return null;
    };

    return (
        <>
            <div className={`${userStyle.profileWrapper}`}>
                <ProgressiveLoader
                    isBackground={true}
                    otherClass={userStyle.profileWallpaper}
                    lowRes={null}
                    highRes={userData.profileWallpaper}
                    blur={2}
                />
                <div className={`container ${userStyle.profileContainer}`}>
                    <div className={`${userStyle.profilePhotoWrapper}`}>

                        {userData.profileImage != "" ?
                            (<Link href={`/u/${userData.nickname}`}><ProgressiveLoader
                                isBackground={true}
                                lowRes={null}
                                otherClass={`rounded-circle ${userStyle.profileImage}`}
                                highRes={userData.profileImage}
                                blur={2}
                            /></Link>)
                            :
                            (<div className={`rounded-circle ${userStyle.profileDefaultLogo}`}>
                                <Link href={`/u/${userData.nickname}`}><span>{userData.nickname[0].toUpperCase()}</span></Link>
                            </div>)
                        }

                    </div>
                    <div className={`${userStyle.profileInfo}`}>
                        <h2>{userData.nickname} <span className='fs-5'>členem od {new Date(user.createdAt).toLocaleString('default', { month: 'long' })} {new Date(user.createdAt).getFullYear()}</span></h2>
                        <p>{userData.bio}</p>
                        <div className={`${userStyle.profileSocial}`}>
                            {userData.facebook != null && <a target="_blank" rel="noopener noreferrer" href={"https://www.facebook.com/" + userData.facebook}><Facebook /></a>}
                            {userData.twitterX != null && <a target="_blank" rel="noopener noreferrer" href={"https://www.twitter.com/" + userData.twitter}><Twitter /></a>}
                            {userData.instagram != null && <a target="_blank" rel="noopener noreferrer" href={"https://www.instagram.com/" + userData.instagram}><Instagram /></a>}
                            {userData.youtube != null && <a target="_blank" rel="noopener noreferrer" href={"https://www.youtube.com/channel/" + userData.youtube}><Youtube /></a>}
                            {userData.homepage != null && <a target="_blank" rel="noopener noreferrer" href={userData.homepage}><Link45deg /></a>}
                        </div>
                    </div>

                    {/**
                     *<ProtectedSession user={data}>
                        <button onClick={() => signOut()}>Odhlásit se</button>
                    </ProtectedSession>
                     **/}
                </div>
            </div>
            <div className={`container ${userStyle.userContent}`}>
                <div className={`${userStyle.userTextStatisticsWrapper}`}>
                    <div className={`${userStyle.userTextStatistics}`}>
                        <div className={`${userStyle.userTextStatisticsChild}`}>
                            <h3>Celkem úprav</h3>
                            <p>23 589</p>
                        </div>
                        <div className={`${userStyle.userTextStatisticsChild}`}>
                            <h3>Celkem hodnocení</h3>
                            <p>5 214</p>
                        </div>
                        <div className={`${userStyle.userTextStatisticsChild}`}>
                            <h3>Počet recenzí</h3>
                            <p>584</p>
                        </div>
                        <div className={`${userStyle.userTextStatisticsChild}`}>
                            <h3>Oblíbené filmy</h3>
                            <p>1 871</p>
                        </div>
                        <div className={`${userStyle.userTextStatisticsChild}`}>
                            <h3>Oblíbené seriály</h3>
                            <p>1 871</p>
                        </div>
                    </div>
                </div>
                <h1>Statistiky</h1>
                <div className={userStyle.userGraphStatistics}>
                    <div className={userStyle.userGraphStatisticsChild}>

                        <div className={`justify-content-between ${userStyle.userGraphStatisticsGroup}`}>
                            <ChartsTabs title={''} className={`${userStyle.userGraphStatisticsTabs}`}>
                                <ChartTab title={`Aktivita za 1. rok`} linkTitle={`1r`}>
                                    <AreaVChart customTooltip={CustomTooltip} aspect={2} />
                                </ChartTab>
                                <ChartTab title={`Aktivita za 5. rok`} linkTitle={`5r`}>
                                    <AreaVChart customTooltip={CustomTooltip} aspect={2} />
                                </ChartTab>
                            </ChartsTabs>
                            <ChartsTabs title={''} className={`${userStyle.userGraphStatisticsTabs}`}>
                                <ChartTab title={`Nejoblíbenější filmové žánry`} linkTitle={`Filmy`}>
                                    <RadarGroupChart customTooltip={CustomTooltip} aspect={2} />
                                </ChartTab>
                                <ChartTab title={`Nejoblíbenější seriálové žánry`} linkTitle={`Seriály`}>
                                    <RadarGroupChart customTooltip={CustomTooltip} aspect={2} />
                                </ChartTab>
                            </ChartsTabs>
                        </div>
                    </div>
                </div>

                <h2 className='mb-3 mt-3'>Naposledy navštívené</h2>
                <MovieList type={movieType.upcoming} language={language} mvtvType={mvtvType.movie}></MovieList>
            </div>
        </>
    )
}

function ProtectedSession(props) {
    const session = useSession();
    return (
        <div className={props.wrapperClassName}>
            {session != null && session.status === "authenticated" ? (
                <>
                    {session.data.user.email === props.user.email ? (
                        <div className={props.className}>
                            {props.children}
                        </div>
                    ) : null}
                </>
            ) : ''}
        </div>
    )
}

export const getServerSideProps = async (context) => {
    const prisma = new PrismaClient();
    const { user } = context.query;
    var userData = null;
    try {
        userData = await prisma.user.findFirst({
            where: {
                username: user
            },
            select: {
                email: true,
                createdAt: true,
                userData: {
                    select: {
                        firstname: true,
                        lastname: true,
                        nickname: true,
                        bio: true,
                        gender: true,
                        profileImage: true,
                        profileWallpaper: true,
                    }
                }
            },
        })
    } catch (error) {
        throw new Error(error)
    } finally {
        await prisma.$disconnect();
    }

    if (!userData) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            data: JSON.parse(JSON.stringify(userData)),
        }
    }

}