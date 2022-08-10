import { readdirSync, writeFileSync } from "fs";
import { fetchAllData } from "./fetch.js";

async function init() {
    const files = readdirSync("./fetch/");
    const sources = [];
    for (const file of files) {
        await import("../fetch/" + file).then(async (mo) => {
            sources.push({
                name: mo.SourceName,
                level: mo.SourceLevel,
                info: mo.SourceInfo,
            });
        });
    }
    const re = {
        generateTime: new Date().toISOString(),
        sources: sources,
    };
    writeFileSync("./data/sources.json", JSON.stringify(re), {
        flag: "w",
    });

    const level = process.argv.slice(2);
    fetchAllData(level);
}

init();
