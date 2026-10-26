/* ============================================================
   ALIEN PILGRIMS
   MAIN JAVASCRIPT
   ============================================================ */


/* ============================================================
   DAILY BIBLE TRANSMISSION
   ============================================================ */

/*
    These are KJV verses, which is useful for keeping the
    homepage independent from an outside API.

    We can expand this list later.
*/

const transmissions = [

    {
        text: "Thy word is a lamp unto my feet, and a light unto my path.",
        reference: "Psalm 119:105"
    },

    {
        text: "Trust in the LORD with all thine heart; and lean not unto thine own understanding.",
        reference: "Proverbs 3:5"
    },

    {
        text: "But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you.",
        reference: "Matthew 6:33"
    },

    {
        text: "I can do all things through Christ which strengtheneth me.",
        reference: "Philippians 4:13"
    },

    {
        text: "Be strong and of a good courage; be not afraid, neither be thou dismayed: for the LORD thy God is with thee whithersoever thou goest.",
        reference: "Joshua 1:9"
    },

    {
        text: "The LORD is my shepherd; I shall not want.",
        reference: "Psalm 23:1"
    },

    {
        text: "Commit thy works unto the LORD, and thy thoughts shall be established.",
        reference: "Proverbs 16:3"
    },

    {
        text: "Let all your things be done with charity.",
        reference: "1 Corinthians 16:14"
    }

];


/* ============================================================
   GET ELEMENTS
   ============================================================ */

const verseElement =
    document.getElementById("daily-verse");

const referenceElement =
    document.getElementById("daily-reference");

const nextVerseButton =
    document.getElementById("next-verse");


/* ============================================================
   GET TODAY'S VERSE
   ============================================================ */

function getTodayIndex() {

    const today = new Date();

    const year = today.getFullYear();
    const month = today.getMonth();
    const day = today.getDate();

    const dayNumber =
        year * 365 +
        month * 31 +
        day;

    return dayNumber % transmissions.length;
}


/* ============================================================
   DISPLAY VERSE
   ============================================================ */

function displayVerse(index) {

    const transmission =
        transmissions[index];

    verseElement.textContent =
        `"${transmission.text}"`;

    referenceElement.textContent =
        transmission.reference;
}


/* ============================================================
   LOAD TODAY'S VERSE
   ============================================================ */

displayVerse(getTodayIndex());


/* ============================================================
   NEW TRANSMISSION BUTTON
   ============================================================ */

let currentVerse =
    getTodayIndex();

nextVerseButton.addEventListener(
    "click",
    () => {

        currentVerse =
            (currentVerse + 1)
            % transmissions.length;

        displayVerse(currentVerse);

    }
);


/* ============================================================
   CONSOLE MESSAGE
   ============================================================ */

console.log(
    "ALIEN PILGRIMS transmission established."
);

console.log(
    "Welcome, traveler."
);


/* ============================================================
   HERO CAROUSEL
   Automatically builds one dot per slide.
   ============================================================ */

document.querySelectorAll(".hero-carousel").forEach((carousel) => {
    const slides = Array.from(
        carousel.querySelectorAll(".hero-slide")
    );

    const dotsContainer = carousel.querySelector(".hero-dots");
    const previousButton = carousel.querySelector(".hero-prev");
    const nextButton = carousel.querySelector(".hero-next");

    if (!slides.length || !dotsContainer ||
        !previousButton || !nextButton) {
        return;
    }

    let currentIndex = Math.max(
        0,
        slides.findIndex((slide) => slide.classList.contains("active"))
    );

    const dots = slides.map((slide, index) => {
        const dot = document.createElement("button");

        dot.type = "button";
        dot.className = "hero-dot";
        dot.setAttribute("aria-label", `Go to slide ${index + 1}`);

        dot.addEventListener("click", () => showSlide(index));

        dotsContainer.appendChild(dot);

        return dot;
    });

    function showSlide(index) {
        currentIndex = (index + slides.length) % slides.length;

        slides.forEach((slide, i) => {
            const isActive = i === currentIndex;

            slide.classList.toggle("active", isActive);
            slide.setAttribute("aria-hidden", String(!isActive));

            // Prevent keyboard focus on links in hidden slides.
            slide.querySelectorAll("a, button").forEach((element) => {
                if (isActive) {
                    element.removeAttribute("tabindex");
                } else {
                    element.setAttribute("tabindex", "-1");
                }
            });
        });

        dots.forEach((dot, i) => {
            const isActive = i === currentIndex;

            dot.classList.toggle("active", isActive);

            if (isActive) {
                dot.setAttribute("aria-current", "true");
            } else {
                dot.removeAttribute("aria-current");
            }
        });
    }

    previousButton.addEventListener("click", () => {
        showSlide(currentIndex - 1);
    });

    nextButton.addEventListener("click", () => {
        showSlide(currentIndex + 1);
    });

    showSlide(currentIndex);
});
