import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Searchbar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  
  const nav = useNavigate();
  
  const handleChange = (e) => {
    setQuery(e.target.value)
  }
  
  const handleSubmit = () => {
    const q = query; 
    setSearchParams({q})
    nav(`/search/?q=${q}`);
  }

return <div className = "flex text-gray-900 w-full rounded-lg overflow-hidden outline outline-gray-900 ">
  <input onChange = {handleChange} value = {query} className = " p-2 w-full outline-none" />
  <button disabled = {query.length === 0} onClick = {handleSubmit} className = "p-2 text-gray-900 text-center">Search</button>
</div>

}

export default Searchbar 