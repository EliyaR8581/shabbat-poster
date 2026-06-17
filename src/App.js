import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';

// סמלי התנועות המוטמעים ישירות בקוד (למניעת בעיות נתיבים)
const LOGOS = {
  ba: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4QAqRXhpZgAASUkqAAgAAAABADEBAgAHAAAAGgAAAAAAAABQaWNhc2EAAP/iAdhJQ0NfUFJPTEZJTEUAAQEAAAdQYXBwbDCEAAAAbW50clJHQiBYWVogB8gABgADAAAAAAAhYWNzcEFQUEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPbWAAEAAAAA0y1hcHBsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAARZGVzYwAAAVAAAABid3J0MgAAAWgAAAA0d3RwdAAAAZwAAAAUYmtwdAAAAbAAAAAUclhZWgAAAcQAAAAUZ1hZWgAAAdgAAAAUYlhZWgAAAewAAAAUdHJRQwAAAgAAAAgAZ1RSUQAAAgAAAAgAYlRSUQAAAgAAAAgAZGVzYwAAAAAAAAALRGlzcGxheSBQMwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB0ZXh0AAAAAENvcHlyaWdodCBBcHBsZSBJbmMuLCAyMDE3AABYWVogAAAAAAAA81EAAQAAAAEWzFhZWiAAAAAAAACD3wAAPb////+7WFlaIAAAAAAAAF2VAAC3jv///8tYWVogAAAAAAAAJK4AAB2AAAAPHRleHQAAAAAQ29weXJpZ2h0IEFwcGxlIEluYy4sIDIwMTf/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCADbAMwDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usld356o9vgY6en89_D_xAAfAQADAQEBAQEBAQEBAAAAAAAAAQIDBAUGBwgJCgs_QEDEQYAAAECBAQDBwQHBwYFDEF3AQECEQMhIRISEQYxEwUiQVFhEiJxBTKBkRShsUIjwVLR8FBiM3KCwdHhQ3SX8WNTk7KiwvFlJic3OUMkZWhkdWValidXbHhkYGNoaW9zdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usld356o9vgY6en89_D_aAAwDAQACEQMRAD8A_P_wCDPwaPxZvbq3Goiw_s9IiB9n87zNxb_aGMbf1r0_Xv2O7bRvDl7frrj_aLGBpfKa0CpIVBOM7_lBx7_wC7XC_s7fG7UPgx4rWfS1sh_a7wQSvPbecI1DMCRyDkbiencd_m_b3w78F_DvjnR01bUpbCee8X98lupgjjIPIIDc57989_8X96eyHsdwtzwsE8bksRiquu0dJpIpxonlWSuuunXv7R_K3tX2rmMLXjUwdTlhreGmsrLreSfZ2b2Wh_N_8AHL4by_Djx3qGnSz2k7pM58uKbzfKBOQpyAc4P8v9qvaP2D_g3ovx6vG0vVbyy06fShFLFMU2PMCWyN_RscDHY_7W2us_bq_Z38NfCTxjLeWGpebeao8ksVrHCscUOSST3OAfpxXkf7LPxtuvgn8UtPuYI7SePVp4be6e5t_P8hdxIdemCCR06gn3WvwbFZRiOwfa7D5RnnPh4yrKE_ZyUkoTlG8ZfAnG_vWTva_kfVYfHQx2WPEYa0nyXjfs0rp_g_Q_Qj9rbXPhz8AfgzqGlW2qWOpanqWnNFBbi8W8ZpdrDceSUAOfpx_tfN_NPrE_na_dyBfL8y4kbYvReScCv21_bk_Z78PfGrwI_iO2v459Wv7Z7i3mC_AGZAdq_xEnqRnr_wD_FDX6K50DXrm1m_1sUrIenUH_AD_3zX2Hj_7EV_Z3D4RYSrLEYGfNKjPmb0fInF_Am7qSdlqmtbnidks6wOMVd1Y8tSOnLbW_y100er3O78MfDbUfito2gWFp_Y8CW0U8zy3l8tpvLOmVG7rx6D8vvV6Prf8AwTQ8ZfDbwhLqM0unS28cAu_KtL3zmK9MhgMEDPXH9K8Y8FfFGztr3R_tFwLe_tFeCWV7fzvMhyChwCP_14r7n_Zf_bmsvFHhmTwb4lu7S3tbyLykuZLTbE6_3CM8d8e_f_V_wnmXFuZZNhIUsBT9on8cnF88Z_y_AnpGyd76pvRn6VhMuw2LbeJlpa9lo7pa9Xo_Kx87fAD_AIJpeJvjlq7S3NzdWFisXntLNY_LIpGRgkjP-f8Ac_1q-Gf7AXhbxX8T18NnX5dRvI7WSWWWOzEMCshUYYlyeSR_j_D_AHH8E_i14M_Zbvbrwhby6c9gLwW7vFbfPIxOAfv_ADEA5z7_AO7XA6t_UR_Zp+Ffx0v72fRtdtbiO_mW5vLWP_j4Ichn_AN_g_Tav8S13cLcScb5lVlU4ewT9m_huubm7tTlywXld9VfYxxmW5PhUo4_E63vptbrfS-vTX_I0Yv8AgmjBbeF7C1GsfvbCDfHttP3_AEv73-e3_AHzXAfsOfst3V7_wUBsdBGr6_p9tYebcyXdrbiCaLYrBWyX6bsevUfMvytX13D_wXF_ZptbI7R6vYafPqUf2zZpdtbySws0kXWIn5h86feZfk_vV8UeF_-CcHxq8ffEiPwl_wh_iC0uZbxYZbm-tZVs7ZHYAySS4CbAOvzc7ffbX68_sKfA7w18CPhvLpHhfT9Nt_KuRFPdWVstut3JGArNxydrbhyTt9W_ir9F4b4TWDw0cZxDh7xl8MbWcl3el1H_wG-zve_BmmYfWJKll09t3ul5K9m_nbz0PpH4YfsF_Dj4TeLbrxHpWl3R1u_DNc3U8_nGZmG09v4VJVfQb_AL1fEP8AwWq_Yx8LeOvhfqnjZtPvV8QaXFmO7trYymV1Q_K6gfOpULyPu4_vbvL_S_4Z_EHU7e_m0DxDFF9vi_eWtzA_yXMeSMZ9eD_4996vPv8AgobptvrP7PPiyG8_eWx0m7by_vIxELEBh_Fzj_gS_wC9v87F55xHguLcG8JiZU8PzQUaceVUpQb_AIdo3i4v7XMmndb6HrTy7LpZXWpVKalPlcnN_HGXSSfuvba1tLbo_kQ_wCDdf8AYE8PftGfGrxD4w8ZaZp-raD4LtEt7SzvLHzkmvp8nfvPyjYkbjHzcy_eXatfs3rX7A3wqvbG4tT8PfCE9vcr88b6bEyyAj5g_GGVgehryX_giH8GtA-En7B-gtoel6fpr65PLdXr2tksDXMoxFvkYfNJJsjRSzf3fvbVWvrg_v8AWD_0ygf_AMeYf_E1-ycZZxjMxzariPaSjGKjGKUnZKKW1raN80v-3m_X4DIcFTwuAhHlTlK8m2rtybvrtayajb_CvP8Akx_4L8fsEeB_2OfjL4U1j4caVpugaJ4wspXn0a1tZVisZYSmXEhLRnzBIvyKUKshb5vM-T8-K_ff_g6R0m3uPgl8MbqWLdPBr1wiMeytbbmH_fSL_wB81_O7b6h5wAfr2f8Axr8FzCUnipzm7ybvfdu_Vt7vufp2H_hRS6IuUUUfGv79v_Y6W_L9_g_D_v_6p7g"
};

