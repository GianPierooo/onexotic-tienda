// OnExotic — Bolsa de compra (mobile)
// "Tu ofrenda" · reserva por tiempo · barra de envío gratis · acciones dobles.

const BC = {
  bg:'#0A0A0A', card:'#141414', cardAlt:'#1E1E1E',
  border:'#2A2A2A', text:'#FFFFFF', muted:'#888888',
  silver:    '#C0C0C0',
  silverDim: '#7a7a7a',
  fire:'#B81414',
};
const BF = {
  goth: '"Pirata One", serif',
  black:'"UnifrakturCook", serif',
  body: '"Archivo", system-ui, sans-serif',
  mono: '"JetBrains Mono", ui-monospace, monospace',
};
const B_GRAIN =
 `radial-gradient(rgba(255,255,255,0.018) 1px, transparent 1px) 0 0 / 3px 3px,
  radial-gradient(rgba(255,255,255,0.012) 1px, transparent 1px) 1px 2px / 4px 4px`;

// ─────────────── Iconos ───────────────
const BI = {
  close: () => <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M5 5l12 12M17 5L5 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/></svg>,
  minus: () => <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M3 7h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/></svg>,
  plus:  () => <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/></svg>,
  trash: () => <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <path d="M3 4h10M6 4V3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1M4.5 4l1 9h5l1-9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="square"/>
  </svg>,
  heart: () => <svg width="14" height="14" viewBox="0 0 22 22" fill="none"><path d="M11 18s-7-4.2-7-9a4 4 0 0 1 7-2.6A4 4 0 0 1 18 9c0 4.8-7 9-7 9z" stroke="currentColor" strokeWidth="1.4"/></svg>,
  truck: () => <svg width="16" height="16" viewBox="0 0 22 22" fill="none">
    <rect x="2" y="6" width="11" height="9" stroke="currentColor" strokeWidth="1.3"/>
    <path d="M13 9h4l3 3v3h-7V9z" stroke="currentColor" strokeWidth="1.3"/>
    <circle cx="6" cy="16" r="1.6" stroke="currentColor" strokeWidth="1.3"/>
    <circle cx="16" cy="16" r="1.6" stroke="currentColor" strokeWidth="1.3"/>
  </svg>,
  shield: () => <svg width="16" height="16" viewBox="0 0 22 22" fill="none">
    <path d="M11 2l8 3v5c0 5-3.5 9-8 10-4.5-1-8-5-8-10V5l8-3z" stroke="currentColor" strokeWidth="1.3"/>
    <path d="M8 11l2.5 2.5L15 9" stroke="currentColor" strokeWidth="1.3"/>
  </svg>,
  clock: () => <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.3"/>
    <path d="M8 4v4l3 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="square"/>
  </svg>,
  tag: () => <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <path d="M2 8V2h6l6 6-6 6-6-6z" stroke="currentColor" strokeWidth="1.3"/>
    <circle cx="5.5" cy="5.5" r="1" fill="currentColor"/>
  </svg>,
  whats: () => <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
    <path d="M3.2 18.8l1.2-4.1A8 8 0 1 1 11 19a8 8 0 0 1-3.7-.9l-4.1 1.1.0-.4z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
    <path d="M8.2 7.8c.2-.5.6-.5.9-.5h.4c.2 0 .4 0 .6.4l.7 1.6c.1.3 0 .4 0 .6l-.4.5c-.1.2-.3.3-.1.6.6 1 1.5 1.9 2.6 2.4.3.1.5 0 .6-.1l.5-.6c.2-.2.3-.2.5-.1l1.5.7c.3.1.4.2.5.4.0.5-.2 1.1-.4 1.3-.4.4-1.4.7-2 .6-.5-.1-1.2-.3-3.4-1.6-2.3-1.4-3.3-3-3.6-3.4-.3-.4-.5-1.0-.5-1.6 0-.6.4-1 .6-1.2z" fill="currentColor"/>
  </svg>,
  bag:   () => <svg width="20" height="20" viewBox="0 0 22 22" fill="none"><path d="M4 7h14l-1 12H5L4 7z" stroke="currentColor" strokeWidth="1.4"/><path d="M8 7V5a3 3 0 1 1 6 0v2" stroke="currentColor" strokeWidth="1.4"/></svg>,
  home: () => <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M3 10l8-6 8 6v9H3v-9z" stroke="currentColor" strokeWidth="1.4"/></svg>,
  grid: () => <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="3" y="3" width="7" height="7" stroke="currentColor" strokeWidth="1.4"/><rect x="12" y="3" width="7" height="7" stroke="currentColor" strokeWidth="1.4"/><rect x="3" y="12" width="7" height="7" stroke="currentColor" strokeWidth="1.4"/><rect x="12" y="12" width="7" height="7" stroke="currentColor" strokeWidth="1.4"/></svg>,
  user: () => <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.4"/><path d="M4 19c1.5-3.5 4.2-5 7-5s5.5 1.5 7 5" stroke="currentColor" strokeWidth="1.4"/></svg>,
  flame: () => <svg width="18" height="18" viewBox="0 0 14 14" fill="currentColor"><path d="M7 13c2.8 0 4.5-2 4.5-4.5 0-2-1.5-3-2.5-5C8 5 6.5 5.5 5 7c-.8.8-1.5 2-1.5 3.5C3.5 12 4.8 13 7 13z"/></svg>,
};

