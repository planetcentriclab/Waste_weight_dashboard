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

ChartJS.defaults.maintainAspectRatio = false;
ChartJS.defaults.responsive = true;
ChartJS.defaults.font.size = 10.5;
ChartJS.defaults.layout.padding = 13;
ChartJS.defaults.plugins.legend.display = false;
ChartJS.defaults.font.family = 'Prompt';

function HomePage() {

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

  const [faculty, setFaculty] = useState([
                                          { cat: 'Group 1', key: 'สถาบันวิทยาการหุ่นยนต์ภาคสนาม'},
                                          { cat: 'Group 2', key: 'คณะวิศวกรรมศาสตร์'},
                                        ])                             

  const handleRemoveDropdown = (e, type_multiselect) => {
    console.log(e);
  }

  const handleSelectDropdown = (e, type_multiselect) => {
    console.log(e);
  }

  const customStyleDropdown = {
    searchBox: {
      width: 300,
      border: '1px solid #1A3D19',
    }
  }

  // ----------------------------------- DateRange constant -----------------------------------
  const [date, setDate] = useState({ startDate: new Date(), endDate: new Date(), key: 'selection'})
  const [openDate, setOpenDate] = useState(false)
  const minDate = new Date(2024, 1, 1, 0, 0, 0); 

  const handleClickDateRange = () => {setOpenDate((prev) => !prev)};
  const handleChangeDateRange = (ranges) => {
    setDate(ranges.selection)
    console.log(ranges.selection)
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
    const initialStartDate = minDate; 
    const initialEndDate = new Date();  

    setDate({
      ...date,
      startDate: initialStartDate,
      endDate: initialEndDate
    });
  }, []);


  // ----------------------------------- TotalWaste constant -----------------------------------
  const [totalWaste, setTotalWaste] = useState(10000)
  const [totalCarbon, setTotalCarbon] = useState(10000)

  const [totalWasteDetail, setTotalWasteDetail] = useState([
                                                                { profile: 'กระป๋อง', amount: 100},
                                                                { profile: 'แก้ว', amount: 0},
                                                                { profile: 'กระดาษ', amount: 50},
                                                                { profile: 'กล่องนม', amount: 1000},
                                                                { profile: 'ขวดพลาสติก', amount: 30},
                                                                { profile: 'หลอดพลาสติก', amount: 550},
                                                                { profile: 'แก้วน้ำพลาสติก (ขายได้)', amount: 320},
                                                                { profile: 'แก้วน้ำพลาสติก (ขายไม่ได้)', amount: 200},
                                                                { profile: 'ช้อน - ส้อมพลาสติก', amount: 800},
                                                                { profile: 'ถุงพลาสติก', amount: 1200},
                                                                { profile: 'ถุงวิบวับ', amount: 200},
                                                                { profile: 'กล่องอาหารพลาสติก', amount: 40},
                                                                { profile: 'เศษอาหาร', amount: 2000},
                                                                { profile: 'ขยะอันตราย', amount: 10},
                                                                { profile: 'ขยะห้องน้ำ', amount: 780},
                                                                { profile: 'ขยะกำพร้า', amount: 800},
                                                                { profile: 'ขยะทั่วไป', amount: 1100},
                                                              ])     

  const [totalCarbonDetail, setTotalCarbonDetail] = useState([
                                                                { profile: 'กระป๋อง', amount: 100},
                                                                { profile: 'แก้ว', amount: 0},
                                                                { profile: 'กระดาษ', amount: 50},
                                                                { profile: 'กล่องนม', amount: 1000},
                                                                { profile: 'ขวดพลาสติก', amount: 30},
                                                                { profile: 'หลอดพลาสติก', amount: 550},
                                                                { profile: 'แก้วน้ำพลาสติก (ขายได้)', amount: 320},
                                                                { profile: 'แก้วน้ำพลาสติก (ขายไม่ได้)', amount: 200},
                                                                { profile: 'ช้อน - ส้อมพลาสติก', amount: 800},
                                                                { profile: 'ถุงพลาสติก', amount: 1200},
                                                                { profile: 'ถุงวิบวับ', amount: 200},
                                                                { profile: 'กล่องอาหารพลาสติก', amount: 40},
                                                                { profile: 'เศษอาหาร', amount: 2000},
                                                                { profile: 'ขยะอันตราย', amount: 10},
                                                                { profile: 'ขยะห้องน้ำ', amount: 780},
                                                                { profile: 'ขยะกำพร้า', amount: 800},
                                                                { profile: 'ขยะทั่วไป', amount: 1100},
                                                              ])     

  return (
    <div className={classes.container}>
      <p className={classes.title}>รายละเอียดข้อมูลขยะ</p>

      <div className={classes.containerDropdown}>
        <Multiselect className={classes.dropdown}
          displayValue="key"
          hideSelectedList
          onKeyPressFn={function noRefCheck(){}}
          onRemove={(e) => handleRemoveDropdown(e, 'profile_type')}
          onSelect={(e) => handleSelectDropdown(e, 'profile_type')}
          options={profile}
          selectedValues={profile}
          placeholder="เลือกประเภทของขยะ"
          style={customStyleDropdown}
          avoidHighlightFirstOption
          showArrow
          showCheckbox
        />
        <Multiselect className={classes.dropdown}
          displayValue="key"
          hideSelectedList
          onKeyPressFn={function noRefCheck(){}}
          onRemove={(e) => handleRemoveDropdown(e, 'faculty_type')}
          onSelect={(e) => handleSelectDropdown(e, 'faculty_type')}
          options={faculty}
          selectedValues={faculty}
          placeholder="เลือกสถานที่ตั้งของเครื่อง"
          style={customStyleDropdown}
          avoidHighlightFirstOption
          showArrow
          showCheckbox
        />
      
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
                  label: "ปริมาณ (กิโลกรัม)",
                  data: totalCarbonDetail.map(detail => detail.amount),
                  backgroundColor: "rgb(166, 157, 78)",
                  borderRadius: 5,
                }],
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