export default function App() {
  const posterRef = useRef(null);
  const [bgColor, setBgColor] = useState('#f2f9f1');
  const [textColor, setTextColor] = useState('#111827');
  const [parasha, setParasha] = useState('פרשת השבוע');
  const [footerText, setFooterText] = useState('צוות הדרכה');
  const [schedule, setSchedule] = useState([
    { id: 1, name: 'כניסת שבת', time: '19:30', active: true },
    { id: 2, name: 'פעולת חב"ב', time: '21:00', active: true },
    { id: 3, name: 'מפקד', time: '15:45', active: true }
  ]);

  return (
    <div style={{ direction: 'rtl', padding: '20px', fontFamily: 'sans-serif', backgroundColor: '#f3f4f6', minHeight: '100vh' }}>
      <div style={{ display: 'flex', gap: '30px', justifyContent: 'center' }}>
        
        {/* פאנל הגדרות */}
        <div style={{ width: '400px', backgroundColor: 'white', padding: '20px', borderRadius: '12px' }}>
          <h2>הגדרות</h2>
          <label>צבע רקע:</label>
          <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
          <br/>
          <label>צבע טקסט:</label>
          <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} />
          <br/><br/>
          <input value={parasha} onChange={(e) => setParasha(e.target.value)} placeholder="שם הפרשה" style={{width:'100%', padding:'8px'}}/>
        </div>

        {/* תצוגה מקדימה */}
        <div ref={posterRef} style={{ width: '550px', height: '778px', padding: '50px', backgroundColor: bgColor, borderRadius: '16px', position: 'relative', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          {/* הלוגו בפינה שמאלית למעלה בתוך עיגול לבן */}
          <div style={{ position: 'absolute', top: '35px', left: '35px', width: '90px', height: '90px', backgroundColor: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5px' }}>
            <img src={LOGOS.ba} alt="logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          
          <h1 style={{ textAlign: 'center', color: textColor, marginTop: '20px' }}>שבת שלום</h1>
          <h2 style={{ textAlign: 'center', color: textColor }}>{parasha}</h2>
        </div>
      </div>
    </div>
  );
}
