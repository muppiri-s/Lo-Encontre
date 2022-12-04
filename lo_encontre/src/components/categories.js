import React from "react";

//fix shades
var boxes = document.querySelectorAll('#boxes > div');
[].forEach.call(boxes, box => {
  box.addEventListener('mousemove', e => {
    document.body.style.setProperty(
      '--bg-color',
      box.style.getPropertyValue('color')
    );

    var size = parseInt(getComputedStyle(box).width);

    // scaling
    var x = size * .3 * .7 + .7 * e.offsetX;
    var y = size * .3 * .7 + .7 * e.offsetY;

    box.style.setProperty('--x', x);
    box.style.setProperty('--y', y);
    box.style.setProperty('--size', size);
  });
});

function Categories() {
    return (
        <div id="boxes">
            <div style={{color: 'f44336'}}>Winter</div>
            <div style={{color: 'e91e63'}}>Electronics</div>
            <div style={{color: '9c27b0'}}>Home</div>
            <div style={{color: '2196f3'}}>Apparel</div>
            <div style={{color: '4caf50'}}>Garden</div>
            <div style={{color: 'ff9800'}}>Office</div>
            <div style={{color: 'a7678d'}}>Hardware</div>
            <div style={{color: '8167a7'}}>Kitchen</div>
            <div style={{color: '8da767'}}>Tools</div>
        </div>
    );
}

export default Categories;

