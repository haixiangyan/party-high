import React, { useRef, useEffect, useCallback } from 'react';
import ProductCard from './ProductCard';
import { ICategory, IEvent } from '../types/party';

interface Props {
  categories: ICategory[];
  events: IEvent[];
  selectedCategoryId: string;
  scrollToCategoryId?: string;
  onCategoryInView?: (id: string) => void;
}

const ProductList: React.FC<Props> = ({ categories, events, selectedCategoryId, scrollToCategoryId, onCategoryInView }) => {
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isScrollingByClick = useRef(false);

  // 按分类分组
  const grouped = categories.map(cat => ({
    ...cat,
    events: events.filter(e => e.category.id === cat.id)
  }));

  // 点击左侧分类时滚动到对应分类
  useEffect(() => {
    if (scrollToCategoryId && sectionRefs.current[scrollToCategoryId]) {
      isScrollingByClick.current = true;
      sectionRefs.current[scrollToCategoryId]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // 300ms后允许滚动事件触发高亮
      setTimeout(() => { isScrollingByClick.current = false; }, 300);
    }
  }, [scrollToCategoryId]);

  // 监听右侧滚动，自动高亮左侧分类
  const handleScroll = useCallback(() => {
    if (isScrollingByClick.current) return;
    if (!containerRef.current) return;
    const scrollTop = containerRef.current.scrollTop;
    let currentId = categories[0]?.id;
    for (const cat of categories) {
      const ref = sectionRefs.current[cat.id];
      if (ref) {
        const offset = ref.offsetTop - containerRef.current.offsetTop;
        if (scrollTop >= offset - 10) {
          currentId = cat.id;
        } else {
          break;
        }
      }
    }
    if (currentId && currentId !== selectedCategoryId) {
      onCategoryInView?.(currentId);
    }
  }, [categories, selectedCategoryId, onCategoryInView]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div ref={containerRef} className="flex-1 overflow-y-auto h-full pb-8 md:px-10 lg:px-16 xl:px-24 scroll-smooth">
      {grouped.map(cat => (
        <div
          key={cat.id}
          ref={el => (sectionRefs.current[cat.id] = el)}
          id={`cat-${cat.id}`}
          className="mb-6"
        >
          <h3 className="font-bold p-2 text-gray-800 sticky top-0 bg-white z-10 shadow-sm">{cat.name}</h3>
          <div className="grid grid-cols-1">
            {cat.events.map(event => (
              <ProductCard key={event.id} data={event} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList; 