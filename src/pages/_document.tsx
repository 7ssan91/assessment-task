import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';
import type { ServerResponse } from 'http';

type MyDocumentProps = {
  lang?: string;
};

type MyDocumentContextProps = DocumentContext & {
  res: ServerResponse & { locals: { lang: any } };
};

class MyDocument extends Document<MyDocumentProps> {
  static async getInitialProps(ctx: MyDocumentContextProps): Promise<any> {


    const lang = ctx?.res.locals?.lang || 'en';
    const initialProps: any = await Document.getInitialProps(ctx);
    return { ...initialProps, lang };
  }

  render(): JSX.Element {
    const lang = this?.props?.locale;
    
    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    return (
      <Html lang={lang} dir={dir}>
        <Head>
          <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
          <meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />
          <meta id='theme-meta' name='theme-color' content='rgb(253,239,236)' />
          <meta
            name='msapplication-navbutton-color'
            content='rgb(253,239,236)'
          />
          <meta
            name='apple-mobile-web-app-status-bar-style'
            content='rgb(253,239,236)'
          />
          <meta property='og:type' content='website' />
          <meta property='og:site_name' content='WEBSITE_NAME' />
          <meta property='og:image:type' content='image/jpg' />
          <meta property='og:image:width' content='200' />
          <meta property='og:image:height' content='200' />

        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
