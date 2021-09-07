const { emailActions } = require('../config');

module.exports = {
    [emailActions.AUTH]: {
        templateName: 'auth',
        subject: ' Authorization success.'
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
    },

    [emailActions.FORGOT_PASS]: {
        templateName: 'forgot-password',
        subject: 'forgot password'
    }
};
