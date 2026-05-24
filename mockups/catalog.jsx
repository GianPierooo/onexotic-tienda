// OnExotic — Catálogo (mobile)
// Recorrido completo del drop activo. Mantiene el sistema visual del Home.

const CC = {
  bg:'#0A0A0A', card:'#141414', cardAlt:'#1E1E1E',
  border:'#2A2A2A', text:'#FFFFFF', muted:'#888888',
  silver:    '#C0C0C0',
  silverDim: '#7a7a7a',
  fire:'#B81414',
};
const CF = {
  goth: '"Pirata One", serif',
  black:'"UnifrakturCook", serif',
  body: '"Archivo", system-ui, sans-serif',
  mono: '"JetBrains Mono", ui-monospace, monospace',
};
const C_GRAIN =
 `radial-gradient(rgba(255,255,255,0.018) 1px, transparent 1px) 0 0 / 3px 3px,
  radial-gradient(rgba(255,255,255,0.012) 1px, transparent 1px) 1px 2px / 4px 4px`;

// ─────────────── Iconos ───────────────
const CIcon = {
  back: () => <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <path d="M14 4l-7 7 7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/></svg>,
  search: () => <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
    <circle cx="10" cy="10" r="6" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M15 15l4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square"/></svg>,
  bag: () => <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <path d="M4 7h14l-1 12H5L4 7z" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M8 7V5a3 3 0 1 1 6 0v2" stroke="currentColor" strokeWidth="1.4"/></svg>,
  user: () => <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <circle cx="11" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.4"/>
    <path d="M4 19c1.5-3.5 4.2-5 7-5s5.5 1.5 7 5" stroke="currentColor" strokeWidth="1.4"/></svg>,
  home: () => <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <path d="M3 10l8-6 8 6v9H3v-9z" stroke="currentColor" strokeWidth="1.4"/></svg>,
  grid: () => <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
    <rect x="3" y="3" width="7" height="7" stroke="currentColor" strokeWidth="1.4"/>
    <rect x="12" y="3" width="7" height="7" stroke="currentColor" strokeWidth="1.4"/>
    <rect x="3" y="12" width="7" height="7" stroke="currentColor" strokeWidth="1.4"/>
    <rect x="12" y="12" width="7" height="7" stroke="currentColor" strokeWidth="1.4"/></svg>,
  flame: () => <svg width="18" height="18" viewBox="0 0 14 14" fill="none">
    <path d="M7 13c2.8 0 4.5-2 4.5-4.5 0-2-1.5-3-2.5-5C8 5 6.5 5.5 5 7c-.8.8-1.5 2-1.5 3.5C3.5 12 4.8 13 7 13z" fill="currentColor"/></svg>,
  chev: () => <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
    <path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square"/></svg>,
  close: () => <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
    <path d="M2 2l6 6M8 2l-6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square"/></svg>,
  filter: () => <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M1 3h12M3 7h8M5 11h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square"/></svg>,
};

