import React, { useState } from 'react';

interface BookmarkItem {
  id: number;
  imageUrl: string;
}

const Bookmark = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  // 임시 데이터
  const [bookmarks] = useState<BookmarkItem[]>([
    { id: 1, imageUrl: '/sample1.jpg' },
    { id: 2, imageUrl: '/sample2.jpg' },
    // ... 더 많은 아이템 추가 가능
  ]);

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
    <div className="p-5">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-xl font-bold">나의 북마크</h1>
        <button className="text-blue-500 text-base" onClick={toggleEditMode}>
          {isEditMode ? '완료' : '편집'}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {bookmarks.map(item => (
          <div key={item.id} className="relative">
            <div
              className={`relative h-[224px] rounded-lg overflow-hidden ${
                selectedItems.includes(item.id) ? 'bg-blue-500/10' : ''
              }`}
            >
              <img
                src={item.imageUrl}
                alt={`bookmark-${item.id}`}
                className="w-full h-full object-cover"
              />
              {isEditMode && (
                <button
                  onClick={() => toggleSelect(item.id)}
                  className={`absolute top-2.5 right-2.5 w-6 h-6 rounded-full border-2 border-white cursor-pointer ${
                    selectedItems.includes(item.id) ? 'bg-blue-500' : 'bg-transparent'
                  }`}
                >
                  {selectedItems.includes(item.id) && (
                    <svg
                      className="w-4 h-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                      viewBox="0 0 24 24"
                      fill="white"
                    >
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                    </svg>
                  )}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {isEditMode && (
        <button
          onClick={handleDelete}
          className="fixed bottom-5 left-1/2 transform -translate-x-1/2 w-[calc(100%-40px)] h-14 bg-blue-500 text-white rounded-lg font-bold"
        >
          코디 삭제
        </button>
      )}
    </div>
  );
};

export default Bookmark;
