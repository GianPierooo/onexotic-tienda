// OnExotic — Detalle de producto: HOODIE CRUZ · OX-04-H01

const DC = {
  bg:'#0A0A0A', card:'#141414', cardAlt:'#1E1E1E',
  border:'#2A2A2A', text:'#FFFFFF', muted:'#888888',
  silver:    '#C0C0C0',
  silverDim: '#7a7a7a',
  fire:'#B81414', wa:'#1f7a4a',
};
const DF = {
  goth: '"Pirata One", serif',
  black:'"UnifrakturCook", serif',
  body: '"Archivo", system-ui, sans-serif',
  mono: '"JetBrains Mono", ui-monospace, monospace',
};
const D_GRAIN =
 `radial-gradient(rgba(255,255,255,0.018) 1px, transparent 1px) 0 0 / 3px 3px,
  radial-gradient(rgba(255,255,255,0.012) 1px, transparent 1px) 1px 2px / 4px 4px`;

// ─────────────── Iconos ───────────────
const DI = {
  back:  () => <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M14 4l-7 7 7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/></svg>,
  share: () => <svg width="20" height="20" viewBox="0 0 22 22" fill="none"><path d="M11 3v12M6 8l5-5 5 5M4 14v4h14v-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square"/></svg>,
  heart: () => <svg width="20" height="20" viewBox="0 0 22 22" fill="none"><path d="M11 18s-7-4.2-7-9a4 4 0 0 1 7-2.6A4 4 0 0 1 18 9c0 4.8-7 9-7 9z" stroke="currentColor" strokeWidth="1.4"/></svg>,
  bag:   () => <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M4 7h14l-1 12H5L4 7z" stroke="currentColor" strokeWidth="1.4"/><path d="M8 7V5a3 3 0 1 1 6 0v2" stroke="currentColor" strokeWidth="1.4"/></svg>,
  whats: () => <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <path d="M3.2 18.8l1.2-4.1A8 8 0 1 1 11 19a8 8 0 0 1-3.7-.9l-4.1 1.1.0-.4z"
      stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
    <path d="M8.2 7.8c.2-.5.6-.5.9-.5h.4c.2 0 .4 0 .6.4l.7 1.6c.1.3 0 .4 0 .6l-.4.5c-.1.2-.3.3-.1.6.6 1 1.5 1.9 2.6 2.4.3.1.5 0 .6-.1l.5-.6c.2-.2.3-.2.5-.1l1.5.7c.3.1.4.2.5.4.0.5-.2 1.1-.4 1.3-.4.4-1.4.7-2 .6-.5-.1-1.2-.3-3.4-1.6-2.3-1.4-3.3-3-3.6-3.4-.3-.4-.5-1.0-.5-1.6 0-.6.4-1 .6-1.2z"
      fill="currentColor"/>
  </svg>,
  ruler: () => <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
    <path d="M1 5l4-4 12 12-4 4L1 5z" stroke="currentColor" strokeWidth="1.3"/>
    <path d="M5 5l1 1M7 3l2 2M9 5l1 1M11 7l2 2M13 9l1 1" stroke="currentColor" strokeWidth="1.3"/>
  </svg>,
  truck: () => <svg width="16" height="16" viewBox="0 0 22 22" fill="none">
    <rect x="2" y="6" width="11" height="9" stroke="currentColor" strokeWidth="1.3"/>
    <path d="M13 9h4l3 3v3h-7V9z" stroke="currentColor" strokeWidth="1.3"/>
    <circle cx="6" cy="16" r="1.6" stroke="currentColor" strokeWidth="1.3"/>
    <circle cx="16" cy="16" r="1.6" stroke="currentColor" strokeWidth="1.3"/>
  </svg>,
  shield:() => <svg width="16" height="16" viewBox="0 0 22 22" fill="none">
    <path d="M11 2l8 3v5c0 5-3.5 9-8 10-4.5-1-8-5-8-10V5l8-3z" stroke="currentColor" strokeWidth="1.3"/>
    <path d="M8 11l2.5 2.5L15 9" stroke="currentColor" strokeWidth="1.3"/>
  </svg>,
  recycle: () => <svg width="16" height="16" viewBox="0 0 22 22" fill="none">
    <path d="M5 13l-2 4h6M11 5l3 5 4-2M17 13l2 4h-6M11 17l-3-5-4 2" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
  </svg>,
  star:  () => <svg width="11" height="11" viewBox="0 0 12 12" fill="currentColor"><path d="M6 1l1.6 3.2 3.4.5-2.5 2.4.6 3.4L6 8.9l-3.1 1.6.6-3.4L1 4.7l3.4-.5L6 1z"/></svg>,
  flame: () => <svg width="18" height="18" viewBox="0 0 14 14" fill="currentColor"><path d="M7 13c2.8 0 4.5-2 4.5-4.5 0-2-1.5-3-2.5-5C8 5 6.5 5.5 5 7c-.8.8-1.5 2-1.5 3.5C3.5 12 4.8 13 7 13z"/></svg>,
  home:  () => <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M3 10l8-6 8 6v9H3v-9z" stroke="currentColor" strokeWidth="1.4"/></svg>,
  grid:  () => <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><rect x="3" y="3" width="7" height="7" stroke="currentColor" strokeWidth="1.4"/><rect x="12" y="3" width="7" height="7" stroke="currentColor" strokeWidth="1.4"/><rect x="3" y="12" width="7" height="7" stroke="currentColor" strokeWidth="1.4"/><rect x="12" y="12" width="7" height="7" stroke="currentColor" strokeWidth="1.4"/></svg>,
  user:  () => <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.4"/><path d="M4 19c1.5-3.5 4.2-5 7-5s5.5 1.5 7 5" stroke="currentColor" strokeWidth="1.4"/></svg>,
  minus: () => <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/></svg>,
  plus:  () => <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/></svg>,
};

