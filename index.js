const express = require('express')
const app = express()
const port = 3000

let queue = [
  {
    id: "53208116-4d42-4283-9bbe-39abf70b13b0",
    song: {
      title: "Bohemian Rhapsody",
      artist: "Queen"
    },
    votes: 0
  },
  {
    id: "da0f6ca9-6f03-4e90-9002-3e9f6ed2eced",
    song: {
      title: "Don't Stop Believin'",
      artist: "Journey"
    },
    votes: 0
  },
  {
    id: "35a5c40b-5ac2-4263-98da-361becc6fd16",
    song: {
      title: "Livin' on a Prayer",
      artist: "Bon Jovi"
    },
    votes: 0
  },
  {
    id: "f1ba0135-082c-4cc3-a95f-d07adf26539d",
    song: {
      title: "Baby One More Time",
      artist: "Britney Spears"
    },
    votes: 0
  },
  {
    id: "5df86a99-ecea-4a72-a0c5-aa84337f410d",
    song: {
      title: "Dancing Queen",
      artist: "ABBA"
    },
    votes: 0
  }
];

app.get('/api/queue', (req, res) => {
  console.log("fetch queue");
  res.send(queue);
})

app.put('/api/queue/add', (req, res) => {
  console.log("add item to queue");
  res.send('add item to queue');
}) 

app.put('/api/queue/{itemId}/vote', (req, res) => {
  console.log("vote for item on queue");
  res.send('vote for item on queue');
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

function queueManagement() {
  console.log("Queue Management - Determine if currently playing song should be removed from the queue");
}

setInterval(queueManagement, 5*1000);