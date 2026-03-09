### File: src/pages/NicepayReturnPage.tsx
```typescript
/// <reference types="vite/client" />
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { useStore } from '../contexts/StoreContext';

// 媛쒕컻???꾩떆 Cloud Functions URL (濡쒖뺄 ?먮뒗 ?꾨줈?뺤뀡)
// ?ㅼ젣 諛고룷 ?쒖뿉???먮룞?쇰줈 Functions ?꾨찓?몄쓣 ?ъ슜?섍굅???꾨줉???ㅼ젙 ?꾩슂
const FUNCTIONS_URL = import.meta.env.VITE_FUNCTIONS_URL || 'https://us-central1-YOUR_PROJECT_ID.cloudfunctions.net/nicepayConfirm';

interface NicepayConfirmResponse {
    success: boolean;
    data?: any;
    error?: string;
    code?: string;
}

export default function NicepayReturnPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { store } = useStore();

    const [status, setStatus] = useState<'loading' | 'success' | 'failed'>('loading');
    const [message, setMessage] = useState('寃곗젣 寃곌낵瑜??뺤씤?섍퀬 ?덉뒿?덈떎...');

    useEffect(() => {
        const verifyPayment = async () => {
            // URL ?뚮씪誘명꽣 ?뚯떛
            const orderId = searchParams.get('orderId');
            const tid = searchParams.get('tid') || searchParams.get('TxTid');
            const authToken = searchParams.get('authToken') || searchParams.get('AuthToken');
            const resultCode = searchParams.get('resultCode') || searchParams.get('ResultCode');
            const resultMsg = searchParams.get('resultMsg') || searchParams.get('ResultMsg');
            const amount = searchParams.get('amt') || searchParams.get('Amt');

            console.log('NICEPAY Return Params:', { orderId, tid, resultCode, resultMsg });

            if (resultCode !== '0000') {
                setStatus('failed');
                setMessage(resultMsg || '寃곗젣媛 痍⑥냼?섏뿀嫄곕굹 ?뱀씤?섏? ?딆븯?듬땲??');
                return;
            }

            if (!orderId || !tid || !authToken) {
                setStatus('failed');
                setMessage('?꾩닔 寃곗젣 ?뺣낫媛 ?꾨씫?섏뿀?듬땲??');
                return;
            }

            try {
                // Cloud Function ?몄텧
                // 二쇱쓽: 諛고룷 ?꾩뿉??濡쒖뺄 ?먮??덉씠?곕굹 諛고룷??URL???뺥솗??吏?뺥빐????
                // ?ш린?쒕뒗 fetch ?ъ슜. (T2-4-2 Task?먯꽌 URL? .env ?깆쑝濡?愿由?沅뚯옣)

                // **************************************************************************
                // [以묒슂] ?ㅼ젣 ?댁쁺 ?섍꼍?먯꽌??Functions URL???숈쟻?쇰줈 二쇱엯?댁빞 ?⑸땲??
                // ?꾩옱???덉떆濡??곷? 寃쎈줈 ?먮뒗 ?섎뱶肄붾뵫??URL???ъ슜?????덉뒿?덈떎.
                // **************************************************************************

                const response = await fetch('/nicepayConfirm', { // 由щ쾭???꾨줉???ъ슜 ??
                    // const response = await fetch('http://127.0.0.1:5001/YOUR_PROJECT/us-central1/nicepayConfirm', { // 濡쒖뺄 ?뚯뒪??
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        tid,
                        authToken,
                        orderId,
                        storeId: store?.id,
                        amount: Number(amount)
                    })
                });

                const result: NicepayConfirmResponse = await response.json();

                if (result.success) {
                    setStatus('success');
                    setMessage('寃곗젣媛 ?뺤긽?곸쑝濡??꾨즺?섏뿀?듬땲??');
                } else {
                    setStatus('failed');
                    setMessage(result.error || '寃곗젣 ?뱀씤 以??ㅻ쪟媛 諛쒖깮?덉뒿?덈떎.');
                }
            } catch (error) {
                console.error('Payment Confirmation Error:', error);
                setStatus('failed');
                setMessage('?쒕쾭 ?듭떊 以??ㅻ쪟媛 諛쒖깮?덉뒿?덈떎.');
            }
        };

        if (store?.id) {
            verifyPayment();
        }
    }, [searchParams, store]);

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <Card className="max-w-md w-full text-center py-10 px-6">
                {status === 'loading' && (
                    <div className="flex flex-col items-center">
                        <Loader2 className="w-16 h-16 text-blue-600 animate-spin mb-6" />
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">寃곗젣 ?뱀씤 以?..</h2>
                        <p className="text-gray-600 animate-pulse">{message}</p>
                    </div>
                )}

                {status === 'success' && (
                    <div className="flex flex-col items-center">
                        <CheckCircle2 className="w-16 h-16 text-green-500 mb-6" />
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">寃곗젣 ?깃났!</h2>
                        <p className="text-gray-600 mb-8">{message}</p>
                        <Button
                            fullWidth
                            size="lg"
                            onClick={() => navigate('/orders')}
                        >
                            二쇰Ц ?댁뿭 蹂닿린
                        </Button>
                    </div>
                )}

                {status === 'failed' && (
                    <div className="flex flex-col items-center">
                        <XCircle className="w-16 h-16 text-red-500 mb-6" />
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">寃곗젣 ?ㅽ뙣</h2>
                        <p className="text-gray-600 mb-8">{message}</p>
                        <div className="flex gap-3 w-full">
                            <Button
                                variant="outline"
                                fullWidth
                                onClick={() => navigate('/')}
                            >
                                ?덉쑝濡?
                            </Button>
                            <Button
                                fullWidth
                                onClick={() => navigate('/checkout')}
                            >
                                ?ㅼ떆 ?쒕룄
                            </Button>
                        </div>
                    </div>
                )}
            </Card>
        </div>
    );
}

```

