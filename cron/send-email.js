const dayJs = require('dayjs');
const utc = require('dayjs/plugin/utc');

dayJs.extend(utc);

const { constants: { DAY, USER }, emailActions } = require('../config');
const { OAuthModel } = require('../dataBase');
const { emailService } = require('../services');

module.exports = async () => {
    const tenDaysAgo = dayJs.utc()
        .subtract(10, DAY);

    const tokensWithUser = await OAuthModel.find({ createdAt: { $lte: tenDaysAgo } }).populate(USER);

    for await (const { user: { email, name } } of tokensWithUser) {
        await emailService.sendMail(
            email,
            emailActions.REMINDER,
            { userName: name }
        );
    }
};
