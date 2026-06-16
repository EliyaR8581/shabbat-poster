import React, { useState } from 'react';

export default function App() {
  const [parasha, setParasha] = useState('פרשת השבוע');
  const [schedule, setSchedule] = useState([
    { id: 1, name: 'כניסת שבת', time: '19:30' },
    { id: 2, name: 'הדלקת נרות', time: '19:15' }
  ]);

  return (
    <div style={{ direction: 'rtl', fontFamily: 'Arial, sans-serif', padding: '20px', backgroundColor: '#f0f0f0', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      <div style={{ marginBottom: '20px', backgroundColor: 'white', padding: '20px', borderRadius: '10px', width: '100%', maxWidth: '400px' }}>
        <h2>עריכת פוסטר</h2>
        <input type="text" value={parasha} onChange={(e) => setParasha(e.target.value)} style={{ width: '100%', padding: '10px', fontSize: '16px' }} />
      </div>

      <div style={{ width: '210mm', minHeight: '297mm', backgroundColor: 'white', padding: '20mm', boxShadow: '0 0 10px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center', transform: 'scale(0.6)', transformOrigin: 'top center' }}>
        <h1 style={{ fontSize: '60px' }}>שבת שלום</h1>
        <h2 style={{ fontSize: '40px', color: '#333' }}>{parasha}</h2>
        <div style={{ width: '100%', marginTop: '50px', fontSize: '30px' }}>
          {schedule.map((item) => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', borderBottom: '1px solid #ccc' }}>
              <span>{item.name}</span>
              <span>{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
