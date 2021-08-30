import React, { Component } from 'react'
import { connect } from 'react-redux'
import ContentLoader from 'react-content-loader'
import { withStyles } from '@material-ui/styles'
import { styled } from '@material-ui/core/styles'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Card,
  TextField,
  CardContent,
  useScrollTrigger,
  Slide,
  Avatar,
  Paper,
  Snackbar,
  Fab,
  Box,
  Grid,
} from '@material-ui/core'
import { NavigateBefore } from '@material-ui/icons'
import AddIcon from '@material-ui/icons/Add'

import { mapDispatch, mapState } from './pokemonDetail.controller'

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '100%',
  },
  bottomAppBar: {
    top: 'auto',
    bottom: 0,
    display: 'flex',
  },
  bottomToolbar: {
    display: 'flex',
    justifyContent: 'center',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  titleDescription: {
    marginBottom: theme.spacing(2),
  },
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingTop: 50,
    paddingBottom: 50,
  },
  card: {
    display: 'flex',
    width: '100%',
    flexGrow: '1',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  bigAvatar: {
    backgroundColor: '#76ff03',
  },
})

const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  height: 82,
  width: 82,
  margin: '0 auto',
})

const PokeDetailLoader = () => (
  <ContentLoader height={400} width={400} speed={2} primary="#ff5722" secondary="#ffea00">
    <circle cx="30" cy="30" r="30" />
    <rect x="75" y="13" rx="4" ry="4" width="100" height="13" />
    <rect x="75" y="37" rx="4" ry="4" width="50" height="8" />
    <rect x="5" y="71" rx="5" ry="5" width="400" height="120" />
    <rect x="5" y="199" rx="0" ry="0" width="398" height="66" />
    <rect x="14" y="246" rx="0" ry="0" width="0" height="0" />
    <rect x="5" y="274" rx="0" ry="0" width="479" height="111" />
  </ContentLoader>
)

const HideOnScroll = (props) => {
  const { children, window } = props
  const trigger = useScrollTrigger({ target: window ? window() : undefined })

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}

