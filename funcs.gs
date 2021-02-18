function addNewRow(rowData) {
  
    const currentDate = new Date();

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const ws2 = ss.getSheetByName("otherlinks");
    Logger.log(rowData.vidTitle);
    ws2.appendRow([rowData.vidLink,rowData.vidTitle,currentDate]);
  
}
