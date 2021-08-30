import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/styles'
import { Card, CardContent, Typography } from '@material-ui/core'
import { mapDispatch, mapState } from './pokemonItem.controller'

const styles = (theme) => ({
  card: {
    marginTop: theme.spacing(10),
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
})

class PokemonList extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  goToPokemonDetail = (name) => {
    const { history } = this.props
    history.push(`/detail/${name}`)
  }

  render() {
    const { classes, pokemon, ownedPokemons } = this.props
    let totalOwned =
      ownedPokemons.length > 0
        ? ownedPokemons.filter((poke) => {
            return poke.name === pokemon.name ? true : false
          })
        : 0
    totalOwned = totalOwned.length > 0 ? totalOwned[0].owns.length : 0

    return (
      <Card
        onClick={() => {
          this.goToPokemonDetail(pokemon.name)
        }}
      >
        <CardContent>
          <Typography className={classes.title} variant="h6">
            {pokemon.name}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            owned : {totalOwned}
          </Typography>
        </CardContent>
      </Card>
    )
  }
}

export default connect(mapState, mapDispatch)(withStyles(styles)(PokemonList))
