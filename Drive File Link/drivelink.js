//Read ReadMe for Instructions
function myFunction() {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var s = ss.getActiveSheet();
    var c = s.getActiveCell();
    
    // Replace with your folder ID
    var fldr = DriveApp.getFolderById("REPLACE_[ID]_HERE");
    var files = fldr.getFiles();
    
    var names = [];
    
    // Loop through files in the folder
    while (files.hasNext()) {
        var f = files.next();
        
        // Create the hyperlink formula
        var str = '=HYPERLINK("' + f.getUrl() + '", "' + f.getName() + '")';
        
        // Add to the names array
        names.push([str]);
    }
    
    // Set formulas in the sheet, starting from the active cell
    s.getRange(c.getRow(), c.getColumn(), names.length).setFormulas(names);
}