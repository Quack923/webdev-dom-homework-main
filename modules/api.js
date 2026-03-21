const host = " https://wedev-api.sky.pro/api/v2/ivan-pichugin";

const authHost = 'https://wedev-api.sky.pro/api/user'
 export let token = ''
export const setToken = ( newToken)=>{
token = newToken
}

 export let name = ''
export const setName = ( newName)=>{
name = newName
}

export const fetchComments = () => {
    return fetch(host + "/comments") 
    .then((res) => {
        return res.json(); 
    })
    .then((responseData) => {
        const appComments = responseData.comments.map((comment) => {
            return {
                name: comment.author.name,
                date: new Date(comment.date).toLocaleString(),
                text: comment.text,
                likes: comment.likes,
                isLiked: false,
            };
        });
        
        return appComments;
    });
};

export const postComment = (text, name) => {
    return fetch(host + "/comments", {
        method: 'POST',
        headers:{
            autorization :`Bearer ${token}`,
        },
        body: JSON.stringify({
            text: text, 
            name: name,
        }),
    }).then((response)=>{
        if (response.status === 201) {
             return fetchComments(); 
        }
        if (response.status === 500) {
            throw new Error('ошибка сервера')
        }
          if (response.status === 400) {
            throw new Error('неверный запрос')
        }
      

    })
    .then(() => {
        return fetchComments(); 
    })  
};

export const login = ({ login, password }) => {
  return fetch(authHost + "/login", {
    method: 'POST',
    body: JSON.stringify({ 
        login,
        password 
    }),
  }).then((response) => {
      if (response.status === 400) {
          throw new Error("Неверный логин или пароль");
      }
      return response.json(); 
  });
};

export const registration = ({ name, login, password }) => {
  return fetch(authHost, {
    method: 'POST',
    body: JSON.stringify({ 
        name: name,
        login: login,
        password: password })
  }).then((response) => {
      if (response.status === 400) {
          throw new Error("Неверный логин или пароль");
      }
      return response.json(); 
  });
};
