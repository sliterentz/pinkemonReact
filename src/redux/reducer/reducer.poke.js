import {
  FETCH_POKEMON,
  FETCH_POKEMON_FAILED,
  FETCH_POKEMON_SUCCESS,
  FETCH_SINGLE_POKEMON,
  FETCH_SINGLE_POKEMON_SUCCESS,
  FETCH_SINGLE_POKEMON_FAILED,
  REMOVE_DETAIL_POKEMON,
} from '../type/type.poke'

const initialState = {
  loading: true,
  SelectedPokemonLoading: true,
  message: null,
  total: 0,
  pokemons: [],
  selectedPokemon: {},
  url: 'http://192.168.1.3:3080/pinkemon/list?limit=100&offset=200',
  nextUrl: null,
  prevUrl: null,
  currentPage: 1,
}

const reducerPoke = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POKEMON:
      return {
        ...state,
        loading: true,
        message: '',
      }
    case FETCH_POKEMON_SUCCESS:
      return {
        ...state,
        loading: false,
        message: 'Pokemons Loaded',
        pokemons: action.payload.pokemons,
        nextUrl: action.payload.nextUrl,
        prevUrl: action.payload.prevUrl,
        url: action.payload.url,
        total: action.payload.total,
      }
    case FETCH_POKEMON_FAILED:
      return {
        ...state,
        loading: false,
        message: 'Failed to load Pokemons',
      }

    case FETCH_SINGLE_POKEMON:
      return {
        ...state,
        SelectedPokemonLoading: true,
        selectedPokemon: null,
      }
    case FETCH_SINGLE_POKEMON_SUCCESS:
      return {
        ...state,
        SelectedPokemonLoading: false,
        selectedPokemon: action.payload.selectedPokemon,
        message: 'Pokemon Loaded',
      }
    case FETCH_SINGLE_POKEMON_FAILED:
      return {
        ...state,
        SelectedPokemonLoading: false,
        message: 'Failed to load Pokemon',
      }

    case REMOVE_DETAIL_POKEMON:
      return {
        ...state,
        SelectedPokemonLoading: false,
        message: 'selected pokemon is removed',
        selectedPokemon: null,
      }
    default:
      return state
  }
}

export default reducerPoke
