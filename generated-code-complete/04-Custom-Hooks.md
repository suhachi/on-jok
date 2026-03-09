# 04-Custom-Hooks

Files: 6

---

## D:\projectsing\S-Delivery-AppV3\src\hooks\useFirebaseAuth.ts

Size: 6.5 KB

```
import { useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  updateProfile,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

interface User {
  id: string;
  email: string;
  displayName?: string;
  phone?: string;
}

// 데모 계정 정보
const DEMO_ACCOUNTS = {
  'user@demo.com': {
    password: 'demo123',
    id: 'demo-user-001',
    email: 'user@demo.com',
    displayName: '데모 사용자',
    isAdmin: false,
  },
  'admin@demo.com': {
    password: 'admin123',
    id: 'demo-admin-001',
    email: 'admin@demo.com',
    displayName: '관리자',
    isAdmin: true,
  },
};

export function useFirebaseAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // 데모 모드 확인
  const isDemoMode = auth.app.options.apiKey === 'demo-api-key';

  useEffect(() => {
    // 데모 모드인 경우 로컬 스토리지에서 사용자 정보 로드
    if (isDemoMode) {
      const demoUser = localStorage.getItem('demoUser');
      if (demoUser) {
        setUser(JSON.parse(demoUser));
      }
      setLoading(false);
      return;
    }

    // Firebase 인증 모드
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Firestore에서 추가 정보(phone 등) 가져오기
        const userRef = doc(db, 'users', firebaseUser.uid);
        const userDoc = await getDoc(userRef);
        const userData = userDoc.data();

        setUser({
          id: firebaseUser.uid,
          email: firebaseUser.email || '',
          displayName: userData?.displayName || firebaseUser.displayName || undefined, // Firestore 데이터 우선
          phone: userData?.phone || undefined,
        });

        // Firestore에 사용자 문서 생성 (없으면)
        if (!userDoc.exists()) {
          await ensureUserDocument(firebaseUser);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [isDemoMode]);

  const signup = async (email: string, password: string, displayName?: string, phone?: string) => {
    // 데모 모드
    if (isDemoMode) {
      // 데모 모드에서는 회원가입 시뮬레이션
      const newUser: User = {
        id: `demo-user-${Date.now()}`,
        email,
        displayName: displayName || email.split('@')[0],
        phone: phone || '010-0000-0000',
      };
      setUser(newUser);
      localStorage.setItem('demoUser', JSON.stringify(newUser));
      localStorage.setItem('demoIsAdmin', 'false');
      return;
    }

    // Firebase 모드
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // 프로필 업데이트
      if (displayName && userCredential.user) {
        await updateProfile(userCredential.user, { displayName });
      }

      // Firestore에 사용자 문서 생성
      await createUserDocument(userCredential.user, displayName, phone);

      return userCredential.user;
    } catch (error) {
      const errorCode = (error as { code?: string }).code || 'unknown';
      throw new Error(getAuthErrorMessage(errorCode));
    }
  };

  const login = async (email: string, password: string) => {
    // 데모 모드
    if (isDemoMode) {
      const demoAccount = DEMO_ACCOUNTS[email as keyof typeof DEMO_ACCOUNTS];

      if (!demoAccount) {
        throw new Error('존재하지 않는 사용자입니다. 데모 계정을 사용해주세요:\n- user@demo.com / demo123\n- admin@demo.com / admin123');
      }

      if (demoAccount.password !== password) {
        throw new Error('잘못된 비밀번호입니다');
      }

      // 데모 계정 로그인
      const { id, email: demoEmail, displayName, isAdmin } = demoAccount;
      const demoUser: User = { id, email: demoEmail, displayName };

      setUser(demoUser);
      localStorage.setItem('demoUser', JSON.stringify(demoUser));
      localStorage.setItem('demoIsAdmin', String(isAdmin));

      return;
    }

    // Firebase 모드
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      const errorCode = (error as { code?: string }).code || 'unknown';
      throw new Error(getAuthErrorMessage(errorCode));
    }
  };

  const logout = async () => {
    // 데모 모드
    if (isDemoMode) {
      setUser(null);
      localStorage.removeItem('demoUser');
      localStorage.removeItem('demoIsAdmin');
      return;
    }

    // Firebase 모드
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      throw new Error('로그아웃에 실패했습니다');
    }
  };

  return { user, loading, signup, login, logout };
}

// Firestore에 사용자 문서 생성
async function createUserDocument(firebaseUser: FirebaseUser, displayName?: string, phone?: string) {
  const userRef = doc(db, 'users', firebaseUser.uid);

  await setDoc(userRef, {
    email: firebaseUser.email,
    displayName: displayName || firebaseUser.email?.split('@')[0] || '',
    phone: phone || '',
    createdAt: new Date(),
    updatedAt: new Date(),
  }, { merge: true });
}

// 사용자 문서 확인 및 생성
async function ensureUserDocument(firebaseUser: FirebaseUser) {
  const userRef = doc(db, 'users', firebaseUser.uid);
  const userDoc = await getDoc(userRef);

  if (!userDoc.exists()) {
    await createUserDocument(firebaseUser, firebaseUser.displayName || undefined);
  }
}

// Firebase 에러 메시지 한글화
function getAuthErrorMessage(errorCode: string): string {
  const errorMessages: Record<string, string> = {
    'auth/email-already-in-use': '이미 사용 중인 이메일입니다',
    'auth/invalid-email': '올바른 이메일 형식이 아닙니다',
    'auth/operation-not-allowed': '이메일/비밀번호 로그인이 비활성화되어 있습니다',
    'auth/weak-password': '비밀번호는 최소 6자 이상이어야 합니다',
    'auth/user-disabled': '비활성화된 계정입니다',
    'auth/user-not-found': '존재하지 않는 사용자입니다',
    'auth/wrong-password': '잘못된 비밀번호입니다',
    'auth/too-many-requests': '너무 많은 시도가 있었습니다. 잠시 후 다시 시도해주세요',
    'auth/network-request-failed': '네트워크 오류가 발생했습니다',
  };

  return errorMessages[errorCode] || '인증 오류가 발생했습니다';
}
```

