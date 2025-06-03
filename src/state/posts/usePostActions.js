import { actions } from './postSlice.js';
import { useDispatch } from 'react-redux';
import { fetchAPI } from '../../helper/api/index.js';
export const usePostActions = () => {
  const dispatch = useDispatch();
  const { getPosts } = actions;
  
  const fetchPosts = (page) => { 
   return dispatch(getPosts(page));
    }
    
  const uploadPost = (form) => {
    return dispatch(actions.uploadPost(form));
  }
  
  const findPosts = async(skip = 0, filter = {}) => {
      const res = await fetchAPI("get", `/posts/${skip}`, { params: {
       filter: JSON.stringify(filter)
    }})
    return res;
  }
  
  const findOnePost = async(id = null) => {
    const res = await fetchAPI("get", `/post/${id}`);
    return res;
  }
    
    return {
      fetchPosts, 
      uploadPost,
      findPosts,
      findOne: findOnePost
    }
    
}

