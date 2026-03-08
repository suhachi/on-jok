import React from 'react';
import { useStore } from '../../contexts/StoreContext';

export default function StoreInfo() {
    const { store } = useStore();

    // 가게명 fallback: 온족 전용앱을 가정하여 기본값 설정
    const storeName = store?.name || "온족";

    // 운영 배너: 일시정지인 경우에만 사유 표시
    const isPaused = 'isPaused' in (store || {}) ? !!(store as any).isPaused : !!store?.isOrderingPaused;
    const pausedReason = store?.pausedReason || "현재 주문을 잠시 받지 않고 있습니다.";

    // 가게 소개글
    const description = store?.description;

    // 배달 정보
    const deliveryFee = store?.deliveryFee;
    const minOrder = store?.minOrderAmount;
    const deliveryTime = store?.settings?.estimatedDeliveryTime;

    // StorePromo 필드 (SSOT v4)
    const promoImages = (store as any)?.promoImages as string[] | undefined;
    const promoTitle = (store as any)?.promoTitle as string | undefined;
    const promoText = (store as any)?.promoText as string | undefined;

    const hasPromoImages = promoImages && promoImages.length > 0;
    const hasPromoText = Boolean(promoTitle || promoText);

    return (
        <div className="bg-white px-4 py-5 mb-2 shadow-sm overflow-hidden">
            {/* P1: StorePromo 홍보 이미지 캐러셀/배너 */}
            {hasPromoImages && (
                <div className="mb-6 -mx-4 px-4 overflow-x-auto snap-x snap-mandatory flex gap-3 pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {promoImages.length === 1 ? (
                        <div className="w-full shrink-0 snap-center rounded-xl overflow-hidden shadow-sm">
                            <img src={promoImages[0]} alt="가게 홍보 이미지" className="w-full aspect-video object-cover" />
                        </div>
                    ) : (
                        promoImages.map((url, idx) => (
                            <div key={idx} className="w-[85%] shrink-0 snap-center rounded-xl overflow-hidden shadow-sm">
                                <img src={url} alt={`가게 홍보 이미지 ${idx + 1}`} className="w-full aspect-video object-cover" />
                            </div>
                        ))
                    )}
                </div>
            )}

            {/* P1: StorePromo 홍보글 */}
            {hasPromoText && (
                <div className="mb-6 bg-primary-50 px-4 py-4 rounded-xl border border-primary-100">
                    {promoTitle && <h3 className="font-bold text-primary-900 mb-1">{promoTitle}</h3>}
                    {promoText && <p className="text-sm text-primary-800 whitespace-pre-line">{promoText}</p>}
                </div>
            )}

            {/* 1. 운영 배너 (긴급 공지, 우선순위 높음) */}
            {isPaused && (
                <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm font-medium">
                    🚨 {pausedReason}
                </div>
            )}

            {/* 2. 가게명 */}
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{storeName}</h1>

            {store && (
                <>
                    {/* 3. 소개글 (최대 2줄) */}
                    {description && (
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                            {description}
                        </p>
                    )}

                    {/* 4. 배달 정보 가로 정렬 */}
                    <div className="flex flex-wrap items-center gap-y-2 text-sm text-gray-700">
                        {deliveryTime != null && (
                            <div className="flex items-center mr-4">
                                <span className="text-gray-500 mr-1">배달시간</span>
                                <span className="font-semibold">약 {deliveryTime}분</span>
                            </div>
                        )}
                        {minOrder != null && (
                            <div className="flex items-center mr-4">
                                <span className="text-gray-500 mr-1">최소주문</span>
                                <span className="font-semibold">{minOrder.toLocaleString()}원</span>
                            </div>
                        )}
                        {deliveryFee != null && (
                            <div className="flex items-center">
                                <span className="text-gray-500 mr-1">배달팁</span>
                                <span className="font-semibold">{deliveryFee.toLocaleString()}원</span>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
