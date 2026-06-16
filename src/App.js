import React, { useState } from 'react';

export default function App() {
  const [parasha, setParasha] = useState('פרשת השבוע');
  const [schedule, setSchedule] = useState([
    { id: 1, name: 'כניסת שבת', time: '19:30' }
  ]);

  return (
    <div style={{ padding: '20px', direction: 'rtl' }}>
      <h1>שבת שלום</h1>
      <input 
        type="text" 
        value={parasha} 
        onChange={(e) => setParasha(e.target.value)} 
      />
      <div>
        {schedule.map((item) => (
          <div key={item.id}>
            {item.name}: {item.time}
          </div>
        ))}
      </div>
    </div>
  );
}
