document.addEventListener('DOMContentLoaded', () => {
    
    // Funcionalidade do Carousel (Banner Hero)
    const carousel = document.getElementById('heroCarousel');
    if (carousel) {
        const slides = carousel.querySelectorAll('.carousel-slide');
        const dotsContainer = document.getElementById('carouselDots');
        const prevButton = document.getElementById('prevSlide');
        const nextButton = document.getElementById('nextSlide');
        let currentSlide = 0;
        let autoSlideInterval = setInterval(() => moveToSlide(currentSlide + 1), 5000);

        function updateDots() {
            if (dotsContainer) {
                dotsContainer.innerHTML = '';
                slides.forEach((_, index) => {
                    const dot = document.createElement('button');
                    dot.classList.add('dot');
                    dot.setAttribute('data-slide', index);
                    if (index === currentSlide) {
                        dot.classList.add('active');
                    }
                    dot.addEventListener('click', () => {
                        moveToSlide(index);
                        resetAutoSlide();
                    });
                    dotsContainer.appendChild(dot);
                });
            }
        }

        function moveToSlide(index) {
            slides[currentSlide].classList.remove('active');
            currentSlide = (index + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
            updateDots();
        }

        function resetAutoSlide() {
            clearInterval(autoSlideInterval);
            autoSlideInterval = setInterval(() => moveToSlide(currentSlide + 1), 5000);
        }

        if (nextButton) {
            nextButton.addEventListener('click', () => {
                moveToSlide(currentSlide + 1);
                resetAutoSlide();
            });
        }

        if (prevButton) {
            prevButton.addEventListener('click', () => {
                moveToSlide(currentSlide - 1);
                resetAutoSlide();
            });
        }

        updateDots();
    }


    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const content = header.nextElementSibling;
            
            document.querySelectorAll('.accordion-item.open').forEach(openItem => {
                if (openItem !== item) {
                    openItem.classList.remove('open');
                    openItem.querySelector('.accordion-content').style.maxHeight = 0;
                }
            });

            if (item.classList.contains('open')) {
                item.classList.remove('open');
                content.style.maxHeight = 0;
            } else {
                item.classList.add('open');
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

});