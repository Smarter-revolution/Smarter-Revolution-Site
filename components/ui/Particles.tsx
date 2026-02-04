'use client';

interface ParticlesProps {
  className?: string;
  quantity?: number;
  color?: string;
  size?: number;
  speed?: number;
}

export default function Particles({
  className = '',
  quantity = 50,
  color = '#dc2626',
  size = 2,
  speed = 0.5,
}: ParticlesProps) {
  void className;
  void quantity;
  void color;
  void size;
  void speed;

  return null;
}
