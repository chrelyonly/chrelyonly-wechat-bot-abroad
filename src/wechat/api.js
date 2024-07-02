// 扫码
import {log, ScanStatus} from "wechaty";
import qrTerminal from "qrcode-terminal";
import {FileBox} from "file-box";

export function onScan(qrcode, status) {
    if (status === ScanStatus.Waiting || status === ScanStatus.Timeout) {
        // 在控制台显示二维码
        qrTerminal.generate(qrcode, {small: true})
        log.info('等待扫码:', ScanStatus[status], status)
    } else {
        log.info('已扫码,请确认登录: %s(%s)', ScanStatus[status], status)
    }
}

// 登录
export function onLogin(user, bot) {
//保存token以便下次登录
    log.info(`${user} 登陆成功`)
}

// 登录
export function roomTopic(room, topic, oldTopic, changer) {
    log.info(`群 ${room.topic()} 修改名称,旧名称 ${oldTopic} 新名称 ${topic} 来自 ${changer.name()}`)
}

/**
 * 消息监听
 */
export function onMessage(message, bot) {
    // 判断是否机器人自己发送的
    if (message.self()) {
        return;
    }
    // 消息类型是否为文本
    const txtType = message.type()
    // 获取发送者
    let talker = message.talker()
    // 根据消息内容回复
    let text = message.text();
    // 判断是否是群消息  获取发送群
    let room = message.room();
    if (room) {
        //     判断群名称
        room.topic().then(function (res) {
            // 定义支持的群
            // if (!res.toString().includes("🍓酱の后🌸园  SVIP内部群1")){
            //     // 不支持的群
            //     log.info("不支持的群")
            //     return;
            // }
            // 7是文本
            if (txtType === 7) {
                // youtube解析, 这个有点问题,等待找个新接口
                if (text.includes("youtu.be") || text.includes("www.youtube.com")) {
                    youtubeVideo(talker,text,room,bot)
                    return;
                }
            }
        })

    } else {
        log.info('收到个人消息')
    }
}

/**
 * 失败操作
 */
export function onError(msg) {
    // log.info("启动失败,请检查是否实名,是否绑定手机号,是否绑定银行卡")
    log.info(msg)
    // 停止node
    // process.exit()
}
