'use client';

interface BlurTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function BlurText({
  text,
  className = '',
  delay = 0,
}: BlurTextProps) {
  void delay;

  return (
    <span className={`inline-flex flex-wrap ${className}`}>{text}</span>
  );
}
