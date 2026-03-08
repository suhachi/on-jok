/**
 * 관리자 가게 정보 수정 페이지 (STEP P2 완료 버전)
 * - name, description, deliveryFee, minOrderAmount
 * - settings.estimatedDeliveryTime
 * - isPaused, pausedReason
 * - promoImages, promoTitle, promoText (StorePromo)
 */

import { useState, useEffect } from 'react';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useStore } from '../../contexts/StoreContext';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../../components/admin/AdminSidebar';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Badge from '../../components/common/Badge';
import { Store, Save, Plus, ArrowUp, ArrowDown, Trash2 } from 'lucide-react';

export default function AdminStoreSettings() {
  const navigate = useNavigate();
  const { store, loading } = useStore();
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    deliveryFee: 0,
    minOrderAmount: 0,
    estimatedDeliveryTime: 30,
    isPaused: false,
    pausedReason: '',
    promoImages: [] as string[],
    promoTitle: '',
    promoText: ''
  });

  useEffect(() => {
    if (store) {
      // V3 코드베이스의 isOrderingPaused 속성 및 S0의 isPaused 속성 호환 지원
      const currentIsPaused = ('isPaused' in store) ? !!(store as any).isPaused : !!store.isOrderingPaused;

      setFormData({
        name: store.name || '',
        description: store.description || '',
        deliveryFee: store.deliveryFee || 0,
        minOrderAmount: store.minOrderAmount || 0,
        estimatedDeliveryTime: store.settings?.estimatedDeliveryTime ?? 30,
        isPaused: currentIsPaused,
        pausedReason: store.pausedReason || '',
        promoImages: (store as any).promoImages || [],
        promoTitle: (store as any).promoTitle || '',
        promoText: (store as any).promoText || ''
      });
    }
  }, [store]);

  const handlePromoImageChange = (index: number, value: string) => {
    const newImages = [...formData.promoImages];
    newImages[index] = value;
    setFormData({ ...formData, promoImages: newImages });
  };

  const addPromoImage = () => {
    if (formData.promoImages.length >= 5) return;
    setFormData({ ...formData, promoImages: [...formData.promoImages, ''] });
  };

  const removePromoImage = (index: number) => {
    const newImages = formData.promoImages.filter((_, i) => i !== index);
    setFormData({ ...formData, promoImages: newImages });
  };

  const movePromoImage = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === formData.promoImages.length - 1) return;

    const newImages = [...formData.promoImages];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newImages[index], newImages[targetIndex]] = [newImages[targetIndex], newImages[index]];
    setFormData({ ...formData, promoImages: newImages });
  };

  const hasInvalidPromoUrl = formData.promoImages.some(
    url => url.trim() !== '' && !url.trim().startsWith('http://') && !url.trim().startsWith('https://')
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!store || !store.id) {
      toast.error('상점 정보를 불러올 수 없습니다 (storeId 누락)');
      return;
    }

    if (hasInvalidPromoUrl) {
      toast.error('홍보 이미지 URL은 http:// 또는 https://로 시작해야 합니다');
      return;
    }

    setSaving(true);
    try {
      const storeRef = doc(db, 'stores', store.id); // store.id를 storeId로 사용 (하드코딩 방지)

      // 빈 문자열 제거
      const cleanedPromoImages = formData.promoImages.filter(url => url.trim() !== '');

      const payload = {
        name: formData.name,
        description: formData.description,
        deliveryFee: Number(formData.deliveryFee) || 0,
        minOrderAmount: Number(formData.minOrderAmount) || 0,
        isPaused: formData.isPaused,
        pausedReason: formData.pausedReason, // UX 규칙: false이더라도 값은 유지
        "settings.estimatedDeliveryTime": Number(formData.estimatedDeliveryTime) || 30,
        promoImages: cleanedPromoImages, // 비어있으면 []로 자동 저장
        promoTitle: formData.promoTitle,
        promoText: formData.promoText,
        updatedAt: serverTimestamp(),
      };

      await updateDoc(storeRef, payload);
      toast.success('상점 정보가 성공적으로 업데이트되었습니다');
    } catch (error) {
      console.error('Failed to update store:', error);
      toast.error('상점 정보 업데이트에 실패했습니다');
    } finally {
      setSaving(false);
    }
  };

  if (!store) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-2xl mx-auto text-center py-16">
            {loading ? (
              <div className="space-y-4">
                <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto animate-pulse">
                  <Store className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">상점 정보 로딩 중...</h2>
                <p className="text-gray-600">잠시만 기다려주세요</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="w-16 h-16 bg-gray-200 rounded-2xl flex items-center justify-center mx-auto">
                  <Store className="w-8 h-8 text-gray-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">상점 문서가 없습니다</h2>
                  <p className="text-gray-600 mb-6">
                    현재 운영 중인 상점 문서(default)를 찾을 수 없습니다.
                  </p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />

      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 gradient-primary rounded-2xl flex items-center justify-center">
                <Store className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl">
                <span className="bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
                  가게정보 수정
                </span>
              </h1>
            </div>
            <p className="text-gray-600">
              핵심 필수 정보만 수정할 수 있습니다 (이외 설정은 개발팀 문의)
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 매장 상태 */}
            <Card className={formData.isPaused ? "border-l-4 border-l-red-500" : "border-l-4 border-l-green-500"}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">영업 상태</h2>
                <Badge variant={formData.isPaused ? "danger" : "success"} size="lg">
                  {formData.isPaused ? "영업 일시중지" : "정상 영업 중"}
                </Badge>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 mb-1">
                      {formData.isPaused ? "현재 주문을 받고 있지 않습니다" : "주문을 받을 준비가 되었습니다"}
                    </p>
                    <p className="text-sm text-gray-600">
                      영업을 일시중지하면 앱 내에서 주문을 완료할 수 없도록 차단됩니다.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={formData.isPaused}
                      onChange={(e) => setFormData({ ...formData, isPaused: e.target.checked })}
                    />
                    <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-red-500"></div>
                  </label>
                </div>

                <div className={`transition-opacity duration-300 ${!formData.isPaused ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
                  <Input
                    label="중지 사유"
                    disabled={!formData.isPaused}
                    placeholder="예: 주문 폭주로 인해 잠시 중단합니다"
                    value={formData.pausedReason}
                    onChange={(e) => setFormData({ ...formData, pausedReason: e.target.value })}
                  />
                  {!formData.isPaused && <p className="text-xs text-gray-500 mt-1">영업 중지 시에만 입력 활성화됩니다.</p>}
                </div>
              </div>
            </Card>

            {/* 기본 정보 */}
            <Card>
              <h2 className="text-xl font-bold text-gray-900 mb-6">가게 기본 정보</h2>

              <div className="space-y-5">
                <Input
                  label="상점 이름"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    상점 설명
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2.5 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 resize-none"
                    rows={4}
                    required
                  />
                </div>
              </div>
            </Card>

            {/* 홈 화면 홍보 (StorePromo) */}
            <Card>
              <h2 className="text-xl font-bold text-gray-900 mb-2">홈 화면 홍보 (StorePromo)</h2>
              <p className="text-sm text-gray-500 mb-6">앱 홈 화면 상단에 띄울 홍보 이미지와 문구를 설정합니다.</p>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      홍보 이미지 URL (최대 5개)
                    </label>
                    {formData.promoImages.length < 5 && (
                      <Button type="button" variant="outline" size="sm" onClick={addPromoImage}>
                        <Plus className="w-4 h-4 mr-1" /> 추가
                      </Button>
                    )}
                  </div>

                  {formData.promoImages.length === 0 ? (
                    <div className="bg-gray-50 p-4 rounded-lg text-center text-sm text-gray-500 border border-dashed border-gray-300">
                      등록된 이미지가 없습니다. 추가 버튼을 눌러 URL을 입력하세요.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {formData.promoImages.map((url, index) => {
                        const isInvalid = url.trim() !== '' && !url.trim().startsWith('http://') && !url.trim().startsWith('https://');
                        return (
                          <div key={index} className="flex items-start gap-2">
                            <div className="flex-1">
                              <Input
                                value={url}
                                onChange={(e) => handlePromoImageChange(index, e.target.value)}
                                placeholder="https://..."
                                className={isInvalid ? 'border-red-500 focus:ring-red-500' : ''}
                              />
                              {isInvalid && (
                                <p className="text-xs text-red-500 mt-1">올바른 URL 형식(http:// 또는 https://)이 아닙니다.</p>
                              )}
                            </div>
                            <div className="flex items-center gap-1 shrink-0 pt-1">
                              <Button
                                type="button"
                                variant="outline"
                                className="px-2"
                                disabled={index === 0}
                                onClick={() => movePromoImage(index, 'up')}
                                title="위로 이동"
                              >
                                <ArrowUp className="w-4 h-4" />
                              </Button>
                              <Button
                                type="button"
                                variant="outline"
                                className="px-2"
                                disabled={index === formData.promoImages.length - 1}
                                onClick={() => movePromoImage(index, 'down')}
                                title="아래로 이동"
                              >
                                <ArrowDown className="w-4 h-4" />
                              </Button>
                              <Button
                                type="button"
                                variant="outline"
                                className="px-2 text-red-500 hover:bg-red-50"
                                onClick={() => removePromoImage(index)}
                                title="삭제"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <div className="space-y-5">
                    <Input
                      label="홍보 섹션 제목 (선택)"
                      placeholder="예: 온족 봄맞이 특별 이벤트!"
                      value={formData.promoTitle}
                      onChange={(e) => setFormData({ ...formData, promoTitle: e.target.value })}
                    />

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        홍보 섹션 본문 (선택)
                      </label>
                      <textarea
                        value={formData.promoText}
                        onChange={(e) => setFormData({ ...formData, promoText: e.target.value })}
                        placeholder="이벤트 상세 내용 등을 적어주세요."
                        className="w-full px-4 py-2.5 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 resize-none"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* 주문조건 설정 */}
            <Card>
              <h2 className="text-xl font-bold text-gray-900 mb-6">주문 조건 설정</h2>

              <div className="space-y-5">
                <Input
                  label="배달비 (원)"
                  type="number"
                  value={formData.deliveryFee}
                  onChange={(e) => setFormData({ ...formData, deliveryFee: e.target.value ? parseInt(e.target.value) : 0 })}
                  required
                />

                <Input
                  label="최소 주문 금액 (원)"
                  type="number"
                  value={formData.minOrderAmount}
                  onChange={(e) => setFormData({ ...formData, minOrderAmount: e.target.value ? parseInt(e.target.value) : 0 })}
                  required
                />

                <Input
                  label="예상 배달 소요 시간 (분)"
                  type="number"
                  value={formData.estimatedDeliveryTime}
                  onChange={(e) => setFormData({ ...formData, estimatedDeliveryTime: e.target.value ? parseInt(e.target.value) : 0 })}
                  required
                />
              </div>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-end gap-4">
              <Button
                type="submit"
                disabled={saving || hasInvalidPromoUrl}
                size="lg"
              >
                <Save className="w-5 h-5 mr-2" />
                {saving ? '저장 중...' : '변경사항 저장'}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}