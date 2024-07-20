import './filmes.css'
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../../services/api';

import { toast } from 'react-toastify'


export default function Filmes() {

  const { id } = useParams()
  const navigate = useNavigate()

  const [filme, setFilme] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadFilme() {
      await api.get(`/movie/${id}`, {
        params: {
          api_key: "73be9b6ba16f4407390ddc53ad9d2d9d",
          language: "pt-BR",
        }
      })
        .then((response) => {
          console.log(response.data);
          setFilme(response.data)
          setLoading(false)
        })
        .catch(() => {
          console.log('Erro! Filme não encontrado')
          alert('Filme  não encontrado')
          navigate("/", { replace: true });
          return;
        })
    }

    loadFilme();

    return () => {
      console.log('COMPONENTE FOI DESMONTADO')
    }
  }, [navigate, id])

  const salvarFilme = () => {
    const minhaLista = localStorage.getItem('@primeflix');

    let filmesSalvos = JSON.parse(minhaLista) || [];

    const hasfilme = filmesSalvos.some((filmeSalvos) => filmeSalvos.id === filme.id)

    if(hasfilme) { 
      toast.warn("Esse filme já esta na lista")
      return
    }
    filmesSalvos.push(filme)
    localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos))
    toast.success('Filme salvo com sucesso.')
  }

  if (loading) {
    return (
      <div className='filme-infor'>
        <h1>Carregando detalhes...</h1>
      </div>
    )
  }

  return (
    <div className='filme-infor'>
      <h1>{filme.title}</h1>
      <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />

      <h3>Sinopse</h3>
      <span>{filme.overview}</span>
      <strong>Avaliação: {filme.vote_average} / 10</strong>

      <div className='area-button'>
        <button onClick={salvarFilme}>Salvar</button>
        <button>
          <a rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`} target="blank">
            Trailer
          </a>
        </button>
      </div>
    </div>
  );
}