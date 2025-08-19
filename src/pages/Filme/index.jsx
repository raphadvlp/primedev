import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import api from '../../services/api';

import './filme-info.css';

function Filme() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [filme, setFilme] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFilme() {
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: "c8abc1a9489fa07f2afb0537ed08aa5d",
                    language: "pt-BR"
                }
            })
            .then((response) => {
                setFilme(response.data);
                setLoading(false);
            })
            .catch(() => {
                navigate('/', { replace: true });
                return;
            })
        }

        loadFilme();

        return () => {
            console.log("Componente desmontado");
        }

    }, [id, navigate]);

    function salvarFilme() {
        const minhaLista = localStorage.getItem('@primeflix');

        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some((filmesSalvo) => filmesSalvo.id === filme.id);

        if(hasFilme) {
            toast.warn('Você já possui esse filme salvo!');
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem('@primeflix', JSON.stringify(filmesSalvos));
        toast.success('Filme salvo com sucesso!');
        navigate('/');

    }

    if(loading) {
        return (
            <h1 className='filme-info'>
                Carregando detalhes do filme...
            </h1>
        )
    }

    return(
        <div className='filme-info'>
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>

            <strong>Avaliação: {filme.vote_average.toFixed(1)} / 10</strong>

            <div className='area-buttons'>
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a href={`https://youtube.com/results?search_query=${filme.title} Trailer`} target="blank" rel="external">
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    )
}

export default Filme;