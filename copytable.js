/**
  * Copies a table into the clipboard.
  * This allows pasting the table into Microsoft Excel.
  *
  * @param tbl The DOM table object, you can get it via document.getElementById() or similar functions.
  * @return Return TRUE on success, otherwise FALSE.
  */
function copyTableIntoClipboard(tbl) {
    if (!tbl) {
		return false;
	}
	
	var str = "";

    for (var y=0, rowsLen=tbl.rows.length; y<rowsLen; y++) {
        var row = tbl.rows[y];

        for (var x=0, cellsLen=row.cells.length; x<cellsLen; x++) {
            var content = row.cells[x].innerText;
            
            str += content;
            
            if (x != cellsLen-1) {
                str += "\t";
            }
        }
        
        if (y != rowsLen-1) {
            str += "\n";
        }
    }
    return window.clipboardData.setData("Text", str);
}