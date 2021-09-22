import { Song } from "./Song";

export class CurrentSong extends Song {
    startTime: Date

    constructor(song: Song, startTime: Date) {
        super(song.title, song.artist, song.length)
        this.startTime = startTime;
    }
}