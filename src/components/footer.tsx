import { Trans } from "react-i18next";

export const Footer = () => (
  <footer className="flex flex-col items-center justify-center gap-2 border-t py-2">
    <div>
      <Trans
        i18nKey="footer.builtBy"
        components={[
          <a className="underline" key="link" href="https://t.me/luixo" />,
        ]}
      />
    </div>
    <div>
      <Trans
        i18nKey="footer.inspiredBy"
        components={[
          <a
            className="underline"
            key="link"
            href="https://palaman.livejournal.com/260927.html"
          />,
        ]}
      />
    </div>
  </footer>
);
