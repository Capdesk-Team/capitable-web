import React from 'react'
// Components
import Header from '../layouts/Header'
// Material UI
import { Container, Grid, Typography } from "@material-ui/core"

// Styles
import { makeStyles, Theme } from "@material-ui/core/styles"

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    height: '100%',
    minHeight: '100vh',
    position: 'relative',
    paddingBottom: 120,
    boxSizing: "border-box",
  },
  container: {
    marginTop: "3rem",
    marginBottom: "6rem"
  },
}))

const EngineerCommunity = () => {

  const classes = useStyles()

  return (
    <>
      <div className={classes.wrapper}>
        <header>
          <Header/>
        </header>
        <Container className={classes.container}>
          <Grid container alignItems="center" justify="center" spacing={4}>
            <Typography
              variant="h5"
            >
              Capitableエンジニアコミュニティへようこそ(機能実装予定)
            </Typography>
          </Grid>
        </Container>
      </div>
    </>
  )
}

export default EngineerCommunity