// ─────────────── Placeholder de imagen ───────────────
function CImg({ tone='a', label, children, style, dim=false }) {
  const tones = {
    a:'radial-gradient(120% 80% at 70% 20%, #2a1208 0%, #0e0606 55%, #050202 100%)',
    b:'radial-gradient(110% 90% at 30% 30%, #1a1a1a 0%, #0b0b0b 60%, #050505 100%)',
    c:'radial-gradient(130% 90% at 50% 100%, #3a1505 0%, #160906 55%, #060303 100%)',
    d:'linear-gradient(160deg, #1c1c1c 0%, #0a0a0a 60%, #060606 100%)',
    e:'radial-gradient(80% 100% at 50% 20%, #221008 0%, #0a0606 55%, #030101 100%)',
    f:'radial-gradient(120% 90% at 60% 40%, #181818 0%, #0c0c0c 60%, #050505 100%)',
    g:'linear-gradient(180deg, #20100a 0%, #0a0606 100%)',
    h:'radial-gradient(100% 100% at 50% 50%, #1a1a1a 0%, #080808 70%, #030303 100%)',
  };
  return (
    <div style={{ position:'relative', overflow:'hidden', background: tones[tone], ...style }}>
      <div style={{ position:'absolute', inset:0, backgroundImage:C_GRAIN, mixBlendMode:'overlay', opacity:.5 }}/>
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(120% 120% at 50% 50%, transparent 50%, rgba(0,0,0,0.85) 100%)' }}/>
      {/* silueta de prenda */}
      <div style={{
        position:'absolute', inset:'14% 24% 10% 24%',
        background:'linear-gradient(180deg, rgba(255,255,255,.035) 0%, transparent 60%), linear-gradient(180deg, #161616 0%, #0a0a0a 100%)',
        border:'1px solid #1a1a1a',
        filter: dim ? 'grayscale(1) brightness(.45)' : 'none',
      }}/>
      {label && (
        <div style={{
          position:'absolute', top:8, left:8, zIndex:2,
          fontFamily:CF.mono, fontSize:8.5, letterSpacing:'.16em',
          color: CC.silver, opacity:.75, textTransform:'uppercase',
        }}>◦ {label}</div>
      )}
      {children}
    </div>
  );
}

// ─────────────── Header sticky ───────────────
function CatHeader() {
  return (
    <div style={{
      position:'sticky', top:0, zIndex:20,
      background:'rgba(10,10,10,.92)',
      backdropFilter:'blur(14px) saturate(140%)',
      WebkitBackdropFilter:'blur(14px) saturate(140%)',
      borderBottom:`1px solid ${CC.border}`,
    }}>
      {/* Línea 1: navegación */}
      <div style={{
        display:'grid', gridTemplateColumns:'auto 1fr auto auto', gap:14,
        alignItems:'center', padding:'12px 16px',
      }}>
        <button style={btn0}><CIcon.back/></button>
        <div style={{
          fontFamily:CF.mono, fontSize:10, letterSpacing:'.24em',
          color:CC.silver, textTransform:'uppercase',
        }}>
          ← Drop 04 · Venganza
        </div>
        <button style={btn0}><CIcon.search/></button>
        <div style={{ position:'relative' }}>
          <button style={btn0}><CIcon.bag/></button>
          <div style={{
            position:'absolute', top:-2, right:-4,
            minWidth:16, height:16, padding:'0 4px', borderRadius:9,
            background: CC.fire, color:'#fff',
            fontFamily:CF.mono, fontSize:10, fontWeight:700,
            display:'flex', alignItems:'center', justifyContent:'center',
          }}>2</div>
        </div>
      </div>

      {/* Línea 2: título */}
      <div style={{ padding:'4px 16px 14px' }}>
        <div style={{
          fontFamily:CF.mono, fontSize:10, letterSpacing:'.28em',
          color:CC.silver, textTransform:'uppercase',
          display:'flex', alignItems:'center', gap:8, marginBottom:6,
        }}>
          <span style={{ width:14, height:1, background:CC.fire }}/>
          Capítulo 04
        </div>
        <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between' }}>
          <h1 style={{
            margin:0, fontFamily:CF.black, fontWeight:400,
            fontSize:54, lineHeight:.9, letterSpacing:'.005em',
          }}>Catálogo</h1>
          <div style={{ textAlign:'right' }}>
            <div style={{
              display:'inline-flex', alignItems:'center', gap:6,
              fontFamily:CF.mono, fontSize:9, letterSpacing:'.2em',
              color:CC.text, textTransform:'uppercase',
            }}>
              <span style={{ width:6, height:6, borderRadius:99, background:CC.fire, boxShadow:`0 0 8px ${CC.fire}` }}/>
              vivo
            </div>
            <div style={{
              marginTop:4, fontFamily:CF.mono, fontSize:9, letterSpacing:'.18em',
              color:CC.silver, textTransform:'uppercase',
            }}>cierra 02d 14h 37m</div>
          </div>
        </div>
      </div>

      {/* Línea 3: búsqueda */}
      <div style={{ padding:'0 16px 12px' }}>
        <div style={{
          display:'flex', alignItems:'center', gap:10,
          border:`1px solid ${CC.border}`, background:CC.card,
          padding:'12px 14px',
        }}>
          <span style={{ color:CC.muted }}><CIcon.search/></span>
          <input
            placeholder="Busca tu ritual…"
            style={{
              flex:1, background:'transparent', border:'none', outline:'none',
              color:CC.text, fontFamily:CF.body, fontSize:13, letterSpacing:'.04em',
            }}
          />
          <span style={{
            fontFamily:CF.mono, fontSize:9, color:CC.muted, letterSpacing:'.18em',
          }}>SKU · NOMBRE</span>
        </div>
      </div>

      {/* Línea 4: filtros (scroll horizontal) */}
      <FilterBar/>
      {/* Línea 5: chips activos */}
      <ActiveChips/>
    </div>
  );
}
const btn0 = {
  background:'transparent', border:'none', color:'#fff',
  padding:0, display:'flex', cursor:'pointer',
};

