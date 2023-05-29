export const exportJsonToCsv = (jsonData: any[]) => {
  const keys = Object.keys(jsonData[0]);
  const csvRows = [];
  csvRows.push(keys.join(','));

  jsonData.forEach(item => {
    const values = keys.map(key => {
      return item[key];
    });
    csvRows.push(values.join(','));
  });

  const csvData = csvRows.join('\n');

  const downloadLink = document.createElement('a');
  downloadLink.href =
    'data:text/csv;charset=utf-8,' + encodeURIComponent(csvData);
  downloadLink.download = 'datos.csv';

  downloadLink.click();
};
