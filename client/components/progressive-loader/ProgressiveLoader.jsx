import React, { useEffect, useState } from 'react'

function ProgressiveLoader({ lowRes, highRes, isBackground, otherClass, blur, children }) {
  const [image, setImage] = useState(lowRes);

  useEffect(() => {
    setImage(lowRes);
    const img = new Image();
    img.src = highRes;
    img.onload = () => {
      setImage(highRes);
    };
  }, [lowRes, highRes]);

  return isBackground ?
    <ProgressiveBackground image={image} lowRes={lowRes} highRes={highRes} otherClass={otherClass} blur={blur != null ? blur : 2}>{children}</ProgressiveBackground>
    :
    <ProgressiveImage image={image} lowRes={lowRes} highRes={highRes} otherClass={otherClass} blur={blur != null ? blur : 2} />

}

function ProgressiveBackground({ image, lowRes, highRes, otherClass, blur, children }) {
  return (
    <div
      className={`progressive-background ${otherClass}`}
      style={{
        backgroundImage: `url(${image})`,
        filter: image === lowRes ? `blur(${blur}px)` : "none",
        transition: image === highRes ? "none" : "filter 0.3s ease-out"
      }}
    >
      {children}
    </div>
  );
}

function ProgressiveImage({ image, lowRes, highRes, otherClass, blur }) {
  return (
    <img className={`progressive-image ${otherClass}`} src={image} style={{
      filter: image === lowRes ? `blur(${blur}px)` : "none",
      transition: image === highRes ? "none" : "filter 0.3s ease-out"
    }} />
  );
}

export default ProgressiveLoader