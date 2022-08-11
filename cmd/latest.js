import { readFileSync } from "fs";
import { DataPath } from "./config.js";
import list from "../public/Valorala2-data/sources.json";

export async function fetchData(name) {
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
