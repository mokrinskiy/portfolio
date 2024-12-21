const gallery = document.getElementById("gallery");
const buttons = document.querySelectorAll(".filter-btn");
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const closeModal = document.getElementById("close-modal");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

let currentCategory = "all";
let currentIndex = 0;
let filteredWorks = works;

// Отображаем фотографии на странице
function displayWorks(filter) {
    currentCategory = filter;
    filteredWorks =
        filter === "all"
            ? works
            : works.filter((work) => work.category === filter);
    gallery.innerHTML = "";
    filteredWorks.forEach((work, index) => {
        const img = document.createElement("img");
        img.src = work.image;
        img.alt = work.title;
        img.className = "w-full h-full bg-gray-300 cursor-pointer";
        
        // Если фото горизонтальное, добавляем класс col-span-2
        if (work.orientation === "horizontal") {
            img.classList.add("col-span-2");
        }

        img.addEventListener("click", () => openModal(index));
        gallery.appendChild(img);
    });
}

// Открыть модальное окно с выбранной фотографией
function openModal(index) {
    currentIndex = index;
    modalImg.src = filteredWorks[currentIndex].image;
    modal.classList.remove("hidden");
}

// Закрыть модальное окно
closeModal.addEventListener("click", () => {
    modal.classList.add("hidden");
});

// Перейти к предыдущей фотографии
prevBtn.addEventListener("click", () => {
    currentIndex =
        (currentIndex - 1 + filteredWorks.length) % filteredWorks.length;
    modalImg.src = filteredWorks[currentIndex].image;
});

// Перейти к следующей фотографии
nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % filteredWorks.length;
    modalImg.src = filteredWorks[currentIndex].image;
});

// Обработчик кликов на кнопки фильтрации
buttons.forEach((button) => {
    button.addEventListener("click", () => {
        buttons.forEach((btn) =>
            btn.classList.remove("font-bold", "border-black", "border-b-2")
        );
        button.classList.add("font-bold", "border-black", "border-b-2");
        displayWorks(button.dataset.category);
    });
});

// Изначально отображаем все работы
displayWorks("all");