---

## D:\projectsing\S-Delivery-AppV3\src\hooks\useFirestoreCollection.ts

Size: 1.76 KB

```
import { useState, useEffect, useRef } from 'react';
import {
  Query,
  onSnapshot,
  DocumentData,
  queryEqual
} from 'firebase/firestore';

interface UseFirestoreCollectionResult<T> {
  data: T[];
  loading: boolean;
  error: Error | null;
}

export function useFirestoreCollection<T extends DocumentData>(
  query: Query | null
): UseFirestoreCollectionResult<T> {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // 쿼리 객체 참조 안정화 (Deep Compare)
  const queryRef = useRef<Query | null>(query);

  // 렌더링 도중에 ref 업데이트 (useEffect보다 먼저 실행되어야 함)
  if (!queryEqual(queryRef.current, query)) {
    queryRef.current = query;
  }

  // 이제 useEffect는 안정화된 queryRef.current가 변경될 때만 실행됨
  // 즉, 쿼리의 내용이 실제로 바뀌었을 때만 재구독 발생
  useEffect(() => {
    const activeQuery = queryRef.current;

    if (!activeQuery) {
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const unsubscribe = onSnapshot(
        activeQuery,
        (snapshot) => {
          const items = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          })) as T[];

          setData(items);
          setLoading(false);
          setError(null);
        },
        (err) => {
          console.error(`Firestore collection error:`, err);
          setError(err as Error);
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      setError(err as Error);
      setLoading(false);
    }
  }, [queryRef.current]); // query 대신 queryRef.current 사용

  return { data, loading, error };
}

```

---

## D:\projectsing\S-Delivery-AppV3\src\hooks\useFirestoreDocument.ts

Size: 1.77 KB

```
import { useState, useEffect } from 'react';
import { doc, onSnapshot, DocumentData } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface UseFirestoreDocumentResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useFirestoreDocument<T extends DocumentData>(
  collectionName: string | string[],
  documentId: string | null | undefined
): UseFirestoreDocumentResult<T> {
  // 안정적인 의존성 키 생성 (배열인 경우 문자열로 결합)
  const collectionPath = Array.isArray(collectionName)
    ? collectionName.join('/')
    : collectionName;

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!documentId) {
      setData(null);
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      // collectionPath(문자열)를 사용하여 참조 생성
      const docRef = doc(db, collectionPath, documentId);

      const unsubscribe = onSnapshot(
        docRef,
        (snapshot) => {
          if (snapshot.exists()) {
            setData({
              id: snapshot.id,
              ...snapshot.data(),
            } as T);
          } else {
            setData(null);
          }
          setLoading(false);
          setError(null);
        },
        (err) => {
          console.error(`Firestore document error (${collectionPath}/${documentId}):`, err);
          setError(err as Error);
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      setError(err as Error);
      setLoading(false);
    }
  }, [collectionPath, documentId]); // 안정된 문자열 키 사용

  return { data, loading, error };
}

```

---

## D:\projectsing\S-Delivery-AppV3\src\hooks\useIsAdmin.ts

Size: 2.53 KB

