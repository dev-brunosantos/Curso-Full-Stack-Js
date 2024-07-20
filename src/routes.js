import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';
import Filmes from './pages/Filmes';
import Erro from './pages/Erro';
import Favoritos from './pages/Favoritos';

export default function RoutesApp() {
    return(
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/filme/:id' element={<Filmes />} />
                <Route path='/favoritos' element={<Favoritos />} />

                <Route path='*' element={<Erro />} />
            </Routes>
        </BrowserRouter>
    )
}