// ─────────────── Mini placeholder de prenda ───────────────
function BImg({ tone='a', children, style }) {
  const tones = {
    a:'radial-gradient(120% 80% at 70% 20%, #2a1208 0%, #0e0606 55%, #050202 100%)',
    b:'radial-gradient(110% 90% at 30% 30%, #1a1a1a 0%, #0b0b0b 60%, #050505 100%)',
    c:'radial-gradient(130% 90% at 50% 100%, #3a1505 0%, #160906 55%, #060303 100%)',
    d:'linear-gradient(160deg, #1c1c1c 0%, #0a0a0a 60%, #060606 100%)',
  };
  return (
    <div style={{ position:'relative', overflow:'hidden', background:tones[tone], ...style }}>
      <div style={{ position:'absolute', inset:0, backgroundImage:B_GRAIN, mixBlendMode:'overlay', opacity:.5 }}/>
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(120% 120% at 50% 50%, transparent 50%, rgba(0,0,0,0.85) 100%)' }}/>
      <div style={{
        position:'absolute', inset:'14% 22% 8% 22%',
        background:'linear-gradient(180deg, rgba(255,255,255,.04) 0%, transparent 60%), linear-gradient(180deg, #161616 0%, #0a0a0a 100%)',
        border:'1px solid #1a1a1a',
      }}/>
      {children}
    </div>
  );
}

// ─────────────── Header ───────────────
function BHeader({ count }) {
  return (
    <div style={{
      position:'sticky', top:0, zIndex:20,
      background:'rgba(10,10,10,.92)',
      backdropFilter:'blur(14px) saturate(140%)',
      WebkitBackdropFilter:'blur(14px) saturate(140%)',
      borderBottom:`1px solid ${BC.border}`,
    }}>
      {/* línea nav */}
      <div style={{
        display:'grid', gridTemplateColumns:'auto 1fr auto', gap:14,
        alignItems:'center', padding:'12px 16px',
      }}>
        <button style={btnY}><BI.close/></button>
        <div style={{
          fontFamily:BF.mono, fontSize:10, letterSpacing:'.24em',
          color:BC.silver, textTransform:'uppercase', textAlign:'center',
        }}>
          Bolsa · <span style={{ color:BC.text }}>{count} piezas</span>
        </div>
        <a href="#" style={{
          color:BC.text, textDecoration:'none',
          fontFamily:BF.mono, fontSize:10, letterSpacing:'.22em',
          textTransform:'uppercase', borderBottom:`1px solid ${BC.border}`,
          paddingBottom:2,
        }}>Limpiar</a>
      </div>

      {/* título blackletter */}
      <div style={{ padding:'4px 16px 16px' }}>
        <div style={{
          fontFamily:BF.mono, fontSize:10, letterSpacing:'.28em',
          color:BC.silver, textTransform:'uppercase',
          display:'flex', alignItems:'center', gap:8, marginBottom:6,
        }}>
          <span style={{ width:14, height:1, background:BC.fire }}/>
          Capítulo 04 · Venganza
        </div>
        <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between' }}>
          <h1 style={{
            margin:0, fontFamily:BF.black, fontWeight:400,
            fontSize: 54, lineHeight:.9, letterSpacing:'.005em',
          }}>Tu ofrenda</h1>
          <div style={{
            display:'inline-flex', alignItems:'center', gap:6,
            padding:'5px 8px', border:`1px solid ${BC.fire}`,
            fontFamily:BF.mono, fontSize:9.5, letterSpacing:'.2em',
            color:BC.fire, textTransform:'uppercase',
          }}>
            <BI.clock/> Reservado 14:23
          </div>
        </div>
      </div>
    </div>
  );
}
const btnY = {
  background:'transparent', border:'none', color:'#fff',
  padding:0, display:'flex', cursor:'pointer',
};

