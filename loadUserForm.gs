function loadForm() {

        const htmlForSidebar = HtmlService.createTemplateFromFile("uform");
        const htmlOutput = htmlForSidebar.evaluate();

        const ui = SpreadsheetApp.getUi();
        htmlOutput.setTitle("YouTube Tools");
        ui.showSidebar(htmlOutput);
        
    
}

function onOpen() {
    var ui = SpreadsheetApp.getUi();
    // Or DocumentApp or FormApp.
    ui.createMenu('YouTube Tools')
        .addItem('Load Menu', 'loadForm')
        .addToUi();
  
  }
  
