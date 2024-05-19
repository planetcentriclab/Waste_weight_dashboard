import classes from './css/HomePage.module.css'
import Multiselect from 'multiselect-react-dropdown';
import { DateRange } from 'react-date-range';
import { format } from 'date-fns'
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 
import { Chart as ChartJS } from 'chart.js/auto';
import { Bar } from 'react-chartjs-2' 
import calendarIcon from './img/calendar.png';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ExportToCSV from '../components/GenerateCSV'

ChartJS.defaults.maintainAspectRatio = false;
ChartJS.defaults.responsive = true;
ChartJS.defaults.font.size = 10.5;
ChartJS.defaults.layout.padding = 13;
ChartJS.defaults.plugins.legend.display = false;
ChartJS.defaults.font.family = 'Prompt';

function HomePage() {

  // ----------------------------------- ProfileWaste and faculty constant -----------------------------------
  const [profileWaste, setProfileWaste] = useState(null);
  const [constantProfileWaste, setConstantProfileWaste] = useState(null);

  const [faculty, setFaculty] = useState(null);      
  const [constantFaculty, setConstantFaculty] = useState(null);  

  const [initialFlag, setInitialFlag] = useState(null); 
  const [requestData, setRequestData] = useState(null) 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://books-opening.gl.at.ply.gg:61345/api/v1/weightScale/profile_of_waste/thai');
        setProfileWaste(response.data); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }

      try {
        const response = await axios.get('https://books-opening.gl.at.ply.gg:61345/api/v1/weightScale/machine/faculty');
        setFaculty(response.data); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    // Set up an interval to periodically check for changes in the data
    const interval = setInterval(fetchData, 60000); 

    // Clean up the interval to prevent memory leaks
    return () => {
      clearInterval(interval);
    }
  }, []); 

  useEffect(() => {
    if (profileWaste !== null){
      const transformedArray = profileWaste.map((item, index) => {
        const cat = (index + 1).toString();
        const key = item.waste_profile_thai;
        return { cat, key };
      });
      
      // Check if the contents of the arrays are equal
      const arraysEqual = JSON.stringify(constantProfileWaste) === JSON.stringify(transformedArray);

      if (!arraysEqual){
        setConstantProfileWaste(transformedArray);
      }

      if (requestData === null) {
        setInitialFlag(1)
      }
    }
  }, [profileWaste]);  

  useEffect(() => {
    if (faculty !== null){
      const transformedArray = faculty.map((item, index) => {
        const cat = (index + 1).toString();
        const key = item.faculty;
        return { cat, key };
      });
      
      // Check if the contents of the arrays are equal
      const arraysEqual = JSON.stringify(constantFaculty) === JSON.stringify(transformedArray);

      if (!arraysEqual){
        setConstantFaculty(transformedArray);
      }

      if (requestData === null) {
        setInitialFlag(2)
      }
    }
  }, [faculty]);  

  // ----------------------------- Get old create date record ------------------------------
  const [oldDayRecord, setOldDayRecord] = useState(null)
  useEffect(() => { 
    const fetchData = async () => {
      try {
        const response = await axios.get('https://books-opening.gl.at.ply.gg:61345/api/v1/weightScale/record/oldDayRecord');
        const date = response.data[0].create_date
        setOldDayRecord(date.substring(0, 10)); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [])
  
  // ----------------------------------- Dropdown constant -----------------------------------
  const [profileDropdown, setProfileDropdown] = useState(null)
  const [facultyDropdown, setFacultyDropdown] = useState(null)

  // ----------------------------------- DateRange constant -----------------------------------
  const [minDate, setMinDate] = useState(new Date(2000, 1, 1, 0, 0, 0))
  const [date, setDate] = useState({ startDate: minDate, endDate: new Date(), key: 'selection'})
  const [openDate, setOpenDate] = useState(false)

  const [startDatePayload, setStartDatePayload] = useState(minDate)
  const [endDatePayload, setEndDatePayload] = useState(`${format(new Date(), 'yyyy-MM-dd')}`)

  // ----------------------------------- Dropdown handle -----------------------------------
  const handleRemoveDropdown = (e, type_multiselect) => {
    if (type_multiselect === 'profile_type') {
      setRequestData({
        profile_waste: e.map(obj => obj.key),
        faculty: facultyDropdown,
        start_date: startDatePayload,
        end_date: endDatePayload
      });
    }
    else {
      setRequestData({
        profile_waste: profileDropdown,
        faculty: e.map(obj => obj.key),
        start_date: startDatePayload,
        end_date: endDatePayload
      });
    }
  }

  const handleSelectDropdown = (e, type_multiselect) => {
    if (type_multiselect === 'profile_type') {
      setRequestData({
        profile_waste: e.map(obj => obj.key),
        faculty: facultyDropdown,
        start_date: startDatePayload,
        end_date: endDatePayload
      });
    }
    else {
      setRequestData({
        profile_waste: profileDropdown,
        faculty: e.map(obj => obj.key),
        start_date: startDatePayload,
        end_date: endDatePayload
      });
    }
  }

  const customStyleDropdown = {
    searchBox: {
      width: 300,
      border: '1px solid #1A3D19',
    }
  }


  // ----------------------------------- DateRange handle -----------------------------------
  const handleClickDateRange = () => {setOpenDate((prev) => !prev)};
  const handleChangeDateRange = (ranges) => {
    setDate(ranges.selection);
    setStartDatePayload(`${format(ranges.selection.startDate, 'yyyy-MM-dd')}`);
    setEndDatePayload(`${format(ranges.selection.endDate, 'yyyy-MM-dd')}`);
    setRequestData({
      profile_waste: profileDropdown,
      faculty: facultyDropdown,
      start_date: `${format(ranges.selection.startDate, 'yyyy-MM-dd')}`,
      end_date: `${format(ranges.selection.endDate, 'yyyy-MM-dd')}`
    });
  }

  const dateRangeRef = useRef(null);
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  });

  const handleOutsideClick = (e) => {
    if (dateRangeRef.current && !dateRangeRef.current.contains(e.target)) {
      setOpenDate(false);
    }
  };

  // Initial the startDate and endDate of the date range
  useEffect(() => {
    if (oldDayRecord != null) {
      const minDateArray = oldDayRecord.split('-').map(Number);
      setMinDate(new Date(minDateArray[0], minDateArray[1]-1, minDateArray[2], 0, 0, 0));
      setStartDatePayload(oldDayRecord)

      const initialStartDate = minDate; 
      const initialEndDate = new Date();  

      setDate({
        ...date,
        startDate: initialStartDate,
        endDate: initialEndDate
      });
    }
  }, [oldDayRecord]);


  // ----------------------------------- TotalWaste constant -----------------------------------
  const [dataProfileAmount, setDataProfileAmount] = useState(null)
  const [constantDataProfileAmount, setConstantDataProfileAmount] = useState(null)

  const [totalWaste, setTotalWaste] = useState('0.00')
  const [totalCarbon, setTotalCarbon] = useState('0.00')
  const [totalWasteDetail, setTotalWasteDetail] = useState([
                                                                { profile: 'กระป๋อง', amount: 0},
                                                                { profile: 'แก้ว', amount: 0},
                                                                { profile: 'กระดาษ', amount: 0},
                                                                { profile: 'กล่องนม', amount: 0},
                                                                { profile: 'ขวดพลาสติก', amount: 0},
                                                                { profile: 'หลอดพลาสติก', amount: 0},
                                                                { profile: 'แก้วน้ำพลาสติก (ขายได้)', amount: 0},
                                                                { profile: 'แก้วน้ำพลาสติก (ขายไม่ได้)', amount: 0},
                                                                { profile: 'ช้อน - ส้อมพลาสติก', amount: 0},
                                                                { profile: 'ถุงพลาสติก', amount: 0},
                                                                { profile: 'ถุงวิบวับ', amount: 0},
                                                                { profile: 'กล่องอาหารพลาสติก', amount: 0},
                                                                { profile: 'เศษอาหาร', amount: 0},
                                                                { profile: 'ขยะอันตราย', amount: 0},
                                                                { profile: 'ขยะห้องน้ำ', amount: 0},
                                                                { profile: 'ขยะกำพร้า', amount: 0},
                                                                { profile: 'ขยะทั่วไป', amount: 0},
                                                              ])     

  const [totalCarbonDetail, setTotalCarbonDetail] = useState([
                                                                { profile: 'กระป๋อง', amount: 0},
                                                                { profile: 'แก้ว', amount: 0},
                                                                { profile: 'กระดาษ', amount: 0},
                                                                { profile: 'กล่องนม', amount: 0},
                                                                { profile: 'ขวดพลาสติก', amount: 0},
                                                                { profile: 'หลอดพลาสติก', amount: 0},
                                                                { profile: 'แก้วน้ำพลาสติก (ขายได้)', amount: 0},
                                                                { profile: 'แก้วน้ำพลาสติก (ขายไม่ได้)', amount: 0},
                                                                { profile: 'ช้อน - ส้อมพลาสติก', amount: 0},
                                                                { profile: 'ถุงพลาสติก', amount: 0},
                                                                { profile: 'ถุงวิบวับ', amount: 0},
                                                                { profile: 'กล่องอาหารพลาสติก', amount: 0},
                                                                { profile: 'เศษอาหาร', amount: 0},
                                                                { profile: 'ขยะอันตราย', amount: 0},
                                                                { profile: 'ขยะห้องน้ำ', amount: 0},
                                                                { profile: 'ขยะกำพร้า', amount: 0},
                                                                { profile: 'ขยะทั่วไป', amount: 0},
                                                              ])    

  useEffect(() => {
    if (constantProfileWaste !== null && constantFaculty !== null && initialFlag === 2 && requestData === null) {
      const initialProfile = constantProfileWaste.map(obj => obj.key);
      const initialFaculty = constantFaculty.map(obj => obj.key);
      setProfileDropdown(initialProfile)
      setFacultyDropdown(initialFaculty)

      const minDateArray = oldDayRecord.split('-').map(Number);
      setDate({
        ...date,
        startDate: new Date(minDateArray[0], minDateArray[1]-1, minDateArray[2], 0, 0, 0),
        endDate: new Date()
      });
  
      setRequestData({
        profile_waste: initialProfile,
        faculty: initialFaculty,
        start_date: oldDayRecord,
        end_date: `${format(new Date(), 'yyyy-MM-dd')}`
      });

      setInitialFlag(3)
    }
  }, [initialFlag]); 

  useEffect(() => {
    const fetchDataProfile = async () => {
      try {
        const response = await axios.post('https://books-opening.gl.at.ply.gg:61345/api/v1/weightScale/record/summary', requestData);
        setDataProfileAmount(response.data); 
        console.log('Request get data: ', requestData)
        console.log('Get request data successful: ', response.data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }  
    };

    fetchDataProfile();
    // Set up an interval to periodically check for changes in the data
    const intervalMachine = setInterval(fetchDataProfile, 30000); 

    // Clean up the interval to prevent memory leaks
    return () => {
      clearInterval(intervalMachine);
    }
  }, [requestData]); 

  useEffect(() => {
    if (dataProfileAmount !== null){
    
      // Check if the contents of the arrays are equal
      const arraysEqual = JSON.stringify(constantDataProfileAmount) === JSON.stringify(dataProfileAmount);

      if (!arraysEqual){
        setConstantDataProfileAmount(dataProfileAmount);
      }
    }
  }, [dataProfileAmount]);  

  useEffect(() => {
    if (constantDataProfileAmount !== null){
      setTotalWaste(constantDataProfileAmount.total_waste_detail);
      setTotalCarbon(constantDataProfileAmount.total_carbon_detail);
      setTotalWasteDetail(constantDataProfileAmount.amount_waste_detail);
      setTotalCarbonDetail(constantDataProfileAmount.amount_carbon_detail);
    }
  }, [constantDataProfileAmount]);  

  // ----------------------------------- Generate CSV -----------------------------------
  const [csvData, setCsvData] = useState(null)

  const handleGenerateCSV = () => {
    const requestDataCSV = {
      faculty: requestData.faculty,
      start_date: requestData.start_date,
      end_date: requestData.end_date
    }

    const fetchData = async () => {
      try {
        const response = await axios.post('https://books-opening.gl.at.ply.gg:61345/api/v1/weightScale/record/generateCSV', requestDataCSV);
        setCsvData(response.data);
        console.log('Request data: ', requestDataCSV)
        console.log('Response get csv data: ', response.data)        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  };

  useEffect(() => {
    if (requestData != null && csvData != null){
      const jsonA = requestData
      const jsonB = csvData
      ExportToCSV(jsonA, jsonB, profileWaste)
    }
  }, [csvData]);  

  return (
    <div className={classes.container}>
      <p className={classes.title}>รายละเอียดข้อมูลขยะ</p>

      <div className={classes.containerDropdown}>
        {constantProfileWaste !== null ? (
          <Multiselect
            className={classes.dropdown}
            displayValue="key"
            hideSelectedList
            onKeyPressFn={function noRefCheck(){}}
            onRemove={(e) => handleRemoveDropdown(e, 'profile_type')}
            onSelect={(e) => handleSelectDropdown(e, 'profile_type')}
            options={constantProfileWaste}
            selectedValues={constantProfileWaste}
            placeholder="เลือกประเภทของขยะ"
            style={customStyleDropdown}
            avoidHighlightFirstOption
            showArrow
            showCheckbox
          />
        ) : (
          <Multiselect
            className={classes.dropdown}
            displayValue="key"
            hideSelectedList
            onKeyPressFn={function noRefCheck(){}}
            placeholder="เลือกประเภทของขยะ"
            style={customStyleDropdown}
            avoidHighlightFirstOption
            showArrow
            showCheckbox
          /> 
        )}

      {constantFaculty !== null ? (
        <Multiselect className={classes.dropdown}
          displayValue="key"
          hideSelectedList
          onKeyPressFn={function noRefCheck(){}}
          onRemove={(e) => handleRemoveDropdown(e, 'faculty_type')}
          onSelect={(e) => handleSelectDropdown(e, 'faculty_type')}
          options={constantFaculty}
          selectedValues={constantFaculty}
          placeholder="เลือกสถานที่ตั้งของเครื่อง"
          style={customStyleDropdown}
          avoidHighlightFirstOption
          showArrow
          showCheckbox
        />
      ) : (
        <Multiselect className={classes.dropdown}
          displayValue="key"
          hideSelectedList
          onKeyPressFn={function noRefCheck(){}}
          placeholder="เลือกสถานที่ตั้งของเครื่อง"
          style={customStyleDropdown}
          avoidHighlightFirstOption
          showArrow
          showCheckbox
        />
      )}
      
        <div className={classes.containerDateRange} ref={dateRangeRef}>
          <img className={classes.calendarIcon} onClick={handleClickDateRange} src={calendarIcon} alt='icon' width='22px' height='22px'/>
          <span className={classes.calendarSpan} onClick={handleClickDateRange}>
            {`${format(date.startDate, 'dd/MM/yyyy')}`} - {`${format(date.endDate, 'dd/MM/yyyy')}`}
          </span>
          {openDate && <DateRange className={classes.dateRange} 
            ranges={[date]}
            onChange={handleChangeDateRange}
            minDate={minDate}
            maxDate={new Date()}
          />}
        </div>

        <div className={classes.csvBtn} onClick={handleGenerateCSV}>Export CSV</div>
      </div>

      <div className={classes.containerTotalWaste}>
        <div className={classes.backgroundTotalWaste}>
          <p className={classes.totalWasteText}>ปริมาณขยะทั้งหมด (กิโลกรัม)</p>
          <p className={classes.totalWaste}>{totalWaste}</p>
        </div>
        <div className={classes.backgroundTotalCarbon}>
          <p className={classes.totalCarbonText}>ปริมาณ Carbon footprint ทั้งหมด</p>
          <p className={classes.totalCarbon}>{totalCarbon}</p>
        </div>
      </div>

      <div className={classes.containerBarGraph}>
        <div className={classes.backgroundBarGraphWaste}>
          <p className={classes.barGraphWasteText}>ปริมาณขยะแต่ละประเภท</p>
          <div className={classes.barGraphWaste}>
            <Bar
              label="ปริมาณขยะแต่ละประเภท"
              data={{
                labels: totalWasteDetail.map(detail => detail.profile),
                datasets: [{
                  label: "ปริมาณ (กิโลกรัม)",
                  data: totalWasteDetail.map(detail => detail.amount),
                  backgroundColor: "rgb(136, 150, 95)",
                  borderRadius: 5,
                }],
              }}
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: 'ปริมาณ (กิโลกรัม)',
                      font: {
                        size: 11,
                        family: 'Prompt'
                      }
                    }
                  }
                }
              }}
              plugins={[{
                id: 'datalabels',
                afterDraw(chart) {
                  const ctx = chart.ctx;
            
                  chart.data.datasets.forEach((dataset, i) => {
                    const meta = chart.getDatasetMeta(i);
                    if (!meta.hidden) {
                      meta.data.forEach((element, index) => {
                        // Draw the text
                        ctx.fillStyle = 'rgb(75, 84, 47)';
            
                        const fontSize = 10.5;
                        const fontStyle = 'Prompt';
                        const font = `${fontSize}px ${fontStyle}`;
                        ctx.font = font;
            
                        const dataString = dataset.data[index].toString();
                        const textWidth = ctx.measureText(dataString).width;
            
                        // Center the text
                        const position = element.tooltipPosition();
                        ctx.fillText(dataString, position.x - (textWidth / 2), position.y - fontSize / 2);
                      });
                    }
                  });
                }
              }]}
            />
          </div>
        </div>
        <div className={classes.backgroundBarGraphCarbon}>
          <p className={classes.barGraphCarbonText}>ปริมาณ Carbon Footprint ของขยะแต่ละประเภท</p>
          <div className={classes.barGraphWaste}>
            <Bar
              label="ปริมาณขยะแต่ละประเภท"
              data={{
                labels: totalCarbonDetail.map(detail => detail.profile),
                datasets: [{
                  label: "ปริมาณ (kgCO2e)",
                  data: totalCarbonDetail.map(detail => detail.amount),
                  backgroundColor: "rgb(166, 157, 78)",
                  borderRadius: 5,
                }],
              }}
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: 'ปริมาณ (kgCO2e)',
                      font: {
                        size: 11,
                        family: 'Prompt'
                      }
                    }
                  }
                }
              }}
              plugins={[{
                id: 'datalabels',
                afterDraw(chart) {
                  const ctx = chart.ctx;
            
                  chart.data.datasets.forEach((dataset, i) => {
                    const meta = chart.getDatasetMeta(i);
                    if (!meta.hidden) {
                      meta.data.forEach((element, index) => {
                        // Draw the text
                        ctx.fillStyle = 'rgb(87, 82, 42)';
            
                        const fontSize = 10.5;
                        const fontStyle = 'Prompt';
                        const font = `${fontSize}px ${fontStyle}`;
                        ctx.font = font;
            
                        const dataString = dataset.data[index].toString();
                        const textWidth = ctx.measureText(dataString).width;
            
                        // Center the text
                        const position = element.tooltipPosition();
                        ctx.fillText(dataString, position.x - (textWidth / 2), position.y - fontSize / 2);
                      });
                    }
                  });
                }
              }]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;