// ─────────────── Barra de envío gratis ───────────────
function ShipProgress({ subtotal, threshold }) {
  const remain = Math.max(0, threshold - subtotal);
  const pct = Math.min(100, (subtotal / threshold) * 100);
  const reached = remain === 0;
  return (
    <section style={{
      margin:'14px 16px 4px', padding:'14px 14px 16px',
      background: BC.card, border:`1px solid ${BC.border}`,
      borderLeft:`2px solid ${BC.fire}`,
    }}>
      <div style={{
        display:'flex', justifyContent:'space-between', alignItems:'center',
        marginBottom:10,
      }}>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <span style={{ color:BC.fire, display:'flex' }}><BI.truck/></span>
          <div style={{
            fontFamily:BF.body, fontSize:12.5, fontWeight:700,
            letterSpacing:'.04em', textTransform:'uppercase',
          }}>
            {reached ? 'Envío gratis activado' : 'Envío gratis'}
          </div>
        </div>
        <div style={{
          fontFamily:BF.mono, fontSize:10, color:BC.silver, letterSpacing:'.18em',
          textTransform:'uppercase',
        }}>Meta · S/ {threshold}</div>
      </div>

      <p style={{
        margin:'0 0 12px', fontFamily:BF.body, fontSize:12.5, color:'#cfcfcf',
        lineHeight:1.55,
      }}>
        {reached ? (
          <>El culto te recompensa. <span style={{ color:BC.fire }}>Cero costo de envío.</span></>
        ) : (
          <>Te faltan <span style={{ color:BC.fire, fontWeight:700 }}>S/ {remain}</span> para envío gratis a Lima.</>
        )}
      </p>

      {/* progreso */}
      <div style={{ position:'relative' }}>
        <div style={{
          height:6, background:BC.bg, border:`1px solid ${BC.border}`,
          position:'relative', overflow:'hidden',
        }}>
          <div style={{
            position:'absolute', left:0, top:0, bottom:0, width:`${pct}%`,
            background: `linear-gradient(90deg, ${BC.fire} 0%, #d62d2d 100%)`,
            boxShadow:`0 0 12px ${BC.fire}`,
          }}/>
        </div>
        {/* marcas */}
        <div style={{
          display:'flex', justifyContent:'space-between', marginTop:8,
          fontFamily:BF.mono, fontSize:9, color:BC.silver, letterSpacing:'.16em',
          textTransform:'uppercase',
        }}>
          <span>S/ 0</span>
          <span style={{ color: pct >= 50 ? BC.text : BC.muted }}>S/ {Math.round(subtotal)}</span>
          <span>S/ {threshold}</span>
        </div>
      </div>
    </section>
  );
}

