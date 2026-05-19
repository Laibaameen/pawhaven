import React, { useState, useEffect } from 'react';
 
// ─── GLOBAL STYLES ───────────────────────────────────────────────────────────
const G = {
  orange:'#E8621A', orangeLt:'#F4914A', brown:'#5C3317', cream:'#FDF6EC',
  tan:'#D4A96A', dark:'#2B1A0E', white:'#FFFFFF', green:'#2d7a4f', red:'#c0392b'
};
 
const globalStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Nunito:wght@300;400;600;700;800&display=swap');
  *{margin:0;padding:0;box-sizing:border-box;}
  body{font-family:'Nunito',sans-serif;background:#FDF6EC;color:#2B1A0E;overflow-x:hidden;}
  ::-webkit-scrollbar{width:6px;}
  ::-webkit-scrollbar-track{background:#f5e8d0;}
  ::-webkit-scrollbar-thumb{background:#E8621A;border-radius:3px;}
  input,textarea,select{font-family:'Nunito',sans-serif;}
  @keyframes fadeUp{from{opacity:0;transform:translateY(30px);}to{opacity:1;transform:translateY(0);}}
  @keyframes pulse{0%,100%{transform:scale(1);}50%{transform:scale(1.08);}}
  @keyframes shimmer{0%{background-position:-200% 0;}100%{background-position:200% 0;}}
  @keyframes float{0%,100%{transform:translateY(0);}50%{transform:translateY(-12px);}}
  @keyframes spin{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}
  @keyframes bounce{0%,80%,100%{transform:translateY(0);}40%{transform:translateY(-14px);}}
  @keyframes slideDown{from{opacity:0;transform:translateY(-10px);}to{opacity:1;transform:translateY(0);}}
  .fade-in{animation:fadeUp .6s ease both;}
  .float{animation:float 3s ease-in-out infinite;}
  .pulse{animation:pulse 2s ease-in-out infinite;}
  .dot-bounce{display:inline-block;width:10px;height:10px;background:#E8621A;border-radius:50%;animation:bounce 1.2s ease-in-out infinite;margin:0 4px;}
  .dot-bounce:nth-child(2){animation-delay:.2s;}
  .dot-bounce:nth-child(3){animation-delay:.4s;}
  .mobile-menu-open{animation:slideDown .3s ease both;}
 
  .grid-2{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
  .grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:40px;}
  .hero-grid{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;}
  .contact-grid{display:grid;grid-template-columns:1fr 1.4fr;gap:32px;align-items:start;}
  .footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr;gap:40px;margin-bottom:40px;}
  .animal-detail-grid{display:grid;grid-template-columns:1.1fr 1fr;gap:36px;margin-bottom:48px;}
  .donate-4{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:16px;}
  .donate-2{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:20px;}
  .vol-2{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px;}
  .vet-2{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px;}
 
  @media(max-width:768px){
    .grid-2{grid-template-columns:1fr!important;}
    .grid-3{grid-template-columns:1fr!important;}
    .hero-grid{grid-template-columns:1fr!important;gap:32px!important;}
    .contact-grid{grid-template-columns:1fr!important;}
    .footer-grid{grid-template-columns:1fr!important;}
    .animal-detail-grid{grid-template-columns:1fr!important;}
    .donate-4{grid-template-columns:repeat(2,1fr)!important;}
    .donate-2{grid-template-columns:1fr!important;}
    .vol-2{grid-template-columns:1fr!important;}
    .vet-2{grid-template-columns:1fr!important;}
    .hero-images{display:none!important;}
    .hide-mobile{display:none!important;}
  }
`;
 
// ─── TOAST ───────────────────────────────────────────────────────────────────
function Toast({msg,show,type='success'}){
  return(
    <div style={{position:'fixed',bottom:28,right:28,zIndex:9999,
      background:type==='error'?G.red:G.brown,color:G.cream,
      padding:'14px 22px',borderRadius:14,fontWeight:700,fontSize:'0.93rem',
      boxShadow:'0 8px 32px rgba(0,0,0,.3)',maxWidth:300,
      transform:show?'translateY(0)':'translateY(120px)',
      opacity:show?1:0,transition:'all .4s cubic-bezier(.34,1.56,.64,1)'}}>
      {msg}
    </div>
  );
}
 
// ─── NAVBAR ──────────────────────────────────────────────────────────────────
const PAGES=['home','report','adopt','donate','awareness','volunteer','contact'];
const PAGE_LABELS={home:'🏠 Home',report:'🚨 Report',adopt:'🐾 Adopt',donate:'💛 Donate',awareness:'📚 Awareness',volunteer:'🤝 Volunteer',contact:'📞 Contact'};
 
function Navbar({page,setPage}){
  const [scrolled,setScrolled]=useState(false);
  const [menuOpen,setMenuOpen]=useState(false);
 
  useEffect(()=>{
    const h=()=>setScrolled(window.scrollY>40);
    window.addEventListener('scroll',h);
    return()=>window.removeEventListener('scroll',h);
  },[]);
 
  const navigate=(p)=>{
    setPage(p);
    setMenuOpen(false);
    window.scrollTo(0,0);
  };
 
  return(
    <nav style={{position:'sticky',top:0,zIndex:200,
      background:scrolled?'rgba(43,26,14,.97)':G.dark,
      backdropFilter:'blur(12px)',
      boxShadow:scrolled?'0 4px 24px rgba(0,0,0,.35)':'none',
      transition:'all .3s'}}>
      <div style={{maxWidth:1200,margin:'0 auto',padding:'0 20px',display:'flex',justifyContent:'space-between',alignItems:'center',height:64}}>
        <button onClick={()=>navigate('home')} style={{background:'none',border:'none',cursor:'pointer',
          fontFamily:"'Playfair Display',serif",fontSize:'1.5rem',color:G.tan,fontWeight:700,flexShrink:0}}>
          🐾 Paw<span style={{color:G.orangeLt}}>Haven</span>
        </button>
        <div className="hide-mobile" style={{display:'flex',gap:4,flexWrap:'wrap'}}>
          {PAGES.map(p=>(
            <button key={p} onClick={()=>navigate(p)}
              style={{background:page===p?G.orange:'none',color:page===p?'#fff':G.tan,
                border:'none',padding:'7px 11px',borderRadius:8,fontWeight:700,
                fontSize:'0.78rem',cursor:'pointer',transition:'all .2s',
                display:'flex',alignItems:'center',gap:4}}>
              {PAGE_LABELS[p]}
            </button>
          ))}
        </div>
        <button
          onClick={()=>setMenuOpen(!menuOpen)}
          style={{display:'none',background:'none',border:'none',cursor:'pointer',
            color:G.tan,fontSize:'1.6rem',lineHeight:1,padding:'4px'}}
          className="hamburger-btn"
          aria-label="Menu">
          {menuOpen?'✕':'☰'}
        </button>
      </div>
      {menuOpen&&(
        <div className="mobile-menu-open" style={{background:G.dark,borderTop:'1px solid rgba(255,255,255,.08)',padding:'12px 20px 20px'}}>
          {PAGES.map(p=>(
            <button key={p} onClick={()=>navigate(p)}
              style={{display:'block',width:'100%',textAlign:'left',
                background:page===p?G.orange:'transparent',
                color:page===p?'#fff':G.tan,
                border:'none',padding:'12px 16px',borderRadius:10,
                fontWeight:700,fontSize:'1rem',cursor:'pointer',
                marginBottom:4,transition:'all .2s'}}>
              {PAGE_LABELS[p]}
            </button>
          ))}
        </div>
      )}
      <style>{`
        @media(max-width:768px){
          .hamburger-btn{display:block!important;}
          .hide-mobile{display:none!important;}
        }
      `}</style>
    </nav>
  );
}
 
// ─── EMERGENCY BUTTON ─────────────────────────────────────────────────────────
function EmergencyBtn({setPage}){
  return(
    <button onClick={()=>setPage('report')}
      className="pulse"
      style={{background:'linear-gradient(135deg,#c0392b,#e74c3c)',color:'#fff',
        border:'none',padding:'16px 32px',borderRadius:50,fontWeight:800,
        fontSize:'1rem',cursor:'pointer',boxShadow:'0 8px 32px rgba(192,57,43,.5)',
        letterSpacing:.5,display:'flex',alignItems:'center',gap:10}}>
      🚨 EMERGENCY HELP
    </button>
  );
}
 
// ═══════════════════════════════════════════════════════════════════════════════
// PAGE 1 — HOME
// ═══════════════════════════════════════════════════════════════════════════════
function HomePage({setPage}){
  const stats=[['1,200+','Animals Rescued'],['950+','Adopted'],['50+','Volunteers'],['₨2.4M','Donated']];
  const features=[
    {icon:'🚨',title:'Report an Animal',desc:'Found an injured or lost animal? Report it instantly and our team responds within the hour.',page:'report'},
    {icon:'🐾',title:'Adopt a Pet',desc:'Give a rescued animal their forever home. Browse dogs, cats, and more.',page:'adopt'},
    {icon:'💛',title:'Donate',desc:'Your donation feeds, heals, and shelters animals in need every single day.',page:'donate'},
    {icon:'📚',title:'Awareness',desc:'Learn first aid tips, animal care guides, and how to be a responsible rescuer.',page:'awareness'},
    {icon:'🤝',title:'Volunteer',desc:'Join our rescue team and make a hands-on difference in your community.',page:'volunteer'},
    {icon:'🩺',title:'Vet Appointment',desc:'Book an online vet consultation for your pet anytime, anywhere.',page:'contact'},
  ];
  return(
    <div>
      <section style={{minHeight:'100vh',background:'linear-gradient(135deg,#1a0e06 0%,#3d1f08 40%,#5C3317 70%,#E8621A 100%)',display:'flex',alignItems:'center',position:'relative',overflow:'hidden'}}>
        {['12rem','8rem','6rem'].map((s,i)=>(
          <div key={i} style={{position:'absolute',fontSize:s,opacity:.04,
            top:i===0?'10%':i===1?'60%':'30%',left:i===0?'70%':i===1?'80%':'85%',
            transform:`rotate(${i*30}deg)`,pointerEvents:'none'}}>🐾</div>
        ))}
        <div style={{maxWidth:1200,margin:'0 auto',padding:'80px 20px 60px',width:'100%'}}>
          <div className="hero-grid">
            <div className="fade-in">
              <div style={{display:'inline-flex',alignItems:'center',gap:8,
                background:'rgba(232,98,26,.2)',border:'1px solid rgba(232,98,26,.4)',
                color:G.orangeLt,padding:'6px 16px',borderRadius:50,
                fontSize:'0.8rem',fontWeight:800,letterSpacing:1.5,
                textTransform:'uppercase',marginBottom:24}}>
                🐶 Animal Rescue & Awareness Platform
              </div>
              <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(2.2rem,5vw,4.2rem)',
                color:'#fff',lineHeight:1.1,marginBottom:24}}>
                Every Animal<br/>Deserves a<br/><span style={{color:G.tan}}>Second Chance</span>
              </h1>
              <p style={{color:'#e8d5bb',fontSize:'1.05rem',fontWeight:300,lineHeight:1.7,marginBottom:36,maxWidth:480}}>
                PawHaven is Pakistan's dedicated platform for rescuing injured animals, facilitating adoptions, raising awareness, and connecting compassionate people with animals in need.
              </p>
              <div style={{display:'flex',gap:14,flexWrap:'wrap',marginBottom:40}}>
                <EmergencyBtn setPage={setPage}/>
                <button onClick={()=>setPage('adopt')}
                  style={{background:'transparent',color:G.tan,border:`2px solid ${G.tan}`,
                    padding:'14px 28px',borderRadius:50,fontWeight:700,fontSize:'0.95rem',cursor:'pointer'}}>
                  🐾 Meet Animals
                </button>
              </div>
              <div style={{display:'flex',gap:28,flexWrap:'wrap'}}>
                {stats.map(([n,l])=>(
                  <div key={l}>
                    <div style={{fontFamily:"'Playfair Display',serif",fontSize:'1.9rem',color:G.tan,fontWeight:900}}>{n}</div>
                    <div style={{color:'#c8b090',fontSize:'0.75rem',textTransform:'uppercase',letterSpacing:1}}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="hero-images" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,position:'relative'}}>
              {[
                'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=300&h=300&fit=crop',
                'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300&h=300&fit=crop',
                'https://images.unsplash.com/photo-1552053831-71594a27632d?w=300&h=300&fit=crop',
                'https://images.unsplash.com/photo-1561948955-570b270e7c36?w=300&h=300&fit=crop',
              ].map((src,i)=>(
                <div key={i} style={{borderRadius:i===0?'20px 20px 8px 8px':i===3?'8px 8px 20px 20px':'12px',
                  overflow:'hidden',aspectRatio:'1',
                  marginTop:i===1||i===3?28:0,
                  boxShadow:'0 8px 32px rgba(0,0,0,.4)',
                  border:'3px solid rgba(255,255,255,.1)'}}>
                  <img src={src} alt="rescue animal" style={{width:'100%',height:'100%',objectFit:'cover'}}/>
                </div>
              ))}
              <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',
                background:G.orange,borderRadius:'50%',width:56,height:56,
                display:'flex',alignItems:'center',justifyContent:'center',
                fontSize:'1.6rem',boxShadow:'0 0 0 6px rgba(232,98,26,.3)'}}>🐾</div>
            </div>
          </div>
        </div>
      </section>
 
      <section style={{padding:'80px 20px',background:G.cream}}>
        <div style={{maxWidth:1200,margin:'0 auto'}}>
          <div style={{textAlign:'center',marginBottom:52}}>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(2rem,4vw,2.6rem)',color:G.brown}}>What We Do</h2>
            <div style={{width:60,height:4,background:G.orange,borderRadius:2,margin:'12px auto 16px'}}/>
            <p style={{color:'#7a5c3a',fontSize:'1.05rem',maxWidth:540,margin:'0 auto'}}>
              From emergency rescue to adoption — we cover every step of an animal's journey to safety.
            </p>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:20}}>
            {features.map(f=>(
              <button key={f.page} onClick={()=>setPage(f.page)}
                style={{background:'#fff',border:'none',borderRadius:20,padding:28,
                  textAlign:'left',cursor:'pointer',
                  boxShadow:'0 4px 20px rgba(92,51,23,.08)',
                  transition:'all .3s'}}
                onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-6px)';e.currentTarget.style.boxShadow='0 12px 40px rgba(232,98,26,.2)';}}
                onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='0 4px 20px rgba(92,51,23,.08)';}}>
                <div style={{fontSize:'2.5rem',marginBottom:14}}>{f.icon}</div>
                <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:'1.25rem',color:G.brown,marginBottom:8}}>{f.title}</h3>
                <p style={{color:'#7a5c3a',fontSize:'0.93rem',lineHeight:1.6,marginBottom:16}}>{f.desc}</p>
                <span style={{color:G.orange,fontWeight:800,fontSize:'0.88rem'}}>Learn More →</span>
              </button>
            ))}
          </div>
        </div>
      </section>
 
      <section style={{background:`linear-gradient(135deg,${G.brown},${G.orange})`,padding:'70px 20px',textAlign:'center'}}>
        <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(1.8rem,4vw,2.4rem)',color:'#fff',marginBottom:16}}>
          Spotted an Injured Animal?
        </h2>
        <p style={{color:'#fde0c8',fontSize:'1.05rem',marginBottom:32,maxWidth:500,margin:'0 auto 32px'}}>
          Don't wait. Report it now and our rescue team will be on the way.
        </p>
        <EmergencyBtn setPage={setPage}/>
      </section>
    </div>
  );
}
 
// ═══════════════════════════════════════════════════════════════════════════════
// PAGE 2 — REPORT AN ANIMAL
// ═══════════════════════════════════════════════════════════════════════════════
function ReportPage({showToast}){
  const [form,setForm]=useState({type:'',location:'',condition:'',name:'',phone:'',email:'',notes:'',photo:null});
  const [submitted,setSubmitted]=useState(false);
  const [photoPreview,setPhotoPreview]=useState(null);
 
  const handlePhoto=e=>{
    const file=e.target.files[0];
    if(file){setForm({...form,photo:file});setPhotoPreview(URL.createObjectURL(file));}
  };

  const submit=()=>{
    if(!form.type||!form.location||!form.condition){showToast('Please fill all required fields!','error');return;}
    setSubmitted(true);
    showToast('🚨 Report submitted successfully! Our team is on the way.');
  };
 
  if(submitted) return(
    <div style={{minHeight:'80vh',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:20,padding:40,textAlign:'center'}}>
      <div style={{fontSize:'5rem'}}>✅</div>
      <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(1.6rem,4vw,2.2rem)',color:G.brown}}>Report Submitted!</h2>
      <p style={{color:'#7a5c3a',fontSize:'1.05rem',maxWidth:440}}>
        Our rescue team has been notified. We typically respond within <strong>60 minutes</strong>. You'll receive updates via SMS/Email.
      </p>
      <div style={{background:'#fff',borderRadius:16,padding:'24px 32px',textAlign:'center',boxShadow:'0 4px 20px rgba(92,51,23,.1)'}}>
        <div style={{color:G.orange,fontWeight:800,fontSize:'1.05rem'}}>Your Report ID</div>
        <div style={{fontFamily:"'Playfair Display',serif",fontSize:'2rem',color:G.brown,fontWeight:900}}>
          #RES-{Math.floor(Math.random()*9000)+1000}
        </div>
      </div>
      <button onClick={()=>setSubmitted(false)} style={{background:G.orange,color:'#fff',border:'none',padding:'13px 32px',borderRadius:50,fontWeight:700,cursor:'pointer',fontSize:'1rem'}}>
        Submit Another Report
      </button>
    </div>
  );
 
  const inp={width:'100%',padding:'12px 16px',borderRadius:12,border:'1.5px solid #e0c9a8',fontSize:'0.95rem',background:'#fff',outline:'none',fontFamily:"'Nunito',sans-serif"};
  const lbl={display:'block',fontWeight:700,color:G.brown,marginBottom:6,fontSize:'0.9rem'};
 
  return(
    <div style={{padding:'60px 20px',background:G.cream,minHeight:'100vh'}}>
      <div style={{maxWidth:760,margin:'0 auto'}}>
        <div style={{background:'linear-gradient(135deg,#c0392b,#e74c3c)',borderRadius:20,padding:'28px 24px',marginBottom:32,color:'#fff',textAlign:'center'}}>
          <div style={{fontSize:'2.8rem',marginBottom:8}}>🚨</div>
          <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(1.7rem,4vw,2.2rem)',marginBottom:8}}>Report an Animal</h1>
          <p style={{opacity:.9,fontSize:'1rem'}}>Found an injured, lost, or stray animal? Fill this form — our team responds within 60 minutes.</p>
        </div>
 
        <div style={{background:'#fff',borderRadius:20,padding:'28px 24px',boxShadow:'0 4px 24px rgba(92,51,23,.1)'}}>
          <div className="grid-2" style={{marginBottom:20}}>
            <div>
              <label style={lbl}>Animal Type *</label>
              <select value={form.type} onChange={e=>setForm({...form,type:e.target.value})} style={inp}>
                <option value="">Select type...</option>
                <option>Dog</option><option>Cat</option><option>Bird</option>
                <option>Rabbit</option><option>Other</option>
              </select>
            </div>
            <div>
              <label style={lbl}>Condition *</label>
              <select value={form.condition} onChange={e=>setForm({...form,condition:e.target.value})} style={inp}>
                <option value="">Select condition...</option>
                <option value="injured">🩸 Injured</option>
                <option value="lost">❓ Lost / Missing</option>
                <option value="stray">🏚️ Stray</option>
                <option value="sick">🤒 Sick</option>
                <option value="trapped">🪤 Trapped</option>
              </select>
            </div>
          </div>
 
          <div style={{marginBottom:20}}>
            <label style={lbl}>Location / Address *</label>
            <input type="text" value={form.location} onChange={e=>setForm({...form,location:e.target.value})}
              placeholder="e.g. Near Anarkali Bazaar, Lahore" style={inp}/>
          </div>
 
          <div style={{marginBottom:20}}>
            <label style={lbl}>Upload Photo</label>
            <label style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',
              border:'2px dashed #e0c9a8',borderRadius:12,padding:28,cursor:'pointer',
              background:photoPreview?'#fff8f0':'#fdf6ec',transition:'all .2s'}}>
              {photoPreview?(
                <img src={photoPreview} alt="preview" style={{maxHeight:180,borderRadius:10,objectFit:'cover',maxWidth:'100%'}}/>
              ):(
                <>
                  <div style={{fontSize:'2.5rem',marginBottom:8}}>📸</div>
                  <div style={{color:G.brown,fontWeight:700}}>Click to upload a photo</div>
                  <div style={{color:'#a07040',fontSize:'0.83rem'}}>JPG, PNG up to 10MB</div>
                </>
              )}
              <input type="file" accept="image/*" onChange={handlePhoto} style={{display:'none'}}/>
            </label>
          </div>
 
          <div style={{marginBottom:20}}>
            <label style={lbl}>Additional Notes</label>
            <textarea value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})}
              rows={3} placeholder="Describe the animal's situation..."
              style={{...inp,resize:'none'}}/>
          </div>
 
          <div style={{background:'#f5e8d0',borderRadius:14,padding:20,marginBottom:24}}>
            <div style={{fontWeight:800,color:G.brown,marginBottom:14}}>📞 Your Contact Information</div>
            <div className="grid-2">
              <div>
                <label style={lbl}>Your Name</label>
                <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})}
                  placeholder="Full Name" style={inp}/>
              </div>
              <div>
                <label style={lbl}>Phone Number</label>
                <input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}
                  placeholder="+92 300 0000000" style={inp}/>
              </div>
            </div>
          </div>
 
          <button onClick={submit}
            style={{width:'100%',background:'linear-gradient(135deg,#c0392b,#e74c3c)',
              color:'#fff',border:'none',padding:'15px',borderRadius:50,
              fontWeight:800,fontSize:'1.05rem',cursor:'pointer',
              boxShadow:'0 8px 24px rgba(192,57,43,.35)'}}>
            🚨 Submit Emergency Report
          </button>
        </div>
      </div>
    </div>
  );
}
 
// ═══════════════════════════════════════════════════════════════════════════════
// PAGE 3 — ADOPT
// ═══════════════════════════════════════════════════════════════════════════════
const PETS=[
  {id:1,name:'Buddy',type:'dog',breed:'Golden Retriever Mix',age:'2 yrs',gender:'Male',status:'Available',
   tags:['Playful','Kid-Friendly','Vaccinated'],
   desc:'Buddy is a joyful, energetic Golden Retriever mix who loves fetch, cuddles, and making new friends.',
   weight:'28 kg',color:'Golden Brown',vaccinated:true,neutered:false,
   imgs:['https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=700&h=450&fit=crop','https://images.unsplash.com/photo-1552053831-71594a27632d?w=700&h=450&fit=crop','https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=700&h=450&fit=crop']},
  {id:2,name:'Luna',type:'cat',breed:'Tabby Cat',age:'1 yr',gender:'Female',status:'Available',
   tags:['Calm','Indoor','Neutered'],
   desc:'Luna is a sweet and gentle tabby who loves sunny spots and quiet homes.',
   weight:'3.5 kg',color:'Black & White',vaccinated:true,neutered:true,
   imgs:['https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=700&h=450&fit=crop','https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=700&h=450&fit=crop','https://images.unsplash.com/photo-1548681528-6a5c45b66b42?w=700&h=450&fit=crop']},
  {id:3,name:'Max',type:'dog',breed:'German Shepherd',age:'3 yrs',gender:'Male',status:'Pending',
   tags:['Energetic','Loyal','Trained'],
   desc:'Max is a noble, intelligent German Shepherd. Fully obedience trained.',
   weight:'35 kg',color:'Black & Tan',vaccinated:true,neutered:false,
   imgs:['https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=700&h=450&fit=crop','https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=700&h=450&fit=crop']},
  {id:4,name:'Mochi',type:'cat',breed:'Persian Mix',age:'4 yrs',gender:'Female',status:'Available',
   tags:['Gentle','Quiet','Vaccinated'],
   desc:'Mochi is a calm and fluffy Persian mix. Perfect for a quiet home.',
   weight:'4 kg',color:'White & Orange',vaccinated:true,neutered:true,
   imgs:['https://images.unsplash.com/photo-1561948955-570b270e7c36?w=700&h=450&fit=crop','https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=700&h=450&fit=crop']},
  {id:5,name:'Coco',type:'other',breed:'Holland Lop Rabbit',age:'1 yr',gender:'Female',status:'Available',
   tags:['Fluffy','Social','Gentle'],
   desc:'Coco is an adorable Holland Lop rabbit who loves exploring.',
   weight:'2 kg',color:'White & Brown',vaccinated:true,neutered:false,
   imgs:['https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=700&h=450&fit=crop','https://images.unsplash.com/photo-1589952283406-b53a7d1347e8?w=700&h=450&fit=crop']},
  {id:6,name:'Rocky',type:'dog',breed:'Labrador Mix',age:'4 yrs',gender:'Male',status:'Available',
   tags:['Friendly','Active','Good with Kids'],
   desc:'Rocky is a happy-go-lucky Labrador mix who thrives on outdoor adventures.',
   weight:'30 kg',color:'Chocolate Brown',vaccinated:true,neutered:false,
   imgs:['https://images.unsplash.com/photo-1534361960057-19f4434a56b8?w=700&h=450&fit=crop','https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=700&h=450&fit=crop']},
];
 
function AnimalDetail({animal,onBack,showToast}){
  const [activeImg,setActiveImg]=useState(0);
  const [showForm,setShowForm]=useState(false);
  const [form,setForm]=useState({name:'',email:'',phone:'',reason:''});
  const inp={width:'100%',padding:'12px 16px',borderRadius:12,border:'1.5px solid #e0c9a8',fontSize:'0.93rem',background:'#fff',outline:'none',fontFamily:"'Nunito',sans-serif"};
 
  const submit=()=>{
    if(!form.name||!form.email){showToast('Please fill in name and email!','error');return;}
    showToast(`🐾 Application for ${animal.name} submitted successfully!`);
    setShowForm(false);
    setForm({name:'',email:'',phone:'',reason:''});
  };
 
  return(
    <div style={{background:G.cream,minHeight:'100vh',padding:'40px 20px'}}>
      <div style={{maxWidth:1100,margin:'0 auto'}}>
        <button onClick={onBack}
          style={{background:'#fff',border:`2px solid ${G.tan}`,color:G.brown,
            padding:'9px 22px',borderRadius:50,fontWeight:700,cursor:'pointer',
            fontSize:'0.9rem',marginBottom:28,display:'flex',alignItems:'center',gap:8}}>
          ← Back to Animals
        </button>
        <div className="animal-detail-grid">
          <div>
            <div style={{borderRadius:20,overflow:'hidden',height:340,marginBottom:12,
              boxShadow:'0 8px 32px rgba(92,51,23,.18)',position:'relative'}}>
              <img src={animal.imgs[activeImg]} alt={animal.name}
                style={{width:'100%',height:'100%',objectFit:'cover'}}/>
              <div style={{position:'absolute',top:14,right:14,
                background:animal.status==='Available'?'#d4edda':'#fff3cd',
                color:animal.status==='Available'?'#155724':'#856404',
                padding:'5px 14px',borderRadius:50,fontSize:'0.75rem',fontWeight:800}}>
                {animal.status==='Available'?'✅ Available':'⏳ Pending'}
              </div>
              {activeImg>0&&(
                <button onClick={()=>setActiveImg(activeImg-1)}
                  style={{position:'absolute',left:12,top:'50%',transform:'translateY(-50%)',
                    background:'rgba(0,0,0,.5)',color:'#fff',border:'none',width:38,height:38,
                    borderRadius:'50%',fontSize:'1.1rem',cursor:'pointer'}}>‹</button>
              )}
              {activeImg<animal.imgs.length-1&&(
                <button onClick={()=>setActiveImg(activeImg+1)}
                  style={{position:'absolute',right:12,top:'50%',transform:'translateY(-50%)',
                    background:'rgba(0,0,0,.5)',color:'#fff',border:'none',width:38,height:38,
                    borderRadius:'50%',fontSize:'1.1rem',cursor:'pointer'}}>›</button>
              )}
            </div>
            <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
              {animal.imgs.map((img,i)=>(
                <div key={i} onClick={()=>setActiveImg(i)}
                  style={{width:76,height:58,borderRadius:8,overflow:'hidden',cursor:'pointer',
                    border:i===activeImg?`3px solid ${G.orange}`:'3px solid transparent',
                    opacity:i===activeImg?1:.7,transition:'all .2s',flexShrink:0}}>
                  <img src={img} alt="" style={{width:'100%',height:'100%',objectFit:'cover'}}/>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(2rem,4vw,2.6rem)',color:G.brown,marginBottom:4}}>{animal.name}</h1>
            <p style={{color:'#a07040',fontSize:'1rem',marginBottom:14}}>🐾 {animal.breed} · {animal.age} · {animal.gender}</p>
            <div style={{display:'flex',flexWrap:'wrap',gap:8,marginBottom:16}}>
              {animal.tags.map(t=>(
                <span key={t} style={{background:'#f5e8d0',color:G.brown,fontSize:'0.8rem',fontWeight:700,padding:'5px 14px',borderRadius:50}}>{t}</span>
              ))}
            </div>
            <p style={{color:'#5a3e28',fontSize:'0.95rem',lineHeight:1.75,marginBottom:20}}>{animal.desc}</p>
            <button onClick={()=>setShowForm(true)}
              style={{width:'100%',background:G.orange,color:'#fff',border:'none',
                padding:'15px',borderRadius:50,fontWeight:800,fontSize:'1.05rem',
                cursor:'pointer',boxShadow:`0 6px 20px rgba(232,98,26,.4)`}}>
              🐾 Apply to Adopt {animal.name}
            </button>
          </div>
        </div>
      </div>
 
      {showForm&&(
        <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.6)',zIndex:300,
          display:'flex',alignItems:'center',justifyContent:'center',padding:16}}>
          <div style={{background:'#fff',borderRadius:20,width:'100%',maxWidth:460,
            overflow:'hidden',boxShadow:'0 24px 80px rgba(0,0,0,.35)',
            maxHeight:'90vh',overflowY:'auto'}}>
            <div style={{background:G.brown,padding:'18px 24px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <span style={{fontFamily:"'Playfair Display',serif",color:G.tan,fontSize:'1.2rem',fontWeight:700}}>
                🐾 Adopt {animal.name}
              </span>
              <button onClick={()=>setShowForm(false)}
                style={{background:'none',border:'none',color:G.tan,fontSize:'1.5rem',cursor:'pointer'}}>✕</button>
            </div>
            <div style={{padding:24}}>
              {[['Full Name *','text','name','Your full name'],
                ['Email *','email','email','your@email.com'],
                ['Phone','tel','phone','+92 300 0000000']].map(([l,t,k,ph])=>(
                <div key={k} style={{marginBottom:12}}>
                  <label style={{display:'block',fontWeight:700,color:G.brown,marginBottom:5,fontSize:'0.88rem'}}>{l}</label>
                  <input type={t} value={form[k]} onChange={e=>setForm({...form,[k]:e.target.value})} placeholder={ph} style={inp}/>
                </div>
              ))}
              <div style={{marginBottom:18}}>
                <label style={{display:'block',fontWeight:700,color:G.brown,marginBottom:5,fontSize:'0.88rem'}}>Why do you want to adopt?</label>
                <textarea value={form.reason} onChange={e=>setForm({...form,reason:e.target.value})} rows={3}
                  placeholder="Tell us about your home..." style={{...inp,resize:'none'}}/>
              </div>
              <button onClick={submit}
                style={{width:'100%',background:G.orange,color:'#fff',border:'none',
                  padding:'13px',borderRadius:50,fontWeight:700,fontSize:'1rem',cursor:'pointer'}}>
                Submit Application 🐾
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
 
function AdoptPage({showToast}){
  const [filter,setFilter]=useState('all');
  const [detail,setDetail]=useState(null);
  const filtered=filter==='all'?PETS:PETS.filter(p=>p.type===filter);
  if(detail){
    return <AnimalDetail animal={detail} onBack={(next)=>next?setDetail(next):setDetail(null)} showToast={showToast}/>;
  }
  return(
    <div style={{padding:'60px 20px',background:G.cream,minHeight:'100vh'}}>
      <div style={{maxWidth:1160,margin:'0 auto'}}>
        <div style={{textAlign:'center',marginBottom:44}}>
          <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(2rem,5vw,2.8rem)',color:G.brown}}>Animals for Adoption</h1>
          <div style={{width:60,height:4,background:G.orange,borderRadius:2,margin:'12px auto 16px'}}/>
        </div>
        <div style={{display:'flex',justifyContent:'center',gap:10,flexWrap:'wrap',marginBottom:36}}>
          {[['all','🐾 All'],['dog','🐶 Dogs'],['cat','🐱 Cats'],['other','🐇 Others']].map(([v,l])=>(
            <button key={v} onClick={()=>setFilter(v)}
              style={{background:filter===v?G.orange:'#f5e8d0',color:filter===v?'#fff':G.brown,
                border:filter===v?`2px solid ${G.orange}`:'2px solid transparent',
                padding:'9px 22px',borderRadius:50,fontWeight:700,cursor:'pointer',transition:'all .2s'}}>
              {l}
            </button>
          ))}
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))',gap:22}}>
          {filtered.map(p=>(
            <div key={p.id} onClick={()=>{setDetail(p);window.scrollTo(0,0);}}
              style={{background:'#fff',borderRadius:20,overflow:'hidden',cursor:'pointer',
                boxShadow:'0 4px 20px rgba(92,51,23,.1)',transition:'all .3s'}}
              onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-8px)';}}
              onMouseLeave={e=>{e.currentTarget.style.transform='none';}}>
              <div style={{position:'relative',height:210,overflow:'hidden'}}>
                <img src={p.imgs[0]} alt={p.name} style={{width:'100%',height:'100%',objectFit:'cover'}}/>
                <div style={{position:'absolute',top:12,right:12,
                  background:p.status==='Available'?'#d4edda':'#fff3cd',
                  color:p.status==='Available'?'#155724':'#856404',
                  padding:'4px 12px',borderRadius:50,fontSize:'0.72rem',fontWeight:800}}>
                  {p.status==='Available'?'✅ Available':'⏳ Pending'}
                </div>
              </div>
              <div style={{padding:18}}>
                <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:'1.3rem',color:G.brown,marginBottom:4}}>{p.name}</h3>
                <p style={{color:'#a07040',fontSize:'0.85rem',marginBottom:10}}>🐾 {p.breed} · {p.age} · {p.gender}</p>
                <div style={{display:'flex',flexWrap:'wrap',gap:6,marginBottom:14}}>
                  {p.tags.map(t=>(
                    <span key={t} style={{background:'#f5e8d0',color:G.brown,fontSize:'0.72rem',fontWeight:700,padding:'4px 10px',borderRadius:50}}>{t}</span>
                  ))}
                </div>
                <div style={{width:'100%',background:`linear-gradient(135deg,${G.orange},${G.orangeLt})`,
                  color:'#fff',padding:'10px',borderRadius:50,fontWeight:700,
                  fontSize:'0.88rem',textAlign:'center'}}>
                  View {p.name}'s Gallery →
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
 
// ═══════════════════════════════════════════════════════════════════════════════
// PAGE 4 — DONATE
// ═══════════════════════════════════════════════════════════════════════════════
function DonatePage({showToast}){
  const [selAmt,setSelAmt]=useState('₨500');
  const [custom,setCustom]=useState('');
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [method,setMethod]=useState('easypaisa');
  const [donated,setDonated]=useState(false);

  const payMethods=[
    {id:'easypaisa',label:'Easypaisa',color:'#4CAF50',icon:'💚',num:'0315-9607861'},
    {id:'jazzcash',label:'JazzCash',color:'#E91E63',icon:'💜',num:'0304-5522274'},
    {id:'bank',label:'HBL Bank',color:'#1565C0',icon:'🏦',num:'Coming Soon'},
    {id:'paypal',label:'PayPal',color:'#003087',icon:'💙',num:'laibaak0327@gmail.com'},
  ];

  const submit=()=>{
    if(!name){showToast('Please enter your name!','error');return;}
    showToast(`💛 Thank you ${name}! Donation submitted successfully.`);
    setDonated(true);
  };

  return(
    <div style={{padding:'60px 20px',background:G.cream,minHeight:'100vh'}}>
      <div style={{maxWidth:700,margin:'0 auto'}}>
        <div style={{textAlign:'center',marginBottom:48}}>
          <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(2rem,5vw,2.8rem)',color:G.brown}}>Support Our Mission</h1>
          <div style={{width:60,height:4,background:G.orange,borderRadius:2,margin:'12px auto 16px'}}/>
        </div>
        {!donated?(
          <div style={{background:`linear-gradient(135deg,${G.brown},${G.dark})`,borderRadius:24,padding:'36px 28px',color:'#fff'}}>
            <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:'1.8rem',color:G.tan,marginBottom:8,textAlign:'center'}}>Make a Donation</h3>
            <div className="donate-4">
              {['₨100','₨500','₨1000','₨5000'].map(a=>(
                <button key={a} onClick={()=>{setSelAmt(a);setCustom('');}}
                  style={{background:selAmt===a&&!custom?G.orange:'rgba(255,255,255,.1)',
                    color:'#fff',border:'2px solid rgba(255,255,255,.2)',
                    padding:'11px 6px',borderRadius:12,fontWeight:700,cursor:'pointer',fontSize:'0.9rem'}}>
                  {a}
                </button>
              ))}
            </div>
            <input type="text" value={custom} onChange={e=>setCustom(e.target.value)}
              placeholder="Custom amount (₨)" style={{width:'100%',padding:'12px 16px',borderRadius:50,border:'none',
                textAlign:'center',fontWeight:700,marginBottom:20,fontSize:'1rem',outline:'none',
                background:'rgba(255,255,255,.12)',color:'#fff'}}/>
            <div style={{marginBottom:16}}>
              <div style={{color:G.tan,fontWeight:700,fontSize:'0.9rem',marginBottom:10}}>💳 Select Payment Method</div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
                {payMethods.map(m=>(
                  <button key={m.id} onClick={()=>setMethod(m.id)}
                    style={{background:method===m.id?m.color:'rgba(255,255,255,.08)',
                      color:'#fff',border:`2px solid ${method===m.id?m.color:'rgba(255,255,255,.2)'}`,
                      padding:'12px 10px',borderRadius:14,fontWeight:700,cursor:'pointer',fontSize:'0.88rem'}}>
                    <div style={{fontSize:'1.4rem',marginBottom:4}}>{m.icon}</div>
                    {m.label}
                  </button>
                ))}
              </div>
            </div>
            <div style={{background:'rgba(255,255,255,.1)',borderRadius:14,padding:'12px 16px',marginBottom:16}}>
              <div style={{color:'#fff',fontWeight:800}}>{payMethods.find(m=>m.id===method)?.num}</div>
            </div>
            <div className="donate-2">
              <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name *"
                style={{padding:'12px',borderRadius:12,border:'none',background:'rgba(255,255,255,.12)',color:'#fff',outline:'none',fontFamily:"'Nunito',sans-serif",width:'100%'}}/>
              <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email (optional)"
                style={{padding:'12px',borderRadius:12,border:'none',background:'rgba(255,255,255,.12)',color:'#fff',outline:'none',fontFamily:"'Nunito',sans-serif",width:'100%'}}/>
            </div>
            <button onClick={submit}
              style={{width:'100%',background:G.orange,color:'#fff',border:'none',padding:'15px',
                borderRadius:50,fontWeight:800,fontSize:'1.05rem',cursor:'pointer',marginTop:8}}>
              💛 Donate {custom||selAmt}
            </button>
          </div>
        ):(
          <div style={{textAlign:'center',padding:48}}>
            <div style={{fontSize:'4rem',marginBottom:16}}>💛</div>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'2rem',color:G.brown,marginBottom:12}}>Thank You, {name}!</h2>
            <button onClick={()=>setDonated(false)} style={{background:G.orange,color:'#fff',border:'none',padding:'13px 32px',borderRadius:50,fontWeight:700,cursor:'pointer'}}>Donate Again</button>
          </div>
        )}
      </div>
    </div>
  );
}
 
// ═══════════════════════════════════════════════════════════════════════════════
// AI ANIMAL SCANNER — CLAUDE API ✅ (FREE & WORKING)
// ═══════════════════════════════════════════════════════════════════════════════
function AIAnimalScanner({showToast}){
  const [phase,setPhase]=useState('upload');
  const [preview,setPreview]=useState(null);
  const [base64,setBase64]=useState(null);
  const [mimeType,setMimeType]=useState('image/jpeg');
  const [result,setResult]=useState(null);
  const [errorMsg,setErrorMsg]=useState('');
 
  const handleFile=e=>{
    const file=e.target.files[0];
    if(!file)return;
    const reader=new FileReader();
    reader.onload=(ev)=>{
      const dataUrl=ev.target.result;
      setPreview(dataUrl);
      setBase64(dataUrl.split(',')[1]);
      setMimeType(file.type||'image/jpeg');
      setPhase('preview');
      setResult(null);
      setErrorMsg('');
    };
    reader.readAsDataURL(file);
  };
 
  const analyze=async()=>{
    setPhase('loading');
    setErrorMsg('');

    const prompt=`You are an expert animal first aid AI for PawHaven Pakistan. Analyze this animal photo carefully.

Respond ONLY with a valid JSON object. No markdown, no code fences, no extra text.

{
  "animal_type": "Dog / Cat / Bird / Rabbit / Other / Not detected",
  "condition_observed": "1-2 sentences describing what you see",
  "severity": "low",
  "severity_label": "Mild",
  "immediate_steps": [
    {
      "icon": "🩹",
      "title": "Step title",
      "detail": "Clear actionable instruction",
      "color": "green"
    }
  ],
  "medicine_advice": "Safe medicines or null",
  "bandage_needed": false,
  "bandage_instructions": "Instructions or null",
  "vet_needed": false,
  "vet_urgency": "Not urgent",
  "encouragement": "Short compassionate message"
}

Rules:
- severity: exactly "low", "medium", or "high"
- severity_label: exactly "Mild", "Moderate", or "Emergency"
- color: exactly "green", "yellow", or "red"
- Give 3-5 immediate_steps
- If healthy animal: severity "low", vet_needed false, general care tips
- If unclear/no animal: animal_type "Not detected"
- ONLY output the JSON object`;

    try{
      // ✅ /api/analyze proxy — CORS fix!
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageBase64: base64,
          mimeType: mimeType,
          prompt: prompt,
        })
      });

      if(!response.ok){
        const errText = await response.text().catch(()=>'');
        let errMsg = `API error ${response.status}`;
        try{ const j=JSON.parse(errText); errMsg=j?.error?.message||errMsg; }catch(e){}
        throw new Error(errMsg);
      }

      const data = await response.json();
      const rawText = data.result || '';

      const jsonMatch = rawText.match(/\{[\s\S]*\}/);
      if(!jsonMatch) throw new Error('Could not parse AI response. Please try again.');

      const parsed = JSON.parse(jsonMatch[0]);

      if(!parsed.animal_type) parsed.animal_type = 'Unknown';
      if(!parsed.condition_observed) parsed.condition_observed = 'Unable to determine condition.';
      if(!['low','medium','high'].includes(parsed.severity)) parsed.severity = 'low';
      if(!['Mild','Moderate','Emergency'].includes(parsed.severity_label)) parsed.severity_label = 'Mild';
      if(!Array.isArray(parsed.immediate_steps)) parsed.immediate_steps = [];
      if(typeof parsed.vet_needed !== 'boolean') parsed.vet_needed = false;
      if(typeof parsed.bandage_needed !== 'boolean') parsed.bandage_needed = false;
      if(!parsed.encouragement) parsed.encouragement = 'Thank you for helping this animal. Every act of kindness matters.';

      setResult(parsed);
      setPhase('result');
    } catch(err) {
      console.error('AI Scanner error:', err);
      setErrorMsg(err.message || 'Unknown error occurred');
      showToast('Could not analyze image. Please try again.','error');
      setPhase('preview');
    }
  };
 
  const reset=()=>{setPhase('upload');setPreview(null);setBase64(null);setResult(null);setErrorMsg('');};
 
  const sevBg={low:'#d4edda',medium:'#fff3cd',high:'#f8d7da'};
  const sevClr={low:'#155724',medium:'#856404',high:'#721c24'};
  const sevEmoji={low:'✅',medium:'⚠️',high:'🚨'};
  const stepBg={green:'#eaf7f0',yellow:'#fffbea',red:'#fff0f0'};
  const stepBdr={green:'#2d7a4f',yellow:'#d4a017',red:'#c0392b'};
 
  return(
    <div style={{maxWidth:700,margin:'0 auto'}}>
      <div style={{background:`linear-gradient(135deg,${G.brown},${G.orange})`,borderRadius:20,
        padding:'28px 24px',color:'#fff',textAlign:'center',marginBottom:24}}>
        <div style={{fontSize:'3rem',marginBottom:10}}>🔬</div>
        <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(1.6rem,4vw,2rem)',marginBottom:8}}>
          AI Animal Injury Scanner
        </h2>
        <p style={{opacity:.9,fontSize:'0.95rem',lineHeight:1.6}}>
          Upload a photo — AI will tell you how to help the animal instantly
        </p>
      </div>

      {phase==='upload'&&(
        <label style={{display:'flex',flexDirection:'column',alignItems:'center',
          border:`2.5px dashed ${G.tan}`,borderRadius:18,padding:'44px 20px',
          cursor:'pointer',background:'#fff8f0',textAlign:'center'}}>
          <div style={{fontSize:'3.5rem',marginBottom:14}}>📸</div>
          <div style={{fontWeight:800,color:G.brown,fontSize:'1.1rem',marginBottom:6}}>
            Click here to upload a photo
          </div>
          <div style={{color:'#a07040',fontSize:'0.85rem'}}>JPG · PNG · Any angle accepted</div>
          <input type="file" accept="image/*" onChange={handleFile} style={{display:'none'}}/>
        </label>
      )}

      {phase==='preview'&&(
        <div style={{background:'#fff',borderRadius:18,padding:24,boxShadow:'0 4px 20px rgba(92,51,23,.1)'}}>
          <img src={preview} alt="preview"
            style={{width:'100%',maxHeight:320,objectFit:'cover',borderRadius:12,marginBottom:18}}/>
          {errorMsg&&(
            <div style={{background:'#fff0f0',border:'1px solid #e74c3c',borderRadius:10,padding:'10px 14px',
              color:'#c0392b',fontSize:'0.85rem',marginBottom:14}}>
              ⚠️ {errorMsg}
            </div>
          )}
          <div style={{display:'flex',gap:12}}>
            <button onClick={reset}
              style={{background:'#f5e8d0',color:G.brown,border:'none',
                padding:'12px 22px',borderRadius:50,fontWeight:700,cursor:'pointer',fontSize:'0.9rem'}}>
              ← Back
            </button>
            <button onClick={analyze}
              style={{flex:1,background:`linear-gradient(135deg,${G.orange},${G.orangeLt})`,
                color:'#fff',border:'none',padding:'12px',borderRadius:50,
                fontWeight:800,fontSize:'1rem',cursor:'pointer',
                boxShadow:'0 6px 20px rgba(232,98,26,.35)'}}>
              🔍 Analyze with AI
            </button>
          </div>
        </div>
      )}

      {phase==='loading'&&(
        <div style={{background:'#fff',borderRadius:18,padding:'48px 24px',
          textAlign:'center',boxShadow:'0 4px 20px rgba(92,51,23,.1)'}}>
          <img src={preview} alt="analyzing"
            style={{width:'100%',maxHeight:200,objectFit:'cover',borderRadius:12,
              marginBottom:28,opacity:.7}}/>
          <div style={{fontSize:'2.2rem',marginBottom:12}}>🔬</div>
          <div style={{color:G.brown,fontWeight:800,fontSize:'1.05rem',marginBottom:8}}>
            AI is analyzing the animal...
          </div>
          <div style={{color:'#a07040',fontSize:'0.9rem',marginBottom:20}}>Please wait a moment</div>
          <div style={{display:'flex',justifyContent:'center',gap:8}}>
            <span className="dot-bounce"/><span className="dot-bounce"/><span className="dot-bounce"/>
          </div>
        </div>
      )}

      {phase==='result'&&result&&(
        <div style={{background:'#fff',borderRadius:18,padding:28,boxShadow:'0 4px 24px rgba(92,51,23,.12)'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:16,flexWrap:'wrap',gap:10}}>
            <div>
              <div style={{fontSize:'0.75rem',color:'#a07040',fontWeight:700,textTransform:'uppercase',letterSpacing:1,marginBottom:4}}>Animal Detected</div>
              <div style={{color:G.brown,fontWeight:800,fontSize:'1.15rem'}}>🐾 {result.animal_type}</div>
            </div>
            <span style={{
              background:sevBg[result.severity]||sevBg.low,
              color:sevClr[result.severity]||sevClr.low,
              padding:'6px 18px',borderRadius:50,fontWeight:800,fontSize:'0.83rem',
              display:'inline-flex',alignItems:'center',gap:6}}>
              {sevEmoji[result.severity]||'✅'} {result.severity_label||'Mild'}
            </span>
          </div>

          <div style={{background:'#f5e8d0',borderRadius:10,padding:'12px 16px',color:G.brown,fontSize:'0.92rem',lineHeight:1.65,marginBottom:20}}>
            <strong>AI Observation:</strong> {result.condition_observed}
          </div>

          {result.immediate_steps && result.immediate_steps.length > 0 && (
            <>
              <div style={{fontWeight:800,color:G.brown,fontSize:'0.82rem',textTransform:'uppercase',letterSpacing:.8,marginBottom:10}}>
                🚑 Immediate Steps
              </div>
              {result.immediate_steps.map((s,i)=>(
                <div key={i} style={{
                  background:stepBg[s.color]||stepBg.green,
                  borderLeft:`4px solid ${stepBdr[s.color]||stepBdr.green}`,
                  borderRadius:'0 10px 10px 0',padding:'12px 15px',marginBottom:8,
                  display:'flex',gap:12,alignItems:'flex-start'}}>
                  <span style={{fontSize:'1.3rem',flexShrink:0,marginTop:1}}>{s.icon||'🔹'}</span>
                  <div>
                    <div style={{fontWeight:800,color:G.dark,fontSize:'0.92rem',marginBottom:3}}>{s.title}</div>
                    <div style={{color:'#5a3e28',fontSize:'0.87rem',lineHeight:1.55}}>{s.detail}</div>
                  </div>
                </div>
              ))}
            </>
          )}

          {result.bandage_needed && result.bandage_instructions && (
            <div style={{background:'#fffbea',borderLeft:'4px solid #d4a017',borderRadius:'0 10px 10px 0',
              padding:'12px 15px',marginTop:12,display:'flex',gap:12}}>
              <span style={{fontSize:'1.3rem',flexShrink:0}}>🩹</span>
              <div>
                <div style={{fontWeight:800,color:G.dark,fontSize:'0.92rem',marginBottom:3}}>How to Apply a Bandage</div>
                <div style={{color:'#5a3e28',fontSize:'0.87rem',lineHeight:1.55}}>{result.bandage_instructions}</div>
              </div>
            </div>
          )}

          {result.medicine_advice && (
            <div style={{background:'#eaf7f0',borderLeft:'4px solid #2d7a4f',borderRadius:'0 10px 10px 0',
              padding:'12px 15px',marginTop:10,display:'flex',gap:12}}>
              <span style={{fontSize:'1.3rem',flexShrink:0}}>💊</span>
              <div>
                <div style={{fontWeight:800,color:G.dark,fontSize:'0.92rem',marginBottom:3}}>Medicine Advice</div>
                <div style={{color:'#5a3e28',fontSize:'0.87rem',lineHeight:1.55}}>{result.medicine_advice}</div>
              </div>
            </div>
          )}

          {result.vet_needed && (
            <div style={{background:'linear-gradient(135deg,#c0392b,#e74c3c)',borderRadius:14,
              padding:'16px 20px',marginTop:16,display:'flex',gap:14,alignItems:'center'}}>
              <div style={{fontSize:'2.2rem',flexShrink:0}}>🏥</div>
              <div>
                <div style={{color:'#fff',fontWeight:800,fontSize:'1rem',marginBottom:4}}>
                  Vet Required — {result.vet_urgency}
                </div>
                <div style={{color:'rgba(255,255,255,.9)',fontSize:'0.87rem'}}>
                  Call PawHaven emergency: <strong>+92-348-4522665</strong>
                </div>
              </div>
            </div>
          )}

          {!result.vet_needed && (
            <div style={{background:'#eaf7f0',borderRadius:12,padding:'12px 16px',marginTop:12,
              display:'flex',gap:10,alignItems:'center'}}>
              <span style={{fontSize:'1.2rem'}}>✅</span>
              <div style={{color:'#155724',fontSize:'0.87rem',fontWeight:700}}>
                Vet visit: {result.vet_urgency || 'Not urgent'}
              </div>
            </div>
          )}

          <div style={{marginTop:18,background:`linear-gradient(135deg,${G.brown},${G.orange})`,
            borderRadius:12,padding:'14px 18px',color:'#fff',fontSize:'0.9rem',lineHeight:1.65}}>
            💛 <em>{result.encouragement}</em>
          </div>

          <button onClick={reset}
            style={{width:'100%',background:'#f5e8d0',color:G.brown,border:'none',
              padding:'13px',borderRadius:50,fontWeight:700,cursor:'pointer',marginTop:18,fontSize:'0.95rem'}}>
            📸 Scan Another Animal
          </button>
        </div>
      )}

      <p style={{color:'#a07040',fontSize:'0.78rem',textAlign:'center',marginTop:14,lineHeight:1.6}}>
        ⚠️ AI guide for reference only — not a certified vet. For emergencies, consult a veterinarian.
      </p>
    </div>
  );
}
 
// ═══════════════════════════════════════════════════════════════════════════════
// PAGE 5 — AWARENESS
// ═══════════════════════════════════════════════════════════════════════════════
function AwarenessPage({showToast}){
  const [activeTab,setActiveTab]=useState('firstaid');
  const tabs=[
    {id:'firstaid',label:'🩺 First Aid Tips'},
    {id:'care',label:'🐾 Animal Care'},
    {id:'rescue',label:'🚨 How to Help'},
    {id:'scanner',label:'🔬 AI Scanner'},
  ];
  const firstaid=[
    {icon:'🩸',title:'For Bleeding Animals',steps:["Stay calm — don't panic",'Gently restrain the animal','Apply clean cloth and gentle pressure','Do NOT remove embedded objects','Get to a vet immediately']},
    {icon:'🦴',title:'Suspected Fracture',steps:['Do not move unnecessarily','Support the injured limb gently','Use a flat surface as stretcher','Keep warm and quiet','Call emergency vet']},
    {icon:'🌡️',title:'Heatstroke',steps:['Move to shade/cool area','Apply cool water to body','Offer small sips of water','Fan gently','Seek vet care immediately']},
    {icon:'🐕',title:'Hit by Vehicle',steps:['Approach slowly and calmly','Do not muzzle if breathing issues','Slide onto flat board carefully','Keep head slightly elevated','Rush to nearest emergency vet']},
  ];
  const care=[
    {icon:'💧',title:'Hydration',desc:"Always ensure fresh clean water. Animals dehydrate fast in Pakistan's summer heat."},
    {icon:'🥩',title:'Nutrition',desc:'Feed balanced meals. Avoid onions, grapes, chocolate — toxic to dogs and cats.'},
    {icon:'🏃',title:'Exercise',desc:'Dogs need daily walks. Indoor cats benefit from 20-30 mins play daily.'},
    {icon:'🩺',title:'Regular Vet Visits',desc:'Annual checkups protect against rabies, parvovirus, and common diseases.'},
    {icon:'🛁',title:'Grooming',desc:'Regular brushing prevents matting. Check ears weekly for infection signs.'},
    {icon:'❤️',title:'Love & Socialization',desc:'Animals need daily interaction. Lonely animals develop anxiety and behavioral problems.'},
  ];
  const rescue=[
    {step:'1',title:'Stay Calm',desc:'Approach slowly. Speak softly. Sudden movements scare injured animals.'},
    {step:'2',title:'Assess Safety',desc:'Check for traffic and hazards before approaching. Your safety comes first.'},
    {step:'3',title:'Call PawHaven',desc:'Call +92-300-PAWHAVEN or use our emergency report button.'},
    {step:'4',title:'Contain the Animal',desc:'Use a box or towel to contain small animals. For large dogs, use a leash if safe.'},
    {step:'5',title:'Keep Warm',desc:'Cover with a light cloth to reduce shock. Avoid excessive handling.'},
    {step:'6',title:'Do Not Feed',desc:'Do not give food or water to injured animals — can interfere with treatment.'},
  ];
  return(
    <div style={{padding:'60px 20px',background:G.cream,minHeight:'100vh'}}>
      <div style={{maxWidth:1000,margin:'0 auto'}}>
        <div style={{textAlign:'center',marginBottom:44}}>
          <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(2rem,5vw,2.8rem)',color:G.brown}}>Awareness Hub</h1>
          <div style={{width:60,height:4,background:G.orange,borderRadius:2,margin:'12px auto 16px'}}/>
          <p style={{color:'#7a5c3a',fontSize:'1.05rem',maxWidth:520,margin:'0 auto'}}>Knowledge saves lives.</p>
        </div>
        <div style={{display:'flex',justifyContent:'center',gap:8,marginBottom:36,flexWrap:'wrap'}}>
          {tabs.map(t=>(
            <button key={t.id} onClick={()=>setActiveTab(t.id)}
              style={{background:activeTab===t.id?G.brown:'#fff',color:activeTab===t.id?'#fff':G.brown,
                border:`2px solid ${activeTab===t.id?G.brown:'#e0c9a8'}`,
                padding:'9px 18px',borderRadius:50,fontWeight:700,cursor:'pointer',fontSize:'0.88rem'}}>
              {t.label}
            </button>
          ))}
        </div>
        {activeTab==='firstaid'&&(
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:18}}>
            {firstaid.map(f=>(
              <div key={f.title} style={{background:'#fff',borderRadius:18,padding:24,boxShadow:'0 4px 20px rgba(92,51,23,.08)'}}>
                <div style={{fontSize:'2.2rem',marginBottom:12}}>{f.icon}</div>
                <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:'1.15rem',color:G.brown,marginBottom:12}}>{f.title}</h3>
                <ol style={{paddingLeft:18,color:'#7a5c3a',fontSize:'0.9rem',lineHeight:2}}>
                  {f.steps.map((s,i)=><li key={i}>{s}</li>)}
                </ol>
              </div>
            ))}
          </div>
        )}
        {activeTab==='care'&&(
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:18}}>
            {care.map(c=>(
              <div key={c.title} style={{background:'#fff',borderRadius:18,padding:24,boxShadow:'0 4px 20px rgba(92,51,23,.08)'}}>
                <div style={{fontSize:'2.2rem',marginBottom:12}}>{c.icon}</div>
                <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:'1.15rem',color:G.brown,marginBottom:10}}>{c.title}</h3>
                <p style={{color:'#7a5c3a',fontSize:'0.9rem',lineHeight:1.7}}>{c.desc}</p>
              </div>
            ))}
          </div>
        )}
        {activeTab==='rescue'&&(
          <div style={{display:'flex',flexDirection:'column',gap:14}}>
            {rescue.map(r=>(
              <div key={r.step} style={{background:'#fff',borderRadius:16,padding:22,display:'flex',gap:18,alignItems:'flex-start',boxShadow:'0 4px 16px rgba(92,51,23,.08)'}}>
                <div style={{width:46,height:46,background:`linear-gradient(135deg,${G.orange},${G.orangeLt})`,
                  borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',
                  color:'#fff',fontWeight:900,fontSize:'1.2rem',flexShrink:0}}>{r.step}</div>
                <div>
                  <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:'1.15rem',color:G.brown,marginBottom:5}}>{r.title}</h3>
                  <p style={{color:'#7a5c3a',fontSize:'0.92rem',lineHeight:1.6}}>{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        {activeTab==='scanner'&&<AIAnimalScanner showToast={showToast}/>}
      </div>
    </div>
  );
}
 
// ═══════════════════════════════════════════════════════════════════════════════
// PAGE 6 — VOLUNTEER
// ═══════════════════════════════════════════════════════════════════════════════
function VolunteerPage({showToast}){
  const [form,setForm]=useState({name:'',email:'',phone:'',city:'',role:'',experience:'',availability:''});
  const [done,setDone]=useState(false);
  const roles=[
    {icon:'🚑',title:'Rescue Responder',desc:'Be first on scene for emergency rescues.'},
    {icon:'🏠',title:'Foster Parent',desc:'Provide temporary home for rescued animals.'},
    {icon:'📱',title:'Social Media Volunteer',desc:'Help spread awareness online.'},
    {icon:'🩺',title:'Vet Assistant',desc:'Support our medical team (vet students welcome).'},
    {icon:'🚗',title:'Transport Volunteer',desc:'Drive rescued animals to vets or shelters.'},
    {icon:'📚',title:'Awareness Educator',desc:'Visit schools to spread animal welfare education.'},
  ];
  const inp={width:'100%',padding:'12px 16px',borderRadius:12,border:'1.5px solid #e0c9a8',fontSize:'0.93rem',background:'#fff',outline:'none',fontFamily:"'Nunito',sans-serif"};
  const lbl={display:'block',fontWeight:700,color:G.brown,marginBottom:6,fontSize:'0.9rem'};

  const submit=()=>{
    if(!form.name||!form.email||!form.role){showToast('Please fill required fields!','error');return;}
    showToast('🤝 Welcome to the PawHaven team!');
    setDone(true);
  };

  if(done) return(
    <div style={{minHeight:'80vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:20,padding:40,textAlign:'center'}}>
      <div style={{fontSize:'5rem'}}>🤝</div>
      <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'2rem',color:G.brown}}>Welcome, {form.name}!</h2>
      <p style={{color:'#7a5c3a',maxWidth:440}}>You're now part of PawHaven's rescue family. We'll reach out within 48 hours.</p>
      <button onClick={()=>setDone(false)} style={{background:G.orange,color:'#fff',border:'none',padding:'13px 32px',borderRadius:50,fontWeight:700,cursor:'pointer'}}>Back</button>
    </div>
  );

  return(
    <div style={{padding:'60px 20px',background:G.cream,minHeight:'100vh'}}>
      <div style={{maxWidth:1100,margin:'0 auto'}}>
        <div style={{textAlign:'center',marginBottom:48}}>
          <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(2rem,5vw,2.8rem)',color:G.brown}}>Join the Rescue Team</h1>
          <div style={{width:60,height:4,background:G.orange,borderRadius:2,margin:'12px auto 16px'}}/>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:18,marginBottom:48}}>
          {roles.map(r=>(
            <div key={r.title} style={{background:'#fff',borderRadius:18,padding:22,boxShadow:'0 4px 16px rgba(92,51,23,.08)'}}>
              <div style={{fontSize:'2.2rem',marginBottom:10}}>{r.icon}</div>
              <h3 style={{fontFamily:"'Playfair Display',serif",color:G.brown,fontSize:'1.1rem',marginBottom:8}}>{r.title}</h3>
              <p style={{color:'#7a5c3a',fontSize:'0.88rem',lineHeight:1.6}}>{r.desc}</p>
            </div>
          ))}
        </div>
        <div style={{background:G.brown,borderRadius:24,padding:'36px 28px',color:'#fff',maxWidth:720,margin:'0 auto'}}>
          <h2 style={{fontFamily:"'Playfair Display',serif",color:G.tan,fontSize:'1.9rem',marginBottom:24,textAlign:'center'}}>Volunteer Registration</h2>
          <div className="vol-2">
            {[['Full Name *','text','name','Your name'],['Email *','email','email','your@email.com'],['Phone','tel','phone','+92 300 0000000'],['City','text','city','Lahore, Karachi...']].map(([l,t,k,ph])=>(
              <div key={k}>
                <label style={{...lbl,color:G.tan}}>{l}</label>
                <input type={t} value={form[k]} onChange={e=>setForm({...form,[k]:e.target.value})}
                  placeholder={ph} style={{...inp,background:'rgba(255,255,255,.1)',border:'1.5px solid rgba(255,255,255,.2)',color:'#fff'}}/>
              </div>
            ))}
          </div>
          <div style={{marginBottom:14}}>
            <label style={{...lbl,color:G.tan}}>Preferred Role *</label>
            <select value={form.role} onChange={e=>setForm({...form,role:e.target.value})}
              style={{...inp,background:'rgba(255,255,255,.1)',border:'1.5px solid rgba(255,255,255,.2)',color:form.role?'#fff':'#c8a87a'}}>
              <option value="">Choose a role...</option>
              {roles.map(r=><option key={r.title} value={r.title}>{r.icon} {r.title}</option>)}
            </select>
          </div>
          <div style={{marginBottom:22}}>
            <label style={{...lbl,color:G.tan}}>Experience with Animals</label>
            <textarea value={form.experience} onChange={e=>setForm({...form,experience:e.target.value})}
              rows={3} placeholder="Any previous experience..." style={{...inp,background:'rgba(255,255,255,.1)',border:'1.5px solid rgba(255,255,255,.2)',color:'#fff',resize:'none'}}/>
          </div>
          <button onClick={submit}
            style={{width:'100%',background:G.orange,color:'#fff',border:'none',padding:'15px',
              borderRadius:50,fontWeight:800,fontSize:'1.05rem',cursor:'pointer'}}>
            🤝 Join PawHaven Rescue Team
          </button>
        </div>
      </div>
    </div>
  );
}
 
// ═══════════════════════════════════════════════════════════════════════════════
// PAGE 7 — CONTACT
// ═══════════════════════════════════════════════════════════════════════════════
function ContactPage({showToast}){
  const [tab,setTab]=useState('contact');
  const [cf,setCf]=useState({name:'',email:'',phone:'',msg:''});
  const [vf,setVf]=useState({petName:'',petType:'',ownerName:'',email:'',phone:'',date:'',time:'',issue:''});
  const inp={width:'100%',padding:'12px 16px',borderRadius:12,border:'1.5px solid #e0c9a8',fontSize:'0.93rem',background:'#fff',outline:'none',fontFamily:"'Nunito',sans-serif"};
  const lbl={display:'block',fontWeight:700,color:G.brown,marginBottom:6,fontSize:'0.9rem'};

  const submitContact=()=>{
    if(!cf.name||!cf.email||!cf.msg){showToast('Please fill all required fields!','error');return;}
    showToast('💌 Message sent successfully!');
    setCf({name:'',email:'',phone:'',msg:''});
  };

  const submitVet=()=>{
    if(!vf.petName||!vf.ownerName||!vf.email||!vf.date){showToast('Please fill required fields!','error');return;}
    showToast(`🩺 Vet appointment booked for ${vf.petName} on ${vf.date}!`);
    setVf({petName:'',petType:'',ownerName:'',email:'',phone:'',date:'',time:'',issue:''});
  };

  return(
    <div style={{padding:'60px 20px',background:G.cream,minHeight:'100vh'}}>
      <div style={{maxWidth:1100,margin:'0 auto'}}>
        <div style={{textAlign:'center',marginBottom:44}}>
          <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(2rem,5vw,2.8rem)',color:G.brown}}>Contact & Vet Booking</h1>
          <div style={{width:60,height:4,background:G.orange,borderRadius:2,margin:'12px auto 16px'}}/>
        </div>
        <div style={{display:'flex',justifyContent:'center',gap:10,marginBottom:36,flexWrap:'wrap'}}>
          {[['contact','📞 Contact Us'],['vet','🩺 Book Vet Appointment']].map(([v,l])=>(
            <button key={v} onClick={()=>setTab(v)}
              style={{background:tab===v?G.orange:'#fff',color:tab===v?'#fff':G.brown,
                border:`2px solid ${tab===v?G.orange:'#e0c9a8'}`,
                padding:'11px 24px',borderRadius:50,fontWeight:700,cursor:'pointer',fontSize:'0.95rem'}}>
              {l}
            </button>
          ))}
        </div>
 
        {tab==='contact'&&(
          <div className="contact-grid">
            <div style={{background:G.brown,borderRadius:20,padding:28}}>
              <h3 style={{fontFamily:"'Playfair Display',serif",color:G.tan,fontSize:'1.35rem',marginBottom:22}}>Get in Touch</h3>
              {[['📍','Address','Pakistan'],['📞','Emergency','+92-348-4522665'],['✉️','Email','laibaak0327@gmail.com'],['🕐','Hours','Mon–Sat 9am–7pm | Emergency 24/7']].map(([icon,title,val])=>(
                <div key={title} style={{display:'flex',gap:14,marginBottom:18}}>
                  <div style={{width:42,height:42,background:G.orange,borderRadius:12,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.05rem',flexShrink:0}}>{icon}</div>
                  <div>
                    <div style={{color:G.tan,fontWeight:700,fontSize:'0.85rem'}}>{title}</div>
                    <div style={{color:'#c8a87a',fontSize:'0.88rem',marginTop:2}}>{val}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{background:'#fff',borderRadius:20,padding:'28px 24px',boxShadow:'0 4px 24px rgba(92,51,23,.1)'}}>
              <h3 style={{fontFamily:"'Playfair Display',serif",color:G.brown,fontSize:'1.45rem',marginBottom:22}}>Send Us a Message</h3>
              {[['Full Name *','text','name','Your name'],['Email *','email','email','your@email.com'],['Phone','tel','phone','+92 300 0000000']].map(([l,t,k,ph])=>(
                <div key={k} style={{marginBottom:14}}>
                  <label style={lbl}>{l}</label>
                  <input type={t} value={cf[k]} onChange={e=>setCf({...cf,[k]:e.target.value})} placeholder={ph} style={inp}/>
                </div>
              ))}
              <div style={{marginBottom:18}}>
                <label style={lbl}>Message *</label>
                <textarea value={cf.msg} onChange={e=>setCf({...cf,msg:e.target.value})} rows={5}
                  placeholder="How can we help?" style={{...inp,resize:'none'}}/>
              </div>
              <button onClick={submitContact}
                style={{width:'100%',background:G.orange,color:'#fff',border:'none',
                  padding:'14px',borderRadius:50,fontWeight:700,fontSize:'1rem',cursor:'pointer'}}>
                Send Message 💌
              </button>
            </div>
          </div>
        )}
 
        {tab==='vet'&&(
          <div style={{maxWidth:700,margin:'0 auto'}}>
            <div style={{background:`linear-gradient(135deg,${G.green},#1a5c35)`,borderRadius:20,padding:28,color:'#fff',marginBottom:24,textAlign:'center'}}>
              <div style={{fontSize:'3rem',marginBottom:12}}>🩺</div>
              <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:'1.9rem',marginBottom:8}}>Online Vet Consultation</h2>
              <p style={{opacity:.85}}>Book with our certified veterinarians.</p>
            </div>
            <div style={{background:'#fff',borderRadius:20,padding:'28px 24px',boxShadow:'0 4px 24px rgba(92,51,23,.1)'}}>
              <div className="vet-2">
                <div><label style={lbl}>Pet Name *</label><input value={vf.petName} onChange={e=>setVf({...vf,petName:e.target.value})} placeholder="e.g. Buddy" style={inp}/></div>
                <div>
                  <label style={lbl}>Pet Type</label>
                  <select value={vf.petType} onChange={e=>setVf({...vf,petType:e.target.value})} style={inp}>
                    <option value="">Select...</option>
                    <option>Dog</option><option>Cat</option><option>Bird</option><option>Rabbit</option><option>Other</option>
                  </select>
                </div>
                <div><label style={lbl}>Your Name *</label><input value={vf.ownerName} onChange={e=>setVf({...vf,ownerName:e.target.value})} placeholder="Owner name" style={inp}/></div>
                <div><label style={lbl}>Email *</label><input type="email" value={vf.email} onChange={e=>setVf({...vf,email:e.target.value})} placeholder="your@email.com" style={inp}/></div>
                <div><label style={lbl}>Date *</label><input type="date" value={vf.date} onChange={e=>setVf({...vf,date:e.target.value})} style={inp}/></div>
                <div>
                  <label style={lbl}>Preferred Time</label>
                  <select value={vf.time} onChange={e=>setVf({...vf,time:e.target.value})} style={inp}>
                    <option value="">Select time...</option>
                    {['9:00 AM','10:00 AM','11:00 AM','2:00 PM','3:00 PM','4:00 PM'].map(t=><option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div style={{marginBottom:22}}>
                <label style={lbl}>Describe the Issue</label>
                <textarea value={vf.issue} onChange={e=>setVf({...vf,issue:e.target.value})} rows={4}
                  placeholder="Describe your pet's symptoms..." style={{...inp,resize:'none'}}/>
              </div>
              <button onClick={submitVet}
                style={{width:'100%',background:`linear-gradient(135deg,${G.green},#1a5c35)`,
                  color:'#fff',border:'none',padding:'15px',borderRadius:50,
                  fontWeight:800,fontSize:'1.05rem',cursor:'pointer'}}>
                🩺 Book Vet Appointment
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
 
// ─── FOOTER ──────────────────────────────────────────────────────────────────
function Footer({setPage}){
  return(
    <footer style={{background:G.dark,color:'#a07040',padding:'48px 20px 24px'}}>
      <div style={{maxWidth:1100,margin:'0 auto'}}>
        <div className="footer-grid">
          <div>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:'1.6rem',color:G.tan,marginBottom:12}}>
              🐾 Paw<span style={{color:G.orangeLt}}>Haven</span>
            </div>
            <p style={{fontSize:'0.9rem',lineHeight:1.7,maxWidth:320}}>Pakistan's dedicated animal rescue, adoption, and awareness platform.</p>
          </div>
          <div>
            <div style={{color:G.tan,fontWeight:800,marginBottom:14,fontSize:'0.88rem',letterSpacing:1,textTransform:'uppercase'}}>Quick Links</div>
            {PAGES.map(p=>(
              <div key={p} style={{marginBottom:8}}>
                <button onClick={()=>{setPage(p);window.scrollTo(0,0);}}
                  style={{background:'none',border:'none',color:'#a07040',cursor:'pointer',fontSize:'0.88rem',padding:0}}>
                  {PAGE_LABELS[p]}
                </button>
              </div>
            ))}
          </div>
          <div>
            <div style={{color:G.tan,fontWeight:800,marginBottom:14,fontSize:'0.88rem',letterSpacing:1,textTransform:'uppercase'}}>Emergency</div>
            <div style={{background:'rgba(192,57,43,.15)',border:'1px solid rgba(192,57,43,.3)',borderRadius:12,padding:16}}>
              <div style={{color:'#e74c3c',fontWeight:800,fontSize:'0.95rem',marginBottom:4}}>🚨 24/7 Hotline</div>
              <div style={{color:'#f5a08a',fontWeight:700}}>+92-348-4522665</div>
            </div>
          </div>
        </div>
        <div style={{borderTop:'1px solid rgba(255,255,255,.08)',paddingTop:20,textAlign:'center',fontSize:'0.85rem'}}>
          Made with <span style={{color:G.orange}}>❤️</span> for animals everywhere · © 2025 PawHaven · Pakistan
        </div>
      </div>
    </footer>
  );
}
 
// ─── MAIN APP ────────────────────────────────────────────────────────────────
export default function App(){
  const [page,setPage]=useState('home');
  const [toast,setToast]=useState({show:false,msg:'',type:'success'});
  const showToast=(msg,type='success')=>{
    setToast({show:true,msg,type});
    setTimeout(()=>setToast({show:false,msg:'',type:'success'}),4500);
  };
  const pages={
    home:<HomePage setPage={setPage}/>,
    report:<ReportPage showToast={showToast}/>,
    adopt:<AdoptPage showToast={showToast}/>,
    donate:<DonatePage showToast={showToast}/>,
    awareness:<AwarenessPage showToast={showToast}/>,
    volunteer:<VolunteerPage showToast={showToast}/>,
    contact:<ContactPage showToast={showToast}/>,
  };
  return(
    <div>
      <style>{globalStyle}</style>
      <Navbar page={page} setPage={setPage}/>
      {pages[page]}
      <Footer setPage={setPage}/>
      <Toast msg={toast.msg} show={toast.show} type={toast.type}/>
    </div>
  );
}