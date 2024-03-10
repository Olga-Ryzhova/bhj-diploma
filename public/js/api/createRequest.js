/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    
    let url = options.url;

    formData = new FormData(); 

    if (options.method === 'GET') {
        for (let key in options.data) {
            url += '?';
            url += `${key}=${options.data[key]}&`;
        }
    } else {
        for (let key in options.data) {
            formData.append(key, options.data[key]);
        }    
    };

    xhr.addEventListener('load', () => {
        options.callback(null, xhr.response);
    })

    xhr.addEventListener('error', () => {
        options.callback(xhr.statusText, null);
    });

    try {
        xhr.open(options.method, options.url);
        xhr.send(formData);
    } catch (error) {
        console.log(error);
    };
};

