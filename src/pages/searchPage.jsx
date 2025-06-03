import { useSearchParams } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import { isBottom } from '../helper/page/index.js';
import { handleScrollTop } from '../helper/scroll/index.js';
import { MoonLoader } from 'react-spinners';
import { usePostActions } from '../state/posts/usePostActions.js';
import Post from '../components/jsx/post.jsx';
import Iterator from '../components/utils/iterator.jsx';

const SearchPage = () => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const [totalPost, setTotalPost] = useState(0);
  const [searchQuery] = useSearchParams();
  const [results, setResults] = useState([]);
  const { findPosts } = usePostActions();
  const query = useMemo(() => searchQuery.get("q") || "", [searchQuery, searchQuery.get("q")]);




  const findResults = async (page = 0, isNew = false) => {
    setLoading(true);

    const option = {
      $or: [
        {
          title: {
            $regex: query,
            $options: "i"
          }
        },
        {
          description: {
            $regex: query,
            $options: "i"
          }
        }
      ]
    }
    const res = await findPosts(page, option)
    const { data: { data, total } } = res;
    if (res) {
      const allPosts = isNew ? data : [...results, ...data];
      if(allPosts.length === total){
        setIsLastPage(true);
      }
      setResults(allPosts)
      setTotalPost(total)
    }
    setLoading(false);
  }

  useEffect(() => {
    findResults(0, true);
    return()=>{
      setPage(0);
      setIsLastPage(false);
      setResults([]);
      setTotalPost(0)
    }
  }, [query])
  
  useEffect(()=>{
    return()=>{
      setPage(0);
      setIsLastPage(false);
      setResults([]);
      setTotalPost(0)
    }
  }, [])

  useEffect(() => {
    const onScroll = () => {
      if (loading || isLastPage) return;
      if (isBottom()) {
        setPage(prev => prev + 1)
      }
    }

    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    }
  }, [loading, isLastPage])

  useEffect(() => {
    if (page === 0 || loading || isLastPage) return;
    findResults(page)
  }, [page])





  return <div>
    <p className="w-full text-center p-2 text-black/50">{totalPost} results for '{searchQuery.get("q")}'</p>
    {
      results.length > 0 && <Iterator list={results} Child={Post} />
    }
    <div className="flex justify-center my-4">
      {
        isLastPage ? <button className="text-black/50 " onClick={handleScrollTop}>You've reached the end </button> : loading && <MoonLoader size="20" />
      }
    </div>
  </div>

}

export default SearchPage