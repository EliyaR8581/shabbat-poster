import React, { useState, useRef } from 'react';

export default function App() {
  const [parasha, setParasha] = useState('פרשת השבוע');
  const [schedule, setSchedule] = useState([{ id: 1, name: 'כניסת שבת', time: '19:30', active: true }]);

  return (
    <div style={{ direction: 'rtl', fontFamily: 'Arial, sans-serif', padding: '20px', backgroundColor: '#f0f0f0', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* פאנל עריכה */}
      <div style={{ marginBottom: '20px', backgroundColor: 'white', padding: '15px', borderRadius: '10px', width: '100%', maxWidth: '400px' }}>
        <h3 style={{ marginTop: 0 }}>עריכת פרטים</h3>
        <input type="text" value={parasha} onChange={(e) => setParasha(e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />
      </div>

      {/* הפוסטר */}
      <div style={{ 
        width: '210mm', 
        minHeight: '297mm', 
        backgroundColor: 'white', 
        padding: '20mm', 
        boxSizing: 'border-box', 
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        transform: 'scale(0.7)', // הקטנה כדי שייכנס במסך
        transformOrigin: 'top center'
      }}>
        <h1 style={{ fontSize: '60px', marginBottom: '10px' }}>שבת שלום</h1>
        <h2 style={{ fontSize: '40px', color: '#555' }}>{parasha}</h2>
        <div style={{ width: '100%', marginTop: '50px', fontSize: '30px' }}>
          {schedule.map((item) => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', borderBottom: '2px dashed #ccc' }}>
              <span>{item.name}</span>
              <span>{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
