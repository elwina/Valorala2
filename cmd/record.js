import { writeFileSync } from "fs";
import { DataPath } from "./config.js";

export function record(name, data) {
    const input = {
        updateTime: new Date().toISOString(),
        data: data,
    };
    writeFileSync(DataPath + "/" + name + ".json", JSON.stringify(input), {
        flag: "w",
    });
}
