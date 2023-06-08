import React  from "react";
import { motion, AnimatePresence } from "framer-motion";


const Modal = ({ isOpen, onClose, setEditItem, editItem,updateItem,cancelEdit }) => {

  return (
    <div className="container" >
       <AnimatePresence>
        {isOpen && (
          <motion.div className="modal bg-b">
            <motion.div
              className="modal "
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
            >
              <motion.div className="modal-content">
                <motion.span className="close-button" onClick={onClose}>
                  &times;
                </motion.span>
           
            
                
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Modal;
