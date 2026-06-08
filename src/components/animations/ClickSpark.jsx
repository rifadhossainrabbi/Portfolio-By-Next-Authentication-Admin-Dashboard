'use client';
import { useRef, useEffect } from 'react';

const ClickSpark = ({
  sparkColor = '#22d3ee',
  sparkSize = 10,
  sparkRadius = 15,
  duration = 400,
  easing = 'ease-out',
  extraClasses = '',
  children,
}) => {
  const canvasRef = useRef(null);
  const sparksRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let animationId;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      sparksRef.current = sparksRef.current.filter(spark => {
        const elapsed = performance.now() - spark.startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing calculation (simplified ease-out)
        const t = progress;
        const easeOut = 1 - Math.pow(1 - t, 3);

        const currentRadius = spark.radius * easeOut;
        const opacity = 1 - easeOut;

        ctx.beginPath();
        ctx.arc(spark.x, spark.y, currentRadius, 0, Math.PI * 2);
        ctx.strokeStyle = spark.color;
        ctx.globalAlpha = opacity;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();

        return progress < 1;
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleClick = e => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // একসাথে ৩টি স্পার্ক তৈরি হবে একটু ভিন্ন রেডিয়াসে
      for (let i = 0; i < 3; i++) {
        sparksRef.current.push({
          x,
          y,
          radius: sparkRadius * (1 + i * 0.5),
          color: sparkColor,
          startTime: performance.now(),
        });
      }
    };

    parent.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      parent.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationId);
    };
  }, [sparkColor, sparkRadius, duration]);

  return (
    <div className={`relative w-full h-full ${extraClasses}`}>
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-[9999]"
      />
      {children}
    </div>
  );
};

export default ClickSpark;
