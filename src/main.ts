import "./style.css";

const galleryEl = document.getElementById("gallery");
const galleryImages = galleryEl?.querySelectorAll(".gallery-image-wrapper");
const IMAGE_WIDTH = 300;
const LEFT_PADDING = 5;
const GAP_PADDING = 20;

console.log(galleryEl);

let animationFrame: number;

const handleScroll: EventListener = (e) => {
  const container = e.target as HTMLDivElement;

  const offset = container.scrollLeft;

  cancelAnimationFrame(animationFrame);

  animationFrame = requestAnimationFrame(() => {
    galleryImages?.forEach((galleryImage, i) => {
      let el = galleryImage as HTMLDivElement;

      const imageCenterOffset = i * (IMAGE_WIDTH + GAP_PADDING) + LEFT_PADDING;
      const distFromCenter = offset - imageCenterOffset;
      // const zIndex = -Math.abs(distFromCenter);
      const rotateY = toScalar(distFromCenter / 500) * 45;
      const scale = 1 - Math.abs(toScalar(distFromCenter / 1000)) * 0.5;
      const translateX = toScalar(distFromCenter / 1000) * 240;
      const imgScale = 1.2 - Math.abs(toScalar(distFromCenter / 200)) * 0.1;
      const imgTranslateX = clamp(-1, 1, distFromCenter / 300) * 40;

      // const container = el.parentElement?.parentElement;
      // if (container) container.style.zIndex = `${zIndex}`;
      el.style.transform = `rotateY(${rotateY}deg) scale(${scale}) translateX(${translateX}px)`;

      const imageEl = el.firstElementChild as HTMLImageElement;
      imageEl.style.transform = `scale(${imgScale}) translateX(${imgTranslateX}px)`;
    });
  });
};

galleryEl?.addEventListener("scroll", handleScroll);

function clamp(min: number, max: number, value: number): number {
  return Math.min(Math.max(value, min), max);
}

function ease(value: number) {
  return value * value * (3 - 2 * value);
}

function toScalar(value: number) {
  return ease(clamp(0, 1, Math.abs(value))) * Math.sign(value);
}
