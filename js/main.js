/* ============================================================
   ALIEN PILGRIMS — HERO CAROUSEL
   Creates one navigation dot per slide and handles carousel controls.
   ============================================================ */

document.querySelectorAll(".hero-carousel").forEach((carousel) => {
    const slides = Array.from(carousel.querySelectorAll(".hero-slide"));
    const dotsContainer = carousel.querySelector(".hero-dots");
    const previousButton = carousel.querySelector(".hero-prev");
    const nextButton = carousel.querySelector(".hero-next");

    if (!slides.length || !dotsContainer || !previousButton || !nextButton) {
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

            // Keep links in hidden slides out of keyboard navigation.
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

    previousButton.addEventListener("click", () => showSlide(currentIndex - 1));
    nextButton.addEventListener("click", () => showSlide(currentIndex + 1));

    showSlide(currentIndex);
});
