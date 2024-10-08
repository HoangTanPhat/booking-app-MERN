import { useEffect } from 'react';
import {
    Navigate,
    Route,
    BrowserRouter as Router,
    Routes
} from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import { useAppContext } from './contexts/AppContext';
import Layout from './layouts/Layout';
import AddHotel from './pages/AddHotel';
import Register from './pages/Register';
import SignIn from './pages/SignIn';
import MyHotels from './pages/MyHotels';

function App() {
    const { isLoggedIn } = useAppContext();

    useEffect(() => {
        if (isLoggedIn) {
            console.log(isLoggedIn);
        }
    }, [isLoggedIn]);

    return (
        <Router>
            <Routes>
                <Route
                    path='/'
                    element={
                        <Layout>
                            <p>Home Page</p>
                        </Layout>
                    }
                />
                <Route
                    path='/search'
                    element={
                        <Layout>
                            <p>Search Page</p>
                        </Layout>
                    }
                />
                <Route
                    path='/register'
                    element={
                        <Layout>
                            <Register />
                        </Layout>
                    }
                />
                <Route
                    path='/sign-in'
                    element={
                        <Layout>
                            <SignIn />
                        </Layout>
                    }
                />

                <Route
                    path='/add-hotel'
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <AddHotel />
                            </Layout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path='/my-hotels'
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <MyHotels />
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route path='*' element={<Navigate to='/' />} />
            </Routes>
        </Router>
    );
}

export default App;
