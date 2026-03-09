### File: src/types/store.ts
```typescript
/**
 * ?곸젏(Store) ????뺤쓽
 * ?⑥씪 ?덉뒪?좊옉 ?깆쓣 ?꾪븳 ?⑥닚?붾맂 援ъ“
 */

export interface Store {
  id: string; // ?⑥씪 臾몄꽌 ID (?? 'store')
  name: string;
  description: string;

  // ?곕씫泥??뺣낫
  phone: string;
  email: string;
  address: string;

  // 釉뚮옖??  logoUrl?: string;
  bannerUrl?: string;
  primaryColor?: string; // 硫붿씤 ?뚮쭏 ?됱긽

  // ?댁쁺 ?뺣낫
  businessHours?: BusinessHours;
  deliveryFee: number;
  minOrderAmount: number;

  // ?ㅼ젙
  settings: StoreSettings;

  // 硫뷀??곗씠??  createdAt: any; // Firestore Timestamp
  updatedAt: any; // Firestore Timestamp

  // 留ㅼ옣 ?쇱떆?뺤? (v3.0 - Top Level)
  isOrderingPaused?: boolean;
  pausedReason?: string;
}

export interface BusinessHours {
  monday?: DayHours;
  tuesday?: DayHours;
  wednesday?: DayHours;
  thursday?: DayHours;
  friday?: DayHours;
  saturday?: DayHours;
  sunday?: DayHours;
}

export interface DayHours {
  open: string; // "09:00"
  close: string; // "22:00"
  closed: boolean; // ?대Т???щ?
}

export interface StoreSettings {
  // 二쇰Ц ?ㅼ젙
  autoAcceptOrders: boolean; // ?먮룞 二쇰Ц ?묒닔
  estimatedDeliveryTime: number; // ?덉긽 諛곕떖 ?쒓컙 (遺?

  // 寃곗젣 ?ㅼ젙
  paymentMethods: PaymentMethod[];

  // ?뚮┝ ?ㅼ젙
  notificationEmail?: string;
  notificationPhone?: string;

  // 湲곕뒫 ?쒖꽦??  enableReviews: boolean;
  enableCoupons: boolean;
  enableNotices: boolean;
  enableEvents: boolean;
  // 諛곕떖 ????ㅼ젙 (v2.0)
  deliverySettings?: DeliverySettings;

  // 留ㅼ옣 ?쇱떆?뺤? (v3.0)
  isOrderingPaused?: boolean;
  pausedReason?: string;
}

export interface DeliverySettings {
  provider: 'manual' | 'barogo' | 'vroong' | 'mesh'; // 'manual' = ?먯껜諛곕떖
  apiKey?: string;
  apiSecret?: string;
  shopId?: string; // ??됱궗痢??곸젏 ID
  webhookUrl?: string; // ??됱궗 -> ???곹깭 ?낅뜲?댄듃??(?먮룞?앹꽦/?쒖떆??
}

export type PaymentMethod = '?깃껐?? | '留뚮굹?쒖뭅?? | '留뚮굹?쒗쁽湲? | '諛⑸Ц?쒓껐??;

/**
 * ?곸젏 ?ㅼ젙 ???곗씠?? */
export interface StoreFormData {
  name: string;
  description: string;
  phone: string;
  email: string;
  address: string;
  deliveryFee: number;
  minOrderAmount: number;
  logoUrl?: string;
  bannerUrl?: string;
  businessHours?: BusinessHours;
  settings?: StoreSettings;
  isOrderingPaused?: boolean;
  pausedReason?: string;
}

export interface UpdateStoreFormData extends StoreFormData {
  primaryColor?: string;
}

```

