'use client'

import { AiOutlineShoppingCart } from "react-icons/ai";
import Link from "next/link";
import { useCartStore } from "@/app/store/cart";

export default function Navbar() {
  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">
            Party High
          </Link>
          <Link 
            href="/cart" 
            className="relative p-2 hover:bg-gray-100 rounded-full"
          >
            <AiOutlineShoppingCart className="w-6 h-6" />
            <CartBadge />
          </Link>
        </div>
      </div>
    </nav>
  );
}

function CartBadge() {
  const totalItems = useCartStore(state => state.getTotalItems());
  
  if (totalItems === 0) return null;
  
  return (
    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
      {totalItems}
    </span>
  );
} 