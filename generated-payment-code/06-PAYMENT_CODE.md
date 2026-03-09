### File: src/services/orderService.ts
```typescript
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
  query,
  where,
  orderBy
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Order, OrderStatus } from '../types/order';

// 而щ젆??李몄“ ?ы띁 (stores/{storeId}/orders)
const getOrderCollection = (storeId: string) => collection(db, 'stores', storeId, 'orders');

// 二쇰Ц ?앹꽦
export async function createOrder(storeId: string, orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) {
  try {
    const docRef = await addDoc(getOrderCollection(storeId), {
      ...orderData,
      status: orderData.status || '?묒닔', // status媛 ?덉쑝硫??ъ슜, ?놁쑝硫?'?묒닔'
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error('二쇰Ц ?앹꽦 ?ㅽ뙣:', error);
    throw error;
  }
}

// 二쇰Ц ?곹깭 蹂寃?export async function updateOrderStatus(storeId: string, orderId: string, status: OrderStatus) {
  try {
    const orderRef = doc(db, 'stores', storeId, 'orders', orderId);
    await updateDoc(orderRef, {
      status,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('二쇰Ц ?곹깭 蹂寃??ㅽ뙣:', error);
    throw error;
  }
}

// 二쇰Ц 痍⑥냼
export async function cancelOrder(storeId: string, orderId: string) {
  try {
    const orderRef = doc(db, 'stores', storeId, 'orders', orderId);
    await updateDoc(orderRef, {
      status: '痍⑥냼' as OrderStatus,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('二쇰Ц 痍⑥냼 ?ㅽ뙣:', error);
    throw error;
  }
}

// 二쇰Ц ??젣 (Hard Delete)
export async function deleteOrder(storeId: string, orderId: string) {
  try {
    const { deleteDoc } = await import('firebase/firestore');
    const orderRef = doc(db, 'stores', storeId, 'orders', orderId);
    await deleteDoc(orderRef);
  } catch (error) {
    console.error('二쇰Ц ??젣 ?ㅽ뙣:', error);
    throw error;
  }
}

// Query ?ы띁 ?⑥닔??export function getUserOrdersQuery(storeId: string, userId: string) {
  return query(
    getOrderCollection(storeId),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );
}

export function getAllOrdersQuery(storeId: string) {
  return query(
    getOrderCollection(storeId),
    orderBy('createdAt', 'desc')
  );
}

export function getOrdersByStatusQuery(storeId: string, status: OrderStatus) {
  return query(
    getOrderCollection(storeId),
    where('status', '==', status),
    orderBy('createdAt', 'desc')
  );
}
```

### File: src/types/global.d.ts
```typescript
export { };

declare global {
    interface Window {
        AUTHNICE?: {
            requestPay: (params: NicepayRequestParams) => void;
        };
    }
}

export interface NicepayRequestParams {
    clientId: string;
    method: string;
    orderId: string;
    amount: number;
    goodsName: string;
    returnUrl: string;
    fnError?: (result: any) => void; // 寃곗젣 ?ㅽ뙣 ??肄쒕갚
    // ?꾩슂??寃쎌슦 異붽? ?꾨뱶 ?뺤쓽
    buyerName?: string;
    buyerEmail?: string;
    buyerTel?: string;
    mallReserved?: string; // ?곸젏 ?덈퉬?뺣낫
}

export interface NicepaySuccessResult {
    resultCode: string;
    resultMsg: string;
    authResultCode: string;
    authResultMsg: string;
    tid: string;
    clientId: string;
    orderId: string;
    amount: number;
    mallReserved?: string;
    authToken: string; // ?뱀씤 ?붿껌 ???꾩슂
    signature: string; // ?꾨?議?寃利?
}

```

### File: src/types/order.ts
```typescript
export interface OrderItem {
  menuId: string;
  name: string;
  price: number;
  quantity: number;
  options?: { name: string; price: number; quantity?: number }[];
  imageUrl?: string;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalPrice: number;
  discountAmount?: number;
  couponId?: string;
  couponName?: string;
  status: OrderStatus;
  address: string;
  phone: string;
  memo?: string;
  paymentType: PaymentType;
  // 寃곗젣 愿???꾨뱶 異붽?
  paymentStatus?: '寃곗젣?湲? | '寃곗젣?꾨즺' | '寃곗젣?ㅽ뙣';
  payment?: {
    pg: string;
    tid?: string;
    amount?: number;
    paidAt?: any;
    error?: string;
    code?: string;
  };
  createdAt: Date;
  updatedAt?: Date;
  reviewed?: boolean;
  reviewRating?: number;
  orderType?: '諛곕떖二쇰Ц' | '?ъ옣二쇰Ц'; // 二쇰Ц ???異붽?
}

export type OrderStatus = '寃곗젣?湲? | '寃곗젣?ㅽ뙣' | '?묒닔' | '?묒닔?꾨즺' | '議곕━以? | '議곕━?꾨즺' | '諛곕떖以? | '?ъ옣?꾨즺' | '?꾨즺' | '痍⑥냼';
export type PaymentType = '?깃껐?? | '留뚮굹?쒖뭅?? | '留뚮굹?쒗쁽湲? | '諛⑸Ц?쒓껐??;

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  '寃곗젣?湲?: '寃곗젣 ?湲?,
  '寃곗젣?ㅽ뙣': '寃곗젣 ?ㅽ뙣',
  '?묒닔': '二쇰Ц ?묒닔',
  '?묒닔?꾨즺': '?묒닔 ?꾨즺',
  '議곕━以?: '議곕━ 以?,
  '議곕━?꾨즺': '議곕━ ?꾨즺',
  '諛곕떖以?: '諛곕떖 以?,
  '?ъ옣?꾨즺': '?ъ옣 ?꾨즺',
  '?꾨즺': '諛곕떖 ?꾨즺',
  '痍⑥냼': '二쇰Ц 痍⑥냼',
};

export const ORDER_STATUS_COLORS: Record<OrderStatus, { bg: string; text: string }> = {
  '寃곗젣?湲?: { bg: 'bg-yellow-100', text: 'text-yellow-700' },
  '寃곗젣?ㅽ뙣': { bg: 'bg-red-100', text: 'text-red-700' },
  '?묒닔': { bg: 'bg-blue-100', text: 'text-blue-700' },
  '?묒닔?꾨즺': { bg: 'bg-indigo-100', text: 'text-indigo-700' },
  '議곕━以?: { bg: 'bg-orange-100', text: 'text-orange-700' },
  '議곕━?꾨즺': { bg: 'bg-amber-100', text: 'text-amber-800' },
  '諛곕떖以?: { bg: 'bg-purple-100', text: 'text-purple-700' },
  '?ъ옣?꾨즺': { bg: 'bg-emerald-100', text: 'text-emerald-700' },
  '?꾨즺': { bg: 'bg-green-100', text: 'text-green-700' },
  '痍⑥냼': { bg: 'bg-gray-100', text: 'text-gray-700' },
};

export const PAYMENT_TYPE_LABELS: Record<PaymentType, string> = {
  '?깃껐??: '??寃곗젣',
  '留뚮굹?쒖뭅??: '留뚮굹??移대뱶 寃곗젣',
  '留뚮굹?쒗쁽湲?: '留뚮굹???꾧툑 寃곗젣',
  '諛⑸Ц?쒓껐??: '諛⑸Ц ??寃곗젣',
};

```