### File: src/utils/labels.ts
```typescript
/**
 * ?쇰꺼 諛??곸닔 愿由? */

export const ORDER_STATUS_LABELS = {
  '?묒닔': '二쇰Ц ?묒닔',
  '議곕━以?: '議곕━ 以?,
  '諛곕떖以?: '諛곕떖 以?,
  '?꾨즺': '諛곕떖 ?꾨즺',
  '痍⑥냼': '二쇰Ц 痍⑥냼',
} as const;

export const PAYMENT_TYPE_LABELS = {
  '?깃껐??: '??寃곗젣',
  '留뚮굹?쒖뭅??: '留뚮굹??移대뱶 寃곗젣',
  '留뚮굹?쒗쁽湲?: '留뚮굹???꾧툑 寃곗젣',
  '諛⑸Ц?쒓껐??: '諛⑸Ц ??寃곗젣',
} as const;

export const CATEGORY_LABELS = [
  '?멸린硫붾돱',
  '異붿쿇硫붾돱',
  '湲곕낯硫붾돱',
  '?ъ씠?쒕찓??,
  '?뚮즺',
  '二쇰쪟',
] as const;

export const NOTICE_CATEGORIES = [
  '怨듭?',
  '?대깽??,
  '?먭?',
  '?좎씤',
] as const;

export const COUPON_TYPE_LABELS = {
  'percentage': '?좎씤??,
  'fixed': '?좎씤 湲덉븸',
} as const;

export default {
  ORDER_STATUS_LABELS,
  PAYMENT_TYPE_LABELS,
  CATEGORY_LABELS,
  NOTICE_CATEGORIES,
  COUPON_TYPE_LABELS,
};

```

### File: src/utils/orderUtils.test.ts
```typescript
import { describe, it, expect } from 'vitest';
import { getNextStatus } from './orderUtils';
import { Order } from '../types/order';

describe('orderUtils', () => {
    describe('getNextStatus', () => {
        const baseOrder = {
            id: '1',
            userId: 'user1',
            status: '?묒닔',
            totalPrice: 10000,
            createdAt: new Date(),
            items: [],
            storeId: 'store1',
            paymentType: 'card',
            address: 'Seoul',
            phone: '010-0000-0000'
        } as Order;

        it('should return next status for delivery flow', () => {
            const order = { ...baseOrder, orderType: '諛곕떖' };

            expect(getNextStatus({ ...order, status: '?묒닔' })).toBe('?묒닔?꾨즺');
            expect(getNextStatus({ ...order, status: '?묒닔?꾨즺' })).toBe('議곕━以?);
            expect(getNextStatus({ ...order, status: '議곕━以? })).toBe('諛곕떖以?);
            expect(getNextStatus({ ...order, status: '諛곕떖以? })).toBe('?꾨즺');
            expect(getNextStatus({ ...order, status: '?꾨즺' })).toBeNull();
        });

        it('should return next status for pickup flow', () => {
            const order = { ...baseOrder, orderType: '?ъ옣二쇰Ц' };

            expect(getNextStatus({ ...order, status: '?묒닔' })).toBe('?묒닔?꾨즺');
            expect(getNextStatus({ ...order, status: '?묒닔?꾨즺' })).toBe('議곕━以?);
            expect(getNextStatus({ ...order, status: '議곕━以? })).toBe('議곕━?꾨즺'); // ?ъ옣??議곕━?꾨즺 ?덉쓬
            expect(getNextStatus({ ...order, status: '議곕━?꾨즺' })).toBe('?ъ옣?꾨즺');
            expect(getNextStatus({ ...order, status: '?ъ옣?꾨즺' })).toBeNull(); // ?ъ옣?꾨즺媛 ?? or ?꾨즺?
            // AdminOrderManagement.tsx logic: ['?묒닔', '?묒닔?꾨즺', '議곕━以?, '議곕━?꾨즺', '?ъ옣?꾨즺']
            // So '?ъ옣?꾨즺' next is null.
        });

        it('should return null for invalid status', () => {
            const order = { ...baseOrder, status: 'unknown' as any };
            expect(getNextStatus(order)).toBeNull();
        });
    });
});

```

