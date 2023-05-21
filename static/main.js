var colorPalette = ['red', 'green', 'purple', 'black', 'orange', 'yellow', 'maroon', 'grey', 'lightblue', 'tomato', 'pink', 'maroon', 'cyan', 'magenta', 'blue', 'chocolate', 'darkslateblue', 'coral', 'blueviolet', 'burlywood', 'cornflowerblue', 'crimson', 'darkgoldenrod', 'olive', 'sienna', 'red'];

async function onFormSubmitted(e) {
    e.preventDefault();

    const form = document.querySelector('#main-form');
    const query = form.elements.inputs.value;
    // TBD - use Axios instead of fetch ?
    fetch("/words", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
            query
        })
    })
        .then((res => res.json()))
        .then(async data => {
            console.log(data);
             loadFont(data.fontName);
            const maxSideLength = Math.ceil(Math.max(form.clientHeight, form.clientWidth));
            setupWordElements(data, maxSideLength * 1.1, 'main')
        })
}

function loadFont(fontName){
    if (!document.getElementById(fontName)) {
      var head = document.getElementsByTagName('head')[0];
      var link = document.createElement('link');
      link.id = fontName;
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.href = 'http://fonts.googleapis.com/css?family=' + fontName;
      link.media = 'all';
      head.appendChild(link);
    }
}

function setupWordElements(data, radius, id) {
    var main = document.getElementById(id);
    const { words, colors, fontName } = data;
    setColorsPalette(colors);
    main.innerHTML = ""; // reset any existing elements inside main component
    const caruselElement = getCaruselElement(main, 50);
    main.appendChild(caruselElement);
    
    const totalAnimationIterationMs = 12000;
    let step = totalAnimationIterationMs / words.length;
    let delay = 0;
    for (var i = 0; i < words.length - 1; i++) {
        const wordElement = createWordElement(words[i], fontName);
        addWordAnimation(wordElement, delay + (step*i));
        caruselElement.appendChild(wordElement)
    }
};

function getWords(req, res) {
    //res.send('["one", "two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve"]');
    res.send('{ "words": ["frightening", "scary", "creepy", "spooky", "fearsome", "macabre", "terrifying", "dreadful"], "colors": ["#000000", "#9b0502", "#3e1006", "#f2f2f2", "#f7f7f7" ], "fontName": "Nosifer" }');
    //res.send('{ "words": ["frightening", "scary"], "colors": ["#000000", "#9b0502", "#3e1006", "#f2f2f2", "#f7f7f7" ], "fontName": "Nosifer" }');
}

function getCaruselElement(mainElement, padding) {
    const caruselElement = document.createElement('div');
    
    caruselElement.id = 'carousel';
    caruselElement.style.width = mainElement.clientWidth + 'px';
    caruselElement.style.height = mainElement.clientHeight + 'px';
    caruselElement.style.padding = padding + 'px';
    caruselElement.style.position = 'relative';
    caruselElement.style.borderRadius = '50%';
    //caruselElement.style.border = '1px solid white';
    caruselElement.style.marginTop = '-' + padding + 'px';
    caruselElement.style.marginLeft = '-' + padding + 'px';

    return caruselElement;
}

// Static function to obtain a new Color for each word
var getColor = () => {
    if (typeof getColor.idx == 'undefined') {
        // If has not... perform the initialization
        getColor.idx = 0;
    }
    getColor.idx = (getColor.idx + 1) % colorPalette.length;

    return colorPalette[getColor.idx];
}

function setColorsPalette(newPalette){
    if (!newPalette || newPalette.length <= 0)
    return;

    colorPalette = newPalette;
}

function addWordAnimation(wordElement, delayMs){
    wordElement.style.animationDelay = '-' + delayMs + 'ms';
}

function createWordElement(text, fontName) {
    var wordElement = document.createElement('div');
    wordElement.innerHTML = text;
    wordElement.style.color = getColor();
    wordElement.style.fontFamily = fontName;
    wordElement.className = 'floatingWord';

    wordElement.addEventListener("click", function() {
        navigator.clipboard.writeText(text)
    });

    return wordElement;
}

export { onFormSubmitted, getWords } 