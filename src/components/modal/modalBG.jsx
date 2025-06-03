import { fade } from '../../variant.js';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
const Modal = ({children, onClose}) => {

useEffect(() => {
  document.body.style.overflow = "hidden" 
  return () => {
    document.body.style.overflow = "" 
  }
}, [])

return <motion.div
variants = {fade}
initial = "hidden" 
animate = "visible" 
exit = "hidden"
className = "flex fixed inset-0 justify-center bg-black/80 z-20 items-center"
onClick = {onClose}
>
  {children}
</motion.div>

}

export default Modal