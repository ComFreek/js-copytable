/**
  * @license As not otherwise noted, all content is licensed unter the MIT license. See LICENSE file for more information!
	*/
(function (window) {
	"use strict";
	/**
  * Converts a table to a string.
  * This allows pasting the table into Microsoft Excel.
	*
	
	*
	* @param tbl The DOM table object, you can get it via document.getElementById() or similar functions.
	* @return Returns the generated string or FALSE if you have not passed a DOM object (i.e. tbl==null).
	*/
	function tableToStr(tbl) {
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
		return str;
	}
	
	/**
	  * Uses addEventListener on modern browsers or attachEvent on some older IE versions.
		* @author CMS from StackOverflow
		* @license http://creativecommons.org/licenses/by-sa/3.0/
		* @link http://stackoverflow.com/a/1695383/603003
		*/
	function bindEvent(el, eventName, eventHandler) {
		if (el.addEventListener){
			el.addEventListener(eventName, eventHandler, false); 
		} else if (el.attachEvent){
			el.attachEvent('on'+eventName, eventHandler);
		}
	}
	
	/**
	  * Links a button to a copy action of a table.
		* @param params
		*   - button : The button DOM object
		*   - buttonContainer [OPT:] : Optional (but recommend) button container with style="position: relative"
		*   - table : The table DOM object
		*   - moviePath [OPT.] : The path to the ZeroClipboard movie file.
		*                        It's only used when other browser than IE are
		*                        used or when you set forceSWF to TRUE.
		*   - forceSWF : Forces to use ZeroClipboard, even when under IE
		* 
		*   - success(copiedText) [OPT.] : The success event handler
		*   - accessDenied [OPT:] : The access denied event handler
		*
		* @return Returns FALSE if required parameters have not been passed.
		*/
	function simpleInit(params) {
		if (!params.table || !params.button) {
			return false;
		}
		
		if (!params.success) {
			params.success = function () {};
		}
		if (!params.accessDenied) {
			params.accessDenied = function () {};
		}

		if (window.clipboardData && !(params.forceSWF===true)) {
		
			bindEvent(params.button, "click", function () {
				var text = tableToStr(params.table);
				if (window.clipboardData.setData("Text", text)) {
					params.success(text);
				}
				else {
					params.accessDenied();
				}
			});
			
			return {
				client: null
			};
		}
		else {
			if (!params.moviePath) {
				return false;
			}
		
			var clip = new ZeroClipboard.Client();
			ZeroClipboard.setMoviePath(params.moviePath);
			clip.setHandCursor( true );
					
			clip.addEventListener('mouseOver', function (client) {
				// update the text on mouse over
				clip.setText( tableToStr(params.table) );
			});
			
			clip.addEventListener('complete', function (client, text) {
				params.success(text);
			});
			
			clip.glue( params.button, params.buttonContainer );
			
			return {
				client: clip
			};
		}
	}
	
	window.copyTable = {
		simpleInit: simpleInit,
		tableToStr: tableToStr
	};
})(window);