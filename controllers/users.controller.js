const { v1 } = require('uuid');

const {
    actions: {
        ACTIVATE_ACCOUNT,
        ACTIVATE_ADMIN,
        ADMIN_PASS
    },
    constants: {
        ADMIN,
        AUTHORIZATION,
        QUERY_TOKEN,
        USERS
    },
    emailActions,
    errMsg,
    statusCode,
    variables: {
        ACTIVATE_URL
    }
} = require('../config');
const {
    UserModel,
    ActionToken
} = require('../dataBase');
const {
    emailService,
    mainService: {
        deleteItem,
        findItem,
        setItem,
        updateItem
    },
    passwordService,
    jwtService,
    s3Service: {
        uploadFile,
        deleteFile
    }
} = require('../services');
const { userUtil } = require('../util');

module.exports = {
    deleteUser: async (req, res, next) => {
        try {
            const {
                deleteByUser,
                item: {
                    name,
                    email,
                    avatar
                },
                params: { user_id }
            } = req;

            if (avatar) {
                await deleteFile(avatar);
            }

            await deleteItem(UserModel, user_id);

            if (deleteByUser) {
                await emailService.sendMail(
                    email,
                    emailActions.DELETE_BY_USER,
                    { userName: name }
                );
            } else {
                await emailService.sendMail(
                    email,
                    emailActions.DELETE_BY_ADMIN,
                    { userName: name }
                );
            }

            res.sendStatus(statusCode.DELETED);
        } catch (e) {
            next(e);
        }
    },

    getAllUsers: async (req, res, next) => {
        try {
            const usersAll = await findItem(UserModel);

            const userToReturn = usersAll.map((user) => userUtil.calibrationUser(user));

            res.json(userToReturn);
        } catch (e) {
            next(e);
        }
    },

    getSingleUser: (req, res, next) => {
        try {
            const userToReturn = userUtil.calibrationUser(req.item);
            res.json(userToReturn);
        } catch (e) {
            next(e);
        }
    },

    changePassForAdmin: async (req, res, next) => {
        try {
            const {
                body: { password },
                logUser: { _id }
            } = req;
            const token = req.get(AUTHORIZATION);

            const passwordHashed = await passwordService.hash(password);

            await UserModel.updateOne({ _id }, { password: passwordHashed });

            await ActionToken.deleteOne({ token });

            res.status(statusCode.CREATED_AND_UPDATE)
                .json(errMsg.PASSWORD_UPDATE);
        } catch (e) {
            next(e);
        }
    },

    setAdmin: async (req, res, next) => {
        try {
            const {
                body: {
                    name,
                    password
                },
                logUser: { name: adminName }
            } = req;

            const passwordHashed = await passwordService.hash(password);
            const token = await jwtService.giveActionToken(ADMIN_PASS);

            let usersSet = await setItem(UserModel, {
                ...req.body,
                password: passwordHashed,
                role: ADMIN
            });

            if (req.files && req.files.avatar) {
                const dataResponse = await uploadFile(req.files.avatar, USERS, usersSet._id);
                usersSet = await UserModel.findByIdAndUpdate(
                    usersSet._id,
                    { avatar: dataResponse.Location },
                    { new: true }
                );
            }

            await ActionToken.create({
                action: ACTIVATE_ADMIN,
                token,
                user: usersSet._id
            });

            await emailService.sendMail(
                usersSet.email,
                emailActions.SET_ADMIN,
                {
                    userName: name,
                    token,
                    adminName
                }
            );

            res.sendStatus(statusCode.CREATED_AND_UPDATE);
        } catch (e) {
            next(e);
        }
    },

    setUser: async (req, res, next) => {
        try {
            const {
                name,
                password
            } = req.body;

            const passwordHashed = await passwordService.hash(password);
            const token = v1();

            let usersSet = await setItem(UserModel, {
                ...req.body,
                password: passwordHashed
            });

            if (req.files && req.files.avatar) {
                const dataResponse = await uploadFile(req.files.avatar, USERS, usersSet._id);
                usersSet = await UserModel.findByIdAndUpdate(
                    usersSet._id,
                    { avatar: dataResponse.Location },
                    { new: true }
                );
            }

            await ActionToken.create({
                action: ACTIVATE_ACCOUNT,
                token,
                user: usersSet._id
            });

            await emailService.sendMail(
                usersSet.email,
                emailActions.WELCOME,
                {
                    userName: name,
                    activateURL: `${ACTIVATE_URL}${QUERY_TOKEN}${token}`
                }
            );

            const userToReturn = userUtil.calibrationUser(usersSet);

            res.status(statusCode.CREATED_AND_UPDATE)
                .json(userToReturn);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const {
                params: { user_id },
                logUser: { name, email },
            } = req;
            let data = req.body;

            if (req.files && req.files.avatar) {
                if (data.avatar) {
                    await deleteFile(data.avatar);
                }

                const dataResponse = await uploadFile(req.files.avatar, USERS, user_id);
                data = await UserModel.findByIdAndUpdate(
                    user_id,
                    { ...data, avatar: dataResponse.Location },
                    { new: true }
                );
            } else {
                data = await updateItem(UserModel, user_id, req.body);
            }

            const userToReturn = userUtil.calibrationUser(data);

            await emailService.sendMail(
                email,
                emailActions.UPDATE_USER,
                { userName: name }
            );

            res.status(statusCode.CREATED_AND_UPDATE).json(userToReturn);
        } catch (e) {
            next(e);
        }
    }
};
