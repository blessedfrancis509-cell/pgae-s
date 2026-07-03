import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  opacity: number;
  shape: "circle" | "ring" | "plus" | "square" | "hexagon";
  rotation: number;
  rotationSpeed: number;
}

export const FloatingParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    // Colors: elegant soft pinks and purples matching the site's dark aesthetic
    const colors = [
      "rgba(168, 85, 247, ", // purple-500
      "rgba(236, 72, 153, ", // pink-500
      "rgba(139, 92, 246, ", // violet-500
      "rgba(244, 63, 94, ",  // rose-500
    ];

    const shapes: Array<Particle["shape"]> = ["circle", "ring", "plus", "square", "hexagon"];

    const initParticles = (width: number, height: number) => {
      // Density of particles proportional to screen size
      const count = Math.min(Math.floor((width * height) / 15000), 60);
      particles = [];

      for (let i = 0; i < count; i++) {
        const size = Math.random() * 24 + 8; // shapes ranging from 8px to 32px
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size,
          speedX: (Math.random() - 0.5) * 0.25, // extremely slow moving
          speedY: (Math.random() - 0.5) * 0.25,
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: Math.random() * 0.15 + 0.05, // very soft, range 0.05 to 0.2
          shape: shapes[Math.floor(Math.random() * shapes.length)],
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.01,
        });
      }
    };

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
      initParticles(canvas.width, canvas.height);
    };

    // Use ResizeObserver for responsive resize tracking
    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });

    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    resizeCanvas();

    const drawHexagon = (context: CanvasRenderingContext2D, x: number, y: number, r: number) => {
      context.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        const hx = x + r * Math.cos(angle);
        const hy = y + r * Math.sin(angle);
        if (i === 0) {
          context.moveTo(hx, hy);
        } else {
          context.lineTo(hx, hy);
        }
      }
      context.closePath();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        // Update position
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        // Wrap around boundaries
        if (p.x < -p.size) p.x = canvas.width + p.size;
        if (p.x > canvas.width + p.size) p.x = -p.size;
        if (p.y < -p.size) p.y = canvas.height + p.size;
        if (p.y > canvas.height + p.size) p.y = -p.size;

        // Draw particle based on shape
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = `${p.color}${p.opacity})`;
        ctx.strokeStyle = `${p.color}${p.opacity * 1.5})`;
        ctx.lineWidth = 1.5;

        switch (p.shape) {
          case "circle":
            ctx.beginPath();
            ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
            ctx.fill();
            break;

          case "ring":
            ctx.beginPath();
            ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
            ctx.stroke();
            break;

          case "square":
            ctx.beginPath();
            ctx.rect(-p.size / 2, -p.size / 2, p.size, p.size);
            ctx.stroke();
            break;

          case "plus":
            ctx.beginPath();
            // Horizontal line
            ctx.moveTo(-p.size / 2, 0);
            ctx.lineTo(p.size / 2, 0);
            // Vertical line
            ctx.moveTo(0, -p.size / 2);
            ctx.lineTo(0, p.size / 2);
            ctx.stroke();
            break;

          case "hexagon":
            drawHexagon(ctx, 0, 0, p.size / 2);
            ctx.stroke();
            break;
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen"
      style={{ opacity: 0.8 }}
      id="background-particles-canvas"
    />
  );
};
