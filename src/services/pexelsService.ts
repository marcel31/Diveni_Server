/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const url = `https://api.pexels.com/v1/`;
const apiKey = 'Z62FqcakU3OhtoaQc1Lgse58dJEvOaLOm8uZ8srZfMrO1yZFA3HIUJV2'

const getImg = async (query) => {
    try {
        const response = await fetch(`${url}search?query=${query}`, {
            headers: {
                authorization: apiKey
            }
        });
        const data = await response.json();
        if (data.photos[0].src.large2x) return data.photos[0].src.large2x;
        if (data.photos[0].src.large) return data.photos[0].src.large;
        if (data.photos[0].src.medium) return data.photos[0].src.medium;
        if (data.photos[0].src.tiny) return data.photos[0].src.tiny;
        return data.photos[0].src.original;
    } catch (error) {
        return 'https://fakeimg.pl/600x600/cccccc/cccccc';
    }
}

export { getImg }