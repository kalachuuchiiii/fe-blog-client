import { useState, useEffect } from 'react';
import { usePostActions } from '../../state/posts/usePostActions.js';
import { useSelector, useDispatch } from 'react-redux';
import { AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import LoadingModal from '../modal/loading.jsx';

const Submit = () => {
  const [form, setForm] = useState(JSON.parse(localStorage.getItem("blog")) || {
    title: "",
    description: "",
    file: ""
  })
  const { loading, error } = useSelector(state => state.posts);
  const nav = useNavigate();
  const { uploadPost } = usePostActions();

  const handlePost = async () => {
    try {
      const res = await uploadPost(form);
      if (res) {
        setForm({
          title: "",
          description: "",
          file: ""
        })
        nav("/")
      }
    
    } catch (e) {

    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e) => {
    const img = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setForm(prev => ({ ...prev, file: reader.result }))

    }
    reader.readAsDataURL(img);

  }

  const handleClick = () => {
    const btnFile = document.getElementById("file");
    btnFile.click();
  }

  useEffect(() => {
    const txt = document.getElementById("desc");
    txt.style.height = "auto";
    txt.style.height = `${txt.scrollHeight}px`;
  }, [form.description])

  useEffect(() => {
    localStorage.setItem("blog", JSON.stringify(form));
  }, [form.description, form.file, form.title])

  return <div className="flex pt-4 flex-col rounded my-2 w-full shadow-md overflow-hidden bg-neutral-100 text-gray-900">
    <AnimatePresence>
      {
        loading && <LoadingModal label={loading ? "Loading..." : <p>Error occured. <button onClick={() => { window.location.reload() }}>
          Reload
        </button></p>} />
      }
    </AnimatePresence>
    <div className="flex flex-col justify-center items-center">
      <label className="text-sm px-4 w-full text-left">Thumbnail <span className="text-red-400">*</span></label>
      <input onChange={handleImageChange} name="image" id="file" className="hidden pointer-events-none" type="file" accept="image/*" />
      {
        form.file ? <img onClick={handleClick} className="w-11/12 h-40  object-cover rounded " src={form.file} /> : <div className="bg-gradient-to-tr from-zinc-500 to-zinc-400 rounded grid place-content-center  w-11/12 h-40">
          <button className="text-white" onClick={handleClick}>Select a thumbnail</button>
        </div>
      }
    </div>
    <div className="flex flex-col p-4">
      <label className="text-sm flex gap-2 items-center "><p className="flex gap-1">Title<span className="text-red-400">*</span></p> <span className="text-black/30 text-xs">Min 5 Char</span></label>
      <input name="title" placeholder="Title" onChange={handleChange} value={form.title} className=" text-lg outline-none" />
    </div>
    <div className="flex flex-col p-4">
      <label className="text-xs flex gap-2 items-center"><p className="flex gap-1">Description<span className="text-red-400">*</span></p><span className="text-black/30 ">Min 30 Char</span></label>
      <textarea rows="5" id="desc" name="description" onChange={handleChange} value={form.description} placeholder="Description" className=" outline-none" />
    </div>
    <div className="flex justify-end">
      <button disabled={(loading || error || form.description.length < 30 || !form.file || form.title.length < 5)} onClick={handlePost} className={`p-2 rounded text-black outline outline-black m-2 ${(loading || error || form.description.length < 30 || !form.file || form.title.length < 5) && "opacity-30"}`}>Submit</button>
    </div>
  </div>

}

export default Submit