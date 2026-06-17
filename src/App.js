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
      {/* חוקי הדפסה מתקדמים למניעת עמודים מיותרים ומילוי דף ה-A4 במלואו */}
      <style>{`
        @media print {
          @page {
            size: A4;
            margin: 0;
          }
          html, body {
            margin: 0 !important;
            padding: 0 !important;
            height: 297mm !important;
            overflow: hidden !important;
            background: white !important;
          }
          /* מעלים לחלוטין את כל מה שהוא לא הפוסטר מחישוב הגובה */
          .no-print {
            display: none !important;
          }
          /* הופך את הפוסטר לגודל המקסימלי של דף המדפסת */
          .print-container {
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 210mm !important;
            height: 297mm !important;
            padding: 30mm 25mm !important; /* מרווח פנימי יפה להדפסה */
            border-radius: 0 !important;
            box-shadow: none !important;
            box-sizing: border-box !important;
            /* מבטיח שצבע הרקע יודפס */
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>

      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        {/* טור הגדרות - קיבל מחלקה no-print כדי שלא ייכנס להדפסה בשום צורה */}
        <div className="no-print" style={{ flex: '1', minWidth: '320px', backgroundColor: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
          <h2>הגדרות לוח מודעות</h2>
          
          <label style={{ display: 'block', fontWeight: 'bold', marginTop: '10px' }}>צבע רקע:</label>
          <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} style={{ marginBottom: '20px', width: '60px', height: '35px', cursor: 'pointer' }} />

          <label style={{ display: 'block', fontWeight: 'bold', marginTop: '10px' }}>העלאת סמל:</label>
          <input type="file" accept="image/*" onChange={handleFile} style={{ marginBottom: '20px', display: 'block' }} />

          <label style={{ display: 'block', fontWeight: 'bold', marginTop: '10px' }}>שם הפרשה:</label>
          <input type="text" value={parasha} onChange={(e) => setParasha(e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '10px', boxSizing: 'border-box' }} />

          <label style={{ display: 'block', fontWeight: 'bold', marginTop: '10px' }}>כיתוב תחתון:</label>
          <input type="text" value={footerText} onChange={(e) => setFooterText(e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '20px', boxSizing: 'border-box' }} />

          <h3 style={{ fontWeight: 'bold', marginTop: '15px' }}>זמני השבת:</h3>
          <div style={{ maxHeight: '300px', overflowY: 'auto', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '5px' }}>
            {schedule.map((item) => (
              <div key={item.id} style={{ display: 'flex', gap: '10px', marginBottom: '8px', padding: '8px', backgroundColor: '#f9fafb', alignItems: 'center', borderRadius: '4px' }}>
                <input type="checkbox" checked={item.active} onChange={(e) => updateItem(item.id, 'active', e.target.checked)} style={{ width: '18px', height: '18px' }} />
                <input type="text" value={item.name} onChange={(e) => updateItem(item.id, 'name', e.target.value)} style={{ flex: '1', padding: '4px' }} />
                <input type="time" value={item.time} onChange={(e) => updateItem(item.id, 'time', e.target.value)} style={{ padding: '4px' }} />
              </div>
            ))}
          </div>
          
          <button onClick={addItem} style={{ marginTop: '12px', width: '100%', padding: '10px', backgroundColor: '#e5e7eb', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>+ הוסף זמן חדש</button>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '25px' }}>
            <button onClick={handleDownload} style={{ padding: '14px', backgroundColor: '#2563eb', color: 'white', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', border: 'none' }}>⬇️ הורדה כתמונה</button>
            <button onClick={handleShare} style={{ padding: '14px', backgroundColor: '#059669', color: 'white', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', border: 'none' }}>📤 שיתוף</button>
            <button onClick={() => window.print()} style={{ padding: '14px', backgroundColor: '#374151', color: 'white', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', border: 'none' }}>🖨️ הדפסה</button>
          </div>
        </div>

        {/* טור תצוגה מקדימה */}
        <div style={{ flex: '1.5', display: 'flex', justifyContent: 'center' }}>
          <div 
            ref={posterRef} 
            className="print-container" 
            style={{ 
              width: '550px', 
              height: '778px', 
              padding: '55px 50px', 
              borderRadius: '16px', 
              backgroundColor: bgColor, 
              position: 'relative', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              boxSizing: 'border-box',
              boxShadow: '0 10px 15px -3px rgba(0,0,0,0.15)'
            }}
          >
            {customLogo && (
              <div style={{ position: 'absolute', top: '35px', left: '35px', width: '80px', height: '80px', backgroundColor: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                <img src={customLogo} alt="logo" style={{ width: '90%', height: '90%', objectFit: 'contain' }} />
              </div>
            )}
            
            <h1 style={{ fontSize: '54px', marginTop: '50px', marginBottom: '8px', fontWeight: 'bold', color: '#111827', letterSpacing: '1px' }}>שבת שלום</h1>
            <h2 style={{ fontSize: '22px', padding: '6px 28px', backgroundColor: 'rgba(255,255,255,0.92)', borderRadius: '25px', marginBottom: '25px', fontWeight: 'bold', color: '#1f2937' }}>{parasha}</h2>
            
            <div style={{ width: '100%', marginTop: '25px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {schedule.filter((item) => item.active).map((item) => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px dashed rgba(0,0,0,0.15)', paddingBottom: '4px' }}>
                  <span style={{ fontSize: '22px', fontWeight: 'bold', color: '#111827' }}>{item.name}</span>
                  <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>{item.time}</span>
                </div>
              ))}
            </div>
            
            <div style={{ marginTop: 'auto', fontWeight: 'bold', borderTop: '2px solid rgba(0,0,0,0.15)', width: '100%', textAlign: 'center', paddingTop: '16px', fontSize: '20px', color: '#111827' }}>
              {footerText}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
