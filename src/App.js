import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';

// הנתונים של התמונות מוטמעים כאן כדי למנוע שגיאות "File Not Found" בשרת
const LOGOS = {
  ba: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4QAqRXhpZgAASUkqAAgAAAABADEBAgAHAAAAGgAAAAAAAABQaWNhc2EAAP/iAdhJQ0NfUFJP...", // (הקוד הארוך מהתמונה שלך)
  ezra: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAvQAAALiCAYAAAC2U0KQAAAABHNCSVQICAgIfAhkiAAAKr16VFh0UmF3IHByb2ZpbGUgdHlwZSBB...", // (הקוד הארוך מהתמונה שלך)
  ariel: "data:image/webp;base64,UklGRkRqAABXRUJQVlA4WAoAAAAIAAAAtAEAXgIAVlA4IG5NAACwJAGdASq1AV8CPjEYikOiIaERueWoIAMEsrd99ZynUBagt7W3..." // (הקוד הארוך מהתמונה שלך)
};

export default function App() {
  const posterRef = useRef(null);
  const [bgColor, setBgColor] = useState('#f2f9f1');
  const [parasha, setParasha] = useState('פרשת השבוע');
  const [footerText, setFooterText] = useState('צוות הדרכה');
  const [selectedMovement, setSelectedMovement] = useState('ba');
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

  const handleShare = async () => {
    if (posterRef.current) {
      const canvas = await html2canvas(posterRef.current, { scale: 2 });
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        const file = new File([blob], `${parasha}.png`, { type: 'image/png' });
        if (navigator.share) {
          await navigator.share({ files: [file], title: 'פוסטר שבת', text: 'מוזמנים להצטרף!' });
        }
      });
    }
  };

  const updateItem = (id, field, value) => {
    setSchedule(schedule.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const addItem = () => setSchedule([...schedule, { id: Date.now(), name: 'זמן חדש', time: '00:00', active: true }]);
  const deleteItem = (id) => setSchedule(schedule.filter(item => item.id !== id));

  return (
    <div style={{ direction: 'rtl', padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#f3f4f6', minHeight: '100vh' }}>
      <div style={{ display: 'flex', gap: '30px', justifyContent: 'center', flexWrap: 'wrap' }}>
        
        {/* פאנל הגדרות */}
        <div style={{ width: '400px', backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <h2>הגדרות</h2>
          <label>צבע רקע:</label>
          <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
          
          <label>סמל:</label>
          <div style={{ display: 'flex', gap: '10px' }}>
            {['ba', 'ezra', 'ariel'].map(m => (
              <button key={m} onClick={() => setSelectedMovement(m)} style={{ border: selectedMovement === m ? '2px solid blue' : 'none', padding: '5px' }}>
                {m === 'ba' ? 'בני עקיבא' : m === 'ezra' ? 'עזרא' : 'אריאל'}
              </button>
            ))}
          </div>

          <input value={parasha} onChange={(e) => setParasha(e.target.value)} placeholder="שם הפרשה" style={{ width: '100%', margin: '10px 0' }} />
          <input value={footerText} onChange={(e) => setFooterText(e.target.value)} placeholder="כיתוב תחתון" style={{ width: '100%', margin: '10px 0' }} />

          {schedule.map(item => (
            <div key={item.id} style={{ display: 'flex', gap: '5px', marginBottom: '5px' }}>
              <input type="time" value={item.time} onChange={(e) => updateItem(item.id, 'time', e.target.value)} />
              <input value={item.name} onChange={(e) => updateItem(item.id, 'name', e.target.value)} />
              <button onClick={() => deleteItem(item.id)}>🗑️</button>
            </div>
          ))}
          <button onClick={addItem}>+ הוסף זמן</button>
          <hr />
          <button onClick={handleDownload}>⬇️ הורדה</button>
          <button onClick={handleShare}>📤 שיתוף</button>
        </div>

        {/* הפוסטר */}
        <div ref={posterRef} style={{ width: '550px', height: '778px', padding: '50px', backgroundColor: bgColor, position: 'relative' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden' }}>
            <img src={LOGOS[selectedMovement]} alt="logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <h1 style={{ textAlign: 'center' }}>{parasha}</h1>
          {schedule.filter(i => i.active).map(i => (
            <div key={i.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '20px', margin: '10px 0' }}>
              <span>{i.name}</span>
              <span>{i.time}</span>
            </div>
          ))}
          <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)' }}>
            {footerText}
          </div>
        </div>
      </div>
    </div>
  );
}
