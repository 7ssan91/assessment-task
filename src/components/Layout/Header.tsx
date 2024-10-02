import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useMemo, useState } from "react";
import { cookieStore } from "../../cookieStore";
import { useApp } from "../../hooks/useApp";
import { redirectToRoute } from "../../lib";
import { CartContext } from "../../context/CartContext";

export const AppHeader: React.FC = () => {
  const [navbar, setNavbar] = useState(false);
  const { setLang } = useApp();
  const router = useRouter();
  const { locales, locale: activeLocale } = router;
  const { cartState } = useContext(CartContext);
  const otherLocales = useMemo(
    () => (locales || []).filter((locale) => locale !== activeLocale),
    [locales, activeLocale]
  );

  const onLanguageButtonClick = () => {
    const language = activeLocale === "ar" ? "en" : "ar";
    const currentUrl =
      window.location.pathname.split(
        `/${activeLocale === "ar" ? "ar" : "en"}/`
      )?.[1] || "";
    const newUrl = `/${language}/`.concat(currentUrl, window.location.search);
    setLang(language);
    cookieStore.setCookie("lang", language);
    redirectToRoute(newUrl, true);
  };

  return (
    <nav className="w-full bg-white shadow border-b sticky top-0 z-50">
      <div className="justify-between mx-auto container md:items-center md:flex md:px-8">
        <div className="flex items-center justify-between py-3 md:py-5">
          <div className="flex">
            <Link href="/" passHref>
              <h2 className="text-2xl font-bold text-brand-100">LOGO</h2>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              aria-label="Toggle Menu"
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

        {/* Desktop Menu */}
        <div
          className={`flex justify-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
            navbar ? "block" : "hidden"
          }`}
        >
          <ul className="items-center space-y-8 md:flex md:space-x-6 md:space-y-0">
            <li className="text-black-100 hover:text-brand-100 mx-2 relative">
              <Link href={`/${activeLocale}/cart`}> 🛒</Link>
              <label
                htmlFor=""
                className="rounded-full absolute bg-brand-100 text-white text-xs font-semibold px-1 -top-1"
              >
                {cartState?.cartListItems?.length || null}
              </label>
            </li>
            {otherLocales.map((locale) => {
              const { pathname, query, asPath } = router;
              return (
                <li
                  key={locale}
                  onClick={onLanguageButtonClick}
                  className="hidden"
                >
                  <Link href={{ pathname, query }} as={asPath} locale={locale}>
                    {locale === "ar" ? "العربية" : "EN"}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};