// ─────────────── Item de bolsa ───────────────
function BagItem({ item, last }) {
  const lineTotal = item.price * item.qty;
  return (
    <div style={{
      display:'grid', gridTemplateColumns:'104px 1fr', gap:14,
      padding:'18px 16px',
      borderBottom: last ? 'none' : `1px solid ${BC.border}`,
    }}>
      {/* thumbnail */}
      <BImg tone={item.tone} style={{
        aspectRatio:'4 / 5', border:`1px solid ${BC.border}`,
      }}>
        {item.lastN && (
          <div style={{
            position:'absolute', bottom:6, left:6, right:6,
            padding:'3px 5px',
            background:'rgba(10,10,10,.82)', border:`1px solid ${BC.border}`,
            fontFamily:BF.mono, fontSize:8, letterSpacing:'.18em',
            color:BC.fire, textTransform:'uppercase', textAlign:'center',
          }}>
            ✦ {item.lastN}
          </div>
        )}
      </BImg>

      {/* info */}
      <div style={{ display:'flex', flexDirection:'column', minWidth:0 }}>
        <div style={{
          fontFamily:BF.mono, fontSize:9, letterSpacing:'.2em',
          color:BC.silver, textTransform:'uppercase',
        }}>{item.sku}</div>

        <div style={{
          fontFamily:BF.goth, fontWeight:400, fontSize:26, lineHeight:.95,
          marginTop:4, letterSpacing:'.005em',
        }}>{item.name}</div>

        {/* atributos */}
        <div style={{
          display:'flex', gap:6, flexWrap:'wrap', marginTop:10,
        }}>
          {[
            ['Talla', item.size],
            ['Color', item.color],
          ].map(([k,v],i)=>(
            <span key={i} style={{
              display:'inline-flex', alignItems:'center', gap:5,
              padding:'4px 7px', border:`1px solid ${BC.border}`,
              background:BC.cardAlt,
              fontFamily:BF.mono, fontSize:9, letterSpacing:'.16em',
              textTransform:'uppercase',
            }}>
              <span style={{ color:BC.muted }}>{k}</span>
              <span style={{ color:BC.text }}>{v}</span>
            </span>
          ))}
        </div>

        {/* footer del item */}
        <div style={{
          marginTop:'auto', paddingTop:12,
          display:'flex', justifyContent:'space-between', alignItems:'flex-end',
        }}>
          {/* stepper */}
          <div style={{
            display:'flex', alignItems:'center',
            border:`1px solid ${BC.border}`, background:BC.card, height:34,
          }}>
            <button style={qBtn}><BI.minus/></button>
            <div style={{
              width:30, textAlign:'center',
              fontFamily:BF.mono, fontSize:13, color:BC.text,
            }}>{item.qty}</div>
            <button style={qBtn}><BI.plus/></button>
          </div>

          {/* precio */}
          <div style={{ textAlign:'right' }}>
            {item.qty > 1 && (
              <div style={{
                fontFamily:BF.mono, fontSize:9, color:BC.muted,
                letterSpacing:'.16em',
              }}>{item.qty} × S/ {item.price}</div>
            )}
            <div style={{
              fontFamily:BF.body, fontSize:17, fontWeight:700,
              letterSpacing:'.02em', color:BC.text, marginTop:2,
            }}>S/ {lineTotal}</div>
          </div>
        </div>

        {/* actions row */}
        <div style={{
          marginTop:10, paddingTop:10, borderTop:`1px solid ${BC.border}`,
          display:'flex', gap:14,
          fontFamily:BF.mono, fontSize:9, letterSpacing:'.2em',
          textTransform:'uppercase',
        }}>
          <button style={{
            ...btnY, alignItems:'center', gap:6, color:BC.muted,
          }}>
            <BI.heart/> Guardar
          </button>
          <button style={{
            ...btnY, alignItems:'center', gap:6, color:BC.muted,
          }}>
            <BI.trash/> Quitar
          </button>
        </div>
      </div>
    </div>
  );
}
const qBtn = {
  width:34, height:'100%', background:'transparent', border:'none',
  color:BC.text, display:'flex', alignItems:'center', justifyContent:'center',
  cursor:'pointer',
};

// ─────────────── Lista ───────────────
function BagList({ items }) {
  return (
    <section style={{
      margin:'18px 16px 0', background:BC.card, border:`1px solid ${BC.border}`,
    }}>
      {items.map((it,i)=>(
        <BagItem key={it.sku} item={it} last={i===items.length-1}/>
      ))}
    </section>
  );
}

// ─────────────── Cupón ───────────────
function CouponRow() {
  return (
    <section style={{
      margin:'14px 16px 0',
      display:'flex', border:`1px solid ${BC.border}`, background:BC.card,
    }}>
      <div style={{
        display:'flex', alignItems:'center', gap:8, padding:'0 14px',
        color:BC.muted,
      }}>
        <BI.tag/>
      </div>
      <input
        placeholder="Código del culto"
        defaultValue="VENGANZA10"
        style={{
          flex:1, background:'transparent', border:'none', outline:'none',
          padding:'14px 0', color:BC.text,
          fontFamily:BF.mono, fontSize:12, letterSpacing:'.16em', textTransform:'uppercase',
        }}
      />
      <button style={{
        padding:'0 16px', background: BC.fire, color:'#fff',
        border:'none', fontFamily:BF.body, fontWeight:800, fontSize:11,
        letterSpacing:'.22em', textTransform:'uppercase',
        cursor:'pointer',
      }}>Aplicar</button>
    </section>
  );
}

