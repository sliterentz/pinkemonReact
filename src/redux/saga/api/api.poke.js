import axios from 'axios'

export const fetchPokemons = (payload) => {
  const { url } = payload
  return axios.get(url).then((res) => res.data)
}

export const fetchSinglePokemon = (payload) => {
  const { name } = payload
  return axios
    .get(`http://192.168.1.3:3080/pinkemon/find?name=${name}`)
    .then((res) => res.data.Data)
}
