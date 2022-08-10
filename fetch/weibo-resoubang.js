import axios from "axios";
import qs from "qs";
import { CookieJar } from "tough-cookie";
import { wrapper } from "axios-cookiejar-support";

import * as cheerio from "cheerio";

export const SourceName = "weibo-resoubang";
export const SourceLevel = 4;
export const SourceInfo = "新浪微博的热搜榜";

export async function fetch() {
    axios.defaults.withCredentials = true;

    // 新浪微博获得cookie
    // 请求1 获得tid等信息
    const tidPost = await axios.post(
        "https://passport.weibo.com/visitor/genvisitor",
        qs.stringify({
            cb: "gen_callback",
            fp: '{"os":"1","browser":"Gecko103,0,0,0","fonts":"undefined","screenInfo":"1365*853*24","plugins":"Portable Document Format::internal-pdf-viewer::PDF Viewer|Portable Document Format::internal-pdf-viewer::Chrome PDF Viewer|Portable Document Format::internal-pdf-viewer::Chromium PDF Viewer|Portable Document Format::internal-pdf-viewer::Microsoft Edge PDF Viewer|Portable Document Format::internal-pdf-viewer::WebKit built-in PDF"}',
        })
    );
    const tidPostRes = tidPost.data;
    const tidJSON = tidPostRes.substring(36, tidPostRes.length - 2);

    const tidPostData = JSON.parse(tidJSON);
    const tid_o = tidPostData.data.tid;
    const tid = encodeURIComponent(tidPostData.data.tid);
    const tid_w = tidPostData.data.new_tid == false ? 2 : 3;
    let tid_c =
        tidPostData.data.confidence != undefined
            ? "000" + tidPostData.data.confidence
            : "100";
    tid_c = tid_c.substring(tid_c.length - 3);

    // 请求2 获得sub,subp
    const subGet = await axios.get(
        `https://passport.weibo.com/visitor/visitor?a=incarnate&t=${tid}&w=${tid_w}&c=${tid_c}&gc=&cb=cross_domain&from=weibo&_rand=${Math.random()}`,
        {
            headers: {
                Cookie: `tid=${tid_o}__${tid_c}`,
            },
        }
    );
    const subGetRes = subGet.data;
    const subJSON = subGetRes.substring(36, subGetRes.length - 2);
    const subGetData = JSON.parse(subJSON);

    const sub = subGetData.data.sub;
    const subp = subGetData.data.subp;

    // 请求3 登陆获得SUB,SUBP
    const jar = new CookieJar();
    const client = wrapper(axios.create({ jar, withCredentials: true }));
    const loginGet = await client.get(
        `https://login.sina.com.cn/visitor/visitor?a=crossdomain&cb=return_back&s=${sub}&sp=${subp}&from=weibo&_rand=0.14986399355742863&entry=miniblog`
    );

    let SUB;
    let SUBP;
    for (const item of loginGet.config.jar.toJSON().cookies) {
        if (item.key == "SUB") {
            SUB = item.value;
        }
        if (item.key == "SUBP") {
            SUBP = item.value;
        }
    }
    // 请求4 获取热榜
    const summaryGet = await axios.get(
        `https://s.weibo.com/top/summary/summary?cate=realtimehot`,
        {
            headers: {
                Cookie: `SUB=${SUB}; SUBP=${SUBP}`,
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:103.0) Gecko/20100101 Firefox/103.0",
            },
        }
    );

    const $ = cheerio.load(summaryGet.data);
    const data = [];
    $(".td-02").each((_i, ele) => {
        const txt = $(ele).children("a").text();
        data.push(txt);
    });

    return data;
}
