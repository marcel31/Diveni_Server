/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
const url = `https://www.googleapis.com/customsearch/v1?safe=active&key=AIzaSyAR3zhbelx7stTajKGZhBaDvBq289QcAv8&cx=331750b6356444816&searchType=image&`;
const apiKey = 'AIzaSyAR3zhbelx7stTajKGZhBaDvBq289QcAv8'


const getPhoto = async (query) => {
    const response = await fetch(`${url}q=${query}&num=1`, {
        headers: {
            authorization: apiKey
        }
    });
    const data = await response.json();
    const image = data.items[0].link;
    return image;
}

export { getPhoto }
