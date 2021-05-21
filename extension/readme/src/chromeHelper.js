export const isAuth = {
    get: cb => {
        chrome.storage.local.get(['isAuth'], result => {
            cb(result.isAuth);
        });
    },
    set: (isAuth, cb) => {
        chrome.storage.local.set(
            {
                isAuth: isAuth,
            },
            () => {
                cb();
            }
        );
    },
};

export const articleStorage = {
    get: cb => {
        chrome.storage.local.get(['currentArticle'], result => {
            cb(result.currentArticle);
        });
    },
    set: (article, cb) => {
        chrome.storage.local.set(
            {
                currentArticle: article,
            },
            () => {
                cb();
            }
        );
    },
};


// UserCred : {userName: OvedHaruvi , token : 1234}

export const userStorage = {
    get: cb => {
        chrome.storage.local.get(['readMeUserId'], result => {
            cb(result.readMeUserId);
        });
    },
    set: (userIdAndTokenJson, cb) => {
        chrome.storage.local.set(
            {
                readMeUserId: userIdAndTokenJson.userId,
                readMeUserToken : userIdAndTokenJson.token
            },
            () => {
                cb();
            }
        );
    },
};



