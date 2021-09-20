import { CurrentSong } from "./CurrentSong";
import { RankedBasedQueue } from "./RankedBasedQueue";
import { RankedBasedQueueElement } from "./RankedBasedQueueElement";
import { Song } from "./Song";

export class QueueManagement {

    currentTrack!: RankedBasedQueueElement<Song>;
    currentTrackStartTime!: number;
    queue: RankedBasedQueue<Song>;

    constructor(queue: RankedBasedQueue<Song>) {
        this.queue = queue;
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

    startNextSong() {
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
        else throw Error("There is no current track");
    }
}