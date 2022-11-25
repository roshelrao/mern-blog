import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { Blogs } from './pages/Blogs';
import AddBlog from './pages/AddBlog';
import EditBlog from './pages/EditBlog';
import Blog from './pages/Blog';

function App() {
  // const logout = (component) => {
  //   console.log("inside logout")
  //   localStorage.removeItem("userInfo");
  //   return component;
  // }

  return (
    <div className="App">
    <Router>
    <Navbar/>
    <div>
    <Routes>
    <Route path='/' element={<Home/>} exact/>
    <Route path='/login' element={<Login isLogout={false}/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/myBlogs' element={<Blogs/>}/>
    <Route path='/addBlog' element={<AddBlog/>}/>
    <Route path='/edit' element={<EditBlog/>}/>
    <Route path='/logout' element={<Login isLogout={true}/>}/>
    <Route path='/view' element={<Blog/>}/>
    {/* <Route path='/logout' element={(<logout><Login /></logout>)}/> */}
    </Routes>
    </div>
    </Router>
    </div>
  );
}

export default App;
