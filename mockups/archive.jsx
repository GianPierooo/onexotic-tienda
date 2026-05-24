// OnExotic — Archivo de drops · "Capítulos cerrados"

const RC = {
  bg:'#0A0A0A', card:'#141414', cardAlt:'#1E1E1E',
  border:'#2A2A2A', text:'#FFFFFF', muted:'#888888',
  fire:'#B81414', silver:'#C0C0C0', silverDim:'#7a7a7a',
};
const RF = {
  goth: '"Pirata One", serif',
  black:'"UnifrakturCook", serif',
  body: '"Archivo", system-ui, sans-serif',
  mono: '"JetBrains Mono", ui-monospace, monospace',
};
const R_GRAIN =
 `radial-gradient(rgba(255,255,255,0.022) 1px, transparent 1px) 0 0 / 3px 3px,
  radial-gradient(rgba(255,255,255,0.014) 1px, transparent 1px) 1px 2px / 4px 4px`;

const RI = {
  back:  () => <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M14 4l-7 7 7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/></svg>,
  share: () => <svg width="20" height="20" viewBox="0 0 22 22" fill="none"><path d="M11 3v12M6 8l5-5 5 5M4 14v4h14v-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square"/></svg>,
  bag:   () => <svg width="20" height="20" viewBox="0 0 22 22" fill="none"><path d="M4 7h14l-1 12H5L4 7z" stroke="currentColor" strokeWidth="1.4"/><path d="M8 7V5a3 3 0 1 1 6 0v2" stroke="currentColor" strokeWidth="1.4"/></svg>,
  search:() => <svg width="20" height="20" viewBox="0 0 22 22" fill="none"><circle cx="10" cy="10" r="6" stroke="currentColor" strokeWidth="1.4"/><path d="M15 15l4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square"/></svg>,
  flame: () => <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><path d="M7 13c2.8 0 4.5-2 4.5-4.5 0-2-1.5-3-2.5-5C8 5 6.5 5.5 5 7c-.8.8-1.5 2-1.5 3.5C3.5 12 4.8 13 7 13z"/></svg>,
  cross: () => <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M5.5 1v9M1 5.5h9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square"/></svg>,
  chev:  () => <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/></svg>,
  // tabs
  home:  () => <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M3 10l8-6 8 6v9H3v-9z" stroke="currentColor" strokeWidth="1.4"/></svg>,
  grid:  () => <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="3" y="3" width="7" height="7" stroke="currentColor" strokeWidth="1.4"/><rect x="12" y="3" width="7" height="7" stroke="currentColor" strokeWidth="1.4"/><rect x="3" y="12" width="7" height="7" stroke="currentColor" strokeWidth="1.4"/><rect x="12" y="12" width="7" height="7" stroke="currentColor" strokeWidth="1.4"/></svg>,
  user:  () => <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.4"/><path d="M4 19c1.5-3.5 4.2-5 7-5s5.5 1.5 7 5" stroke="currentColor" strokeWidth="1.4"/></svg>,
  bagT:  () => <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M4 7h14l-1 12H5L4 7z" stroke="currentColor" strokeWidth="1.4"/><path d="M8 7V5a3 3 0 1 1 6 0v2" stroke="currentColor" strokeWidth="1.4"/></svg>,
};

