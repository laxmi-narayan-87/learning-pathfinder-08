import { google } from 'googleapis';

// The spreadsheet ID from your Google Sheets URL
const SPREADSHEET_ID = '1sCKLK11AdbdO53x5qWPbvwgShQOJxGG5P3ORYdTgKr0';
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

export const saveUserToSheet = async (userData: any) => {
  try {
    // Get API key from localStorage (you'll need to set this up in your app)
    const apiKey = localStorage.getItem('GOOGLE_SHEETS_API_KEY');
    
    if (!apiKey) {
      throw new Error('Google Sheets API key not found');
    }

    const sheets = google.sheets({ version: 'v4' });
    
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

    const request = {
      spreadsheetId: SPREADSHEET_ID,
      range: 'Users!A:F',  // Adjust based on your sheet's structure
      valueInputOption: 'RAW',
      resource: {
        values,
      },
      auth: apiKey,
    };

    const response = await sheets.spreadsheets.values.append(request);
    return response.data;
  } catch (error) {
    console.error('Error saving to Google Sheets:', error);
    throw error;
  }
};