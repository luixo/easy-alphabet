import NextApp, { AppContext } from "next/app";
import { AppType } from "next/dist/shared/lib/utils";
import React from "react";
import { i18n } from "i18next";
import { I18nextProvider, setI18n } from "react-i18next";
import { useLanguage } from "../hooks/use-language";
import { getI18n } from "../i18n";
import { globalCss } from "../styles";

const globalStyles = globalCss({
  "html,body": {
    padding: 0,
    margin: 0,
    fontFamily:
      "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
  },

  a: {
    color: "inherit",
    textDecoration: "none",
  },

  "*": {
    boxSizing: "border-box",
  },
});

const App: AppType = ({ Component, pageProps }) => {
  globalStyles();
  const [language] = useLanguage();
  const [i18n] = React.useState<i18n>(() => {
    const i18n = getI18n(language);
    void i18n.init();
    return i18n;
  });
  return (
    <I18nextProvider i18n={i18n}>
      <Component {...pageProps} />
    </I18nextProvider>
  );
};

App.getInitialProps = async (appContext) => {
  if (appContext.ctx.req) {
    const i18nInstance = getI18n();
    await i18nInstance.init({
      react: {
        useSuspense: false,
      },
    });
    setI18n(i18nInstance);
  }
  return await NextApp.getInitialProps(appContext as AppContext);
};

export default App;
