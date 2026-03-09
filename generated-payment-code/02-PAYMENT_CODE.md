### File: src/components/admin/Receipt.tsx
```typescript
import { Order } from '../../types/order';
import { Store } from '../../types/store';

interface ReceiptProps {
    order: Order | null;
    store: Store | null;
}

export default function Receipt({ order, store }: ReceiptProps) {
    if (!order) return null;

    // 1. ?좎쭨 ?щ㎎??(YYYY. MM. DD. ?ㅽ썑 h:mm)
    const formatDate = (date: any) => {
        const d = date?.toDate ? date.toDate() : new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0'); // User example uses 12 (no spacing, just number)
        // Actually user example: 25. 12. 10. ?ㅽ썑 01:08
        // Let's match typical Korean format: YYYY. MM. DD. 
        const day = String(d.getDate()).padStart(2, '0');
        const hour = d.getHours();
        const minute = String(d.getMinutes()).padStart(2, '0');
        const ampm = hour >= 12 ? '?ㅽ썑' : '?ㅼ쟾';
        const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;

        // User example uses 2-digit year "25". Let's stick to full year or 2-digit as per preference. 
        // User text example: "2025.12.10."
        return `${year}.${month}.${day}. ${ampm} ${displayHour}:${minute}`;
    };

    // 2. 寃곗젣諛⑹떇 留ㅽ븨
    const getPaymentText = (type: string, isPickup: boolean) => {
        // 諛곕떖: ?깃껐?? 留뚮굹?쒖뭅?? 留뚮굹?쒗쁽湲?
        // ?ъ옣: ?깃껐?? 諛⑸Ц?쒓껐??
        if (type === '留뚮굹?쒖뭅??) return '留뚮굹??移대뱶';
        if (type === '留뚮굹?쒗쁽湲?) return '留뚮굹???꾧툑';
        if (type === '諛⑸Ц?쒓껐??) return '諛⑸Ц ??寃곗젣';
        return '??寃곗젣'; // Default for '?깃껐??
    };

    // 怨꾩궛 濡쒖쭅
    const itemsPrice = order.items.reduce((total, item) => {
        const optionsPrice = item.options?.reduce((optSum, opt) => optSum + (opt.price * (opt.quantity || 1)), 0) || 0;
        return total + ((item.price + optionsPrice) * item.quantity);
    }, 0);

    const discountAmount = order.discountAmount || 0;
    const deliveryFee = order.totalPrice - itemsPrice + discountAmount;

    return (
        <div id="receipt-container">
            <div className="w-[280px] mx-auto bg-white text-black font-mono text-[12px] leading-snug p-2 pb-8">

                {/* ?곸젏 ?뺣낫 */}
                <div className="text-center mb-4">
                    <h1 className="text-xl font-bold mb-1">{store?.name || '?곸젏'}</h1>
                    <p className="mb-0.5">{store?.address || ''}</p>
                    <p>Tel: {store?.phone || ''}</p>
                </div>

                {/* 二쇰Ц ???諛곗? */}
                <div className="text-center mb-2">
                    <span className="inline-block border border-black px-2 py-0.5 font-bold text-sm">
                        [{order.orderType}]
                    </span>
                </div>

                {/* 二쇰Ц 踰덊샇 */}
                <div className="text-center mb-2">
                    <p className="font-bold text-sm">二쇰Ц踰덊샇: {order.id.slice(0, 4).toUpperCase()}</p>
                </div>

                {/* 二쇰Ц 湲곕낯 ?뺣낫 */}
                <div className="mb-2 space-y-0.5">
                    <div className="flex justify-between">
                        <span>?쇱떆</span>
                        <span>{formatDate(order.createdAt)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>寃곗젣</span>
                        <span>{getPaymentText(order.paymentType, order.orderType === '?ъ옣二쇰Ц')}</span>
                    </div>
                </div>

                {/* 怨좉컼 ?뺣낫 */}
                <div className="mb-2 mt-4">
                    <p className="font-bold mb-1">怨좉컼 ?뺣낫</p>
                    {order.orderType === '諛곕떖二쇰Ц' && (
                        <p className="mb-1 break-words">{order.address}</p>
                    )}
                    <p className="mb-1">{order.phone}</p>
                    {/* ?ъ옣二쇰Ц???대쫫, ?꾪솕踰덊샇留??몄텧?몃뜲 ?대쫫???놁쑝誘濡??꾪솕踰덊샇留??몄텧??(諛곕떖?쒖뿏 二쇱냼 ?ы븿) */}
                </div>

                {/* ?붿껌 ?ы빆 */}
                {order.memo && (
                    <div className="mb-2">
                        <p className="font-bold mb-1">?붿껌?ы빆:</p>
                        <p className="break-words">{order.memo}</p>
                    </div>
                )}

                <div className="border-b border-black my-2"></div>

                {/* 硫붾돱 ?ㅻ뜑 */}
                <div className="flex mb-1 font-bold">
                    <span className="flex-1">硫붾돱紐?/span>
                    <span className="w-8 text-center">?섎웾</span>
                    <span className="w-16 text-right">湲덉븸</span>
                </div>

                <div className="border-b border-black mb-2"></div>

                {/* 硫붾돱 由ъ뒪??*/}
                <div className="mb-2">
                    {order.items.map((item, index) => {
                        const optionsPrice = item.options?.reduce((sum, opt) => sum + (opt.price * (opt.quantity || 1)), 0) || 0;
                        const itemTotal = (item.price + optionsPrice) * item.quantity;
                        // Format: 
                        // Item Name    Qty    Price
                        // - Option            Price
                        //                     Total (aligned right)

                        return (
                            <div key={index} className="mb-2">
                                {/* 硫붿씤 硫붾돱 */}
                                <div className="flex items-start mb-0.5">
                                    <span className="flex-1 break-words pr-1">{item.name}</span>
                                    <span className="w-8 text-center">{item.quantity}</span>
                                    <span className="w-16 text-right">{item.price.toLocaleString()}</span>
                                </div>

                                {/* ?듭뀡 由ъ뒪??*/}
                                {item.options && item.options.map((opt, optIdx) => (
                                    <div key={optIdx} className="flex text-gray-800 mb-0.5">
                                        <span className="flex-1 break-words pl-2 text-[11px]">- {opt.name}</span>
                                        <span className="w-8 text-center text-[11px]"></span> {/* ?듭뀡 ?섎웾 ?쒖떆??蹂댄넻 ?앸왂?섍굅???대쫫 ?놁뿉 */}
                                        <span className="w-16 text-right text-[11px]">+{(opt.price * (opt.quantity || 1)).toLocaleString()}</span>
                                    </div>
                                ))}

                                {/* ??ぉ ?뚭퀎 (?듭뀡 ?ы븿 珥앹븸) */}
                                <div className="text-right font-bold mt-1">
                                    {itemTotal.toLocaleString()}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="border-b border-black my-2"></div>

                {/* 湲덉븸 吏묎퀎 */}
                <div className="space-y-1 mb-2">
                    <div className="flex justify-between">
                        <span>二쇰Ц湲덉븸</span>
                        <span>{itemsPrice.toLocaleString()}</span>
                    </div>
                    {deliveryFee > 0 && (
                        <div className="flex justify-between">
                            <span>諛곕떖??/span>
                            <span>+{deliveryFee.toLocaleString()}</span>
                        </div>
                    )}
                    {discountAmount > 0 && (
                        <div className="flex justify-between">
                            <span>?좎씤湲덉븸</span>
                            <span>-{discountAmount.toLocaleString()}</span>
                        </div>
                    )}
                </div>

                <div className="border-b border-black my-2"></div>

                {/* 理쒖쥌 ?⑷퀎 */}
                <div className="flex justify-between text-lg font-bold mb-4">
                    <span>?⑷퀎</span>
                    <span>{order.totalPrice.toLocaleString()}??/span>
                </div>

                <div className="border-b border-black my-4"></div>

                {/* ?명꽣 */}
                <div className="text-center">
                    <p className="mb-1 font-bold">* ?댁슜??二쇱뀛??媛먯궗?⑸땲??*</p>
                    <p className="text-[10px]">Powered by CusCom</p>
                </div>

            </div>
        </div>
    );
}

```

