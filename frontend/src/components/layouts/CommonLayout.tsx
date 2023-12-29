import React from "react"

import { Container } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import Header from "components/layouts/Header"
import Footer from "components/layouts/Footer"

const useStyles = makeStyles(() => ({
  wrapper: {
    height: '100%',
    minHeight: '100vh',
    position: 'relative',
    paddingBottom: 120,
    boxSizing: "border-box",
  },
  container: {
    marginTop: "3rem"
  },
}))

interface CommonLayoutProps {
  children: React.ReactElement
}

// 全てのページで共通となるレイアウト
const CommonLayout = ({ children }: CommonLayoutProps) => {
  const classes = useStyles()

  return (
    <>
      <div className={classes.wrapper}>
        <header>
          <Header/>
        </header>
        <main>
          <Container maxWidth="lg" className={classes.container}>
            {children}
          </Container>
        </main>
        <footer>
          <Footer/>
        </footer>
      </div>
    </>
  )
}

export default CommonLayout