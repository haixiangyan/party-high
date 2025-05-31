import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { IEvent } from '@/app/types/party';

export interface OrderItem {
  event: IEvent;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  totalPrice: number;
  deliveryFee: number;
  packingFee: number;
  finalPrice: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'delivering' | 'delivered' | 'cancelled';
  createdAt: string;
  estimatedDeliveryTime?: string;
  address?: string;
  phone?: string;
  note?: string;
}

interface OrderStore {
  orders: Order[];
  currentOrder: Order | null;
  
  // 创建订单
  createOrder: (
    items: { event: IEvent; quantity: number }[],
    address?: string,
    phone?: string,
    note?: string
  ) => Order;
  
  // 获取订单
  getOrder: (id: string) => Order | undefined;
  
  // 更新订单状态
  updateOrderStatus: (id: string, status: Order['status']) => void;
  
  // 获取所有订单
  getAllOrders: () => Order[];
  
  // 清空当前订单
  clearCurrentOrder: () => void;
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      orders: [],
      currentOrder: null,
      
      createOrder: (items, address, phone, note) => {
        const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const orderItems: OrderItem[] = items.map(item => ({
          event: item.event,
          quantity: item.quantity,
          price: 15 // 假设每个活动价格15元
        }));
        
        const totalPrice = orderItems.reduce((sum, item) => sum + (item.quantity * item.price), 0);
        const packingFee = 1;
        const deliveryFee = totalPrice >= 20 ? 0 : 1.2;
        const finalPrice = totalPrice + packingFee + deliveryFee;
        
        const order: Order = {
          id: orderId,
          items: orderItems,
          totalPrice,
          deliveryFee,
          packingFee,
          finalPrice,
          status: 'pending',
          createdAt: new Date().toISOString(),
          estimatedDeliveryTime: new Date(Date.now() + 40 * 60 * 1000).toISOString(), // 40分钟后
          address,
          phone,
          note
        };
        
        set(state => ({
          orders: [order, ...state.orders],
          currentOrder: order
        }));
        
        return order;
      },
      
      getOrder: (id) => {
        return get().orders.find(order => order.id === id);
      },
      
      updateOrderStatus: (id, status) => {
        set(state => ({
          orders: state.orders.map(order => 
            order.id === id ? { ...order, status } : order
          ),
          currentOrder: state.currentOrder?.id === id 
            ? { ...state.currentOrder, status }
            : state.currentOrder
        }));
      },
      
      getAllOrders: () => {
        return get().orders;
      },
      
      clearCurrentOrder: () => {
        set({ currentOrder: null });
      }
    }),
    {
      name: 'party-high-orders',
    }
  )
); 