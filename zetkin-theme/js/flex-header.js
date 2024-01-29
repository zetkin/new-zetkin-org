function adjustFontSize() {
   // Select all elements with the class '.zetkin_flexHeader'
   var containers = document.querySelectorAll('.zetkin_flexHeader');
   
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