```
import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';

export function useIsAdmin(userId: string | null | undefined) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // 데모 모드 확인
  const isDemoMode = auth.app.options.apiKey === 'demo-api-key';

  useEffect(() => {
    if (!userId) {
      setIsAdmin(false);
      setLoading(false);
      return;
    }

    // [CRITICAL FIX] Master Admin Fallback
    // DB 데이터가 소실되어도 admin@admin.com은 항상 관리자로 인식
    if (auth.currentUser?.email === 'admin@admin.com') {
      setIsAdmin(true);
      setLoading(false);
      return;
    }

    // 데모 모드인 경우 로컬 스토리지에서 확인
    if (isDemoMode) {
      const demoIsAdmin = localStorage.getItem('demoIsAdmin') === 'true';
      setIsAdmin(demoIsAdmin);
      setLoading(false);
      return;
    }

    // Firestore에서 관리자 권한 확인 (System Admin OR Store Owner)
    // 1. System Admin 체크
    const adminRef = doc(db, 'admins', userId);

    // 2. Store Owner 체크 (단일 상점 모드: 'default')
    const adminStoreRef = doc(db, 'adminStores', `${userId}_default`);

    // 두 경로 중 하나라도 존재하면 관리자로 인정
    // 실시간 리스너를 각각 연결하는 대신, 편의상 하나씩 확인하거나
    // 여기서는 onSnapshot을 두 번 호출하여 상태를 합칩니다.

    let isSystemAdmin = false;
    let isStoreOwner = false;

    // 리스너 관리를 위한 클린업 함수 배열
    const unsubscribes: (() => void)[] = [];

    const updateAdminStatus = () => {
      setIsAdmin(isSystemAdmin || isStoreOwner);
      setLoading(false);
    };

    const unsubAdmin = onSnapshot(adminRef, (doc) => {
      isSystemAdmin = doc.exists() && doc.data()?.isAdmin === true;
      updateAdminStatus();
    }, (err) => {
      console.error('System admin check failed:', err);
      // 에러 시 무시 (false)
    });
    unsubscribes.push(unsubAdmin);

    const unsubStore = onSnapshot(adminStoreRef, (doc) => {
      isStoreOwner = doc.exists(); // adminStores에 레코드가 있으면 권한 보유로 간주 (role 체크 추가 가능)
      updateAdminStatus();
    }, (err) => {
      console.error('Store owner check failed:', err);
    });
    unsubscribes.push(unsubStore);

    return () => {
      unsubscribes.forEach(unsub => unsub());
    };
  }, [userId, isDemoMode]);

  return { isAdmin, loading };
}
```

---

## D:\projectsing\S-Delivery-AppV3\src\hooks\useReorder.ts

Size: 4.94 KB

