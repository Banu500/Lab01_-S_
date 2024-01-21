const fs = require('fs');
const csv = require('csv-parser');

// Delete canada.txt and usa.txt if they already exist
fs.unlinkSync('canada.txt', (err) => {
  if (err) throw err;
  console.log('Existing canada.txt deleted.');
});

fs.unlinkSync('usa.txt', (err) => {
  if (err) throw err;
  console.log('Existing usa.txt deleted.');
});

// Read and filter data from input_countries.csv
fs.createReadStream('input_countries.csv')
  .pipe(csv())
  .on('data', (row) => {
    // Filter data for Canada
    if (row.Country === 'Canada') {
      fs.appendFileSync('canada.txt', `${JSON.stringify(row)}\n`);
    }

    // Filter data for United States
    if (row.Country === 'United States') {
      fs.appendFileSync('usa.txt', `${JSON.stringify(row)}\n`);
    }
  })
  .on('end', () => {
    console.log('Data filtered and written to canada.txt and usa.txt.');
  });
