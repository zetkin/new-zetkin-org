console.log('file found');

function adjustFontSize() {
   console.log('function called');
   // Select all elements with the class '.zetkin_flexHeader'
   var containers = document.querySelectorAll('.zetkin_flexHeader p');
   
   // Iterate over each element
   containers.forEach(function(container) {
       var fontSize = container.offsetWidth * 0.075; // Calculate font size as 5% of container's width
       container.style.fontSize = fontSize + 'px'; // Set the calculated font size
   });
}

// Initial adjustment for all elements
adjustFontSize();

// Re-adjust for all elements on window resize
window.addEventListener('resize', adjustFontSize);

wp.domReady(function () {
   adjustFontSize(); // Initial call on DOM ready

   // Use MutationObserver to observe changes in the Gutenberg editor
   var observer = new MutationObserver(function(mutations) {
       mutations.forEach(function(mutation) {
           if (mutation.type === 'childList' || mutation.type === 'attributes') {
               adjustFontSize(); // Re-apply adjustments when changes are detected
           }
       });
   });

   // Specify what to observe
   var config = {
       childList: true,
       subtree: true,
       attributes: true
   };

   // Target the editor's main container for observing
   var editorContainer = document.querySelector('.block-editor-block-list__layout');
   if (editorContainer) {
       observer.observe(editorContainer, config);
   }
});


