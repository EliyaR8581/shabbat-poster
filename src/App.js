import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';

export default function App() {
  const posterRef = useRef(null);
  const fileInputRef = useRef(null);
  
  // הגדרת ברירת מחדל לירוק העמוק והיפה מהצילום מסך שלך
  const [bgColor, setBgColor] = useState('#1e8a5f'); 
  const [textColor, setTextColor] = useState('#ffffff');
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
      try {
        const canvas = await html2canvas(posterRef.current, { scale: 2, useCORS: true });
        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = parasha + '.png';
        link.href = dataUrl;
        link.click();
      } catch (err) {
        alert('שגיאה בהורדת התמונה.');
      }
    }
  };

  const handleShare = async () => {
    if (posterRef.current) {
      try {
        const canvas = await html2canvas(posterRef.current, { scale: 2, useCORS: true });
        canvas.toBlob(async (blob) => {
          if (!blob) return;
          const file = new File([blob], parasha + '.png', { type: 'image/png' });
          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            try {
              await navigator.share({ files: [file], title: 'לוח זמני שבת', text: 'מוזמנים להצטרף!' });
            } catch (err) {
              // שיתוף בוטל
            }
          } else {
            alert('הדפדפן אינו תומך בשיתוף ישיר. השתמש בהורדה כתמונה.');
          }
        });
      } catch (err) {
        alert('שגיאה בתהליך השיתוף');
      }
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
    setSchedule(schedule.map((item) => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    }));
  };

  const addItem = () => {
    const newItem = { id: Date.now(), name: 'זמן חדש', time: '00:00', active: true };
    setSchedule([...schedule, newItem]);
  };

  const deleteItem = (id) => {
    setSchedule(schedule.filter((item) => item.id !== id));
  };

  // קביעת נתיב הלוגו הנבחר בהתאם לבחירה
  let currentLogoSrc = '/ba.jpg';
  if (selectedMovement === 'ezra') currentLogoSrc = '/ezra.png';
  if (selectedMovement === 'ariel') currentLogoSrc = '/ariel.webp';
  if (selectedMovement === 'custom') currentLogoSrc = customLogo;

  return (
    <div style={{ direction: 'rtl', padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#f3f4f6', minHeight: '100vh', boxSizing: 'border-box' }}>
      <style>{`
        @media print {
          @page { size: A4; margin: 0; }
          html, body { margin: 0 !important; padding: 0 !important; height: 297mm !important; overflow: hidden !important; background: white !important; }
          .no-print { display: none !important; }
          .print-container { position: absolute !important; top: 0 !important; left: 0 !important; width: 210mm !important; height: 297mm !important; padding: 30mm 25mm !important; border-radius: 0 !important; box-shadow: none !important; box-sizing: border-box !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        }
      `}</style>

      <div style={{ display: 'flex', gap: '30px', justifyContent: 'center', alignItems: 'flex-start', flexWrap: 'wrap', maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* עמודת ימין: הגדרות */}
        <div className="no-print" style={{ width: '420px', backgroundColor: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', boxSizing: 'border-box' }}>
          <h2 style={{ marginTop: 0, marginBottom: '20px', color: '#111827' }}>הגדרות לוח מודעות</h2>
          
          <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', fontSize: '14px' }}>צבע רקע:</label>
              <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} style={{ width: '60px', height: '35px', cursor: 'pointer', display: 'block', border: '1px solid #d1d5db', borderRadius: '4px' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', fontSize: '14px' }}>צבע טקסט:</label>
              <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} style={{ width: '60px', height: '35px', cursor: 'pointer', display: 'block', border: '1px solid #d1d5db', borderRadius: '4px' }} />
            </div>
          </div>

          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '10px', fontSize: '14px' }}>סמל התנועה:</label>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '25px' }}>
            {[
              { id: 'ba', name: 'בני-עקיבא', src: '/ba.jpg' },
              { id: 'ezra', name: 'עזרא', src: '/ezra.png' },
              { id: 'ariel', name: 'אריאל', src: '/ariel.webp' }
            ].map((m) => (
              <div key={m.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '75px' }}>
                <button
                  type="button"
                  onClick={() => setSelectedMovement(m.id)}
                  style={{
                    width: '65px',
                    height: '65px',
                    borderRadius: '12px',
                    backgroundColor: 'white',
                    border: selectedMovement === m.id ? '3px solid #2563eb' : '1px solid #d1d5db',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '4px',
                    cursor: 'pointer',
                    boxSizing: 'border-box',
                    overflow: 'hidden'
                  }}
                >
                  <img src={m.src} alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </button>
                <span style={{ fontSize: '12px', marginTop: '6px', fontWeight: selectedMovement === m.id ? 'bold' : 'normal', color: '#374151' }}>{m.name}</span>
              </div>
            ))}

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '75px' }}>
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                style={{
                  width: '65px',
                  height: '65px',
                  borderRadius: '12px',
                  backgroundColor: '#f3f4f6',
                  border: selectedMovement === 'custom' ? '3px solid #2563eb' : '1px solid #d1d5db',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '4px',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  boxSizing: 'border-box'
                }}
              >
                {customLogo ? <img src={customLogo} alt="מותאם" style={{ width: '100%', height: '100%', objectFit: 'contain' }} /> : <span style={{ fontSize: '24px', color: '#6b7280' }}>+</span>}
              </button>
              <span style={{ fontSize: '12px', marginTop: '6px', color: '#374151' }}>מותאם אישית</span>
            </div>
          </div>

          <input type="file" ref={fileInputRef} accept="image/*" onChange={handleFile} style={{ display: 'none' }} />

          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', fontSize: '14px' }}>שם הפרשה:</label>
          <input type="text" value={parasha} onChange={(e) => setParasha(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '6px', border: '1px solid #d1d5db', boxSizing: 'border-box' }} />

          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px', fontSize: '14px' }}>כיתוב תחתון:</label>
          <input type="text" value={footerText} onChange={(e) => setFooterText(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '20px', borderRadius: '6px', border: '1px solid #d1d5db', boxSizing: 'border-box' }} />

          <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '10px', fontSize: '14px' }}>זמני השבת:</label>
          <div style={{ maxHeight: '280px', overflowY: 'auto', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '10px', backgroundColor: '#f9fafb', marginBottom: '15px' }}>
            {schedule.map((item) => (
              <div key={item.id} style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'center' }}>
                <input type="time" value={item.time} onChange={(e) => updateItem(item.id, 'time', e.target.value)} style={{ padding: '6px', borderRadius: '6px', border: '1px solid #d1d5db' }} />
                <input type="text" value={item.name} onChange={(e) => updateItem(item.id, 'name', e.target.value)} style={{ flex: '1', padding: '7px', borderRadius: '6px', border: '1px solid #d1d5db' }} />
                <input type="checkbox" checked={item.active} onChange={(e) => updateItem(item.id, 'active', e.target.checked)} style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
                <button type="button" onClick={() => deleteItem(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }}>🗑️</button>
              </div>
            ))}
          </div>
          
          <button type="button" onClick={addItem} style={{ width: '100%', padding: '11px', backgroundColor: '#f3f4f6', border: '1px solid #d1d5db', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', color: '#374151', marginBottom: '25px' }}>+ הוסף זמן חדש</button>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button type="button" onClick={handleDownload} style={{ padding: '14px', backgroundColor: '#2563eb', color: 'white', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', border: 'none', fontSize: '16px' }}>⬇️ הורדה כתמונה</button>
            <button type="button" onClick={handleShare} style={{ padding: '14px', backgroundColor: '#059669', color: 'white', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', border: 'none', fontSize: '16px' }}>📤 שיתוף</button>
            <button type="button" onClick={() => window.print()} style={{ padding: '14px', backgroundColor: '#374151', color: 'white', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', border: 'none', fontSize: '16px' }}>🖨️ הדפסה (A4)</button>
          </div>
        </div>

        {/* עמודת שמאל: תצוגה מקדימה נקייה של הפוסטר (בדיוק כמו בצילום מסך) */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
          <div 
            ref={posterRef} 
            className="print-container" 
            style={{ 
              width: '550px', 
              height: '778px', 
              padding: '45px 50px', 
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
            {/* מיקום הלוגו ישירות על הרקע ללא עיגול לבן מלאכותי, בדיוק לפי המקור */}
            <div style={{ width: '110px', height: '110px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', marginBottom: '10px' }}>
              {currentLogoSrc && (
                <img 
                  src={currentLogoSrc} 
                  alt="סמל תנועה" 
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
                />
              )}
            </div>
            
            <h1 style={{ fontSize: '48px', marginTop: '0px', marginBottom: '12px', fontWeight: 'bold', color: textColor, textAlign: 'center' }}>שבת שלום</h1>
            
            <div style={{ display: 'inline-block', padding: '6px 32px', backgroundColor: '#ffffff', borderRadius: '25px', marginBottom: '40px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
              <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937' }}>{parasha}</span>
            </div>
            
            {/* רשימת הזמנים עם קו מקווקו ביניהם לפי העיצוב */}
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {schedule.map((item) => {
                if (!item.active) return null;
                return (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '2px dashed ' + textColor + '66', paddingBottom: '6px' }}>
                    <span style={{ fontSize: '22px', fontWeight: 'bold', color: textColor }}>{item.name}</span>
                    <span style={{ fontSize: '24px', fontWeight: 'bold', color: textColor, fontFamily: 'sans-serif' }}>{item.time}</span>
                  </div>
                );
              })}
            </div>
            
            <div style={{ marginTop: 'auto', fontWeight: 'bold', borderTop: '2px solid ' + textColor + '44', width: '100%', textAlign: 'center', paddingTop: '16px', fontSize: '18px', color: textColor }}>
              {footerText}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
