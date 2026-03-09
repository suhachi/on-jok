### File: src/pages/admin/AdminOrderManagement.tsx
```typescript
import { useState, useEffect } from 'react';
import { Package, MapPin, Phone, CreditCard, ChevronDown } from 'lucide-react';
import { Order, OrderStatus, ORDER_STATUS_LABELS, ORDER_STATUS_COLORS, PAYMENT_TYPE_LABELS } from '../../types/order';
import { toast } from 'sonner';
import AdminSidebar from '../../components/admin/AdminSidebar';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { useStore } from '../../contexts/StoreContext';
import { useFirestoreCollection } from '../../hooks/useFirestoreCollection';
import { updateOrderStatus, deleteOrder, getAllOrdersQuery } from '../../services/orderService';
import AdminOrderAlert from '../../components/admin/AdminOrderAlert';
import { getNextStatus } from '../../utils/orderUtils';

// ?ы띁 ?⑥닔: Firestore Timestamp 泥섎━瑜??꾪븳 toDate
function toDate(date: any): Date {
  if (date?.toDate) return date.toDate();
  if (date instanceof Date) return date;
  if (typeof date === 'string') return new Date(date);
  return new Date();
}

import Receipt from '../../components/admin/Receipt';

export default function AdminOrderManagement() {
  const { store } = useStore();
  const [filter, setFilter] = useState<OrderStatus | '?꾩껜'>('?꾩껜');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [printOrder, setPrintOrder] = useState<Order | null>(null);

  // Firestore?먯꽌 二쇰Ц 議고쉶 (??젣?섏? ?딆? 二쇰Ц留?
  const { data: allOrders } = useFirestoreCollection<Order>(
    store?.id ? getAllOrdersQuery(store.id) : null
  );

  const filteredOrders = filter === '?꾩껜'
    ? (allOrders || []).filter(order => order.status !== '寃곗젣?湲?)
    : (allOrders || []).filter(order => order.status === filter);

  // ?꾪꽣 ?쒖꽌 ?낅뜲?댄듃 (議곕━?꾨즺, ?ъ옣?꾨즺 異붽?)
  const filters: (OrderStatus | '?꾩껜')[] = ['?꾩껜', '?묒닔', '?묒닔?꾨즺', '議곕━以?, '議곕━?꾨즺', '諛곕떖以?, '?ъ옣?꾨즺', '?꾨즺', '痍⑥냼'];

  // ?몄뇙瑜??꾪븳 Effect Hooks (?곹깭 蹂寃?媛먯? ???ㅽ뻾)
  useEffect(() => {
    if (printOrder) {
      // 1. ?꾩옱 ??댄? ???      const originalTitle = document.title;

      // 2. ?뚯씪紐??앹꽦???꾪븳 ?좎쭨 ?щ㎎??(YYYYMMDD_HHmm_OrderID)
      // Firestore Timestamp vs Date 媛앹껜 ?명솚 泥섎━
      const createdAt = printOrder.createdAt as any;
      let d = createdAt?.toDate ? createdAt.toDate() : new Date(createdAt);

      // Date 媛앹껜媛 ?좏슚?섏? ?딆? 寃쎌슦 ?꾩옱 ?쒓컙?쇰줈 ?泥?      if (isNaN(d.getTime())) {
        d = new Date();
      }

      const dateStr = d.getFullYear() +
        String(d.getMonth() + 1).padStart(2, '0') +
        String(d.getDate()).padStart(2, '0') + '_' +
        String(d.getHours()).padStart(2, '0') +
        String(d.getMinutes()).padStart(2, '0');

      // ?덉쟾???뚯씪紐??앹꽦 (?뱀닔臾몄옄 ?쒓굅)
      const safeId = (printOrder.id || 'unknown').slice(0, 8).replace(/[^a-zA-Z0-9]/g, '');
      const newTitle = `${dateStr}_${safeId}`;

      document.title = newTitle;
      console.log('Printing with title:', newTitle); // ?붾쾭源낆슜

      // 3. ?몄뇙 ?ㅽ뻾
      // 釉뚮씪?곗? ?몄뇙媛 ?앸굹硫?痍⑥냼 ?뱀? 異쒕젰) ?ㅽ뻾???몃뱾??      const handleAfterPrint = () => {
        document.title = originalTitle;
        setPrintOrder(null); // ?곹깭 珥덇린??        window.removeEventListener('afterprint', handleAfterPrint);
      };

      window.addEventListener('afterprint', handleAfterPrint);

      // ?뚮뜑留??뺣낫瑜??꾪븳 吏㏃? 吏?????몄뇙
      const printTimer = setTimeout(() => {
        window.print();
      }, 500);

      // 而댄룷?뚰듃 ?몃쭏?댄듃 ???덉쟾?μ튂
      return () => {
        clearTimeout(printTimer);
        window.removeEventListener('afterprint', handleAfterPrint);
        document.title = originalTitle; // ?뱀떆 紐⑤? ?곹솴 ?鍮?蹂듦뎄
      };
    }
  }, [printOrder]);

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    if (!store?.id) return;
    try {
      await updateOrderStatus(store.id, orderId, newStatus);
      toast.success(`二쇰Ц ?곹깭媛 '${ORDER_STATUS_LABELS[newStatus]}'(??濡?蹂寃쎈릺?덉뒿?덈떎`);

      // 二쇰Ц ?묒닔(?뺤씤) ???곸닔利??먮룞 異쒕젰
      // 2024-12-10: ?ъ슜???붿껌?쇰줈 ?먮룞 異쒕젰 湲곕뒫 ?ㅼ떆 ?쒖꽦??      if (newStatus === '?묒닔?꾨즺') {
        const targetOrder = allOrders?.find(o => o.id === orderId);
        if (targetOrder) {
          // ?몄뇙???곹깭 ?낅뜲?댄듃 -> useEffect ?몃━嫄?          setPrintOrder(targetOrder);
        }
      }

    } catch (error: any) {
      console.error(error);
      if (error?.code === 'permission-denied') {
        toast.error('二쇰Ц ?곹깭瑜?蹂寃쏀븷 沅뚰븳???놁뒿?덈떎.');
      } else {
        toast.error('二쇰Ц ?곹깭 蹂寃쎌뿉 ?ㅽ뙣?덉뒿?덈떎');
      }
    }
  };

  const handleDelete = async (orderId: string) => {
    if (!store?.id) return;
    if (!window.confirm('?뺣쭚濡???二쇰Ц????젣?섏떆寃좎뒿?덇퉴? \n??젣??二쇰Ц? 蹂듦뎄?????놁쑝硫? 怨좉컼??二쇰Ц ?댁뿭?먯꽌???щ씪吏묐땲??')) return;

    try {
      await deleteOrder(store.id, orderId);
      toast.success('二쇰Ц????젣?섏뿀?듬땲??);
    } catch (error) {
      console.error(error);
      toast.error('二쇰Ц ??젣???ㅽ뙣?덉뒿?덈떎');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar className="print:hidden" />

      {/* ?곸닔利?而댄룷?뚰듃 (?됱냼???④?, ?몄뇙 ?쒖뿉留??깆옣) */}
      <Receipt order={printOrder} store={store} />

      <main className="flex-1 p-8 print:hidden">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl mb-2">
              <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                二쇰Ц 愿由?              </span>
            </h1>
            <p className="text-gray-600">珥?{filteredOrders.length}媛쒖쓽 二쇰Ц</p>
          </div>

          {/* Status Filter */}
          <div className="mb-6 flex space-x-2 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {filters.map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`
                  px-4 py-2 rounded-lg whitespace-nowrap transition-all flex-shrink-0
                  ${filter === status
                    ? 'gradient-primary text-white shadow-md'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-500'
                  }
                `}
              >
                {status === '?꾩껜' ? '?꾩껜' : ORDER_STATUS_LABELS[status]}
                <span className="ml-2 text-xs opacity-75">
                  ({(allOrders || []).filter(o => status === '?꾩껜' || o.status === status).length})
                </span>
              </button>
            ))}
          </div>

          {/* Orders List */}
          <div className="space-y-4">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  isExpanded={expandedOrder === order.id}
                  onToggleExpand={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                  onStatusChange={handleStatusChange}
                  onDelete={handleDelete}
                  onPrint={() => setPrintOrder(order)}
                />
              ))
            ) : (
              <Card className="text-center py-16">
                <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-xl text-gray-600">二쇰Ц???놁뒿?덈떎</p>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

interface OrderCardProps {
  order: Order;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onStatusChange: (orderId: string, newStatus: OrderStatus) => void;
  onDelete: (orderId: string) => void;
  onPrint: () => void;
}

function OrderCard({ order, isExpanded, onToggleExpand, onStatusChange, onDelete, onPrint }: OrderCardProps) {
  const statusColor = ORDER_STATUS_COLORS[order.status as OrderStatus];
  // getNextStatus ?낅뜲?댄듃 (order 媛앹껜 ?꾨떖)
  const nextStatus = getNextStatus(order);
  const [Printer] = useState(() => import('lucide-react').then(mod => mod.Printer)); // Dynamic import or just use lucide-react if already imported

  return (
    <Card padding="none" className="overflow-hidden">
      {/* Header */}
      <div
        className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={onToggleExpand}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4 flex-1">
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${statusColor.bg} flex-shrink-0`}>
              <Package className={`w-7 h-7 ${statusColor.text}`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-3 mb-2">
                <h3 className="font-bold text-gray-900">二쇰Ц #{order.id.slice(0, 8)}</h3>
                <Badge
                  variant={
                    order.status === '?꾨즺' ? 'success' :
                      order.status === '痍⑥냼' ? 'danger' :
                        order.status === '諛곕떖以? ? 'secondary' :
                          'primary'
                  }
                >
                  {ORDER_STATUS_LABELS[order.status as OrderStatus]}
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mb-1">
                {order.items.length}媛??곹뭹 쨌 {order.totalPrice.toLocaleString()}??              </p>
              <p className="text-xs text-gray-500">
                {toDate(order.createdAt).toLocaleString('ko-KR')}
              </p>
            </div>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          />
        </div>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="px-6 pb-6 pt-0 border-t border-gray-200 space-y-4 animate-fade-in">
          {/* Order Items */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">二쇰Ц ?곹뭹</h4>
            <div className="space-y-2">
              {order.items.map((item, idx) => {
                const optionsPrice = item.options?.reduce((sum, opt) => sum + (opt.price * (opt.quantity || 1)), 0) || 0;
                return (
                  <div key={idx} className="flex items-start justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-start space-x-3 flex-1">
                      {item.imageUrl && (
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                          <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-gray-900">{item.name}</p>
                        {item.options && item.options.length > 0 && (
                          <p className="text-xs text-gray-600">
                            {item.options.map(opt => `${opt.name}${(opt.quantity || 1) > 1 ? ` x${opt.quantity}` : ''} (+${(opt.price * (opt.quantity || 1)).toLocaleString()}??`).join(', ')}
                          </p>
                        )}
                        <p className="text-sm text-gray-600 mt-1">?섎웾: {item.quantity}媛?/p>
                      </div>
                    </div>
                    <p className="font-semibold text-gray-900 flex-shrink-0 ml-4">
                      {((item.price + optionsPrice) * item.quantity).toLocaleString()}??                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Delivery Info */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">諛곕떖 ?뺣낫</h4>
              <div className="space-y-2">
                <div className="flex items-start space-x-2 text-sm">
                  <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{order.address}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span className="text-gray-700">{order.phone}</span>
                </div>
                {order.memo && (
                  <div className="p-2 bg-yellow-50 border border-yellow-200 rounded text-sm text-gray-700">
                    ?뮠 {order.memo}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900">寃곗젣 ?뺣낫</h4>
              <div className="flex items-center space-x-2 text-sm">
                <CreditCard className="w-4 h-4 text-gray-400" />
                <span className="text-gray-700">{PAYMENT_TYPE_LABELS[order.paymentType]}</span>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">珥?寃곗젣 湲덉븸</p>
                <p className="text-2xl font-bold text-blue-600">{order.totalPrice.toLocaleString()}??/p>
              </div>
            </div>
          </div>

          {/* Status Actions */}
          <div className="pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                {order.status !== '?꾨즺' && order.status !== '痍⑥냼' && order.status !== '?ъ옣?꾨즺' && (
                  <>
                    <h4 className="font-semibold text-gray-900 mb-3">二쇰Ц ?곹깭 蹂寃?/h4>
                    <div className="flex gap-2">
                      {nextStatus && (
                        <Button
                          onClick={() => onStatusChange(order.id, nextStatus)}
                        >
                          ?ㅼ쓬 ?④퀎濡?({ORDER_STATUS_LABELS[nextStatus]})
                        </Button>
                      )}

                      <Button
                        variant="danger"
                        onClick={() => {
                          if (window.confirm('二쇰Ц??痍⑥냼?섏떆寃좎뒿?덇퉴?')) {
                            onStatusChange(order.id, '痍⑥냼');
                          }
                        }}
                      >
                        痍⑥냼
                      </Button>
                    </div>
                  </>
                )}
              </div>

              {/* ?곸닔利??몄뇙 踰꾪듉 (??긽 ?쒖떆 or ?뱀젙 ?곹깭?먯꽌留? ?ъ슜?먮뒗 洹몃깷 '異붽?'?쇨퀬 ?? */}
              <div className="flex items-end">
                <Button
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    onPrint();
                  }}
                  className="flex items-center gap-2"
                >
                  {/* ?꾩씠肄섏? ?곷떒 import ?ъ슜 */}
                  <span>?뼥截??곸닔利??몄뇙</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Delete Button for Completed/Cancelled Orders */}
          {(order.status === '?꾨즺' || order.status === '痍⑥냼' || order.status === '?ъ옣?꾨즺') && (
            <div className="pt-4 border-t border-gray-200 text-right">
              <Button
                variant="outline"
                onClick={() => onDelete(order.id)}
                className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
              >
                二쇰Ц ?댁뿭 ??젣
              </Button>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}
```

### File: src/pages/CheckoutPage.tsx
```typescript
/// <reference types="vite/client" />
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Phone, CreditCard, Wallet, DollarSign, ArrowLeft, CheckCircle2, ShoppingBag, Package, Ticket, X, Search } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useStore } from '../contexts/StoreContext';
import { toast } from 'sonner';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import AddressSearchInput from '../components/common/AddressSearchInput';
import { Coupon } from '../types/coupon';
import { createOrder } from '../services/orderService';
import { useCoupon } from '../services/couponService';
import { OrderStatus } from '../types/order';
import { useFirestoreCollection } from '../hooks/useFirestoreCollection';
import { getCouponsPath } from '../lib/firestorePaths';
import { collection } from 'firebase/firestore';
import { db } from '../lib/firebase';

type OrderType = '諛곕떖二쇰Ц' | '?ъ옣二쇰Ц';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const { store } = useStore();
  const storeId = store?.id;

  // ATOM-132: 留ㅼ옣 ?쇱떆?뺤? 泥댄겕
  if (store?.isOrderingPaused) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center py-12">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <span className="text-4xl">??/span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">?꾩옱 二쇰Ц ?묒닔媛 以묐떒?섏뿀?듬땲??/h2>
          <p className="text-gray-600 mb-8 whitespace-pre-wrap">
            {store.pausedReason || "留ㅼ옣 ?ъ젙?쇰줈 ?명빐 ?좎떆 二쇰Ц??諛쏆쓣 ???놁뒿?덈떎."}
            <br />
            <span className="text-sm text-gray-500 mt-2 block">?좎떆 ???ㅼ떆 ?댁슜?댁＜?몄슂.</span>
          </p>
          <Button onClick={() => navigate('/')} fullWidth size="lg">
            ?덉쑝濡??뚯븘媛湲?          </Button>
        </Card>
      </div>
    );
  }

  // Firestore?먯꽌 荑좏룿 議고쉶
  const { data: coupons } = useFirestoreCollection<Coupon>(
    storeId ? collection(db, getCouponsPath(storeId)) : null
  );

  const [orderType, setOrderType] = useState<OrderType>('諛곕떖二쇰Ц');
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
  // const [isAddressSearchOpen, setIsAddressSearchOpen] = useState(false); // Refactored to component inside AddressSearchInput
  const [formData, setFormData] = useState({
    address: '',
    detailAddress: '',
    phone: '',
    memo: '',
    paymentType: '?깃껐?? as '?깃껐?? | '留뚮굹?쒖뭅?? | '留뚮굹?쒗쁽湲? | '諛⑸Ц?쒓껐??,
  });

  // ?ъ슜???뺣낫(?꾪솕踰덊샇) ?먮룞 ?낅젰
  useEffect(() => {
    if (user?.phone && !formData.phone) {
      setFormData(prev => ({ ...prev, phone: user.phone! }));
    }
  }, [user]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // 二쇰Ц ??낆뿉 ?곕Ⅸ 諛곕떖鍮?怨꾩궛
  const deliveryFee = orderType === '諛곕떖二쇰Ц' ? 3000 : 0;

  // ?ъ슜 媛?ν븳 荑좏룿 ?꾪꽣留?  // Firestore Timestamp 泥섎━瑜??꾪븳 ?ы띁 ?⑥닔
  const toDate = (date: any): Date => {
    if (date?.toDate) return date.toDate(); // Firestore Timestamp
    if (date instanceof Date) return date;
    if (typeof date === 'string') return new Date(date);
    return new Date(); // Fallback
  };

  // ?ъ슜 媛?ν븳 荑좏룿 ?꾪꽣留?  const availableCoupons = (coupons || []).filter(coupon => {
    const now = new Date();
    const itemsTotal = getTotalPrice();
    const validFrom = toDate(coupon.validFrom);
    const validUntil = toDate(coupon.validUntil);
    const minOrderAmount = Number(coupon.minOrderAmount) || 0;

    // 留뚮즺?쇱쓽 寃쎌슦 ?대떦 ?좎쭨??23:59:59源뚯? ?좏슚?섎룄濡??ㅼ젙 (?좏깮?ы빆, ?꾩슂??
    // ?ш린?쒕뒗 ?⑥닚 ?쒓컙 鍮꾧탳

    const isValidPeriod = validFrom <= now && validUntil >= now;
    const isValidAmount = itemsTotal >= minOrderAmount;
    const isNotUsed = !coupon.usedByUserIds?.includes(user?.id || '');
    // 諛쒓툒 ????뺤씤: 吏?뺣맂 ?ъ슜?먭? ?녾굅???꾩껜 諛쒓툒), ?대떦 ?ъ슜?먯뿉寃?吏?뺣맂 寃쎌슦
    const isAssignedToUser = !coupon.assignedUserId || coupon.assignedUserId === user?.id;

    // ?붾쾭源낆쓣 ?꾪빐 濡쒓렇 異붽? (?꾩슂???쒓굅)
    // console.log(`Coupon ${coupon.name}: Active=${coupon.isActive}, Period=${isValidPeriod}, Amount=${isValidAmount}, Assigned=${isAssignedToUser}`);

    return coupon.isActive && isValidPeriod && isValidAmount && isNotUsed && isAssignedToUser;
  });

  // 荑좏룿 ?좎씤 湲덉븸 怨꾩궛
  const calculateDiscount = (coupon: Coupon | null): number => {
    if (!coupon) return 0;

    const itemsTotal = getTotalPrice();

    if (coupon.discountType === 'percentage') {
      const discount = Math.floor(itemsTotal * (coupon.discountValue / 100));
      return coupon.maxDiscountAmount
        ? Math.min(discount, coupon.maxDiscountAmount)
        : discount;
    } else {
      return coupon.discountValue;
    }
  };

  const discountAmount = calculateDiscount(selectedCoupon);
  const finalTotal = getTotalPrice() + deliveryFee - discountAmount;

  // 二쇰Ц ??낆뿉 ?곕Ⅸ 寃곗젣 諛⑸쾿
  const paymentTypes = orderType === '諛곕떖二쇰Ц'
    ? [
      { value: '?깃껐??, label: '??寃곗젣', icon: <CreditCard className="w-5 h-5" /> },
      { value: '留뚮굹?쒖뭅??, label: '留뚮굹??移대뱶', icon: <CreditCard className="w-5 h-5" /> },
      { value: '留뚮굹?쒗쁽湲?, label: '留뚮굹???꾧툑', icon: <Wallet className="w-5 h-5" /> },
    ]
    : [
      { value: '?깃껐??, label: '??寃곗젣', icon: <CreditCard className="w-5 h-5" /> },
      { value: '諛⑸Ц?쒓껐??, label: '諛⑸Ц??寃곗젣', icon: <DollarSign className="w-5 h-5" /> },
    ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!storeId) {
      toast.error('?곸젏 ?뺣낫瑜?李얠쓣 ???놁뒿?덈떎');
      return;
    }

    if (!user) {
      toast.error('濡쒓렇?몄씠 ?꾩슂?⑸땲??);
      navigate('/login');
      return;
    }

    // 諛곕떖二쇰Ц 寃利?    if (orderType === '諛곕떖二쇰Ц' && (!formData.address || !formData.phone)) {
      toast.error('諛곕떖 二쇱냼? ?곕씫泥섎? ?낅젰?댁＜?몄슂');
      return;
    }

    // ?ъ옣二쇰Ц 寃利?    if (orderType === '?ъ옣二쇰Ц' && !formData.phone) {
      toast.error('?곕씫泥섎? ?낅젰?댁＜?몄슂');
      return;
    }

    if (getTotalPrice() < 10000) {
      toast.error('理쒖냼 二쇰Ц 湲덉븸? 10,000?먯엯?덈떎');
      return;
    }

    setIsSubmitting(true);

    try {
      // 寃곗젣 ??낆뿉 ?곕Ⅸ 珥덇린 ?곹깭 ?ㅼ젙
      // ?깃껐?? '寃곗젣?湲? -> PG 寃곗젣 ??'?묒닔'濡?蹂寃?(?쒕쾭)
      // 洹???留뚮굹??寃곗젣 ??: 諛붾줈 '?묒닔' ?곹깭濡??앹꽦
      const initialStatus: OrderStatus = formData.paymentType === '?깃껐?? ? '寃곗젣?湲? : '?묒닔';

      const pendingOrderData = {
        userId: user.id,
        userDisplayName: user.displayName || '?ъ슜??,
        items,
        orderType,
        itemsPrice: getTotalPrice(),
        deliveryFee,
        discountAmount,
        totalPrice: finalTotal,
        address: `${formData.address} ${formData.detailAddress}`.trim(),
        phone: formData.phone,
        memo: formData.memo,
        paymentType: formData.paymentType,
        couponId: selectedCoupon?.id || undefined,
        couponName: selectedCoupon?.name || undefined,
        adminDeleted: false,
        reviewed: false,
        paymentStatus: '寃곗젣?湲? as const, // 寃곗젣 ?꾨즺 ?щ?? 蹂꾧컻
      };

      // 1. 二쇰Ц ?앹꽦 (珥덇린 ?곹깭 ?ы븿)
      const orderId = await createOrder(storeId, {
        ...pendingOrderData,
        status: initialStatus
      });

      // 2. 荑좏룿 ?ъ슜 泥섎━ (二쇰Ц ?앹꽦 ?깃났 ??
      if (selectedCoupon && storeId && user?.id) {
        try {
          await useCoupon(storeId, selectedCoupon.id, user.id);
        } catch (couponError) {
          console.error('Failed to use coupon, rolling back order:', couponError);
          // 荑좏룿 泥섎━ ?ㅽ뙣 ??二쇰Ц ??젣 (濡ㅻ갚)
          // ?꾩떆濡?deleteDoc??吏곸젒 ?ъ슜?섍굅??cancelOrder濡??泥?媛?ν븯吏留? ?꾩삁 ??젣?섎뒗 寃껋씠 留욎쓬.
          // ?ш린?쒕뒗 ?먮윭瑜??섏졇???꾨옒 catch 釉붾줉?쇰줈 ?대룞?쒗궎?? 洹??꾩뿉 ??젣 濡쒖쭅 ?꾩슂.
          // createOrder媛 ?깃났?덉쑝誘濡?orderId媛 議댁옱??

          // ?숈쟻 import濡?deleteDoc ??媛?몄???泥섎━?섍린 蹂대떎?? ?쇰떒? ?먮윭 硫붿떆吏 紐낇솗???섍퀬
          // ?ъ슜?먯뿉寃?'二쇰Ц ?ㅽ뙣 (荑좏룿 ?ㅻ쪟)' ?뚮┝. 
          // ?섏?留?以묐났 二쇰Ц 諛⑹?瑜??꾪빐 ?ш린????젣 api ?몄텧???댁긽?곸엫.
          // 媛꾨떒?덈뒗: ?먮윭瑜?throw?섍퀬, ?ъ슜?먭? ?ㅼ떆 ?쒕룄?섍쾶 ?? 
          // ?섏?留??대? ?앹꽦??二쇰Ц???⑤뒗寃?臾몄젣.

          // ?닿껐梨? 二쇰Ц ?앹꽦 ??荑좏룿 ?ъ슜???꾨땲?? ?몃옖??뀡?쇰줈 臾띕뒗寃?踰좎뒪?몄?留?
          // Firestore ?대씪?댁뼵??SDK?먯꽌 ?쒕줈 ?ㅻⅨ 而щ젆??二쇰Ц/荑좏룿) ?몃옖??뀡? 媛??
          // ?섏?留?吏湲?援ъ“??蹂듭옟?섎?濡? 濡ㅻ갚 肄붾뱶瑜?異붽?.

          const { doc, deleteDoc } = await import('firebase/firestore');
          const { db } = await import('../lib/firebase');
          await deleteDoc(doc(db, 'stores', storeId, 'orders', orderId));

          throw new Error('荑좏룿 ?곸슜???ㅽ뙣?섏뿬 二쇰Ц??痍⑥냼?섏뿀?듬땲??');
        }
      }

      // 3. 寃곗젣 ?섎떒??'?깃껐????寃쎌슦 NICEPAY ?몄텧
      if (formData.paymentType === '?깃껐??) {
        const clientId = import.meta.env.VITE_NICEPAY_CLIENT_ID;
        if (!clientId) {
          toast.error('寃곗젣 ?쒖뒪?쒖씠 ?꾩쭅 ?ㅼ젙?섏? ?딆븯?듬땲?? 愿由ъ옄?먭쾶 臾몄쓽?섏꽭??');
          setIsSubmitting(false);
          return;
        }

        const { requestNicepayPayment } = await import('../lib/nicepayClient');

        await requestNicepayPayment({
          clientId: import.meta.env.VITE_NICEPAY_CLIENT_ID,
          method: 'card',
          orderId: orderId,
          amount: finalTotal,
          goodsName: items.length > 1 ? `${items[0].name} ??${items.length - 1}嫄? : items[0].name,
          buyerName: user.displayName || '怨좉컼',
          buyerEmail: user.email || '',
          buyerTel: formData.phone,
          returnUrl: import.meta.env.VITE_NICEPAY_RETURN_URL || `${window.location.origin}/nicepay/return`,
        });

      } else {
        // 留뚮굹??寃곗젣??寃쎌슦: ?대? '?묒닔' ?곹깭濡??앹꽦?섏뿀?쇰?濡?異붽? ?낅뜲?댄듃 遺덊븘??        clearCart();
        toast.success('二쇰Ц???묒닔?섏뿀?듬땲?? ?럦');
        navigate('/orders');
      }
    } catch (error) {
      console.error('Order creation error:', error);
      toast.error('二쇰Ц 泥섎━ 以??ㅻ쪟媛 諛쒖깮?덉뒿?덈떎');
      setIsSubmitting(false);
    }
    // finally: ?깃껐???쒖뿉??由щ떎?대젆?명븯誘濡?finally?먯꽌 submitting??false濡??뚮━硫??덈맆 ?섎룄 ?덉쓬.
    // ?섏?留??먮윭 諛쒖깮 ?쒖뿉??爰쇱빞 ?? isSubmitting ?곹깭 愿由ш? 以묒슂.
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/cart')}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            ?λ컮援щ땲濡??뚯븘媛湲?          </button>
          <h1 className="text-3xl mb-2">
            <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
              二쇰Ц?섍린
            </span>
          </h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Order Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* 二쇰Ц ????좏깮 */}
              <Card>
                <h2 className="text-xl font-bold text-gray-900 mb-4">二쇰Ц 諛⑸쾿</h2>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setOrderType('諛곕떖二쇰Ц');
                      setFormData({ ...formData, paymentType: '?깃껐?? });
                    }}
                    className={`
                      flex flex-col items-center justify-center p-6 rounded-lg border-2 transition-all
                      ${orderType === '諛곕떖二쇰Ц'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }
                    `}
                  >
                    <ShoppingBag className="w-8 h-8 mb-2" />
                    <span className="font-bold">諛곕떖二쇰Ц</span>
                    <span className="text-xs mt-1">諛곕떖鍮?3,000??/span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setOrderType('?ъ옣二쇰Ц');
                      setFormData({ ...formData, paymentType: '?깃껐??, address: '' });
                    }}
                    className={`
                      flex flex-col items-center justify-center p-6 rounded-lg border-2 transition-all
                      ${orderType === '?ъ옣二쇰Ц'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }
                    `}
                  >
                    <Package className="w-8 h-8 mb-2" />
                    <span className="font-bold">?ъ옣二쇰Ц</span>
                    <span className="text-xs mt-1">諛곕떖鍮??놁쓬</span>
                  </button>
                </div>
              </Card>

              {/* 二쇰Ц ?뺣낫 ?낅젰 */}
              <Card>
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  {orderType === '諛곕떖二쇰Ц' ? (
                    <>
                      <MapPin className="w-6 h-6 mr-2 text-blue-600" />
                      諛곕떖 ?뺣낫
                    </>
                  ) : (
                    <>
                      <Phone className="w-6 h-6 mr-2 text-blue-600" />
                      ?ъ옣 ?뺣낫
                    </>
                  )}
                </h2>
                <div className="space-y-4">
                  {orderType === '諛곕떖二쇰Ц' && (
                    <div className="space-y-2">
                      <AddressSearchInput
                        label="諛곕떖 二쇱냼"
                        value={formData.address}
                        onChange={(address) => setFormData({ ...formData, address })}
                        required
                        className="mb-2"
                      />

                      {formData.address && (
                        <div className="animate-fade-in">
                          <Input
                            placeholder="?곸꽭 二쇱냼瑜??낅젰?댁＜?몄슂 (?? 101??101??"
                            value={formData.detailAddress}
                            onChange={(e) => setFormData({ ...formData, detailAddress: e.target.value })}
                            required
                          />
                        </div>
                      )}
                    </div>
                  )}
                  <Input
                    label="?곕씫泥?
                    type="tel"
                    placeholder="010-1234-5678"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    icon={<Phone className="w-5 h-5" />}
                    required
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      ?붿껌?ы빆 (?좏깮)
                    </label>
                    <textarea
                      placeholder={orderType === '諛곕떖二쇰Ц' ? '諛곕떖 ???붿껌?ы빆???낅젰?댁＜?몄슂' : '?ъ옣 ???붿껌?ы빆???낅젰?댁＜?몄슂'}
                      value={formData.memo}
                      onChange={(e) => setFormData({ ...formData, memo: e.target.value })}
                      className="w-full px-4 py-2.5 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-gray-400 resize-none"
                      rows={3}
                    />
                  </div>
                </div>
              </Card>

              {/* 寃곗젣 諛⑸쾿 ?좏깮 */}
              <Card>
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <CreditCard className="w-6 h-6 mr-2 text-blue-600" />
                  寃곗젣 諛⑸쾿
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {paymentTypes.map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentType: type.value as any })}
                      className={`
                        flex items-center justify-center space-x-2 p-4 rounded-lg border-2 transition-all
                        ${formData.paymentType === type.value
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                        }
                      `}
                    >
                      {type.icon}
                      <span className="font-medium">{type.label}</span>
                    </button>
                  ))}
                </div>
              </Card>

              {/* 荑좏룿 ?곸슜 */}
              <Card>
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <Ticket className="w-6 h-6 mr-2 text-orange-600" />
                    荑좏룿 ?곸슜
                  </div>
                  {selectedCoupon && (
                    <button
                      type="button"
                      onClick={() => setSelectedCoupon(null)}
                      className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1"
                    >
                      <X className="w-4 h-4" />
                      荑좏룿 痍⑥냼
                    </button>
                  )}
                </h2>

                {selectedCoupon && (
                  <div className="mb-4 p-4 bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-300 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold text-orange-900">{selectedCoupon.name}</p>
                        <p className="text-sm text-orange-700">
                          {selectedCoupon.discountType === 'percentage'
                            ? `${selectedCoupon.discountValue}% ?좎씤`
                            : `${selectedCoupon.discountValue.toLocaleString()}???좎씤`}
                        </p>
                      </div>
                      <p className="text-xl font-bold text-orange-600">
                        -{discountAmount.toLocaleString()}??                      </p>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  {availableCoupons.length > 0 ? (
                    <>
                      {availableCoupons.map(coupon => (
                        <button
                          key={coupon.id}
                          type="button"
                          onClick={() => setSelectedCoupon(coupon)}
                          className={`
                            w-full p-4 rounded-lg border-2 transition-all text-left
                            ${selectedCoupon?.id === coupon.id
                              ? 'border-orange-500 bg-orange-50'
                              : 'border-gray-200 hover:border-orange-300 bg-white hover:bg-orange-50/50'
                            }
                          `}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Ticket className={`w-5 h-5 ${selectedCoupon?.id === coupon.id ? 'text-orange-600' : 'text-gray-400'}`} />
                              <div>
                                <p className={`font-bold ${selectedCoupon?.id === coupon.id ? 'text-orange-900' : 'text-gray-900'}`}>
                                  {coupon.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                  理쒖냼 二쇰Ц {coupon.minOrderAmount.toLocaleString()}??쨌 {' '}
                                  {toDate(coupon.validUntil).toLocaleDateString('ko-KR')}源뚯?
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className={`font-bold ${selectedCoupon?.id === coupon.id ? 'text-orange-600' : 'text-gray-900'}`}>
                                {coupon.discountType === 'percentage'
                                  ? `${coupon.discountValue}%`
                                  : `${coupon.discountValue.toLocaleString()}??}
                              </p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </>
                  ) : (
                    <div className="text-center py-6 text-gray-500">
                      <Ticket className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                      <p className="text-sm">?ъ슜 媛?ν븳 荑좏룿???놁뒿?덈떎</p>
                      <p className="text-xs text-gray-400 mt-1">
                        理쒖냼 二쇰Ц 湲덉븸???뺤씤?댁＜?몄슂
                      </p>
                    </div>
                  )}
                </div>
              </Card>

              {/* 二쇰Ц ?곹뭹 ?붿빟 */}
              <Card>
                <h2 className="text-xl font-bold text-gray-900 mb-4">二쇰Ц ?곹뭹</h2>
                <div className="space-y-3">
                  {items.map((item) => {
                    const optionsPrice = item.options?.reduce((sum, opt) => sum + (opt.price * (opt.quantity || 1)), 0) || 0;
                    return (
                      <div key={item.id} className="flex justify-between items-start py-2 border-b border-gray-100 last:border-0">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{item.name}</p>
                          {item.options && item.options.length > 0 && (
                            <p className="text-sm text-gray-600">
                              {item.options.map(opt => `${opt.name}${(opt.quantity || 1) > 1 ? ` x${opt.quantity}` : ''}`).join(', ')}
                            </p>
                          )}
                          <p className="text-sm text-gray-600">?섎웾: {item.quantity}媛?/p>
                        </div>
                        <p className="font-semibold text-gray-900">
                          {((item.price + optionsPrice) * item.quantity).toLocaleString()}??                        </p>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </div>

            {/* 二쇰Ц ?붿빟 */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 mb-4">寃곗젣 湲덉븸</h2>

                <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex items-center justify-between text-gray-600">
                    <span>?곹뭹 湲덉븸</span>
                    <span>{getTotalPrice().toLocaleString()}??/span>
                  </div>
                  <div className="flex items-center justify-between text-gray-600">
                    <span>諛곕떖鍮?/span>
                    <span className={deliveryFee === 0 ? 'text-green-600 font-medium' : ''}>
                      {deliveryFee === 0 ? '臾대즺' : `${deliveryFee.toLocaleString()}??}
                    </span>
                  </div>
                  {selectedCoupon && (
                    <div className="flex items-center justify-between text-gray-600">
                      <span>?좎씤 湲덉븸</span>
                      <span className="text-red-600 font-medium">
                        {discountAmount.toLocaleString()}??                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between mb-6 text-xl font-bold">
                  <span>珥?寃곗젣 湲덉븸</span>
                  <span className="text-blue-600">
                    {finalTotal.toLocaleString()}??                  </span>
                </div>

                <Button
                  type="submit"
                  fullWidth
                  size="lg"
                  isLoading={isSubmitting}
                  disabled={
                    (orderType === '諛곕떖二쇰Ц' && (!formData.address || !formData.phone)) ||
                    (orderType === '?ъ옣二쇰Ц' && !formData.phone)
                  }
                  className="group"
                >
                  {!isSubmitting && (
                    <>
                      <CheckCircle2 className="w-5 h-5 mr-2" />
                      {orderType === '諛곕떖二쇰Ц' ? '諛곕떖 二쇰Ц?섍린' : '?ъ옣 二쇰Ц?섍린'}
                    </>
                  )}
                </Button>
              </Card>
            </div>
          </div>
        </form>
      </div>
      {/* Modal is now handled inside AddressSearchInput */}

    </div>
  );
}
```

### File: src/pages/MyPage.tsx
```typescript
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useStore } from '../contexts/StoreContext';
import { User, ShoppingBag, Ticket, Bell, Store, ChevronRight, LogOut, Package } from 'lucide-react';
import Card from '../components/common/Card';
import { Order } from '../types/order';
import { Coupon } from '../types/coupon';
import { useFirestoreCollection } from '../hooks/useFirestoreCollection';
import { getUserOrdersQuery } from '../services/orderService';
import { getActiveCouponsQuery } from '../services/couponService';
import { toast } from 'sonner';

export default function MyPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { store } = useStore();
  const [notificationEnabled, setNotificationEnabled] = useState(false);

  // ?곸젏 ?뺣낫 (store媛 濡쒕뵫 以묒씠嫄곕굹 ?놁쑝硫??덉쟾?섍쾶 泥섎━)
  const storeInfo = store || {
    id: 'demo-store',
    name: '?곸젏 ?뺣낫 濡쒕뵫 以?..',
    phone: '',
    address: '',
    businessHours: undefined,
  };

  // 1. 理쒓렐 二쇰Ц 議고쉶 (?ㅻ뜲?댄꽣)
  // user? store媛 ?덉쓣 ?뚮쭔 荑쇰━ ?앹꽦
  const ordersQuery = (store?.id && user?.id)
    ? getUserOrdersQuery(store.id, user.id)
    : null;

  const { data: allOrders, loading: ordersLoading } = useFirestoreCollection<Order>(ordersQuery);

  // ?ы띁 ?⑥닔: Firestore Timestamp 泥섎━瑜??꾪븳 toDate
  const toDate = (date: any): Date => {
    if (date?.toDate) return date.toDate();
    if (date instanceof Date) return date;
    if (typeof date === 'string') return new Date(date);
    return new Date();
  };

  // 理쒓렐 3媛쒕쭔 ?섎씪???쒖떆 (寃곗젣?湲??곹깭???쒖쇅 - 誘멸껐??二쇰Ц 嫄?
  const recentOrders = allOrders
    ? allOrders.filter(o => o.status !== '寃곗젣?湲?).slice(0, 3)
    : [];

  // 2. ?ъ슜 媛?ν븳 荑좏룿 議고쉶 (?ㅻ뜲?댄꽣)
  const couponsQuery = store?.id ? getActiveCouponsQuery(store.id) : null;
  const { data: availableCoupons, loading: couponsLoading } = useFirestoreCollection<Coupon>(couponsQuery);

  // ?ъ슜??荑좏룿 ?꾪꽣留?(?ъ슜???붿껌: ?ъ슜??荑좏룿? ?④? 泥섎━)
  const myCoupons = availableCoupons?.filter(coupon =>
    !coupon.usedByUserIds?.includes(user?.id || '')
  ) || [];

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
      toast.success('濡쒓렇?꾩썐?섏뿀?듬땲??);
    } catch (error) {
      toast.error('濡쒓렇?꾩썐 ?ㅽ뙣');
    }
  };

  const handleNotificationToggle = () => {
    setNotificationEnabled(!notificationEnabled);
    toast.success(`?뚮┝??${!notificationEnabled ? '耳쒖죱?듬땲?? : '爰쇱죱?듬땲??}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 mb-20">
        {/* ?꾨줈???뱀뀡 */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-gray-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {user?.displayName || '怨좉컼'}??            </h1>
            <p className="text-gray-500">{user?.email}</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* 理쒓렐 二쇰Ц ?댁뿭 */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg">理쒓렐 二쇰Ц ?댁뿭</h2>
              </div>
              <button
                onClick={() => navigate('/orders')}
                className="text-sm text-gray-500 hover:text-gray-700 flex items-center"
              >
                ?꾩껜蹂닿린 <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>

            {ordersLoading ? (
              <div className="text-center py-8 text-gray-500">
                <p className="text-sm">濡쒕뵫 以?..</p>
              </div>
            ) : recentOrders.length > 0 ? (
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => navigate(`/orders/${order.id}`)}
                  >
                    <div>
                      <p className="text-sm font-medium">
                        {order.items[0]?.name} {order.items.length > 1 ? `??${order.items.length - 1}媛? : ''}
                      </p>
                      <p className="text-xs text-gray-500">
                        {toDate(order.createdAt).toLocaleDateString('ko-KR')}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold">{order.totalPrice.toLocaleString()}??/p>
                      <p className="text-xs text-blue-600">{order.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Package className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                <p className="text-sm">二쇰Ц ?댁뿭???놁뒿?덈떎</p>
              </div>
            )}
          </Card>

          {/* 荑좏룿??*/}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Ticket className="w-5 h-5 text-orange-600" />
              <h2 className="text-lg">荑좏룿??/h2>
              <span className="text-sm text-gray-500">
                ({myCoupons.length}??
              </span>
            </div>

            {couponsLoading ? (
              <div className="text-center py-8 text-gray-500">
                <p className="text-sm">濡쒕뵫 以?..</p>
              </div>
            ) : (myCoupons.length > 0) ? (
              <div className="space-y-2">
                {myCoupons.map((coupon) => (
                  <div
                    key={coupon.id}
                    className="flex justify-between items-center p-3 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{coupon.name}</p>
                      <p className="text-xs text-gray-500">
                        {coupon.validUntil ? toDate(coupon.validUntil).toLocaleDateString('ko-KR') + '源뚯?' : '?좏슚湲곌컙 ?놁쓬'}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-orange-600 font-bold">
                        {coupon.discountType === 'percentage'
                          ? `${coupon.discountValue}%`
                          : `${coupon.discountValue.toLocaleString()}??}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p className="text-sm">?ъ슜 媛?ν븳 荑좏룿???놁뒿?덈떎</p>
              </div>
            )}
          </Card>

          {/* ?뚮┝ ?ㅼ젙 */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-green-600" />
                <div>
                  <h2 className="text-lg">?뚮┝ ?ㅼ젙</h2>
                  <p className="text-sm text-gray-500">二쇰Ц ?곹깭 蹂寃????뚮┝??諛쏆뒿?덈떎</p>
                </div>
              </div>
              <button
                onClick={handleNotificationToggle}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notificationEnabled ? 'bg-blue-600' : 'bg-gray-300'}`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notificationEnabled ? 'translate-x-6' : 'translate-x-1'}`}
                />
              </button>
            </div>
          </Card>

          {/* 媛寃??뺣낫 */}
          {storeInfo && (
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Store className="w-5 h-5 text-purple-600" />
                <h2 className="text-lg">媛寃??뺣낫</h2>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">?곸젏紐?/p>
                  <p className="font-medium">{storeInfo.name}</p>
                </div>

                {storeInfo.phone && (
                  <div>
                    <p className="text-sm text-gray-500">?꾪솕踰덊샇</p>
                    <p className="font-medium">{storeInfo.phone}</p>
                  </div>
                )}

                {storeInfo.address && (
                  <div>
                    <p className="text-sm text-gray-500">二쇱냼</p>
                    <p className="font-medium">{storeInfo.address}</p>
                  </div>
                )}

                {storeInfo.businessHours && (
                  <div>
                    <p className="text-sm text-gray-500 mb-2">?곸뾽?쒓컙</p>
                    <div className="space-y-1 text-sm">
                      {Object.entries(storeInfo.businessHours).map(([day, hours]) => {
                        if (!hours) return null;
                        const dayLabel: Record<string, string> = {
                          monday: '??,
                          tuesday: '??,
                          wednesday: '??,
                          thursday: '紐?,
                          friday: '湲?,
                          saturday: '??,
                          sunday: '??,
                        };
                        return (
                          <div key={day} className="flex justify-between">
                            <span className="text-gray-600">{dayLabel[day]}</span>
                            <span>
                              {hours.closed ? '?대Т' : `${hours.open} - ${hours.close}`}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          )}

          {/* 濡쒓렇?꾩썐 */}
          <Card className="p-6 mt-4">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 text-red-600 hover:text-red-700 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>濡쒓렇?꾩썐</span>
            </button>
          </Card>

          {/* 媛쒕컻???뺣낫 */}
          <div className="mt-8 mb-4 text-center">
            <p className="text-xs text-gray-400 font-medium">Powered by KS Company</p>
            <div className="flex items-center justify-center gap-2 mt-1 text-[10px] text-gray-400">
              <span>媛쒕컻?? KS而댄띁??/span>
              <span className="w-px h-2 bg-gray-300"></span>
              <span>??? ?앷꼍?? 諛곗쥌??/span>
            </div>
            <p className="text-[10px] text-gray-300 mt-1">짤 2024 Simple Delivery App Template. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
```

