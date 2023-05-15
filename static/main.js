function onFormSubmitted(e) {
    e.preventDefault();

    const form = document.querySelector('#main-form');
    const query = form.elements.inputs.value;
    // TBD - use Axios instead of fetch
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
        .then(data => {
            console.log(data)
            const maxSideLength = Math.ceil(Math.max(form.clientHeight, form.clientWidth));
            generateCircleElements(data, maxSideLength, 'main')
        })
}

function getWords(req, res) {
    res.send('["one", "two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve"]');
}

function generateCircleElements(data, radius, id) {
    const frags = 360 / data.length;
    let theta = [];
    for (var i = 0; i <= data.length; i++) {
        theta.push((frags / 180) * (data.length - i) * Math.PI);
    }
    setupCircleElements(data, theta, radius, id);
}

function setupCircleElements(data, theta, radius, id) {
    var main = document.getElementById(id);
    main.innerHTML = ""; // reset any existing elements inside main component
    const mainHeight = parseInt(window.getComputedStyle(main).height.slice(0, -2));
    //debugger;
    var circleArray = [];
    var colors = ['red', 'green', 'purple', 'black', 'orange', 'yellow', 'maroon', 'grey', 'lightblue', 'tomato', 'pink', 'maroon', 'cyan', 'magenta', 'blue', 'chocolate', 'darkslateblue', 'coral', 'blueviolet', 'burlywood', 'cornflowerblue', 'crimson', 'darkgoldenrod', 'olive', 'sienna', 'red'];
    for (var i = 0; i < theta.length - 1; i++) {
        // var circle = document.createElement('div');
        // circle.className = 'circle number' + i;
        // circleArray.push(circle);
        // circleArray[i].posx = Math.round(radius * (Math.cos(theta[i]))) + 'px';
        // circleArray[i].posy = Math.round(radius * (Math.sin(theta[i]))) + 'px';
        // circleArray[i].style.position = "absolute";
        // circleArray[i].style.backgroundColor = colors[i];
        // circleArray[i].style.top = ((mainHeight / 2) - parseInt(circleArray[i].posy.slice(0, -2))) + 'px';
        // circleArray[i].style.left = ((mainHeight/ 2 ) + parseInt(circleArray[i].posx.slice(0, -2))) + 'px';
        // main.appendChild(circleArray[i]);
       const wordElement = createWordElement(data[i], radius, theta[i], mainHeight);
        main.appendChild(wordElement)
    }
    //main.appendChild(createCenterWordElement(radius, mainHeight))
};

var getColor = () => { 
    const colors = ['red', 'green', 'purple', 'black', 'orange', 'yellow', 'maroon', 'grey', 'lightblue', 'tomato', 'pink', 'maroon', 'cyan', 'magenta', 'blue', 'chocolate', 'darkslateblue', 'coral', 'blueviolet', 'burlywood', 'cornflowerblue', 'crimson', 'darkgoldenrod', 'olive', 'sienna', 'red'];

    if ( typeof getColor.idx == 'undefined' ) {
        // It has not... perform the initialization
        getColor.idx = 0;
    }
    getColor.idx = (getColor.idx + 1) % colors.length;

    return colors[getColor.idx];
}

function createWordElement(text, radius, theta, mainHeight) {
    var wordElement = document.createElement('div');    
    var wordtext = document.createElement('span');
    wordtext.innerHTML = text;
    wordElement.appendChild(wordtext);
    wordElement.className = 'circle';
    //var colors = ['red', 'green', 'purple', 'black', 'orange', 'yellow', 'maroon', 'grey', 'lightblue', 'tomato', 'pink', 'maroon', 'cyan', 'magenta', 'blue', 'chocolate', 'darkslateblue', 'coral', 'blueviolet', 'burlywood', 'cornflowerblue', 'crimson', 'darkgoldenrod', 'olive', 'sienna', 'red'];
    //circleArray.push(wordElement);
    wordElement.posx = Math.round(radius * (Math.cos(theta))) + 'px';
    wordElement.posy = Math.round(radius * (Math.sin(theta))) + 'px';
    wordElement.style.position = "absolute";
    wordElement.style.backgroundColor = getColor(); //colors[i];
    wordElement.style.top = ((mainHeight / 2) - parseInt(wordElement.posy.slice(0, -2))) + 'px';
    wordElement.style.left = ((mainHeight / 2) + parseInt(wordElement.posx.slice(0, -2))) + 'px';

    return wordElement;
}

function createCenterWordElement(radius, mainHeight) {
    var wordElement = document.createElement('div');    
    var wordtext = document.createElement('span');
    wordtext.innerHTML = '1';
    wordElement.appendChild(wordtext);
    wordElement.className = 'circle';
    //var colors = ['red', 'green', 'purple', 'black', 'orange', 'yellow', 'maroon', 'grey', 'lightblue', 'tomato', 'pink', 'maroon', 'cyan', 'magenta', 'blue', 'chocolate', 'darkslateblue', 'coral', 'blueviolet', 'burlywood', 'cornflowerblue', 'crimson', 'darkgoldenrod', 'olive', 'sienna', 'red'];
    //circleArray.push(wordElement);
    wordElement.posx = 0+ 'px'; //Math.round(radius) + 'px';
    wordElement.posy = 0 + 'px'; //Math.round(radius) + 'px';
    wordElement.style.position = "absolute";
    wordElement.style.backgroundColor = 'red'; //colors[i];
    wordElement.style.top = ((mainHeight / 2) - parseInt(wordElement.posy.slice(0, -2))) + 'px';
    wordElement.style.left = ((mainHeight / 2) + parseInt(wordElement.posx.slice(0, -2))) + 'px';

    return wordElement;
}

export { onFormSubmitted, getWords, generateCircleElements }