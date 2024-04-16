import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { FaTrashCan, FaPencil } from "react-icons/fa6";
import ModalDelete from '../components/ModalDelete';
import ModalAdd from '../components/ModalAdd';
import ModalEdit from '../components/ModalEdit';
import Axios from 'axios';
import classes from './css/MachinePage.module.css'

function MachinePage() {
  const [data, setData] = useState(null);
  
  // useEffect(() => {
  //   Axios.get('http://books-opening.gl.at.ply.gg:61345/api/v1/weightScale/machine/all')
  //   .then(res => setData(res.data)); // get the response data instead of the whole response object
  // }, []);

  // console.log(data)

  const [machineData, setMachineData] = useState([
                                          {
                                            create_date: "1/04/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, กระดาษ, กล่องนม, ขวดพลาสติก, หลอดพลาสติก, แก้วน้ำพลาสติก (ขายได้), แก้วน้ำพลาสติก (ขายไม่ได้), ช้อน-ส้อมพลาสติก, ถุงพลาสติก, ถุงวิบวับ, กล่องอาหารพลาสติก, เศษอาหาร, ขยะอันตราย, ขยะห้องน้ำ, ขยะกำพร้า, ขยะทั่วไป"
                                          },
                                          {
                                            create_date: "2/04/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, กระดาษ, กล่องนม, ขวดพลาสติก, หลอดพลาสติก, แก้วน้ำพลาสติก (ขายได้), แก้วน้ำพลาสติก (ขายไม่ได้), ช้อน-ส้อมพลาสติก, ถุงพลาสติก, ถุงวิบวับ, กล่องอาหารพลาสติก, เศษอาหาร, ขยะอันตราย, ขยะห้องน้ำ, ขยะกำพร้า, ขยะทั่วไป"
                                          },
                                          {
                                            create_date: "3/04/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, กระดาษ, กล่องนม, ขวดพลาสติก, หลอดพลาสติก, แก้วน้ำพลาสติก (ขายได้), แก้วน้ำพลาสติก (ขายไม่ได้), ช้อน-ส้อมพลาสติก, ถุงพลาสติก, ถุงวิบวับ, กล่องอาหารพลาสติก, เศษอาหาร, ขยะอันตราย, ขยะห้องน้ำ, ขยะกำพร้า, ขยะทั่วไป"
                                          },
                                          {
                                            create_date: "4/04/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, กระดาษ, กล่องนม, ขวดพลาสติก, หลอดพลาสติก, แก้วน้ำพลาสติก (ขายได้), แก้วน้ำพลาสติก (ขายไม่ได้), ช้อน-ส้อมพลาสติก, ถุงพลาสติก, ถุงวิบวับ, กล่องอาหารพลาสติก, เศษอาหาร, ขยะอันตราย, ขยะห้องน้ำ, ขยะกำพร้า, ขยะทั่วไป"
                                          },
                                          {
                                            create_date: "5/04/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, กระดาษ, กล่องนม, ขวดพลาสติก, หลอดพลาสติก, แก้วน้ำพลาสติก (ขายได้), แก้วน้ำพลาสติก (ขายไม่ได้), ช้อน-ส้อมพลาสติก, ถุงพลาสติก, ถุงวิบวับ, กล่องอาหารพลาสติก, เศษอาหาร, ขยะอันตราย, ขยะห้องน้ำ, ขยะกำพร้า, ขยะทั่วไป"
                                          },
                                          {
                                            create_date: "6/04/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, กระดาษ, กล่องนม, ขวดพลาสติก, หลอดพลาสติก, แก้วน้ำพลาสติก (ขายได้), แก้วน้ำพลาสติก (ขายไม่ได้), ช้อน-ส้อมพลาสติก, ถุงพลาสติก, ถุงวิบวับ, กล่องอาหารพลาสติก, เศษอาหาร, ขยะอันตราย, ขยะห้องน้ำ, ขยะกำพร้า, ขยะทั่วไป"
                                          },
                                          {
                                            create_date: "7/04/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, กระดาษ, กล่องนม, ขวดพลาสติก, หลอดพลาสติก, แก้วน้ำพลาสติก (ขายได้), แก้วน้ำพลาสติก (ขายไม่ได้), ช้อน-ส้อมพลาสติก, ถุงพลาสติก, ถุงวิบวับ, กล่องอาหารพลาสติก, เศษอาหาร, ขยะอันตราย, ขยะห้องน้ำ, ขยะกำพร้า, ขยะทั่วไป"
                                          },
                                          {
                                            create_date: "8/04/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, กระดาษ, กล่องนม, ขวดพลาสติก, หลอดพลาสติก, แก้วน้ำพลาสติก (ขายได้), แก้วน้ำพลาสติก (ขายไม่ได้), ช้อน-ส้อมพลาสติก, ถุงพลาสติก, ถุงวิบวับ, กล่องอาหารพลาสติก, เศษอาหาร, ขยะอันตราย, ขยะห้องน้ำ, ขยะกำพร้า, ขยะทั่วไป"
                                          },
                                          {
                                            create_date: "9/04/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, กระดาษ, กล่องนม, ขวดพลาสติก, หลอดพลาสติก, แก้วน้ำพลาสติก (ขายได้), แก้วน้ำพลาสติก (ขายไม่ได้), ช้อน-ส้อมพลาสติก, ถุงพลาสติก, ถุงวิบวับ, กล่องอาหารพลาสติก, เศษอาหาร, ขยะอันตราย, ขยะห้องน้ำ, ขยะกำพร้า, ขยะทั่วไป"
                                          },
                                          {
                                            create_date: "10/04/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, กระดาษ, กล่องนม, ขวดพลาสติก, หลอดพลาสติก, แก้วน้ำพลาสติก (ขายได้), แก้วน้ำพลาสติก (ขายไม่ได้), ช้อน-ส้อมพลาสติก, ถุงพลาสติก, ถุงวิบวับ, กล่องอาหารพลาสติก, เศษอาหาร, ขยะอันตราย, ขยะห้องน้ำ, ขยะกำพร้า, ขยะทั่วไป"
                                          },
                                          {
                                            create_date: "11/04/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, กระดาษ, กล่องนม, ขวดพลาสติก, หลอดพลาสติก, แก้วน้ำพลาสติก (ขายได้), แก้วน้ำพลาสติก (ขายไม่ได้), ช้อน-ส้อมพลาสติก, ถุงพลาสติก, ถุงวิบวับ, กล่องอาหารพลาสติก, เศษอาหาร, ขยะอันตราย, ขยะห้องน้ำ, ขยะกำพร้า, ขยะทั่วไป"
                                          },
                                          {
                                            create_date: "12/04/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, กระดาษ, กล่องนม, ขวดพลาสติก, หลอดพลาสติก, แก้วน้ำพลาสติก (ขายได้), แก้วน้ำพลาสติก (ขายไม่ได้), ช้อน-ส้อมพลาสติก, ถุงพลาสติก, ถุงวิบวับ, กล่องอาหารพลาสติก, เศษอาหาร, ขยะอันตราย, ขยะห้องน้ำ, ขยะกำพร้า, ขยะทั่วไป"
                                          },
                                          {
                                            create_date: "13/04/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, กระดาษ, กล่องนม, ขวดพลาสติก, หลอดพลาสติก, แก้วน้ำพลาสติก (ขายได้), แก้วน้ำพลาสติก (ขายไม่ได้), ช้อน-ส้อมพลาสติก, ถุงพลาสติก, ถุงวิบวับ, กล่องอาหารพลาสติก, เศษอาหาร, ขยะอันตราย, ขยะห้องน้ำ, ขยะกำพร้า, ขยะทั่วไป"
                                          },
                                          {
                                            create_date: "14/04/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, กระดาษ, กล่องนม, ขวดพลาสติก, หลอดพลาสติก, แก้วน้ำพลาสติก (ขายได้), แก้วน้ำพลาสติก (ขายไม่ได้), ช้อน-ส้อมพลาสติก, ถุงพลาสติก, ถุงวิบวับ, กล่องอาหารพลาสติก, เศษอาหาร, ขยะอันตราย, ขยะห้องน้ำ, ขยะกำพร้า, ขยะทั่วไป"
                                          },
                                          {
                                            create_date: "15/04/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, กระดาษ, กล่องนม, ขวดพลาสติก, หลอดพลาสติก, แก้วน้ำพลาสติก (ขายได้), แก้วน้ำพลาสติก (ขายไม่ได้), ช้อน-ส้อมพลาสติก, ถุงพลาสติก, ถุงวิบวับ, กล่องอาหารพลาสติก, เศษอาหาร, ขยะอันตราย, ขยะห้องน้ำ, ขยะกำพร้า, ขยะทั่วไป"
                                          },
                                          {
                                            create_date: "16/04/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "17/04/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "18/04/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "19/04/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "20/04/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "21/04/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "22/04/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "23/04/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "24/04/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "25/04/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "26/04/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "27/04/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "28/04/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "29/04/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "30/04/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "1/05/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "2/05/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "3/05/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "4/05/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "5/05/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "6/05/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "7/05/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "8/05/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "9/05/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "10/05/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "11/05/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "12/05/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "13/05/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "14/05/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "15/05/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "16/05/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "17/05/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "18/05/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "19/05/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "20/05/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "21/05/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "22/05/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "23/05/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "24/05/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "25/05/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "26/05/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "27/05/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "28/05/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "29/05/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "30/05/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "31/05/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "1/06/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "2/06/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "3/06/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "4/06/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "5/06/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "6/06/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "7/06/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "8/06/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "9/06/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "10/06/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "11/06/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "12/06/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "13/06/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "14/06/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "15/06/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "16/06/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "17/06/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "18/06/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "19/06/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "20/06/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "21/06/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "22/06/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "23/06/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "24/06/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "25/06/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "26/06/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "27/06/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "28/06/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "29/06/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "30/06/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "1/07/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "2/07/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "3/07/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "4/07/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "5/07/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "6/07/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "7/07/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "8/07/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "9/07/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "10/07/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "11/07/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "12/07/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "13/07/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "14/07/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "15/07/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "16/07/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "17/07/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "18/07/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                          {
                                            create_date: "19/07/2567",
                                            machine_name: "FIBO_01",
                                            faculty_name: "สถาบันวิทยาการหุ่นยนต์ภาคสนาม",
                                            profile_waste: "กระป๋อง, แก้ว, ขยะอันตราย"
                                          },
                                        ])
  
  const [currentPage, setCurrentPage] = useState(1)
  const recordsPerPages = 9
  const lastIndex = currentPage * recordsPerPages
  const firstIndex = lastIndex - recordsPerPages
  const totalPageCount = Math.ceil(machineData.length / recordsPerPages);
  const record = machineData.slice(firstIndex, lastIndex)

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
    console.log(record[selectedRecordDeleteIndex])
    // Create a copy of the current machineData array
    const updatedMachineData = [...machineData];
    updatedMachineData.splice(selectedRecordDeleteIndex + firstIndex, 1);
    // Set new machineData when delete successful
    setMachineData(updatedMachineData);

    closeModalDelete();
  };

  // -------------------------------------------- Modal add --------------------------------------------
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);

  const handleAdd = (newMachine) => {
    console.log(newMachine)
    const setMachine = {
        create_date: newMachine.create_date,
        machine_name: newMachine.machine_name,
        faculty_name: newMachine.faculty_name,
        profile_waste: newMachine.profile.join(', ')
      }
    setMachineData(prevData => [setMachine, ...prevData]);
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
      machine_name: updatedData.machine_name,
      faculty_name: updatedData.faculty_name,
      profile_waste: updatedData.profile.join(', ')
    }
    const updatedMachineData = [...machineData];
    updatedMachineData[editIndex] = newUpdatedData;
    // Set new machineData when delete successful
    setMachineData(updatedMachineData);
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
                    <td className={classes.tableTD3}>{val.faculty_name}</td>
                    <td className={classes.tableTD4}>{val.profile_waste}</td>
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