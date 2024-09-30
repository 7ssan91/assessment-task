import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import absoluteUrl from 'next-absolute-url';
import { AppErrorBoundary } from '../components/AppErrorBoundary'
import { AppContextProvider } from '../context/AppContext'
import App from 'next/app';
import { APP_CONFIGS } from '../clients/configs';
import { apiClient } from '../lib/apiClient';
import { AppLayout } from '../components/Layout';
type MyAppPropsTypes = AppProps & {
  globalData?: any;
  activePageUrl?: string;
  hostname?: string;
  ssrAuthenticated?: boolean;
  ssrAuthUser?: string;
};
const MyApp = ({
  Component,
  pageProps,
  globalData = {},
  activePageUrl = '',
  hostname = '',
  ssrAuthenticated = false,
  ssrAuthUser = '',
}: MyAppPropsTypes) => {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <AppErrorBoundary>
        <AppContextProvider
          initSSRprops={{
            globalData,
            activePageUrl,
            hostname,
            ssrAuthenticated,
            ssrAuthUser,
          }}>
          <AppLayout>
            <div className='mx-auto md:container'>
              <Component {...pageProps} />
            </div>
          </AppLayout>


        </AppContextProvider>
      </AppErrorBoundary>
    </>
  )

}
MyApp.getInitialProps = async (appContext: any) => {
  const {
    ctx: { res, req, err = '' },
  } = appContext;
  const activePageUrl = req ? req.url : '';
  const { origin } = absoluteUrl(req);
  const { globalData, ssrAuthenticated, ssrAuthUser } =
    res?.locals || {
      globalData: {},
      ssrAuthenticated: false,
      ssrAuthUser: '',
    };
  const appProps = await App.getInitialProps(appContext);
  if (err && req) {
    const client = apiClient(APP_CONFIGS.app.baseUrl, req, res);
    // only send error from SSR
    const errorObject = {
      stack: JSON.stringify(err?.stack || ''),
      message: err?.message,
      name: err?.name,
      fileName: err?.fileName,
      lineNumber: err?.lineNumber,
      columnNumber: err?.columnNumber,
    };
    await client.post('/logging', errorObject, {
      headers: {
        iserror: true,
      },
    });
  }
  return {
    ...appProps,
    globalData,
    activePageUrl,
    hostname: origin,
    ssrAuthenticated,
    ssrAuthUser,
  };
};

export default MyApp;
