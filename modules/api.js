const host = "https://wedev-api.sky.pro/api/v1/ivan-pichugin";

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