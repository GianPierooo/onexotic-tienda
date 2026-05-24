// OnExotic — Acceso (Login / Registro) — "Entra al culto"

const AC = {
  bg:'#0A0A0A', card:'#141414', cardAlt:'#1E1E1E',
  border:'#2A2A2A', text:'#FFFFFF', muted:'#888888',
  fire:'#B81414', silver:'#C0C0C0', silverDim:'#7a7a7a',
};
const AF = {
  goth: '"Pirata One", serif',
  black:'"UnifrakturCook", serif',
  body: '"Archivo", system-ui, sans-serif',
  mono: '"JetBrains Mono", ui-monospace, monospace',
};
const A_GRAIN =
 `radial-gradient(rgba(255,255,255,0.018) 1px, transparent 1px) 0 0 / 3px 3px,
  radial-gradient(rgba(255,255,255,0.012) 1px, transparent 1px) 1px 2px / 4px 4px`;

const AI = {
  close: () => <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M5 5l12 12M17 5L5 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/></svg>,
  eye:   () => <svg width="18" height="18" viewBox="0 0 22 22" fill="none"><path d="M1 11s4-7 10-7 10 7 10 7-4 7-10 7S1 11 1 11z" stroke="currentColor" strokeWidth="1.3"/><circle cx="11" cy="11" r="3" stroke="currentColor" strokeWidth="1.3"/></svg>,
  mail:  () => <svg width="16" height="16" viewBox="0 0 22 22" fill="none"><rect x="2" y="5" width="18" height="13" stroke="currentColor" strokeWidth="1.3"/><path d="M2 6l9 7 9-7" stroke="currentColor" strokeWidth="1.3"/></svg>,
  lock:  () => <svg width="16" height="16" viewBox="0 0 22 22" fill="none"><rect x="4" y="10" width="14" height="9" stroke="currentColor" strokeWidth="1.3"/><path d="M7 10V7a4 4 0 1 1 8 0v3" stroke="currentColor" strokeWidth="1.3"/></svg>,
  user:  () => <svg width="16" height="16" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.3"/><path d="M4 19c1.5-3.5 4.2-5 7-5s5.5 1.5 7 5" stroke="currentColor" strokeWidth="1.3"/></svg>,
  phone: () => <svg width="16" height="16" viewBox="0 0 22 22" fill="none"><rect x="6" y="2" width="10" height="18" rx="2" stroke="currentColor" strokeWidth="1.3"/><circle cx="11" cy="17" r="1" fill="currentColor"/></svg>,
  whats: () => <svg width="18" height="18" viewBox="0 0 22 22" fill="none"><path d="M3.2 18.8l1.2-4.1A8 8 0 1 1 11 19a8 8 0 0 1-3.7-.9l-4.1 1.1.0-.4z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/><path d="M8.2 7.8c.2-.5.6-.5.9-.5h.4c.2 0 .4 0 .6.4l.7 1.6c.1.3 0 .4 0 .6l-.4.5c-.1.2-.3.3-.1.6.6 1 1.5 1.9 2.6 2.4.3.1.5 0 .6-.1l.5-.6c.2-.2.3-.2.5-.1l1.5.7c.3.1.4.2.5.4.0.5-.2 1.1-.4 1.3-.4.4-1.4.7-2 .6-.5-.1-1.2-.3-3.4-1.6-2.3-1.4-3.3-3-3.6-3.4-.3-.4-.5-1.0-.5-1.6 0-.6.4-1 .6-1.2z" fill="currentColor"/></svg>,
  google:() => <svg width="18" height="18" viewBox="0 0 22 22" fill="none"><path d="M20.5 11.2c0-.7-.1-1.4-.2-2H11v3.8h5.4c-.2 1.2-.9 2.3-2 3v2.5h3.3c1.9-1.8 3-4.4 3-7.3z" fill="#4285F4"/><path d="M11 20.5c2.7 0 5-.9 6.7-2.4l-3.3-2.5c-.9.6-2.1 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H2.1v2.6A10 10 0 0 0 11 20.5z" fill="#34A853"/><path d="M5.4 12.5c-.2-.6-.3-1.3-.3-2s.1-1.4.3-2V5.9H2.1A10 10 0 0 0 1 10.5c0 1.6.4 3.1 1.1 4.5l3.3-2.5z" fill="#FBBC05"/><path d="M11 4.4c1.5 0 2.8.5 3.8 1.5l2.9-2.9C15.9 1.3 13.6.5 11 .5A10 10 0 0 0 2.1 5.9l3.3 2.6c.8-2.3 3-4.1 5.6-4.1z" fill="#EA4335"/></svg>,
  apple: () => <svg width="18" height="18" viewBox="0 0 22 22" fill="none"><path d="M16.4 11.5c0-2.4 2-3.5 2.1-3.6-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.7.9-.8 0-1.9-.9-3.2-.8-1.6 0-3.2 1-4 2.4-1.7 3-.4 7.4 1.2 9.8.8 1.2 1.8 2.5 3 2.4 1.2-.0 1.7-.8 3.2-.8 1.5 0 1.9.8 3.2.8 1.3-.0 2.2-1.2 3-2.4.9-1.4 1.3-2.7 1.3-2.8-.0-.0-2.6-1-2.6-4zM14 4.4c.7-.8 1.1-1.9 1-3-.9.0-2.0.6-2.7 1.4-.6.7-1.2 1.8-1 2.9 1 .1 2.0-.5 2.7-1.3z" fill="currentColor"/></svg>,
};

