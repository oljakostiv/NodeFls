const { emailActions } = require('../config');

module.exports = {
    [emailActions.CREATE_NEW_USER]: {
        templateName: 'create-new-user',
        subject: 'Create new user.'
    },

    [emailActions.DELETE_BY_ADMIN]: {
        templateName: 'delete-by-admin',
        subject: 'User was deleted.'
    },

    [emailActions.DELETE_BY_USER]: {
        templateName: 'delete-by-user',
        subject: 'User was deleted.'
    },

    [emailActions.UPDATE_USER]: {
        templateName: 'update-user',
        subject: 'Updated user info.'
    },

    [emailActions.WELCOME]: {
        templateName: 'welcome',
        subject: 'Welcome!'
    }
};