// ─────────────── Placeholder de imagen (producto) ───────────────
function DImg({ tone='a', label, ratio='4 / 5', children, style }) {
  const tones = {
    a:'radial-gradient(120% 80% at 70% 20%, #2a1208 0%, #0e0606 55%, #050202 100%)',
    b:'radial-gradient(110% 90% at 30% 30%, #1a1a1a 0%, #0b0b0b 60%, #050505 100%)',
    c:'radial-gradient(130% 90% at 50% 100%, #3a1505 0%, #160906 55%, #060303 100%)',
    d:'linear-gradient(160deg, #1c1c1c 0%, #0a0a0a 60%, #060606 100%)',
    e:'radial-gradient(80% 100% at 50% 20%, #221008 0%, #0a0606 55%, #030101 100%)',
  };
  return (
    <div style={{
      position:'relative', overflow:'hidden',
      background: tones[tone], aspectRatio: ratio, ...style,
    }}>
      <div style={{ position:'absolute', inset:0, backgroundImage:D_GRAIN, mixBlendMode:'overlay', opacity:.5 }}/>
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(120% 120% at 50% 50%, transparent 50%, rgba(0,0,0,0.85) 100%)' }}/>
      {/* prenda placeholder */}
      <div style={{
        position:'absolute', inset:'12% 22% 8% 22%',
        background:'linear-gradient(180deg, rgba(255,255,255,.04) 0%, transparent 60%), linear-gradient(180deg, #161616 0%, #0a0a0a 100%)',
        border:'1px solid #1a1a1a',
      }}/>
      {label && (
        <div style={{
          position:'absolute', top:10, left:10, zIndex:2,
          fontFamily:DF.mono, fontSize:9, letterSpacing:'.18em',
          color: DC.silver, opacity:.75, textTransform:'uppercase',
        }}>◦ {label}</div>
      )}
      {children}
    </div>
  );
}

// ─────────────── Header sticky ───────────────
function DHeader() {
  return (
    <div style={{
      position:'sticky', top:0, zIndex:20,
      background:'rgba(10,10,10,.86)',
      backdropFilter:'blur(14px) saturate(140%)',
      WebkitBackdropFilter:'blur(14px) saturate(140%)',
      borderBottom:`1px solid ${DC.border}`,
      display:'grid', gridTemplateColumns:'auto 1fr auto auto auto', gap:14,
      alignItems:'center', padding:'12px 16px',
    }}>
      <button style={btnX}><DI.back/></button>
      <div style={{
        fontFamily:DF.mono, fontSize:10, letterSpacing:'.22em',
        color:DC.silver, textTransform:'uppercase',
      }}>
        Drop 04 / Hoodies
      </div>
      <button style={btnX}><DI.share/></button>
      <button style={btnX}><DI.heart/></button>
      <div style={{ position:'relative' }}>
        <button style={btnX}><DI.bag/></button>
        <div style={{
          position:'absolute', top:-2, right:-4,
          minWidth:16, height:16, padding:'0 4px', borderRadius:9,
          background: DC.fire, color:'#fff',
          fontFamily:DF.mono, fontSize:10, fontWeight:700,
          display:'flex', alignItems:'center', justifyContent:'center',
        }}>2</div>
      </div>
    </div>
  );
}
const btnX = {
  background:'transparent', border:'none', color:'#fff',
  padding:0, display:'flex', cursor:'pointer',
};

