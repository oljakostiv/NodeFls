const dayJs = require('dayjs');
const utc = require('dayjs/plugin/utc');

dayJs.extend(utc);

const { constants: { DAY }, emailActions } = require('../config');
const { OAuthModel } = require('../dataBase');
const { emailService } = require('../services');

module.exports = async () => {
    const tenDaysAgo = dayJs.utc()
        .subtract(10, DAY);

    const users = await OAuthModel.find({ createdAt: { $lte: tenDaysAgo } });
    for await (const user of users) {
        await emailService.sendMail(
            user.user.email,
            emailActions.REMINDER,
            { userName: user.user.name }
        );
    }
};
