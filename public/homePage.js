"use strict";

const logoutButton = new LogoutButton();

logoutButton.action = () => {
    ApiConnector.logout((response) => {
        if (response.success) {
            location.reload();
        }
    });
};

ApiConnector.current((response) => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    }
});

const ratesBoard = new RatesBoard();

function updateExchangeRates() {
    ApiConnector.getStocks((response) => {
        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        }
    });
}

updateExchangeRates();
setInterval(updateExchangeRates, 60000);

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = data => {
    ApiConnector.addMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, 'Баланс успешно пополнен');
        } else {
            moneyManager.setMessage(false, response.error || 'Ошибка пополнения баланса');
        }
    });
};

moneyManager.conversionMoneyCallback = data => {
    ApiConnector.convertMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, 'Конвертация выполнена успешно');
        } else {
            moneyManager.setMessage(false, response.error || 'Ошибка конвертации');
        }
    });
};

moneyManager.sendMoneyCallback = data => {
    ApiConnector.transferMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, 'Перевод выполнен успешно');
        } else {
            moneyManager.setMessage(false, response.error || 'Ошибка перевода');
        }
    });
};

const favoritesWidget = new FavoritesWidget();

function updateFavorites(response) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(response.data);
    moneyManager.updateUsersList(response.data);
}

ApiConnector.getFavorites((response) => {
    if (response.success) {
        updateFavorites(response);
    }
});

favoritesWidget.addUserCallback = data => {
    ApiConnector.addUserToFavorites(data, (response) => {
        if (response.success) {
            updateFavorites(response);
            favoritesWidget.setMessage(true, 'Пользователь успешно добавлен в избранное!');
        } else {
            favoritesWidget.setMessage(false, response.error || 'Ошибка при добавлении в избранное');
        }
    });
};

favoritesWidget.removeUserCallback = data => {
    ApiConnector.removeUserFromFavorites(data, (response) => {
        if (response.success) {
            updateFavorites(response);
            favoritesWidget.setMessage(true, 'Пользователь успешно удалён из избранного!');
        } else {
            favoritesWidget.setMessage(false, response.error || 'Ошибка при удалении из избранного');
        }
    });
};