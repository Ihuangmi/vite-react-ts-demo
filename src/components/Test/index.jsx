import React, { useState, useEffect } from "react";

// This component creates a fireworks display on the screen
const Fireworks = () => {
  const [fireworks, setFireworks] = useState([]);

  // This useEffect hook creates a new firework every second
  useEffect(() => {
    const interval = setInterval(() => {
      const newFirework = {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 100 + 50,
        color: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${
          Math.random() * 255
        })`,
        sparks: [],
      };
      for (let i = 0; i < 50; i++) {
        newFirework.sparks.push({
          x: 0,
          y: 0,
          size: Math.random() * 10 + 5,
          color: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${
            Math.random() * 255
          })`,
          angle: Math.random() * Math.PI * 2,
          speed: Math.random() * 5 + 2,
          acceleration: Math.random() * 0.1 + 0.05,
        });
      }
      setFireworks((prevFireworks) => [...prevFireworks, newFirework]);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // This returns the Fireworks component, which displays the fireworks on the screen
  return (
    <div>
      {fireworks.map((firework, index) => (
        <div
          key={index}
          style={{ position: "absolute", left: firework.x, top: firework.y }}
        >
          <div
            style={{
              width: firework.size,
              height: firework.size,
              borderRadius: "50%",
              backgroundColor: firework.color,
              position: "relative",
            }}
          >
            {firework.sparks.map((spark, index) => (
              <div
                key={index}
                style={{
                  width: spark.size,
                  height: spark.size,
                  borderRadius: "50%",
                  backgroundColor: spark.color,
                  position: "absolute",
                  left: spark.x,
                  top: spark.y,
                }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Fireworks; // This exports the Fireworks component
