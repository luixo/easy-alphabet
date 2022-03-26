import * as React from "react";
import type { NextPage } from "next";
import Head from "next/head";

import useLocalStorage from "use-local-storage";
import { Trans, useTranslation } from "react-i18next";

import { Spoiler } from "../components/spoiler";
import {
  DEFAULT_ALPHABET,
  DEFAULT_SYMBOL_LIMIT,
  DEFAULT_TEXT,
  MAX_SYMBOL_LIMIT,
  MIN_SYMBOL_LIMIT,
} from "../constants";
import { Alphabet } from "../types";
import { useBlocks } from "../hooks/use-blocks";
import { styled } from "../styles";
import { LanguageSelector } from "../components/language-selectors";
import { shuffle } from "../utils";

const Container = styled("div", {
  padding: "0 1rem",
});

const Main = styled("main", {
  minHeight: "calc(100vh - 12px)",
  padding: "16px 0",
  flex: 1,
  display: "flex",
  flexDirection: "column",
});

const Footer = styled("footer", {
  display: "flex",
  flex: 1,
  padding: "12px 0",
  borderTop: "1px solid #eaeaea",
  justifyContent: "center",
  alignItems: "center",
});

const FooterLink = styled("a", {
  marginLeft: 6,
  textDecoration: "underline",
});

const TextArea = styled("textarea", {
  width: "100%",
});

const Title = styled("h1", {
  margin: 0,
  lineHeight: 1.15,
  fontSize: "3rem",
  textAlign: "center",
});

const SettingsWrapper = styled("div", {
  marginTop: 20,
  width: "100%",
});

const SettingsBlock = styled("div", {
  display: "flex",
  padding: "10px 0",
  "&:not(:first-of-type)": {
    borderTop: "1px solid gray",
  },
});

const SymbolLimitInput = styled("input", {
  width: 70,
});

const Blocks = styled("div");

const TopRight = styled("div", {
  position: "fixed",
  top: 12,
  right: 12,
  zIndex: 999,
});

const Hint = styled("p", {
  position: "sticky",
  top: 0,
  background: "white",
  padding: 4,
});

const ActionButton = styled("button", {
  "& + &": {
    marginLeft: 16,
  },
});

const Home: NextPage = () => {
  const [text, setText] = useLocalStorage("text", DEFAULT_TEXT);
  const [symbolLimit, setSymbolLimit] = useLocalStorage(
    "symbol_limit",
    DEFAULT_SYMBOL_LIMIT
  );
  const [showHints, setShownHints] = useLocalStorage("show_hints", true);
  const [alphabet, setAlphabet] = React.useState<Alphabet>(DEFAULT_ALPHABET);

  const blocks = useBlocks({ text, symbolLimit, alphabet });

  const { t } = useTranslation();

  const setTextMemo = React.useCallback<
    React.ChangeEventHandler<HTMLTextAreaElement>
  >((e) => setText(e.currentTarget.value), [setText]);

  const setSymbolLimitMemo = React.useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >(
    (e) => {
      const currentLimit =
        parseInt(e.currentTarget.value) || DEFAULT_SYMBOL_LIMIT;
      setSymbolLimit(
        Math.max(Math.min(currentLimit, MAX_SYMBOL_LIMIT), MIN_SYMBOL_LIMIT)
      );
    },
    [setSymbolLimit]
  );

  const setShowHintsMemo = React.useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >((e) => setShownHints(e.currentTarget.checked), [setShownHints]);

  const setRandomAlphabet = React.useCallback<React.MouseEventHandler>(() => {
    setAlphabet((prevAlphabet) => shuffle(prevAlphabet));
  }, [setAlphabet]);

  const setDefaultAlphabet = React.useCallback<React.MouseEventHandler>(() => {
    setAlphabet(DEFAULT_ALPHABET);
  }, [setAlphabet]);

  return (
    <Container>
      <Head>
        <title>{t("meta.title")}</title>
        <meta name="description" content={t("meta.description")} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <TopRight>
        <LanguageSelector />
      </TopRight>

      <Main>
        <Title>{t("meta.title")}</Title>

        <SettingsWrapper>
          <Spoiler header={t("settings.title")}>
            <SettingsBlock>
              {t("settings.textarea")}
              <TextArea rows={4} onChange={setTextMemo} value={text} />
            </SettingsBlock>

            <SettingsBlock>
              <span>{t("settings.symbolsLimit")}</span>
              <SymbolLimitInput
                type="number"
                value={symbolLimit}
                onChange={setSymbolLimitMemo}
                min={15}
                max={5000}
              />
            </SettingsBlock>

            <SettingsBlock>
              <span>{t("settings.showHints")}</span>
              <input
                type="checkbox"
                checked={showHints}
                onChange={setShowHintsMemo}
              />
            </SettingsBlock>

            <SettingsBlock>
              <ActionButton onClick={setRandomAlphabet}>
                {t("settings.randomAlphabet")}
              </ActionButton>
              <ActionButton onClick={setDefaultAlphabet}>
                {t("settings.defaultAlphabet")}
              </ActionButton>
            </SettingsBlock>
          </Spoiler>
        </SettingsWrapper>

        <Blocks>
          {blocks.map((block, index) => (
            <React.Fragment key={index}>
              <div>
                {showHints && block.alphabetGroup ? (
                  <Hint>
                    {`${block.alphabetGroup.from.join(", ")} → ${
                      block.alphabetGroup.to
                    }`}
                  </Hint>
                ) : null}
                <p>{block.text}</p>
              </div>
            </React.Fragment>
          ))}
        </Blocks>
      </Main>

      <Footer>
        <Trans
          i18nKey="footer.builtBy"
          components={[<FooterLink key="link" href="https://t.me/luixo" />]}
        />
      </Footer>
    </Container>
  );
};

export default Home;
