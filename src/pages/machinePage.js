import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { FaTrashCan, FaPencil } from "react-icons/fa6";
import ModalDelete from '../components/ModalDelete';
import ModalAdd from '../components/ModalAdd';
import ModalEdit from '../components/ModalEdit';
import axios from 'axios';
import classes from './css/MachinePage.module.css'

function MachinePage() {
  const [machine, setMachine] = useState(null);
  const [constantMachine, setConstantMachine] = useState([]);

  useEffect(() => {
    const fetchDataMachine = async () => {
      try {
        const response = await axios.get('https://books-opening.gl.at.ply.gg:61345/api/v1/weightScale/machine/all/forDashboard');
        setMachine(response.data); 
      } catch (error) {
        console.error('Error fetching machine data:', error);
      }
    };

    fetchDataMachine();
    // Set up an interval to periodically check for changes in the data
    const intervalMachine = setInterval(fetchDataMachine, 60000); 

    // Clean up the interval to prevent memory leaks
    return () => {
      clearInterval(intervalMachine);
    }
  }, []); 

  useEffect(() => {
    if (machine !== null){
    
      console.log(machine)
      // Check if the contents of the arrays are equal
      const arraysEqual = JSON.stringify(constantMachine) === JSON.stringify(machine);

      if (!arraysEqual){
        setConstantMachine(machine);
      }
    }
  }, [machine]);  

  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPages = 9
  const lastIndex = currentPage * recordsPerPages
  const firstIndex = lastIndex - recordsPerPages
  const totalPageCount = Math.ceil(constantMachine.length / recordsPerPages);
  const record = constantMachine.slice(firstIndex, lastIndex)

  const getDisplayedPages = () => {
    const maxDisplay = 5;
    let start = currentPage - Math.floor(maxDisplay / 2);
    start = Math.max(start, 1);
    start = Math.min(start, Math.max(totalPageCount - maxDisplay + 1, 1));

    return Array.from({ length: Math.min(maxDisplay, totalPageCount) }, (_, i) => start + i);
  };

  const displayedPages = getDisplayedPages();

  const canGoPrevious = currentPage > 1;
  const canGoNext =  currentPage < totalPageCount;

  const paginate = (page) => {
    if (page >= 1 && page <= lastIndex) {
      setCurrentPage(page);
    }
  };

  // -------------------------------------------- Modal delete --------------------------------------------
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [selectedRecordDeleteIndex, setSelectedRecordDeleteIndex] = useState(null);

  const openModalDelete = (idx) => {
    setSelectedRecordDeleteIndex(idx);
    setIsModalDeleteOpen(true);
  };

  const closeModalDelete = () => {
    setIsModalDeleteOpen(false);
  };

  const handleDelete = () => {
    const deleteDataMachine = {
      machine_name: record[selectedRecordDeleteIndex].machine_name
    }
    console.log('Deleting machine name: ', deleteDataMachine)
    axios.delete('https://books-opening.gl.at.ply.gg:61345/api/v1/weightScale/machine/delete', { data: deleteDataMachine })
    .then(response => {
      console.log('Delete request successful: ', response.data);
    })
    .catch(error => {
      console.error('Error making delete request: ', error);
    });

    // Create a copy of the current constantMachine array
    const updatedConstantMachine = [...constantMachine];
    updatedConstantMachine.splice(selectedRecordDeleteIndex + firstIndex, 1);
    // Set new constantMachine when delete successful
    setConstantMachine(updatedConstantMachine);

    closeModalDelete();
  };

  // -------------------------------------------- Modal add --------------------------------------------
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);

  const handleAdd = (newMachine) => {
    console.log(newMachine)
    const setMachine = {
      create_date: newMachine.create_date,
      machine_name: newMachine.machine_name,
      faculty: newMachine.faculty,
      all_profile: newMachine.profile.join(', ')
    }
    
    const addNewMachineData = {
      machine_name: newMachine.machine_name,
      faculty: newMachine.faculty,
      all_profile: newMachine.profile
    }

    console.log('Adding new machine data: ', addNewMachineData)
    axios.post('https://books-opening.gl.at.ply.gg:61345/api/v1/weightScale/machine/add', addNewMachineData)
    .then(response => {
      console.log('Add request successful:', response.data);
    })
    .catch(error => {
      console.error('Error making add request:', error);
    });

    setConstantMachine(prevData => [setMachine, ...prevData]);
  };

  const openModalAdd = () => {
    setIsModalAddOpen(true);
  };

  const closeModalAdd = () => {
    setIsModalAddOpen(false);
  };

  // -------------------------------------------- Modal edit --------------------------------------------
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleUpdate = (updatedData) => {
    const newUpdatedData = {
      create_date: updatedData.create_date,
      machine_name: updatedData.machine_name_new,
      faculty: updatedData.faculty,
      all_profile: updatedData.profile.join(', ')
    }

    const updatedNewMachineData = {
      machine_name: updatedData.machine_name,
      machine_name_new: updatedData.machine_name_new,
      faculty: updatedData.faculty,
      all_profile: updatedData.profile
    }
    
    console.log('Editing machine data: ', updatedData)
    axios.put('https://books-opening.gl.at.ply.gg:61345/api/v1/weightScale/machine/edit', updatedNewMachineData)
    .then(response => {
      console.log('Edit request successful:', response.data);
    })
    .catch(error => {
      console.error('Error making edit request:', error);
    });

    const updatedConstantMachine = [...constantMachine];
    updatedConstantMachine[editIndex] = newUpdatedData;
    // Set new constantMachine when delete successful
    setConstantMachine(updatedConstantMachine);
  };
 
   const openModalEdit = (index) => {
     setIsModalEditOpen(true);
     setEditIndex(index);
   };
 
   const closeModalEdit = () => {
     setIsModalEditOpen(false);
   };

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>เครื่องชั่งและบันทึกน้ำหนักขยะ</h1>

      <div className={classes.containerAddBtn}>
        <span className={classes.addBtn} onClick={openModalAdd}>ลงทะเบียนเครื่องชั่งน้ำหนักใหม่</span>
      </div>

      <div className={classes.containerTable}>
        <div className={classes.backgroundContainerTable}>
          <div className={classes.containerOnlyTable}>
            <table className={classes.table}>
              <thead>
                <tr>
                  <th className={classes.tableTH1}>วัน/เดือน/ปี</th>
                  <th className={classes.tableTH2}>ชื่อเครื่องชั่งน้ำหนัก</th>
                  <th className={classes.tableTH3}>ชื่อคณะที่ทำการติดตั้ง</th>
                  <th className={classes.tableTH4}>รายละเอียดการตั้งค่าประเภทขยะ</th>
                  <th className={classes.tableTH5}></th>
                </tr>
              </thead>
              <tbody>
                {record.map((val, idx) => (
                  <tr key={idx}>
                    <td className={classes.tableTD1}>{val.create_date}</td>
                    <td className={classes.tableTD2}>{val.machine_name}</td>
                    <td className={classes.tableTD3}>{val.faculty}</td>
                    <td className={classes.tableTD4}>{val.all_profile}</td>
                    <td className={classes.tableTD5}>
                      <span className={classes.tableTDIcon}>
                        <FaTrashCan className={classes.deleteIconBtn} onClick={() => openModalDelete(idx)}/>
                        <FaPencil className={classes.pencilIconBtn} onClick={() => openModalEdit(idx)}/>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <nav>
            <ul className={classes.pagination}>
              <li className={classes.paginationPageLinkItem}>
                {canGoPrevious ? (
                  <a href='#' className={classes.paginationPageLink} onClick={() => paginate(currentPage - 1)}>ก่อนหน้า</a>
                ) : (
                  <span className={classes.paginationPageLinkDisabled}>ก่อนหน้า</span>
                )}
              </li>
              {displayedPages.map((page, idx) => (
                <li key={idx} className={`${classes.paginationItem} ${currentPage === page ? classes.active : ''}`}>
                  <a href='#' className={classes.paginationListItem} onClick={() => paginate(page)}>{page}</a>
                </li>
              ))}
              <li className={classes.paginationPageLinkItem}>
                {canGoNext ? (
                  <a href='#' className={classes.paginationPageLink} onClick={() => paginate(currentPage + 1)}>ถัดไป</a>
                ) : (
                  <span className={classes.paginationPageLinkDisabled}>ถัดไป</span>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </div>
      {isModalDeleteOpen && (
        <ModalDelete 
          onClose={closeModalDelete} 
          onDelete={handleDelete} 
          record={record[selectedRecordDeleteIndex]}
        />
      )}
      {isModalEditOpen && (
        <ModalEdit 
          onClose={closeModalEdit} 
          onUpdate={handleUpdate} 
          initialData={record[editIndex]} 
        />
      )}
      {isModalAddOpen && (
        <ModalAdd onClose={closeModalAdd} onAdd={handleAdd} />
      )}
    </div>
  );
}

export default MachinePage;