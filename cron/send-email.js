const dayJs = require('dayjs');
const utc = require('dayjs/plugin/utc');

dayJs.extend(utc);

const { constants: { DAY }, emailActions } = require('../config');
const { OAuthModel, UserModel } = require('../dataBase');
const { emailService } = require('../services');

module.exports = async () => {
    const tenDaysAgo = dayJs.utc()
        .subtract(10, DAY);

    const tokensWithUser = await OAuthModel.find({ createdAt: { $lte: tenDaysAgo } });

    const userId = [];
    tokensWithUser.forEach((value) => tokensWithUser.push(value.item._id));

    const users = await UserModel.find({ _id: { $nin: userId } });

    await Promise.all(users.map(async (item) => {
        const isActivated = tokensWithUser.some((value) => item._id.toString() === value._id.toString());

        if (!isActivated) {
            await emailService.sendMail(
                // item.email,
                'oljakostivv@gmail.com',
                emailActions.REMINDER,
                { userName: item.name }
            );
        }
    }));
};
