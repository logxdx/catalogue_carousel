
const SliderContent = [
    "ONE",
    "TWO",
    "THREE",
    "FOUR",
    "FIVE",
    "SIX",
    "SEVEN",
    "EIGHT",
    "NINE",
    "TEN"
];

let currentImgIdx = 2;
let currentContentIdx = 1;

const totalImages = 10;

let isAnimating = false;

function splitTextIntoSpans(selector) {
    let elements = document.querySelectorAll(selector);
    elements.forEach((element) => {
        let text = element.innerText;
        let splitText = text
            .split("")
            .map((letter) => {
                return `<span>${letter === " " ? "&nbsp;&nbsp;" : letter}</span>`;
            })
            .join("");
        element.innerHTML = splitText;
    });
};

gsap.to(".slide-next-img", {
    clipPath: "circle(100%)",
    ease: "power3.inOut",
    duration: 2,
    delay: 1,
});

document.addEventListener("click", function () {
    if (isAnimating) return;

    isAnimating = true;

    splitTextIntoSpans(".slide-active-content h1");

    gsap.to(".slide-active img", {
        scale: 1.5,
        duration: 1.25,
        ease: "power3.inOut",
    });

    gsap.to(".slide-active-content h1 span", {
        top: "-175px",
        stagger: 0.05,
        duration: 0.5,
        ease: "power3.inOut",
        onComplete: () => {
            gsap.to(".slide-active-content", {
                top: "-175px",
                duration: 0.25,
                ease: "power3.inOut",
            });
        },
    });


    splitTextIntoSpans(".slide-next-content h1");
    gsap.set(".slide-next-content h1 span", { top: 200 })

    gsap.to(".slide-next-content", {
        top: 0,
        duration: 1,
        ease: "power3.inOut",
        onComplete: () => {
            document.querySelector(".slide-active-content").remove();
            gsap.to(".slide-next-content h1 span", {
                top: 0,
                stagger: 0.05,
                duration: 0.5,
                ease: "power3.inOut",
            })

            const nextContent = document.querySelector(".slide-next-content");
            nextContent.classList.remove("slide-next-content");
            nextContent.classList.add("slide-active-content");
            nextContent.style.top = "0";

            currentContentIdx = (currentContentIdx + 1) % totalImages;

            const nextContentText = SliderContent[currentContentIdx];
            const nextContentHTML = `<div class="slide-next-content" style="top: 200px;"><h1>${nextContentText}</h1></div>`

            document.querySelector(".slider-content").insertAdjacentHTML("beforeend", nextContentHTML);

        }
    });

    currentImgIdx = (currentImgIdx % totalImages) + 1;
    const newSlideHTML = `<div class="slide-next"><div class="slide-next-img"><img src="./assets/${currentImgIdx}.jpg" alt=""></div></div>`;

    document.querySelector(".slider").insertAdjacentHTML("beforeend", newSlideHTML);

    gsap.to(".slider .slide-next:last-child .slide-next-img", {
        clipPath: "circle(100%)",
        ease: "power3.inOut",
        duration: 1.5,
        delay: 0.5,
    })

    const slideNextImg = document.querySelector(".slide-next-img");
    gsap.to(slideNextImg, {
        width: "100vw",
        height: "100vh",
        duration: 1.6,
        ease: "power3.inOut",
        onComplete: () => {

            const currentActiveSlide = document.querySelector(".slide-active");
            if (currentActiveSlide) {
                currentActiveSlide.parentNode.removeChild(currentActiveSlide);
            }

            const nextSlide = document.querySelector(".slide-next");
            if (nextSlide) {
                nextSlide.classList.remove("slide-next");
                nextSlide.classList.add("slide-active");

                const nextSlideImg = document.querySelector(".slide-next-img");
                if (nextSlide) {
                    nextSlideImg.classList.remove("slide-next-img");
                }
            }

            setTimeout(() => {
                isAnimating = false;
            }, 500);
        }
    });
});
