"use strict";

let user = new UserForm();

user.loginFormCallback = data => {
    ApiConnector.login(data, response => {
        if (response.success) {
            location.reload();
        } else {
            user.setLoginErrorMessage(response.error || "Неизвестная ошибка");
        }
    });
};

user.registerFormCallback = data => {
    ApiConnector.register(data, response => {
        if (response.success) {
            location.reload();
        } else {
            user.setRegisterErrorMessage(response.error || "Неизвестная ошибка");
        }
    });
};
