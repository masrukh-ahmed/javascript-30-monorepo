function debounce(func, wait = 10, immediate = true) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

const sliderImages = Array.from(document.querySelectorAll(".img-container"));
const slideInText = Array.from(document.querySelectorAll(".text"));
const sec6Elements = Array.from(document.querySelectorAll(".sec-6 *"));

function handleSlide(e) {
  sliderImages.forEach((image) => {
    const slideInAt =
      window.scrollY + window.innerHeight - image.offsetHeight / 2;
    const imageBottomEdge = image.offsetTop + image.offsetHeight;
    const isHalfShown = slideInAt > image.offsetTop;
    const isNotScrolledPast = window.scrollY < imageBottomEdge;

    if (isHalfShown && isNotScrolledPast) {
      image.classList.add("active");
    } else {
      image.classList.remove("active");
    }
  });

  slideInText.forEach((text) => {
    const slideInAt =
      window.scrollY + window.innerHeight - text.offsetHeight / 4;
    const textBottomEdge = text.offsetTop + text.offsetHeight;
    const isHalfShown = slideInAt > text.offsetTop;
    const isNotScrolledPast = window.scrollY < textBottomEdge;

    if (isHalfShown && isNotScrolledPast) {
      text.classList.add("active");
    } else {
      text.classList.remove("active");
    }
  });

  sec6Elements.forEach((element) => {
    const slideInAt =
      window.scrollY + window.innerHeight - element.offsetHeight / 4;
    const textBottomEdge = element.offsetTop + element.offsetHeight;
    const isHalfShown = slideInAt > element.offsetTop;
    const isNotScrolledPast = window.scrollY < textBottomEdge;

    if (isHalfShown && isNotScrolledPast) {
      element.classList.add("active");
    } else {
      element.classList.remove("active");
    }
  });
}

window.addEventListener("scroll", debounce(handleSlide));
