function adjustStyle() {
    console.log('adjustStyle function triggered');
    let linkElements = document.getElementsByTagName('link');
    let button = document.getElementById('dyslexiaButton');

    for (let i = 0; i < linkElements.length; i++) {
        console.log(linkElements[i].getAttribute('href'));
        if (linkElements[i].getAttribute('href') !== null && linkElements[i].getAttribute('href').endsWith('scripts/style.css'))
        {
            console.log('change to dyslexia style');
            linkElements[i].setAttribute('href', '../scripts/style_dyslexia.css');
            button.innerHTML = 'Regular display';
        } else if (linkElements[i].getAttribute('href') !== null && linkElements[i].getAttribute('href').endsWith('scripts/style_dyslexia.css')) {
            console.log('change to regular style');
            linkElements[i].setAttribute('href', '../scripts/style.css');
        button.innerHTML = 'Dyslexia-friendly display';
        }
    }
}
function adjustForDyslexia() {
    let button = document.createElement('button');
    button.className = 'dyslexiaButton';
    button.id = 'dyslexiaButton';
    button.innerHTML = 'Dyslexia-friendly display';
    document.body.appendChild(button);
    button.addEventListener('click', function() {
        adjustStyle();
        });
        let observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                adjustStyle();
            }
        });
    });
    observer.observe(document.head, { childList: true });
}



