const host = "https://wedev-api.sky.pro/api/v2/ivan-pichugin";
const authHost = 'https://wedev-api.sky.pro/api/user';

export let token = '';
export const setToken = (newToken) => {
    token = newToken;
};

export let name = '';
export const setName = (newName) => {
    name = newName;
};

export const fetchComments = () => {
    return fetch(host + "/comments")
        .then((res) => res.json())
        .then((responseData) => {
            return responseData.comments.map((comment) => {
                return {
                    name: comment.author.name,
                    date: new Date(comment.date).toLocaleString(),
                    text: comment.text,
                    likes: comment.likes,
                    isLiked: false,
                };
            });
        });
};

export const postComment = (text) => {
    return fetch(host + "/comments", {
        method: 'POST',
        headers: {
        
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            text: text,
            name: name,
        }),
    }).then((response) => {
        if (response.status === 401) {
            throw new Error('Нет авторизации');
        }
        if (response.status === 500) {
            throw new Error('ошибка сервера');
        }
        if (response.status === 400) {
            throw new Error('неверный запрос');
        }
        return response.json();
    });
};

export const login = ({ login, password }) => {
    return fetch(authHost + "/login", {
        method: 'POST',
        body: JSON.stringify({ login, password }),
    }).then((response) => {
        if (response.status === 400) {
           alert("Неверный логин или пароль");
        }
        return response.json();
    });
};

export const registration = ({ name, login, password }) => {
    return fetch(authHost, {
        method: 'POST',
        body: JSON.stringify({ name, login, password })
    }).then((response) => {
        if (response.status === 400) {
            alert("Пользователь уже существует или данные неверны");
        }
        return response.json();
    });
};
