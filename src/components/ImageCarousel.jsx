import React from 'react'

const ImageCarousel = ({
    images = [], // array of strings or {src, alt}
    aspect = "16/9", // ex: "16/9", "3/2", "4/3"
    autoPlay = false,
    interval = 5000,
    className = "",
    rounded = "2xl",
}) => {
  const [index, setIndex] = React.useState(0);
  const total = images.length;
  const current = ((index % total) + total) % total;


  // Auto-play
  React.useEffect(() => {
  if (!autoPlay || total <= 1) return;
  const id = setInterval(() => setIndex((i) => (i + 1) % total), interval);
  return () => clearInterval(id);
  }, [autoPlay, interval, total]);


  // Swipe support
  const startX = React.useRef(null);
  const deltaX = React.useRef(0);
  const onTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
    deltaX.current = 0;
  };
  const onTouchMove = (e) => {
    if (startX.current == null) return;
    deltaX.current = e.touches[0].clientX - startX.current;
  };
  const onTouchEnd = () => {
    const threshold = 50; // px
    if (deltaX.current > threshold) setIndex((i) => (i - 1 + total) % total);
    else if (deltaX.current < -threshold) setIndex((i) => (i + 1) % total);
    startX.current = null;
    deltaX.current = 0;
  };


  // Keyboard arrows
  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + total) % total);
    if (e.key === "ArrowRight") setIndex((i) => (i + 1) % total);
  };


  if (!total) return null;


  const roundedCls = `rounded-${rounded}`;
  const aspectCls = `aspect-[${aspect}]`;


  const slides = images.map((img) =>
    typeof img === "string" ? { src: img, alt: "" } : img
  );
  return (
    <div>ImageCarousel</div>
  )
}

export default ImageCarousel;