import { create } from 'zustand'
import { IEvent } from '../types/party'

interface CartItem {
  event: IEvent
  quantity: number
}

interface CartStore {
  items: CartItem[]
  addToCart: (event: IEvent) => void
  removeFromCart: (eventId: string) => void
  clearCart: () => void
  getTotalItems: () => number
  updateQuantity: (eventId: string, quantity: number) => void
  getCartItemQuantity: (eventId: string) => number
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  
  addToCart: (event: IEvent) => {
    set((state: CartStore) => {
      const existingItem = state.items.find((item: CartItem) => item.event.id === event.id)
      
      if (existingItem) {
        return {
          items: state.items.map((item: CartItem) =>
            item.event.id === event.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        }
      }
      
      return {
        items: [...state.items, { event, quantity: 1 }]
      }
    })
  },
  
  removeFromCart: (eventId: string) => {
    set((state: CartStore) => ({
      items: state.items.filter((item: CartItem) => item.event.id !== eventId)
    }))
  },
  
  clearCart: () => {
    set({ items: [] })
  },
  
  getTotalItems: () => {
    return get().items.reduce((total: number, item: CartItem) => total + item.quantity, 0)
  },

  updateQuantity: (eventId: string, quantity: number) => {
    if (quantity < 1) {
      get().removeFromCart(eventId)
      return
    }
    
    set((state: CartStore) => ({
      items: state.items.map((item: CartItem) =>
        item.event.id === eventId
          ? { ...item, quantity }
          : item
      )
    }))
  },

  getCartItemQuantity: (eventId: string) => {
    const item = get().items.find((item: CartItem) => item.event.id === eventId)
    return item?.quantity || 0
  }
})) 