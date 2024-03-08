import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// Styles
import { makeStyles } from "@material-ui/core/styles"
// Component
import Header from "components/layouts/Header"
import Footer from "components/layouts/Footer"
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Main from './Main';
import Sidebar from './Sidebar';
import { Divider } from '@mui/material';
import MenuTab from './MenuTab';

// Styleを定義
const useStyles = makeStyles(() => ({
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
  
const defaultTheme = createTheme();

const ShowOrganization = () => {
  
  const classes = useStyles()

  return (
    <div className={classes.wrapper}>
      <header>
        <Header/>
      </header>
      <Container className={classes.container}>
        <ThemeProvider theme={defaultTheme}>
          <CssBaseline />
          <Container maxWidth="lg">
            <main>
              <MainFeaturedPost />
              <Grid container spacing={4}>
                <FeaturedPost />
              </Grid>
              <Divider/>
              <MenuTab/>
              <Grid container spacing={5} sx={{ mt: 3 }}>
                <Main/>
                <Sidebar/>
              </Grid>
            </main>
          </Container>
        </ThemeProvider>
      </Container>
      <footer>
        <Footer/>
      </footer>
    </div>
  );
}

export default ShowOrganization;