// ─────────────── Header chrome ───────────────
function AuthChrome({ children }) {
  return (
    <div style={{
      position:'relative', minHeight:'100%', background: AC.bg, color: AC.text,
      fontFamily: AF.body, overflowY:'auto',
    }}>
      {/* close */}
      <button style={{
        position:'absolute', top:14, right:14, zIndex:10,
        width:36, height:36, padding:0,
        background:'transparent', border:`1px solid ${AC.border}`,
        color: AC.silver, display:'flex', alignItems:'center', justifyContent:'center',
        cursor:'pointer',
      }}><AI.close/></button>

      {/* tribal accent vertical */}
      <svg viewBox="0 0 8 800" preserveAspectRatio="none" style={{
        position:'absolute', left:0, top:0, bottom:0, width:8, height:'100%', opacity:.55,
      }}>
        <defs>
          <linearGradient id="ag1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0"  stopColor={AC.silver} stopOpacity="0"/>
            <stop offset=".5" stopColor={AC.silver} stopOpacity=".55"/>
            <stop offset="1"  stopColor={AC.fire}   stopOpacity=".7"/>
          </linearGradient>
        </defs>
        <line x1="4" y1="0" x2="4" y2="800" stroke="url(#ag1)" strokeWidth="1.5"/>
      </svg>
      <svg viewBox="0 0 8 800" preserveAspectRatio="none" style={{
        position:'absolute', right:0, top:0, bottom:0, width:8, height:'100%', opacity:.55,
        transform:'scaleY(-1)',
      }}>
        <line x1="4" y1="0" x2="4" y2="800" stroke="url(#ag1)" strokeWidth="1.5"/>
      </svg>

      {children}
    </div>
  );
}

// ─────────────── Wordmark + manifiesto ───────────────
function AuthAltar({ mode }) {
  return (
    <div style={{ padding:'46px 24px 18px', textAlign:'center', position:'relative' }}>
      {/* mini wordmark */}
      <div style={{
        fontFamily: AF.mono, fontSize:10, letterSpacing:'.5em',
        color: AC.silver, textTransform:'uppercase', marginBottom:18,
        display:'inline-flex', alignItems:'center', gap:12,
      }}>
        <span style={{ width:28, height:1, background: AC.silver, opacity:.5 }}/>
        ✦ ONEXOTIC ✦
        <span style={{ width:28, height:1, background: AC.silver, opacity:.5 }}/>
      </div>

      {/* Big blackletter */}
      <h1 style={{
        margin:0, fontFamily: AF.black, fontWeight:400,
        fontSize: 78, lineHeight:.82, letterSpacing:'.005em',
        textWrap:'pretty',
      }}>
        {mode==='login' ? <>Vuelve<br/>al culto.</> : <>Entra<br/>al culto.</>}
      </h1>

      {/* sub */}
      <p style={{
        margin:'18px auto 0', maxWidth: 290,
        fontFamily: AF.body, fontSize:13, lineHeight:1.55, color:'#cfcfcf',
      }}>
        {mode==='login'
          ? <>El altar te reconoce. <span style={{ color: AC.fire }}>Identifícate</span> y entra al drop antes que los demás.</>
          : <>40 piezas por capítulo. <span style={{ color: AC.fire }}>Los fieles entran primero.</span> Sin restock, sin clemencia.</>
        }
      </p>
    </div>
  );
}

