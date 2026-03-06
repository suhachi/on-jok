import React, { useMemo } from 'react';
import { Menu } from '../../types/menu';
import MenuCard from '../menu/MenuCard';

interface RecommendedMenuProps {
    menus: Menu[] | null;
}

export default function RecommendedMenu({ menus }: RecommendedMenuProps) {
    const recommendedMenus = useMemo(() => {
        if (!menus) return [];

        // Tier 2: category에 '인기메뉴' 또는 '추천메뉴' 포함, 최대 6개
        return menus
            .filter(
                (menu) =>
                    !menu.isHidden &&
                    menu.category.some((c) => c === '인기메뉴' || c === '추천메뉴')
            )
            .slice(0, 6);
    }, [menus]);

    // 추천 메뉴가 없으면 섹션 전체 미노출 (빈 공간 없음)
    if (recommendedMenus.length === 0) {
        return null;
    }

    return (
        <section className="bg-white py-6 mb-2 shadow-sm">
            <div className="container mx-auto px-4 mb-4">
                <h2 className="text-xl font-bold text-gray-900">추천/인기 메뉴 ✨</h2>
            </div>

            {/* 모바일: 가로 스크롤 UX 유지, 데스크톱: 그리드뷰 유지 */}
            <div className="md:hidden">
                <div className="flex gap-4 overflow-x-auto hide-scrollbar px-4 snap-x snap-mandatory pb-4">
                    {recommendedMenus.map((menu) => (
                        <div key={menu.id} className="flex-shrink-0 w-[280px] snap-start">
                            <MenuCard menu={menu} />
                        </div>
                    ))}
                </div>
            </div>

            <div className="hidden md:block container mx-auto px-4">
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                    {recommendedMenus.map((menu) => (
                        <MenuCard key={menu.id} menu={menu} />
                    ))}
                </div>
            </div>
        </section>
    );
}