class PokemonDetail extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isCaught: false,
      open: false,
      nickName: '',
      message: 'Oooooppssss. Pokemon broke the pokeball!',
    }
  }

  handleClick = () => {
    this.props.history.push('/')
  }

  fetchPokemonDetail = () => {
    const { name } = this.props.match.params
    const { fetchSinglePokemon } = this.props
    fetchSinglePokemon({ name })
  }

  removePokemonDetail = () => {
    const { removeSelectedPokemon } = this.props
    removeSelectedPokemon()
  }

  componentDidMount = () => {
    this.fetchPokemonDetail()
  }

  renderLoader = () => {
    return (
      <div>
        <PokeDetailLoader />
      </div>
    )
  }

  renderTopAppBar = (classes, pokemonName, isCaught) => {
    return (
      <HideOnScroll {...this.props}>
        <AppBar>
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="back"
              disabled={isCaught ? true : false}
              onClick={(e) => this.handleClick(e)}
            >
              <NavigateBefore />
            </IconButton>
            <Typography className={classes.title} variant="h5" noWrap>
              {pokemonName}
            </Typography>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    )
  }

  getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max))
  }

  throwPokeBall = () => {
    if (this.state.open) return
    this.setState({ open: true })
    console.log(this.getRandomInt(2))
    if (this.getRandomInt(2) === 1) {
      this.setState({
        isCaught: true,
        message: 'Gotcha! You caught the Pokemon!',
      })
    }
    setTimeout(() => {
      this.setState({ open: false })
    }, 2000)
  }

  savePokemon = () => {
    const { catchPokemon, selectedPokemon, ownedPokemons } = this.props
    const { nickName } = this.state
    const { name } = selectedPokemon

    let foundPokemon =
      ownedPokemons.length > 0
        ? ownedPokemons.filter((poke) => {
            if (poke.name === name) {
              let owned = poke.owns.filter((own) => {
                return own === nickName ? true : false
              })
              if (owned.length > 0) {
                return true
              } else {
                return false
              }
            } else {
              return false
            }
          })
        : false

    if (foundPokemon.length > 0) {
      this.setState({ open: true, message: 'That Nickname already exist!' })
      setTimeout(() => {
        this.setState({ open: false })
      }, 2000)
    } else {
      let newPokemons =
        ownedPokemons.length > 0
          ? ownedPokemons.map((poke) => {
              if (poke.name === name) {
                poke.owns.push(nickName)
              }
              return poke
            })
          : [{ name, owns: [nickName] }]
      catchPokemon({ pokemons: newPokemons })
      this.props.history.push('/')
    }
  }

  renderBottomAppBar = (classes, isCaught) => {
    return (
      <AppBar position="fixed" color="secondary" sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar className={classes.bottomToolbar}>
          {!isCaught ? (
            <StyledFab color="primary" aria-label="add" onClick={() => this.throwPokeBall()}>
              Throw a Pokeball
            </StyledFab>
          ) : (
            <StyledFab color="light" aria-label="add" onClick={() => this.savePokemon()}>
              <AddIcon />
            </StyledFab>
          )}
        </Toolbar>
      </AppBar>
    )
  }

  renderPokemonDetail = (classes, pokemon) => {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={2} md={3}>
            <Avatar
              alt="pokemon sprite"
              src={pokemon.sprites.front_default}
              className={classes.bigAvatar}
              sx={{ mt: 10, width: 200, height: 200, mx: 'auto' }}
            />
          </Grid>

          <Grid item xs={10} md={9}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h5" color="primary" className={classes.titleDescription}>
                  Types
                </Typography>
                {pokemon.types.map((type) => (
                  <Typography key={type.type.name} style={{ fontSize: '1.7em' }} variant="body2">
                    {type.type.name}
                  </Typography>
                ))}
              </CardContent>
            </Card>

            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h5" color="primary" className={classes.titleDescription}>
                  Abilities
                </Typography>

                {pokemon.abilities.map((abilities) => (
                  <Typography
                    key={abilities.ability.name}
                    style={{ fontSize: '1.7em' }}
                    variant="body2"
                  >
                    {abilities.ability.name}
                  </Typography>
                ))}
              </CardContent>
            </Card>
            <Card className={classes.card}>
              <CardContent style={{ width: '100%' }}>
                <Typography variant="h5" color="primary" className={classes.titleDescription}>
                  Stats
                </Typography>

                {pokemon.stats.map((stats) => (
                  <div
                    key={stats.stat.name}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Typography style={{ fontSize: '1.7em' }} variant="body2">
                      {stats.stat.name}
                    </Typography>
                    <Typography style={{ fontSize: '1.5em' }} variant="body1">
                      {stats.base_stat}
                    </Typography>
                  </div>
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    )
  }

  renderSnackbar = () => {
    const { open, message } = this.state
    return (
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        key={`vertical: top, horizontal: center`}
        open={open}
        ContentProps={{
          'aria-describedby': 'pokemon-catch',
        }}
        message={<span id="pokemon-catch">{message}</span>}
      />
    )
  }

  renderPokemonCaught = (classes, pokemon) => {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={6} md={8}>
            <Card>
              <Avatar
                alt="pokemon sprite"
                src={pokemon.sprites.front_default}
                className={classes.bigAvatar}
              />
            </Card>
          </Grid>
          <Grid item xs={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" color="primary" className={classes.titleDescription}>
                  Give Your Pokemon a Nickname
                </Typography>
                <TextField
                  required
                  id="standard-required"
                  label="Nickname"
                  defaultValue={this.state.nickName}
                  className={classes.textField}
                  margin="normal"
                  onChange={(e) => this.setState({ nickName: e.target.value })}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    )
  }

  render() {
    const { classes, loading, selectedPokemon } = this.props
    const { isCaught } = this.state
    const { name } = this.props.match.params
    return (
      <div className={classes.root}>
        {this.renderTopAppBar(classes, name, isCaught)}
        {!isCaught ? (
          <Paper square className={classes.paper}>
            {loading || !selectedPokemon
              ? this.renderLoader()
              : this.renderPokemonDetail(classes, selectedPokemon)}
          </Paper>
        ) : (
          this.renderPokemonCaught(classes, selectedPokemon)
        )}
        {this.renderSnackbar()}
        {this.renderBottomAppBar(classes, isCaught)}
      </div>
    )
  }
}

export default connect(mapState, mapDispatch)(withStyles(styles)(PokemonDetail))
