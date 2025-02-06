// Home.tsx
"use client";

import { useCallback, useEffect, useState } from "react";
import confetti from "canvas-confetti";

const Home: React.FC = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [typedMessage, setTypedMessage] = useState("");
  const [showImage, setShowImage] = useState<boolean>(false); // Control visibility
  const birthdayMessage = "🎉 Happy Birthday! Mr. Gounder 🎂 ";
  const wishesMessage = "Wishing you a fantastic day filled with joy and surprises!";
  const [imageOpacity, setImageOpacity] = useState<number>(0); // Control image opacity

  // Fireworks effect
  const shootFireworks = useCallback(() => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const colors = ["#ff0", "#ff5722", "#f44336", "#4caf50", "#00bcd4"];

    (function frame() {
      confetti({
        particleCount: 10,
        startVelocity: 30,
        spread: 360,
        ticks: 50,
        scalar: 1.2,
        colors: colors,
        origin: { x: Math.random(), y: Math.random() - 0.2 },
      });

      if (Date.now() < animationEnd) {
        requestAnimationFrame(frame);
      }
    })();
  }, []);

  const handleReveal = () => {
    shootFireworks();
    setShowMessage(true);
    setTypedMessage(""); // Reset the message when revealing
  };

  useEffect(() => {
    if (showMessage && typedMessage.length < wishesMessage.length) {
      const timeoutId = setTimeout(() => {
        setTypedMessage(wishesMessage.slice(0, typedMessage.length + 1));
      }, 50);

      return () => clearTimeout(timeoutId);
    } else if (typedMessage.length === wishesMessage.length) {
      // Show the image and fade in
      setShowImage(true);
      setImageOpacity(1); // Set image opacity to fully visible
    }
  }, [showMessage, typedMessage, wishesMessage]);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen text-center p-8"
      style={{
        background: "linear-gradient(135deg, #1a1a40, #2c3e50)",
        color: "white",
        position: 'relative', // Set relative position for the image
      }}
    >
      {showMessage ? (
        <>
          <h1 className="text-6xl font-extrabold text-yellow-300 drop-shadow-lg mt-20">
            {birthdayMessage}
          </h1>
          <p className="text-lg text-gray-300 mt-4">{typedMessage}</p>

          {/* Render the image with fade effect */}
          {showImage && (
            <div style={{
              position: 'absolute',
              top: '10%', // Vertically center the image
              left: '50%', // Center horizontally
              transform: 'translate(-50%, -50%)', // Center the image vertically
              opacity: imageOpacity, // Control image opacity for fade effect
              transition: 'opacity 1s ease-in-out', // Smooth fade transition
            }}>
              <img
                src="/Bandar.jpg" // Update with your image path
                alt="Birthday Decoration"
                style={{
                  width: '100%', // Set to 100% of its container
                  maxWidth: '300px', // Max width to prevent overflow
                  height: 'auto', // Maintain aspect ratio
                  display: 'block', // Prevent overflow
                  borderRadius: '40px',
                  marginBottom: '20px',
                }}
              />
            </div>
          )}
        </>
      ) : (
        <button
          onClick={handleReveal}
          className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-6 rounded-full text-lg transition duration-300 shadow-lg"
        >
          Reveal 🎉
        </button>
      )}
    </div>
  );
}

export default Home;
