// OnExotic — Home screen (mobile)
// Sistema visual:
//   Display gótico:   "Pirata One" (titulares grandes, ritmo streetwear/tatuaje)
//   Blackletter:      "UnifrakturCook" (marcas y acentos rituales)
//   Sans cuerpo:      "Archivo" (texto, etiquetas)
//   Mono utilitario:  "JetBrains Mono" (códigos, contadores, sku)
//   Acento primario:  #B81414 — rojo gótico, sangre. CTA, badges, "vivo", contador.
//   Acento secund.:   #C0C0C0 — plateado para SKUs, líneas finas, toques premium.
//   Negro vivo:       mucho aire #0A0A0A; cards #141414 y #1E1E1E

const C = {
  bg:        '#0A0A0A',
  card:      '#141414',
  cardAlt:   '#1E1E1E',
  border:    '#2A2A2A',
  text:      '#FFFFFF',
  muted:     '#888888',
  fire:      '#B81414', // rojo gótico (antes naranja #B81414)
  fireDim:   '#5a0a0a',
  silver:    '#C0C0C0', // plateado para detalles premium
  silverDim: '#7a7a7a',
};

// — Tipografías reutilizables —
const FF = {
  goth:   '"Pirata One", "UnifrakturCook", serif',
  black:  '"UnifrakturCook", "Pirata One", serif',
  body:   '"Archivo", system-ui, sans-serif',
  mono:   '"JetBrains Mono", ui-monospace, monospace',
};

// — Grano sutil para texturizar fondos negros —
const GRAIN = `radial-gradient(rgba(255,255,255,0.018) 1px, transparent 1px) 0 0 / 3px 3px,
              radial-gradient(rgba(255,255,255,0.012) 1px, transparent 1px) 1px 2px / 4px 4px`;

// ─────────────────────────────────────────────────────────────
// Iconos (línea fina, 1.5px, herencia de color)
// ─────────────────────────────────────────────────────────────
const Icon = {
  menu: (s=22) => (
    <svg width={s} height={s} viewBox="0 0 22 22" fill="none">
      <path d="M2 6h18M2 11h12M2 16h18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square"/>
    </svg>
  ),
  bag: (s=22) => (
    <svg width={s} height={s} viewBox="0 0 22 22" fill="none">
      <path d="M4 7h14l-1 12H5L4 7z" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M8 7V5a3 3 0 1 1 6 0v2" stroke="currentColor" strokeWidth="1.4"/>
    </svg>
  ),
  search: (s=22) => (
    <svg width={s} height={s} viewBox="0 0 22 22" fill="none">
      <circle cx="10" cy="10" r="6" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M15 15l4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square"/>
    </svg>
  ),
  user: (s=22) => (
    <svg width={s} height={s} viewBox="0 0 22 22" fill="none">
      <circle cx="11" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M4 19c1.5-3.5 4.2-5 7-5s5.5 1.5 7 5" stroke="currentColor" strokeWidth="1.4"/>
    </svg>
  ),
  home: (s=22) => (
    <svg width={s} height={s} viewBox="0 0 22 22" fill="none">
      <path d="M3 10l8-6 8 6v9H3v-9z" stroke="currentColor" strokeWidth="1.4"/>
    </svg>
  ),
  flame: (s=14) => (
    <svg width={s} height={s} viewBox="0 0 14 14" fill="none">
      <path d="M7 13c2.8 0 4.5-2 4.5-4.5 0-2-1.5-3-2.5-5C8 5 6.5 5.5 5 7c-.8.8-1.5 2-1.5 3.5C3.5 12 4.8 13 7 13z"
        fill="currentColor"/>
    </svg>
  ),
};

