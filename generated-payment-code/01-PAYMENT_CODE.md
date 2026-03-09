### File: functions/src/nicepay-handlers.ts
```typescript
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import axios from 'axios';

// ??珥덇린??(?대? index.ts?먯꽌 ?몄텧?섏뿀?????덉쑝???덉쟾???꾪빐 諛⑹뼱 肄붾뱶 異붽?)
if (!admin.apps.length) {
    admin.initializeApp();
}

export const nicepayConfirm = functions
    .region('asia-northeast3') // ?쒖슱 由ъ쟾?쇰줈 ?ㅼ젙 (諛고룷 由ъ쟾??留욊쾶 ?섏젙)
    .https.onRequest(async (req, res) => {
        // ?섏씠?ㅽ럹???쒕쾭媛 POST 諛⑹떇?쇰줈 ?몄쬆 寃곌낵瑜?蹂대깂
        const { authResultCode, authResultMsg, tid, authToken, orderId, amount, mallReserved } = req.body;

        // V3?깆쓽 ?대씪?댁뼵??URL (濡쒖뺄 ?뚯뒪????http://localhost:5173 ?ъ슜)
        const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

        // 1. 怨좉컼??寃곗젣李쎌뿉???몄쬆???ㅽ뙣?섍굅??痍⑥냼??寃쎌슦
        if (authResultCode !== '0000') {
            console.warn('寃곗젣 ?몄쬆 ?ㅽ뙣:', authResultMsg);
            res.redirect(`${CLIENT_URL}/checkout?error=${encodeURIComponent(authResultMsg)}`);
            return;
        }

        // 2. ?섏씠?ㅽ럹??API ?뱀씤 ?붿껌???꾪븳 蹂댁븞 ?ㅻ뜑 ?앹꽦
        const clientId = process.env.NICEPAY_CLIENT_ID || '諛쒓툒諛쏆?_?댁쁺/?뚯뒪???대씪?댁뼵?명궎';
        const secretKey = process.env.NICEPAY_SECRET_KEY || '諛쒓툒諛쏆?_?댁쁺/?뚯뒪???쒗겕由욱궎';
        const authHeader = Buffer.from(`${clientId}:${secretKey}`).toString('base64');

        try {
            // 3. ?섏씠?ㅽ럹???쒕쾭濡?理쒖쥌 ?뱀씤 API ?몄텧
            const response = await axios.post(`https://api.nicepay.co.kr/v1/payments/${tid}`, {
                amount: parseInt(amount, 10)
            }, {
                headers: {
                    'Authorization': `Basic ${authHeader}`,
                    'Content-Type': 'application/json'
                }
            });

            const result = response.data;

            // 4. 寃곗젣媛 ?꾨꼍???뱀씤??寃쎌슦
            if (result.resultCode === '0000') {
                const storeId = mallReserved; // ?꾨줎?몄뿉??mallReserved???댁븘 蹂대궦 storeId 異붿텧

                // V3 硫?고뀒?뚰듃 援ъ“: stores/{storeId}/orders/{orderId} ???묎렐?섏뿬 ?곹깭 ?낅뜲?댄듃
                if (storeId && orderId) {
                    const orderRef = admin.firestore().collection(`stores/${storeId}/orders`).doc(orderId);
                    await orderRef.update({
                        status: '?묒닔?湲?, // 寃곗젣?꾨즺吏留????꾨줈?몄뒪???묒닔?湲곕줈 泥섎━?좎닔 ?덉쓬 (?ъ슜???ㅺ퀎??留욎땄)
                        paymentStatus: '寃곗젣?꾨즺',
                        tid: tid,
                        paidAt: admin.firestore.FieldValue.serverTimestamp(),
                        paymentMethod: result.payMethod,
                    });
                }

                // ?깃났 由щ떎?대젆??-> V3??二쇰Ц ?곸꽭(?먮뒗 寃곗젣 ?꾨즺) ?섏씠吏濡??대룞
                res.redirect(`${CLIENT_URL}/orders/${orderId}?status=success`);
            } else {
                // ?뱀씤? ?ㅽ뙣??寃쎌슦 (?붿븸 遺議???
                res.redirect(`${CLIENT_URL}/checkout?error=${encodeURIComponent(result.resultMsg)}`);
            }
        } catch (error: any) {
            console.error('寃곗젣 ?뱀씤 API ?몄텧 ?먮윭:', error.response?.data || error.message);
            // ?뱀씤 ?ㅽ뙣 ???먮룞 留앹랬?뚭? 諛쒖깮?섎뒗 寃쎌슦瑜??鍮꾪븳 ?먮윭 ?섏씠吏 由щ떎?대젆??
            res.redirect(`${CLIENT_URL}/checkout?error=Payment_Approval_Error`);
        }
    });