// ─────────────── Placeholder editorial ───────────────
function RImg({ tone='a', label, alignH='center', children, style }) {
  const tones = {
    a:'radial-gradient(120% 80% at 70% 20%, #2a1208 0%, #0e0606 55%, #050202 100%)',
    b:'radial-gradient(110% 90% at 30% 30%, #1a1a1a 0%, #0b0b0b 60%, #050505 100%)',
    c:'radial-gradient(130% 90% at 50% 100%, #3a1505 0%, #160906 55%, #060303 100%)',
    d:'linear-gradient(160deg, #1c1c1c 0%, #0a0a0a 60%, #060606 100%)',
    e:'radial-gradient(80% 100% at 50% 20%, #221008 0%, #0a0606 55%, #030101 100%)',
    f:'radial-gradient(140% 90% at 20% 80%, #220e08 0%, #0c0606 55%, #050303 100%)',
    g:'linear-gradient(200deg, #161616 0%, #0a0a0a 50%, #050202 100%)',
  };
  return (
    <div style={{ position:'relative', overflow:'hidden', background: tones[tone], ...style }}>
      <div style={{ position:'absolute', inset:0, backgroundImage:R_GRAIN, mixBlendMode:'overlay', opacity:.55 }}/>
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(120% 120% at 50% 50%, transparent 50%, rgba(0,0,0,.9) 100%)' }}/>
      <div style={{
        position:'absolute',
        left: alignH==='left' ? '14%' : alignH==='right' ? '50%' : '30%',
        right: alignH==='right' ? '14%' : undefined,
        top:'10%', bottom:'6%',
        background:'linear-gradient(180deg, rgba(255,255,255,.05) 0%, transparent 60%), linear-gradient(180deg, #161616 0%, #0a0a0a 100%)',
        border:'1px solid #1a1a1a',
        width: alignH==='center' ? '40%' : '36%',
      }}/>
      {label && (
        <div style={{
          position:'absolute', top:10, left:10, zIndex:2,
          fontFamily: RF.mono, fontSize:9, letterSpacing:'.24em',
          color: RC.silver, opacity:.75, textTransform:'uppercase',
        }}>◦ {label}</div>
      )}
      {children}
    </div>
  );
}

// ─────────────── Header sticky ───────────────
function RHeader() {
  return (
    <div style={{
      position:'sticky', top:0, zIndex:30,
      background:'rgba(10,10,10,.92)',
      backdropFilter:'blur(14px) saturate(140%)',
      WebkitBackdropFilter:'blur(14px) saturate(140%)',
      borderBottom:`1px solid ${RC.border}`,
      display:'grid', gridTemplateColumns:'auto 1fr auto auto', gap:14,
      alignItems:'center', padding:'12px 16px',
    }}>
      <button style={btn0}><RI.back/></button>
      <div style={{
        fontFamily: RF.mono, fontSize:10, letterSpacing:'.32em',
        color: RC.silver, textTransform:'uppercase', textAlign:'center',
      }}>Archivo del culto</div>
      <button style={btn0}><RI.search/></button>
      <button style={btn0}><RI.bag/></button>
    </div>
  );
}
const btn0 = {
  background:'transparent', border:'none', color:'#fff',
  padding:0, display:'flex', cursor:'pointer',
};

