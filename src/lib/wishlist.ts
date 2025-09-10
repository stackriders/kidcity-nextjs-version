import { db } from './firebase';
import { 
  collection, 
  doc,
  addDoc, 
  deleteDoc,
  getDocs,
  query,
  where,
  orderBy,
  Timestamp
} from 'firebase/firestore';

export interface Wishlist {
  id?: string;
  userId: string;
  productId: string;
  productName: string;
  productPrice: number;
  productImage: string;
  productRating: number;
  addedAt: Date;
}

// Add product to wishlist
export const addToWishlist = async (
  userId: string,
  productId: string,
  productName: string,
  productPrice: number,
  productImage: string,
  productRating: number
): Promise<void> => {
  try {
    // Check if product already exists in wishlist
    const wishlistRef = collection(db, 'wishlist');
    const q = query(
      wishlistRef,
      where('userId', '==', userId),
      where('productId', '==', productId)
    );
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      throw new Error('Product already in wishlist');
    }

    // Add to wishlist
    await addDoc(wishlistRef, {
      userId,
      productId,
      productName,
      productPrice,
      productImage,
      productRating,
      addedAt: Timestamp.now()
    });
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    throw error;
  }
};

// Remove product from wishlist
export const removeFromWishlist = async (userId: string, productId: string): Promise<void> => {
  try {
    const wishlistRef = collection(db, 'wishlist');
    const q = query(
      wishlistRef,
      where('userId', '==', userId),
      where('productId', '==', productId)
    );
    const querySnapshot = await getDocs(q);
    
    querySnapshot.forEach(async (docSnapshot) => {
      await deleteDoc(doc(db, 'wishlist', docSnapshot.id));
    });
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    throw error;
  }
};

// Get user's wishlist
export const getUserWishlist = async (userId: string): Promise<Wishlist[]> => {
  try {
    const wishlistRef = collection(db, 'wishlist');
    const q = query(
      wishlistRef,
      where('userId', '==', userId),
      orderBy('addedAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    const wishlist: Wishlist[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      wishlist.push({
        id: doc.id,
        ...data,
        addedAt: data.addedAt?.toDate() || new Date(),
      } as Wishlist);
    });
    
    return wishlist;
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    return [];
  }
};

// Check if product is in wishlist
export const isInWishlist = async (userId: string, productId: string): Promise<boolean> => {
  try {
    const wishlistRef = collection(db, 'wishlist');
    const q = query(
      wishlistRef,
      where('userId', '==', userId),
      where('productId', '==', productId)
    );
    const querySnapshot = await getDocs(q);
    
    return !querySnapshot.empty;
  } catch (error) {
    console.error('Error checking wishlist:', error);
    return false;
  }
};

// Get wishlist count for user
export const getWishlistCount = async (userId: string): Promise<number> => {
  try {
    const wishlistRef = collection(db, 'wishlist');
    const q = query(wishlistRef, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.size;
  } catch (error) {
    console.error('Error getting wishlist count:', error);
    return 0;
  }
};