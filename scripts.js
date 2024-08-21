// Replace 'YOUR_API_KEY' with your actual API key
const API_KEY = 'BdxWmmr8P1gwjtHeirJDcnoL';

// Function to handle image upload and background removal
async function removeBackground(imageFile) {
  const formData = new FormData();
  formData.append('image_file', imageFile);
  formData.append('size', 'auto'); // Optional: You can set the size parameter

  const response = await fetch('https://api.remove.bg/v1.0/removebg', {
    method: 'POST',
    headers: {
      'X-Api-Key': API_KEY,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to remove background');
  }

  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  return url;
}

// Function to hide all cards
function hideAllCards() {
  document.getElementById('addCard').style.display = 'none';
  document.getElementById('displayCard').style.display = 'none';
  document.getElementById('loadingCard').style.display = 'none';
  document.getElementById('downloadCard').style.display = 'none';
}

// Show Add Card
function showAddCard() {
  hideAllCards();
  document.getElementById('addCard').style.display = 'flex';
}

// Show Display Card
function showDisplayCard() {
  hideAllCards();
  document.getElementById('displayCard').style.display = 'flex';
}

// Show Loading Card
function showLoadingCard() {
  hideAllCards();
  document.getElementById('loadingCard').style.display = 'flex';
}

// Show Download Card with the image URL
function showDownloadCard(imageUrl) {
  hideAllCards();
  document.getElementById('downloadCard').style.display = 'flex';
  const downloadHref = document.getElementById('downloadHref');
  downloadHref.href = imageUrl;
  downloadHref.download = 'transparentImage.png'; // Change the name as needed
}

// Event listeners or function calls to control which card is displayed
document.getElementById('fileInput').addEventListener('change', async function() {
  const file = this.files[0];
  if (file) {
    showDisplayCard();
    try {
      showLoadingCard();
      const imageUrl = await removeBackground(file);
      showDownloadCard(imageUrl);
    } catch (error) {
      console.error('Error removing background:', error);
      showAddCard(); // Optionally show the upload card again on error
    }
  }
});

document.getElementById('startBtn').addEventListener('click', function() {
  showLoadingCard();
  
  // Simulate a delay for the loading card
  setTimeout(() => {
    // Ideally, this should be removed as the image processing is handled in the fileInput event
    // showDownloadCard();
  }, 3000); // Adjust the timeout as needed
});

document.getElementById('uploadAnother').addEventListener('click', function() {
  showAddCard();
});

// Initial display
showAddCard();
