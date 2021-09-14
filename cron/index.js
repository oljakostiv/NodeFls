const cron = require('node-cron');

const sendEmail = require('./send-email');

module.exports = () => {
    cron.schedule('* 30 6 * * 1,3,5', async () => {
        console.log(`Cron started at ${new Date().toISOString()}`);
        await sendEmail();
        console.log(`Cron finished at ${new Date().toISOString()}`);
    });
};
