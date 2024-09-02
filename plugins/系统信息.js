/**
 * @author Aming
 * @team Bncr团队
 * @name 系统信息
 * @version 1.0.4
 * @description 获取系统信息
 * @rule ^(/sysinfo)$
 * @admin true
 * @public false
 * @priority 1
 * @disable false
 */
const os = require('os');

// 获取系统信息的函数
const getSystemInfo = () => {
    const uptime = os.uptime();
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const usedMem = totalMem - freeMem;
    const loadAvg = os.loadavg();

    const usedMemMB = (usedMem / 1024 / 1024).toFixed(2);
    const freeMemMB = (freeMem / 1024 / 1024).toFixed(2);

    const uptimeDays = Math.floor(uptime / 86400);
    const uptimeHours = Math.floor((uptime % 86400) / 3600);
    const uptimeMinutes = Math.floor((uptime % 3600) / 60);
    const uptimeFormatted = `${uptimeDays}天 ${uptimeHours}小时 ${uptimeMinutes}分钟`;

    return `
**系统信息**
- 运行时间: ${uptimeFormatted}
- 内存使用: 已使用 ${usedMemMB} MB / 未使用 ${freeMemMB} MB
- 系统负载(1/5/15分钟): ${loadAvg.map(avg => avg.toFixed(2)).join('/')}
    `;
};

module.exports = async (sender) => {
    try {
        const systemInfo = getSystemInfo();
        await sender.reply(systemInfo);
    } catch (error) {
        console.error(`获取系统信息时出错: ${error.message}`);
        await sender.reply('获取系统信息时出现错误，请稍后再试。');
    }
};

// 定时任务：每天中午12点自动推送系统信息
sysMethod.cron.newCron('0 0 0,12 * * *', () => {
    try {
        const systemInfo = getSystemInfo();
        sysMethod.push({
            platform: 'tgBot',
            userId: '1632046106', // 目标用户的Telegram ID
            msg: systemInfo,
            type: 'text',
        });
    } catch (error) {
        console.error(`定时推送系统信息时出错: ${error.message}`);
    }
});
