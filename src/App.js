import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';

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
      reader.onload = (event) => {
        setCustomLogo(event.target.result);
        setSelectedMovement('custom');
      };
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

  const deleteItem = (id) => {
    setSchedule(schedule.filter((item) => item.id !== id));
  };

  // תבניות וקטוריות מדויקות של הסמלים שהעלת (צבע כחול תנועתי אחיד)
  const movementLogos = {
    ba: (
      <svg viewBox="0 0 100 100" style={{ width: '85%', height: '85%' }}>
        <path d="M32,58 L32,30 C32,18 49,18 49,30 L49,58 Z" fill="#004b87" />
        <path d="M51,58 L51,30 C51,18 68,18 68,30 L68,58 Z" fill="#004b87" />
        <text x="40" y="44" fill="white" fontSize="13" fontWeight="bold" textAnchor="middle">ת</text>
        <text x="60" y="44" fill="white" fontSize="13" fontWeight="bold" textAnchor="middle">ע</text>
        <path d="M15,62 Q50,72 85,62 L82,72 Q50,82 18,72 Z" fill="#004b87" />
        <text x="50" y="71" fill="white" fontSize="7" fontWeight="bold" textAnchor="middle">בני-עקיבא</text>
        <path d="M24,25 Q20,40 26,52 M76,25 Q80,40 74,52" stroke="#004b87" strokeWidth="1.5" fill="none" />
      </svg>
    ),
    ezra: (
      <svg viewBox="0 0 100 100" style={{ width: '85%', height: '85%' }}>
        <circle cx="50" cy="50" r="44" fill="none" stroke="#004b87" strokeWidth="2.5" />
        <path d="M50,6 L50,94 M6,50 L94,50 M19,19 L81,81 M19,81 L81,19" stroke="#004b87" strokeWidth="0.75" opacity="0.3" />
        <polygon points="50,12 88,78 12,78" fill="white" stroke="#004b87" strokeWidth="2.5" />
        <path d="M43,45 C43,38 49,38 49,45 L49,52 L43,52 Z" fill="none" stroke="#004b87" strokeWidth="1.5" />
        <path d="M51,45 C51,38 57,38 57,45 L57,52 L51,52 Z" fill="none" stroke="#004b87" strokeWidth="1.5" />
        <text x="50" y="71" fill="#004b87" fontSize="14" fontWeight="bold" textAnchor="middle">עזרא</text>
      </svg>
    ),
    ariel: (
      <svg viewBox="0 0 100 100" style={{ width: '85%', height: '85%' }}>
        <path d="M24,62 L24,26 C24,11 49,11 49,26 C49,11 74,11 74,26 L74,62 Z" fill="none" stroke="#004b87" strokeWidth="3" />
        <line x1="26" y1="34" x2="72" y2="34" stroke="#004b87" strokeWidth="2" />
        <line x1="26" y1="47" x2="72" y2="47" stroke="#004b87" strokeWidth="2" />
        <polygon points="50,37 52,42 57,42 53,45 55,50 50,47 45,50 47,45 43,42 48,42" fill="#004b87" />
        <text x="50" y="80" fill="#004b87" fontSize="16" fontWeight="bold" textAnchor="middle">אריאל</text>
        <text x="50" y="91" fill="#004b87" fontSize="6" fontWeight="bold" textAnchor="middle">תורת חיים בעוז!</text>
      </svg>
    )
  };

  return (
    <div style={{ direction: 'rtl', padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#f3f4f6', minHeight: '100vh' }}>
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
          .no-print {
            display: none !important;
          }
          .print-container {
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 210mm !important;
            height: 297mm !important;
            padding: 30mm 25mm !important;
            border-radius: 0 !important;
            box-shadow: none !important;
            box-sizing: border-box !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>

      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        
        {/* עמודת ימין: הגדרות לוח מודעות */}
        <div className="no-print" style={{ flex: '1', minWidth: '340px', backgroundColor: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
          <h2>הגדרות לוח מודעות</h2>
          
          <label style={{ display: 'block', fontWeight: 'bold', marginTop: '10px' }}>צבע רקע:</label>
          <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} style={{ marginBottom: '20px', width: '60px', height: '35px', cursor: 'pointer' }} />

          <label style={{ display: 'block', fontWeight: 'bold', marginTop: '10px', marginBottom: '10px' }}>סמל התנועה:</label>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
            {/* בני עקיבא */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '75px' }}>
              <button onClick={() => setSelectedMovement('ba')} style={{ width: '65px', height: '65px', borderRadius: '12px', backgroundColor: 'white', border: selectedMovement === 'ba' ? '3px solid #2563eb' : '1px solid #d1d5db', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: '4px' }}>
                {movementLogos.ba}
              </button>
              <span style={{ fontSize: '12px', marginTop: '6px', fontWeight: selectedMovement === 'ba' ? 'bold' : 'normal', color: '#374151' }}>בני-עקיבא</span>
            </div>

            {/* עזרא */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '75px' }}>
              <button onClick={() => setSelectedMovement('ezra')} style={{ width: '65px', height: '65px', borderRadius: '12px', backgroundColor: 'white', border: selectedMovement === 'ezra' ? '3px solid #2563eb' : '1px solid #d1d5db', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: '4px' }}>
                {movementLogos.ezra}
              </button>
              <span style={{ fontSize: '12px', marginTop: '6px', fontWeight: selectedMovement === 'ezra' ? 'bold' : 'normal', color: '#374151' }}>עזרא</span>
            </div>

            {/* אריאל */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '75px' }}>
              <button onClick={() => setSelectedMovement('ariel')} style={{ width: '65px', height: '65px', borderRadius: '12px', backgroundColor: 'white', border: selectedMovement === 'ariel' ? '3px solid #2563eb' : '1px solid #d1d5db', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: '4px' }}>
                {movementLogos.ariel}
              </button>
              <span style={{ fontSize: '12px', marginTop: '6px', fontWeight: selectedMovement === 'ariel' ? 'bold' : 'normal', color: '#374151' }}>אריאל</span>
            </div>

            {/* מותאם אישית */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '75px' }}>
              <button onClick={() => fileInputRef.current.click()} style={{ width: '65px', height: '65px', borderRadius: '12px', backgroundColor: '#f3f4f6', border: selectedMovement === 'custom' ? '3px solid #2563eb' : '1px solid #d1d5db', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: '4px', overflow: 'hidden' }}>
                {customLogo ? <img src={customLogo} alt="מותאם" style={{ width: '100%', height: '100%', objectFit: 'contain' }} /> : <span style={{ fontSize: '24px', color: '#6b7280', fontWeight: 'bold' }}>+</span>}
              </button>
              <span style={{ fontSize: '12px', marginTop: '6px', fontWeight: selectedMovement === 'custom' ? 'bold' : 'normal', color: '#374151' }}>מותאם אישית</span>
            </div>
          </div>
          
          <input type="file" ref={fileInputRef} accept="image/*" onChange={handleFile} style={{ display: 'none' }} />

          <label style={{ display: 'block', fontWeight: 'bold', marginTop: '10px' }}>שם הפרשה:</label>
          <input type="text" value={parasha} onChange={(e) => setParasha(e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '10px', boxSizing: 'border-box' }} />

          <label style={{ display: 'block', fontWeight: 'bold', marginTop: '10px' }}>כיתוב תחתון:</label>
          <input type="text" value={footerText} onChange={(e) => setFooterText(e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '20px', boxSizing: 'border-box' }} />

          <h3 style={{ fontWeight: 'bold', marginTop: '15px', marginBottom: '8px' }}>זמני השבת:</h3>
          <div style={{ maxHeight: '300px', overflowY: 'auto', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '5px' }}>
            {schedule.map((item) => (
              <div key={item.id} style={{ display: 'flex', gap: '8px', marginBottom: '8px', padding: '8px', backgroundColor: '#f9fafb', alignItems: 'center', borderRadius: '4px' }}>
                <input type="checkbox" checked={item.active} onChange={(e) => updateItem(item.id, 'active', e.target.checked)} style={{ width: '18px', height: '18px', cursor: 'pointer' }} title="הצג או הסתר בפוסטר" />
                <input type="text" value={item.name} onChange={(e) => updateItem(item.id, 'name', e.target.value)} style={{ flex: '1', padding: '6px', borderRadius: '4px', border: '1px solid #d1d5db' }} />
                <input type="time" value={item.time} onChange={(e) => updateItem(item.id, 'time', e.target.value)} style={{ padding: '5px', borderRadius: '4px', border: '1px solid #d1d5db' }} />
                <button onClick={() => deleteItem(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', padding: '4px' }} title="מחק זמן">
                  <span role="img" aria-label="מחיקה">🗑️</span>
                </button>
              </div>
            ))}
          </div>
          
          <button onClick={addItem} style={{ width: '100%', padding: '10px', backgroundColor: '#e5e7eb', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', marginTop: '12px' }}>+ הוסף זמן חדש</button>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '25px' }}>
            <button onClick={handleDownload} style={{ padding: '14px', backgroundColor: '#2563eb', color: 'white', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', border: 'none' }}>⬇️ הורדה כתמונה</button>
            <button onClick={handleShare} style={{ padding: '14px', backgroundColor: '#059669', color: 'white', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', border: 'none' }}>📤 שיתוף</button>
            <button onClick={() => window.print()} style={{ padding: '14px', backgroundColor: '#374151', color: 'white', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', border: 'none' }}>🖨️ הדפסה</button>
          </div>
        </div>

        {/* עמודת שמאל: תצוגה מקדימה של הפוסטר */}
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
            {/* מיקום הסמל בפוסטר בדיוק בעיגול המקורי */}
            <div style={{ position: 'absolute', top: '35px', left: '35px', width: '80px', height: '80px', backgroundColor: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
              {selectedMovement === 'custom' && customLogo ? (
                <img src={customLogo} alt="סמל מותאם" style={{ width: '90%', height: '90%', objectFit: 'contain' }} />
              ) : (
                movementLogos[selectedMovement]
              )}
            </div>
            
            <h1 style={{ fontSize: '54px', marginTop: '50px', marginBottom: '8px', fontWeight: 'bold', color: '#111827', letterSpacing: '1px' }}>שבת שלום</h1>
            <h2 style={{ fontSize: '22px', padding: '6px 28px', backgroundColor: 'rgba(255,255,255,0.92)', borderRadius: '25px', marginBottom: '25px', fontWeight: 'bold', color: '#1f2937' }}>{parasha}</h2>
            
            <div style={{ width: '100%', marginTop: '25px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {schedule.filter((item) => item.active).map((item) => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px dashed rgba(0,0,0,0.15)', paddingBottom: '4px' }}>
                  <span style={{ fontSize: '22px', fontWeight: 'bold', color: '#111827' }}>{item.name}</span>
