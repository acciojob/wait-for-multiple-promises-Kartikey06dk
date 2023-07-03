// Function to generate a random delay between 1 and 3 seconds
function getRandomDelay() {
  return Math.floor(Math.random() * 3000) + 1000; // Random number between 1000 and 3000 (inclusive)
}

// Create an array of 3 Promises with random delays
const promises = Array.from({ length: 3 }, (_, index) => {
  return new Promise((resolve) => {
    const delay = getRandomDelay();
    setTimeout(() => {
      resolve(delay);
    }, delay);
  });
});

// Create a table element
const table = document.createElement('table');

// Add a row with "Loading..." text spanning 2 columns
const loadingRow = document.createElement('tr');
const loadingCell = document.createElement('td');
loadingCell.setAttribute('colspan', '2');
loadingCell.textContent = 'Loading...';
loadingRow.appendChild(loadingCell);
table.appendChild(loadingRow);

// Append the table to the document body
document.body.appendChild(table);

// Wait for all the promises to resolve
Promise.all(promises)
  .then((results) => {
    // Remove the loading row
    table.removeChild(loadingRow);

    // Add rows with the resolved promises and their respective delays
    results.forEach((delay, index) => {
      const row = document.createElement('tr');

      // Add first column as "Promise {index + 1}"
      const firstColumn = document.createElement('td');
      firstColumn.textContent = `Promise ${index + 1}`;
      row.appendChild(firstColumn);

      // Add second column as the resolved delay in seconds
      const secondColumn = document.createElement('td');
      const delayInSeconds = delay / 1000;
      secondColumn.textContent = delayInSeconds.toFixed(3); // Limit to 3 decimal places
      row.appendChild(secondColumn);

      table.appendChild(row);
    });

    // Calculate and add the total row
    const totalRow = document.createElement('tr');

    // Add first column as "Total"
    const totalFirstColumn = document.createElement('td');
    totalFirstColumn.textContent = 'Total';
    totalRow.appendChild(totalFirstColumn);

    // Add second column as the total time taken to resolve all promises in seconds
    const totalTimeTaken = results.reduce((total, delay) => total + delay, 0) / 1000;
    const totalSecondColumn = document.createElement('td');
    totalSecondColumn.textContent = totalTimeTaken.toFixed(3); // Limit to 3 decimal places
    totalRow.appendChild(totalSecondColumn);

    table.appendChild(totalRow);
  })
  .catch((error) => {
    console.error('An error occurred:', error);
  });
