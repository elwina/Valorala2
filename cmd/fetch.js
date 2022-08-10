import { readFileSync } from "fs";
import { record } from "./record.js";

export async function fetchAllData() {
    const listRawdata = readFileSync("./data/sources.json");
    const list = JSON.parse(listRawdata);
    const sources = list.sources;
    for (const item of sources) {
        import("../fetch/" + item.name + ".js").then(async (mo) => {
            const data = await mo.fetch();
            record(item.name, data);
        });
    }
    return true;
}