### File: src/pages/OrderDetailPage.test.tsx
```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import OrderDetailPage from './OrderDetailPage';
import { useStore } from '../contexts/StoreContext';
import { useFirestoreDocument } from '../hooks/useFirestoreDocument';
import { useParams, useNavigate } from 'react-router-dom';

// Mock dependencies
vi.mock('react-router-dom', () => ({
    useParams: vi.fn(),
    useNavigate: vi.fn(),
}));

vi.mock('../contexts/StoreContext', () => ({
    useStore: vi.fn(),
}));

vi.mock('../hooks/useFirestoreDocument', () => ({
    useFirestoreDocument: vi.fn(),
}));

vi.mock('../components/common/Card', () => ({
    default: ({ children }: any) => <div data-testid="card">{children}</div>,
}));

// Mock lucide icons
vi.mock('lucide-react', () => ({
    ArrowLeft: () => <span>ArrowLeft</span>,
    MapPin: () => <span>MapPin</span>,
    Phone: () => <span>Phone</span>,
    CreditCard: () => <span>CreditCard</span>,
    Clock: () => <span>Clock</span>,
    Package: () => <span>Package</span>,
    CheckCircle2: () => <span>CheckCircle2</span>,
    MessageSquare: () => <span>MessageSquare</span>,
    AlertCircle: () => <span>AlertCircle</span>,
}));

describe('OrderDetailPage', () => {
    const mockNavigate = vi.fn();
    const mockStore = { id: 'store_1' };

    beforeEach(() => {
        vi.clearAllMocks();
        (useNavigate as any).mockReturnValue(mockNavigate);
        (useStore as any).mockReturnValue({ store: mockStore });
        (useParams as any).mockReturnValue({ orderId: 'order_123' });
    });

    it('should render loading state', () => {
        (useFirestoreDocument as any).mockReturnValue({
            data: null,
            loading: true,
            error: null
        });

        render(<OrderDetailPage />);
        expect(screen.getByText('二쇰Ц ?뺣낫瑜?遺덈윭?ㅻ뒗 以?..')).toBeInTheDocument();
    });

    it('should render error/not found state', () => {
        (useFirestoreDocument as any).mockReturnValue({
            data: null,
            loading: false,
            error: new Error('Failed')
        });

        render(<OrderDetailPage />);
        // Component renders one of these
        expect(screen.getByText('二쇰Ц ?뺣낫瑜?遺덈윭?ㅻ뒗???ㅽ뙣?덉뒿?덈떎')).toBeInTheDocument();
    });

    it('should render order details when loaded', () => {
        const mockOrder = {
            id: 'order_123',
            status: '?묒닔',
            totalPrice: 15000,
            items: [
                { name: 'Pizza', price: 15000, quantity: 1, options: [] }
            ],
            createdAt: { toDate: () => new Date('2024-01-01T12:00:00') },
            address: 'Seoul Grid',
            phone: '010-1234-5678',
            paymentType: 'card',
            orderType: '諛곕떖'
        };

        (useFirestoreDocument as any).mockReturnValue({
            data: mockOrder,
            loading: false,
            error: null
        });

        render(<OrderDetailPage />);

        expect(screen.getByText('二쇰Ц ?곸꽭')).toBeInTheDocument();
        expect(screen.getByText('二쇰Ц踰덊샇: order_12')).toBeInTheDocument();
        expect(screen.getByText('Pizza')).toBeInTheDocument();
        // Price appears multiple times, check at least one
        expect(screen.getAllByText('15,000??).length).toBeGreaterThan(0);
    });

    it('should navigate back when button clicked', () => {
        (useFirestoreDocument as any).mockReturnValue({
            data: { id: '1', status: '?묒닔', items: [], totalPrice: 0, createdAt: new Date() },
            loading: false,
            error: null
        });

        render(<OrderDetailPage />);

        const backButton = screen.getByText('二쇰Ц 紐⑸줉?쇰줈');
        fireEvent.click(backButton);

        expect(mockNavigate).toHaveBeenCalledWith('/orders');
    });
});

```