```
import { useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useCart } from '../contexts/CartContext';
import { Order, OrderItem } from '../types/order';
import { Menu } from '../types/menu';
import { toast } from 'sonner';

type ReorderStatus = 'valid' | 'deleted' | 'hidden' | 'soldout' | 'error';

interface ReorderCheckResult {
    item: OrderItem;
    status: ReorderStatus;
    menuData?: Menu;
    firestoreMenuId?: string;
    reason?: string;
}

export function useReorder() {
    const { addItem, clearCart } = useCart();
    const [reordering, setReordering] = useState(false);

    const handleReorder = async (storeId: string, order: Order) => {
        if (!storeId || !order.items || order.items.length === 0) return;

        if (!window.confirm('장바구니를 비우고 이 주문을 다시 담으시겠습니까?\n(옵션은 초기화되므로 다시 선택해주세요)')) {
            return;
        }

        setReordering(true);
        try {
            const promises = order.items.map(async (item): Promise<ReorderCheckResult> => {
                try {
                    // R2-FIX-04: menuId fallback
                    const menuId = item.menuId ?? (item as any).id;
                    if (!menuId) return { item, status: 'error', reason: 'ID 없음' };

                    const menuRef = doc(db, 'stores', storeId, 'menus', menuId);
                    const menuSnap = await getDoc(menuRef);

                    if (!menuSnap.exists()) {
                        return { item, status: 'deleted', reason: '메뉴 삭제됨' };
                    }

                    const menuData = menuSnap.data() as Menu;

                    if (menuData.isHidden) {
                        return { item, status: 'hidden', reason: '메뉴 숨김 처리됨' };
                    }

                    if (menuData.soldout) {
                        return { item, status: 'soldout', reason: '품절됨' };
                    }

                    return { item, status: 'valid', menuData, firestoreMenuId: menuSnap.id };
                } catch (e) {
                    return { item, status: 'error', reason: '확인 불가' };
                }
            });

            const results = await Promise.all(promises);

            const validItems: ReorderCheckResult[] = [];
            const invalidItems: ReorderCheckResult[] = [];

            results.forEach(res => {
                if (res.status === 'valid') {
                    validItems.push(res);
                } else {
                    invalidItems.push(res);
                }
            });

            if (validItems.length === 0) {
                toast.error('담을 수 있는 메뉴가 없습니다. (전체 품절 또는 삭제됨)');
                return;
            }

            // 2. 장바구니 초기화 및 담기
            clearCart();

            validItems.forEach(({ item, menuData, firestoreMenuId }) => {
                if (!menuData || !firestoreMenuId) return;

                // R2-FIX-02: 옵션 제거 정책 (가장 안전한 방법)
                // 옵션 가격/구조 변경 리스크로 인해 옵션은 제외하고 기본 메뉴만 담음
                addItem({
                    menuId: firestoreMenuId,
                    name: menuData.name,
                    price: menuData.price,
                    quantity: item.quantity,
                    options: [], // 옵션 초기화
                    imageUrl: menuData.imageUrl,
                });
            });

            // 3. 결과 알림 (R2-FIX-04: 상세 통계)
            const soldoutCount = invalidItems.filter(i => i.status === 'soldout').length;
            const hiddenCount = invalidItems.filter(i => i.status === 'hidden').length;
            const deletedCount = invalidItems.filter(i => i.status === 'deleted').length; // error 포함

            if (invalidItems.length > 0) {
                let msg = `${validItems.length}개 메뉴 담기 성공`;
                const excluded = [];
                if (soldoutCount > 0) excluded.push(`품절 ${soldoutCount}`);
                if (hiddenCount > 0) excluded.push(`숨김 ${hiddenCount}`);
                if (deletedCount > 0) excluded.push(`삭제/기타 ${deletedCount}`);

                toast.warning(`${msg} (${excluded.join(', ')} 제외됨)`);
                toast.info('옵션은 초기화되었으니 다시 선택해주세요.');
            } else {
                toast.success('메뉴를 장바구니에 담았습니다! 옵션을 다시 선택해주세요.');
            }

        } catch (error) {
            console.error('Reorder error:', error);
            toast.error('재주문 처리 중 오류가 발생했습니다.');
        } finally {
            setReordering(false);
        }
    };

    return { handleReorder, reordering };
}

```

---

## D:\projectsing\S-Delivery-AppV3\src\hooks\useUpsell.ts

Size: 2.87 KB

```
import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, limit, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Menu } from '../types/menu';
import { CartItem } from '../contexts/CartContext';

export function useUpsell(storeId: string | undefined, cartItems: CartItem[]) {
    const [upsellItems, setUpsellItems] = useState<Menu[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!storeId || cartItems.length === 0) {
            setUpsellItems([]);
            return;
        }

        const fetchUpsellItems = async () => {
            setLoading(true);
            try {
                // 간단한 추천 로직:
                // 장바구니에 '음료' 카테고리가 없으면 음료 추천
                // 장바구니에 '사이드' 카테고리가 없으면 사이드 추천
                // (단, 현재 CartItem에는 category 정보가 없어서, 이름 기반이나 별도 확인 필요하지만
                //  MVP에서는 단순히 '사이드', '음료' 카테고리의 인기 메뉴를 가져와서
                //  이미 장바구니에 있는건 제외하고 보여주는 식으로 구현)

                // 1. 추천 후보 카테고리 선정
                const targetCategories = ['사이드', '음료', '디저트'];

                // 2. 해당 카테고리 메뉴 Fetch (각 카테고리별 2~3개씩 or 전체에서 인기순 10개)
                // 여기서는 'isRecommended' 필드가 있다면 좋겠지만, 없으므로 단순 조회
                const menusRef = collection(db, 'stores', storeId, 'menus');
                const q = query(
                    menusRef,
                    where('category', 'array-contains-any', targetCategories),
                    where('soldout', '==', false),
                    where('isHidden', '==', false), // 숨김 메뉴 제외
                    limit(10)
                );

                const snapshot = await getDocs(q);
                const candidates = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Menu));

                // 3. 장바구니에 이미 있는 메뉴 제외
                const cartMenuIds = new Set(cartItems.map(item => item.menuId));
                const filtered = candidates.filter(menu => !cartMenuIds.has(menu.id));

                // 4. 최대 5개 랜덤 또는 순서대로 선택
                setUpsellItems(filtered.slice(0, 5));

            } catch (error) {
                console.error('Failed to fetch upsell items:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUpsellItems();
    }, [storeId, cartItems.length]); // cartItems 변경 시 재계산 (최적화 필요 시 length만 체크)

    return { upsellItems, loading };
}

```

---

