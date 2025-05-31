'use client'

import { AiOutlineShoppingCart, AiOutlineArrowLeft } from "react-icons/ai";
import Link from "next/link";
import { useCartStore } from "@/app/store/cart";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function NavbarContent() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  // 根据路径判断是否需要显示返回按钮
  const getNavConfig = () => {
    if (pathname.startsWith('/events/') && pathname !== '/events') {
      return { showBack: true, title: '活动详情' };
    }
    if (pathname === '/cart') {
      return { showBack: true, title: '购物车' };
    }
    // 使用正则表达式匹配订单详情页面，如 /orders/order_1748661317908_805z3d436
    const orderDetailPattern = /^\/orders\/order_\d+_[a-z0-9]+$/;
    if (orderDetailPattern.test(pathname)) {
      return { showBack: true, title: '订单详情' };
    }
    if (pathname === '/parties') {
      // 派对列表页面 - 首页
      return { showBack: false, title: 'Party High' };
    }
    if (pathname === '/events') {
      // 商品/活动列表页面
      return { showBack: true, title: '创建 Party' };
    }
    if (pathname === '/orders') {
      // 订单列表页面
      return { showBack: false, title: '订单列表' };
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
              onClick={() => {
                const to = searchParams.get('to');
                if (to) {
                  router.push(to);
                } else {
                  router.back();
                }
              }}
              className="flex items-center gap-2 text-lg font-bold hover:text-gray-600 transition-colors"
            >
              <AiOutlineArrowLeft className="w-5 h-5" />
              {title}
            </button>
          ) : (
            <Link href="/parties" className="text-xl font-bold">
              Party High
            </Link>
          )}

          {/* 右侧：购物车 */}
          {pathname !== '/cart' && (
            <Link
              href="/cart"
              className="relative p-2 hover:bg-gray-100 rounded-full"
            >
              <AiOutlineShoppingCart className="w-6 h-6" />
              <CartBadge />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default function Navbar() {
  return (
    <Suspense fallback={
      <nav className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="text-xl font-bold">Party High</div>
            <div className="w-6 h-6"></div>
          </div>
        </div>
      </nav>
    }>
      <NavbarContent />
    </Suspense>
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