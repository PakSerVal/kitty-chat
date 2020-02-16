const LOCAL_STORAGE_KEY = "auth";

/**
 * @param {string} nickName
 * @param {string} avatarUrl
 */
export function saveAuthData(nickName, avatarUrl) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({nickName, avatarUrl}));
}

/**
 * @returns {AuthData|null}
 */
export function getAuthData() {
    const authData = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (authData === null) {
        return null;
    }

    return JSON.parse(authData);
}
