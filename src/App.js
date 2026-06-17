import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';

export default function App() {
  const posterRef = useRef(null);
  const [bgColor, setBgColor] = useState('#a7f3d0'); // ירוק התחלתי
  const [parasha, setParasha] = useState('פרשת השבוע');
  const [footerText, setFooterText] = useState('צוות הדרכה');
  const [selectedLogo, setSelectedLogo] = useState('ba');
  const [schedule, setSchedule] = useState([
    { id: 1, name: 'כניסת שבת', time: '19:30' },
    { id: 2, name: 'פעולת חב"ב', time: '21:00' },
    { id: 3, name: 'מפקד', time: '15:45' },
    { id: 4, name: 'מנחה', time: '16:00' },
    { id: 5, name: 'פעולות', time: '16:30' },
    { id: 6, name: 'סד"ש', time: '18:00' },
    { id: 7, name: 'ערבית', time: '19:45' },
    { id: 8, name: 'מוצ"ש', time: '20:30' }
  ]);

  const handleDownload = async () => {
    if (posterRef.current) {
      const canvas = await html2canvas(posterRef.current);
      const link = document.createElement('a');
      link.download = 'poster.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  // רכיב הלוגו (מצויר בקוד ללא תמונות)
  const Logo = ({ type }) => (
    <div style={{ width: '60px', height: '60px', backgroundColor: '#004a80', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '10px', fontWeight: 'bold', textAlign: 'center' }}>
      {type === 'ba' ? 'בני עקיבא' : type === 'ezra' ? 'עזרא' : 'אריאל'}
    </div>
  );

  return (
    <div style={{ display: 'flex', gap: '50px', padding: '40px', direction: 'rtl', fontFamily: 'Arial' }}>
      {/* אזור העריכה */}
      <div style={{ width: '400px' }}>
        <h2>הגדרות לוח מודעות</h2>
        <label>צבע רקע: </label>
        <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} /><br/>
        <label>בחר סמל: </label>
        <button onClick={() => setSelectedLogo('ba')}>בני עקיבא</button>
        <button onClick={() => setSelectedLogo('ezra')}>עזרא</button>
        <button onClick={() => setSelectedLogo('ariel')}>אריאל</button>
        <br/><br/>
        <input placeholder="שם הפרשה" onChange={(e) => setParasha(e.target.value)} />
        <br/><br/>
        <button onClick={handleDownload} style={{ background: 'blue', color: 'white', padding: '10px', borderRadius: '5px' }}>הורד תמונה</button>
      </div>

      {/* אזור הפוסטר */}
      <div ref={posterRef} style={{ width: '350px', backgroundColor: bgColor, padding: '30px', borderRadius: '20px', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}><Logo type={selectedLogo} /></div>
        <h1 style={{ margin: 0 }}>שבת שלום</h1>
        <h3 style={{ margin: '10px 0' }}>{parasha}</h3>
        <div style={{ borderTop: '1px dashed #333', marginTop: '20px', paddingTop: '20px' }}>
          {schedule.map(item => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span>{item.name}</span>
              <span>{item.time}</span>
            </div>
          ))}
        </div>
        <p style={{ marginTop: '30px' }}>{footerText}</p>
      </div>
    </div>
  );
}
