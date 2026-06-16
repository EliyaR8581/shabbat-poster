import React, { useState } from 'react';

export default function App() {
  const [parasha, setParasha] = useState('פרשת השבוע');
  const [schedule, setSchedule] = useState([
    { id: 1, name: 'כניסת שבת', time: '19:30' },
    { id: 2, name: 'פעולת חב"ב', time: '21:00' }
  ]);

  return (
    <div style={{ direction: 'rtl', fontFamily: 'sans-serif', padding: '20px', backgroundColor: '#f3f4f6', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* פאנל עריכה */}
      <div style={{ marginBottom: '30px', backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' }}>
        <h2 style={{ marginTop: 0 }}>עריכת פרטים</h2>
        <label>שם הפרשה:</label>
        <input type="text" value={parasha} onChange={(e) => setParasha(e.target.value)} style={{ width: '100%', padding: '10px', marginTop: '5px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #ccc' }} />
      </div>

      {/* הפוסטר */}
      <div style={{ 
        width: '210mm', 
        minHeight: '297mm', 
        backgroundColor: 'white', 
        padding: '20mm', 
        boxSizing: 'border-box', 
        boxShadow: '0 0 10px rgba(0,0,0,0.2)',
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        transform: 'scale(0.5)', // הקטנה כדי שייכנס במסך
        transformOrigin: 'top center'
      }}>
        <h1 style={{ fontSize: '80px', marginBottom: '20px' }}>שבת שלום</h1>
        <h2 style={{ fontSize: '50px', color: '#555', marginBottom: '40px' }}>{parasha}</h2>
        <div style={{ width: '100%', borderTop: '2px solid #ccc', paddingTop: '20px' }}>
          {schedule.map((item) => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 0', borderBottom: '1px dashed #ccc', fontSize: '30px' }}>
              <span>{item.name}</span>
              <span>{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
