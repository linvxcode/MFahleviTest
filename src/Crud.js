import React, { useState } from "react";
import Modal from "./Modal";
import EditModal from "./EditModal";
import { motion, AnimatePresence } from "framer-motion";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const [items, setItems] = useState([
    {
      id: 1,
      foto: null,
      nama: "Roti",
      hargaBeli: 3000,
      hargaJual: 5000,
      stok: 20,
    },
    {
      id: 2,
      foto: null,
      nama: "Royco",
      hargaBeli: 3000,
      hargaJual: 5000,
      stok: 20,
    },
    {
      id: 3,
      foto: null,
      nama: "Indomie",
      hargaBeli: 3000,
      hargaJual: 5000,
      stok: 20,
    },
    {
      id: 4,
      foto: null,
      nama: "Sprite",
      hargaBeli: 4000,
      hargaJual: 5000,
      stok: 20,
    },
  ]);
  const [newItem, setNewItem] = useState({
    id: 0,
    foto: null,
    nama: "",
    hargaBeli: 0,
    hargaJual: 0,
    stok: 0,
  });
  const [editItem, setEditItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Fungsi untuk menampilkan daftar barang
  const filteredItems = items.filter((item) =>
    item.nama.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const showItems = () => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

    if (currentItems.length === 0) {
      return <p>Tidak ada barang yang tersedia.</p>;
    }

    return (
      <div>
        <h2 className="mt-5 mb-5 p-3">Daftar Barang:</h2>
        <div className="grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 gap-6 max-sm:grid-cols-1 max-sm:place-items-center">
          {currentItems.map((item, index) => (
            <div key={index} className="card w-[100%] max-sm:w-[70%] p-[10px]">
              {item.foto && (
                <img
                  src={URL.createObjectURL(new Blob([item.foto]))}
                  alt={item.nama}
                />
              )}
              <p>Nama Barang: {item.nama}</p>
              <p>Harga Beli: {item.hargaBeli}</p>
              <p>Harga Jual: {item.hargaJual}</p>
              <p>Stok: {item.stok}</p>
              <button
                onClick={() => deleteItem(index)}
                className="border border-red-500 bg-red-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline"
              >
                Hapus
              </button>
              <button
                onClick={() => editSelectedItem(index)}
                className="border border-gray-200 bg-gray-200 text-gray-700 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-300 focus:outline-none focus:shadow-outline"
              >
                Edit
              </button>
              {/* <button onClick={() => openUpdateModal()}>janfEdit</button> */}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Fungsi untuk menambahkan barang baru
  const addItem = (event) => {
    const existingItem = items.find(item => item.nama === newItem.nama);
    if (existingItem) {
      setError("name already exists")
      // console.log("Item with the same name already exists");
      return;
    }
    event.preventDefault();
    const updatedItems = [...items, { ...newItem, id: items.length + 1 }];
    setItems(updatedItems);
    setNewItem({
      id: 0,
      foto: null,
      nama: "",
      hargaBeli: 0,
      hargaJual: 0,
      stok: 0,
    });

    setTimeout(() => {
      closeModal(true);
    }, 100);
  };

  // Fungsi untuk menghapus barang
  const deleteItem = (index) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus barang ini?")) {
      const updatedItems = items.filter((item, i) => i !== index);
      setItems(updatedItems);
    }
  };

  // Fungsi untuk mengedit barang
  const editSelectedItem = (index) => {
    const item = filteredItems[index];
    setEditItem(item);
    setIsUpdateModal(true);
  };

  const updateItem = () => {
    const updatedItems = items.map((item) => {
      if (item.id === editItem.id) {
        return {
          ...item,
          nama: editItem.nama,
          hargaBeli: editItem.hargaBeli,
          hargaJual: editItem.hargaJual,
          stok: editItem.stok,
        };
      }
      setIsUpdateModal(false);
      return item;
    });

    setItems(updatedItems);

    const updatedItemIndex = updatedItems.findIndex(
      (item) => item.id === editItem.id
    );
    const updatedFile = editItem.foto;

    if (updatedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataURL = event.target.result;
        const updatedItemWithFoto = {
          ...updatedItems[updatedItemIndex],
          foto: dataURL,
        };
        updatedItems[updatedItemIndex] = updatedItemWithFoto;
        setItems(updatedItems);
        setEditItem(null);
      };
      reader.readAsDataURL(updatedFile);
    } else {
      setEditItem(null);
    }
  };

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isUpdateModal, setIsUpdateModal] = useState(false);

  // Function to open the modal for adding a new item
  const openAddModal = () => {
    setIsOpenModal(true);
    setIsUpdateModal(false);
  };

  // Function to open the modal for updating an item
  const openUpdateModal = (index) => {
    setIsOpenModal(false);
    openAddModal(false);
    setIsUpdateModal(true);
    setEditItem(items[index]);
  };
  //Modal Untuk Update
  const closeModal = () => {
    setIsOpenModal(false);
    setIsUpdateModal(false);
    setEditItem(null);
  };

  // Fungsi untuk membatalkan mode edit dan menghapus data item yang diedit
  const cancelEdit = () => {
    setIsOpenModal(false);
    setIsUpdateModal(false);
    setEditItem(null);
  };

  const renderPagination = () => {
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={currentPage === i ? "active" : ""}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="pagination mt-10 mb-10 flex justify-center">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="rounded  px-3 py-1.5 text-sm text-neutral-300 transition-all duration-300 bg-neutral-700 ">
          {pageNumbers}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    );
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <h1>CRUD</h1>
      <div className="flex justify-center flex-col flex-wrap justify-items-center items-center">
        <input
          className="w-[50%] items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200"
          type="text"
          placeholder="Search....."
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
        <button
          className="
       border border-gray-200 bg-gray-200 text-gray-700 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-300 focus:outline-none focus:shadow-outline
      "
        >
          Search
        </button>
      </div>
      <button
        onClick={openAddModal}
        className="
      border border-gray-200 bg-gray-200 text-gray-700 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-300 focus:outline-none focus:shadow-outline
      "
      >
        Add New Item
      </button>
      <Modal
        isOpen={isOpenModal}
        isUpdateModal={isUpdateModal}
        newItem={newItem}
        setNewItem={setNewItem}
        addItem={addItem}
        error={error}
        onClose={closeModal}
      />
      <EditModal />

      <div className="container">
        <AnimatePresence>
          {isUpdateModal && (
            <motion.div className="modal backdrop-blur-[1px]">
              <motion.div
                className="modal "
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
              >
                <motion.div className="modal-content">
                  <motion.span className="close-button" onClick={closeModal}>
                    &times;
                  </motion.span>

                  {editItem && (
                    <div>
                      <h2>Edit Barang</h2>
                      
                      <div>
                        <label htmlFor="nama">Nama Barang:</label>
                        <input
                          className="input"
                          type="text"
                          id="nama"
                          value={editItem.nama}
                          onChange={(event) =>
                            setEditItem({
                              ...editItem,
                              nama: event.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label htmlFor="hargaBeli">Harga Beli:</label>
                        <input
                          className="input"
                          type="number"
                          id="hargaBeli"
                          value={editItem.hargaBeli}
                          onChange={(event) =>
                            setEditItem({
                              ...editItem,
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
                          value={editItem.hargaJual}
                          onChange={(event) =>
                            setEditItem({
                              ...editItem,
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
                          value={editItem.stok}
                          onChange={(event) =>
                            setEditItem({
                              ...editItem,
                              stok: event.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label htmlFor="foto">Foto Barang:</label>
                        <input
                          type="file"
                          id="foto"
                          accept="image/jpeg, image/png"
                          onChange={(event) =>
                            setEditItem({
                              ...editItem,
                              foto: event.target.files[0],
                            })
                          }
                        />
                      </div>
                      <button onClick={updateItem} className="
                      border border-gray-200 bg-gray-200 text-gray-700 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-300 focus:outline-none focus:shadow-outline
                      ">Simpan</button>
                      {/* <button onClick={cancelEdit}>Batal</button> */}
                    </div>
                  )}
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {showItems()}
      {renderPagination()}
    </>
  );
};

export default App;