### File: src/pages/OrderDetailPage.tsx
```typescript
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Phone, CreditCard, Clock, Package, CheckCircle2, MessageSquare, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS, PAYMENT_TYPE_LABELS, OrderStatus, Order } from '../types/order';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import ReviewModal from '../components/review/ReviewModal';
import { toast } from 'sonner';
import { useStore } from '../contexts/StoreContext';
import { useFirestoreDocument } from '../hooks/useFirestoreDocument';

export default function OrderDetailPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { store } = useStore();
  const [showReviewModal, setShowReviewModal] = useState(false);

  // Fetch real order data
  // Path: stores/{storeId}/orders/{orderId}
  // useFirestoreDocument???댁젣 ?쒕툕而щ젆??寃쎈줈 諛곗뿴??吏?먰븿
  const collectionPath = store?.id && orderId
    ? ['stores', store.id, 'orders']
    : null;
  const { data: order, loading, error } = useFirestoreDocument<Order>(
    collectionPath,
    orderId || null
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">二쇰Ц ?뺣낫瑜?遺덈윭?ㅻ뒗 以?..</div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-xl text-gray-600 mb-4">
            {error ? '二쇰Ц ?뺣낫瑜?遺덈윭?ㅻ뒗???ㅽ뙣?덉뒿?덈떎' : '二쇰Ц??李얠쓣 ???놁뒿?덈떎'}
          </p>
          <Button onClick={() => navigate('/orders')}>二쇰Ц 紐⑸줉?쇰줈</Button>
        </div>
      </div>
    );
  }

  // ?ы띁 ?⑥닔: Firestore Timestamp 泥섎━瑜??꾪븳 toDate
  const toDate = (date: any): Date => {
    if (date?.toDate) return date.toDate();
    if (date instanceof Date) return date;
    if (typeof date === 'string') return new Date(date);
    return new Date();
  };

  // ?ы띁 ?⑥닔: ?ъ슜?먯슜 ?곹깭 ?쇰꺼 蹂??  const getDisplayStatus = (status: OrderStatus) => {
    switch (status) {
      case '?묒닔': return '?묒닔以?;
      case '?묒닔?꾨즺': return '?묒닔?뺤씤';
      case '議곕━?꾨즺': return '議곕━ ?꾨즺';
      case '?ъ옣?꾨즺': return '?ъ옣 ?꾨즺';
      default: return ORDER_STATUS_LABELS[status];
    }
  };

  const statusColor = ORDER_STATUS_COLORS[order.status as OrderStatus] || ORDER_STATUS_COLORS['?묒닔'];

  const handleReorder = () => {
    // TODO: ?λ컮援щ땲???닿린 濡쒖쭅 援ы쁽 ?꾩슂 (?ш린?쒕뒗 硫붿떆吏留??쒖떆)
    toast.success('??湲곕뒫? 以鍮?以묒엯?덈떎 (?ъ＜臾?');
    // navigate('/cart');
  };

  const deliverySteps: OrderStatus[] = ['?묒닔', '?묒닔?꾨즺', '議곕━以?, '諛곕떖以?, '?꾨즺'];
  const pickupSteps: OrderStatus[] = ['?묒닔', '?묒닔?꾨즺', '議곕━以?, '議곕━?꾨즺', '?ъ옣?꾨즺'];

  const isPickup = order.orderType === '?ъ옣二쇰Ц';
  const statusSteps = isPickup ? pickupSteps : deliverySteps;

  const currentStepIndex = statusSteps.indexOf(order.status as OrderStatus);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/orders')}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            二쇰Ц 紐⑸줉?쇰줈
          </button>
          <h1 className="text-3xl mb-2">
            <span className="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
              二쇰Ц ?곸꽭
            </span>
          </h1>
          <p className="text-gray-600">二쇰Ц踰덊샇: {order.id.slice(0, 8)}</p>
        </div>

        <div className="space-y-6">
          {/* Order Status */}
          <Card>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${statusColor.bg}`}>
                  <Package className={`w-8 h-8 ${statusColor.text}`} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {getDisplayStatus(order.status as OrderStatus)}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {toDate(order.createdAt).toLocaleString('ko-KR')}
                  </p>
                </div>
              </div>
              <Badge
                variant={
                  order.status === '?꾨즺' || order.status === '?ъ옣?꾨즺' ? 'success' :
                    order.status === '痍⑥냼' ? 'danger' :
                      order.status === '諛곕떖以? || order.status === '議곕━?꾨즺' ? 'secondary' :
                        'primary'
                }
                size="lg"
              >
                {getDisplayStatus(order.status as OrderStatus)}
              </Badge>
            </div>

            {/* Status Progress */}
            {order.status !== '痍⑥냼' && (
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  {statusSteps.map((step, idx) => (
                    <div key={step} className="flex-1 flex flex-col items-center relative">
                      <div className={`
                        w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center mb-2 transition-all relative z-10 shadow-sm
                        ${idx <= currentStepIndex ? 'gradient-primary text-white ring-2 ring-white' : 'bg-gray-100 text-gray-300'}
                      `}>
                        {idx <= currentStepIndex ? (
                          <CheckCircle2 className="w-4 h-4 sm:w-6 sm:h-6" />
                        ) : (
                          <Clock className="w-4 h-4 sm:w-6 sm:h-6" />
                        )}
                      </div>
                      <p className={`text-[10px] sm:text-xs text-center font-medium whitespace-nowrap ${idx <= currentStepIndex ? 'text-gray-900' : 'text-gray-400'}`}>
                        {getDisplayStatus(step)}
                      </p>
                      {idx < statusSteps.length - 1 && (
                        <div className={`absolute h-[2px] w-full top-4 sm:top-5 left-1/2 -z-0 ${idx < currentStepIndex ? 'bg-primary-500' : 'bg-gray-100'}`} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>

          {/* Order Items */}
          <Card>
            <h3 className="text-xl font-bold text-gray-900 mb-4">二쇰Ц ?곹뭹</h3>
            <div className="space-y-4">
              {order.items.map((item, idx) => {
                const optionsPrice = item.options?.reduce((sum, opt) => sum + opt.price, 0) || 0;
                return (
                  <div key={idx} className="flex items-start space-x-4 pb-4 border-b border-gray-200 last:border-0 last:pb-0">
                    {item.imageUrl && (
                      <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">{item.name}</h4>
                      {item.options && item.options.length > 0 && (
                        <div className="space-y-0.5 mb-2">
                          {item.options.map((opt, optIdx) => (
                            <p key={optIdx} className="text-sm text-gray-600">
                              + {opt.name} (+{opt.price.toLocaleString()}??
                            </p>
                          ))}
                        </div>
                      )}
                      <p className="text-sm text-gray-600">?섎웾: {item.quantity}媛?/p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">
                        {((item.price + optionsPrice) * item.quantity).toLocaleString()}??                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Delivery Info */}
          <Card>
            <h3 className="text-xl font-bold text-gray-900 mb-4">諛곕떖 ?뺣낫</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-600 mb-1">諛곕떖 二쇱냼</p>
                  <p className="font-medium text-gray-900">{order.address}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-600 mb-1">?곕씫泥?/p>
                  <p className="font-medium text-gray-900">{order.phone}</p>
                </div>
              </div>
              {order.requestMessage && (
                <div className="flex items-start space-x-3">
                  <MessageSquare className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-600 mb-1">?붿껌?ы빆</p>
                    <p className="font-medium text-gray-900">{order.requestMessage}</p>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Payment Info */}
          <Card>
            <h3 className="text-xl font-bold text-gray-900 mb-4">寃곗젣 ?뺣낫</h3>
            <div className="space-y-3 mb-4 pb-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <CreditCard className="w-5 h-5 text-gray-400" />
                <p className="font-medium text-gray-900">
                  {order.paymentType ? PAYMENT_TYPE_LABELS[order.paymentType] : '寃곗젣 ?뺣낫 ?놁쓬'}
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-gray-600">
                <span>?곹뭹 湲덉븸</span>
                <span>{(order.totalPrice - 3000).toLocaleString()}??/span>
              </div>
              <div className="flex items-center justify-between text-gray-600">
                <span>諛곕떖鍮?/span>
                <span>3,000??/span>
              </div>
              <div className="flex items-center justify-between text-xl font-bold pt-3 border-t border-gray-200">
                <span>珥?寃곗젣 湲덉븸</span>
                <span className="text-blue-600">{order.totalPrice.toLocaleString()}??/span>
              </div>
            </div>
          </Card>

          {/* Actions */}
          <div className="flex gap-3">
            <Button variant="outline" fullWidth onClick={handleReorder}>
              ?ъ＜臾명븯湲?            </Button>
            {(order.status === '?꾨즺' || order.status === '?ъ옣?꾨즺') && (
              <Button fullWidth onClick={() => setShowReviewModal(true)}>
                由щ럭 ?묒꽦?섍린
              </Button>
            )}
          </div>
        </div>
      </div>

      {showReviewModal && (
        <ReviewModal
          orderId={order.id}
          onClose={() => setShowReviewModal(false)}
          onSubmit={async (review) => {
            console.log('Review submitted:', review);
            toast.success('由щ럭媛 ?깅줉?섏뿀?듬땲??');
            // ?ㅼ젣 ??μ? ReviewModal ?대??먯꽌 泥섎━?섍굅???ш린??handler瑜??곌껐?댁빞 ??            // ReviewModal 援ы쁽???뺤씤?대킄????
          }}
        />
      )}
    </div>
  );
}
```

