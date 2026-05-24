// OnExotic — Cuenta (Account · mobile)

const NC = {
  bg:'#0A0A0A', card:'#141414', cardAlt:'#1E1E1E',
  border:'#2A2A2A', text:'#FFFFFF', muted:'#888888',
  fire:'#B81414', silver:'#C0C0C0', silverDim:'#7a7a7a',
  ok:'#22C55E', warn:'#F59E0B', err:'#EF4444',
};
const NF = {
  goth: '"Pirata One", serif',
  black:'"UnifrakturCook", serif',
  body: '"Archivo", system-ui, sans-serif',
  mono: '"JetBrains Mono", ui-monospace, monospace',
};
const N_GRAIN =
 `radial-gradient(rgba(255,255,255,0.018) 1px, transparent 1px) 0 0 / 3px 3px,
  radial-gradient(rgba(255,255,255,0.012) 1px, transparent 1px) 1px 2px / 4px 4px`;

const NI = {
  back:    () => <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M14 4l-7 7 7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/></svg>,
  cog:     () => <svg width="20" height="20" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="3" stroke="currentColor" strokeWidth="1.3"/><path d="M11 1v3M11 18v3M1 11h3M18 11h3M3.9 3.9l2.1 2.1M16 16l2.1 2.1M3.9 18.1L6 16M16 6l2.1-2.1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="square"/></svg>,
  bell:    () => <svg width="20" height="20" viewBox="0 0 22 22" fill="none"><path d="M5 16V10a6 6 0 0 1 12 0v6l1 2H4l1-2zM9 19a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg>,
  flame:   () => <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor"><path d="M7 13c2.8 0 4.5-2 4.5-4.5 0-2-1.5-3-2.5-5C8 5 6.5 5.5 5 7c-.8.8-1.5 2-1.5 3.5C3.5 12 4.8 13 7 13z"/></svg>,
  heart:   () => <svg width="16" height="16" viewBox="0 0 22 22" fill="none"><path d="M11 18s-7-4.2-7-9a4 4 0 0 1 7-2.6A4 4 0 0 1 18 9c0 4.8-7 9-7 9z" stroke="currentColor" strokeWidth="1.4"/></svg>,
  map:     () => <svg width="16" height="16" viewBox="0 0 22 22" fill="none"><path d="M11 19s7-7.5 7-12a7 7 0 1 0-14 0c0 4.5 7 12 7 12z" stroke="currentColor" strokeWidth="1.4"/><circle cx="11" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.4"/></svg>,
  card:    () => <svg width="16" height="16" viewBox="0 0 22 22" fill="none"><rect x="2" y="5" width="18" height="13" stroke="currentColor" strokeWidth="1.4"/><path d="M2 9h18" stroke="currentColor" strokeWidth="1.4"/></svg>,
  chev:    () => <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/></svg>,
  edit:    () => <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M11 2l3 3-9 9H2v-3l9-9z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/></svg>,
  trash:   () => <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 4h10M6 4V3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1M4.5 4l1 9h5l1-9" stroke="currentColor" strokeWidth="1.3"/></svg>,
  plus:    () => <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3v8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square"/></svg>,
  truck:   () => <svg width="14" height="14" viewBox="0 0 22 22" fill="none"><rect x="2" y="6" width="11" height="9" stroke="currentColor" strokeWidth="1.4"/><path d="M13 9h4l3 3v3h-7V9z" stroke="currentColor" strokeWidth="1.4"/><circle cx="6" cy="16" r="1.6" stroke="currentColor" strokeWidth="1.4"/><circle cx="16" cy="16" r="1.6" stroke="currentColor" strokeWidth="1.4"/></svg>,
  // tabs
  home:  () => <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M3 10l8-6 8 6v9H3v-9z" stroke="currentColor" strokeWidth="1.4"/></svg>,
  grid:  () => <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="3" y="3" width="7" height="7" stroke="currentColor" strokeWidth="1.4"/><rect x="12" y="3" width="7" height="7" stroke="currentColor" strokeWidth="1.4"/><rect x="3" y="12" width="7" height="7" stroke="currentColor" strokeWidth="1.4"/><rect x="12" y="12" width="7" height="7" stroke="currentColor" strokeWidth="1.4"/></svg>,
  user:  () => <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.4"/><path d="M4 19c1.5-3.5 4.2-5 7-5s5.5 1.5 7 5" stroke="currentColor" strokeWidth="1.4"/></svg>,
  bag:   () => <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M4 7h14l-1 12H5L4 7z" stroke="currentColor" strokeWidth="1.4"/><path d="M8 7V5a3 3 0 1 1 6 0v2" stroke="currentColor" strokeWidth="1.4"/></svg>,
};

