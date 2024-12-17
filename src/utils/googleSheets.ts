import axios from 'axios';

const SPREADSHEET_ID = '1sCKLK11AdbdO53x5qWPbvwgShQOJxGG5P3ORYdTgKr0';
const SHEET_NAME = 'Users';

export const saveUserToSheet = async (userData: any) => {
  try {
    // Get API key from localStorage
    const apiKey = localStorage.getItem('GOOGLE_SHEETS_API_KEY');
    
    if (!apiKey || apiKey === 'YOUR_API_KEY_HERE') {
      throw new Error('Please set a valid Google Sheets API key');
    }

    // Prepare the values to be inserted
    const values = [
      [
        userData.firstName,
        userData.lastName,
        userData.email,
        userData.username,
        userData.mobile,
        new Date().toISOString()
      ]
    ];

    // Use the Google Sheets REST API directly
    const response = await axios.post(
      `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}!A:F:append`,
      {
        values: values,
        majorDimension: "ROWS"
      },
      {
        params: {
          valueInputOption: 'RAW',
          key: apiKey,
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error saving to Google Sheets:', error);
    throw error;
  }
};