// ─────────────── Galería ───────────────
function Gallery() {
  return (
    <div style={{ background: DC.bg }}>
      {/* Foto principal */}
      <div style={{ position:'relative' }}>
        <DImg tone="a" label="OX-04-H01 · 01" ratio="4 / 5">
          {/* badges sobre la foto */}
          <div style={{
            position:'absolute', top:14, left:14, display:'flex', gap:6,
          }}>
            <span style={{
              padding:'5px 8px', background:'#fff', color:'#0A0A0A',
              fontFamily:DF.mono, fontSize:9, fontWeight:700, letterSpacing:'.2em',
            }}>NUEVO</span>
            <span style={{
              padding:'5px 8px', background:'rgba(10,10,10,.65)', color:DC.text,
              border:`1px solid ${DC.border}`,
              fontFamily:DF.mono, fontSize:9, letterSpacing:'.2em', textTransform:'uppercase',
              display:'inline-flex', alignItems:'center', gap:5,
            }}>
              <span style={{ width:5, height:5, borderRadius:99, background:DC.fire }}/>
              Drop vivo
            </span>
          </div>

          {/* contador 1/4 */}
          <div style={{
            position:'absolute', bottom:14, right:14,
            padding:'5px 8px', background:'rgba(10,10,10,.7)',
            border:`1px solid ${DC.border}`,
            fontFamily:DF.mono, fontSize:10, color:DC.text, letterSpacing:'.18em',
          }}>01 / 04</div>

          {/* dots */}
          <div style={{
            position:'absolute', bottom:18, left:0, right:0,
            display:'flex', justifyContent:'center', gap:6,
          }}>
            {[0,1,2,3].map(i=>(
              <span key={i} style={{
                width: i===0 ? 18 : 6, height:3,
                background: i===0 ? DC.fire : 'rgba(255,255,255,.35)',
              }}/>
            ))}
          </div>
        </DImg>
      </div>

      {/* Thumbnails */}
      <div style={{
        display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:6,
        padding:'8px 16px 0',
      }}>
        {[
          { t:'a', l:'01', active:true },
          { t:'b', l:'02' },
          { t:'c', l:'03' },
          { t:'e', l:'04' },
        ].map((th,i)=>(
          <div key={i} style={{
            position:'relative',
            border:`1px solid ${th.active ? DC.fire : DC.border}`,
          }}>
            <DImg tone={th.t} ratio="1 / 1"/>
            <div style={{
              position:'absolute', top:4, left:4,
              fontFamily:DF.mono, fontSize:8, color:DC.muted, letterSpacing:'.16em',
            }}>{th.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────── Encabezado del producto ───────────────
function ProductHead() {
  return (
    <div style={{ padding:'24px 20px 16px' }}>
      {/* SKU + capítulo */}
      <div style={{
        display:'flex', justifyContent:'space-between', alignItems:'center',
        fontFamily:DF.mono, fontSize:10, letterSpacing:'.24em',
        color:DC.silver, textTransform:'uppercase', marginBottom:10,
      }}>
        <span style={{ display:'inline-flex', alignItems:'center', gap:8 }}>
          <span style={{ width:14, height:1, background:DC.fire }}/>
          OX-04-H01
        </span>
        <span>Cap. 04 · Hoodie</span>
      </div>

      {/* Nombre gótico */}
      <h1 style={{
        margin:0, fontFamily:DF.black, fontWeight:400,
        fontSize: 68, lineHeight:.85, letterSpacing:'.005em',
        textWrap:'pretty',
      }}>
        Hoodie<br/>Cruz
      </h1>

      {/* Reviews + precio */}
      <div style={{
        display:'flex', justifyContent:'space-between', alignItems:'baseline',
        marginTop:14,
      }}>
        <div style={{
          display:'flex', alignItems:'center', gap:6, color:DC.text,
        }}>
          <span style={{ color:DC.fire, display:'inline-flex' }}>
            <DI.star/><DI.star/><DI.star/><DI.star/><DI.star/>
          </span>
          <span style={{
            fontFamily:DF.mono, fontSize:10, color:DC.muted, letterSpacing:'.18em',
          }}>4.9 · 87 fieles</span>
        </div>
        <div style={{ textAlign:'right' }}>
          <div style={{
            fontFamily:DF.mono, fontSize:9, color:DC.silver,
            letterSpacing:'.22em', textTransform:'uppercase',
          }}>Precio</div>
          <div style={{
            fontFamily:DF.body, fontSize:28, fontWeight:700,
            letterSpacing:'.02em', marginTop:2,
          }}>S/ 289</div>
        </div>
      </div>
    </div>
  );
}

// ─────────────── Alerta de stock ───────────────
function StockAlert() {
  return (
    <div style={{
      margin:'4px 20px 18px', padding:'12px 14px',
      border:`1px solid ${DC.border}`, borderLeft:`2px solid ${DC.fire}`,
      background: DC.card, display:'flex', justifyContent:'space-between', alignItems:'center',
    }}>
      <div style={{
        fontFamily:DF.mono, fontSize:10, letterSpacing:'.2em',
        textTransform:'uppercase', color:DC.text,
      }}>
        <span style={{ color:DC.fire }}>12</span> piezas vivas
        <span style={{ color:DC.muted }}> · de 40</span>
      </div>
      <div style={{
        fontFamily:DF.mono, fontSize:9, letterSpacing:'.2em',
        color:DC.silver, textTransform:'uppercase',
      }}>sin restock</div>
    </div>
  );
}

// ─────────────── Color ───────────────
function ColorSelect() {
  const colors = [
    { n:'Negro ritual', hex:'#0e0e0e', stroke:'#3a3a3a', active:true },
    { n:'Hueso',        hex:'#e7e2d6', stroke:'#a8a397' },
    { n:'Sangre',       hex:'#3b0a05', stroke:'#5a1108' },
  ];
  return (
    <div style={{ padding:'0 20px 18px' }}>
      <div style={{
        display:'flex', justifyContent:'space-between', alignItems:'baseline',
        marginBottom:10,
      }}>
        <div style={{
          fontFamily:DF.mono, fontSize:10, letterSpacing:'.24em',
          color:DC.silver, textTransform:'uppercase',
        }}>Color · <span style={{ color:DC.text }}>{colors.find(c=>c.active).n}</span></div>
      </div>
      <div style={{ display:'flex', gap:10 }}>
        {colors.map((c,i)=>(
          <div key={i} style={{
            width:42, height:42, position:'relative',
            border:`1px solid ${c.active ? DC.fire : DC.border}`,
            padding: 3,
          }}>
            <div style={{
              width:'100%', height:'100%', background:c.hex,
              border:`1px solid ${c.stroke}`,
            }}/>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────── Selector de talla ───────────────
function SizeSelect() {
  const sizes = [
    { s:'S',  stock:8,  state:'ok' },
    { s:'M',  stock:3,  state:'low' },
    { s:'L',  stock:0,  state:'out' },
    { s:'XL', stock:1,  state:'last', active:true },
  ];
  return (
    <div style={{ padding:'0 20px 18px' }}>
      <div style={{
        display:'flex', justifyContent:'space-between', alignItems:'baseline',
        marginBottom:10,
      }}>
        <div style={{
          fontFamily:DF.mono, fontSize:10, letterSpacing:'.24em',
          color:DC.silver, textTransform:'uppercase',
        }}>Talla · <span style={{ color:DC.text }}>XL</span></div>
        <a href="#" style={{
          color:DC.text, textDecoration:'none',
          fontFamily:DF.mono, fontSize:10, letterSpacing:'.2em',
          textTransform:'uppercase',
          display:'inline-flex', alignItems:'center', gap:6,
          borderBottom:`1px solid ${DC.fire}`, paddingBottom:2,
        }}>
          <DI.ruler/> Guía de tallas
        </a>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:8 }}>
        {sizes.map((sz,i)=>{
          const out = sz.state === 'out';
          const active = sz.active;
          return (
            <button key={i} style={{
              position:'relative', height:74, padding:0,
              background: active ? DC.text : 'transparent',
              color: active ? DC.bg : (out ? '#555' : DC.text),
              border:`1px solid ${active ? DC.text : (out ? '#1a1a1a' : DC.border)}`,
              display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
              gap:4, cursor: out ? 'not-allowed' : 'pointer',
              opacity: out ? .55 : 1,
            }}>
              <div style={{
                fontFamily:DF.body, fontSize:20, fontWeight:800,
                letterSpacing:'.04em',
                textDecoration: out ? 'line-through' : 'none',
              }}>{sz.s}</div>
              <div style={{
                fontFamily:DF.mono, fontSize:8.5,
                letterSpacing:'.18em', textTransform:'uppercase',
                color: active ? DC.bg : (sz.state==='last' || sz.state==='low' ? DC.fire : (out ? '#555' : DC.muted)),
              }}>
                {sz.state==='out'  && 'sin stock'}
                {sz.state==='last' && 'última'}
                {sz.state==='low'  && `${sz.stock} disp.`}
                {sz.state==='ok'   && `${sz.stock} disp.`}
              </div>
              {sz.state==='last' && !active && (
                <div style={{
                  position:'absolute', top:-1, right:-1,
                  width:6, height:6, background:DC.fire,
                }}/>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────── Cantidad ───────────────
function QtyRow() {
  return (
    <div style={{ padding:'0 20px 22px', display:'flex', gap:12 }}>
      <div style={{
        display:'flex', alignItems:'center', border:`1px solid ${DC.border}`,
        background:DC.card, height:48,
      }}>
        {[<DI.minus/>, '1', <DI.plus/>].map((x,i)=>(
          <div key={i} style={{
            width:48, height:'100%', display:'flex',
            alignItems:'center', justifyContent:'center',
            borderRight: i<2 ? `1px solid ${DC.border}` : 'none',
            fontFamily: typeof x==='string' ? DF.mono : 'inherit',
            fontSize: typeof x==='string' ? 14 : undefined,
            color:DC.text,
          }}>{x}</div>
        ))}
      </div>
      <div style={{
        flex:1, display:'flex', alignItems:'center', justifyContent:'space-between',
        padding:'0 14px', border:`1px solid ${DC.border}`, background:DC.card,
      }}>
        <span style={{
          fontFamily:DF.mono, fontSize:10, color:DC.silver,
          letterSpacing:'.2em', textTransform:'uppercase',
        }}>Subtotal</span>
        <span style={{
          fontFamily:DF.body, fontSize:16, fontWeight:700, letterSpacing:'.02em',
        }}>S/ 289</span>
      </div>
    </div>
  );
}

// ─────────────── Descripción ritual ───────────────
function Description() {
  return (
    <section style={{
      padding:'24px 20px', borderTop:`1px solid ${DC.border}`,
      background: DC.bg,
    }}>
      <div style={{
        fontFamily:DF.mono, fontSize:10, letterSpacing:'.28em',
        color:DC.silver, textTransform:'uppercase', marginBottom:10,
        display:'flex', alignItems:'center', gap:8,
      }}>
        <span style={{ width:14, height:1, background:DC.fire }}/>
        ✦ El ritual
      </div>
      <h2 style={{
        margin:'0 0 14px', fontFamily:DF.goth, fontWeight:400,
        fontSize:34, lineHeight:.95,
      }}>
        Pesa.<br/>Cruje. Te marca.
      </h2>
      <p style={{
        margin:0, fontFamily:DF.body, fontSize:13.5, lineHeight:1.65, color:'#cfcfcf',
        textWrap:'pretty',
      }}>
        Algodón <b>500 GSM</b> tejido en Gamarra. Corte oversize, hombros
        caídos, capucha doble forrada. Cordón plano negro mate.
        Bordado al pecho. Estampado al dorso a 4 tintas.
        <br/><br/>
        <span style={{ color: DC.fire }}>No es para todos.</span> Está hecho para los que entienden el peso.
      </p>

      {/* Ficha técnica */}
      <div style={{
        marginTop:18, border:`1px solid ${DC.border}`,
        background:DC.card,
      }}>
        {[
          ['Composición', '100% algodón peinado'],
          ['Gramaje', '500 GSM'],
          ['Corte', 'Oversize · hombro caído'],
          ['Hecho en', 'Lima, Perú · Gamarra'],
          ['Cuidado', 'Lavado en frío · planchado al revés'],
        ].map(([k,v],i,a)=>(
          <div key={k} style={{
            display:'grid', gridTemplateColumns:'110px 1fr',
            padding:'12px 14px',
            borderBottom: i<a.length-1 ? `1px solid ${DC.border}` : 'none',
            fontSize:12.5,
          }}>
            <div style={{
              fontFamily:DF.mono, fontSize:10, letterSpacing:'.18em',
              color:DC.silver, textTransform:'uppercase',
            }}>{k}</div>
            <div style={{ fontFamily:DF.body, color:DC.text }}>{v}</div>
          </div>
        ))}
      </div>

      {/* Garantías */}
      <div style={{
        marginTop:14, display:'grid', gridTemplateColumns:'1fr 1fr', gap:8,
      }}>
        {[
          [<DI.truck/>, 'Envío gratis', 'Sobre S/ 250 en Lima'],
          [<DI.shield/>, 'Pago seguro', 'Yape · Visa · Cuotas'],
          [<DI.recycle/>, 'Cambios', '7 días, sin uso'],
          [<DI.flame/>, 'Edición', 'Limitada · sin restock'],
        ].map(([icon,t,d],i)=>(
          <div key={i} style={{
            padding:'12px', border:`1px solid ${DC.border}`,
            display:'flex', gap:10, alignItems:'flex-start',
          }}>
            <span style={{ color: DC.fire, display:'flex', marginTop:1 }}>{icon}</span>
            <div>
              <div style={{
                fontFamily:DF.body, fontSize:11.5, fontWeight:700,
                letterSpacing:'.04em', textTransform:'uppercase',
              }}>{t}</div>
              <div style={{
                fontFamily:DF.mono, fontSize:9.5, color:DC.muted,
                marginTop:2, letterSpacing:'.04em',
              }}>{d}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─────────────── Lookbook teaser del producto ───────────────
function ProductLook() {
  return (
    <section style={{ background:DC.bg, padding:'10px 20px 24px' }}>
      <div style={{
        fontFamily:DF.mono, fontSize:10, letterSpacing:'.28em',
        color:DC.silver, textTransform:'uppercase', marginBottom:10,
        display:'flex', alignItems:'center', gap:8,
      }}>
        <span style={{ width:14, height:1, background:DC.fire }}/>
        Cómo se viste
      </div>
      <DImg tone="c" label="lookbook" ratio="4 / 5" style={{ borderTop:`1px solid ${DC.border}` }}>
        <div style={{
          position:'absolute', left:14, bottom:14, right:14,
          display:'flex', justifyContent:'space-between', alignItems:'flex-end',
        }}>
          <div style={{ fontFamily:DF.black, fontSize:34, lineHeight:.9 }}>
            Cuerpos<br/>de culto
          </div>
          <div style={{
            border:`1px solid ${DC.text}`, padding:'8px 10px',
            fontFamily:DF.mono, fontSize:9, letterSpacing:'.22em',
            textTransform:'uppercase',
          }}>ver +</div>
        </div>
      </DImg>
    </section>
  );
}

// ─────────────── Relacionados ───────────────
function Related() {
  const items = [
    { n:'Tee Liturgia',  sku:'OX-04-T02', p:'S/ 149', t:'b' },
    { n:'Cargo Ritual',  sku:'OX-04-P03', p:'S/ 349', t:'c' },
    { n:'Joggers Cripta',sku:'OX-04-J06', p:'S/ 269', t:'d' },
  ];
  return (
    <section style={{
      borderTop:`1px solid ${DC.border}`, background:DC.bg, padding:'24px 0 20px',
    }}>
      <div style={{ padding:'0 20px 14px' }}>
        <div style={{
          fontFamily:DF.mono, fontSize:10, letterSpacing:'.28em',
          color:DC.silver, textTransform:'uppercase', marginBottom:8,
          display:'flex', alignItems:'center', gap:8,
        }}>
          <span style={{ width:14, height:1, background:DC.fire }}/>
          Hermanos en el drop
        </div>
        <h3 style={{ margin:0, fontFamily:DF.goth, fontWeight:400, fontSize:32, lineHeight:.95 }}>
          Completa el culto
        </h3>
      </div>
      <div style={{
        display:'flex', gap:12, padding:'0 20px',
        overflowX:'auto',
      }} className="ox-scroll">
        {items.map((p,i)=>(
          <div key={i} style={{
            flex:'0 0 160px', background:DC.card, border:`1px solid ${DC.border}`,
          }}>
            <DImg tone={p.t} ratio="3 / 4" label={p.sku}/>
            <div style={{ padding:'10px 10px 12px' }}>
              <div style={{
                fontFamily:DF.body, fontSize:11.5, fontWeight:700,
                letterSpacing:'.04em', textTransform:'uppercase',
              }}>{p.n}</div>
              <div style={{
                display:'flex', justifyContent:'space-between',
                marginTop:6,
                fontFamily:DF.mono, fontSize:10, color:DC.muted, letterSpacing:'.14em',
              }}>
                <span>{p.sku}</span>
                <span style={{ color:DC.text }}>{p.p}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─────────────── Footer mini ───────────────
function MiniFoot() {
  return (
    <div style={{
      padding:'22px 20px 100px', borderTop:`1px solid ${DC.border}`,
      textAlign:'center',
    }}>
      <div style={{
        fontFamily:DF.black, fontSize:42, lineHeight:.9,
        letterSpacing:'.005em', marginBottom:10,
      }}>OnExotic</div>
      <div style={{
        fontFamily:DF.mono, fontSize:9, color:'#555', letterSpacing:'.24em',
      }}>
        © 2026 · Lima · PE
      </div>
    </div>
  );
}

// ─────────────── Bottom action bar (sticky) ───────────────
function ActionBar() {
  return (
    <div style={{
      position:'sticky', bottom:0, zIndex:30,
      background:'rgba(10,10,10,0.95)',
      backdropFilter:'blur(18px) saturate(160%)',
      borderTop:`1px solid ${DC.border}`,
      padding:'12px 16px 14px',
      display:'flex', flexDirection:'column', gap:10,
    }}>
      {/* WhatsApp */}
      <a href="#" style={{
        display:'flex', alignItems:'center', justifyContent:'center', gap:10,
        padding:'12px', textDecoration:'none', color:DC.text,
        border:`1px solid ${DC.border}`, background:DC.card,
        fontFamily:DF.body, fontWeight:700, fontSize:11.5,
        letterSpacing:'.22em', textTransform:'uppercase',
      }}>
        <span style={{ color:'#25D366', display:'flex' }}><DI.whats/></span>
        Pregunta por WhatsApp
        <span style={{ color:DC.muted, fontFamily:DF.mono, fontSize:10 }}>· +51 999 999</span>
      </a>

      {/* Agregar a la bolsa */}
      <a href="#" style={{
        display:'flex', alignItems:'center', justifyContent:'space-between',
        padding:'16px 18px', textDecoration:'none',
        background: DC.fire, color:'#fff',
        fontFamily:DF.body, fontWeight:800, fontSize:13,
        letterSpacing:'.22em', textTransform:'uppercase',
        boxShadow:`0 -4px 24px rgba(184,20,20,.32)`,
      }}>
        <span style={{ display:'flex', alignItems:'center', gap:10 }}>
          <DI.bag/>
          Agregar a la bolsa
        </span>
        <span style={{ fontFamily:DF.mono, fontSize:13 }}>S/ 289 →</span>
      </a>
    </div>
  );
}

// ─────────────── Detail root ───────────────
function Detail() {
  return (
    <div data-screen-label="Detalle Hoodie Cruz" style={{
      background:DC.bg, color:DC.text, fontFamily:DF.body,
      minHeight:'100%', overflowY:'auto',
    }}>
      <DHeader/>
      <Gallery/>
      <ProductHead/>
      <StockAlert/>
      <ColorSelect/>
      <SizeSelect/>
      <QtyRow/>
      <Description/>
      <ProductLook/>
      <Related/>
      <MiniFoot/>
      <ActionBar/>
    </div>
  );
}

window.Detail = Detail;
