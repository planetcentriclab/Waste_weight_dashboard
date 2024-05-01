import React, { useState, useEffect } from 'react';
import Multiselect from 'multiselect-react-dropdown';
import classes from './css/ModalEdit.module.css';

function ModalEdit({ onClose, onUpdate, initialData }) {
  const [formData, setFormData] = useState({
        ...initialData,
        machine_name_new: initialData.machine_name,
        profile: ''
      });
  console.log(formData)
  const [isFormValid, setIsFormValid] = useState(true);

  const handleChange = (selectedList, name) => {
    let extractedKeys = [];
    if (name === "profile") {
      extractedKeys = selectedList.map(item => item.key);
      setFormData(prevState => ({
          ...prevState,
          [name]: extractedKeys
      }));
    }
    else if (name === "machine_name") {
      setFormData(prevState => ({
        ...prevState,
        machine_name_new : selectedList
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
    if (formData.profile === '') {
        formData.profile = formData.all_profile.split(',').map(item => item.trim());
    }
    // Validate data and add new machine
    if (formData.create_date && formData.machine_name && formData.machine_name_new && formData.faculty && formData.profile.length) {
      onUpdate(formData);
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

  // ----------------------------------- DropDown select constant -----------------------------------
  const stringToArray = (str) => {
    const items = str.split(',').map(item => item.trim());
    const categories = profile
  
    const result = items.map(item => {
      const categoryIndex = categories.findIndex(cat => cat.key === item);
      return {
        cat: `Group ${categoryIndex + 1}`,
        key: item
      };
    });
  
    return result;
  };

  const profileSelect = stringToArray(initialData.all_profile);

  return (
    <div className={classes.container}>
        <div className={classes.backgroundModal}>
            <div className={classes.containerModalDetail}>
                <h2 className={classes.modalTextH2}>แก้ไขรายละเอียดเครื่องชั่งน้ำหนัก</h2>

                <div className={classes.formGroup}>
                    <label htmlFor="machine_name">ชื่อเครื่องชั่งน้ำหนักขยะ</label>
                    <input 
                        type="text" 
                        id="machine_name" 
                        name="machine_name" 
                        value={formData.machine_name_new}
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
                    selectedValues={profileSelect} 
                    placeholder="เลือกประเภทของขยะ"
                    style={customStyleDropdown}
                    avoidHighlightFirstOption
                    showArrow
                    showCheckbox
                />

                <div className={classes.modalActions}>
                    <div className={classes.modalActionsWarning}>
                        {!isFormValid && (
                            <div className={classes.warningText}>** กรุณาแก้ไขให้ครบทุกหัวข้อ **</div>
                        )}
                    </div>
                    
                    <div className={classes.modalActionsText}>
                        <div className={classes.cancelBtn} onClick={onClose}>ยกเลิก</div>
                        <div className={classes.editBtn} onClick={handleSubmit}>บันทึก</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default ModalEdit;