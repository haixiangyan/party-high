'use client'

import { AiOutlineShoppingCart, AiOutlineArrowLeft } from "react-icons/ai";
import Link from "next/link";
import { useCartStore } from "@/app/store/cart";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  // 根据路径判断是否需要显示返回按钮
  const getNavConfig = () => {
    if (pathname.startsWith('/event/')) {
      return { showBack: true, title: '活动详情' };
    }
    if (pathname === '/cart') {
      return { showBack: true, title: '购物车' };
    }
    return { showBack: false, title: '' };
  };

  const { showBack, title } = getNavConfig();

  return (
    <nav className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* 左侧：返回按钮或Logo */}
          {showBack ? (
            <button 
              onClick={() => router.back()}
              className="flex items-center gap-2 text-lg font-bold hover:text-gray-600 transition-colors"
            >
              <AiOutlineArrowLeft className="w-5 h-5" />
              {title}
            </button>
          ) : (
            <Link href="/" className="text-xl font-bold">
              Party High
            </Link>
          )}

          {/* 右侧：购物车 */}
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