// ─────────────── Hero del archivo ───────────────
function RHero() {
  return (
    <section style={{
      position:'relative', padding:'40px 22px 30px',
      borderBottom:`1px solid ${RC.border}`,
      background:`linear-gradient(180deg, #0e0606 0%, ${RC.bg} 100%)`,
      overflow:'hidden',
    }}>
      <div style={{ position:'absolute', inset:0, backgroundImage:R_GRAIN, opacity:.4 }}/>
      {/* Sello circular detrás */}
      <svg viewBox="0 0 400 400" style={{
        position:'absolute', left:'50%', top:50, transform:'translateX(-50%)',
        width:340, height:340, opacity:.4,
      }}>
        <circle cx="200" cy="200" r="180" stroke={RC.silver} strokeWidth=".6" fill="none"/>
        <circle cx="200" cy="200" r="150" stroke={RC.silver} strokeWidth=".4" fill="none" strokeDasharray="3 5"/>
        <circle cx="200" cy="200" r="120" stroke={RC.fire}   strokeWidth=".6" fill="none"/>
      </svg>

      <div style={{ position:'relative' }}>
        <div style={{
          fontFamily: RF.mono, fontSize:9.5, color: RC.silver,
          letterSpacing:'.36em', textTransform:'uppercase', marginBottom:12,
          display:'inline-flex', alignItems:'center', gap:10,
        }}>
          <span style={{ width:18, height:1, background: RC.silver, opacity:.6 }}/>
          ✦ MMXXVI ✦
          <span style={{ width:18, height:1, background: RC.silver, opacity:.6 }}/>
        </div>

        <h1 style={{
          margin:0, fontFamily: RF.black, fontWeight:400,
          fontSize: 88, lineHeight:.82, letterSpacing:'.005em',
        }}>Archivo.</h1>

        <p style={{
          margin:'16px 0 22px', maxWidth:300,
          fontFamily: RF.body, fontSize:13.5, lineHeight:1.55, color:'#cfcfcf',
        }}>
          Los capítulos cerrados del culto.
          <br/><span style={{ color: RC.fire }}>No vuelven.</span> Pero quedan grabados.
        </p>

        {/* Stats row */}
        <div style={{
          display:'grid', gridTemplateColumns:'1fr 1fr 1fr',
          background: RC.card, border:`1px solid ${RC.border}`,
        }}>
          {[
            ['III', 'Capítulos cerrados'],
            ['140', 'Piezas vendidas'],
            ['00',  'Restocks'],
          ].map(([n,l],i,a)=>(
            <div key={l} style={{
              padding:'14px 8px', textAlign:'center',
              borderRight: i<a.length-1 ? `1px solid ${RC.border}` : 'none',
            }}>
              <div style={{
                fontFamily: RF.goth, fontWeight:400, fontSize:28, lineHeight:1,
                color: i===2 ? RC.fire : RC.text, letterSpacing:'.04em',
              }}>{n}</div>
              <div style={{
                marginTop:6, fontFamily: RF.mono, fontSize:8.5,
                color: RC.silver, letterSpacing:'.22em', textTransform:'uppercase',
              }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────── Vivo strip (drop activo) ───────────────
function LiveStrip() {
  return (
    <a href="#" style={{
      display:'block', textDecoration:'none', color: RC.text,
      borderBottom:`1px solid ${RC.border}`,
      background:`linear-gradient(90deg, rgba(184,20,20,.15) 0%, transparent 70%)`,
    }}>
      <div style={{
        padding:'16px 22px',
        display:'flex', alignItems:'center', justifyContent:'space-between', gap:14,
      }}>
        <div>
          <div style={{
            fontFamily: RF.mono, fontSize:9, color: RC.fire,
            letterSpacing:'.32em', textTransform:'uppercase', marginBottom:4,
            display:'flex', alignItems:'center', gap:8,
          }}>
            <span style={{
              width:7, height:7, borderRadius:99, background: RC.fire,
              boxShadow:`0 0 10px ${RC.fire}`,
              animation:'oxpulse 2s infinite',
            }}/>
            Drop 04 vivo · cierre 02d 14h
          </div>
          <div style={{
            fontFamily: RF.goth, fontWeight:400, fontSize:30, lineHeight:1,
            letterSpacing:'.005em',
          }}>Venganza</div>
        </div>
        <div style={{
          padding:'10px 14px', background: RC.fire, color:'#fff',
          fontFamily: RF.mono, fontSize:10, fontWeight:800,
          letterSpacing:'.24em', textTransform:'uppercase',
          display:'inline-flex', alignItems:'center', gap:8,
        }}>
          Entrar <RI.chev/>
        </div>
      </div>
    </a>
  );
}

// ─────────────── Filter chips ───────────────
function ArchiveFilter() {
  const opts = [
    { l:'Todos',   n:3, active:true },
    { l:'2026',    n:1 },
    { l:'2025',    n:2 },
    { l:'Por sold out', n:1 },
  ];
  return (
    <div style={{
      padding:'18px 16px 14px',
      borderBottom:`1px solid ${RC.border}`,
      display:'flex', gap:6, overflowX:'auto',
    }} className="ox-scroll">
      {opts.map((o,i)=>(
        <button key={i} style={{
          flex:'0 0 auto', display:'inline-flex', alignItems:'center', gap:6,
          padding:'9px 12px',
          background: o.active ? RC.text : 'transparent',
          color: o.active ? RC.bg : RC.text,
          border:`1px solid ${o.active ? RC.text : RC.border}`,
          fontFamily: RF.mono, fontSize:10, fontWeight:700,
          letterSpacing:'.2em', textTransform:'uppercase', cursor:'pointer',
        }}>
          {o.l}
          <span style={{
            opacity: o.active ? 1 : .7,
            color: o.active ? RC.bg : RC.silver,
          }}>· {String(o.n).padStart(2,'0')}</span>
        </button>
      ))}
    </div>
  );
}

// ─────────────── Sello CERRADO ───────────────
function ClosedSeal({ date, color='silver' }) {
  const c = color==='red' ? RC.fire : RC.silver;
  return (
    <div style={{
      display:'inline-flex', alignItems:'center', gap:8,
      padding:'6px 10px',
      border:`1px solid ${c}`,
      fontFamily: RF.mono, fontSize:9, fontWeight:800,
      letterSpacing:'.32em', color: c,
      textTransform:'uppercase',
      position:'relative',
    }}>
      <span style={{ width:5, height:5, borderRadius:99, background: c }}/>
      Cerrado · {date}
    </div>
  );
}

// ─────────────── Card de drop archivado ───────────────
function ArchiveCard({ no, name, subtitle, range, pieces, soldHrs, quote, tone, alignH, badge }) {
  return (
    <article style={{
      borderTop:`1px dashed ${RC.border}`,
      paddingBottom: 18,
    }}>
      {/* IMAGEN editorial */}
      <div style={{ position:'relative' }}>
        <RImg
          tone={tone} alignH={alignH} label={`Capítulo ${no}`}
          style={{ height: 380, borderBottom:`1px solid ${RC.border}` }}
        >
          {/* Número gigante en marca de agua */}
          <div style={{
            position:'absolute', right:18, bottom:14, zIndex:2,
            fontFamily: RF.black, fontWeight:400,
            fontSize: 140, lineHeight:.85, color: 'transparent',
            WebkitTextStroke:`1px ${RC.silver}`,
            opacity:.4, pointerEvents:'none',
          }}>{no}</div>

          {/* X (cancelado / cerrado) */}
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{
            position:'absolute', inset:0, width:'100%', height:'100%',
            opacity:.10, pointerEvents:'none',
          }}>
            <line x1="6" y1="6" x2="94" y2="94" stroke={RC.silver} strokeWidth=".5"/>
            <line x1="94" y1="6" x2="6" y2="94" stroke={RC.silver} strokeWidth=".5"/>
          </svg>

          {/* Sello CERRADO arriba a la derecha */}
          <div style={{ position:'absolute', top:14, right:14 }}>
            <ClosedSeal date={range.end}/>
          </div>

          {/* Bottom: nombre */}
          <div style={{
            position:'absolute', left:18, bottom:18, right:140, zIndex:2,
          }}>
            <div style={{
              fontFamily: RF.mono, fontSize:9.5, letterSpacing:'.32em',
              color: RC.silver, textTransform:'uppercase', marginBottom:6,
            }}>{subtitle}</div>
            <div style={{
              fontFamily: RF.black, fontWeight:400, fontSize:46, lineHeight:.85,
              color: RC.text, letterSpacing:'.005em',
              textShadow:'0 4px 24px rgba(0,0,0,.6)',
            }}>{name}</div>
          </div>
        </RImg>
      </div>

      {/* Stats + quote */}
      <div style={{ padding:'16px 22px 0' }}>
        <div style={{
          display:'flex', justifyContent:'space-between', alignItems:'flex-start',
          gap:14, marginBottom:14,
        }}>
          <div>
            <div style={{
              fontFamily: RF.mono, fontSize:9, color: RC.silver,
              letterSpacing:'.24em', textTransform:'uppercase',
            }}>{range.start} — {range.end}</div>
            <div style={{
              marginTop:4, fontFamily: RF.mono, fontSize:9,
              color: RC.silverDim, letterSpacing:'.18em', textTransform:'uppercase',
            }}>OX-0{no}-{range.year}</div>
          </div>
          {badge && (
            <div style={{
              padding:'3px 7px', border:`1px solid ${RC.fire}`, color: RC.fire,
              fontFamily: RF.mono, fontSize:8.5, fontWeight:800,
              letterSpacing:'.22em', textTransform:'uppercase',
            }}>{badge}</div>
          )}
        </div>

        {/* Quote */}
        {quote && (
          <blockquote style={{
            margin:'0 0 14px', padding:'10px 0 0',
            borderTop:`1px solid ${RC.silver}`,
            fontFamily: RF.goth, fontWeight:400, fontSize:22, lineHeight:1.1,
            color: RC.text, letterSpacing:'.005em', textWrap:'pretty',
          }}>
            "{quote}"
          </blockquote>
        )}

        {/* Stats grid */}
        <div style={{
          display:'grid', gridTemplateColumns:'1fr 1fr 1fr',
          border:`1px solid ${RC.border}`, background: RC.card, marginTop:6,
        }}>
          {[
            ['Piezas', pieces, RC.text],
            ['Sold out', soldHrs, RC.fire],
            ['Restock', '00', RC.silver],
          ].map(([k,v,c],i,a)=>(
            <div key={k} style={{
              padding:'12px 8px', textAlign:'center',
              borderRight: i<a.length-1 ? `1px solid ${RC.border}` : 'none',
            }}>
              <div style={{
                fontFamily: RF.mono, fontSize:14, fontWeight:700,
                color: c, letterSpacing:'.04em',
              }}>{v}</div>
              <div style={{
                marginTop:4, fontFamily: RF.mono, fontSize:8.5,
                color: RC.silver, letterSpacing:'.22em', textTransform:'uppercase',
              }}>{k}</div>
            </div>
          ))}
        </div>

        {/* Acciones */}
        <div style={{
          marginTop:14, display:'grid', gridTemplateColumns:'1fr 1fr', gap:8,
        }}>
          <a href="#" style={{
            display:'flex', alignItems:'center', justifyContent:'center', gap:8,
            padding:'12px', textDecoration:'none', color: RC.text,
            border:`1px solid ${RC.border}`, background: RC.card,
            fontFamily: RF.mono, fontSize:10, fontWeight:800,
            letterSpacing:'.22em', textTransform:'uppercase',
          }}>Ver lookbook</a>
          <a href="#" style={{
            display:'flex', alignItems:'center', justifyContent:'center', gap:8,
            padding:'12px', textDecoration:'none', color: RC.silver,
            border:`1px solid ${RC.border}`,
            fontFamily: RF.mono, fontSize:10, fontWeight:800,
            letterSpacing:'.22em', textTransform:'uppercase',
          }}>Galería · piezas</a>
        </div>
      </div>
    </article>
  );
}

function ArchiveList() {
  return (
    <section>
      <ArchiveCard
        no="03" tone="c" alignH="right"
        name="Sangre nueva"
        subtitle="Capítulo III · invierno"
        range={{ start:'15 FEB', end:'17 FEB 2026', year:'2026' }}
        pieces="60" soldHrs="2 horas"
        quote="No nos parimos solos. Nos heredan."
        badge="Récord · 2h"
      />
      <ArchiveCard
        no="02" tone="a" alignH="left"
        name="Ofrenda"
        subtitle="Capítulo II · primavera"
        range={{ start:'04 DIC', end:'04 DIC 2025', year:'2025' }}
        pieces="40" soldHrs="4 horas"
        quote="Trajimos lo que no se devuelve."
      />
      <ArchiveCard
        no="01" tone="e" alignH="center"
        name="Origen"
        subtitle="Capítulo I · primer fuego"
        range={{ start:'18 OCT', end:'19 OCT 2025', year:'2025' }}
        pieces="40" soldHrs="6 horas"
        quote="Nadie sabía que esto iba a ser una iglesia."
        badge="Génesis"
      />
    </section>
  );
}

// ─────────────── Próximo capítulo ───────────────
function NextChapter() {
  return (
    <section style={{
      padding:'56px 22px 40px', textAlign:'center',
      borderTop:`1px solid ${RC.border}`,
      background:`linear-gradient(180deg, ${RC.bg} 0%, #160707 100%)`,
      position:'relative', overflow:'hidden',
    }}>
      <div style={{ position:'absolute', inset:0, backgroundImage:R_GRAIN, opacity:.35 }}/>
      <div style={{
        position:'absolute', left:'50%', bottom:-100, transform:'translateX(-50%)',
        width:360, height:360, borderRadius:'50%',
        background:'radial-gradient(circle, rgba(184,20,20,.25) 0%, transparent 65%)',
      }}/>
      <div style={{ position:'relative' }}>
        <div style={{
          fontFamily: RF.mono, fontSize:9.5, color: RC.silver,
          letterSpacing:'.36em', textTransform:'uppercase', marginBottom:10,
        }}>
          ✦ Próximo capítulo
        </div>
        <div style={{
          fontFamily: RF.mono, fontSize:10, color: RC.fire,
          letterSpacing:'.32em', textTransform:'uppercase', marginBottom:14,
        }}>05 / JUNIO 2026</div>

        <h2 style={{
          margin:0, fontFamily: RF.black, fontWeight:400,
          fontSize: 60, lineHeight:.85, letterSpacing:'.005em',
        }}>
          Penitencia
        </h2>

        <p style={{
          margin:'18px auto 22px', maxWidth:280,
          fontFamily: RF.body, fontSize:13, lineHeight:1.55, color:'#cfcfcf',
        }}>
          80 piezas. Acceso temprano para los fieles del archivo.
          <br/><span style={{ color: RC.fire }}>Los demás esperan su turno.</span>
        </p>

        <a href="#" style={{
          display:'inline-flex', alignItems:'center', gap:12,
          padding:'14px 22px', textDecoration:'none',
          background:'transparent', color: RC.text,
          border:`1px solid ${RC.silver}`,
          fontFamily: RF.body, fontWeight:800, fontSize:12,
          letterSpacing:'.28em', textTransform:'uppercase',
        }}>
          Reservar acceso ✦
        </a>
      </div>
    </section>
  );
}

// ─────────────── Footer ───────────────
function RFoot() {
  return (
    <section style={{
      padding:'40px 22px 28px', textAlign:'center',
      borderTop:`1px solid ${RC.border}`,
    }}>
      <div style={{
        fontFamily: RF.mono, fontSize:9, color: RC.silver, opacity:.7,
        letterSpacing:'.36em', textTransform:'uppercase', marginBottom:12,
      }}>
        ✦ Lo cerrado no vuelve ✦
      </div>
      <div style={{
        fontFamily: RF.black, fontWeight:400, fontSize:52, lineHeight:.95,
      }}>OnExotic</div>
      <div style={{
        marginTop:10,
        fontFamily: RF.mono, fontSize:9, color: RC.silver, opacity:.55,
        letterSpacing:'.28em', textTransform:'uppercase',
      }}>© 2026 · Archivo SS26 · Lima</div>
    </section>
  );
}

// ─────────────── Tab bar (Drop activo) ───────────────
function RTabBar() {
  const tabs = [
    { i:<RI.home/>,  l:'Inicio' },
    { i:<RI.grid/>,  l:'Catálogo' },
    { i:<RI.flame/>, l:'Drop', accent:true, active:true },
    { i:<RI.user/>,  l:'Cuenta' },
    { i:<RI.bagT/>,  l:'Bolsa', badge:2 },
  ];
  return (
    <div style={{
      position:'sticky', bottom:0, zIndex:10,
      background:'rgba(10,10,10,0.92)',
      backdropFilter:'blur(16px) saturate(160%)',
      borderTop:`1px solid ${RC.border}`,
      display:'grid', gridTemplateColumns:'repeat(5,1fr)',
      padding:'10px 4px 16px',
    }}>
      {tabs.map((t,i)=>(
        <button key={i} style={{
          background:'transparent', border:'none',
          display:'flex', flexDirection:'column', alignItems:'center', gap:4,
          color: t.active ? RC.text : RC.silver,
          padding:'6px 0', position:'relative',
        }}>
          <div style={{
            color: t.accent ? RC.fire : 'inherit',
            display:'flex', alignItems:'center', justifyContent:'center',
            width: t.accent ? 32 : 26, height: t.accent ? 32 : 26,
          }}>{t.i}</div>
          {t.badge && (
            <div style={{
              position:'absolute', top:2, right:'calc(50% - 18px)',
              minWidth:14, height:14, padding:'0 3px', borderRadius:8,
              background: RC.fire, color:'#fff',
              fontFamily: RF.mono, fontSize:9, fontWeight:700,
              display:'flex', alignItems:'center', justifyContent:'center',
            }}>{t.badge}</div>
          )}
          <div style={{
            fontFamily: RF.mono, fontSize:8, letterSpacing:'.18em', textTransform:'uppercase',
          }}>{t.l}</div>
          {t.active && (
            <div style={{
              position:'absolute', top:0, width:18, height:2, background: RC.fire,
            }}/>
          )}
        </button>
      ))}
    </div>
  );
}

// ─────────────── Archivo root ───────────────
function Archive() {
  return (
    <div data-screen-label="Archivo" style={{
      background: RC.bg, color: RC.text, fontFamily: RF.body,
      minHeight:'100%', overflowY:'auto',
    }}>
      <RHeader/>
      <RHero/>
      <LiveStrip/>
      <ArchiveFilter/>
      <ArchiveList/>
      <NextChapter/>
      <RFoot/>
      <RTabBar/>
    </div>
  );
}

window.Archive = Archive;
