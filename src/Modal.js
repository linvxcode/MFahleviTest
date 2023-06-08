import React from "react";
import { motion, AnimatePresence } from "framer-motion";


function Modal({ isOpen, onClose, addItem,error, newItem, setNewItem}) {
      const handleSubmit = (event) => {
        event.preventDefault();
        addItem(event);
      }
  return (
    <div className="container">
      <AnimatePresence>
        {isOpen && (
          <motion.div className="modal backdrop-blur-[1px]">
            <motion.div
              className="modal"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
            >
              <motion.div className="modal-content">
                <motion.span className="close-button" onClick={onClose}>
                  &times;
                </motion.span>
                <form onSubmit={handleSubmit}>
                  
                  <div>
                    <label htmlFor="nama">Nama Barang:</label>
                    <input
                    className={error ? "mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-red-500 text-red-500 placeholder:text-red-500 dark:!border-red-400 dark:!text-red-400 dark:placeholder:!text-red-400" : "input"}
                    type="text"
                    id="nama"
                    value={newItem.nama}
                    onChange={(event) =>
                      setNewItem({ ...newItem, nama: event.target.value })
                    }
                    required
                    />
                    {error ? <span className="text-red-500">{error}</span> : ''}
                  </div>
                  <div>
                    <label htmlFor="hargaBeli">Harga Beli:</label>
                    <input
                    className="input"
                      type="number"
                      id="hargaBeli"
                      value={newItem.hargaBeli}
                      onChange={(event) =>
                        setNewItem({
                          ...newItem,
                          hargaBeli: event.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label htmlFor="hargaJual">Harga Jual:</label>
                    <input
                    className="input"
                      type="number"
                      id="hargaJual"
                      value={newItem.hargaJual}
                      onChange={(event) =>
                        setNewItem({
                          ...newItem,
                          hargaJual: event.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label htmlFor="stok">Stok:</label>
                    <input
                    className="input"
                      type="number"
                      id="stok"
                      value={newItem.stok}
                      onChange={(event) =>
                        setNewItem({ ...newItem, stok: event.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label htmlFor="foto">Foto Barang:</label>
                    <input
                    className=""
                      type="file"
                      id="foto"
                      accept="image/jpeg, image/png"
                      onChange={(event) =>
                        setNewItem({ ...newItem, foto: event.target.files[0] })
                      }
                    />
                  </div>
                  <button type="submit" className="border border-gray-200 bg-gray-200 text-gray-700 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-300 focus:outline-none focus:shadow-outline">Tambah</button>
                </form>
                
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Modal;