// ─────────────── Toggle Entrar / Unirme ───────────────
function ModeToggle({ mode, onChange }) {
  const opts = [
    { id:'login',  l:'Entrar',  hint:'ya soy fiel' },
    { id:'signup', l:'Unirme',  hint:'pacto nuevo' },
  ];
  return (
    <div style={{
      margin:'10px 24px 24px',
      display:'grid', gridTemplateColumns:'1fr 1fr',
      border:`1px solid ${AC.border}`, background: AC.card,
      position:'relative',
    }}>
      {opts.map(o=>{
        const active = mode === o.id;
        return (
          <button key={o.id} onClick={()=>onChange(o.id)} style={{
            padding:'14px 8px', cursor:'pointer',
            background: active ? AC.cardAlt : 'transparent',
            border:'none',
            borderBottom: active ? `2px solid ${AC.fire}` : '2px solid transparent',
            color: active ? AC.text : AC.muted,
            display:'flex', flexDirection:'column', alignItems:'center', gap:4,
          }}>
            <span style={{
              fontFamily: AF.body, fontSize: 13, fontWeight: 800,
              letterSpacing:'.22em', textTransform:'uppercase',
            }}>{o.l}</span>
            <span style={{
              fontFamily: AF.mono, fontSize: 8.5,
              color: active ? AC.silver : AC.silverDim,
              letterSpacing:'.22em', textTransform:'uppercase',
            }}>{o.hint}</span>
          </button>
        );
      })}
    </div>
  );
}

// ─────────────── Campos ───────────────
function AField({ icon, label, type='text', value, placeholder, right, hint }) {
  return (
    <label style={{ display:'block' }}>
      <div style={{
        fontFamily: AF.mono, fontSize:9.5, color: AC.silver,
        letterSpacing:'.22em', textTransform:'uppercase', marginBottom:6,
        display:'flex', justifyContent:'space-between',
      }}>
        <span>{label}</span>
        {hint && <span style={{ color: AC.fire }}>{hint}</span>}
      </div>
      <div style={{
        display:'flex', alignItems:'center', gap:10,
        border:`1px solid ${AC.border}`, background: AC.card,
        padding:'0 14px',
      }}>
        <span style={{ color: AC.silver, display:'flex' }}>{icon}</span>
        <input
          type={type}
          defaultValue={value}
          placeholder={placeholder}
          style={{
            flex:1, background:'transparent', border:'none', outline:'none',
            padding:'15px 0', color: AC.text,
            fontFamily: AF.body, fontSize:13.5, letterSpacing:'.02em',
          }}
        />
        {right && <span style={{ color: AC.silver, display:'flex' }}>{right}</span>}
      </div>
    </label>
  );
}

// ─────────────── Fortaleza de contraseña ───────────────
function PassStrength({ level=3 }) {
  // 0..4
  const segs = [0,1,2,3];
  const tone = (i)=> {
    if (level >= 3 && i < level) return '#22C55E';
    if (level === 2 && i < level) return '#F59E0B';
    if (level === 1 && i < level) return '#EF4444';
    return AC.border;
  };
  const label = ['débil', 'tibia', 'fuerte', 'culto'][Math.min(level,4)-1] || 'vacía';
  return (
    <div style={{ marginTop:8 }}>
      <div style={{ display:'flex', gap:4 }}>
        {segs.map(i=>(
          <div key={i} style={{ flex:1, height:3, background: tone(i) }}/>
        ))}
      </div>
      <div style={{
        marginTop:6, display:'flex', justifyContent:'space-between',
        fontFamily: AF.mono, fontSize:9, letterSpacing:'.22em',
        textTransform:'uppercase',
      }}>
        <span style={{ color: AC.silver }}>fortaleza</span>
        <span style={{ color: AC.text }}>{label}</span>
      </div>
    </div>
  );
}