// ─────────────── Mini placeholder ───────────────
function NImg({ tone='a', size=44, label }) {
  const tones = {
    a:'radial-gradient(120% 80% at 70% 20%, #2a1208 0%, #0e0606 55%, #050202 100%)',
    b:'radial-gradient(110% 90% at 30% 30%, #1a1a1a 0%, #0b0b0b 60%, #050505 100%)',
    c:'radial-gradient(130% 90% at 50% 100%, #3a1505 0%, #160906 55%, #060303 100%)',
    d:'linear-gradient(160deg, #1c1c1c 0%, #0a0a0a 60%, #060606 100%)',
    e:'radial-gradient(80% 100% at 50% 20%, #221008 0%, #0a0606 55%, #030101 100%)',
  };
  return (
    <div style={{
      width:size, height:size, position:'relative', overflow:'hidden',
      background: tones[tone], border:`1px solid ${NC.border}`, flex:'0 0 auto',
    }}>
      <div style={{ position:'absolute', inset:0, backgroundImage:N_GRAIN, mixBlendMode:'overlay', opacity:.5 }}/>
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(120% 120% at 50% 50%, transparent 50%, rgba(0,0,0,0.85) 100%)' }}/>
      <div style={{
        position:'absolute', inset:'18% 28% 12% 28%',
        background:'linear-gradient(180deg, rgba(255,255,255,.04) 0%, transparent 60%), #161616',
        border:'1px solid #1a1a1a',
      }}/>
    </div>
  );
}

// ─────────────── Header ───────────────
function NHeader() {
  return (
    <div style={{
      position:'sticky', top:0, zIndex:20,
      background:'rgba(10,10,10,.92)',
      backdropFilter:'blur(14px) saturate(140%)',
      WebkitBackdropFilter:'blur(14px) saturate(140%)',
      borderBottom:`1px solid ${NC.border}`,
      display:'grid', gridTemplateColumns:'auto 1fr auto auto', gap:14,
      alignItems:'center', padding:'12px 16px',
    }}>
      <button style={btn0}><NI.back/></button>
      <div style={{
        fontFamily:NF.mono, fontSize:10, letterSpacing:'.28em',
        color:NC.silver, textTransform:'uppercase', textAlign:'center',
      }}>Cuenta · Fiel</div>
      <button style={btn0}><NI.bell/></button>
      <button style={btn0}><NI.cog/></button>
    </div>
  );
}
const btn0 = {
  background:'transparent', border:'none', color:'#fff',
  padding:0, display:'flex', cursor:'pointer',
};

