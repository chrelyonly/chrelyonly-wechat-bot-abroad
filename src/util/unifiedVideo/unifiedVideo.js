import {http} from "../https.js";
import {FileBox} from "file-box";
import {log} from "wechaty";


export const unifiedVideo = (talker, text, room, bot) => {

    let params = {
        url: text
    }
    let headers = {
    }
    http("https://api.cobalt.tools/api/json", "post", params, 2, headers).then(res => {
        let fileBox = FileBox.fromUrl(res.data.url.url, {name: "video.mp4"});
        room.say(fileBox)
    }, err => {
        log.error(err)
        room.say("解析失败，请检查链接是否正确err")
    }).catch(err => {
        log.error(err)
        room.say("解析失败，请检查链接是否正确catch")
    })
}