// ─────────────── Formulario Signup ───────────────
function SignupForm() {
  return (
    <div style={{ padding:'0 24px 16px', display:'flex', flexDirection:'column', gap:14 }}>
      <AField icon={<AI.user/>}  label="Tu nombre del culto" value="Jose Sosa"/>
      <AField icon={<AI.mail/>}  label="Correo" type="email" value="jose@onexotic.pe"/>
      <AField icon={<AI.phone/>} label="Celular · WhatsApp" value="+51 945 218 304"/>
      <div>
        <AField icon={<AI.lock/>} label="Contraseña" type="password" value="••••••••••" right={<AI.eye/>}/>
        <PassStrength level={3}/>
      </div>

      {/* checkbox términos */}
      <label style={{
        display:'flex', alignItems:'flex-start', gap:10, marginTop:4, cursor:'pointer',
      }}>
        <span style={{
          width:18, height:18, border:`1px solid ${AC.fire}`,
          background: AC.fire, color:'#fff', flex:'0 0 auto',
          display:'flex', alignItems:'center', justifyContent:'center',
          fontFamily: AF.mono, fontSize:12, fontWeight:800,
        }}>✓</span>
        <span style={{
          fontFamily: AF.body, fontSize:11.5, color:'#cfcfcf',
          letterSpacing:'.02em', lineHeight:1.55,
        }}>
          Acepto los <span style={{ color: AC.text, textDecoration:'underline' }}>términos del culto</span> y
          que me avisen de los drops por correo / WhatsApp.
        </span>
      </label>
    </div>
  );
}

// ─────────────── Formulario Login ───────────────
function LoginForm() {
  return (
    <div style={{ padding:'0 24px 16px', display:'flex', flexDirection:'column', gap:14 }}>
      <AField icon={<AI.mail/>} label="Correo del fiel" type="email" value="jose@onexotic.pe"/>
      <AField icon={<AI.lock/>} label="Contraseña" type="password" value="••••••••••" right={<AI.eye/>}
        hint={<a href="#" style={{ color: AC.fire, textDecoration:'none' }}>¿la olvidaste?</a>}/>

      <label style={{
        display:'flex', alignItems:'center', gap:10, marginTop:4, cursor:'pointer',
      }}>
        <span style={{
          width:18, height:18, border:`1px solid ${AC.border}`,
          background: AC.card,
        }}/>
        <span style={{
          fontFamily: AF.body, fontSize:12, color: '#cfcfcf', letterSpacing:'.02em',
        }}>Mantener el altar abierto en este dispositivo</span>
      </label>
    </div>
  );
}

// ─────────────── CTA principal ───────────────
function AuthCTA({ label, sub }) {
  return (
    <div style={{ padding:'14px 24px 6px' }}>
      <a href="#" style={{
        display:'flex', alignItems:'center', justifyContent:'space-between',
        padding:'18px 18px', textDecoration:'none',
        background: AC.fire, color:'#fff',
        fontFamily: AF.body, fontWeight:800, fontSize:13,
        letterSpacing:'.24em', textTransform:'uppercase',
        boxShadow:`0 0 0 1px ${AC.fire}, 0 10px 32px rgba(184,20,20,.35)`,
      }}>
        <span style={{ display:'flex', flexDirection:'column', alignItems:'flex-start', gap:2 }}>
          <span>{label}</span>
          {sub && <span style={{
            fontFamily: AF.mono, fontSize:9, fontWeight:500,
            letterSpacing:'.22em', color:'rgba(255,255,255,.7)',
          }}>{sub}</span>}
        </span>
        <span style={{ fontFamily: AF.mono, fontSize:14 }}>✦ →</span>
      </a>
    </div>
  );
}

