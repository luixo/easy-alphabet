import * as React from "react";
import type { NextPage } from "next";
import Head from "next/head";

import useLocalStorage from "use-local-storage";
import { Trans, useTranslation } from "react-i18next";

import { Spoiler } from "../components/spoiler";
import {
  DEFAULT_SYMBOL_LIMIT,
  DEFAULT_TEXTS,
  MAX_SYMBOL_LIMIT,
  MIN_SYMBOL_LIMIT,
} from "../constants";
import { AlphabetDescription } from "../types";
import { useBlocks } from "../hooks/use-blocks";
import { styled } from "../styles";
import { LanguageSelector } from "../components/language-selectors";
import { shuffle } from "../utils";
import { AlphabetPicker } from "../components/alphabet-picker";

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
  flexDirection: "column",
  flex: 1,
  padding: "12px 0",
  borderTop: "1px solid #eaeaea",
  justifyContent: "center",
  alignItems: "center",
});

const FooterBlock = styled("div", {
  "& + &": {
    marginTop: 8,
  },
});

const FooterLink = styled("a", {
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
  flexDirection: "column",
  alignItems: "flex-start",
  padding: "10px 0",

  "&:not(:first-of-type)": {
    borderTop: "1px solid gray",
  },
});

const SettingsElement = styled("div", {
  "& + &": {
    marginTop: 8,
  },
});

const SymbolLimitInput = styled("input", {
  width: 70,
});

const Blocks = styled("div");

const TopRight = styled("div", {
  position: "fixed",
  top: 8,
  right: 8,
  zIndex: 999,
});

const Hint = styled("p", {
  position: "sticky",
  top: 0,
  background: "white",
  padding: 4,
});

const ResetButton = styled("button", {
  marginTop: 12,
  alignSelf: "flex-start",

  "& + &": {
    marginLeft: 8,
  },
});

const TextBlock = styled("p", {
  whiteSpace: "pre-wrap",
});

const Home: NextPage = () => {
  const [symbolLimit, setSymbolLimit] = useLocalStorage(
    "symbol_limit",
    DEFAULT_SYMBOL_LIMIT
  );
  const [showHints, setShownHints] = useLocalStorage("show_hints", true);
  const [alphabet, setAlphabet] = useLocalStorage<AlphabetDescription | null>(
    "alphabet",
    null
  );
  const [text, setText] = useLocalStorage(
    "text",
    alphabet ? DEFAULT_TEXTS[alphabet.transform] : ""
  );

  const blocks = useBlocks({ text, symbolLimit, groups: alphabet?.groups });

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

  const shuffleGroups = React.useCallback<React.MouseEventHandler>(() => {
    setAlphabet((prevAlphabet) =>
      prevAlphabet
        ? {
            ...prevAlphabet,
            isCustom: true,
            groups: shuffle(prevAlphabet.groups),
          }
        : prevAlphabet
    );
  }, [setAlphabet]);
  const resetAlphabet = React.useCallback(
    () => setAlphabet(null),
    [setAlphabet]
  );
  const resetText = React.useCallback(() => {
    if (!alphabet) {
      return;
    }
    setText(DEFAULT_TEXTS[alphabet.transform]);
  }, [alphabet, setText]);
  const selectAlphabet = React.useCallback(
    (alphabet: AlphabetDescription) => {
      setAlphabet(alphabet);
      console.log("text", text);
      if (!text) {
        setText(DEFAULT_TEXTS[alphabet.transform]);
      }
    },
    [text, setText, setAlphabet]
  );

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
              <SettingsElement>{t("settings.textarea")}</SettingsElement>

              <SettingsElement>
                <TextArea rows={4} onChange={setTextMemo} value={text} />
              </SettingsElement>

              <SettingsElement>
                <button onClick={resetText}>{t("settings.resetText")}</button>
              </SettingsElement>
            </SettingsBlock>

            <SettingsBlock>
              <span>
                {t("settings.symbolsLimit")}{" "}
                <SymbolLimitInput
                  type="number"
                  value={symbolLimit}
                  onChange={setSymbolLimitMemo}
                  min={15}
                  max={5000}
                />
              </span>
            </SettingsBlock>

            <SettingsBlock>
              <span>
                <input
                  type="checkbox"
                  checked={showHints}
                  onChange={setShowHintsMemo}
                />
                {t("settings.showHints")}
              </span>
            </SettingsBlock>

            {alphabet ? (
              <>
                <SettingsBlock>
                  <SettingsElement>
                    {t("settings.currentLanguage", {
                      language: alphabet.isCustom
                        ? t("alphabet.mixed", { name: t(alphabet.nameKey) })
                        : t(alphabet.nameKey),
                    })}
                  </SettingsElement>
                </SettingsBlock>

                <SettingsBlock>
                  <button onClick={shuffleGroups}>
                    {t("settings.randomAlphabet")}
                  </button>
                </SettingsBlock>
              </>
            ) : null}
          </Spoiler>
        </SettingsWrapper>

        {alphabet ? (
          <>
            <div>
              <ResetButton onClick={resetAlphabet}>
                {t("settings.resetAlphabet")}
              </ResetButton>

              <ResetButton onClick={resetText}>
                {t("settings.resetText")}
              </ResetButton>
            </div>

            <Blocks>
              {blocks.map((block, index) => (
                <React.Fragment key={index}>
                  <div>
                    {showHints && block.alphabetGroup ? (
                      <Hint>
                        {`${block.alphabetGroup.from.join(
                          ", "
                        )} → ${block.alphabetGroup.to.join(", ")}`}
                      </Hint>
                    ) : null}
                    <TextBlock>{block.text}</TextBlock>
                  </div>
                </React.Fragment>
              ))}
            </Blocks>
          </>
        ) : (
          <AlphabetPicker onSelect={selectAlphabet} />
        )}
      </Main>

      <Footer>
        <FooterBlock>
          <Trans
            i18nKey="footer.builtBy"
            components={[<FooterLink key="link" href="https://t.me/luixo" />]}
          />
        </FooterBlock>
        <FooterBlock>
          <Trans
            i18nKey="footer.inspiredBy"
            components={[
              <FooterLink
                key="link"
                href="https://palaman.livejournal.com/260927.html"
              />,
            ]}
          />
        </FooterBlock>
      </Footer>
    </Container>
  );
};

export default Home;