### File: src/data/mockOrders.ts
```typescript
import { Order } from '../types/order';

// This would be replaced with actual Firestore/Supabase data
export const mockOrders: Order[] = [
  {
    id: 'order-1',
    userId: 'user-1',
    items: [
      {
        menuId: '1',
        name: '?뚭퀬湲??援?닔',
        price: 9500,
        quantity: 2,
        options: [{ name: '硫?異붽?', price: 2000 }],
        imageUrl: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800&q=80',
      },
      {
        menuId: '8',
        name: '踰좏듃??而ㅽ뵾',
        price: 4500,
        quantity: 1,
        imageUrl: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=800&q=80',
      },
    ],
    totalPrice: 29500,
    status: '諛곕떖以?,
    address: '?쒖슱??媛뺣궓援??뚰뿤?濡?123',
    phone: '010-1234-5678',
    memo: '臾??욎뿉 ?붿＜?몄슂',
    paymentType: '?깃껐??,
    createdAt: new Date('2024-12-04T12:30:00'),
  },
  {
    id: 'order-2',
    userId: 'user-1',
    items: [
      {
        menuId: '2',
        name: '?대Ъ ?援?닔',
        price: 11000,
        quantity: 1,
        imageUrl: 'https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&q=80',
      },
    ],
    totalPrice: 14000,
    status: '?꾨즺',
    address: '?쒖슱??媛뺣궓援??뚰뿤?濡?123',
    phone: '010-1234-5678',
    paymentType: '留뚮굹?쒖뭅??,
    createdAt: new Date('2024-12-03T18:20:00'),
  },
  {
    id: 'order-3',
    userId: 'user-1',
    items: [
      {
        menuId: '5',
        name: '?붾궓??,
        price: 7000,
        quantity: 2,
        imageUrl: 'https://images.unsplash.com/photo-1559054663-e8fbaa5b6c53?w=800&q=80',
      },
      {
        menuId: '7',
        name: '吏쒖“',
        price: 6000,
        quantity: 1,
        imageUrl: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&q=80',
      },
    ],
    totalPrice: 23000,
    status: '?꾨즺',
    address: '?쒖슱??媛뺣궓援??뚰뿤?濡?123',
    phone: '010-1234-5678',
    paymentType: '留뚮굹?쒗쁽湲?,
    createdAt: new Date('2024-12-01T19:45:00'),
  },
];

```

### File: src/lib/nicepayClient.ts
```typescript
import { NicepayRequestParams } from '../types/global';

const NICEPAY_SCRIPT_URL = 'https://pay.nicepay.co.kr/v1/js/';

/**
 * NICEPAY JS SDK瑜??숈쟻?쇰줈 濡쒕뱶?⑸땲??
 */
export function loadNicepayScript(): Promise<void> {
    return new Promise((resolve, reject) => {
        if (window.AUTHNICE) {
            resolve();
            return;
        }

        const script = document.createElement('script');
        script.src = NICEPAY_SCRIPT_URL;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('NICEPAY Script load failed'));
        document.body.appendChild(script);
    });
}

/**
 * NICEPAY 寃곗젣李쎌쓣 ?몄텧?⑸땲??
 * @param params 寃곗젣 ?붿껌 ?뚮씪誘명꽣
 */
export async function requestNicepayPayment(params: NicepayRequestParams): Promise<void> {
    await loadNicepayScript();

    if (!window.AUTHNICE) {
        throw new Error('NICEPAY SDK SDK not loaded');
    }

    window.AUTHNICE.requestPay({
        ...params,
        method: 'card', // 湲곕낯?곸쑝濡?移대뱶 寃곗젣
    });
}

```

