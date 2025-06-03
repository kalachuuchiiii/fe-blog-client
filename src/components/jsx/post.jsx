import { NavLink } from 'react-router-dom';

const Post = ({ data = {} }) => {

  return (
    <div className="grid grid-cols-8 grid-rows-4 bg-zinc-200  rounded-lg text-gray-900 overflow-hidden gap-2 w-full">
      <img className = "w-full object-cover col-span-8 row-span-3 row-start-1 h-60" src = {data?.url} />
      <div className="col-span-6 row-span-1 row-start-4 p-2 col-start-1 active:underline" >  <NavLink to = {`/blog/${data._id}`}>
        <p className = "w-full truncate">{data?.title}</p>
      </NavLink>
        <p className="text-black/50 truncate text-sm">{data?.description}</p></div>
        <div className = "col-span-2 col-start-7 flex items-center justify-center">
          <p className = "text-xs">{data?.createdAt.split("T")[0] || "Today"}</p>
        </div>
    </div>
  )

}

export default Post