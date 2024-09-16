let isDyslexiaStyleApplied = false;

function adjustStyle() {
    let linkElements = document.getElementsByTagName('link');
    let button = document.getElementById('dyslexiaButton');

    for (let i = 0; i < linkElements.length; i++) {
        if (linkElements[i].getAttribute('href').endsWith('scripts/style.css')) {
            linkElements[i].setAttribute('href', '../scripts/style_dyslexia.css');
            let newButton = button.cloneNode(true);
            newButton.innerHTML = 'Regular display';
            newButton.className = 'dyslexiaButton'
            // button.innerHTML = 'Regular display';
            // button.className = 'dyslexiaButton'
            newButton.addEventListener('click', function() {
                console.log('Button clicked')
                adjustStyle();
            });
            button.parentNode.replaceChild(newButton, button);
        } else if ((linkElements[i].getAttribute('href').endsWith('scripts/style_dyslexia.css'))) {
            linkElements[i].setAttribute('href', '../scripts/style.css');
            let newButton = button.cloneNode(true);
            newButton.innerHTML = 'Dyslexia-friendly display';
            newButton.className = 'dyslexiaButton'
            newButton.addEventListener('click', function() {
                console.log('Button clicked')
                adjustStyle();
            });
            button.parentNode.replaceChild(newButton, button);
            // button.innerHTML = 'dyslexia-friendly display'
            // button.className = 'dyslexiaButton'
            // button.parentNode.replaceChild(newButton, button);
        }
    }
}
function adjustForDyslexia() {
    let button = document.createElement('button');
    button.className = 'dyslexiaButton';
    document.body.appendChild(button);
    button.addEventListener('click', function() {
        console.log('Button clicked')
        adjustStyle();
    });
}


// function adjustForDyslexia() {
//     let button = document.createElement('button');
//     button.className = 'dyslexiaButton';
//     button.id = 'dyslexiaButton';
//     button.innerHTML = 'Dyslexia-friendly display';
//     // button.style.display = 'block';
//     button.style.position = 'fixed';
//     // button.style.right = '20px';
//     // button.style.top = '20px';
//     document.body.appendChild(button);
//     // button.addEventListener('click', function() {
//     //     console.log('Button clicked')
//     //     adjustStyle();
//     // });

// }


