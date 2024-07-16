import Nav from "@components/Nav";
import "@styles/default/theme.css";

export default function Home() {
  return (
    <div className="bg-rainbow min-h-screen min-w-full p-[2px] text-white">
      <div className="min-h-[calc(100vh-2*2px)] min-w-[calc(100vw-2*2px)] bg-black">
        <Nav />
        <main className="flex flex-col items-center justify-center">
          <h1>claire freehafer</h1>
          <p className="mt-0">
            please click around the site, but be warned it is an active work in
            progress. :)
          </p>
          <p>
            <a href="https://github.com/clairefreehafer/webbed-site-nextjs">
              view on github
            </a>
          </p>
          <p className="mt-0">find me elsewhere:</p>
          <ul>
            <li>
              💻 <a href="https://github.com/clairefreehafer">github</a>
            </li>
            <li>
              👔 <a href="https://linkedin.com/in/clairefreehafer">linkedin</a>
            </li>
            <li>
              📚 <a href="https://bookwyrm.social.user/loam">bookwyrm</a>
            </li>
          </ul>
        </main>
      </div>
    </div>
  );
}
