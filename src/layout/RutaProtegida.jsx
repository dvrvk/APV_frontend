import { Outlet, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import '../App.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const RutaProtegida = () => {
    const {auth, cargando} = useAuth();

    if(cargando) {
        return 'cargando...'
    }

    return (
        <>
            <Header />
            {
                auth._id ? (
                    <main className='container mx-auto mt-10 lg:px-10 -z-10'>
                        <Outlet /> 
                    </main>
                        
                ) : <Navigate to="/" />
            }
            <Footer />
        </>
            
        )
}

export default RutaProtegida