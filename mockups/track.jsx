// OnExotic — Seguimiento de pedido (Order tracking)

const TC = {
  bg:'#0A0A0A', card:'#141414', cardAlt:'#1E1E1E',
  border:'#2A2A2A', text:'#FFFFFF', muted:'#888888',
  fire:'#B81414', silver:'#C0C0C0', silverDim:'#7a7a7a',
  ok:'#22C55E', warn:'#F59E0B',
};
const TF = {
  goth: '"Pirata One", serif',
  black:'"UnifrakturCook", serif',
  body: '"Archivo", system-ui, sans-serif',
  mono: '"JetBrains Mono", ui-monospace, monospace',
};
const T_GRAIN =
 `radial-gradient(rgba(255,255,255,0.022) 1px, transparent 1px) 0 0 / 3px 3px,
  radial-gradient(rgba(255,255,255,0.014) 1px, transparent 1px) 1px 2px / 4px 4px`;

const TI = {
  back:  () => <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M14 4l-7 7 7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/></svg>,
  share: () => <svg width="20" height="20" viewBox="0 0 22 22" fill="none"><path d="M11 3v12M6 8l5-5 5 5M4 14v4h14v-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square"/></svg>,
  bag:   () => <svg width="20" height="20" viewBox="0 0 22 22" fill="none"><path d="M4 7h14l-1 12H5L4 7z" stroke="currentColor" strokeWidth="1.4"/><path d="M8 7V5a3 3 0 1 1 6 0v2" stroke="currentColor" strokeWidth="1.4"/></svg>,
  whats: () => <svg width="18" height="18" viewBox="0 0 22 22" fill="none"><path d="M3.2 18.8l1.2-4.1A8 8 0 1 1 11 19a8 8 0 0 1-3.7-.9l-4.1 1.1.0-.4z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/><path d="M8.2 7.8c.2-.5.6-.5.9-.5h.4c.2 0 .4 0 .6.4l.7 1.6c.1.3 0 .4 0 .6l-.4.5c-.1.2-.3.3-.1.6.6 1 1.5 1.9 2.6 2.4.3.1.5 0 .6-.1l.5-.6c.2-.2.3-.2.5-.1l1.5.7c.3.1.4.2.5.4.0.5-.2 1.1-.4 1.3-.4.4-1.4.7-2 .6-.5-.1-1.2-.3-3.4-1.6-2.3-1.4-3.3-3-3.6-3.4-.3-.4-.5-1.0-.5-1.6 0-.6.4-1 .6-1.2z" fill="currentColor"/></svg>,
  copy:  () => <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><rect x="3" y="3" width="8" height="8" stroke="currentColor" strokeWidth="1.2"/><path d="M3 6V2h6" stroke="currentColor" strokeWidth="1.2"/></svg>,
  check: () => <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square"/></svg>,
  cog:   () => <svg width="14" height="14" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.3"/><path d="M9 1v2M9 15v2M1 9h2M15 9h2M3.2 3.2l1.4 1.4M13.4 13.4l1.4 1.4M3.2 14.8L4.6 13.4M13.4 4.6l1.4-1.4" stroke="currentColor" strokeWidth="1.3"/></svg>,
  truck: () => <svg width="14" height="14" viewBox="0 0 22 22" fill="none"><rect x="2" y="6" width="11" height="9" stroke="currentColor" strokeWidth="1.4"/><path d="M13 9h4l3 3v3h-7V9z" stroke="currentColor" strokeWidth="1.4"/><circle cx="6" cy="16" r="1.6" stroke="currentColor" strokeWidth="1.4"/><circle cx="16" cy="16" r="1.6" stroke="currentColor" strokeWidth="1.4"/></svg>,
  box:   () => <svg width="14" height="14" viewBox="0 0 18 18" fill="none"><path d="M3 5l6-3 6 3v8l-6 3-6-3V5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/><path d="M3 5l6 3 6-3M9 8v8" stroke="currentColor" strokeWidth="1.3"/></svg>,
  flame: () => <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><path d="M7 13c2.8 0 4.5-2 4.5-4.5 0-2-1.5-3-2.5-5C8 5 6.5 5.5 5 7c-.8.8-1.5 2-1.5 3.5C3.5 12 4.8 13 7 13z"/></svg>,
  pin:   () => <svg width="14" height="14" viewBox="0 0 22 22" fill="none"><path d="M11 19s7-7.5 7-12a7 7 0 1 0-14 0c0 4.5 7 12 7 12z" stroke="currentColor" strokeWidth="1.4"/><circle cx="11" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.4"/></svg>,
  chev:  () => <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/></svg>,
};

