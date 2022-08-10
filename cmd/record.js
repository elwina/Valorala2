import { writeFileSync } from "fs";

export function record(name, data) {
    const input = {
        updateTime: new Date().toISOString(),
        data: data,
    };
    writeFileSync("./data/" + name + ".json", JSON.stringify(input), {
        flag: "w",
    });
}
