import React from 'react';
import classes from './css/ModalDelete.module.css'

function ModalEditFactor({ onClose}) {
  return (
    <div className={classes.container}>
      <div className={classes.backgroundModal}>
        <div className={classes.containerModalDetail}>
            <h2 className={classes.modalTextH2}>การเปลี่ยนแปลงสำเร็จ</h2>
            <p className={classes.modalText}>sะบบได้ทำการเปลี่ยนแปลงค่า Emission Factor เรียบร้อยแล้ว</p>
            <div className={classes.containerModalButton}>
                <div onClick={onClose} className={classes.closeBtn}>ตกลง</div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default ModalEditFactor;