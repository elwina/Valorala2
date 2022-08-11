// import { readFileSync } from "fs";
// import { DataPath } from "../cmd/config.js";
import list from "../public/Valorala2-data/sources.json";

import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
    const sources = list.sources;
    const listItems = sources.map((sources) => <li>{sources.name}</li>);

    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
            </Head>

            <main className={styles.main}>
                <ul>{listItems}</ul>
            </main>

            <footer className={styles.footer}>
                <a
                    href="https://next.new"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Created with&nbsp;<b>next.new</b>&nbsp;⚡️
                </a>
            </footer>
        </div>
    );
}

// export async function getStaticProps() {
//     const listRawdata = readFileSync(DataPath + "/sources.json");
//     const list = JSON.parse(listRawdata);
//     const sources = list.sources;
//     return {
//         props: {
//             sources,
//         },
//     };
// }
