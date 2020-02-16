import axios from "axios";

/**
 * @returns Promise
 */
export function getAvatarsList() {
    return axios.get('/api/get-avatars').then((response) => {
        return response.data;
    })
}
