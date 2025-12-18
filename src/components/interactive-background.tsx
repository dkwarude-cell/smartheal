import React, { useEffect, useRef, useState } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  connections: number[];
}

export function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });
  const [nodes, setNodes] = useState<Node[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Initialize nodes
    const nodeCount = 50;
    const initialNodes: Node[] = [];
    
    for (let i = 0; i < nodeCount; i++) {
      initialNodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        connections: []
      });
    }

    setNodes(initialNodes);

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw nodes
      initialNodes.forEach((node, i) => {
        // Move nodes
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        // Mouse interaction
        const dx = mouseRef.current.x - node.x;
        const dy = mouseRef.current.y - node.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          const force = (100 - distance) / 100;
          node.x -= dx * force * 0.01;
          node.y -= dy * force * 0.01;
        }

        // Draw connections
        initialNodes.forEach((otherNode, j) => {
          if (i !== j) {
            const dx = node.x - otherNode.x;
            const dy = node.y - otherNode.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 80) {
              const opacity = 1 - distance / 80;
              ctx.strokeStyle = `rgba(0, 212, 153, ${opacity * 0.2})`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(node.x, node.y);
              ctx.lineTo(otherNode.x, otherNode.y);
              ctx.stroke();
            }
          }
        });

        // Draw node
        const mouseDistance = Math.sqrt(
          (mouseRef.current.x - node.x) ** 2 + (mouseRef.current.y - node.y) ** 2
        );
        const brightness = mouseDistance < 50 ? 1 : 0.3;
        
        ctx.fillStyle = `rgba(0, 212, 153, ${brightness})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto"
      style={{ zIndex: 1 }}
    />
  );
}