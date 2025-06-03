import Modal from './modalBG.jsx';

const Loading = ({ label = "Loading", onClose }) => {


  return <Modal onClose={onClose}>
     <div className="p-4 bg-neutral-100 rounded-lg w-6/12 text-center">
      {label}
    </div>

  </Modal>
}

export default Loading