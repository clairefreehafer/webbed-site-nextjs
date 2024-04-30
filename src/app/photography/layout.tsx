import Nav from "@app/components/nav";
import styles from "./layout.module.scss";

const { header, main } = styles;

export default function PhotographyLayout({ children }:
  { children: Readonly<React.ReactNode> }
) {
  return (
    <>
      <header className={header}>
        <Nav />
        <h1>claire freehafer</h1>
        <h2>photography</h2>
      </header>
      <main className={main}>
        {children}
      </main>
    </>
  )
}