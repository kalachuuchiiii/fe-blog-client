import { useState } from 'react'
import { Routes, Route, NavLink, Outlet } from 'react-router-dom';
import Homepage from './pages/homepage.jsx';
import SubmitPage from './pages/submitPage.jsx';
import SearchPage from './pages/searchPage.jsx';
import Searchbar from './components/jsx/searchBar.jsx';
import BlogPage from './pages/blog.jsx';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-11/12 sm:w-9/12 md:w-7/12 lg:w-5/12">

        <Routes>
          <Route element={
            <div>
              <div className = "flex items-center justify-evenly">
                <NavLink to="/"><h1 className="text-4xl my-4">
                  Useless-Blogsite.com
                </h1>
                </NavLink>
                <NavLink to="/submit" className="p-1 text-gray-900 underline" >Submit</NavLink>
              </div>
              <Searchbar />
              <Outlet />
            </div>
          } >
            <Route path="/" element={<Homepage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/blog/:id" element={<BlogPage />} />
          </Route>

          <Route path="/submit" element={<SubmitPage />} />


        </Routes>
      </div>
    </div>
  )
}

export default App