```

### File: functions/src/scheduled/statsDailyV3.ts
```typescript
import { onSchedule } from "firebase-functions/v2/scheduler";
import * as admin from "firebase-admin";
import { getYesterdayKSTRange } from "../utils/dateKST";

// types (simplified)
interface OrderItem {
    menuId: string;
    name: string;
    price: number;
    quantity: number;
    options?: { price: number; quantity?: number }[];
}
interface Order {
    id: string;
    status: string;
    totalPrice: number;
    items: OrderItem[];
    createdAt: admin.firestore.Timestamp;
}

export const statsDailyV3 = onSchedule({
    schedule: "10 0 * * *", // Every day at 00:10 (Default timezone is often UTC, but usually configured to project region. We'll assume UTC if not specified, 00:10 UTC is 09:10 KST. Wait, user said 00:10 KST. If region is not set, crontab might be UTC. 
    // Better: "every day 00:10" and set region or use explicit timezone if supported by v2.
    // V2 supports timeZone.
    timeZone: "Asia/Seoul",
    region: "asia-northeast3", // Seoul region
}, async (event) => {
    const db = admin.firestore();
    const { startKST, endKST, dateKey } = getYesterdayKSTRange();

    console.log(`[statsDailyV3] Starting aggregation for ${dateKey} (KST)`);

    try {
        const storesSnap = await db.collection("stores").get();
        const batchHandler = new BatchHandler(db);

        for (const storeDoc of storesSnap.docs) {
            const storeId = storeDoc.id;

            // Query Orders
            const ordersRef = db.collection("stores").doc(storeId).collection("orders");
            const ordersSnap = await ordersRef
                .where("createdAt", ">=", startKST)
                .where("createdAt", "<=", endKST)
                .get();

            if (ordersSnap.empty) {
                console.log(`[${storeId}] No orders for ${dateKey}`);
                continue;
            }

            // Aggregation Logic
            let ordersTotal = 0;
            let ordersPaid = 0;
            let ordersCanceled = 0;
            let grossSales = 0;
            const menuStatsMap = new Map<string, { name: string; qty: number; sales: number }>();

            for (const doc of ordersSnap.docs) {
                const order = doc.data() as Order;

                if (order.status === '寃곗젣?湲?) continue; // exclude pending

                ordersTotal++;

                if (order.status === '痍⑥냼') {
                    ordersCanceled++;
                } else {
                    // Paid/Valid (?묒닔, 諛곕떖以? ?꾨즺 etc)
                    ordersPaid++;
                    grossSales += (order.totalPrice || 0);

                    // Menu Stats
                    if (order.items) {
                        order.items.forEach(item => {
                            const itemTotalFn = (item.price + (item.options?.reduce((s, o) => s + (o.price * (o.quantity || 1)), 0) || 0)) * item.quantity;
                            const current = menuStatsMap.get(item.menuId) || { name: item.name, qty: 0, sales: 0 };
                            current.qty += item.quantity;
                            current.sales += itemTotalFn;
                            menuStatsMap.set(item.menuId, current);
                        });
                    }
                }
            }

            const avgOrderValue = ordersPaid > 0 ? Math.round(grossSales / ordersPaid) : 0;
            const cancelRate = (ordersPaid + ordersCanceled) > 0
                ? parseFloat((ordersCanceled / (ordersPaid + ordersCanceled)).toFixed(4))
                : 0;

            // Top Menus
            const topMenus = Array.from(menuStatsMap.entries())
                .map(([menuId, stats]) => ({ menuId, ...stats }))
                .sort((a, b) => b.qty - a.qty) // Sort by Quantity
                .slice(0, 5);

            const statsDoc = {
                dateKey,
                ordersTotal,
                ordersPaid,
                ordersCanceled,
                grossSales,
                avgOrderValue,
                cancelRate,
                topMenus,
                updatedAt: admin.firestore.FieldValue.serverTimestamp(),
            };

            // Save to subcollection
            const statsRef = db.collection("stores").doc(storeId).collection("stats_daily").doc(dateKey);
            await batchHandler.set(statsRef, statsDoc);

            console.log(`[${storeId}] Stats computed: Paid=${ordersPaid}, Sales=${grossSales}`);
        }

        await batchHandler.commit(); // Final commit
        console.log(`[statsDailyV3] Completed for ${dateKey}`);

    } catch (error) {
        console.error("[statsDailyV3] Error:", error);
    }
});

// Simple Helper for Batches (Firestore limit 500)
class BatchHandler {
    private batch: admin.firestore.WriteBatch;
    private count = 0;
    private db: admin.firestore.Firestore;

    constructor(db: admin.firestore.Firestore) {
        this.db = db;
        this.batch = db.batch();
    }

    async set(ref: admin.firestore.DocumentReference, data: any) {
        this.batch.set(ref, data, { merge: true });
        this.count++;
        if (this.count >= 490) {
            await this.commit();
        }
    }

    async commit() {
        if (this.count > 0) {
            await this.batch.commit();
            this.batch = this.db.batch();
            this.count = 0;
        }
    }
}

```

### File: src/App.tsx
```typescript
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import MenuPage from './pages/MenuPage';
import CartPage from './pages/CartPage';
import OrdersPage from './pages/OrdersPage';
import OrderDetailPage from './pages/OrderDetailPage';
import CheckoutPage from './pages/CheckoutPage';
import MyPage from './pages/MyPage';
import StoreSetupWizard from './pages/StoreSetupWizard';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminMenuManagement from './pages/admin/AdminMenuManagement';
import AdminOrderManagement from './pages/admin/AdminOrderManagement';
import AdminCouponManagement from './pages/admin/AdminCouponManagement';
import AdminReviewManagement from './pages/admin/AdminReviewManagement';
import AdminNoticeManagement from './pages/admin/AdminNoticeManagement';
import AdminEventManagement from './pages/admin/AdminEventManagement';
import AdminMemberPage from './pages/admin/AdminMemberPage';
import AdminStatsPage from './pages/admin/AdminStatsPage';
import AdminDailyReportPage from './pages/admin/AdminDailyReportPage';
import AdminStoreSettings from './pages/admin/AdminStoreSettings';
import NoticePage from './pages/NoticePage';
import EventsPage from './pages/EventsPage';
import ReviewBoardPage from './pages/ReviewBoardPage';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { StoreProvider, useStore } from './contexts/StoreContext';
import TopBar from './components/common/TopBar';
import AdminOrderAlert from './components/admin/AdminOrderAlert';
import NicepayReturnPage from './pages/NicepayReturnPage';
import './styles/globals.css';

// Protected Route Component
function RequireAuth({ children, requireAdmin = false }: { children: React.ReactNode; requireAdmin?: boolean }) {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const { store, loading: storeLoading } = useStore();
  const location = useLocation();

  if (authLoading || (requireAdmin && storeLoading)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  // ?곸젏???앹꽦?섏? ?딆? ?곹깭?먯꽌 愿由ъ옄媛 ?묒냽?섎㈃ ?곸젏 ?앹꽦 ?섏씠吏濡?由щ떎?대젆??  if (requireAdmin && isAdmin && !store && !storeLoading) {
    if (location.pathname !== '/store-setup') {
      return <Navigate to="/store-setup" replace />;
    }
  }

  return <>{children}</>;
}

function AppContent() {
  const { user, loading: authLoading } = useAuth();
  const { store, loading: storeLoading } = useStore();

  // ?뚮쭏 ?됱긽 ?곸슜
  React.useEffect(() => {
    if (store?.primaryColor) {
      const root = document.documentElement;
      const primary = store.primaryColor;

      // 硫붿씤 ?됱긽 ?곸슜
      root.style.setProperty('--color-primary-500', primary);

      // 洹몃씪?곗씠???깆쓣 ?꾪븳 ?뚯깮 ?됱긽 ?앹꽦 (媛꾨떒??議곌툑 ???대몢???됱긽?쇰줈 ?ㅼ젙)
      // ?ㅼ젣濡쒕뒗 ???뺢탳???됱긽 ?붾젅???앹꽦 濡쒖쭅???꾩슂?????덉쓬
      root.style.setProperty('--color-primary-600', adjustBrightness(primary, -10));
    }
  }, [store?.primaryColor]);

  // ?곸젏 ?대쫫?쇰줈 ??댄? 蹂寃?  React.useEffect(() => {
    if (store?.name) {
      document.title = store.name;
    } else {
      document.title = 'Simple Delivery App';
    }
  }, [store?.name]);

  // ?붾쾭源? 濡쒕뵫 ?곹깭 ?뺤씤
  if (authLoading || storeLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">濡쒕뵫 以?..</p>
        </div>
      </div>
    );
  }

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50">
        {user && <TopBar />}
        <AdminOrderAlert />
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/menu" element={<RequireAuth><MenuPage /></RequireAuth>} />

          <Route path="/cart" element={<RequireAuth><CartPage /></RequireAuth>} />
          <Route path="/payment/nicepay/return" element={<NicepayReturnPage />} />
          <Route path="/nicepay/return" element={<NicepayReturnPage />} />
          <Route path="/notices" element={<NoticePage />} />
          <Route path="/events" element={<EventsPage />} />

          {/* ... (imports remain the same) */}

          {/* ... inside AppContent routes ... */}
          <Route path="/orders" element={<RequireAuth><OrdersPage /></RequireAuth>} />
          <Route path="/orders/:orderId" element={<RequireAuth><OrderDetailPage /></RequireAuth>} />
          <Route path="/reviews" element={<ReviewBoardPage />} />
          <Route path="/checkout" element={<RequireAuth><CheckoutPage /></RequireAuth>} />

          <Route path="/mypage" element={<RequireAuth><MyPage /></RequireAuth>} />

          {/* Admin Routes */}
          <Route path="/admin" element={<RequireAuth requireAdmin><AdminDashboard /></RequireAuth>} />
          <Route path="/admin/menus" element={<RequireAuth requireAdmin><AdminMenuManagement /></RequireAuth>} />
          <Route path="/admin/orders" element={<RequireAuth requireAdmin><AdminOrderManagement /></RequireAuth>} />
          <Route path="/admin/coupons" element={<RequireAuth requireAdmin><AdminCouponManagement /></RequireAuth>} />
          <Route path="/admin/reviews" element={<RequireAuth requireAdmin><AdminReviewManagement /></RequireAuth>} />
          <Route path="/admin/notices" element={<RequireAuth requireAdmin><AdminNoticeManagement /></RequireAuth>} />
          <Route path="/admin/events" element={<RequireAuth requireAdmin><AdminEventManagement /></RequireAuth>} />
          <Route path="/admin/members" element={<RequireAuth requireAdmin><AdminMemberPage /></RequireAuth>} />
          <Route path="/admin/stats" element={<RequireAuth requireAdmin><AdminStatsPage /></RequireAuth>} />
          <Route path="/admin/daily-reports" element={<RequireAuth requireAdmin><AdminDailyReportPage /></RequireAuth>} />
          <Route path="/admin/store-settings" element={<RequireAuth requireAdmin><AdminStoreSettings /></RequireAuth>} />

          <Route path="/store-setup" element={<RequireAuth requireAdmin><StoreSetupWizard /></RequireAuth>} />
        </Routes>
      </div>
      <Toaster position="bottom-center" richColors duration={2000} />
    </CartProvider>
  );
}

// ?됱긽 諛앷린 議곗젅 ?좏떥由ы떚
function adjustBrightness(hex: string, percent: number) {
  const num = parseInt(hex.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 + (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <StoreProvider>
          <AppContent />
        </StoreProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
```

