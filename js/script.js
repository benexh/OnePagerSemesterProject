/*const main = document.querySelector('main');

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const scrollFraction = Math.min(scrollTop / windowHeight, 1); // Ensure value is between 0 and 


    // Interpolate colors between blue (#003366) and white (#ffffff)
    const startColor = [0, 27, 186]; // RGB for #003366
    const endColor = [240, 175, 216]; // RGB for #ffffff

    const newColor = startColor.map((start, index) => {
        return Math.round(start + (endColor[index] - start) * scrollFraction);
    });

    document.querySelector('.hero').style.backgroundColor = `rgb(${newColor.join(',')})`;
    document.querySelector('.block-1').style.backgroundColor = `rgb(${newColor.join(',')})`;


    document.body.style.setProperty('--scroll', window.scrollY / (document.body.offsetHeight - window.innerHeight))


}, false);  

const elements = document.querySelectorAll('.message-bubble');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            entry.target.classList.remove('visible');
        }
    });
}, { threshold: 0.5});

elements.forEach(el => observer.observe(el));





const svg = document.querySelector('.squiggle-line-1');
const path = svg.querySelector('path');


const animationStartOffset = document.body.clientHeight * 0.9;


const scroll = () => {
    const pathLength = path.getTotalLength();
    const distance = (window.scrollY - animationStartOffset) * 4;
    const totalDistance = document.body.clientHeight - window.innerHeight;

    const percentage = distance/totalDistance;
    
    path.style.strokeDasharray = `${pathLength}`;
    path.style.strokeDashoffset = `${pathLength * (1 - percentage)}`;
};



scroll();




const introContainer = document.querySelector(".block-1")
const topText = document.querySelector('.top-text');
const bottomText = document.querySelector('.bottom-text');

function scrollIntroduction () {
    let {bottom} = introContainer.getBoundingClientRect();
    let textTrans = bottom - window.innerHeight;
    textTrans = textTrans < 0 ? 0 : textTrans;
    topText.style.transform = `translateX(${-textTrans}px)`;
    bottomText.style.transform = `translateX(${textTrans}px)`;


}

window.addEventListener('scroll', () => {
    scroll();
    scrollIntroduction();
});
*/



const circleSection = document.getElementById('explanation__circle');
const circle = document.querySelector('.circle');

function scrollCircle() {
    let { top } = circleSection.getBoundingClientRect();
    let scaleTop = Math.abs(top);
    let scale = scaleTop / window.innerHeight;
    scale = scale < 0 ? 0 : scale > 1 ? 1 : scale;

    if (top <= 0) {
        circle.style.transform = `translate(-50%, -50%) scale(${scale})`; // Scale the circle
    } else {
        circle.style.transform = `translate(-50%, -50%) scale(0)`; // Reset scale before section enters
    }
}

const video = document.querySelector('video');
const videoSection = document.querySelector('#scale__example');

const headerLeft = document.querySelector('.text__header__left');
const headerRight = document.querySelector('.text__header__right');

function animateVideo() {
    let { bottom } = videoSection.getBoundingClientRect();
    let scale = 1 - ((bottom - window.innerHeight) * .0005);
    scale = scale < .2 ? .2 : scale > 1 ? 1 : scale;
    video.style.transform = `scale(${scale})`;
}

// Text Reveal

const textReveals = [...document.querySelectorAll(".text__reveal")];

let callback = (entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            [...entry.target.querySelectorAll('.line')].forEach((line, idx) => {
                setTimeout(() => {
                    line.style.transform = `translateY(0)`;
                    line.style.opacity = `1`;
                }, idx * 300);
            });
        }
    });
};

let options = {
    rootMargin: '0px 0px -30% 0px',
    threshold: 1.0,
};

let observer = new IntersectionObserver(callback, options);

textReveals.forEach((text) => {
    const lines = text.innerText.split('\n'); // Split text into lines
    const html = lines
        .map((line) => `<span class="line" style="display: block; transform: translateY(100%); opacity: 0; transition: transform 0.5s ease-out, opacity 0.5s ease-out;">${line}</span>`)
        .join('');
    text.innerHTML = html;
    observer.observe(text);
});

// Graph Animation

function animateGraph() {
    const rect = document.getElementById('graph__rect');
    const rectPosition = rect.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (rectPosition < windowHeight) {
        const scrollyY = window.scrollY;
        const maxHeight = 200;
        const height = Math.min((scrollY + windowHeight - rectPosition) * 0.5, maxHeight);
        rect.setAttribute('height', height);
    }
}

//Examples 
const examplesSlider = document.querySelector('.examples__slider');
const examples = [
    {
        id: 'example-1',
        name: 'Apple',
        video: './vid/apple.mov',
    },
    {
        id: 'example-2',
        name: 'Lusion',
        video: './vid/lusion.mov',
    },
    {
        id: 'example-3',
        name: 'Analogue',
        video: './vid/analogue.mov',
    },
    {
        id: 'example-4',
        name: 'Scout',
        video: './vid/scout.mov',
    },
];

const createExamples = () => {
    examples.forEach(example => {
        // Create the container for each example
        let exampleContainer = document.createElement('div');
        exampleContainer.classList.add('example');

        // Create the video container
        let videoContainer = document.createElement('div');
        videoContainer.className = 'image__container';

        // Create the video element
        let video = document.createElement('video');
        video.classList.add('example__video');
        video.setAttribute('autoplay', '');
        video.setAttribute('loop', '');
        video.setAttribute('muted', '');
        video.setAttribute('playsinline', '');

        // Add the video source
        let source = document.createElement('source');
        source.src = example.video;
        source.type = 'video/mp4';
        video.appendChild(source);

        // Append video to container
        videoContainer.appendChild(video);
        exampleContainer.appendChild(videoContainer);

        // Add the example name (optional)
        let exampleTitle = document.createElement('p');
        exampleTitle.innerText = example.name;
        exampleTitle.classList.add('example__title');
        exampleContainer.appendChild(exampleTitle);

        // Append the example to the slider
        document.querySelector('.examples__slider').appendChild(exampleContainer);
    });
};

createExamples();


let exampleTargetY = 0;
let exampleCurrentY = 0;
const lerp = (a, b, n) => (1 - n) * a + n * b;

function animateExamples() {
    let offsetTop = examplesSlider.parentElement.offsetTop;
    let percentage = ((window.scrollY - offsetTop) / window.innerHeight) * 100;
    percentage = Math.max(0, Math.min(percentage, examples.length * 50));
    exampleTargetY = percentage * -2; // Adjust movement speed
    exampleCurrentY = lerp(exampleCurrentY, exampleTargetY, 0.1);
    examplesSlider.style.transform = `translate3d(0, ${exampleCurrentY}vh, 0)`;
}

function animate() {
    animateExamples();
    requestAnimationFrame(animate);
}

animate();

// Listen for scroll events on the main element
document.querySelector('main').addEventListener('scroll', function () {
    scrollCircle();
    animateVideo();
    scroll();
    animateGraph();
});