import axios from "axios";

// BASE DA URL = https://api.themoviedb.org/3
// /movie/now_playing?api_key=73be9b6ba16f4407390ddc53ad9d2d9d&language=pt-BR


export const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3'
})
