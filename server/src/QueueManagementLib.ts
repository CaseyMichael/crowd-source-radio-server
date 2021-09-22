import { CurrentSong } from "./CurrentSong";
import { RankedBasedQueue } from "./RankedBasedQueue";
import { RankedBasedQueueElement } from "./RankedBasedQueueElement";
import { Song } from "./Song";

export class QueueManagementLib {

    currentTrack!: RankedBasedQueueElement<Song>;
    currentTrackStartTime!: number;
    queue: RankedBasedQueue<Song>;

    constructor() {
        this.queue = new RankedBasedQueue<Song>();

        //temp data for testing, in a more real environment we would load the queue from a data store.
        let bohemianRhapsody = new Song("Bohemian Rhapsody", "Queen", 30);
        let bohemianRhapsodyQueueElement = new RankedBasedQueueElement<Song>("53208116-4d42-4283-9bbe-39abf70b13b0", 0, bohemianRhapsody);
        let dontStopBelievin = new Song("Don't Stop Believin", "Journey", 30);
        let dontStopBelievinQueueElement = new RankedBasedQueueElement<Song>("da0f6ca9-6f03-4e90-9002-3e9f6ed2eced", 0, dontStopBelievin);
        let livinOnAPrayer = new Song("Livin' On A Prayer", "Bon Jovi", 30);
        let livinOnAPrayerQueueElement = new RankedBasedQueueElement<Song>("35a5c40b-5ac2-4263-98da-361becc6fd16", 0, livinOnAPrayer);
        let babyOneMoreTime = new Song("Baby One More Time", "Britney Spears", 30);
        let babyOneMoreTimeQueueElement = new RankedBasedQueueElement<Song>("f1ba0135-082c-4cc3-a95f-d07adf26539d", 0, babyOneMoreTime);
        let dancingQueen = new Song("Dancing Queen", "ABBA", 30);
        let dancingQueenQueueElement = new RankedBasedQueueElement<Song>("5df86a99-ecea-4a72-a0c5-aa84337f410d", 0, dancingQueen);
        this.queue.enqueue(bohemianRhapsodyQueueElement);
        this.queue.enqueue(dontStopBelievinQueueElement);
        this.queue.enqueue(livinOnAPrayerQueueElement);
        this.queue.enqueue(babyOneMoreTimeQueueElement);
        this.queue.enqueue(dancingQueenQueueElement);
    }

    run() {
        if (this.currentTrack && this.currentTrackStartTime) {
            let now = Date.now();
            let songEnd = this.currentTrackStartTime + (this.currentTrack.data.length * 1000)
            if (now >= songEnd) {
                this.startNextSong();
            }

        } else {
            this.startNextSong();
        }
    }

    private startNextSong() {
        if (this.queue.size() === 0) {
            console.log("the queue is empty");
            return;
        }
        this.currentTrack = this.queue.dequeue();
        console.log("now playing ", this.currentTrack.data)
        this.currentTrackStartTime = Date.now();
    }

    getCurrentTrack(): CurrentSong {
        if (this.currentTrack) {
            return new CurrentSong(this.currentTrack.data, new Date(this.currentTrackStartTime))
        } 
        else throw Error("There is no current track, try adding a song to the queue.");
    }

    addSongToQueue(key: string, title: string, artist: string, length: number) {
        if (this.queue.hasElement(key)) {
            this.voteForSong(key);
        } else {
            let song = new Song(title, artist, length);
            let songQueueElement = new RankedBasedQueueElement(key, 0, song);
            this.queue.enqueue(songQueueElement);
        }
    }

    voteForSong(itemId: string) {
        if (this.queue.hasElement(itemId)) {
            let element = this.queue.getElement(itemId)
            this.queue.increaseElementPriority(element);
        }
    }

    fetchQueue(): Array<RankedBasedQueueElement<Song>> {
        return this.queue.list();
    }
}