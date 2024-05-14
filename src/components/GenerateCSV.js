const generateCSV = (jsonA, jsonB) => {
    const facultyList = jsonA.faculty.join('; '); 
    const startDate = jsonA.start_date;
    const endDate = jsonA.end_date;
    const totalAmountWaste = jsonB.total_waste_detail;
    const totalAmountCarbon = jsonB.total_carbon_detail; 

    const wasteDetails = jsonA.profile_waste.map((profile, index) => {

        const amountWasteDetail = jsonB.amount_waste_detail.find(item => item.profile === profile);
        const amountWaste = amountWasteDetail ? amountWasteDetail.amount : 0;

        const amountCarbonDetail = jsonB.amount_carbon_detail.find(item => item.profile === profile);
        const amountCarbon = amountCarbonDetail ? amountCarbonDetail.amount : 0;

        return { profile, amountWaste, amountCarbon };
    });

    const csvRows = [
        ['Faculty', facultyList],
        ['Start date', startDate],
        ['End date', endDate],
        ['Total amount (kg)', totalAmountWaste],
        ['Total amount of carbon footprint (kgCO2e)', totalAmountCarbon],
        [],
        ['Profile waste', 'Amount (kg)', 'Amount of carbon footprint (kgCO2e)']
    ];

    // Adding waste details to the CSV rows
    wasteDetails.forEach(detail => {
        csvRows.push([detail.profile, detail.amountWaste, detail.amountCarbon]);
    });

    // Converting rows to CSV format
    const csvContent = csvRows.map(row => row.join(',')).join('\n');
    return csvContent;
};

const downloadCSV = (csvContent, filename) => {
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', filename);
    a.click();
};

const ExportToCSV = (jsonA, jsonB) => {
    const csvContent = generateCSV(jsonA, jsonB);
    const startDate = jsonA.start_date;
    const endDate = jsonA.end_date;
    const filename = `รายการจากเครื่องชั่งน้ำหนักขยะ_${startDate}_${endDate}.csv`;
    downloadCSV(csvContent, filename);
};

export default ExportToCSV;