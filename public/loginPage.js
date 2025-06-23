"use strict";

let user = new UserForm();

user.loginFormCallback = data => console.log(data);

ApiConnector.login(data, (response) => {
    console.log('Ответ от сервера: ', response);

    if(response.success) {
        location.reload()
    } else {
        throw new Error('Ошибка')
    }
})

user.registerFormCallback = data => console.log(data);

ApiConnector.register(data, (response) => {
        if(response.success) {
        location.reload()
    } else {
        throw new Error('Ошибка')
    }
})