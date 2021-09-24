import Head from 'next/head'
import { Container, Grid, Card, CardHeader, CardContent, Typography, TextField, LinearProgress, FormControl, IconButton, GlobalStyles, ListItemText, List, ListItem, Tooltip } from '@mui/material'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

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
        <LinearProgress variant="determinate" value="20"></LinearProgress>
      </CardContent>
    </Card>
  )
}

function UpNext() {
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
            {song("THATS WHAT I WANT", "Lil Nas X")}
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
        {/* <LinearProgress color="secondary" /> */}
        <Grid container>
          <Grid item xs={12} md={8}>
            {NowPlaying()}
          </Grid>
          <Grid item xs={12} md={4}>
            {UpNext()}
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
