import React, { useState } from 'react';
import './CustomerPage.css'; // ✅追加

const dummyCustomers = [
  { id: 1, name: '山田 太郎', email: 'yamada@example.com' ,number:'08011001100',date:'2020/10/10',   avatar: 'https://randomuser.me/api/portraits/men/1.jpg'},
  { id: 2, name: '佐藤 花子', email: 'sato@example.com' ,number:'08022001100',date:'2020/11/11',avatar: 'https://randomuser.me/api/portraits/women/2.jpg'},
  { id: 3, name: '鈴木 次郎', email: 'suzuki@example.com' ,number:'08033001100',date:'2020/12/12', avatar: 'https://randomuser.me/api/portraits/men/3.jpg'},
];

export default function CustomerPage() {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState(null); // 'name' or 'email'or'number'or'date'
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'

  const handleSort = (key) => {
    if (sortKey === key) {
      // 同じカラムをクリックしたら順序をトグル
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const filteredCustomers = dummyCustomers
    .filter((customer) => {
      // ✅ 改善: 氏名・メール・電話番号・登録日すべてに対して検索
      const keyword = search.toLowerCase();
      return (
        customer.name.toLowerCase().includes(keyword) ||
        customer.email.toLowerCase().includes(keyword) ||
        customer.number.includes(keyword) ||
        customer.date.includes(keyword)
      );
    })
    .sort((a, b) => {
      if (!sortKey) return 0;
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return (
      <div className="container">
        <h2 className="title">顧客一覧</h2>
        <input
          type="text"
          className="search-box"
          placeholder="氏名・メール・電話・登録日"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <table className="customer-table">
          <thead>
            <tr>
              <th>顔写真</th> {/* 追加 */}
              <th onClick={() => handleSort('id')}>ID</th>
              <th onClick={() => handleSort('name')}>名前 {sortKey === 'name' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}</th>
              <th onClick={() => handleSort('email')}>メール {sortKey === 'email' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}</th>
              <th onClick={() => handleSort('number')}>電話番号 {sortKey === 'number' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}</th>
              <th onClick={() => handleSort('date')}>登録日 {sortKey === 'date' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((customer) => (
              <tr key={customer.id}>
                      <td>
        <img
          src={customer.avatar}
          alt={`${customer.name}の写真`}
          style={{ width: '48px', height: '48px', borderRadius: '50%' }}
        />
      </td>
                <td>{customer.id}</td>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.number}</td>
                <td>{customer.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}
