### File: src/pages/OrdersPage.tsx
```typescript
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Clock, CheckCircle2, XCircle, ChevronRight, Star } from 'lucide-react';
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS, OrderStatus } from '../types/order';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import ReviewModal from '../components/review/ReviewModal';
import { useAuth } from '../contexts/AuthContext';
import { useStore } from '../contexts/StoreContext';
import { useFirestoreCollection } from '../hooks/useFirestoreCollection';
import { getUserOrdersQuery } from '../services/orderService';
import { Order } from '../types/order';

// ?ы띁 ?⑥닔: Firestore Timestamp 泥섎━瑜??꾪븳 toDate
const toDate = (date: any): Date => {
  if (date?.toDate) return date.toDate();
  if (date instanceof Date) return date;
  if (typeof date === 'string') return new Date(date);
  return new Date();
};

import { useReorder } from '../hooks/useReorder';

export default function OrdersPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { store } = useStore();
  const [filter, setFilter] = useState<OrderStatus | '?꾩껜'>('?꾩껜');

  // R2-FIX-03: useReorder ?낆쓣 ?곸쐞濡??대룞
  const { handleReorder, reordering } = useReorder();

  // Firestore?먯꽌 ?꾩옱 ?ъ슜?먯쓽 二쇰Ц 議고쉶
  const ordersQuery = (store?.id && user?.id)
    ? getUserOrdersQuery(store.id, user.id)
    : null;

  const { data: allOrders, loading } = useFirestoreCollection<Order>(ordersQuery);

  const filteredOrders = filter === '?꾩껜'
    ? (allOrders || []).filter(order => order.status !== '寃곗젣?湲?)
    : (allOrders || []).filter(order => order.status === filter);

  // ?ы띁 ?⑥닔: ?ъ슜?먯슜 ?곹깭 ?쇰꺼 蹂??  const getDisplayStatus = (status: OrderStatus) => {
    switch (status) {
      case '?묒닔': return '?묒닔以?;
      case '?묒닔?꾨즺': return '?묒닔?뺤씤';
      default: return ORDER_STATUS_LABELS[status];
    }
  };

  const filters: (OrderStatus | '?꾩껜')[] = ['?꾩껜', '?묒닔', '?묒닔?꾨즺', '議곕━以?, '諛곕떖以?, '?꾨즺', '痍⑥냼'];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">二쇰Ц ?댁뿭??遺덈윭?ㅻ뒗 以?..</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl mb-2">
            <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
              ??二쇰Ц
            </span>
          </h1>
          <p className="text-gray-600">二쇰Ц ?댁뿭???뺤씤?섍퀬 愿由ы븯?몄슂</p>
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
              {status === '?꾩껜' ? '?꾩껜' : getDisplayStatus(status)}
            </button>
          ))}
        </div>

        {/* Orders List */}
        {filteredOrders.length > 0 ? (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onClick={() => navigate(`/orders/${order.id}`)}
                getDisplayStatus={getDisplayStatus}
                onReorder={() => store?.id && handleReorder(store.id, order)}
                isReordering={reordering}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-32 h-32 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <Package className="w-16 h-16 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              二쇰Ц ?댁뿭???놁뒿?덈떎
            </h2>
            <p className="text-gray-600 mb-8">
              留쏆엳??硫붾돱瑜?二쇰Ц?대낫?몄슂
            </p>
            <Button onClick={() => navigate('/menu')}>
              硫붾돱 ?섎윭蹂닿린
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

interface OrderCardProps {
  order: Order;
  onClick: () => void;
  getDisplayStatus: (s: OrderStatus) => string;
  onReorder: () => void;
  isReordering: boolean;
}

function OrderCard({ order, onClick, getDisplayStatus, onReorder, isReordering }: OrderCardProps) {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const statusColor = ORDER_STATUS_COLORS[order.status as OrderStatus];
  const { store } = useStore(); // useReorder hook removed

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case '?묒닔':
      case '?묒닔?꾨즺':
      case '議곕━以?:
        return <Clock className="w-5 h-5" />;
      case '諛곕떖以?:
        return <Package className="w-5 h-5" />;
      case '?꾨즺':
        return <CheckCircle2 className="w-5 h-5" />;
      case '痍⑥냼':
        return <XCircle className="w-5 h-5" />;
    }
  };

  // 由щ럭 ?묒꽦 媛???щ? (?꾨즺 ?곹깭留?
  const canReview = order.status === '?꾨즺';

  return (
    <>
      <Card>
        {/* ?대┃ 媛?ν븳 硫붿씤 ?곸뿭 */}
        <div onClick={onClick} className="cursor-pointer hover:bg-gray-50 transition-colors p-1 -m-1 rounded-lg">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${statusColor.bg}`}>
                <div className={statusColor.text}>
                  {getStatusIcon(order.status)}
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  {toDate(order.createdAt).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
                <p className="text-xs text-gray-500">二쇰Ц踰덊샇: {order.id.slice(0, 8)}</p>
              </div>
            </div>
            <Badge variant={
              order.status === '?꾨즺' ? 'success' :
                order.status === '痍⑥냼' ? 'danger' :
                  order.status === '諛곕떖以? ? 'secondary' :
                    'primary'
            }>
              {getDisplayStatus(order.status)}
            </Badge>
          </div>

          <div className="space-y-2 mb-4 pb-4 border-b border-gray-200">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {item.imageUrl && (
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-600">?섎웾: {item.quantity}媛?/p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-gray-900">
                  {((item.price + (item.options?.reduce((sum: number, opt) => sum + (opt.price * (opt.quantity || 1)), 0) || 0)) * item.quantity).toLocaleString()}??                </p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">珥?寃곗젣 湲덉븸</p>
              <p className="text-2xl font-bold text-blue-600">
                {order.totalPrice.toLocaleString()}??              </p>
            </div>
            <ChevronRight className="w-6 h-6 text-gray-400" />
          </div>
        </div>

        {/* ?섎떒 踰꾪듉 ?곸뿭 */}
        <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-2 gap-3">
          {/* ?ъ＜臾?踰꾪듉 */}
          <Button
            variant="secondary"
            fullWidth
            onClick={(e) => {
              e.stopPropagation();
              onReorder();
            }}
            disabled={isReordering}
          >
            <Package className="w-4 h-4 mr-2" />
            {isReordering ? '?대뒗 以?..' : '媛숈? 硫붾돱 ?닿린'}
          </Button>

          {/* 由щ럭 踰꾪듉 (?꾨즺 ?? */}
          {canReview && (
            order.reviewed ? (
              <Button
                variant="outline"
                fullWidth
                onClick={(e) => {
                  e.stopPropagation();
                  setShowReviewModal(true);
                }}
              >
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-2" />
                由щ럭 ?섏젙
              </Button>
            ) : (
              <Button
                variant="outline"
                fullWidth
                onClick={(e) => {
                  e.stopPropagation();
                  setShowReviewModal(true);
                }}
              >
                <Star className="w-4 h-4 mr-2" />
                由щ럭 ?묒꽦
              </Button>
            )
          )}
        </div>
      </Card>

      {/* 由щ럭 紐⑤떖 */}
      {showReviewModal && (
        <ReviewModal
          orderId={order.id}
          onClose={() => setShowReviewModal(false)}
          onSuccess={() => {
            // 二쇰Ц 紐⑸줉 ?덈줈怨좎묠
            window.location.reload();
          }}
        />
      )}
    </>
  );
}
```

### File: src/pages/StoreSetupWizard.tsx
```typescript
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';
import { useStore } from '../contexts/StoreContext';
import { StoreFormData } from '../types/store';
import { toast } from 'sonner';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import AddressSearchInput from '../components/common/AddressSearchInput';
import Card from '../components/common/Card';
import { Store as StoreIcon, ChevronRight, ChevronLeft, Check } from 'lucide-react';

// ?꾩옱 踰꾩쟾?먯꽌??'?⑥씪 ?곸젏' ?꾪궎?띿쿂瑜??곕Ⅴ誘濡?怨좎젙??ID瑜??ъ슜?⑸땲??
// ?ν썑 硫???ㅽ넗???뚮옯?쇱쑝濡??뺤옣 ?? ??媛믪쓣 ?숈쟻?쇰줈 ?앹꽦?섍굅???ъ슜???낅젰??諛쏅룄濡??섏젙?댁빞 ?⑸땲??
const DEFAULT_STORE_ID = 'default';

const STEPS = [
  { id: 1, name: '湲곕낯 ?뺣낫', description: '?곸젏 ?대쫫怨??ㅻ챸' },
  { id: 2, name: '?곕씫泥?, description: '?꾪솕踰덊샇, ?대찓?? 二쇱냼' },
  { id: 3, name: '諛곕떖 ?ㅼ젙', description: '諛곕떖鍮? 理쒖냼 二쇰Ц 湲덉븸' },
  { id: 4, name: '?꾨즺', description: '?ㅼ젙 ?뺤씤 諛??앹꽦' },
];

export default function StoreSetupWizard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { store, loading: storeLoading } = useStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // ?대? ?곸젏???ㅼ젙?섏뼱 ?덈떎硫?愿由ъ옄 ?섏씠吏濡??대룞
  useEffect(() => {
    if (!storeLoading && store) {
      toast.info('?대? ?곸젏???ㅼ젙?섏뼱 ?덉뒿?덈떎.');
      navigate('/admin');
    }
  }, [store, storeLoading, navigate]);

  const [formData, setFormData] = useState<StoreFormData>({
    name: '',
    description: '',
    phone: '',
    email: user?.email || '',
    address: '',
    deliveryFee: 3000,
    minOrderAmount: 15000,
  });

  if (storeLoading) return null;

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        if (!formData.name) {
          toast.error('?곸젏 ?대쫫???낅젰?댁＜?몄슂');
          return false;
        }
        if (formData.name.length < 2) {
          toast.error('?곸젏 ?대쫫? 理쒖냼 2???댁긽?댁뼱???⑸땲??);
          return false;
        }
        return true;
      case 2:
        if (!formData.phone || !formData.email || !formData.address) {
          toast.error('紐⑤뱺 ?곕씫泥??뺣낫瑜??낅젰?댁＜?몄슂');
          return false;
        }
        return true;
      case 3:
        if (formData.deliveryFee < 0 || formData.minOrderAmount < 0) {
          toast.error('湲덉븸? 0 ?댁긽?댁뼱???⑸땲??);
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    if (!user) {
      toast.error('濡쒓렇?몄씠 ?꾩슂?⑸땲??);
      return;
    }

    setLoading(true);

    try {
      // 1. ?곸젏 ?곗씠??臾몄꽌 ?앹꽦 (store/default)
      const storeData = {
        ...formData,
        id: DEFAULT_STORE_ID,
        logoUrl: '',
        bannerUrl: '',
        primaryColor: '#3b82f6',
        businessHours: {},
        settings: {
          autoAcceptOrders: false,
          estimatedDeliveryTime: 30,
          paymentMethods: ['?깃껐??, '留뚮굹?쒖뭅??, '留뚮굹?쒗쁽湲?],
          enableReviews: true,
          enableCoupons: true,
          enableNotices: true,
          enableEvents: true,
        },
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      // 1. ?곸젏 臾몄꽌 ?앹꽦 (?⑥씪 ?곸젏 紐⑤뱶: 'default' ID ?ъ슜)
      await setDoc(doc(db, 'stores', DEFAULT_STORE_ID), storeData);

      // 2. 愿由ъ옄-?곸젏 留ㅽ븨 ?앹꽦 (沅뚰븳 遺?ъ슜)
      // ??留ㅽ븨???덉뼱??firestore.rules??isStoreOwner()媛 true瑜?諛섑솚?섏뿬 ?섏젙 沅뚰븳??媛吏?      if (user?.id) {
        const adminStoreId = `${user.id}_${DEFAULT_STORE_ID}`;
        await setDoc(doc(db, 'adminStores', adminStoreId), {
          adminUid: user.id,
          storeId: DEFAULT_STORE_ID,
          role: 'owner',
          createdAt: serverTimestamp(),
        });

        // 3. ?ъ슜??臾몄꽌??role ?낅뜲?댄듃 (?좏깮 ?ы빆, ?대씪?댁뼵???몄쓽??
        // await updateDoc(doc(db, 'users', user.id), { role: 'admin' }); 
      }



      // ?깃났 硫붿떆吏 諛??대룞
      toast.success('?곸젏???깃났?곸쑝濡??앹꽦?섏뿀?듬땲??');

      // ?ㅽ넗??而⑦뀓?ㅽ듃 媛깆떊???꾪빐 ?좎떆 ?湲?      setTimeout(() => {
        refreshStore();
        navigate('/admin');
        window.location.reload(); // StoreContext ?덈줈怨좎묠
      }, 1000);
    } catch (error) {
      console.error('Failed to create store:', error);
      toast.error('?곸젏 ?앹꽦???ㅽ뙣?덉뒿?덈떎');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 gradient-primary rounded-3xl mb-4">
            <StoreIcon className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl mb-2">
            <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
              ?곸젏 留뚮뱾湲?            </span>
          </h1>
          <p className="text-gray-600">?섎쭔??諛곕떖 ?깆쓣 留뚮뱾?대낫?몄슂</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {STEPS.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${currentStep > step.id
                      ? 'bg-green-500 text-white'
                      : currentStep === step.id
                        ? 'gradient-primary text-white'
                        : 'bg-gray-200 text-gray-500'
                      }`}
                  >
                    {currentStep > step.id ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <span>{step.id}</span>
                    )}
                  </div>
                  <div className="mt-2 text-center">
                    <p className="text-sm font-medium text-gray-900">{step.name}</p>
                    <p className="text-xs text-gray-500 hidden sm:block">{step.description}</p>
                  </div>
                </div>
                {index < STEPS.length - 1 && (
                  <div
                    className={`h-1 flex-1 mx-2 ${currentStep > step.id ? 'bg-green-500' : 'bg-gray-200'
                      }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <Card className="p-8">
          {/* Step 1: 湲곕낯 ?뺣낫 */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">湲곕낯 ?뺣낫</h2>

              <Input
                label="?곸젏 ?대쫫"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="?? 留쏆엳???ъ쭛"
                required
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  ?곸젏 ?ㅻ챸
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2.5 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                  rows={4}
                  placeholder="?곸젏???뚭컻?섎뒗 吏㏃? ?ㅻ챸???묒꽦?댁＜?몄슂"
                />
              </div>
            </div>
          )}

          {/* Step 2: ?곕씫泥?*/}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">?곕씫泥??뺣낫</h2>

              <Input
                label="?꾪솕踰덊샇"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="010-1234-5678"
                required
              />

              <Input
                label="?대찓??
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="contact@example.com"
                required
              />

              <AddressSearchInput
                label="二쇱냼"
                value={formData.address}
                onChange={(address) => setFormData({ ...formData, address })}
                required
              />
            </div>
          )}

          {/* Step 3: 諛곕떖 ?ㅼ젙 */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">諛곕떖 ?ㅼ젙</h2>

              <Input
                label="諛곕떖鍮?(??"
                type="number"
                value={formData.deliveryFee}
                onChange={(e) => setFormData({ ...formData, deliveryFee: parseInt(e.target.value) || 0 })}
                placeholder="3000"
                required
              />

              <Input
                label="理쒖냼 二쇰Ц 湲덉븸 (??"
                type="number"
                value={formData.minOrderAmount}
                onChange={(e) => setFormData({ ...formData, minOrderAmount: parseInt(e.target.value) || 0 })}
                placeholder="15000"
                required
              />

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  ?뮕 <strong>??</strong> 諛곕떖鍮꾩? 理쒖냼 二쇰Ц 湲덉븸? ?섏쨷???곸젏 ?ㅼ젙?먯꽌 蹂寃쏀븷 ???덉뒿?덈떎.
                </p>
              </div>
            </div>
          )}

          {/* Step 4: ?꾨즺 */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">?ㅼ젙 ?뺤씤</h2>

              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">?곸젏 ?뺣낫</h3>
                  <dl className="space-y-2">
                    <div className="flex justify-between">
                      <dt className="text-gray-600">?곸젏 ?대쫫:</dt>
                      <dd className="font-medium text-gray-900">{formData.name}</dd>
                    </div>
                  </dl>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">?곕씫泥?/h3>
                  <dl className="space-y-2">
                    <div className="flex justify-between">
                      <dt className="text-gray-600">?꾪솕:</dt>
                      <dd className="font-medium text-gray-900">{formData.phone}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">?대찓??</dt>
                      <dd className="font-medium text-gray-900">{formData.email}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">二쇱냼:</dt>
                      <dd className="font-medium text-gray-900">{formData.address}</dd>
                    </div>
                  </dl>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">諛곕떖 ?ㅼ젙</h3>
                  <dl className="space-y-2">
                    <div className="flex justify-between">
                      <dt className="text-gray-600">諛곕떖鍮?</dt>
                      <dd className="font-medium text-gray-900">{formData.deliveryFee.toLocaleString()}??/dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">理쒖냼 二쇰Ц:</dt>
                      <dd className="font-medium text-gray-900">{formData.minOrderAmount.toLocaleString()}??/dd>
                    </div>
                  </dl>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm text-green-800">
                  ??紐⑤뱺 ?ㅼ젙???꾨즺?섏뿀?듬땲?? ?곸젏???앹꽦?섏떆寃좎뒿?덇퉴?
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-4 mt-8">
            {currentStep > 1 && (
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={loading}
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                ?댁쟾
              </Button>
            )}

            {currentStep < 4 ? (
              <Button
                onClick={handleNext}
                fullWidth={currentStep === 1}
              >
                ?ㅼ쓬
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={loading}
                fullWidth
              >
                {loading ? '?앹꽦 以?..' : '?곸젏 留뚮뱾湲??럦'}
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
```

### File: src/services/orderService.test.ts
```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createOrder, updateOrderStatus, cancelOrder, deleteOrder } from './orderService';
import { collection, addDoc, updateDoc, doc, serverTimestamp, deleteDoc } from 'firebase/firestore';

// Mock dependencies
vi.mock('../lib/firebase', () => ({
    db: {},
}));

vi.mock('firebase/firestore', async () => {
    const actual = await vi.importActual('firebase/firestore');
    return {
        ...actual,
        collection: vi.fn(),
        addDoc: vi.fn(),
        updateDoc: vi.fn(),
        deleteDoc: vi.fn(),
        doc: vi.fn(),
        serverTimestamp: vi.fn(() => 'MOCK_TIMESTAMP'),
        query: vi.fn(),
        where: vi.fn(),
        orderBy: vi.fn(),
    };
});

describe('orderService', () => {
    const mockStoreId = 'store_123';
    const mockOrderId = 'order_abc';

    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('createOrder', () => {
        it('should create an order with default status "?묒닔"', async () => {
            const mockDocRef = { id: 'new_order_id' };
            (addDoc as any).mockResolvedValue(mockDocRef);
            (collection as any).mockReturnValue('MOCK_COLLECTION_REF');

            const orderData = {
                userId: 'user_1',
                items: [],
                totalPrice: 10000,
                paymentType: 'card',
                address: 'Seoul',
                phone: '010-0000-0000'
            };

            const result = await createOrder(mockStoreId, orderData as any);

            expect(collection).toHaveBeenCalledWith(expect.anything(), 'stores', mockStoreId, 'orders');
            expect(addDoc).toHaveBeenCalledWith('MOCK_COLLECTION_REF', expect.objectContaining({
                ...orderData,
                status: '?묒닔',
                createdAt: 'MOCK_TIMESTAMP',
                updatedAt: 'MOCK_TIMESTAMP',
            }));
            expect(result).toBe('new_order_id');
        });

        it('should use provided status if given', async () => {
            const mockDocRef = { id: 'new_order_id' };
            (addDoc as any).mockResolvedValue(mockDocRef);

            const orderData = {
                status: '議곕━以?,
                totalPrice: 10000,
            };

            await createOrder(mockStoreId, orderData as any);

            expect(addDoc).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({
                status: '議곕━以?,
            }));
        });
    });

    describe('updateOrderStatus', () => {
        it('should update order status and timestamp', async () => {
            (doc as any).mockReturnValue('MOCK_DOC_REF');

            await updateOrderStatus(mockStoreId, mockOrderId, '諛곕떖以?);

            expect(doc).toHaveBeenCalledWith(expect.anything(), 'stores', mockStoreId, 'orders', mockOrderId);
            expect(updateDoc).toHaveBeenCalledWith('MOCK_DOC_REF', {
                status: '諛곕떖以?,
                updatedAt: 'MOCK_TIMESTAMP',
            });
        });
    });

    describe('cancelOrder', () => {
        it('should set status to "痍⑥냼"', async () => {
            (doc as any).mockReturnValue('MOCK_DOC_REF');

            await cancelOrder(mockStoreId, mockOrderId);

            expect(updateDoc).toHaveBeenCalledWith('MOCK_DOC_REF', {
                status: '痍⑥냼',
                updatedAt: 'MOCK_TIMESTAMP',
            });
        });
    });

    describe('deleteOrder', () => {
        it('should delete the order document', async () => {
            (doc as any).mockReturnValue('MOCK_DOC_REF');
            // deleteOrder ?대???dynamic import??寃곌뎅 mocks瑜??ъ슜??寃껋쑝濡??덉긽??
            // ?섏?留??뚯뒪???섍꼍???곕씪 紐⑦궧 諛⑹떇???ㅻ? ???덉쓬.
            // ?ш린?쒕뒗 vi.mock??top-level?대?濡?dynamic import??紐⑦궧??踰꾩쟾??諛쏆쓣 寃껋엫.

            await deleteOrder(mockStoreId, mockOrderId);

            expect(deleteDoc).toHaveBeenCalledWith('MOCK_DOC_REF');
        });
    });
});

```

