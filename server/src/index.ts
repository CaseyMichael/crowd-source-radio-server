import express from "express";
import bodyParser from "body-parser";
import { Request, Response } from "express";
import { QueueManagementLib } from "./QueueManagementLib";
import cors from "cors";

var jsonParser = bodyParser.json();
const app = express()
app.use(cors())
const port = 3001

let queueManagement = new QueueManagementLib();

app.get('/api/queue', (req: Request, res: Response) => {
  console.log("fetch queue");
  res.send(queueManagement.fetchQueue());
})

app.get('/api/queue/playing', (req: Request, res: Response) => {
  console.log("fetch what is currently playing");
  res.send(queueManagement.getCurrentTrack());
})

app.post('/api/queue/add', jsonParser, (req: Request, res: Response) => {
  console.log("add item to queue");
  console.log(req.body);
  queueManagement.addSongToQueue(req.body.key, req.body.title, req.body.artist, req.body.length);
  res.send('add item to queue');
}) 

app.put('/api/queue/:itemId/vote', (req: Request, res: Response) => {
  console.log("vote for item on queue", req.params);
  queueManagement.voteForSong(req.params.itemId);
  res.send('vote for item on queue');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

setInterval(() => {queueManagement.run();}, 1*1000);