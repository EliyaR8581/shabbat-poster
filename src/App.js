import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';

// הטמעת התמונות ישירות בקוד כדי למנוע שגיאות נתיב
const IMAGES = {
  ba: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4QAqRXhpZgAASUkqAAgAAAABADEBAgAHAAAAGgAAAAAAAABQaWNhc2EAAP/iAdhJQ0NfUFJP...', // קיצרתי לצורך התצוגה, החלף את כל הקוד הארוך שקיבלת מההמרה
  ezra: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAvQAAALiCAYAAAC2U0KQAAAABHNCSVQICAgIfAhkiAAAKr16VFh0UmF3IHByb2ZpbGUgdHlwZSBB...',
  ariel: 'data:image/webp;base64,UklGRkRqAABXRUJQVlA4WAoAAAAIAAAAtAEAXgIAVlA4IG5NAACwJAGdASq1AV8CPjEYikOiIaERueWoIAMEsrd99ZynUBagt7W3...'
};

export default function App() {
  const posterRef = useRef(null);
  const fileInputRef = useRef(null);
  const [bgColor, setBgColor] = useState('#f2f9f1');
  const [parasha, setParasha] = useState('פרשת השבוע');
  const [footerText, setFooterText] = useState('צוות הדרכה');
  const [selectedMovement, setSelectedMovement] = useState('ba');
  const [customLogo, setCustomLogo] = useState('');
  const [schedule, setSchedule] = useState([
    { id: 1, name: 'כניסת שבת', time: '19:30', active: true },
    { id: 2, name: 'פעולת חב"ב', time: '21:00', active: true },
    { id: 3, name: 'מפקד', time: '15:45', active: true },
    { id: 4, name: 'מנחה', time: '16:00', active: true },
    { id: 5, name: 'פעולות', time: '16:30', active: true },
    { id: 6, name: 'סד"ש', time: '18:00', active: true },
    { id: 7, name: 'ערבית', time: '19:45', active: true },
    { id: 8, name: 'מוצ"ש', time: '20:30', active: true }
  ]);

  const handleDownload = async () => {
    if (posterRef.current) {
      const canvas = await html2canvas(posterRef.current, { scale: 2 });
      const link = document.createElement('a');
      link.download = `${parasha}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  };

  return (
    <div style={{ direction: 'rtl', padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#f3f4f6', minHeight: '100vh' }}>
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
        
        {/* פאנל הגדרות */}
        <div style={{ width: '400px', backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <h2>הגדרות</h2>
          <label>צבע רקע:</label>
          <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
          <br /><br />
          <label>בחר סמל:</label>
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button onClick={() => setSelectedMovement('ba')}>בני עקיבא</button>
            <button onClick={() => setSelectedMovement('ezra')}>עזרא</button>
            <button onClick={() => setSelectedMovement('ariel')}>אריאל</button>
          </div>
          <br />
          <button onClick={handleDownload} style={{ width: '100%', padding: '10px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '8px' }}>
            הורד פוסטר
          </button>
        </div>

        {/* הפוסטר */}
        <div ref={posterRef} style={{ width: '550px', height: '778px', backgroundColor: bgColor, padding: '50px', borderRadius: '16px', position: 'relative', boxShadow: '0 10px 15px rgba(0,0,0,0.1)' }}>
           <div style={{ width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden', border: '3px solid white' }}>
             <img src={customLogo || IMAGES[selectedMovement]} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
           </div>
           <h1 style={{ textAlign: 'center' }}>שבת שלום</h1>
           <h2 style={{ textAlign: 'center' }}>{parasha}</h2>
        </div>
      </div>
    </div>
  );
}
