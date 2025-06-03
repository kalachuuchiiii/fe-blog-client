import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { usePostActions } from '../state/posts/usePostActions.js';
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
]
const BlogPage = () => {
  const [info, setInfo] = useState(null);
  const { id = null } = useParams();
  const { findOne } = usePostActions();

  const getInfo = async () => {
    const res = await findOne(id);
    if (res) {
      setInfo(res.data.data);
    }
  }


  useEffect(() => {
    getInfo();
  }, [id])
  

  const [year = 1999, month = 1, date = 1] = info?.createdAt?.split("T")[0]?.split("-")?.map(Number) || [1999,1,1]

  return <div className="my-8 grid gap-2">
    <div className="w-full h-40 bg-gradient-to-tr from-zinc-500 to-zinc-400 ">
      <img alt = {info?.url} className="w-full h-full rounded-lg object-cover" src={info?.url} />
    </div>
    <div className="grid gap-2">

      <h1 className="text-2xl break-all gloock">{info?.title || "Title"} </h1>

      <h1 className="text-black/80 break-all w-10/12 ml-2">{info?.description || "Description"}</h1>
    </div>
    <p className="text-xs my-10">Posted on { `${months[month-1]} ${date}, ${year}`}</p>
  </div>

}

export default BlogPage