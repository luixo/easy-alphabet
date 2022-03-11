import * as React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import useLocalStorage from "use-local-storage";

import { Spoiler } from "../src/components/spoiler";
import {
  DEFAULT_ALPHABET,
  DEFAULT_SYMBOL_LIMIT,
  DEFAULT_TEXT,
  MAX_SYMBOL_LIMIT,
  MIN_SYMBOL_LIMIT,
} from "../src/constants";
import { Alphabet } from "../src/types";
import { useBlocks } from "../src/hooks/use-blocks";
import { styled } from "../src/styles";

const Container = styled("div", {
  padding: "0 1rem",
});

const Main = styled("main", {
  minHeight: "100vh",
  padding: "4rem 0",
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});

const Footer = styled("footer", {
  display: "flex",
  flex: 1,
  padding: "2rem 0",
  borderTop: "1px solid #eaeaea",
  justifyContent: "center",
  alignItems: "center",
});

const FooterLink = styled("a", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexGrow: 1,
});

const VercelLogo = styled("span", {
  height: "1em",
  marginLeft: "0.5rem",
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

const SymbolLimitInput = styled("input", {
  width: 70,
});

const Blocks = styled("div", { paddingLeft: 16 });

const Home: NextPage = () => {
  const [text, setText] = useLocalStorage("text", DEFAULT_TEXT);
  const [symbolLimit, setSymbolLimit] = useLocalStorage(
    "symbol_limit",
    DEFAULT_SYMBOL_LIMIT
  );
  const [alphabet, setAlphabet] = React.useState<Alphabet>(DEFAULT_ALPHABET);

  const blocks = useBlocks({ text, symbolLimit, alphabet });

  const setTextMemo = React.useCallback(
    (e) => setText(e.currentTarget.value),
    [setText]
  );

  const setSymbolLimitMemo = React.useCallback(
    (e) => {
      const currentLimit =
        parseInt(e.currentTarget.value) || DEFAULT_SYMBOL_LIMIT;
      setSymbolLimit(
        Math.max(Math.min(currentLimit, MAX_SYMBOL_LIMIT), MIN_SYMBOL_LIMIT)
      );
    },
    [setSymbolLimit]
  );

  return (
    <Container>
      <Head>
        <title>Easy Alphabet</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main>
        <Title>Easy Alphabet</Title>

        <SettingsWrapper>
          <Spoiler header="Settings">
            Text:
            <TextArea rows={4} onChange={setTextMemo} value={text} />
            <span>Paragraph symbol limit</span>
            <SymbolLimitInput
              type="number"
              value={symbolLimit}
              onChange={setSymbolLimitMemo}
              min={15}
              max={5000}
            />
          </Spoiler>
        </SettingsWrapper>

        <Blocks>
          {blocks.map((block, index) => (
            <div key={index}>
              {block.alphabetGroup ? (
                <p>
                  {block.alphabetGroup.from.join(", ")} ➡{" "}
                  {block.alphabetGroup.to}
                </p>
              ) : null}
              <p>{block.text}</p>
            </div>
          ))}
        </Blocks>
      </Main>

      <Footer>
        <FooterLink
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <VercelLogo>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </VercelLogo>
        </FooterLink>
      </Footer>
    </Container>
  );
};

export default Home;