// ─────────────── Mini placeholder ───────────────
function TImg({ tone='a', size=58 }) {
  const tones = {
    a:'radial-gradient(120% 80% at 70% 20%, #2a1208 0%, #0e0606 55%, #050202 100%)',
    b:'radial-gradient(110% 90% at 30% 30%, #1a1a1a 0%, #0b0b0b 60%, #050505 100%)',
    c:'radial-gradient(130% 90% at 50% 100%, #3a1505 0%, #160906 55%, #060303 100%)',
  };
  return (
    <div style={{
      width:size, height:size, position:'relative', overflow:'hidden',
      background: tones[tone], border:`1px solid ${TC.border}`, flex:'0 0 auto',
    }}>
      <div style={{ position:'absolute', inset:0, backgroundImage:T_GRAIN, mixBlendMode:'overlay', opacity:.5 }}/>
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(120% 120% at 50% 50%, transparent 50%, rgba(0,0,0,0.85) 100%)' }}/>
      <div style={{
        position:'absolute', inset:'18% 28% 12% 28%',
        background:'linear-gradient(180deg, rgba(255,255,255,.04) 0%, transparent 60%), #161616',
        border:'1px solid #1a1a1a',
      }}/>
    </div>
  );
}

// ─────────────── Header sticky ───────────────
function THeader() {
  return (
    <div style={{
      position:'sticky', top:0, zIndex:30,
      background:'rgba(10,10,10,.92)',
      backdropFilter:'blur(14px) saturate(140%)',
      WebkitBackdropFilter:'blur(14px) saturate(140%)',
      borderBottom:`1px solid ${TC.border}`,
      display:'grid', gridTemplateColumns:'auto 1fr auto auto', gap:14,
      alignItems:'center', padding:'12px 16px',
    }}>
      <button style={btn0}><TI.back/></button>
      <div style={{
        fontFamily: TF.mono, fontSize:10, letterSpacing:'.24em',
        color: TC.silver, textTransform:'uppercase', textAlign:'center',
      }}>← Cuenta · pedidos</div>
      <button style={btn0}><TI.share/></button>
      <button style={btn0}><TI.bag/></button>
    </div>
  );
}
const btn0 = {
  background:'transparent', border:'none', color:'#fff',
  padding:0, display:'flex', cursor:'pointer',
};

