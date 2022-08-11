import { readFileSync } from "fs";
import { record } from "./record.js";
import { DataPath } from "./config.js";
import list from "../public/Valorala2-data/sources.json";

export async function fetchAllData(level = 1) {
    const sources = list.sources.filter((ele) => ele.level >= level);

    for (const item of sources) {
        import("../fetch/" + item.name + ".js").then(async (mo) => {
            const data = await mo.fetch();
            record(item.name, data);
        });
    }
    return true;
}