// ─────────────── Filtros principales ───────────────
function FilterBar() {
  const items = [
    { l:'Ordenar', v:'Más nuevo' },
    { l:'Tipo',    v:'Hoodie · Oversize', n:2 },
    { l:'Talla',   v:'L', n:1 },
    { l:'Color',   v:'Negro', n:1 },
    { l:'Precio',  v:'Todos' },
  ];
  return (
    <div style={{
      padding:'4px 16px 12px', display:'flex', gap:8,
      overflowX:'auto', WebkitOverflowScrolling:'touch',
    }} className="ox-scroll">
      <button style={{
        flex:'0 0 auto', display:'inline-flex', alignItems:'center', gap:6,
        padding:'10px 12px', background:CC.text, color:CC.bg,
        border:'none', fontFamily:CF.mono, fontSize:10,
        letterSpacing:'.2em', textTransform:'uppercase', fontWeight:700,
      }}>
        <CIcon.filter/> Filtros · 4
      </button>
      {items.map((it,i)=>(
        <button key={i} style={{
          flex:'0 0 auto', display:'inline-flex', alignItems:'center', gap:8,
          padding:'10px 12px',
          background: it.n ? '#1E1E1E' : 'transparent',
          color:CC.text,
          border:`1px solid ${it.n ? CC.fire : CC.border}`,
          fontFamily:CF.mono, fontSize:10,
          letterSpacing:'.2em', textTransform:'uppercase',
        }}>
          <span style={{ color:CC.muted }}>{it.l}</span>
          <span>·</span>
          <span>{it.v}</span>
          {it.n && (
            <span style={{
              marginLeft:4, padding:'1px 5px', background: CC.fire, color:'#fff',
              fontWeight:700, fontSize:9,
            }}>{it.n}</span>
          )}
          <CIcon.chev/>
        </button>
      ))}
    </div>
  );
}

function ActiveChips() {
  const chips = ['Oversize','Hoodie','Talla L','Negro'];
  return (
    <div style={{
      padding:'0 16px 12px', display:'flex', gap:6,
      alignItems:'center', overflowX:'auto',
    }} className="ox-scroll">
      <span style={{
        fontFamily:CF.mono, fontSize:9, color:CC.silver,
        letterSpacing:'.22em', textTransform:'uppercase', flex:'0 0 auto',
      }}>Activos:</span>
      {chips.map((x,i)=>(
        <span key={i} style={{
          flex:'0 0 auto', display:'inline-flex', alignItems:'center', gap:6,
          padding:'5px 8px', border:`1px solid ${CC.border}`,
          background:CC.card, color:CC.text,
          fontFamily:CF.mono, fontSize:9.5, letterSpacing:'.16em',
        }}>
          {x}<span style={{ color:CC.muted, display:'flex' }}><CIcon.close/></span>
        </span>
      ))}
      <span style={{
        flex:'0 0 auto', marginLeft:'auto', paddingLeft:8,
        fontFamily:CF.mono, fontSize:9, color:CC.fire,
        letterSpacing:'.22em', textTransform:'uppercase',
        borderBottom:`1px solid ${CC.fire}`,
      }}>Limpiar</span>
    </div>
  );
}

