return (
    <div style={{ 
      direction: 'rtl', 
      fontFamily: 'Heebo, sans-serif', 
      backgroundColor: '#f3f4f6', 
      minHeight: '100vh', 
      display: 'flex', 
      justifyContent: 'center', 
      padding: '20px' 
    }}>
      
      {/* פאנל הגדרות */}
      <div style={{ width: '100%', maxWidth: '400px', backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', height: 'fit-content' }}>
        <h2>הגדרות הפוסטר</h2>
        <label>שם הפרשה:</label>
        <input type="text" value={parasha} onChange={(e) => setParasha(e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '10px' }} />
        <button onClick={handleDownload} style={{ width: '100%', padding: '10px', backgroundColor: '#2563eb', color: 'white', borderRadius: '8px', border: 'none', cursor: 'pointer', marginBottom: '10px' }}>הורדה כתמונה</button>
      </div>

      {/* אזור התצוגה של הפוסטר - כאן התיקון העיצובי */}
      <div style={{ flex: '1', display: 'flex', justifyContent: 'center', paddingRight: '20px' }}>
        <div 
          ref={posterRef} 
          style={{ 
            width: '210mm', 
            minHeight: '297mm', 
            backgroundColor: bgColor, 
            padding: '20mm', 
            boxSizing: 'border-box',
            boxShadow: '0 0 10px rgba(0,0,0,0.2)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transform: 'scale(0.8)', // מקטין את הדף כדי שייכנס במסך
            transformOrigin: 'top center'
          }}
        >
          <h1 style={{ fontSize: '40px' }}>שבת שלום</h1>
          <h2>{parasha}</h2>
          <div style={{ width: '100%', marginTop: '30px' }}>
            {schedule.filter((item) => item.active).map((item) => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid #ccc' }}>
                <span>{item.name}</span>
                <span>{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
