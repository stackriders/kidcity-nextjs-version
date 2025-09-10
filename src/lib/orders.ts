import { db } from './firebase';
import { 
  collection, 
  addDoc, 
  doc, 
  updateDoc, 
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  Timestamp
} from 'firebase/firestore';

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export interface Order {
  id?: string;
  userId: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
  paymentMethod: string;
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentId?: string;
  orderStatus: 'processing' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  trackingNumber?: string;
  createdAt: Date;
  updatedAt?: Date;
}

// Create a new order
export const createOrder = async (orderData: Omit<Order, 'id'>): Promise<string> => {
  try {
    const ordersRef = collection(db, 'orders');
    const docRef = await addDoc(ordersRef, {
      ...orderData,
      createdAt: Timestamp.fromDate(orderData.createdAt),
      updatedAt: Timestamp.now()
    });
    
    return docRef.id;
  } catch (error) {
    console.error('Error creating order:', error);
    throw new Error('Failed to create order');
  }
};

// Update order status
export const updateOrderStatus = async (
  orderId: string, 
  status: Order['orderStatus'],
  paymentId?: string
): Promise<void> => {
  try {
    const orderRef = doc(db, 'orders', orderId);
    const updateData: any = {
      orderStatus: status,
      updatedAt: Timestamp.now()
    };

    if (paymentId) {
      updateData.paymentId = paymentId;
      updateData.paymentStatus = 'completed';
    }

    await updateDoc(orderRef, updateData);
  } catch (error) {
    console.error('Error updating order status:', error);
    throw new Error('Failed to update order status');
  }
};

// Update payment status
export const updatePaymentStatus = async (
  orderId: string, 
  status: Order['paymentStatus'],
  paymentId?: string
): Promise<void> => {
  try {
    const orderRef = doc(db, 'orders', orderId);
    const updateData: any = {
      paymentStatus: status,
      updatedAt: Timestamp.now()
    };

    if (paymentId) {
      updateData.paymentId = paymentId;
    }

    await updateDoc(orderRef, updateData);
  } catch (error) {
    console.error('Error updating payment status:', error);
    throw new Error('Failed to update payment status');
  }
};

// Get order by ID
export const getOrderById = async (orderId: string): Promise<Order | null> => {
  try {
    const orderRef = doc(db, 'orders', orderId);
    const orderSnap = await getDoc(orderRef);
    
    if (orderSnap.exists()) {
      const data = orderSnap.data();
      return {
        id: orderSnap.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      } as Order;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching order:', error);
    return null;
  }
};

// Get user orders
export const getUserOrders = async (userId: string): Promise<Order[]> => {
  try {
    const ordersRef = collection(db, 'orders');
    const q = query(
      ordersRef,
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const orders: Order[] = [];
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      orders.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      } as Order);
    });
    
    return orders;
  } catch (error) {
    console.error('Error fetching user orders:', error);
    return [];
  }
};

// Update user address
export const updateUserAddress = async (
  userId: string, 
  address: ShippingAddress
): Promise<void> => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      shippingAddress: address,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error('Error updating user address:', error);
    // Don't throw error as this is not critical for order creation
  }
};

// Generate order number
export const generateOrderNumber = (): string => {
  const timestamp = Date.now().toString();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `HAM${timestamp.slice(-6)}${random}`;
};