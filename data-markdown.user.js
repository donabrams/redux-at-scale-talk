// ==UserScript==
// @name Use Markdown, sometimes, in your HTML.
// @author Paul Irish <http://paulirish.com/>
// @link http://git.io/data-markdown
// @match *
// ==/UserScript==


// If you're not using this as a userscript just delete from this line up. It's cool, homey.

var guard = false;
(function boom(){
  
  if (!guard && !window.Showdown){
  	guard = true;
    var scr = document.createElement('script');
    scr.onload = boom;
    scr.src = 'showdown.min.js';
    document.body.appendChild(scr);
    return;
  }

  [].forEach.call( document.querySelectorAll('[data-markdown]'), function  fn(elem){
    // strip leading whitespace so it isn't evaluated as code
    var text      = elem.innerHTML.replace(/\n\s*\n/g,'\n'),
        // set indentation level so your markdown can be indented within your HTML
        leadingws = text.match(/^\n?(\s*)/)[1].length,
        regex     = new RegExp('\\n?\\s{' + leadingws + '}','g'),
        md        = text.replace(regex,'\n');
    console.log(md)
    var html      = (new showdown.Converter()).makeHtml(md);

    // here, have sum HTML
    elem.innerHTML = html;

  });

}());