import Submit from '../components/jsx/submit.jsx';
import { NavLink } from 'react-router-dom';

const SubmitPage = () => {

return <div className = "w-full text-gray-900">
  <div className = "my-4 p-1 space-y-4">
    <button>          <NavLink className="ml-2 underline" to="/">Home</NavLink></button>
          <div>
              <h1 className = "text-4xl">Submit a blog</h1>
    <p className = "text-zinc-500 ml-2 gloock">Please submit your blog post below for review and publication to our platform.</p>
          </div>
  </div>

  <Submit />
</div>

}

export default SubmitPage