/* eslint-disable @typescript-eslint/naming-convention */

import { type Playlist } from "../types/playlist";
import { type SpotifyToken } from "../types/spotifyToken";

const getSpotifyToken = async () => {
    try {
        const token = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'grant_type=client_credentials&client_id=' + process.env.SP_CLIENTID + '&client_secret=' + process.env.SP_CLIENTSECRET
        });
        const tokenData = await token.json() as SpotifyToken;
        return tokenData;
    } catch (error) {
        console.error(error);
    }
}

const getSongList = async () => {
    try {
        const tokenData = await getSpotifyToken();
        if(tokenData) {
            const song = await fetch('https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF/tracks?fields=items%28track%28name%2Chref%29%29&limit=50', {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + String(tokenData.access_token),
                }
            });
            const songData = await song.json() as Playlist;
            return songData;
        }
    } catch (error) {
        console.error(error);
    }
}

export { getSongList };