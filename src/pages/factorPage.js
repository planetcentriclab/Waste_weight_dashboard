import classes from './css/FactorPage.module.css'
import { useState, useEffect, useRef } from 'react';
import ModalAccept from '../components/ModalAcceptFactor';
import axios from 'axios';

function FactorPage() {
    const [factors, setFactors] = useState(null); 
    const [constantFactors, setConstantFactors] = useState(null); 
    const [changeFactors, setChangeFactors] = useState(null); 
    const [initialPlaceholders, setInitialPlaceholders] = useState(null);
    const [placeholders, setPlaceholders] = useState(null);

    const [isOpenModal, setIsOpenModal] = useState(false);

    useEffect(() => { 
        const fetchData = async () => {
          try {
            const response = await axios.get('https://books-opening.gl.at.ply.gg:61345/api/v1/weightScale/profile_of_waste/carbonFactor');
            setFactors(response.data); 
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchData();
        const interval = setInterval(fetchData, 30000); 

        // Clean up the interval to prevent memory leaks
        return () => {
        clearInterval(interval);
        }
      }, [])

    const handleInputChange = (index, event) => {
        const newValue = event.target.value;
        if (!isNaN(newValue) || newValue === '') {
            const newChangeFactors = [...changeFactors];
            newChangeFactors[index] = { ...newChangeFactors[index], carbon_factor: newValue };
            setChangeFactors(newChangeFactors);
            setPlaceholders(newChangeFactors.map(factor => factor.carbon_factor));
        }
    };

    const handleSave = () => {
        console.log('Edit factors:', changeFactors);

        axios.put('https://books-opening.gl.at.ply.gg:61345/api/v1/weightScale/profile_of_waste/carbonFactor/edit', changeFactors)
        .then(response => {
          console.log('Edit request successful:', response.data);
          const inputs = document.querySelectorAll('input[type="text"]');
          inputs.forEach((input, index) => {
              input.value = '';
              input.placeholder = placeholders[index];
          });
          setIsOpenModal(true);
        })
        .catch(error => {
          console.error('Error making edit request:', error);
        });

        const fetchData = async () => {
            try {
                // Wait for 20 seconds before fetching data
                await new Promise(resolve => setTimeout(resolve, 5000));
        
                const response = await axios.get('https://books-opening.gl.at.ply.gg:61345/api/v1/weightScale/profile_of_waste/carbonFactor');
                setFactors(response.data); 
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
        
    };

    useEffect(() => {
        if (factors !== null && factors !== constantFactors){
            setConstantFactors(factors); 
            setChangeFactors(factors);
            setInitialPlaceholders(factors.map(factor => factor.carbon_factor));
            setPlaceholders(factors.map(factor => factor.carbon_factor));
        };
    }, [factors]);  

    const handleCancel = () => {
        setChangeFactors(constantFactors);
        const inputs = document.querySelectorAll('input[type="text"]');
        inputs.forEach((input, index) => {
            input.value = '';
            input.placeholder = initialPlaceholders[index];
        });
    };

    const closeModal = () => {
        setIsOpenModal(false);
    };

    return (
        <div className={classes.container}>
        <p className={classes.title}>การตั้งค่า Emission Factor</p>

        <div className={classes.containerTable}>
            <div className={classes.backgroundContainerTable}>
                <div className={classes.allFactorDetail}>
                    {!changeFactors && 
                        <p className={classes.waitingText}>กรุณารอการเชื่อมต่อกับ Server</p>
                    }
                    {changeFactors && 
                        <div>
                            <div className={classes.factorContainer}>
                                {changeFactors.map((factor, index) => (
                                    <div key={index} className={classes.factorInput}>
                                        <label htmlFor={`carbon-factor-${index}`}>{factor.waste_profile_thai}</label>
                                        <input
                                            className={classes.input}
                                            id={`carbon-factor-${index}`}
                                            type="text"
                                            placeholder={initialPlaceholders && initialPlaceholders[index]}
                                            onChange={(e) => handleInputChange(index, e)}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className={classes.buttonContainer}>
                                <div className={classes.cancelBtn} onClick={handleCancel}>ยกเลิก</div>
                                <div className={classes.editBtn} onClick={handleSave}>ตกลง</div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
        {isOpenModal && (
            <ModalAccept onClose={closeModal} />
        )}
        </div>
    );
}

export default FactorPage;