// ─────────────── Resumen ───────────────
function Summary({ subtotal, discount, shipping }) {
  const total = subtotal - discount + shipping;
  return (
    <section style={{
      margin:'14px 16px 0', padding:'18px 16px',
      background:BC.cardAlt, border:`1px solid ${BC.border}`,
      position:'relative', overflow:'hidden',
    }}>
      <div style={{ position:'absolute', inset:0, backgroundImage:B_GRAIN, opacity:.35 }}/>
      <div style={{ position:'relative' }}>
        <div style={{
          fontFamily:BF.mono, fontSize:10, letterSpacing:'.28em',
          color:BC.silver, textTransform:'uppercase', marginBottom:14,
          display:'flex', alignItems:'center', gap:8,
        }}>
          <span style={{ width:14, height:1, background:BC.fire }}/>
          Recuento del culto
        </div>

        {[
          ['Subtotal',         `S/ ${subtotal}`,  null],
          ['Descuento VENGANZA10', `− S/ ${discount}`, BC.fire],
          [shipping === 0 ? 'Envío · gratis' : 'Envío Lima', shipping === 0 ? 'S/ 0' : `S/ ${shipping}`, shipping === 0 ? BC.fire : null],
        ].map(([k,v,col],i)=>(
          <div key={i} style={{
            display:'flex', justifyContent:'space-between',
            padding:'8px 0',
            fontFamily:BF.body, fontSize:13,
          }}>
            <span style={{ color:BC.muted }}>{k}</span>
            <span style={{
              color: col || BC.text,
              fontFamily:BF.mono, fontSize:12.5, letterSpacing:'.04em',
            }}>{v}</span>
          </div>
        ))}

        <div style={{
          marginTop:10, paddingTop:14,
          borderTop:`1px dashed ${BC.border}`,
          display:'flex', justifyContent:'space-between', alignItems:'baseline',
        }}>
          <div>
            <div style={{
              fontFamily:BF.mono, fontSize:10, color:BC.silver,
              letterSpacing:'.24em', textTransform:'uppercase',
            }}>Pagas hoy</div>
            <div style={{
              fontFamily:BF.body, fontSize:34, fontWeight:800, lineHeight:1,
              letterSpacing:'.01em', marginTop:6,
            }}>S/ {total}</div>
          </div>
          <div style={{ textAlign:'right' }}>
            <div style={{
              fontFamily:BF.mono, fontSize:10, color:BC.silver,
              letterSpacing:'.24em', textTransform:'uppercase',
            }}>O en 3 cuotas</div>
            <div style={{
              fontFamily:BF.body, fontSize:14, fontWeight:700, marginTop:6,
              color:BC.text,
            }}>3 × S/ {(total/3).toFixed(0)}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────── Trust signals ───────────────
function Trust() {
  return (
    <div style={{
      margin:'14px 16px 0',
      display:'grid', gridTemplateColumns:'1fr 1fr', gap:8,
    }}>
      {[
        [<BI.shield/>, 'Pago seguro', 'Yape · Visa · PLIN'],
        [<BI.flame/>,  'Edición vivа', 'Sin restock'],
      ].map(([icon,t,d],i)=>(
        <div key={i} style={{
          padding:'12px', border:`1px solid ${BC.border}`,
          display:'flex', gap:10, alignItems:'flex-start',
        }}>
          <span style={{ color:BC.fire, display:'flex', marginTop:1 }}>{icon}</span>
          <div>
            <div style={{
              fontFamily:BF.body, fontSize:11.5, fontWeight:700,
              letterSpacing:'.04em', textTransform:'uppercase',
            }}>{t}</div>
            <div style={{
              fontFamily:BF.mono, fontSize:9.5, color:BC.muted,
              marginTop:2, letterSpacing:'.04em',
            }}>{d}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─────────────── "Tal vez quieras" — sugerencia ───────────────
function Suggestion() {
  const items = [
    { n:'Boxer Reliquia', sku:'OX-04-B09', p:'S/ 79', t:'b' },
    { n:'Gorra Tribu',    sku:'OX-04-A08', p:'S/ 99', t:'c' },
    { n:'Tote Devoto',    sku:'OX-04-A12', p:'S/ 89', t:'d' },
  ];
  return (
    <section style={{ padding:'24px 0 16px' }}>
      <div style={{ padding:'0 20px 12px' }}>
        <div style={{
          fontFamily:BF.mono, fontSize:10, letterSpacing:'.28em',
          color:BC.silver, textTransform:'uppercase', marginBottom:8,
          display:'flex', alignItems:'center', gap:8,
        }}>
          <span style={{ width:14, height:1, background:BC.fire }}/>
          Suma a la ofrenda
        </div>
        <h3 style={{ margin:0, fontFamily:BF.goth, fontWeight:400, fontSize:30, lineHeight:.95 }}>
          Completa el ritual
        </h3>
      </div>
      <div style={{
        display:'flex', gap:12, padding:'0 16px',
        overflowX:'auto',
      }} className="ox-scroll">
        {items.map((p,i)=>(
          <div key={i} style={{
            flex:'0 0 140px', background:BC.card, border:`1px solid ${BC.border}`,
            position:'relative',
          }}>
            <BImg tone={p.t} style={{ aspectRatio:'1 / 1' }}/>
            <div style={{ padding:'10px 10px 12px' }}>
              <div style={{
                fontFamily:BF.body, fontSize:11.5, fontWeight:700,
                letterSpacing:'.04em', textTransform:'uppercase',
              }}>{p.n}</div>
              <div style={{
                display:'flex', justifyContent:'space-between',
                marginTop:6,
                fontFamily:BF.mono, fontSize:10, color:BC.muted, letterSpacing:'.14em',
              }}>
                <span>{p.sku}</span>
                <span style={{ color:BC.text }}>{p.p}</span>
              </div>
            </div>
            <button style={{
              position:'absolute', top:8, right:8,
              width:28, height:28, padding:0,
              background:'rgba(10,10,10,.7)', border:`1px solid ${BC.border}`,
              color:BC.text, display:'flex', alignItems:'center', justifyContent:'center',
              cursor:'pointer',
            }}>
              <BI.plus/>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─────────────── Sticky bottom ───────────────
function PayBar({ total }) {
  return (
    <div style={{
      position:'sticky', bottom:0, zIndex:30,
      background:'rgba(10,10,10,0.95)',
      backdropFilter:'blur(18px) saturate(160%)',
      borderTop:`1px solid ${BC.border}`,
      padding:'12px 16px 14px',
      display:'flex', flexDirection:'column', gap:10,
    }}>
      <a href="#" style={{
        display:'flex', alignItems:'center', justifyContent:'center', gap:10,
        padding:'12px', textDecoration:'none', color:BC.text,
        border:`1px solid ${BC.border}`, background:BC.card,
        fontFamily:BF.body, fontWeight:700, fontSize:11.5,
        letterSpacing:'.22em', textTransform:'uppercase',
      }}>
        <span style={{ color:'#25D366', display:'flex' }}><BI.whats/></span>
        Pedir por WhatsApp
        <span style={{ color:BC.muted, fontFamily:BF.mono, fontSize:10 }}>· +51 999 999</span>
      </a>

      <a href="#" style={{
        display:'flex', alignItems:'center', justifyContent:'space-between',
        padding:'16px 18px', textDecoration:'none',
        background: BC.fire, color:'#fff',
        fontFamily:BF.body, fontWeight:800, fontSize:13,
        letterSpacing:'.22em', textTransform:'uppercase',
        boxShadow:`0 -4px 24px rgba(184,20,20,.32)`,
      }}>
        <span>Ir a pagar</span>
        <span style={{ fontFamily:BF.mono, fontSize:13 }}>S/ {total} →</span>
      </a>
    </div>
  );
}

// ─────────────── Bolsa root ───────────────
function Bag() {
  const items = [
    {
      sku:'OX-04-H01', name:'Hoodie Cruz',
      size:'XL', color:'Negro ritual',
      qty:1, price:289, tone:'a', lastN:'última',
    },
    {
      sku:'OX-04-T02', name:'Tee Liturgia',
      size:'M', color:'Hueso',
      qty:2, price:149, tone:'b',
    },
    {
      sku:'OX-04-A08', name:'Gorra Tribu',
      size:'Única', color:'Negro',
      qty:1, price:99, tone:'c',
    },
  ];
  const subtotal = items.reduce((a,i)=>a + i.qty * i.price, 0);  // 289 + 298 + 99 = 686
  const discount = 60;
  const shipping = 0; // free, ya superó S/250
  const total = subtotal - discount + shipping;

  return (
    <div data-screen-label="Bolsa" style={{
      background:BC.bg, color:BC.text, fontFamily:BF.body,
      minHeight:'100%', overflowY:'auto',
    }}>
      <BHeader count={items.length}/>
      <ShipProgress subtotal={subtotal - discount} threshold={250}/>
      <BagList items={items}/>
      <CouponRow/>
      <Summary subtotal={subtotal} discount={discount} shipping={shipping}/>
      <Trust/>
      <Suggestion/>
      <PayBar total={total}/>
    </div>
  );
}

window.Bag = Bag;
