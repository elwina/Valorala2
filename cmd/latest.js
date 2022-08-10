import { readFileSync } from "fs";

export async function fetchData(name) {
    const listRawdata = readFileSync("./data/sources.json");
    const list = JSON.parse(listRawdata);
    const sources = list.sources;
    if (sources.indexOf(name) != -1) {
        throw new Error("没有该参数");
    } else {
        const mo = await import("../fetch/" + name + ".js");
        try {
            const data = await mo.fetch();
            return data;
        } catch {
            throw new Error("参数更新错误");
        }
    }
}
