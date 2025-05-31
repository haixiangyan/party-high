'use client'

import { mockCategoryList, mockEventList } from "./mock";
import { useEffect, useState, useRef } from "react";
import { ICategory, IEvent } from "./types/party";
import CategorySidebar from "./components/CategorySidebar";
import ProductList from "./components/ProductList";

export default function Home() {
  const [categories] = useState<ICategory[]>(mockCategoryList);
  const [events] = useState<IEvent[]>(mockEventList);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(categories[0]?.id || '');
  const [scrollToCategoryId, setScrollToCategoryId] = useState<string | undefined>(undefined);
  const [isScrollingByClick, setIsScrollingByClick] = useState(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  // 点击左侧分类时，设置 scrollToCategoryId 并高亮，定位期间不响应右侧滚动
  const handleSidebarSelect = (id: string) => {
    setSelectedCategoryId(id);
    setScrollToCategoryId(id);
    setIsScrollingByClick(true);
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      setScrollToCategoryId(undefined);
      setIsScrollingByClick(false);
    }, 500);
  };

  // 右侧滚动时，自动高亮左侧分类，但定位期间不响应
  const handleCategoryInView = (id: string) => {
    if (!isScrollingByClick) {
      setSelectedCategoryId(id);
    }
  };

  useEffect(() => {
    if (categories.length > 0 && !selectedCategoryId) {
      setSelectedCategoryId(categories[0].id);
    }
  }, [categories, selectedCategoryId]);

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-gray-50">
      {/* 左侧分类栏 */}
      <CategorySidebar 
        categories={categories} 
        selectedId={selectedCategoryId} 
        onSelect={handleSidebarSelect} 
      />
      {/* 右侧商品列表 */}
      <div className="flex-1 overflow-y-auto">
        <ProductList 
          categories={categories} 
          events={events} 
          selectedCategoryId={selectedCategoryId}
          scrollToCategoryId={scrollToCategoryId}
          onCategoryInView={handleCategoryInView}
        />
      </div>
    </div>
  );
}
