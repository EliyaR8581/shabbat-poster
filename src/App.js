import React, { useState } from 'react';

export default function App() {
  const [parasha, setParasha] = useState('פרשת השבוע');

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'Arial' }}>
      <h1>שבת שלום</h1>
      <h2>{parasha}</h2>
      
      <div style={{ marginTop: '30px' }}>
        <input 
          type="text" 
          value={parasha} 
          onChange={(e) => setParasha(e.target.value)} 
          placeholder="כתוב כאן את שם הפרשה"
          style={{ padding: '10px', fontSize: '18px' }}
        />
      </div>
      
      <p style={{ marginTop: '20px', color: '#666' }}>
        זהו הדף הבסיסי שלנו. ברגע שזה יעלה לאוויר, נשדרג את העיצוב!
      </p>
    </div>
  );
}