// ─────────────── Divider ritual ───────────────
function RitualDivider({ label='o por otra vía' }) {
  return (
    <div style={{
      padding:'24px 24px 18px', display:'flex', alignItems:'center', gap:12,
    }}>
      <div style={{ flex:1, height:1, background: AC.silver, opacity:.25 }}/>
      <span style={{
        fontFamily: AF.mono, fontSize:9.5, color: AC.silver,
        letterSpacing:'.32em', textTransform:'uppercase',
      }}>{label}</span>
      <div style={{ flex:1, height:1, background: AC.silver, opacity:.25 }}/>
    </div>
  );
}

// ─────────────── Social + WhatsApp ───────────────
function AltMethods() {
  const opts = [
    { i:<AI.google/>,                                  l:'Continuar con Google' },
    { i:<span style={{ color: AC.text }}><AI.apple/></span>, l:'Continuar con Apple' },
    { i:<span style={{ color:'#25D366' }}><AI.whats/></span>, l:'Crear cuenta por WhatsApp', sub:'+51 999 999' },
  ];
  return (
    <div style={{ padding:'0 24px', display:'flex', flexDirection:'column', gap:8 }}>
      {opts.map((o,i)=>(
        <button key={i} style={{
          display:'flex', alignItems:'center', gap:12,
          padding:'14px 14px', background: AC.card,
          border:`1px solid ${AC.border}`, cursor:'pointer',
          color: AC.text,
        }}>
          <span style={{ display:'flex' }}>{o.i}</span>
          <span style={{
            flex:1, textAlign:'left',
            fontFamily: AF.body, fontSize:12.5, fontWeight:700,
            letterSpacing:'.16em', textTransform:'uppercase',
          }}>{o.l}</span>
          {o.sub && (
            <span style={{
              fontFamily: AF.mono, fontSize:10, color: AC.silver, letterSpacing:'.18em',
            }}>{o.sub}</span>
          )}
        </button>
      ))}
    </div>
  );
}

// ─────────────── Foot ritual ───────────────
function AuthFoot({ mode, onSwitch }) {
  return (
    <div style={{ padding:'28px 24px 36px', textAlign:'center' }}>
      {/* mini glyph */}
      <div style={{
        margin:'0 auto 14px', width:38, height:38,
        border:`1px solid ${AC.silver}`, opacity:.7,
        display:'flex', alignItems:'center', justifyContent:'center',
        color: AC.silver,
      }}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 2v16M2 10h16M10 6l-3 4 3 4 3-4-3-4z" stroke="currentColor" strokeWidth="1"/>
        </svg>
      </div>

      <div style={{
        fontFamily: AF.mono, fontSize:10, color: AC.silver,
        letterSpacing:'.22em', textTransform:'uppercase', marginBottom:8,
      }}>
        {mode==='login' ? '¿aún no juras?' : '¿ya juraste antes?'}
      </div>
      <button onClick={onSwitch} style={{
        background:'transparent', border:'none', color: AC.text,
        cursor:'pointer', padding:0,
        fontFamily: AF.goth, fontSize: 28, lineHeight: 1,
        textDecoration:`underline 1px ${AC.fire}`,
        textUnderlineOffset:6,
      }}>
        {mode==='login' ? 'Únete al culto →' : 'Entrar al altar →'}
      </button>

      <div style={{
        marginTop: 28, fontFamily: AF.mono, fontSize:9, color: AC.silver, opacity:.55,
        letterSpacing:'.24em', textTransform:'uppercase',
      }}>
        © 2026 ONEXOTIC · LIMA · PE
      </div>
    </div>
  );
}

// ─────────────── Auth root ───────────────
function Auth() {
  const [mode, setMode] = React.useState('signup');

  return (
    <AuthChrome>
      <AuthAltar mode={mode}/>
      <ModeToggle mode={mode} onChange={setMode}/>
      {mode === 'signup' ? <SignupForm/> : <LoginForm/>}
      <AuthCTA
        label={mode==='signup' ? 'Sellar pacto' : 'Entrar al altar'}
        sub={mode==='signup' ? '+10% en tu primer ritual' : 'la puerta se abre para ti'}
      />
      <RitualDivider/>
      <AltMethods/>
      <AuthFoot mode={mode} onSwitch={()=>setMode(mode==='login' ? 'signup' : 'login')}/>
    </AuthChrome>
  );
}

window.Auth = Auth;
