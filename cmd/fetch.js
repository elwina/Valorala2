import { readFileSync } from "fs";
import { record } from "./record.js";

export async function fetchAllData(level = 1) {
    const listRawdata = readFileSync("./data/sources.json");
    const list = JSON.parse(listRawdata);

    const sources = list.sources.filter((ele) => ele.level >= level);

    for (const item of sources) {
        import("../fetch/" + item.name + ".js").then(async (mo) => {
            const data = await mo.fetch();
            record(item.name, data);
        });
    }
    return true;
}
