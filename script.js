const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Disable/Enable Button
function toggleButton() {
    button.disabled = !button.disabled;
}


//  Passing joke to VoiceRSS API
function tellMe(joke) {
    // console.log('tell me:', joke);
    VoiceRSS.speech({
        key: 'cad019bc38424b738abd4da2a2c6ade2',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get jokes from joke API
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    try{
        const response = await fetch(apiUrl);
        const data = await response.json();
        if(data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        }
        else {
            joke = data.joke;
        }
        // Text-to-Speech
        tellMe(joke);
        // Disable Button
        toggleButton();
    }
    catch (error){
        console.log('Whoops', error);
    }
}

//  Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);