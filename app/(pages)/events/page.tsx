'use client'

import { FC, useState } from "react";
import { mockEvents } from "./mock/events";
import { mockCategories } from "./mock/categories";
import CategorySidebar from "./components/CategorySidebar";
import ProductList from "./components/ProductList";

const EventsPage: FC = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(mockCategories[0].id);
  const [scrollToCategoryId, setScrollToCategoryId] = useState<string | undefined>();

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setScrollToCategoryId(categoryId);
  };

  const handleCategoryInView = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <CategorySidebar
        categories={mockCategories}
        selectedId={selectedCategoryId}
        onSelect={handleCategorySelect}
      />
      <ProductList
        categories={mockCategories}
        events={mockEvents}
        selectedCategoryId={selectedCategoryId}
        scrollToCategoryId={scrollToCategoryId}
        onCategoryInView={handleCategoryInView}
      />
    </div>
  );
};

export default EventsPage; 