// ─────────────── Altar (header del miembro) ───────────────
function MemberAltar() {
  return (
    <section style={{
      position:'relative', padding:'28px 20px 22px',
      borderBottom:`1px solid ${NC.border}`,
      background:`linear-gradient(180deg, #110909 0%, ${NC.bg} 100%)`,
      overflow:'hidden',
    }}>
      <div style={{ position:'absolute', inset:0, backgroundImage:N_GRAIN, opacity:.35 }}/>
      {/* glow */}
      <div style={{
        position:'absolute', left:'50%', top:-50, transform:'translateX(-50%)',
        width:280, height:280, borderRadius:'50%',
        background:'radial-gradient(circle, rgba(184,20,20,.18) 0%, transparent 70%)',
      }}/>

      <div style={{ position:'relative', display:'flex', alignItems:'center', gap:16 }}>
        {/* Avatar blackletter */}
        <div style={{
          width:84, height:84,
          border:`1px solid ${NC.silver}`,
          background: NC.card,
          display:'flex', alignItems:'center', justifyContent:'center',
          position:'relative',
        }}>
          <div style={{ position:'absolute', inset:4, border:`1px solid ${NC.border}` }}/>
          <span style={{
            fontFamily: NF.black, fontWeight:400,
            fontSize: 44, lineHeight:1, color: NC.text,
            letterSpacing:'.02em',
          }}>JS</span>
        </div>

        <div style={{ flex:1, minWidth:0 }}>
          <div style={{
            fontFamily: NF.mono, fontSize:9.5, color: NC.silver,
            letterSpacing:'.28em', textTransform:'uppercase', marginBottom:4,
            display:'flex', alignItems:'center', gap:8,
          }}>
            <span style={{ width:14, height:1, background: NC.fire }}/>
            Fiel desde Mar 2025
          </div>
          <div style={{
            fontFamily: NF.goth, fontWeight:400, fontSize: 36, lineHeight:.95,
            letterSpacing:'.005em',
          }}>Jose Sosa</div>
          <div style={{
            marginTop:6, display:'inline-flex', alignItems:'center', gap:6,
            padding:'4px 8px', border:`1px solid ${NC.fire}`,
            fontFamily: NF.mono, fontSize:9, letterSpacing:'.22em',
            color: NC.fire, textTransform:'uppercase',
          }}>
            <NI.flame/> Hermano · nivel 02
          </div>
        </div>
      </div>

      {/* Tier progress */}
      <div style={{ position:'relative', marginTop:18 }}>
        <div style={{
          display:'flex', justifyContent:'space-between',
          fontFamily: NF.mono, fontSize:9, color: NC.silver,
          letterSpacing:'.22em', textTransform:'uppercase', marginBottom:6,
        }}>
          <span>Hermano</span>
          <span>2 drops para Profeta</span>
        </div>
        <div style={{
          height:5, background: NC.card, border:`1px solid ${NC.border}`,
          position:'relative', overflow:'hidden',
        }}>
          <div style={{
            position:'absolute', left:0, top:0, bottom:0, width:'68%',
            background:`linear-gradient(90deg, ${NC.fire} 0%, #d62d2d 100%)`,
            boxShadow:`0 0 10px ${NC.fire}`,
          }}/>
        </div>
      </div>

      {/* Stats */}
      <div style={{
        marginTop:18, display:'grid', gridTemplateColumns:'1fr 1fr 1fr',
        border:`1px solid ${NC.border}`, background: NC.card, position:'relative',
      }}>
        {[
          ['Pedidos',  '07'],
          ['Ofrendado','S/ 2,148'],
          ['Capítulos','03 / 04'],
        ].map(([k,v],i,a)=>(
          <div key={k} style={{
            padding:'14px 10px', textAlign:'center',
            borderRight: i<a.length-1 ? `1px solid ${NC.border}` : 'none',
          }}>
            <div style={{
              fontFamily: NF.body, fontSize:18, fontWeight:800, color: NC.text,
              letterSpacing:'.02em',
            }}>{v}</div>
            <div style={{
              marginTop:4, fontFamily: NF.mono, fontSize:8.5,
              color: NC.silver, letterSpacing:'.22em', textTransform:'uppercase',
            }}>{k}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─────────────── Quick actions ───────────────
function QuickActions() {
  const items = [
    { i:<NI.flame/>,  l:'Drops',       sub:'04 vivo', accent:true },
    { i:<NI.heart/>,  l:'Favoritos',   sub:'12 piezas' },
    { i:<NI.map/>,    l:'Direcciones', sub:'2' },
    { i:<NI.card/>,   l:'Pagos',       sub:'Yape · Visa' },
  ];
  return (
    <div style={{
      padding:'18px 16px 6px',
      display:'grid', gridTemplateColumns:'1fr 1fr 1fr 1fr', gap:8,
    }}>
      {items.map((q,i)=>(
        <button key={i} style={{
          background: NC.card, border:`1px solid ${NC.border}`,
          padding:'12px 6px 10px', cursor:'pointer',
          display:'flex', flexDirection:'column', alignItems:'center', gap:6,
          color: NC.text,
        }}>
          <span style={{ color: q.accent ? NC.fire : NC.silver, display:'flex' }}>
            {q.i}
          </span>
          <span style={{
            fontFamily: NF.body, fontSize:10.5, fontWeight:700,
            letterSpacing:'.1em', textTransform:'uppercase',
          }}>{q.l}</span>
          <span style={{
            fontFamily: NF.mono, fontSize:8.5, color: NC.silver,
            letterSpacing:'.16em', textTransform:'uppercase',
          }}>{q.sub}</span>
        </button>
      ))}
    </div>
  );
}

// ─────────────── Section header ───────────────
function NSection({ eye, title, right, children, sub }) {
  return (
    <section style={{ padding:'26px 20px 12px' }}>
      <div style={{
        display:'flex', alignItems:'flex-end', justifyContent:'space-between',
        marginBottom:16,
      }}>
        <div>
          <div style={{
            fontFamily: NF.mono, fontSize:10, letterSpacing:'.28em',
            color: NC.silver, textTransform:'uppercase', marginBottom:6,
            display:'flex', alignItems:'center', gap:8,
          }}>
            <span style={{ width:14, height:1, background: NC.fire }}/>
            {eye}
          </div>
          <h2 style={{
            margin:0, fontFamily: NF.goth, fontWeight:400,
            fontSize: 38, lineHeight:.9, letterSpacing:'.005em',
          }}>{title}</h2>
          {sub && (
            <div style={{
              marginTop:4, fontFamily: NF.mono, fontSize:10,
              color: NC.silver, letterSpacing:'.18em', textTransform:'uppercase',
            }}>{sub}</div>
          )}
        </div>
        {right}
      </div>
      {children}
    </section>
  );
}

// ─────────────── Filter chips ───────────────
function OrderFilter() {
  const opts = [
    { l:'Todos',     n:7, active:true },
    { l:'En camino', n:1 },
    { l:'En taller', n:1 },
    { l:'Entregados',n:4 },
    { l:'Cancelados',n:1 },
  ];
  return (
    <div style={{
      display:'flex', gap:6, marginBottom:14, overflowX:'auto',
    }} className="ox-scroll">
      {opts.map((o,i)=>(
        <button key={i} style={{
          flex:'0 0 auto', display:'inline-flex', alignItems:'center', gap:6,
          padding:'8px 11px',
          background: o.active ? NC.text : 'transparent',
          color: o.active ? NC.bg : NC.text,
          border:`1px solid ${o.active ? NC.text : NC.border}`,
          fontFamily: NF.mono, fontSize:10, fontWeight:700,
          letterSpacing:'.18em', textTransform:'uppercase', cursor:'pointer',
        }}>
          {o.l}
          <span style={{
            opacity: o.active ? 1 : .7,
            color: o.active ? NC.bg : NC.silver,
          }}>· {String(o.n).padStart(2,'0')}</span>
        </button>
      ))}
    </div>
  );
}

// ─────────────── Estado helper ───────────────
function StatusDot({ status }) {
  const map = {
    Entregado: { c:NC.ok,     g:'rgba(34,197,94,.35)' },
    'En camino':{c:NC.warn,   g:'rgba(245,158,11,.35)' },
    'En taller':{c:NC.fire,   g:'rgba(184,20,20,.4)'  },
    Devuelto:  { c:NC.err,    g:'rgba(239,68,68,.35)' },
    Cancelado: { c:NC.silver, g:'rgba(192,192,192,.25)'},
  };
  const m = map[status] || map['En taller'];
  return (
    <span style={{
      display:'inline-flex', alignItems:'center', gap:6,
      fontFamily: NF.mono, fontSize:9, letterSpacing:'.22em',
      color: m.c, textTransform:'uppercase',
    }}>
      <span style={{
        width:6, height:6, borderRadius:99, background:m.c,
        boxShadow:`0 0 8px ${m.g}`,
      }}/>
      {status}
    </span>
  );
}

// ─────────────── Order card ───────────────
function OrderCard({ no, date, status, tracking, items, total, thumbs }) {
  const isLive = status === 'En camino' || status === 'En taller';
  return (
    <div style={{
      background: NC.card, border:`1px solid ${NC.border}`,
      borderLeft: isLive ? `2px solid ${NC.fire}` : `1px solid ${NC.border}`,
    }}>
      {/* Top row: SKU/no + status */}
      <div style={{
        padding:'12px 14px 10px',
        display:'flex', justifyContent:'space-between', alignItems:'center',
        borderBottom:`1px solid ${NC.border}`,
      }}>
        <div>
          <div style={{
            fontFamily: NF.mono, fontSize:10, color: NC.silver,
            letterSpacing:'.22em', textTransform:'uppercase',
          }}>{no}</div>
          <div style={{
            marginTop:2, fontFamily: NF.mono, fontSize:9,
            color: NC.silverDim, letterSpacing:'.18em', textTransform:'uppercase',
          }}>{date}</div>
        </div>
        <StatusDot status={status}/>
      </div>

      {/* Middle row: thumbs + items + total */}
      <div style={{
        padding:'14px 14px',
        display:'flex', alignItems:'center', gap:14,
      }}>
        <div style={{ display:'flex', gap:6 }}>
          {thumbs.map((t,i)=>(<NImg key={i} tone={t} size={50}/>))}
          {items > thumbs.length && (
            <div style={{
              width:50, height:50, border:`1px solid ${NC.border}`,
              background: NC.cardAlt,
              display:'flex', alignItems:'center', justifyContent:'center',
              fontFamily: NF.mono, fontSize:11, color: NC.silver, letterSpacing:'.1em',
            }}>+{items-thumbs.length}</div>
          )}
        </div>
        <div style={{ flex:1, textAlign:'right' }}>
          <div style={{
            fontFamily: NF.mono, fontSize:9, color: NC.silver,
            letterSpacing:'.22em', textTransform:'uppercase',
          }}>{items} piezas</div>
          <div style={{
            marginTop:4, fontFamily: NF.body, fontSize:17, fontWeight:800,
            letterSpacing:'.02em',
          }}>S/ {total.toLocaleString('es-PE')}</div>
        </div>
      </div>

      {/* Tracking strip (only for live orders) */}
      {tracking && (
        <div style={{
          padding:'10px 14px', borderTop:`1px solid ${NC.border}`,
          background: NC.cardAlt,
          display:'flex', alignItems:'center', gap:10,
        }}>
          <span style={{ color: NC.silver, display:'flex' }}><NI.truck/></span>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{
              fontFamily: NF.mono, fontSize:9, color: NC.silver,
              letterSpacing:'.18em', textTransform:'uppercase',
            }}>{tracking.carrier}</div>
            <div style={{
              marginTop:2, fontFamily: NF.body, fontSize:12, color: NC.text,
              letterSpacing:'.02em',
            }}>{tracking.msg}</div>
          </div>
          <span style={{
            fontFamily: NF.mono, fontSize:9.5, color: NC.text,
            letterSpacing:'.18em', textTransform:'uppercase',
            borderBottom: `1px solid ${NC.fire}`, paddingBottom:2,
          }}>Rastrear →</span>
        </div>
      )}

      {/* Bottom actions */}
      <div style={{
        padding:'10px 14px', borderTop:`1px solid ${NC.border}`,
        display:'flex', justifyContent:'space-between', alignItems:'center',
      }}>
        <span style={{
          fontFamily: NF.mono, fontSize:9, color: NC.silverDim,
          letterSpacing:'.22em', textTransform:'uppercase',
        }}>Ver detalle</span>
        <div style={{
          display:'flex', gap:14,
          fontFamily: NF.mono, fontSize:9, color: NC.silver,
          letterSpacing:'.22em', textTransform:'uppercase',
        }}>
          {status === 'Entregado' && <span>Volver a pedir →</span>}
          {status === 'En camino' && <span style={{ color: NC.fire }}>Rastrear →</span>}
          {status === 'En taller' && <span>Notas →</span>}
          {status === 'Devuelto'  && <span style={{ color: NC.err }}>Reembolso →</span>}
        </div>
      </div>
    </div>
  );
}

// ─────────────── Lista de pedidos ───────────────
function Orders() {
  const orders = [
    {
      no:'OX-04-2026-0421', date:'21 abr 2026', status:'En camino',
      items:3, total:626, thumbs:['a','b','c'],
      tracking:{ carrier:'Olva · OL-4421-PE', msg:'En camino a Miraflores · llega mañana' },
    },
    {
      no:'OX-04-2026-0398', date:'12 abr 2026', status:'En taller',
      items:2, total:478, thumbs:['e','d'],
      tracking:{ carrier:'Taller Gamarra', msg:'Bordando piezas · sale 24 abr' },
    },
    {
      no:'OX-04-2026-0357', date:'03 abr 2026', status:'Entregado',
      items:4, total:836, thumbs:['a','c','b'],
    },
    {
      no:'OX-03-2026-0211', date:'28 feb 2026', status:'Entregado',
      items:1, total:289, thumbs:['d'],
    },
    {
      no:'OX-03-2026-0099', date:'10 feb 2026', status:'Devuelto',
      items:1, total:149, thumbs:['b'],
    },
  ];
  return (
    <NSection
      eye="Tus rituales · 07 totales"
      title="Pedidos"
      sub="Capítulo 03 · 04"
      right={
        <a href="#" style={{
          color: NC.text, textDecoration:'none',
          fontFamily: NF.mono, fontSize:10, letterSpacing:'.22em',
          textTransform:'uppercase',
          borderBottom: `1px solid ${NC.fire}`, paddingBottom:2,
        }}>VER TODOS →</a>
      }
    >
      <OrderFilter/>
      <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
        {orders.map(o => <OrderCard key={o.no} {...o}/>)}
      </div>
    </NSection>
  );
}

// ─────────────── Direcciones ───────────────
function AddressCard({ label, default_, name, line1, line2, city, phone }) {
  return (
    <div style={{
      background: NC.card,
      border:`1px solid ${default_ ? NC.silver : NC.border}`,
      padding:'14px 14px',
      display:'flex', flexDirection:'column', gap:8,
      position:'relative',
    }}>
      {default_ && (
        <div style={{
          position:'absolute', top:-1, right:-1,
          padding:'3px 7px', background: NC.silver, color: NC.bg,
          fontFamily: NF.mono, fontSize:8.5, fontWeight:800,
          letterSpacing:'.22em', textTransform:'uppercase',
        }}>predeterminada</div>
      )}

      <div style={{
        display:'flex', alignItems:'center', gap:8,
        fontFamily: NF.mono, fontSize:10, color: NC.silver,
        letterSpacing:'.24em', textTransform:'uppercase',
      }}>
        <span style={{ color: NC.fire, display:'flex' }}><NI.map/></span>
        {label}
      </div>

      <div style={{
        fontFamily: NF.body, fontSize:14, color: NC.text, fontWeight:600,
        letterSpacing:'.02em',
      }}>{name}</div>

      <div style={{
        fontFamily: NF.body, fontSize:12.5, color:'#cfcfcf', lineHeight:1.55,
      }}>
        {line1}<br/>{line2}<br/>{city}
      </div>

      <div style={{
        marginTop:4, paddingTop:10, borderTop:`1px solid ${NC.border}`,
        display:'flex', justifyContent:'space-between', alignItems:'center',
      }}>
        <span style={{
          fontFamily: NF.mono, fontSize:10, color: NC.silver,
          letterSpacing:'.18em',
        }}>{phone}</span>
        <div style={{
          display:'flex', gap:14, color: NC.silver,
          fontFamily: NF.mono, fontSize:9, letterSpacing:'.22em', textTransform:'uppercase',
        }}>
          <button style={{...btn0, alignItems:'center', gap:5, color:'inherit'}}>
            <NI.edit/> Editar
          </button>
          {!default_ && (
            <button style={{...btn0, alignItems:'center', gap:5, color:'inherit'}}>
              <NI.trash/> Quitar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Addresses() {
  return (
    <NSection eye="Donde llega el ritual" title="Direcciones" sub="2 guardadas · Lima">
      <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
        <AddressCard
          label="Casa" default_
          name="Jose Sosa"
          line1="Av. Larco 1232, dpto 802"
          line2="Edificio rojo, frente al parque"
          city="Miraflores, Lima · 15074"
          phone="+51 945 218 304"
        />
        <AddressCard
          label="Trabajo"
          name="Jose Sosa · OnExotic SAC"
          line1="Av. Petit Thouars 5021"
          line2="Of. 412, recepción al lado"
          city="Lince, Lima · 15046"
          phone="+51 945 218 304"
        />

        {/* Add new */}
        <button style={{
          padding:'14px', background:'transparent',
          border:`1px dashed ${NC.silver}`, color: NC.text, cursor:'pointer',
          display:'flex', alignItems:'center', justifyContent:'center', gap:10,
          fontFamily: NF.mono, fontSize:11, fontWeight:700,
          letterSpacing:'.24em', textTransform:'uppercase',
        }}>
          <NI.plus/> Agregar dirección
        </button>
      </div>
    </NSection>
  );
}

// ─────────────── Settings rápido + logout ───────────────
function AccountMisc() {
  const rows = [
    ['Preferencias del culto', 'tallas, alertas de drop'],
    ['Métodos de pago',        'Yape predeterminado'],
    ['Privacidad',             'datos, exportar, borrar'],
    ['Soporte',                'WhatsApp · email'],
  ];
  return (
    <NSection eye="Más" title="Ajustes">
      <div style={{
        background: NC.card, border:`1px solid ${NC.border}`,
      }}>
        {rows.map(([k,v],i,a)=>(
          <button key={k} style={{
            width:'100%',
            display:'flex', alignItems:'center', justifyContent:'space-between',
            padding:'14px 14px', background:'transparent', border:'none',
            borderBottom: i<a.length-1 ? `1px solid ${NC.border}` : 'none',
            color: NC.text, cursor:'pointer', textAlign:'left',
          }}>
            <div>
              <div style={{
                fontFamily: NF.body, fontSize:13, fontWeight:700,
                letterSpacing:'.04em', textTransform:'uppercase',
              }}>{k}</div>
              <div style={{
                marginTop:3, fontFamily: NF.mono, fontSize:9.5, color: NC.silver,
                letterSpacing:'.16em',
              }}>{v}</div>
            </div>
            <span style={{ color: NC.silver, display:'flex' }}><NI.chev/></span>
          </button>
        ))}
      </div>

      {/* Cerrar sesión */}
      <button style={{
        marginTop:14, width:'100%', padding:'14px',
        background:'transparent', border:`1px solid ${NC.border}`,
        color: NC.err, cursor:'pointer',
        fontFamily: NF.body, fontSize:12, fontWeight:800,
        letterSpacing:'.28em', textTransform:'uppercase',
      }}>
        Salir del altar
      </button>

      <div style={{
        marginTop:18, textAlign:'center',
        fontFamily: NF.mono, fontSize:9, color: NC.silver, opacity:.55,
        letterSpacing:'.24em', textTransform:'uppercase',
      }}>
        OnExotic v2.6 · build 2026.04
      </div>
    </NSection>
  );
}

// ─────────────── Tab bar ───────────────
function NTabBar() {
  const tabs = [
    { i:<NI.home/>,  l:'Inicio' },
    { i:<NI.grid/>,  l:'Catálogo' },
    { i:<NI.flame/>, l:'Drop', accent:true },
    { i:<NI.user/>,  l:'Cuenta', active:true },
    { i:<NI.bag/>,   l:'Bolsa', badge:2 },
  ];
  return (
    <div style={{
      position:'sticky', bottom:0, zIndex:10,
      background:'rgba(10,10,10,0.92)',
      backdropFilter:'blur(16px) saturate(160%)',
      borderTop:`1px solid ${NC.border}`,
      display:'grid', gridTemplateColumns:'repeat(5,1fr)',
      padding:'10px 4px 16px',
    }}>
      {tabs.map((t,i)=>(
        <button key={i} style={{
          background:'transparent', border:'none',
          display:'flex', flexDirection:'column', alignItems:'center', gap:4,
          color: t.active ? NC.text : NC.silver,
          padding:'6px 0', position:'relative',
        }}>
          <div style={{
            color: t.accent ? NC.fire : 'inherit',
            display:'flex', alignItems:'center', justifyContent:'center',
            width:26, height:26,
          }}>{t.i}</div>
          {t.badge && (
            <div style={{
              position:'absolute', top:2, right:'calc(50% - 18px)',
              minWidth:14, height:14, padding:'0 3px', borderRadius:8,
              background:NC.fire, color:'#fff',
              fontFamily: NF.mono, fontSize:9, fontWeight:700,
              display:'flex', alignItems:'center', justifyContent:'center',
            }}>{t.badge}</div>
          )}
          <div style={{
            fontFamily: NF.mono, fontSize:8, letterSpacing:'.18em', textTransform:'uppercase',
          }}>{t.l}</div>
          {t.active && (
            <div style={{
              position:'absolute', top:0, width:18, height:2, background: NC.fire,
            }}/>
          )}
        </button>
      ))}
    </div>
  );
}

// ─────────────── Account root ───────────────
function Account() {
  return (
    <div data-screen-label="Cuenta" style={{
      background: NC.bg, color: NC.text, fontFamily: NF.body,
      minHeight:'100%', overflowY:'auto',
    }}>
      <NHeader/>
      <MemberAltar/>
      <QuickActions/>
      <Orders/>
      <Addresses/>
      <AccountMisc/>
      <NTabBar/>
    </div>
  );
}

window.Account = Account;
