import React from 'react';
import classes from './css/ModalDelete.module.css'

function ModalDelete({ onClose, onDelete, record }) {
  return (
    <div className={classes.container}>
      <div className={classes.backgroundModal}>
        <div className={classes.containerModalDetail}>
            <h2 className={classes.modalTextH2}>ยืนยันการลบ</h2>
            <p className={classes.modalText}>คุณแน่ใจหรือไม่ที่จะลบเครื่องชั่งน้ำหนักขยะ {record.machine_name} ?</p>
            <div className={classes.containerModalButton}>
                <div onClick={onClose} className={classes.closeBtn}>ยกเลิก</div>
                <div onClick={onDelete} className={classes.deleteBtn}>ลบ</div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default ModalDelete;
