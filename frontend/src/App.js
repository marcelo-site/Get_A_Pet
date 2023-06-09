import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

//  layouts
import Navbar from './components/layouts/NavBar';
import Footer from './components/layouts/Footer';

import Register from './components/pages/Auth/Register';
import Home from './components/pages/Home';
import Login from './components/pages/Auth/Login';
import Container from './components/layouts/Container';
import Message from './components/layouts/Message';
import Profile from './components/pages/User/Profile';

// context
import { UserProvider } from './context/UserContext';
import MyPets from './components/pages/Pet/MyPets';
import AddPet from './components/pages/Pet/AddPet';
import EditPet from './components/pages/Pet/EditPet';
import PetDetails from './components/pages/Pet/PetDetails';
import Myadoptions from './components/pages/Pet/MyAdoptions';

function App() { 
  return (
    <Router>
    <UserProvider>
    <Navbar />
    <Message />
      <Container>
        <Routes>

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user/profile" element={<Profile />} />
          <Route path="/pet/mypets" element={<MyPets />} />
          <Route path="/pet/add" element={<AddPet />} />
          <Route path="/pet/edit/:id" element={<EditPet />} />
          <Route path="/pet/details/:id" element={<PetDetails />} />
          <Route path="/pet/myadoptions" element={<Myadoptions />} />
          <Route path="/" element={<Home />} />

        </Routes>
      </Container>
      <Footer />
    </UserProvider>
    </Router>
  );
}

export default App;
