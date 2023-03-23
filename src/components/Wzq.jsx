import React, { useRef, useEffect } from "react";

const ProgressBar = ({ percent }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 50;
    const startAngle = -0.5 * Math.PI;
    const endAngle = (2 * Math.PI * percent) / 100 - 0.5 * Math.PI;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.arc(centerX, centerY, radius, startAngle, endAngle);
    context.lineWidth = 10;
    context.strokeStyle = "#4CAF50";
    context.stroke();
  }, [percent]);

  return <canvas ref={canvasRef} width={100} height={100} />;
};

export default ProgressBar;
