import express from "express";
import { RankedBasedQueue } from "./RankedBasedQueue";
import { RankedBasedQueueElement } from "./RankedBasedQueueElement";
import { Song } from "./Song";
import { Request, Response } from "express";
import { QueueManagement } from "./QueueManagement";

// const express = require('express')
const app = express()
const port = 3000



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

let queue = new RankedBasedQueue<Song>();
let queueManagement = new QueueManagement(queue);
queue.enqueue(bohemianRhapsodyQueueElement);
queue.enqueue(dontStopBelievinQueueElement);
queue.enqueue(livinOnAPrayerQueueElement);
queue.enqueue(babyOneMoreTimeQueueElement);
queue.enqueue(dancingQueenQueueElement);

app.get('/api/queue', (req: Request, res: Response) => {
  console.log("fetch queue");
  res.send(queue.list());
})

app.get('/api/queue/playing', (req: Request, res: Response) => {
  console.log("fetch what is currently playing");
  res.send(queueManagement.getCurrentTrack());
})

app.put('/api/queue/add', (req: Request, res: Response) => {
  console.log("add item to queue");
  res.send('add item to queue');
}) 

app.put('/api/queue/:itemId/vote', (req: Request, res: Response) => {
  console.log("vote for item on queue", req.params);
  if (queue.hasElement(req.params.itemId)) {
    let element = queue.getElement(req.params.itemId)
    queue.increaseElementPriority(element);
    res.send('vote for item on queue');
  } else {
    res.send('item does not exist on queue');
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

setInterval(() => {queueManagement.run();}, 1*1000);