'use client';

import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { cn } from '@/lib/utils';
import { useMemo } from 'react';

interface RatingsProps {
  rate: number;
  maxRate?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Ratings: React.FC<RatingsProps> = ({
  rate,
  maxRate = 5,
  size = 'md',
  className
}) => {
  const sizeMap = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  // 使用 Math.round 确保服务器端和客户端结果一致
  const displayRate = Math.round(rate * 10) / 10;

  const stars = useMemo(() => {
    return Array.from({ length: maxRate }).map((_, index) => (
      index < Math.floor(rate) ? (
        <AiFillStar
          key={index}
          className={cn(sizeMap[size], 'text-yellow-400')}
        />
      ) : index < Math.ceil(rate) ? (
        <AiFillStar
          key={index}
          className={cn(sizeMap[size], 'text-yellow-400 opacity-50')}
        />
      ) : (
        <AiOutlineStar
          key={index}
          className={cn(sizeMap[size], 'text-gray-200')}
        />
      )
    ));
  }, [rate, maxRate, size]);

  return (
    <div className={cn('flex items-center gap-0.5', className)}>
      {stars}
      <span className={cn(
        'ml-2 text-sm text-gray-500',
        size === 'sm' && 'text-xs',
        size === 'lg' && 'text-base'
      )}>
        {displayRate}
      </span>
    </div>
  );
};

export default Ratings; 