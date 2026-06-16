import React, { useState } from 'react';

export default function App() {
  const [parasha, setParasha] = useState('פרשת השבוע');
  const [time, setTime] = useState('19:30');

  return (
    <h1 style={{ color: 'red', textAlign: 'center' }}>!!! עכשיו זה בטוח הגרסה החדשה !!!</h1>
    <div style={{ 
      direction: 'rtl', 
      fontFamily: 'Arial, sans-serif', 
      padding: '20px', 
      backgroundColor: '#f4f4f9', 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center' 
    }}>
      
      {/* פאנל עריכה */}
      <div style={{ marginBottom: '30px', backgroundColor: 'white', padding: '20px', borderRadius: '15px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' }}>
        <h3 style={{ margin: '0 0 10px 0' }}>הגדרות הפוסטר</h3>
        <input 
          type="text" 
          value={parasha} 
          onChange={(e) => setParasha(e.target.value)} 
          placeholder="שם הפרשה"
          style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '8px', border: '1px solid #ddd', boxSizing: 'border-box' }} 
        />
      </div>

      {/* הפוסטר עצמו */}
      <div style={{ 
        width: '210mm', 
        height: '297mm', 
        backgroundColor: 'white', 
        padding: '20mm', 
        boxShadow: '0 0 20px rgba(0,0,0,0.2)',
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        transform: 'scale(0.5)', 
        transformOrigin: 'top center',
        border: '1px solid #eee'
      }}>
        <h1 style={{ fontSize: '80px', margin: '0 0 20px 0' }}>שבת שלום</h1>
        <h2 style={{ fontSize: '50px', color: '#444', margin: '0 0 40px 0' }}>{parasha}</h2>
        <div style={{ width: '100%', borderTop: '3px solid #333', paddingTop: '30px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '40px', padding: '20px 0' }}>
            <span>כניסת שבת</span>
            <span>{time}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
