export class Song {
    title: string;
    artist: string;
    length: number;
    
    constructor(title: string, artist: string, length: number) {
        this.title = title;
        this.artist = artist;
        this.length = length;
    }
}