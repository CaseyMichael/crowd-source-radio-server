import Head from 'next/head'
import { Grid, Card, CardHeader, CardContent, Typography, TextField, LinearProgress, FormControl, IconButton, GlobalStyles, ListItemText, List, ListItem, Tooltip } from '@mui/material'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

import { useState, useEffect } from 'react'

let green = '#008083';
let blue = '#000080';
let gray = '#C0C0C0';
let darkGray = '#343434';
let yellow = '#FAF9EB';

function song(title, artist) {
  return (
    <ListItem secondaryAction={
      <Tooltip title="Vote for song">
        <IconButton edge="end" aria-label="add to queue">
          <ThumbUpIcon/>
        </IconButton>
      </Tooltip>
    }>
      <ListItemText primary={title} secondary={artist}></ListItemText>
    </ListItem>
  )
}

function NowPlaying() {
  return (
    <Card variant="outlined"
      sx={{
        border: 2,
        borderColor: 'black',
        borderRadius: 0,
        margin: 1,
        bgcolor: gray
      }}
    >
      <CardHeader 
      title="Now Playing" 
      disableTypography
      sx={{
        color: 'white',
        bgcolor: blue,
        borderBottom: 2,
        borderColor: 'black',
        height: 10,
        fontSize: 16,
        padding: 1,
        fontFamily: 'MS Sans Serif'
      }}/>
      <CardContent
        sx={{
          bgcolor: gray
        }}
      >
        <Typography variant="h5" component="div">Song Title</Typography>
        <Typography variant="subtitle1" component="div" color="text.secondary">Artist</Typography>
        <Tooltip title="Play">
          <IconButton aria-label="play">
            <PlayCircleOutlineIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Pause">
          <IconButton aria-label="pause">
            <PauseCircleOutlineIcon />
          </IconButton>
        </Tooltip>
        <LinearProgress variant="determinate" value={20}></LinearProgress>
      </CardContent>
    </Card>
  )
}

function UpNext(items) {
  console.log(items);
  return (
    <Card variant="outlined"
      sx={{
        border: 2,
        borderColor: 'black',
        borderRadius: 0,
        margin: 1,
      }}
    >
      <CardHeader 
      title="Up Next" 
      disableTypography
      sx={{
        color: 'white',
        bgcolor: blue,
        borderBottom: 2,
        borderColor: 'black',
        height: 10,
        fontSize: 16,
        padding: 1,
        fontFamily: 'MS Sans Serif'
      }}/>
      <CardContent
        sx={{
          bgcolor: gray
        }}
      >
        <List>
            {
              items.map(function(item) {
                return song(item.data.title, item.data.artist)
              })
            }
        </List>
      </CardContent>
    </Card>
  )
}

function Discover() {
  return (
    <Card
      sx={{
        border: 2,
        borderColor: 'black',
        borderRadius: 0,
        margin: 1
      }}
    >
      <CardHeader 
      title="Discover" 
      disableTypography
      sx={{
        color: 'white',
        bgcolor: blue,
        borderBottom: 2,
        borderColor: 'black',
        height: 10,
        fontSize: 16,
        padding: 1,
        fontFamily: 'MS Sans Serif'
      }}/>
      <CardContent
        sx={{
          bgcolor: gray
        }}
      >
        <FormControl fullWidth>
          <TextField 
            id="search" 
            label="Search" 
            variant="outlined"
            size="small"
            sx={{
              bgcolor: 'white'
            }}
          >
          </TextField>
          <List>
            {song("THATS WHAT I WANT", "Lil Nas X")}
          </List>
        </FormControl>
      </CardContent>
    </Card>
  )
}

export default function Home() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch("http://localhost:3001/api/queue")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          setIsLoaded(true);
          setItems(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(error);
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])
  if (error) {
    return <div>Error: {error.message}</div>
  } else {
  return (
    <div className="container">
      <Head>
        <title>Crowdsource Radio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <GlobalStyles 
        styles={{ 
          body: { backgroundColor: green }
        }}
      ></GlobalStyles>

      <main>
        <Grid container>
          <Grid item xs={12} md={8}>
            {NowPlaying()}
          </Grid>
          <Grid item xs={12} md={4}>
            {UpNext(items)}
          </Grid>
          <Grid item xs={12} md={8}>
            {Discover()}
          </Grid>
        </Grid>
      </main>

      <footer>
      </footer>
    </div>
  )
      }
}
