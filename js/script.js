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

// Listen for scroll events on the main element
document.querySelector('main').addEventListener('scroll', function () {
    scrollCircle();
    animateVideo();
});