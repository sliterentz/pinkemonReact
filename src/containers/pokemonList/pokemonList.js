import React, { Component } from 'react'
import { connect } from 'react-redux'
import ContentLoader from 'react-content-loader'
import { withStyles } from '@material-ui/styles'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Paper,
  useScrollTrigger,
  Slide,
  MenuItem,
  Menu,
  Box,
  Button,
} from '@material-ui/core'
import { MoreVert, NavigateBefore, NavigateNext } from '@material-ui/icons'
// import Pagination from '@material-ui/core/Pagination'
// import PaginationItem from '@material-ui/core/PaginationItem'
// import usePagination from '@material-ui/core/usePagination';

import { mapDispatch, mapState } from './pokemonList.controller'
import PokemonItem from './pokemonItem'

const ITEM_HEIGHT = 48

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  // textField: {
  //   marginLeft: theme.spacing(1),
  //   marginRight: theme.spacing(1),
  //   width: 50,
  //   color: 'primary',
  // },
  bottomAppBar: {
    color: 'secondary',
    top: 'auto',
    bottom: 0,
    display: 'flex',
  },
  bottomToolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    // display: 'none',
    // [theme.breakpoints.up('sm')]: {
    //   display: 'block',
    // },
  },
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingTop: 50,
    paddingBottom: 50,
  },
  optionsPage: {
    display: 'flex',
    justifyContent: 'space-between',
    color: 'white',
  },
})

const PokeListLoader = () => (
  <ContentLoader height={160} width={400} speed={2} primary="#ff5722" secondary="#ffea00">
    <rect x="46" y="28" rx="0" ry="0" width="0" height="0" />
    <rect x="8" y="4" rx="0" ry="0" width="383" height="59" />
    <rect x="8" y="79" rx="0" ry="0" width="383" height="34" />
    <rect x="41" y="85" rx="0" ry="0" width="0" height="18" />
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

class PokemonList extends Component {
  constructor(props) {
    super(props)

    this.handlePageChange = this.handlePageChange.bind(this)

    this.state = {
      currentPage: props.currentPage,
      open: false,
      anchorEl: null,
      currentIndex: -1,
      searchTitle: '',
      page: 1,
      count: 0,
      pageSize: 3,
    }

    this.pageSizes = [3, 6, 9]
  }

  handlePageChange(event, value) {
    console.log(value)
    this.setState(
      {
        page: value,
      },
      () => {
        const { fetchPokemons, nextUrl } = this.props
        fetchPokemons({ url: nextUrl })
      }
    )
  }

  handleClick = (event) => {
    this.setState({ open: true, anchorEl: event.currentTarget })
  }

  handleClose = (url) => {
    this.setState({ open: false, anchorEl: null }, () => {
      if (url) this.props.history.push(url)
    })
  }

  handleChange = (name) => (event) => {
    this.setState({ ...this.state, [name]: event.target.value })
  }

  fetchPokemonList = (isNext) => {
    const { fetchPokemons, nextUrl, prevUrl } = this.props
    console.log(nextUrl)
    if (isNext) {
      return fetchPokemons({ url: nextUrl })
    }
    return fetchPokemons({ url: prevUrl })
  }

  componentDidMount = () => {
    const { fetchPokemons, total, url } = this.props
    fetchPokemons({ url })
    this.setState({
      count: total,
    })
  }

  renderLoader = () => {
    return (
      <div>
        <PokeListLoader />
        <PokeListLoader />
        <PokeListLoader />
        <PokeListLoader />
        <PokeListLoader />
        <PokeListLoader />
      </div>
    )
  }

  renderTopAppBar = (classes) => {
    return (
      <HideOnScroll {...this.props}>
        <AppBar color="primary">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
              onClick={(e) => this.handleClick(e)}
            >
              <MoreVert />
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
              Pokemon List
            </Typography>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
    )
  }

  renderNavOptions = () => {
    const { open, anchorEl } = this.state
    return (
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: 200,
          },
        }}
        onClose={() => this.handleClose()}
      >
        <MenuItem selected onClick={() => this.handleClose(null)}>
          Pokemon List
        </MenuItem>
        <MenuItem onClick={() => this.handleClose('/my-pokemon')}>My Pokemon</MenuItem>
      </Menu>
    )
  }

  renderBottomAppBar = (classes) => {
    // const totalPage = Math.ceil(total / 20)
    // const pageOptions = () => {
    //   let options = []
    //   for (let i = 1; i <= totalPage; i++) {
    //     options.push(
    //       <MenuItem key={i} value={i}>
    //         {i}
    //       </MenuItem>
    //     )
    //   }
    //   return options
    // }

    return (
      <AppBar position="fixed" color="secondary" sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar className={classes.bottomToolbar}>
          <Button color="inherit" onClick={() => this.fetchPokemonList(false)}>
            <NavigateBefore />
          </Button>
          {
            // <div className={classes.optionsPage}>
            //   <TextField
            //     id="page-number"
            //     select
            //     className={classes.textField}
            //     value={this.state.currentPage}
            //     onChange={this.handleChange('currentPage')}
            //     margin="normal"
            //   >
            //     {pageOptions()}
            //   </TextField>
            // </div>
          }
          <Box lg={{ flexGrow: 1 }}>
            {/* <Pagination
              size="large"
              shape="circular"
              count={count}
              page={page}
              siblingCount={1}
              boundaryCount={1}
              onChange={this.handlePageChange}
            />
            <PaginationItem shape="circular"></PaginationItem> */}
          </Box>
          <Button color="inherit" onClick={() => this.fetchPokemonList(true)}>
            <NavigateNext />
          </Button>
        </Toolbar>
      </AppBar>
    )
  }

  render() {
    const { classes, pokemons, loading, total, history } = this.props
    return (
      <div className={classes.root}>
        {this.renderTopAppBar(classes)}
        {this.renderNavOptions()}
        <Paper square className={classes.paper}>
          {loading
            ? this.renderLoader()
            : pokemons.map((pokemon) => (
                <PokemonItem pokemon={pokemon} key={pokemon.name} history={history} />
              ))}
        </Paper>
        {this.renderBottomAppBar(classes, total)}
      </div>
    )
  }
}

export default connect(mapState, mapDispatch)(withStyles(styles)(PokemonList))
