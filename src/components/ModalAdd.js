import React, { useState, useEffect } from 'react';
import Multiselect from 'multiselect-react-dropdown';
import classes from './css/ModalAdd.module.css';

function ModalAdd({ onClose, onAdd }) {
  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');  // Months are 0-indexed
    const day = String(currentDate.getDate()).padStart(2, '0');
    
    return `${day}/${month}/${year}`;
  };

  const [formData, setFormData] = useState({
    create_date: getCurrentDate(),
    machine_name: '',
    faculty: '',
    profile: ''
  });

  const [isFormValid, setIsFormValid] = useState(true);

  const handleChange = (selectedList, name) => {
    let extractedKeys = {};
    if (name === "profile") {
        extractedKeys = selectedList.map(item => item.key);
        setFormData(prevState => ({
            ...prevState,
            [name]: extractedKeys
        }));
    }
    else {
        setFormData(prevState => ({
        ...prevState,
        [name]: selectedList
        }));
    }
    setIsFormValid(true);
  };

  const handleSubmit = () => {
    // Validate data and add new machine
    if (formData.create_date && formData.machine_name && formData.faculty && formData.profile.length) {
      onAdd(formData);
      onClose();
    } else {
      setIsFormValid(false);
    }
  };


  // ----------------------------------- DropDown constant -----------------------------------
  const [profile, setProfile] = useState([
    { cat: 'Group 1', key: 'กระป๋อง'},
    { cat: 'Group 2', key: 'แก้ว'},
    { cat: 'Group 3', key: 'กระดาษ'},
    { cat: 'Group 4', key: 'กล่องนม'},
    { cat: 'Group 5', key: 'ขวดพลาสติก'},
    { cat: 'Group 6', key: 'หลอดพลาสติก'},
    { cat: 'Group 7', key: 'แก้วน้ำพลาสติก (ขายได้)'},
    { cat: 'Group 8', key: 'แก้วน้ำพลาสติก (ขายไม่ได้)'},
    { cat: 'Group 9', key: 'ช้อน - ส้อมพลาสติก'},
    { cat: 'Group 10', key: 'ถุงพลาสติก'},
    { cat: 'Group 11', key: 'ถุงวิบวับ'},
    { cat: 'Group 12', key: 'กล่องอาหารพลาสติก'},
    { cat: 'Group 13', key: 'เศษอาหาร'},
    { cat: 'Group 14', key: 'ขยะอันตราย'},
    { cat: 'Group 15', key: 'ขยะห้องน้ำ'},
    { cat: 'Group 16', key: 'ขยะกำพร้า'},
    { cat: 'Group 17', key: 'ขยะทั่วไป'},
  ])    

  const customStyleDropdown = {
    searchBox: {
      width: 340,
      height: 35,
      border: '1px solid #3b443a7e',
    },
    optionContainer: {
      height: 170,
    }
  }

  return (
    <div className={classes.container}>
        <div className={classes.backgroundModal}>
            <div className={classes.containerModalDetail}>
                <h2 className={classes.modalTextH2}>ลงทะเบียนเครื่องชั่งน้ำหนักใหม่</h2>

                <div className={classes.formGroup}>
                    <label htmlFor="machine_name">ชื่อเครื่องชั่งน้ำหนักขยะ</label>
                    <input 
                        type="text" 
                        id="machine_name" 
                        name="machine_name" 
                        value={formData.machine_name}
                        onChange={(e) => handleChange(e.target.value, "machine_name")}
                    />
                </div>

                <div className={classes.formGroup}>
                    <label htmlFor="faculty">ชื่อคณะที่ทำการติดตั้ง</label>
                    <input 
                        type="text" 
                        id="faculty" 
                        name="faculty" 
                        value={formData.faculty}
                        onChange={(e) => handleChange(e.target.value, "faculty")}
                    />
                </div>

                <div className={classes.formGroupProfile}>
                    <label htmlFor="profile">การตั้งค่าประเภทของขยะ</label>
                </div>

                <Multiselect className={classes.dropdown}
                    displayValue="key"
                    id="profile" 
                    name="profile" 
                    hideSelectedList
                    onKeyPressFn={function noRefCheck(){}}
                    onRemove={(e) => handleChange(e, "profile")}
                    onSelect={(e) => handleChange(e, "profile")}
                    options={profile}
                    placeholder="เลือกประเภทของขยะ"
                    style={customStyleDropdown}
                    avoidHighlightFirstOption
                    showArrow
                    showCheckbox
                />

                <div className={classes.modalActions}>
                    <div className={classes.modalActionsWarning}>
                        {!isFormValid && (
                            <div className={classes.warningText}>** กรุณาลงทะเบียนให้ครบทุกหัวข้อ **</div>
                        )}
                    </div>
                    
                    <div className={classes.modalActionsText}>
                        <div className={classes.cancelBtn} onClick={onClose}>ยกเลิก</div>
                        <div className={classes.addBtn} onClick={handleSubmit}>บันทึก</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default ModalAdd;