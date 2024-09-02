/**
 * @author Aming
 * @name 定时任务
 * @team Bncr团队
 * @version 1.0.0
 * @description 定时触发命令示例
 * @priority 5
 * @disable false
 * @service true
 * @public false
 * @classification ["定时任务","示例插件"]
 */

const systemInfo = `
系统正常
`;
sysMethod.cron.newCron('0 0 0,6,12,18 * * *', () => {
    sysMethod.push({
        platform: 'tgBot',
        userId: `1632046106`,
        msg: systemInfo,
        type: 'text',
    }); 

});