// ─────────────────────────────────────────────────────────────
// Placeholder de imagen — gradiente + grano + sello "image"
// (en una build real reemplazas con foto editorial)
// ─────────────────────────────────────────────────────────────
function ImgPH({ label, tone = 'a', children, style }) {
  const tones = {
    a: 'radial-gradient(120% 80% at 70% 20%, #2a1208 0%, #0e0606 55%, #050202 100%)',
    b: 'radial-gradient(110% 90% at 30% 30%, #1a1a1a 0%, #0b0b0b 60%, #050505 100%)',
    c: 'radial-gradient(130% 90% at 50% 100%, #3a1505 0%, #160906 55%, #060303 100%)',
    d: 'linear-gradient(160deg, #1c1c1c 0%, #0a0a0a 60%, #060606 100%)',
    e: 'radial-gradient(80% 100% at 50% 20%, #221008 0%, #0a0606 55%, #030101 100%)',
  };
  return (
    <div style={{
      position: 'relative', overflow: 'hidden',
      background: tones[tone],
      ...style,
    }}>
      <div style={{ position:'absolute', inset:0, backgroundImage: GRAIN, mixBlendMode:'overlay', opacity:.5 }} />
      {/* viñeta */}
      <div style={{
        position:'absolute', inset:0,
        background:'radial-gradient(120% 120% at 50% 50%, transparent 50%, rgba(0,0,0,0.85) 100%)',
      }} />
      {/* sello discreto en esquina */}
      {label && (
        <div style={{
          position:'absolute', top:8, left:8, zIndex:2,
          fontFamily: FF.mono, fontSize:9, letterSpacing:'.12em',
          color: C.silver, opacity:.55, textTransform:'uppercase',
        }}>◦ {label}</div>
      )}
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Top bar — sticky, logo blackletter centrado, acciones a los lados
// ─────────────────────────────────────────────────────────────
function TopBar() {
  return (
    <div style={{
      position:'sticky', top:0, zIndex:10,
      background: 'rgba(10,10,10,0.86)',
      backdropFilter: 'blur(14px) saturate(140%)',
      WebkitBackdropFilter: 'blur(14px) saturate(140%)',
      borderBottom: `1px solid ${C.border}`,
      display:'grid', gridTemplateColumns:'1fr auto 1fr', alignItems:'center',
      padding:'12px 16px', color: C.text,
    }}>
      <div style={{ display:'flex', gap:14 }}>
        <button style={iconBtn}>{Icon.menu()}</button>
        <button style={iconBtn}>{Icon.search()}</button>
      </div>
      <div style={{ fontFamily: FF.black, fontSize: 26, lineHeight:1, letterSpacing:'.01em' }}>
        OnExotic
      </div>
      <div style={{ display:'flex', gap:14, justifyContent:'flex-end' }}>
        <button style={iconBtn}>{Icon.user()}</button>
        <div style={{ position:'relative' }}>
          <button style={iconBtn}>{Icon.bag()}</button>
          <div style={{
            position:'absolute', top:-2, right:-4,
            minWidth:16, height:16, padding:'0 4px', borderRadius:9,
            background: C.fire, color:'#fff',
            fontFamily: FF.mono, fontSize:10, fontWeight:700,
            display:'flex', alignItems:'center', justifyContent:'center',
          }}>2</div>
        </div>
      </div>
    </div>
  );
}
const iconBtn = {
  background:'transparent', border:'none', color:'inherit',
  padding:0, display:'flex', alignItems:'center', justifyContent:'center',
  cursor:'pointer',
};

// ─────────────────────────────────────────────────────────────
// HERO — Drop activo con countdown
// ─────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section style={{ position:'relative', height: 620, color: C.text }}>
      <ImgPH label="hero · drop 04" tone="a" style={{ position:'absolute', inset:0 }}>
        {/* trazos tribales decorativos */}
        <svg viewBox="0 0 400 620" preserveAspectRatio="none" style={{
          position:'absolute', inset:0, width:'100%', height:'100%', opacity:.35,
        }}>
          <defs>
            <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#B81414" stopOpacity=".0"/>
              <stop offset=".6" stopColor="#B81414" stopOpacity=".7"/>
              <stop offset="1" stopColor="#B81414" stopOpacity="0"/>
            </linearGradient>
          </defs>
          <path d="M-20 480 Q120 340 200 420 T 440 360" stroke="url(#g1)" strokeWidth="1.5" fill="none"/>
          <path d="M-20 510 Q120 380 200 460 T 440 400" stroke="url(#g1)" strokeWidth=".7" fill="none"/>
          <path d="M30 60 L80 60 M60 40 L60 90" stroke="#fff" strokeOpacity=".25" strokeWidth=".7"/>
        </svg>
        {/* silueta sugerida (placeholder de modelo) */}
        <div style={{
          position:'absolute', left:'50%', top:'8%', transform:'translateX(-50%)',
          width: 240, height: 480,
          background: 'radial-gradient(50% 60% at 50% 30%, rgba(184,20,20,.10) 0%, transparent 60%), linear-gradient(180deg, #160808 0%, #0a0303 100%)',
          border: `1px solid ${C.border}`,
          display:'flex', alignItems:'flex-end', justifyContent:'center',
          padding: 12,
        }}>
          <span style={{
            fontFamily: FF.mono, fontSize: 9, color: C.silver, opacity:.6,
            letterSpacing:'.2em', textTransform:'uppercase',
          }}>editorial · 1/1</span>
        </div>
      </ImgPH>

      {/* Overlay de copy */}
      <div style={{
        position:'absolute', inset:0,
        display:'flex', flexDirection:'column', justifyContent:'space-between',
        padding:'24px 20px 28px',
      }}>
        {/* TOP-OVERLAY: drop tag */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
          <div style={{
            display:'inline-flex', alignItems:'center', gap:8,
            padding:'6px 10px', border:`1px solid ${C.border}`,
            background:'rgba(10,10,10,0.55)', backdropFilter:'blur(8px)',
          }}>
            <span style={{
              width:6, height:6, borderRadius:99, background: C.fire,
              boxShadow:`0 0 8px ${C.fire}`,
            }}/>
            <span style={{ fontFamily: FF.mono, fontSize:10, letterSpacing:'.18em', textTransform:'uppercase' }}>
              Drop 04 · vivo
            </span>
          </div>
          <div style={{
            fontFamily: FF.mono, fontSize:10, letterSpacing:'.18em',
            color: C.silver, textTransform:'uppercase',
          }}>SS / 26 — LIMA</div>
        </div>

        {/* CENTRO + BOTTOM */}
        <div>
          <div style={{
            fontFamily: FF.mono, fontSize:10, letterSpacing:'.3em',
            color: C.silver, textTransform:'uppercase', marginBottom:10,
          }}>
            ✦ Capítulo 04
          </div>
          <h1 style={{
            margin:0, fontFamily: FF.black, fontWeight:400,
            fontSize: 82, lineHeight: .85, letterSpacing:'-.01em',
            textShadow:'0 4px 30px rgba(0,0,0,.6)',
          }}>
            Vengan&shy;za
          </h1>
          <p style={{
            margin:'14px 0 22px', maxWidth: 280,
            fontFamily: FF.body, fontSize:13, lineHeight:1.5, color:'#cfcfcf',
          }}>
            Te quitaron el algoritmo. <span style={{ color: C.fire }}>Recupéralo en cuero.</span>
            <br/>40 piezas. Sin restock. Sin clemencia.
          </p>

          {/* Countdown */}
          <div style={{
            display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:6,
            border:`1px solid ${C.border}`, borderLeft:`2px solid ${C.fire}`,
            background:'rgba(10,10,10,.6)', backdropFilter:'blur(8px)',
            padding:'10px 8px', marginBottom:18,
          }}>
            {[
              ['02', 'días'], ['14', 'hrs'], ['37', 'min'], ['09', 'seg'],
            ].map(([n,l]) => (
              <div key={l} style={{ textAlign:'center' }}>
                <div style={{
                  fontFamily: FF.mono, fontSize:22, fontWeight:600,
                  color: C.text, letterSpacing:'.04em',
                }}>{n}</div>
                <div style={{
                  fontFamily: FF.mono, fontSize:8, letterSpacing:'.22em',
                  color: C.silver, textTransform:'uppercase', marginTop:2,
                }}>{l}</div>
              </div>
            ))}
          </div>

          {/* CTA principal */}
          <a href="#drop" style={{
            display:'flex', alignItems:'center', justifyContent:'space-between',
            padding:'16px 18px', textDecoration:'none',
            background: C.fire, color:'#fff',
            fontFamily: FF.body, fontWeight:800, fontSize:13,
            letterSpacing:'.22em', textTransform:'uppercase',
            boxShadow:`0 0 0 1px ${C.fire}, 0 8px 30px rgba(184,20,20,.35)`,
          }}>
            <span>Entrar al drop</span>
            <span style={{ fontFamily: FF.mono, fontSize:14 }}>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Manifiesto en marquee tipográfico
// ─────────────────────────────────────────────────────────────
function Marquee() {
  const phrase = (
    <>
      <span style={{ color: C.text }}>NO ES MODA.&nbsp;</span>
      <span style={{ color: C.fire }}>ES JERARQUÍA.&nbsp;</span>
      <span style={{ color: C.text }}>NO ES MODA.&nbsp;</span>
      <span style={{ color: C.muted }}>ES JERARQUÍA.&nbsp;</span>
    </>
  );
  return (
    <div style={{
      borderTop:`1px solid ${C.border}`, borderBottom:`1px solid ${C.border}`,
      padding:'18px 0', overflow:'hidden', whiteSpace:'nowrap',
      background: C.bg,
    }}>
      <div style={{
        display:'inline-block', animation:'oxmarq 22s linear infinite',
        fontFamily: FF.goth, fontSize: 38, letterSpacing:'.01em',
      }}>
        {phrase}{phrase}{phrase}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Sección encabezado (eyebrow + título gótico + link)
// ─────────────────────────────────────────────────────────────
function SectionHead({ eye, title, link = 'VER TODO' }) {
  return (
    <div style={{ padding:'30px 20px 14px' }}>
      <div style={{
        fontFamily: FF.mono, fontSize:10, letterSpacing:'.28em',
        color: C.silver, textTransform:'uppercase', marginBottom: 8,
        display:'flex', alignItems:'center', gap:8,
      }}>
        <span style={{ width:14, height:1, background: C.fire }}/>
        {eye}
      </div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end' }}>
        <h2 style={{
          margin:0, fontFamily: FF.goth, fontWeight:400,
          fontSize: 42, lineHeight: .9, letterSpacing:'.005em',
        }}>{title}</h2>
        <a href="#" style={{
          color: C.text, textDecoration:'none',
          fontFamily: FF.mono, fontSize:10, letterSpacing:'.22em',
          textTransform:'uppercase', borderBottom:`1px solid ${C.fire}`,
          paddingBottom:2,
        }}>{link} →</a>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Producto card
// ─────────────────────────────────────────────────────────────
function ProductCard({ name, price, tone, tag, sku, sizes='S · M · L · XL', sold }) {
  return (
    <div style={{
      background: C.card, border:`1px solid ${C.border}`,
      display:'flex', flexDirection:'column',
    }}>
      <ImgPH tone={tone} label={sku} style={{ aspectRatio:'3 / 4', borderBottom:`1px solid ${C.border}` }}>
        {tag && (
          <div style={{
            position:'absolute', top:10, right:10,
            padding:'4px 7px', background: C.fire, color:'#fff',
            fontFamily: FF.mono, fontSize:9, fontWeight:700,
            letterSpacing:'.18em', textTransform:'uppercase',
          }}>{tag}</div>
        )}
        {sold && (
          <div style={{
            position:'absolute', bottom:10, left:10,
            padding:'4px 7px', background:'rgba(10,10,10,.7)',
            border:`1px solid ${C.border}`, color: C.text,
            fontFamily: FF.mono, fontSize:9, letterSpacing:'.18em',
          }}>{sold}</div>
        )}
        {/* prenda placeholder */}
        <div style={{
          position:'absolute', inset:'12% 22% 8% 22%',
          background:'linear-gradient(180deg, rgba(255,255,255,.04) 0%, transparent 60%), linear-gradient(180deg, #161616 0%, #0a0a0a 100%)',
          border:`1px solid #1a1a1a`,
        }}/>
      </ImgPH>
      <div style={{ padding:'12px 12px 14px', display:'flex', flexDirection:'column', gap:6 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline' }}>
          <div style={{ fontFamily: FF.body, fontSize:13, fontWeight:600, letterSpacing:'.04em', textTransform:'uppercase' }}>
            {name}
          </div>
          <div style={{ fontFamily: FF.mono, fontSize:12, color: C.text }}>{price}</div>
        </div>
        {/* línea plateada · separador premium + SKU */}
        <div style={{
          display:'flex', alignItems:'center', gap:8,
          fontFamily: FF.mono, fontSize:9, letterSpacing:'.2em',
          color: C.silver,
        }}>
          <span>{sizes}</span>
          <span style={{ flex:1, height:1, background: C.silver, opacity:.35 }}/>
        </div>
      </div>
    </div>
  );
}

function ProductGrid() {
  return (
    <div style={{
      padding:'4px 20px 20px', display:'grid',
      gridTemplateColumns:'1fr 1fr', gap:14,
    }}>
      <ProductCard
        name="Hoodie Cruz"  price="S/ 289"  tone="a"
        tag="nuevo" sku="OX-04-H01" sold="40 piezas"
      />
      <ProductCard
        name="Tee Liturgia" price="S/ 149"  tone="b"
        sku="OX-04-T02" sold="80 piezas"
      />
      <ProductCard
        name="Cargo Ritual" price="S/ 349"  tone="c"
        tag="último"  sku="OX-04-P03" sold="12 de 60"
      />
      <ProductCard
        name="Top Gym Ave"  price="S/ 119"  tone="d"
        sku="OX-04-G04" sold="agotándose"
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Categorías — cards apilados full bleed con titular gigante
// ─────────────────────────────────────────────────────────────
function CategoryCard({ no, name, count, tone, copy }) {
  return (
    <a href="#" style={{
      position:'relative', display:'block', textDecoration:'none',
      color: C.text, height: 180, overflow:'hidden',
      border:`1px solid ${C.border}`,
    }}>
      <ImgPH tone={tone} style={{ position:'absolute', inset:0 }}/>
      <div style={{
        position:'absolute', inset:0,
        padding:'14px 16px', display:'flex', flexDirection:'column', justifyContent:'space-between',
      }}>
        <div style={{
          display:'flex', justifyContent:'space-between',
          fontFamily: FF.mono, fontSize:10, color: C.silver, letterSpacing:'.22em', textTransform:'uppercase',
        }}>
          <span>{no}</span><span>{count}</span>
        </div>
        <div>
          <div style={{ fontFamily: FF.goth, fontSize:52, lineHeight:.9, letterSpacing:'.005em' }}>
            {name}
          </div>
          <div style={{
            display:'flex', justifyContent:'space-between', alignItems:'flex-end',
            marginTop:10,
          }}>
            <div style={{ fontFamily: FF.body, fontSize:12, color:'#cfcfcf', maxWidth:200 }}>
              {copy}
            </div>
            <div style={{
              fontFamily: FF.mono, fontSize:11, color: C.fire, letterSpacing:'.16em',
            }}>VER →</div>
          </div>
        </div>
      </div>
    </a>
  );
}
function Categories() {
  return (
    <div style={{ padding:'4px 20px 8px', display:'flex', flexDirection:'column', gap:12 }}>
      <CategoryCard no="◦ 01"  name="Gymwear"  count="14 piezas" tone="c"
        copy="Sudas. Sangras. Vuelves."/>
      <CategoryCard no="◦ 02"  name="Oversize" count="22 piezas" tone="a"
        copy="Cortes anchos. Silueta de culto."/>
      <CategoryCard no="◦ 03"  name="Rituales" count="9 piezas"  tone="e"
        copy="Accesorios para fieles."/>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Lookbook teaser — bloque editorial
// ─────────────────────────────────────────────────────────────
function Lookbook() {
  return (
    <section style={{
      margin:'14px 20px 0', position:'relative',
      border:`1px solid ${C.border}`, background: C.card,
    }}>
      <ImgPH tone="a" style={{ height: 280 }}>
        <div style={{
          position:'absolute', left:16, bottom:16, right:16,
          display:'flex', justifyContent:'space-between', alignItems:'flex-end',
        }}>
          <div>
            <div style={{
              fontFamily: FF.mono, fontSize:10, letterSpacing:'.22em',
              color: C.silver, textTransform:'uppercase', marginBottom:6,
            }}>Lookbook · SS26</div>
            <div style={{ fontFamily: FF.black, fontSize:48, lineHeight:.9 }}>
              Cuerpos<br/>de culto
            </div>
          </div>
          <div style={{
            border:`1px solid ${C.text}`, padding:'10px 12px',
            fontFamily: FF.mono, fontSize:10, letterSpacing:'.2em',
            textTransform:'uppercase',
          }}>ver +</div>
        </div>
      </ImgPH>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Newsletter — entrar al culto
// ─────────────────────────────────────────────────────────────
function Cult() {
  return (
    <section style={{
      margin:'24px 20px 18px', padding:'24px 20px',
      border:`1px solid ${C.border}`, background: C.cardAlt,
      position:'relative', overflow:'hidden',
    }}>
      <div style={{ position:'absolute', inset:0, backgroundImage: GRAIN, opacity:.4 }}/>
      <div style={{ position:'relative' }}>
        <div style={{
          fontFamily: FF.mono, fontSize:10, letterSpacing:'.28em',
          color: C.fire, textTransform:'uppercase', marginBottom:10,
        }}>
          ✦ acceso anticipado
        </div>
        <h3 style={{
          margin:0, fontFamily: FF.goth, fontSize:38, lineHeight:.9, letterSpacing:'.005em',
        }}>
          Entra al<br/>culto.
        </h3>
        <p style={{
          margin:'10px 0 16px', fontFamily: FF.body, fontSize:12, color: C.muted, lineHeight:1.6,
        }}>
          Los drops avisan a los fieles primero.<br/>
          Tú decides si llegas a tiempo.
        </p>
        <div style={{
          display:'flex', border:`1px solid ${C.border}`, background: C.bg,
        }}>
          <input
            placeholder="tu@correo.pe"
            style={{
              flex:1, background:'transparent', border:'none', outline:'none',
              padding:'14px 14px', color: C.text,
              fontFamily: FF.body, fontSize:13, letterSpacing:'.04em',
            }}
          />
          <button style={{
            background: C.text, color: C.bg, border:'none',
            padding:'0 18px', fontFamily: FF.body, fontWeight:800,
            fontSize:11, letterSpacing:'.22em', textTransform:'uppercase',
            cursor:'pointer',
          }}>Unirme</button>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Footer mini
// ─────────────────────────────────────────────────────────────
function FootCredits() {
  return (
    <div style={{
      padding:'22px 20px 28px', borderTop:`1px solid ${C.border}`,
      display:'flex', flexDirection:'column', gap:18,
    }}>
      <div style={{ fontFamily: FF.black, fontSize: 56, lineHeight:.9, letterSpacing:'.005em' }}>
        OnExotic
      </div>
      <div style={{
        display:'flex', justifyContent:'space-between',
        fontFamily: FF.mono, fontSize:10, letterSpacing:'.22em',
        color: C.silver, textTransform:'uppercase',
      }}>
        <span>Lima · PE</span>
        <span>Drop 04 / SS26</span>
      </div>
      <div style={{
        display:'grid', gridTemplateColumns:'1fr 1fr', gap:'6px 14px',
        fontFamily: FF.body, fontSize:12, color: C.text,
      }}>
        {['Tienda','Drops','Lookbook','Historia','Envíos','Contacto'].map(x=>(
          <a key={x} href="#" style={{ color:'inherit', textDecoration:'none', borderBottom:`1px solid ${C.border}`, paddingBottom:6 }}>{x}</a>
        ))}
      </div>
      <div style={{
        fontFamily: FF.mono, fontSize:9, color: C.silver, opacity:.6,
        letterSpacing:'.2em',
      }}>
        © 2026 ONEXOTIC SAC · HECHO EN PERÚ
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Bottom tab bar
// ─────────────────────────────────────────────────────────────
function TabBar() {
  const tabs = [
    { i: Icon.home,   l:'Inicio',   active:true },
    { i: Icon.search, l:'Catálogo' },
    { i: Icon.flame,  l:'Drop',     accent:true },
    { i: Icon.user,   l:'Cuenta' },
    { i: Icon.bag,    l:'Bolsa', badge: 2 },
  ];
  return (
    <div style={{
      position:'sticky', bottom:0, zIndex:10,
      background: 'rgba(10,10,10,0.92)',
      backdropFilter: 'blur(16px) saturate(160%)',
      borderTop:`1px solid ${C.border}`,
      display:'grid', gridTemplateColumns:'repeat(5,1fr)',
      padding:'10px 4px 16px',
    }}>
      {tabs.map((t,i)=>(
        <button key={i} style={{
          background:'transparent', border:'none',
          display:'flex', flexDirection:'column', alignItems:'center', gap:4,
          color: t.active ? C.text : C.muted,
          padding:'6px 0', position:'relative',
        }}>
          <div style={{
            color: t.accent ? C.fire : 'inherit',
            display:'flex', alignItems:'center', justifyContent:'center',
            width: 26, height: 26,
          }}>{t.i(t.accent ? 18 : 22)}</div>
          {t.badge && (
            <div style={{
              position:'absolute', top:2, right:'calc(50% - 18px)',
              minWidth:14, height:14, padding:'0 3px', borderRadius:8,
              background: C.fire, color:'#fff',
              fontFamily: FF.mono, fontSize:9, fontWeight:700,
              display:'flex', alignItems:'center', justifyContent:'center',
            }}>{t.badge}</div>
          )}
          <div style={{
            fontFamily: FF.mono, fontSize:8, letterSpacing:'.18em',
            textTransform:'uppercase',
          }}>{t.l}</div>
          {t.active && (
            <div style={{
              position:'absolute', top:0, width:18, height:2, background: C.fire,
            }}/>
          )}
        </button>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// HOME root
// ─────────────────────────────────────────────────────────────
function Home() {
  return (
    <div data-screen-label="Home" style={{
      background: C.bg, color: C.text, fontFamily: FF.body,
      minHeight: '100%', overflowY: 'auto',
    }}>
      <TopBar/>
      <Hero/>
      <Marquee/>

      <SectionHead eye="Capítulo 04 · piezas vivas" title="El drop"/>
      <ProductGrid/>

      <SectionHead eye="Cómo se viste el culto" title="Categorías" link="EXPLORAR"/>
      <Categories/>

      <SectionHead eye="Editorial" title="Lookbook" link="ABRIR"/>
      <Lookbook/>

      <Cult/>
      <FootCredits/>
      <TabBar/>
    </div>
  );
}

window.Home = Home;
