import React from 'react';

const AccountInfoSettings = () => {
  return (
    <div
      className="min-h-full"
      style={{ background: '#fff', minHeight: '100vh', padding: '0 0 32px 0' }}
    >
      <header style={{ paddingTop: 32, textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>
        계정 설정
      </header>
      <ul style={{ marginTop: 32, padding: 0, listStyle: 'none' }}>
        <li style={{ padding: '20px 16px', borderBottom: '1px solid #eee', cursor: 'pointer' }}>
          비밀번호 변경
        </li>
        <li style={{ padding: '20px 16px', borderBottom: '1px solid #eee', cursor: 'pointer' }}>
          로그아웃
        </li>
        <li style={{ padding: '20px 16px', cursor: 'pointer' }}>탈퇴하기</li>
      </ul>
    </div>
  );
};

export default AccountInfoSettings;
