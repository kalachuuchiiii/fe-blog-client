import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { usePostActions } from '../state/posts/usePostActions.js'
import { isBottom } from '../helper/page/index.js';
import { handleScrollTop } from '../helper/scroll/index.js';
import { setLoading } from '../state/posts/postSlice.js'
import { MoonLoader } from 'react-spinners';
import { NavLink } from 'react-router-dom';
import Iterator from '../components/utils/iterator.jsx';
import Post from '../components/jsx/post.jsx';
const Homepage = () => {
const { fetchPosts } = usePostActions();
const { posts, totalPost, loading, isLastPage } = useSelector(state => state.posts);
const dispatch = useDispatch();
const [page, setPage] = useState(0);

const fetchData = async(page = 0) => {
  try{
        const { payload: { data = [], total = 0} } = await fetchPosts(page)
        const lastPage = Math.floor(total/6);
        
      }catch(e){
        
      }
}

useEffect(() => {
  if(isLastPage) return;
  fetchData(0);
  return()=>{
    dispatch(setLoading(false))
  }
}, []);

useEffect(() => {
  
  const onScroll = () => {
    if(isLastPage || loading)return;
    if(isBottom()){
      setPage(prev => prev + 1);
    }
  }
  
  window.addEventListener("scroll", onScroll);
  return()=>{
    window.removeEventListener("scroll", onScroll);
  }
}, [isLastPage, loading])

useEffect(() => {
  if(isLastPage || page === 0 || loading)return;
  fetchData(page);
}, [page])






return <div className = "w-full flex flex-col gap-3 my-8">
  <Iterator list = {posts} Child = {Post} />
  <div className = "w-full flex justify-center my-4">
    {
      isLastPage ? <button onClick = {handleScrollTop} className = "text-black/50">You've reached the end</button> : loading && <MoonLoader size = "25" />
    }
  </div>
</div>

}

export default Homepage