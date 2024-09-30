import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { cookieStore } from "../../cookieStore";
import { useApp } from "../../hooks/useApp";
import { useTranslator } from "../../hooks/useTranslator";
import { redirectToRoute } from "../../lib";
import { Button } from "../shared/Button";

export const AppHeader: React.FC<any> = () => {
    const [navbar, setNavbar] = useState(false);
    const { setLang, pathname } = useApp()
    const router = useRouter()
    const { locales, locale: activeLocale, defaultLocale } = router
    const { __T } = useTranslator();

    const otherLocales = (locales || []).filter(
        (locale) => locale !== activeLocale
    )
    const dirPath = pathname?.split('/')?.[1]?.toLowerCase() || 'en';

    useEffect(() => {
        setLang(dirPath)
        if (window.location.pathname === '/') {
            router.push(`/${dirPath}`, undefined, { shallow: true })
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dirPath])
    const onLanguageButtonClick = () => {
        const language: string = activeLocale === 'ar' ? 'en' : 'ar';
        const currentUrl: any = window.location.pathname.split(
            `/${activeLocale === 'ar' ? 'ar' : 'en'}/`)?.[1] || '';
        const newUrl = `/${language}/`.concat(
            currentUrl,
            window.location.search
        );
        setLang(language);
        cookieStore.setCookie('lang', language);
        redirectToRoute(newUrl, true);


    };
    return (
        <nav className="w-full bg-white shadow">
            <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
                <div>
                    <div className="flex items-center justify-between py-3 md:py-5 md:block">
                        <Link href="/">
                            <h2 className="text-2xl font-bold text-brand-100">LOGO</h2>
                        </Link>
                        <div className="md:hidden">
                            <button
                                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                                onClick={() => setNavbar(!navbar)}
                            >
                                {navbar ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6 text-black-200"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6 text-black"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <div
                        className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${navbar ? "block" : "hidden"
                            }`}
                    >
                        <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                            <li className="text-black-100 hover:text-brand-100 mx-2">
                                <Link href={`/${activeLocale}`}>{__T('HOME')}</Link>
                            </li>
                            <li className="text-black-100 hover:text-brand-100 mx-2">
                                <Link href={`/${activeLocale}/about`}>{__T('ABOUT US')}</Link>
                            </li>
                            <li className="text-black-100 hover:text-indigo-200">
                                <Button name="reserve" label={'reserve'} buttonStyle={'secondary'}/>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="hidden space-x-2 md:inline-block">
                    <ul className="inline">
                        {otherLocales.map((locale) => {
                            const { pathname, query, asPath } = router
                            return (
                                <li key={locale} onClick={onLanguageButtonClick} className="float-left px-4 py-2 text-black-100  hover:text-brand-100">
                                    <Link
                                        href={{ pathname, query }}
                                        as={asPath}
                                        locale={locale}
                                        legacyBehavior
                                    >
                                        {locale === 'ar' ? 'العربية' : 'EN'}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>

                </div>
            </div>
        </nav >
    )
}