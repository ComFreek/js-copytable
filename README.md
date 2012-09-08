## Welcome to js-copytable

### What?
Ever wanted to directly copy a table on a website to a Microsoft Excel Worksheet?
Just use js-copytable!

![Copying into Microsoft Exel](http://i.imgur.com/eWCTi.png)

### How?
Embed these two files in your HTML document:

    <script src="ZeroClipboard.min.js"></script>
    <script src="copytable.js"></script>

Then, create your button (with an optional, but recommend container) and your table:

    <div id="container">
      <button id="btn">Copy</button>
    </div>
    <table id="tbl">
      <!-- ... -->
    </table>

And finally the actual script which initiates js-copytable:

    window.onload = function () {
      copyTable.simpleInit({
        button: document.getElementById("btn"),
        table: document.getElementById("tbl"),
        moviePath: "ZeroClipboard.swf",
        
        success: function (text) {
          alert("Successfully copied the table! The contents were:\n\n"+text);
        },
    
        accessDenied: function () {
          alert("You have denied access in Internet Explorer!");
        }
      });
    };

Be sure to upload _ZeroClipboard.swf_ to your server too! It's a "fallback" for other browsers than IE.

### Browser Support?!
* IE 6+
* All other browsers with Flash enabled


### Contact?
Email: **comfreek** | **outlook** | **com** <br />
Twitter: [@ComFreek](http://twitter.com/comfreek)

### Thanks To....
* js-copytable uses [ZeroClipboard](https://github.com/jonrohan/ZeroClipboard) as a "fallback" for other browsers than IE which do not support clipboard access.