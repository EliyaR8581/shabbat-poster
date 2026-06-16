import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';

export default function App() {
  const posterRef = useRef(null);
  const [bgColor, setBgColor] = useState('#f2f9f1');
  const [parasha, setParasha] = useState('פרשת השבוע');
  const [footerText, setFooterText] = useState('צוות הדרכה');
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
      // Scale 2 ensures good quality
      const canvas = await html2canvas(posterRef.current, { scale: 2 });
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `${parasha}.png`;
      link.href = dataUrl;
      link.click();
    }
  };

  const handleShare = async () => {
    if (posterRef.current) {
      const canvas = await html2canvas(posterRef.current, { scale: 2 });
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        const file = new File([blob], `${parasha}.png`, { type: 'image/png' });
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({ files: [file], title: 'פוסטר שבת', text: 'מוזמנים להצטרף!' });
          } catch (err) {
            alert('השיתוף נכשל: ' + err.message);
          }
        } else {
          alert('הדפדפן לא תומך בשיתוף ישיר. השתמש בהורדה.');
        }
      });
    }
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setCustomLogo(event.target.result);
      reader.readAsDataURL(file);
    }
  };

  const updateItem = (id, field, value) => {
    setSchedule(schedule.map((item) => item.id === id ? { ...item, [field]: value } : item));
  };

  const addItem = () => {
    const newItem = { id: Date.now(), name: 'זמן חדש', time: '00:00', active: true };
    setSchedule([...schedule, newItem]);
  };

  return (
    <div style={{ direction: 'rtl', padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#f3f4f6', minHeight: '100vh' }}>
      <style>{`
        @media print {
          body * { visibility: hidden; }
          .print-container, .print-container * { visibility: visible; }
          .print-container { position: absolute; left: 0; top: 0; width: 210mm; }
        }
      `}</style>

      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: '400px', backgroundColor: 'white', padding: '20px', borderRadius: '12px' }}>
          <h2>הגדרות לוח מודעות</h2>
          
          <label style={{ display: 'block', fontWeight: 'bold', marginTop: '10px' }}>צבע רקע:</label>
          <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} style={{ marginBottom: '20px' }} />

          <label style={{ display: 'block', fontWeight: 'bold', marginTop: '10px' }}>העלאת סמל:</label>
          <input type="file" accept="image/*" onChange={handleFile} style={{ marginBottom: '20px', display: 'block' }} />

          <label style={{ display: 'block', fontWeight: 'bold', marginTop: '10px' }}>שם הפרשה:</label>
          <input type="text" value={parasha} onChange={(e) => setParasha(e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />

          <label style={{ display: 'block', fontWeight: 'bold', marginTop: '10px' }}>כיתוב תחתון:</label>
          <input type="text" value={footerText} onChange={(e) => setFooterText(e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '20px' }} />

          <h3 style={{ fontWeight: 'bold', marginTop: '15px' }}>זמני השבת:</h3>
          <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
            {schedule.map((item) => (
              <div key={item.id} style={{ display: 'flex', gap: '10px', marginBottom: '8px', padding: '6px', backgroundColor: '#f9fafb' }}>
                <input type="checkbox" checked={item.active} onChange={(e) => updateItem(item.id, 'active', e.target.checked)} />
                <input type="text" value={item.name} onChange={(e) => updateItem(item.id, 'name', e.target.value)} style={{ flex: '1' }} />
                <input type="time" value={item.time} onChange={(e) => updateItem(item.id, 'time', e.target.value)} />
              </div>
            ))}
          </div>
          
          <button onClick={addItem} style={{ marginTop: '10px', width: '100%', padding: '8px', backgroundColor: '#e5e7eb', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>+ הוסף זמן חדש</button>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px' }}>
            <button onClick={handleDownload} style={{ padding: '12px', backgroundColor: '#2563eb', color: 'white', borderRadius: '8px', cursor: 'pointer' }}>⬇️ הורדה כתמונה</button>
            <button onClick={handleShare} style={{ padding: '12px', backgroundColor: '#059669', color: 'white', borderRadius: '8px', cursor: 'pointer' }}>📤 שיתוף</button>
            <button onClick={() => window.print()} style={{ padding: '12px', backgroundColor: '#374151', color: 'white', borderRadius: '8px', cursor: 'pointer' }}>🖨️ הדפסה</button>
          </div>
        </div>

        {/* Poster Container with forced aspect ratio */}
        <div style={{ flex: '1', display: 'flex', justifyContent: 'center' }}>
          <div 
            ref={posterRef} 
            className="print-container" 
            style={{ 
              width: '100%', 
              maxWidth: '450px', 
              aspectRatio: '1 / 1.414', 
              padding: '8%', 
              borderRadius: '12px', 
              backgroundColor: bgColor, 
              position: 'relative', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              boxSizing: 'border-box'
            }}
          >
            {customLogo && (
              <div style={{ position: 'absolute', top: '5%', left: '5%', width: '15%', height: '15%', backgroundColor: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={customLogo} alt="logo" style={{ width: '80%', height: '80%', objectFit: 'contain' }} />
              </div>
            )}
            <h1 style={{ fontSize: 'min(8vw, 40px)', marginTop: '15%', marginBottom: '2%' }}>שבת שלום</h1>
            <h2 style={{ fontSize: 'min(4vw, 20px)', padding: '2% 5%', backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: '20px' }}>{parasha}</h2>
            <div style={{ width: '100%', marginTop: '5%', display: 'flex', flexDirection: 'column', gap: '2%' }}>
              {schedule.filter((item) => item.active).map((item) => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px dashed rgba(0,0,0,0.1)', paddingBottom: '1%' }}>
                  <span style={{ fontSize: 'min(3.5vw, 18px)', fontWeight: 'bold' }}>{item.name}</span>
                  <span style={{ fontSize: 'min(3.5vw, 18px)', fontWeight: 'bold' }}>{item.time}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 'auto', fontWeight: 'bold', borderTop: '2px solid rgba(0,0,0,0.1)', width: '90%', textAlign: 'center', paddingTop: '2%' }}>
              {footerText}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