// ─────────────── Resumen de resultados ───────────────
function ResultsBar() {
  return (
    <div style={{
      padding:'16px 20px 8px',
      display:'flex', justifyContent:'space-between', alignItems:'baseline',
      borderBottom:`1px solid ${CC.border}`,
    }}>
      <div>
        <div style={{
          fontFamily:CF.mono, fontSize:9, color:CC.silver,
          letterSpacing:'.24em', textTransform:'uppercase',
        }}>Resultados</div>
        <div style={{
          fontFamily:CF.goth, fontSize:24, lineHeight:1, marginTop:4,
        }}>
          47 <span style={{ color:CC.muted, fontSize:18 }}>piezas</span>
        </div>
      </div>
      <div style={{ textAlign:'right' }}>
        <div style={{
          fontFamily:CF.mono, fontSize:9, color:CC.silver,
          letterSpacing:'.22em', textTransform:'uppercase',
        }}>Stock vivo</div>
        <div style={{
          marginTop:4, fontFamily:CF.mono, fontSize:11, letterSpacing:'.16em',
          color:CC.text,
        }}>
          39 disp. · <span style={{ color:CC.muted }}>8 agotadas</span>
        </div>
      </div>
    </div>
  );
}

// ─────────────── Tarjeta de producto (densa, catálogo) ───────────────
function CatCard({ name, sku, price, oldPrice, sizes, soldSizes=[], tone, badge, sold=false, lastN }) {
  return (
    <a href="#" style={{
      textDecoration:'none', color:CC.text, display:'flex', flexDirection:'column',
      background:CC.card, border:`1px solid ${CC.border}`,
      opacity: sold ? .85 : 1,
    }}>
      <CImg tone={tone} label={sku} dim={sold} style={{ aspectRatio:'3 / 4', borderBottom:`1px solid ${CC.border}` }}>
        {badge && !sold && (
          <div style={{
            position:'absolute', top:10, right:10, zIndex:2,
            padding:'4px 7px',
            background: badge==='ÚLTIMO' ? CC.fire : '#fff',
            color: badge==='ÚLTIMO' ? '#fff' : '#0A0A0A',
            fontFamily:CF.mono, fontSize:9, fontWeight:700,
            letterSpacing:'.18em',
          }}>{badge}</div>
        )}
        {sold && (
          <>
            <div style={{
              position:'absolute', inset:0, background:'rgba(10,10,10,.55)',
            }}/>
            <div style={{
              position:'absolute', top:'50%', left:0, right:0,
              transform:'translateY(-50%) rotate(-6deg)',
              textAlign:'center',
              fontFamily:CF.black, fontSize:34, color:'#fff',
              letterSpacing:'.05em',
              textShadow:'0 2px 16px rgba(0,0,0,.8)',
            }}>agotado</div>
          </>
        )}
        {lastN && !sold && (
          <div style={{
            position:'absolute', bottom:10, left:10, zIndex:2,
            display:'inline-flex', alignItems:'center', gap:5,
            padding:'4px 7px', background:'rgba(10,10,10,.7)',
            border:`1px solid ${CC.border}`,
            fontFamily:CF.mono, fontSize:9, letterSpacing:'.18em',
            color:CC.text, textTransform:'uppercase',
          }}>
            <span style={{ width:5, height:5, borderRadius:99, background:CC.fire }}/>
            {lastN}
          </div>
        )}
      </CImg>

      <div style={{ padding:'12px 12px 14px', display:'flex', flexDirection:'column', gap:8 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', gap:8 }}>
          <div style={{
            fontFamily:CF.body, fontSize:12.5, fontWeight:700,
            letterSpacing:'.04em', textTransform:'uppercase',
          }}>{name}</div>
          <div style={{ textAlign:'right' }}>
            <div style={{ fontFamily:CF.mono, fontSize:12, color:CC.text }}>{price}</div>
            {oldPrice && (
              <div style={{
                fontFamily:CF.mono, fontSize:9.5, color:CC.muted,
                textDecoration:'line-through',
              }}>{oldPrice}</div>
            )}
          </div>
        </div>

        <div style={{
          fontFamily:CF.mono, fontSize:9, color:CC.silver,
          letterSpacing:'.18em', textTransform:'uppercase',
        }}>{sku}</div>

        {/* tallas con sold-out tachadas */}
        <div style={{
          display:'flex', gap:6, alignItems:'center', flexWrap:'wrap',
          fontFamily:CF.mono, fontSize:10, letterSpacing:'.12em',
        }}>
          {sizes.map((s,i)=>{
            const out = soldSizes.includes(s);
            return (
              <span key={i} style={{
                color: out ? '#555' : CC.text,
                textDecoration: out ? 'line-through' : 'none',
              }}>{s}{i<sizes.length-1 && <span style={{ color:'#333', margin:'0 4px' }}>·</span>}</span>
            );
          })}
        </div>
      </div>
    </a>
  );
}

// ─────────────── Grid ───────────────
function CatGrid() {
  const items = [
    { name:'Hoodie Cruz',     sku:'OX-04-H01', price:'S/ 289', tone:'a', badge:'NUEVO',  sizes:['S','M','L','XL'], soldSizes:['S']  },
    { name:'Tee Liturgia',    sku:'OX-04-T02', price:'S/ 149', tone:'b', sizes:['XS','S','M','L','XL'], lastN:'12 piezas' },
    { name:'Cargo Ritual',    sku:'OX-04-P03', price:'S/ 349', tone:'c', badge:'ÚLTIMO', sizes:['28','30','32','34'], soldSizes:['28','34'], lastN:'5 piezas' },
    { name:'Top Gym Ave',     sku:'OX-04-G04', price:'S/ 119', tone:'d', sizes:['XS','S','M','L'] },
    { name:'Hoodie Sermón',   sku:'OX-04-H05', price:'S/ 319', tone:'e', badge:'NUEVO', sizes:['S','M','L','XL'] },
    { name:'Joggers Cripta',  sku:'OX-04-J06', price:'S/ 269', tone:'f', sizes:['S','M','L','XL'], soldSizes:['M'] },
    { name:'Tee Profecía',    sku:'OX-04-T07', price:'S/ 159', oldPrice:'S/ 189', tone:'g', sizes:['S','M','L','XL'] },
    { name:'Gorra Tribu',     sku:'OX-04-A08', price:'S/  99', tone:'h', sold:true, sizes:['Única'] },
    { name:'Boxer Reliquia',  sku:'OX-04-B09', price:'S/  79', tone:'b', sizes:['S','M','L','XL'] },
    { name:'Top Gym Furia',   sku:'OX-04-G10', price:'S/ 129', tone:'c', badge:'ÚLTIMO', sizes:['XS','S','M','L'], soldSizes:['XS','S'], lastN:'3 piezas' },
    { name:'Hoodie Negación', sku:'OX-04-H11', price:'S/ 299', tone:'a', sold:true, sizes:['S','M','L','XL'] },
    { name:'Tote Devoto',     sku:'OX-04-A12', price:'S/  89', tone:'d', badge:'NUEVO', sizes:['Única'] },
  ];
  return (
    <div style={{
      padding:'14px 16px 8px',
      display:'grid', gridTemplateColumns:'1fr 1fr', gap:12,
    }}>
      {items.map((p,i)=>(<CatCard key={i} {...p}/>))}
    </div>
  );
}

// ─────────────── Pagination / fin ───────────────
function MoreBar() {
  return (
    <div style={{ padding:'14px 20px 28px', display:'flex', flexDirection:'column', gap:12 }}>
      <div style={{
        height:6, background:CC.card, border:`1px solid ${CC.border}`,
        position:'relative', overflow:'hidden',
      }}>
        <div style={{ position:'absolute', left:0, top:0, bottom:0, width:'26%', background:CC.fire }}/>
      </div>
      <div style={{
        display:'flex', justifyContent:'space-between',
        fontFamily:CF.mono, fontSize:10, color:CC.silver,
        letterSpacing:'.2em', textTransform:'uppercase',
      }}>
        <span>Viste 12 de 47</span>
        <span>26%</span>
      </div>
      <button style={{
        padding:'16px', background:'transparent',
        border:`1px solid ${CC.border}`, color:CC.text,
        fontFamily:CF.body, fontSize:12, fontWeight:800,
        letterSpacing:'.24em', textTransform:'uppercase',
        cursor:'pointer',
      }}>
        Cargar más rituales →
      </button>

      <div style={{
        marginTop:6, padding:'18px 16px', textAlign:'center',
        background:CC.cardAlt, border:`1px solid ${CC.border}`,
        position:'relative', overflow:'hidden',
      }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:C_GRAIN, opacity:.4 }}/>
        <div style={{ position:'relative' }}>
          <div style={{
            fontFamily:CF.mono, fontSize:9, color:CC.fire,
            letterSpacing:'.28em', textTransform:'uppercase', marginBottom:6,
          }}>◦ Próximo capítulo</div>
          <div style={{ fontFamily:CF.goth, fontSize:30, lineHeight:.95 }}>
            05 / Penitencia
          </div>
          <div style={{
            marginTop:8, fontFamily:CF.body, fontSize:12, color:CC.muted, lineHeight:1.5,
          }}>
            Junio · solo para fieles.<br/>Suscríbete para entrar primero.
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────── Tab bar (Catálogo activo) ───────────────
function CatTabBar() {
  const tabs = [
    { i:<CIcon.home/>,   l:'Inicio' },
    { i:<CIcon.grid/>,   l:'Catálogo', active:true },
    { i:<CIcon.flame/>,  l:'Drop',     accent:true },
    { i:<CIcon.user/>,   l:'Cuenta' },
    { i:<CIcon.bag/>,    l:'Bolsa', badge:2 },
  ];
  return (
    <div style={{
      position:'sticky', bottom:0, zIndex:10,
      background:'rgba(10,10,10,0.92)',
      backdropFilter:'blur(16px) saturate(160%)',
      borderTop:`1px solid ${CC.border}`,
      display:'grid', gridTemplateColumns:'repeat(5,1fr)',
      padding:'10px 4px 16px',
    }}>
      {tabs.map((t,i)=>(
        <button key={i} style={{
          background:'transparent', border:'none',
          display:'flex', flexDirection:'column', alignItems:'center', gap:4,
          color: t.active ? CC.text : CC.muted,
          padding:'6px 0', position:'relative',
        }}>
          <div style={{
            color: t.accent ? CC.fire : 'inherit',
            display:'flex', alignItems:'center', justifyContent:'center',
            width:26, height:26,
          }}>{t.i}</div>
          {t.badge && (
            <div style={{
              position:'absolute', top:2, right:'calc(50% - 18px)',
              minWidth:14, height:14, padding:'0 3px', borderRadius:8,
              background: CC.fire, color:'#fff',
              fontFamily:CF.mono, fontSize:9, fontWeight:700,
              display:'flex', alignItems:'center', justifyContent:'center',
            }}>{t.badge}</div>
          )}
          <div style={{
            fontFamily:CF.mono, fontSize:8, letterSpacing:'.18em', textTransform:'uppercase',
          }}>{t.l}</div>
          {t.active && (
            <div style={{
              position:'absolute', top:0, width:18, height:2, background:CC.fire,
            }}/>
          )}
        </button>
      ))}
    </div>
  );
}

// ─────────────── Catálogo root ───────────────
function Catalog() {
  return (
    <div data-screen-label="Catálogo" style={{
      background:CC.bg, color:CC.text, fontFamily:CF.body,
      minHeight:'100%', overflowY:'auto',
    }}>
      <CatHeader/>
      <ResultsBar/>
      <CatGrid/>
      <MoreBar/>
      <CatTabBar/>
    </div>
  );
}

window.Catalog = Catalog;
