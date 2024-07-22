import {http} from "../https.js";
import {FileBox} from "file-box";
import {log} from "wechaty";


export const unifiedVideo = (talker, text, room, bot) => {

    let params = {
        url: text
    }
    let headers = {
        "Origin": "https://cobalt.tools",
        "Referer": "https://cobalt.tools/",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36",
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
    http("https://api.cobalt.tools/api/json", "post", params, 2, headers).then(res => {
        let fileBox = FileBox.fromUrl(res.data.url, {name: "video.mp4"});
        room.say(fileBox)
    }, err => {
        log.error(err)
        room.say("解析失败，请检查链接是否正确err")
    }).catch(err => {
        log.error(err)
        room.say("解析失败，请检查链接是否正确catch")
    })
}
