import Link from "next/link";
import { Fragment } from "react";
import styled from "styled-components"

const Title = styled.h1`
  margin: 0.5rem auto;
`;

export default function generateTitle(pathname: string[], separator = "▽") {
  return pathname.map((slug, idx) => {
    if (idx === 0) {
      return <Title key={slug}>claire freehafer</Title>
    } else {
      return (
        <Fragment key={slug}>
          <div className={`separator-${idx}`}>{separator}</div>
          <Title as={`h${idx + 1}`}>
            <Link href={`/${pathname.slice(1, idx + 1).join("/")}`}>
              {slug}
            </Link>
          </Title>
        </Fragment>
      )
    }
  })
}