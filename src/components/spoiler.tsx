import * as React from "react";
import { styled } from "../styles";

const Wrapper = styled("div", {
  width: "100%",
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
});

const Title = styled("span", {
  marginRight: 8,
});

const Line = styled("div", {
  flex: 1,
  borderTop: "1px solid black",
});

const Spoiled = styled("div", {
  padding: "20px 32px",
});

type Props = {
  header: string;
};

export const Spoiler: React.FC<Props> = (props) => {
  const [isOpen, setOpen] = React.useState(false);
  const switchOpen = React.useCallback(() => setOpen((x) => !x), [setOpen]);
  return (
    <>
      <Wrapper onClick={switchOpen}>
        <Title>
          {isOpen ? "🔽" : "▶"} {props.header}
        </Title>
        <Line />
      </Wrapper>
      {isOpen ? (
        <>
          <Spoiled>{props.children}</Spoiled>
          <Line />
        </>
      ) : null}
    </>
  );
};
