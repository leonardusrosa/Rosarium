interface RosaryBeadsProps {
  completed: number;
  total: number;
  size?: 'sm' | 'md' | 'lg';
  onBeadClick?: (index: number) => void;
}

export default function RosaryBeads({ 
  completed, 
  total, 
  size = 'md',
  onBeadClick 
}: RosaryBeadsProps) {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-6 h-6'
  };

  const beadSize = sizeClasses[size];

  return (
    <div className="flex justify-center space-x-2">
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          className={`
            ${beadSize} rounded-full prayer-bead-enhanced
            ${index < completed ? 'completed' : ''}
            ${onBeadClick ? 'cursor-pointer' : ''}
          `}
          onClick={() => onBeadClick?.(index)}
        />
      ))}
    </div>
  );
}
