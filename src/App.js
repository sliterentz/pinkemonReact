import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { CssBaseline } from '@material-ui/core'

import { createTheme, ThemeProvider } from '@material-ui/core/styles'

import PokemonList from './containers/pokemonList'
import PokemonDetail from './containers/pokemonDetail'
import MyPokemon from './containers/myPokemon'
import NotFoundPage from './containers/notFoundPage'

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff0100',
    },
    secondary: {
      main: '#ffffff',
    },
    dark: {
      main: '#ff5722',
    },
    light: {
      main: '#c6ff00',
    },
  },
  typography: { useNextVariants: true },
})

class App extends Component {
  renderPokemonList = (props) => {
    return <PokemonList {...props} />
  }

  renderPokemonDetail = (props) => {
    return <PokemonDetail {...props} />
  }

  renderMyPokemonList = (props) => {
    return <MyPokemon {...props} />
  }

  renderNotFoundPage = () => {
    return <NotFoundPage />
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <Router>
            <Switch>
              <Route exact path="/" render={(props) => this.renderPokemonList(props)} />
              <Route
                exact
                path="/detail/:name"
                render={(props) => this.renderPokemonDetail(props)}
              />
              <Route exact path="/my-pokemon" render={(props) => this.renderMyPokemonList(props)} />
              <Route render={(props) => this.renderNotFoundPage(props)} />
            </Switch>
          </Router>
        </CssBaseline>
      </ThemeProvider>
    )
  }
}

export default connect(
  (state) => { return {} },// eslint-disable-line
  (dispatchEvent) => { return {} },// eslint-disable-line
)(App)
