const generateCSV = (jsonA, jsonB, profileWaste) => {
    const facultyList = jsonA.faculty.join('; '); 
    const startDate = jsonA.start_date;
    const endDate = jsonA.end_date;
    const profiles = profileWaste.map(profile => profile.waste_profile_thai);

    const csvRows = [
        ['Faculty', facultyList],
        ['Start date', startDate],
        ['End date', endDate],
        [],
        ['Amount Profile waste (kg)', profiles]
    ];

    console.log(jsonB)
    // Converting rows to CSV format
    for (const [date, items] of Object.entries(jsonB)) {
        const row = [date];
        for (const profile of profiles) {
          const item = items.find(i => i.profile === profile);
          row.push(item ? item.amount : 0);
        }
        csvRows.push(row);
    }

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

const ExportToCSV = (jsonA, jsonB, profileWaste) => {
    const csvContent = generateCSV(jsonA, jsonB, profileWaste);
    const startDate = jsonA.start_date;
    const endDate = jsonA.end_date;
    const filename = `รายการจากเครื่องชั่งน้ำหนักขยะ_${startDate}_${endDate}.csv`;
    downloadCSV(csvContent, filename);
    console.log("Generate CSV successfully")
};

export default ExportToCSV;