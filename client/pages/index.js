import Head from 'next/head'
import { Container, Grid, Card, CardHeader, CardContent, Typography, TextField } from '@mui/material'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Container maxWidth="md">
          <Grid container spaceing={2}>
            <Grid item xs={8}>
              <Card variant="outlined">
                <CardHeader title="Now Playing"></CardHeader>
                <CardContent>
                  <Typography variant="h5" component="div">Song Title</Typography>
                  <Typography variant="subtitle1" component="div" color="text.secondary">Artist</Typography>
                </CardContent>
              </Card>
              <Card variant="outlined">
                <CardHeader title="Discover"></CardHeader>
                <CardContent>
                  <TextField id="search" label="Search:" variant="outlined"></TextField>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Card variant="outlined">
                <CardHeader title="Up Next"></CardHeader>
                <CardContent></CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>

      </main>

      <footer>

      </footer>
    </div>
  )
}
