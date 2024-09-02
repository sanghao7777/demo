/**
 * @author Aming
 * @name 定时发送信息
 * @team Bncr团队
 * @version 1.0.0
 * @description 定时发送信息
 * @priority 5
 * @disable false
 * @service true
 * @public false
 */
//cron定时规则
const systemInfo = `
系统正常
`;
sysMethod.cron.newCron('0 0 0,6,12,18 * * *', () => {
    sysMethod.push({
        platform: 'tgBot',    //发送的平台
        userId: `1632046106`, //个人id
        msg: systemInfo,
        type: 'text',
    }); 

});