// ─────────────── Hero status ───────────────
function StatusHero() {
  return (
    <section style={{
      position:'relative', padding:'30px 22px 26px',
      borderBottom:`1px solid ${TC.border}`,
      background:`linear-gradient(180deg, #150808 0%, ${TC.bg} 100%)`,
      overflow:'hidden',
    }}>
      <div style={{ position:'absolute', inset:0, backgroundImage:T_GRAIN, opacity:.35 }}/>
      <div style={{
        position:'absolute', left:'50%', top:-90, transform:'translateX(-50%)',
        width:320, height:320, borderRadius:'50%',
        background:'radial-gradient(circle, rgba(184,20,20,.22) 0%, transparent 65%)',
      }}/>

      <div style={{ position:'relative' }}>
        {/* eyebrow + número */}
        <div style={{
          display:'flex', justifyContent:'space-between', alignItems:'center',
          fontFamily: TF.mono, fontSize:9.5, letterSpacing:'.26em',
          color: TC.silver, textTransform:'uppercase', marginBottom:8,
        }}>
          <span style={{ display:'inline-flex', alignItems:'center', gap:8 }}>
            <span style={{ width:14, height:1, background: TC.fire }}/>
            Pedido
          </span>
          <span style={{
            display:'inline-flex', alignItems:'center', gap:6,
          }}>
            OX-04-2026-0421
            <span style={{ color: TC.fire }}><TI.copy/></span>
          </span>
        </div>

        {/* Estado activo */}
        <div style={{
          display:'inline-flex', alignItems:'center', gap:8, marginBottom:14,
          padding:'5px 9px', border:`1px solid ${TC.fire}`,
          background:'rgba(184,20,20,.08)',
        }}>
          <span style={{
            width:7, height:7, borderRadius:99, background: TC.fire,
            boxShadow:`0 0 10px ${TC.fire}`,
          }}/>
          <span style={{
            fontFamily: TF.mono, fontSize:9.5, color: TC.fire,
            letterSpacing:'.24em', textTransform:'uppercase', fontWeight:700,
          }}>En camino · paso 03 / 04</span>
        </div>

        {/* Blackletter status */}
        <h1 style={{
          margin:0, fontFamily: TF.black, fontWeight:400,
          fontSize: 64, lineHeight:.85, letterSpacing:'.005em',
        }}>
          En el<br/>camino.
        </h1>

        <p style={{
          margin:'14px 0 18px', maxWidth:280,
          fontFamily: TF.body, fontSize:13.5, lineHeight:1.55, color:'#cfcfcf',
        }}>
          Tu ofrenda salió del taller. <span style={{ color: TC.fire }}>Llega mañana.</span>
          <br/>Olva ya la tiene en Lima.
        </p>

        {/* ETA card */}
        <div style={{
          display:'grid', gridTemplateColumns:'1fr 1fr', gap:8,
          padding:'12px 14px',
          background: TC.card, border:`1px solid ${TC.border}`,
        }}>
          <div>
            <div style={{
              fontFamily: TF.mono, fontSize:9, color: TC.silver,
              letterSpacing:'.24em', textTransform:'uppercase',
            }}>Llegada estimada</div>
            <div style={{
              marginTop:4, fontFamily: TF.body, fontSize:15, fontWeight:800,
              letterSpacing:'.02em',
            }}>Mañana · 22 abr</div>
            <div style={{
              marginTop:2, fontFamily: TF.mono, fontSize:9.5, color: TC.silverDim,
              letterSpacing:'.16em',
            }}>09:00 — 18:00</div>
          </div>
          <div style={{ borderLeft:`1px solid ${TC.border}`, paddingLeft:14 }}>
            <div style={{
              fontFamily: TF.mono, fontSize:9, color: TC.silver,
              letterSpacing:'.24em', textTransform:'uppercase',
            }}>Courier</div>
            <div style={{
              marginTop:4, fontFamily: TF.body, fontSize:14, fontWeight:700,
              letterSpacing:'.02em',
            }}>Olva Courier</div>
            <a href="#" style={{
              marginTop:4, display:'inline-flex', alignItems:'center', gap:5,
              color: TC.text, textDecoration:'none',
              fontFamily: TF.mono, fontSize:9, letterSpacing:'.2em',
              textTransform:'uppercase',
              borderBottom:`1px solid ${TC.fire}`, paddingBottom:1,
            }}>Rastrear externo →</a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────── Mapa / ruta placeholder ───────────────
function RouteMap() {
  return (
    <section style={{
      position:'relative', height:200, overflow:'hidden',
      borderBottom:`1px solid ${TC.border}`,
      background:'#0a0a0a',
    }}>
      {/* "mapa" — grid sutil */}
      <div style={{
        position:'absolute', inset:0,
        backgroundImage:`
          linear-gradient(90deg, ${TC.border} 1px, transparent 1px),
          linear-gradient(0deg,  ${TC.border} 1px, transparent 1px)`,
        backgroundSize:'40px 40px',
        opacity:.4,
      }}/>
      <div style={{
        position:'absolute', inset:0,
        background:'radial-gradient(80% 80% at 60% 50%, rgba(184,20,20,.12) 0%, transparent 60%)',
      }}/>

      {/* ruta SVG */}
      <svg viewBox="0 0 400 200" preserveAspectRatio="none" style={{
        position:'absolute', inset:0, width:'100%', height:'100%',
      }}>
        <defs>
          <linearGradient id="rt" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0"  stopColor={TC.silver} stopOpacity=".55"/>
            <stop offset=".55" stopColor={TC.fire}  stopOpacity=".95"/>
            <stop offset="1"  stopColor={TC.fire}   stopOpacity=".3"/>
          </linearGradient>
        </defs>
        <path
          d="M40 150 Q120 120 180 120 T 280 100 T 360 70"
          stroke="url(#rt)" strokeWidth="2" strokeLinecap="round" fill="none"
          strokeDasharray="6 5"
        />
        {/* origen */}
        <circle cx="40"  cy="150" r="5" fill={TC.silver}/>
        <circle cx="40"  cy="150" r="9" stroke={TC.silver} strokeOpacity=".4" fill="none"/>
        {/* punto vivo */}
        <circle cx="240" cy="108" r="6" fill={TC.fire}>
          <animate attributeName="r" values="6;10;6" dur="2s" repeatCount="indefinite"/>
        </circle>
        <circle cx="240" cy="108" r="14" stroke={TC.fire} strokeOpacity=".4" fill="none">
          <animate attributeName="r" values="10;22;10" dur="2s" repeatCount="indefinite"/>
          <animate attributeName="stroke-opacity" values=".55;0;.55" dur="2s" repeatCount="indefinite"/>
        </circle>
        {/* destino */}
        <path d="M360 70 m-6 0 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0z M360 70 l0 -10" stroke={TC.fire} strokeWidth="1.5" fill="none"/>
      </svg>

      {/* labels */}
      <div style={{
        position:'absolute', left:20, top:18,
        fontFamily: TF.mono, fontSize:8.5, color: TC.silver,
        letterSpacing:'.22em', textTransform:'uppercase',
      }}>
        Gamarra · Taller
      </div>
      <div style={{
        position:'absolute', right:20, top:18,
        fontFamily: TF.mono, fontSize:8.5, color: TC.fire,
        letterSpacing:'.22em', textTransform:'uppercase', textAlign:'right',
      }}>
        Miraflores · Tú
      </div>
      <div style={{
        position:'absolute', left:'50%', bottom:14, transform:'translateX(-50%)',
        padding:'5px 10px', background:'rgba(10,10,10,.78)',
        border:`1px solid ${TC.fire}`, color: TC.fire,
        fontFamily: TF.mono, fontSize:9, letterSpacing:'.22em', textTransform:'uppercase',
        display:'inline-flex', alignItems:'center', gap:6,
      }}>
        <span style={{ width:5, height:5, borderRadius:99, background: TC.fire }}/>
        Cruzando Surquillo · 18 min
      </div>
    </section>
  );
}

// ─────────────── Stepper horizontal (resumen) ───────────────
function MiniStepper() {
  const steps = [
    { l:'Conf.',   s:'done' },
    { l:'Taller',  s:'done' },
    { l:'Envío',   s:'active' },
    { l:'Entrega', s:'pending' },
  ];
  return (
    <section style={{ padding:'22px 16px 6px', borderBottom:`1px solid ${TC.border}` }}>
      <div style={{
        position:'relative', display:'grid',
        gridTemplateColumns:'repeat(4, 1fr)', alignItems:'flex-start',
      }}>
        {/* línea base */}
        <div style={{
          position:'absolute', left:'12.5%', right:'12.5%', top:11,
          height:2, background: TC.border,
        }}/>
        {/* línea progreso */}
        <div style={{
          position:'absolute', left:'12.5%', width:'50%', top:11,
          height:2, background: `linear-gradient(90deg, ${TC.silver} 0%, ${TC.fire} 100%)`,
          boxShadow:`0 0 8px ${TC.fire}`,
        }}/>

        {steps.map((st,i)=>{
          const done = st.s==='done';
          const active = st.s==='active';
          const c = active ? TC.fire : (done ? TC.silver : TC.border);
          return (
            <div key={i} style={{
              position:'relative', display:'flex', flexDirection:'column',
              alignItems:'center', gap:8,
            }}>
              <div style={{
                width: active ? 24 : 20, height: active ? 24 : 20,
                borderRadius: '50%',
                background: TC.bg,
                border: `2px solid ${c}`,
                display:'flex', alignItems:'center', justifyContent:'center',
                color: c,
                boxShadow: active ? `0 0 12px ${TC.fire}` : 'none',
              }}>
                {done && <TI.check/>}
                {active && <span style={{ width:8, height:8, borderRadius:99, background: TC.fire }}/>}
              </div>
              <div style={{
                fontFamily: TF.mono, fontSize:9, letterSpacing:'.22em',
                color: active ? TC.text : (done ? TC.silver : TC.silverDim),
                textTransform:'uppercase', fontWeight: active ? 700 : 500,
              }}>{st.l}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ─────────────── Timeline detallado ───────────────
function StatusItem({ icon, time, title, sub, status, isLast }) {
  const c = status==='active' ? TC.fire : (status==='done' ? TC.silver : TC.silverDim);
  return (
    <div style={{
      position:'relative', padding:'4px 0 22px 36px',
    }}>
      {/* vertical line */}
      {!isLast && (
        <div style={{
          position:'absolute', left:11, top:24, bottom:0, width:1,
          background: status==='done' ? TC.silver : (status==='active' ? `linear-gradient(180deg, ${TC.fire} 0%, ${TC.border} 100%)` : TC.border),
          opacity: status==='pending' ? .4 : .7,
        }}/>
      )}

      {/* dot */}
      <div style={{
        position:'absolute', left:0, top:0,
        width:22, height:22, borderRadius:'50%',
        background: TC.bg,
        border:`2px solid ${c}`,
        display:'flex', alignItems:'center', justifyContent:'center',
        color: c,
        boxShadow: status==='active' ? `0 0 12px ${TC.fire}` : 'none',
      }}>
        {status==='done' && <TI.check/>}
        {status==='active' && (
          <span style={{
            width:7, height:7, borderRadius:99, background: TC.fire,
            animation:'oxpulse 2s infinite',
          }}/>
        )}
        {status==='pending' && <span style={{ width:4, height:4, borderRadius:99, background: TC.silverDim }}/>}
      </div>

      <div style={{
        display:'flex', justifyContent:'space-between', alignItems:'baseline',
        marginBottom:4, gap:8,
      }}>
        <div style={{
          fontFamily: TF.body, fontSize:13.5, fontWeight: status==='pending' ? 600 : 800,
          letterSpacing:'.04em', textTransform:'uppercase',
          color: status==='pending' ? TC.silver : TC.text,
        }}>
          <span style={{ display:'inline-flex', alignItems:'center', gap:8 }}>
            <span style={{ color:c, display:'inline-flex' }}>{icon}</span>
            {title}
          </span>
        </div>
        <div style={{
          fontFamily: TF.mono, fontSize:9.5,
          color: status==='active' ? TC.fire : TC.silver,
          letterSpacing:'.18em', textTransform:'uppercase',
        }}>{time}</div>
      </div>
      {sub && (
        <div style={{
          fontFamily: TF.body, fontSize:12, color:'#cfcfcf', lineHeight:1.5,
          opacity: status==='pending' ? .6 : 1,
        }}>{sub}</div>
      )}

      {/* extra info card for active */}
      {status==='active' && (
        <div style={{
          marginTop:10, padding:'10px 12px',
          background: TC.card, border:`1px solid ${TC.border}`,
          borderLeft:`2px solid ${TC.fire}`,
        }}>
          <div style={{
            display:'flex', justifyContent:'space-between',
            fontFamily: TF.mono, fontSize:9, color: TC.silver,
            letterSpacing:'.22em', textTransform:'uppercase', marginBottom:6,
          }}>
            <span>Guía Olva</span>
            <span style={{ color: TC.text }}>OL-4421-PE</span>
          </div>
          <div style={{
            display:'flex', alignItems:'center', gap:6,
            fontFamily: TF.body, fontSize:12, color:'#cfcfcf', lineHeight:1.4,
          }}>
            <span style={{ color: TC.fire, display:'inline-flex' }}><TI.pin/></span>
            Cruzando Av. República de Panamá · Surquillo
          </div>
        </div>
      )}
    </div>
  );
}

function StatusTimeline() {
  return (
    <section style={{ padding:'30px 22px 10px' }}>
      <div style={{
        fontFamily: TF.mono, fontSize:10, color: TC.silver,
        letterSpacing:'.32em', textTransform:'uppercase', marginBottom:6,
        display:'flex', alignItems:'center', gap:8,
      }}>
        <span style={{ width:14, height:1, background: TC.fire }}/>
        Línea del ritual
      </div>
      <h2 style={{
        margin:'0 0 26px', fontFamily: TF.goth, fontWeight:400,
        fontSize: 38, lineHeight:.9, letterSpacing:'.005em',
      }}>Trayectoria</h2>

      <StatusItem
        icon={<TI.check/>} status="done"
        time="19 abr · 14:32"
        title="Pedido confirmado"
        sub="Yape recibido por S/ 626. Reserva sellada en el altar."
      />
      <StatusItem
        icon={<TI.cog/>} status="done"
        time="20 abr · 09:00"
        title="En taller"
        sub="Costureras del culto bordando piezas en Gamarra. Bordado al pecho terminado."
      />
      <StatusItem
        icon={<TI.box/>} status="done"
        time="21 abr · 16:42"
        title="Empaquetado y enviado"
        sub="3 piezas selladas con cinta negra. Recogido por Olva Courier."
      />
      <StatusItem
        icon={<TI.truck/>} status="active"
        time="HOY · 11:18"
        title="En camino a ti"
        sub="Cruzando Surquillo. Última actualización hace 18 min."
      />
      <StatusItem
        icon={<TI.pin/>} status="pending"
        time="22 abr · espera"
        title="Entrega"
        sub="Av. Larco 1232, dpto 802. Recibe Jose Sosa."
        isLast
      />
    </section>
  );
}

// ─────────────── Items del pedido ───────────────
function OrderItems() {
  const items = [
    { sku:'OX-04-H01', name:'Hoodie Cruz',  size:'XL', color:'Negro ritual', qty:1, price:289, tone:'a' },
    { sku:'OX-04-T02', name:'Tee Liturgia', size:'M',  color:'Hueso',         qty:2, price:149, tone:'b' },
    { sku:'OX-04-A08', name:'Gorra Tribu',  size:'Única', color:'Negro',     qty:1, price:99,  tone:'c' },
  ];
  return (
    <section style={{
      padding:'30px 22px 10px', borderTop:`1px dashed ${TC.border}`,
    }}>
      <div style={{
        display:'flex', justifyContent:'space-between', alignItems:'baseline',
        marginBottom:14,
      }}>
        <div>
          <div style={{
            fontFamily: TF.mono, fontSize:10, color: TC.silver,
            letterSpacing:'.32em', textTransform:'uppercase', marginBottom:6,
            display:'flex', alignItems:'center', gap:8,
          }}>
            <span style={{ width:14, height:1, background: TC.fire }}/>
            En camino contigo
          </div>
          <h2 style={{
            margin:0, fontFamily: TF.goth, fontWeight:400,
            fontSize: 32, lineHeight:.95,
          }}>3 piezas</h2>
        </div>
        <a href="#" style={{
          fontFamily: TF.mono, fontSize:10, color: TC.text,
          textDecoration:'none', letterSpacing:'.22em', textTransform:'uppercase',
          borderBottom:`1px solid ${TC.fire}`, paddingBottom:2,
        }}>VER →</a>
      </div>

      <div style={{
        background: TC.card, border:`1px solid ${TC.border}`,
      }}>
        {items.map((it,i,a)=>(
          <div key={it.sku} style={{
            display:'grid', gridTemplateColumns:'62px 1fr auto', gap:12,
            padding:'12px', alignItems:'center',
            borderBottom: i<a.length-1 ? `1px solid ${TC.border}` : 'none',
          }}>
            <TImg tone={it.tone} size={58}/>
            <div style={{ minWidth:0 }}>
              <div style={{
                fontFamily: TF.body, fontSize:12.5, fontWeight:700,
                letterSpacing:'.04em', textTransform:'uppercase',
              }}>{it.name}</div>
              <div style={{
                marginTop:3, fontFamily: TF.mono, fontSize:9, color: TC.silver,
                letterSpacing:'.18em', textTransform:'uppercase',
              }}>{it.sku} · {it.size} · {it.color}</div>
            </div>
            <div style={{ textAlign:'right' }}>
              <div style={{
                fontFamily: TF.mono, fontSize:9.5, color: TC.silver,
                letterSpacing:'.16em',
              }}>×{it.qty}</div>
              <div style={{
                marginTop:2, fontFamily: TF.body, fontSize:13.5, fontWeight:700,
                letterSpacing:'.02em',
              }}>S/ {it.qty*it.price}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─────────────── Dirección + recibe + pago ───────────────
function Logistics() {
  const blocks = [
    {
      eye:'Dirección de entrega',
      title:'Casa',
      body:<>Jose Sosa<br/>Av. Larco 1232, dpto 802<br/>Miraflores, Lima · 15074</>,
      foot:'+51 945 218 304',
    },
    {
      eye:'Método de pago',
      title:'Yape',
      body:<>Confirmado el 19 abr · 14:31<br/>Token #YP-99421</>,
      foot:'S/ 626 · pagado',
    },
  ];
  return (
    <section style={{
      padding:'30px 22px 10px', borderTop:`1px dashed ${TC.border}`,
    }}>
      <div style={{ display:'grid', gridTemplateColumns:'1fr', gap:10 }}>
        {blocks.map((b,i)=>(
          <div key={i} style={{
            background: TC.card, border:`1px solid ${TC.border}`,
            padding:'14px 14px',
          }}>
            <div style={{
              display:'flex', justifyContent:'space-between', alignItems:'baseline',
              fontFamily: TF.mono, fontSize:10, color: TC.silver,
              letterSpacing:'.22em', textTransform:'uppercase', marginBottom:8,
            }}>
              <span>{b.eye}</span>
              <a href="#" style={{
                color: TC.text, textDecoration:'none',
                borderBottom:`1px solid ${TC.fire}`, paddingBottom:1,
              }}>Editar</a>
            </div>
            <div style={{
              fontFamily: TF.body, fontSize:14, fontWeight:700,
              letterSpacing:'.02em', marginBottom:4,
            }}>{b.title}</div>
            <div style={{
              fontFamily: TF.body, fontSize:12.5, color:'#cfcfcf', lineHeight:1.5,
            }}>{b.body}</div>
            <div style={{
              marginTop:10, paddingTop:10, borderTop:`1px solid ${TC.border}`,
              fontFamily: TF.mono, fontSize:9.5, color: TC.silver,
              letterSpacing:'.18em', textTransform:'uppercase',
            }}>{b.foot}</div>
          </div>
        ))}
      </div>

      {/* total mini */}
      <div style={{
        marginTop:10, padding:'14px',
        background: TC.cardAlt, border:`1px solid ${TC.border}`,
      }}>
        <div style={{
          fontFamily: TF.mono, fontSize:10, color: TC.silver,
          letterSpacing:'.22em', textTransform:'uppercase', marginBottom:8,
        }}>Recuento</div>
        {[
          ['Subtotal',     'S/ 686'],
          ['Descuento',    '− S/ 60'],
          ['Envío Olva',   'gratis'],
        ].map(([k,v],i)=>(
          <div key={k} style={{
            display:'flex', justifyContent:'space-between', padding:'4px 0',
            fontFamily: TF.body, fontSize:12,
          }}>
            <span style={{ color: TC.silver }}>{k}</span>
            <span style={{
              fontFamily: TF.mono, fontSize:12, color: TC.text,
            }}>{v}</span>
          </div>
        ))}
        <div style={{
          marginTop:8, paddingTop:10, borderTop:`1px dashed ${TC.border}`,
          display:'flex', justifyContent:'space-between', alignItems:'baseline',
        }}>
          <span style={{
            fontFamily: TF.mono, fontSize:10, color: TC.silver,
            letterSpacing:'.24em', textTransform:'uppercase',
          }}>Pagado</span>
          <span style={{
            fontFamily: TF.body, fontSize:22, fontWeight:800, letterSpacing:'.02em',
          }}>S/ 626</span>
        </div>
      </div>
    </section>
  );
}

// ─────────────── Soporte ───────────────
function HelpSection() {
  return (
    <section style={{
      padding:'30px 22px 18px', borderTop:`1px dashed ${TC.border}`,
    }}>
      <div style={{
        fontFamily: TF.mono, fontSize:10, color: TC.silver,
        letterSpacing:'.32em', textTransform:'uppercase', marginBottom:6,
        display:'flex', alignItems:'center', gap:8,
      }}>
        <span style={{ width:14, height:1, background: TC.fire }}/>
        Si algo se tuerce
      </div>
      <h3 style={{
        margin:'0 0 16px', fontFamily: TF.goth, fontWeight:400,
        fontSize: 30, lineHeight:.95,
      }}>El altar te responde.</h3>

      <a href="#" style={{
        display:'flex', alignItems:'center', justifyContent:'center', gap:10,
        padding:'14px', textDecoration:'none', color: TC.text,
        background: TC.card, border:`1px solid ${TC.border}`,
        fontFamily: TF.body, fontWeight:800, fontSize:12,
        letterSpacing:'.22em', textTransform:'uppercase',
        marginBottom:8,
      }}>
        <span style={{ color:'#25D366', display:'flex' }}><TI.whats/></span>
        Hablar por WhatsApp
        <span style={{ color: TC.silver, fontFamily: TF.mono, fontSize:10 }}>· +51 999 999</span>
      </a>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
        <button style={{
          padding:'12px', background:'transparent', border:`1px solid ${TC.border}`,
          color: TC.text, cursor:'pointer',
          fontFamily: TF.mono, fontSize:10, fontWeight:700,
          letterSpacing:'.22em', textTransform:'uppercase',
        }}>Reportar problema</button>
        <button style={{
          padding:'12px', background:'transparent', border:`1px solid ${TC.border}`,
          color: TC.silver, cursor:'pointer',
          fontFamily: TF.mono, fontSize:10, fontWeight:700,
          letterSpacing:'.22em', textTransform:'uppercase',
        }}>Pedir factura</button>
      </div>
    </section>
  );
}

// ─────────────── Footer ───────────────
function TFoot() {
  return (
    <section style={{
      padding:'40px 22px 36px', textAlign:'center',
      borderTop:`1px solid ${TC.border}`,
      background:`linear-gradient(180deg, ${TC.bg} 0%, #160707 100%)`,
      position:'relative', overflow:'hidden',
    }}>
      <div style={{ position:'absolute', inset:0, backgroundImage:T_GRAIN, opacity:.35 }}/>
      <div style={{ position:'relative' }}>
        <div style={{
          fontFamily: TF.mono, fontSize:9.5, color: TC.silver,
          letterSpacing:'.36em', textTransform:'uppercase', marginBottom: 14,
        }}>✦ Bienvenido al culto ✦</div>
        <div style={{
          fontFamily: TF.black, fontWeight:400, fontSize:54, lineHeight:.9,
        }}>OnExotic</div>
        <div style={{
          marginTop:10, fontFamily: TF.mono, fontSize:9, color: TC.silver, opacity:.6,
          letterSpacing:'.28em', textTransform:'uppercase',
        }}>OX-04-2026-0421 · Lima · PE</div>
      </div>
    </section>
  );
}

// ─────────────── Track root ───────────────
function Track() {
  return (
    <div data-screen-label="Seguimiento" style={{
      background: TC.bg, color: TC.text, fontFamily: TF.body,
      minHeight:'100%', overflowY:'auto',
    }}>
      <THeader/>
      <StatusHero/>
      <RouteMap/>
      <MiniStepper/>
      <StatusTimeline/>
      <OrderItems/>
      <Logistics/>
      <HelpSection/>
      <TFoot/>
    </div>
  );
}

window.Track = Track;
