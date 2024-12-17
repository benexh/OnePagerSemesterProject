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


window.onload = function() {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(".top-text", {
        y: "-80%",
    }, {
        y: "0",
        scrollTrigger: {
            trigger: ".move-text-1",
            start: "top 60%",
            end: "top 40%",
            scrub: true,
        }
    });

    gsap.fromTo(".bottom-text", {
        y: "90%",
    }, {
        y: "0",
        scrollTrigger: {
            trigger: ".move-text-1",
            start: "top 50%",
            end: "top 30%",
            scrub: true,
        }
    });
}
