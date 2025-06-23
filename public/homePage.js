"use strict";

const { response } = require("express");

const userLogout = new LogoutButton();

userLogout.action = () => {
    ApiConnector.logout((response) => {

        console.log("Ответ сервера:", response);

        if (response.success) {
            console.log("Вы успешно вышли из системы!");
            reloadPage();
        } else {
            console.error("Ошибка при выходе из системы:");
        }
    });
};

ApiConnector.current((response) => {
    if (response.success) {
        ProfileWidget.showProfile(response)
    }
})

const rates = new RatesBoard();

function updateExchangeRates() {
    ApiConnector.getRates((response) => {

        console.log("Ответ сервера:", response);

        if (response.success) {

            rates.clearTable();
            rates.fillTable(response.data);
        }
    });
}

updateExchangeRates();

setInterval(updateExchangeRates, 60000);

const userMoney = new MoneyManager();

userMoney.addMoneyCallback = data => {
    ApiConnector.addMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response);
            setMessage('Баланс успешно пополнен')
        } else {
            setMessage("Ошибка пополнения баланса: ");
        }
    })
}

userMoney.conversionMoneyCallback = data => {
    ApiConnector.convertMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response);
            setMessage('Баланс успешно пополнен')
        } else {
            setMessage("Ошибка пополнения баланса: ");
        }
    })
}

userMoney.sendMoneyCallback = data => {
    ApiConnector.transferMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response);
            setMessage('Баланс успешно пополнен')
        } else {
            setMessage("Ошибка пополнения баланса: ");
        }
    })
}

const FavoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites((response) => {
    if (response.success) {
        FavoritesWidget.clearTable();
        FavoritesWidget.fillTable(response.data);
        updateUsersList(response.data);
    }
})

FavoritesWidget.addUserCallback = data => {
    ApiConnector.addUserToFavorites(data, (response) => {
        if (response.success) {
            FavoritesWidget.clearTable();
            FavoritesWidget.fillTable(response.data);
            updateUsersList(response.data);
            setMessage("Пользователь успешно добавлен в избранное!");
        } else {
            setMessage("Ошибка при добавлении в избранное");
        }
    })
}

FavoritesWidget.removeUserCallback = data => {
    ApiConnector.removeUserFromFavorites(data, (response) => {
        if (response.success) {
            FavoritesWidget.clearTable();
            FavoritesWidget.fillTable(response.data);
            updateUsersList(response.data);
            setMessage("Пользователь успешно добавлен в избранное!");
        } else {
            setMessage("Ошибка при добавлении в избранное");
        }
    })
}