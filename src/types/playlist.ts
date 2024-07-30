import { type Track } from "./track"

export interface Playlist {
    items: [
        {
            track: Track,
        }
    ]
}