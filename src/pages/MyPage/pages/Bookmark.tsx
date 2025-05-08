import React, { useState } from 'react';
import { useFetchBookmark } from '../fetches/useFetchBookmark';
import type { BookmarkItem } from '../apis';

const Bookmark = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const { data: bookmarks = [], isLoading, error } = useFetchBookmark();

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>에러가 발생했습니다.</div>;
  }

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
    setSelectedItems([]);
  };

  const toggleSelect = (id: number) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(itemId => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleDelete = () => {
    // 선택된 아이템 삭제 로직 구현
    console.log('Delete items:', selectedItems);
  };

  return (
    <div className="p-5 pb-24 w-full h-screen flex flex-col">
      <div className="flex justify-between items-center mb-3">
        <h1 className="text-[14px] font-medium leading-[150%] text-[#8E8E8E]">나의 북마크</h1>
        <button className="text-blue-500 text-base" onClick={toggleEditMode}>
          {isEditMode ? '완료' : '편집'}
        </button>
      </div>
      <div className="flex justify-between items-center mb-4">
        <span className="text-[13px] text-[#B0B0B0] font-medium">
          {isEditMode ? `선택 ${selectedItems.length}개` : `북마크 ${bookmarks.length || 0}개`}
        </span>
      </div>
      <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:none]">
        <div className="grid grid-cols-2 gap-[13px] items-center mb-3">
          {Array.isArray(bookmarks) &&
            bookmarks.map((item: BookmarkItem) => (
              <div
                key={item.id}
                className={`relative rounded-xl overflow-hidden
                          bg-[#F5F5F7] h-[220px] flex items-center justify-center
                          transition-colors duration-150`}
              >
                <img
                  src={item.outfitImage.metadata.presignedUrl}
                  alt={item.outfitImage.title}
                  className="w-full h-full object-contain rounded-lg"
                />
                {selectedItems.includes(item.id) && isEditMode && (
                  <div className="absolute inset-0 bg-[rgba(0,0,0,0.12)] rounded-lg transition-opacity duration-200 ease-in-out" />
                )}
                {isEditMode && (
                  <button
                    onClick={() => toggleSelect(item.id)}
                    className={`absolute top-2.5 right-2.5 w-6 h-6 rounded-full border-2 border-[#E0E0E0] bg-white flex items-center justify-center shadow-sm transition-all duration-200 ease-in-out ${selectedItems.includes(item.id) ? 'border-blue-500' : ''}`}
                  >
                    {selectedItems.includes(item.id) && (
                      <svg
                        className="w-4 h-4 text-blue-500 transition-opacity duration-200 ease-in-out"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </button>
                )}
              </div>
            ))}
        </div>
      </div>
      {isEditMode && (
        <button
          onClick={handleDelete}
          disabled={selectedItems.length === 0}
          className={`absolute left-1/2 bottom-5 -translate-x-1/2 w-[calc(100%-40px)] h-14 rounded-lg transition-colors duration-150
            ${selectedItems.length === 0 ? 'bg-[#E0E0E0]' : 'bg-[#4D97FF]'}
          `}
        >
          <span
            className={`block w-full text-center text-[16px] font-medium
              ${selectedItems.length === 0 ? 'text-[#8E8E8E]' : 'text-white'}
            `}
          >
            코디 삭제
          </span>
        </button>
      )}
    </div>
  );
};

export default Bookmark;
