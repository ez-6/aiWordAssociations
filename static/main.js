

function onFormSubmitted(e) {
    //const form = document.querySelector('#main-form');
    //form.addEventListener("submit", function (e) {
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
            })
    //})
}

 function getWords(req, res){
    res.send('["one", "two", "Three"]');
}

export {onFormSubmitted, getWords }