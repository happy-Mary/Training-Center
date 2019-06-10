'use strict';

var constants = require('../constants');

class User {
    constructor(userData) {
        this.id = userData.id;
        this.login = userData.login;
        this.email = userData.email;
        this.first_name = userData.first_name;
        this.last_name = userData.last_name;
        this.password = userData.password;
        this.role_id = userData.role_id;
    }

    isAdmin() {
        return this.role_id && this.role_id == constants.userRole.admin;
    }

    isBreeder() {
        return this.role_id && this.role_id == constants.userRole.breeder;
    }
}

var users = [
];

var service = {
    getUserObject(userData) {
        return new User(userData);
    },
    getUsers() {
        return Promise.resolve(users);
    },
    getUser(userId) {
        return Promise.resolve(users[0]);
    },
    getUserByEmail(email) {
        return Promise.resolve(users[0]);
    },
    insertUser(user) {
        user.id = users.length + 1;
        users.push(user);
        return Promise.resolve(user.id);
    }
};

module.exports = service;