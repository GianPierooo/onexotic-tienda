// OnExotic — Lookbook · "Cuerpos de culto" SS26
// Estilo revista oscura: fotos full-bleed, copy editorial mínimo entre placas.

const LC = {
  bg:'#0A0A0A', card:'#141414', cardAlt:'#1E1E1E',
  border:'#2A2A2A', text:'#FFFFFF', muted:'#888888',
  fire:'#B81414', silver:'#C0C0C0', silverDim:'#7a7a7a',
};
const LF = {
  goth: '"Pirata One", serif',
  black:'"UnifrakturCook", serif',
  body: '"Archivo", system-ui, sans-serif',
  mono: '"JetBrains Mono", ui-monospace, monospace',
};
const L_GRAIN =
 `radial-gradient(rgba(255,255,255,0.022) 1px, transparent 1px) 0 0 / 3px 3px,
  radial-gradient(rgba(255,255,255,0.014) 1px, transparent 1px) 1px 2px / 4px 4px`;

// ─────────────── Iconos mínimos ───────────────
const LI = {
  back:  () => <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M14 4l-7 7 7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/></svg>,
  share: () => <svg width="20" height="20" viewBox="0 0 22 22" fill="none"><path d="M11 3v12M6 8l5-5 5 5M4 14v4h14v-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square"/></svg>,
  bag:   () => <svg width="20" height="20" viewBox="0 0 22 22" fill="none"><path d="M4 7h14l-1 12H5L4 7z" stroke="currentColor" strokeWidth="1.4"/><path d="M8 7V5a3 3 0 1 1 6 0v2" stroke="currentColor" strokeWidth="1.4"/></svg>,
  down:  () => <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 2v9M3 8l4 4 4-4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="square"/></svg>,
};

// ─────────────── Placeholder editorial full-bleed ───────────────
function Editorial({ tone='a', label, sub, look, height, alignH='center', alignV='center', children, style }) {
  const tones = {
    a:'radial-gradient(120% 80% at 30% 20%, #2a1208 0%, #0e0606 55%, #050202 100%)',
    b:'radial-gradient(110% 90% at 70% 30%, #1a1a1a 0%, #0b0b0b 60%, #050505 100%)',
    c:'radial-gradient(130% 90% at 50% 100%, #3a1505 0%, #160906 55%, #060303 100%)',
    d:'linear-gradient(160deg, #1c1c1c 0%, #0a0a0a 60%, #060606 100%)',
    e:'radial-gradient(80% 100% at 50% 20%, #221008 0%, #0a0606 55%, #030101 100%)',
    f:'radial-gradient(140% 90% at 20% 80%, #220e08 0%, #0c0606 55%, #050303 100%)',
    g:'linear-gradient(200deg, #161616 0%, #0a0a0a 50%, #050202 100%)',
    h:'radial-gradient(100% 70% at 80% 40%, #2a1010 0%, #100707 60%, #060303 100%)',
  };
  return (
    <div style={{
      position:'relative', overflow:'hidden',
      background: tones[tone],
      height: height || undefined,
      ...style,
    }}>
      {/* Grano sutil */}
      <div style={{ position:'absolute', inset:0, backgroundImage:L_GRAIN, mixBlendMode:'overlay', opacity:.55 }}/>
      {/* viñeta dramática */}
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(120% 120% at 50% 50%, transparent 45%, rgba(0,0,0,0.95) 100%)' }}/>
      {/* silueta sugerida */}
      <div style={{
        position:'absolute',
        left: alignH==='left' ? '12%' : alignH==='right' ? '50%' : '30%',
        right: alignH==='right' ? '12%' : undefined,
        top: alignV==='top' ? '6%' : '12%',
        bottom: alignV==='bottom' ? '4%' : '6%',
        background:'linear-gradient(180deg, rgba(255,255,255,.05) 0%, transparent 70%), linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%)',
        border:'1px solid #1a1a1a',
        width: alignH==='center' ? '40%' : '36%',
      }}/>

      {/* Look number badge */}
      {look && (
        <div style={{
          position:'absolute', top:18, left:18,
          fontFamily: LF.mono, fontSize:9.5, letterSpacing:'.32em',
          color: LC.silver, textTransform:'uppercase',
          display:'flex', alignItems:'center', gap:8,
        }}>
          <span style={{ width:18, height:1, background: LC.silver, opacity:.6 }}/>
          Look {look}
        </div>
      )}

      {/* Caption (bottom strip) */}
      {(label || sub) && (
        <div style={{
          position:'absolute', left:18, right:18, bottom:18, zIndex:2,
        }}>
          {label && (
            <div style={{
              fontFamily: LF.black, fontWeight:400, fontSize:36, lineHeight:.9,
              color: LC.text, letterSpacing:'.005em',
              textShadow:'0 4px 24px rgba(0,0,0,.6)',
            }}>{label}</div>
          )}
          {sub && (
            <div style={{
              marginTop:8, fontFamily: LF.mono, fontSize:9.5, letterSpacing:'.24em',
              color: LC.silver, textTransform:'uppercase',
            }}>{sub}</div>
          )}
        </div>
      )}
      {children}
    </div>
  );
}

// ─────────────── Header sticky mínimo ───────────────
function LHeader() {
  return (
    <div style={{
      position:'sticky', top:0, zIndex:30,
      background:'rgba(10,10,10,.78)',
      backdropFilter:'blur(14px) saturate(140%)',
      WebkitBackdropFilter:'blur(14px) saturate(140%)',
      borderBottom:`1px solid ${LC.border}`,
      display:'grid', gridTemplateColumns:'auto 1fr auto auto', gap:14,
      alignItems:'center', padding:'12px 16px',
    }}>
      <button style={{
        background:'transparent', border:'none', color:'#fff',
        padding:0, display:'flex', cursor:'pointer',
      }}><LI.back/></button>
      <div style={{
        fontFamily: LF.mono, fontSize:10, letterSpacing:'.32em',
        color: LC.silver, textTransform:'uppercase', textAlign:'center',
      }}>Lookbook · SS26</div>
      <button style={btn0}><LI.share/></button>
      <button style={btn0}><LI.bag/></button>
    </div>
  );
}
const btn0 = {
  background:'transparent', border:'none', color:'#fff',
  padding:0, display:'flex', cursor:'pointer',
};

// ─────────────── Cover ───────────────
function Cover() {
  return (
    <section style={{
      position:'relative', height:720, background: LC.bg, overflow:'hidden',
    }}>
      <Editorial tone="a" alignH="center" alignV="top" style={{ position:'absolute', inset:0 }}/>

      {/* tribal accent */}
      <svg viewBox="0 0 400 720" preserveAspectRatio="none" style={{
        position:'absolute', inset:0, width:'100%', height:'100%', opacity:.45,
      }}>
        <defs>
          <linearGradient id="lkc" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0"  stopColor={LC.fire}   stopOpacity="0"/>
            <stop offset=".55" stopColor={LC.fire}  stopOpacity=".7"/>
            <stop offset="1"  stopColor={LC.fire}   stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="lks" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0"  stopColor={LC.silver} stopOpacity="0"/>
            <stop offset=".5" stopColor={LC.silver} stopOpacity=".6"/>
            <stop offset="1"  stopColor={LC.silver} stopOpacity="0"/>
          </linearGradient>
        </defs>
        <line x1="40"  y1="200" x2="360" y2="200" stroke="url(#lks)" strokeWidth=".8"/>
        <line x1="200" y1="40"  x2="200" y2="170" stroke="url(#lks)" strokeWidth=".6"/>
        <path d="M-20 540 Q120 380 200 460 T 440 380" stroke="url(#lkc)" strokeWidth="1.2" fill="none"/>
        <path d="M-20 580 Q120 420 200 500 T 440 420" stroke="url(#lkc)" strokeWidth=".6" fill="none"/>
        <circle cx="200" cy="170" r="3" fill={LC.silver} opacity=".8"/>
      </svg>

      {/* Cover copy */}
      <div style={{
        position:'absolute', inset:0,
        display:'flex', flexDirection:'column', justifyContent:'space-between',
        padding:'40px 24px 32px',
      }}>
        {/* Top */}
        <div style={{ textAlign:'center' }}>
          <div style={{
            fontFamily: LF.mono, fontSize:9.5, letterSpacing:'.42em',
            color: LC.silver, textTransform:'uppercase',
            display:'inline-flex', alignItems:'center', gap:10,
          }}>
            <span style={{ width:18, height:1, background: LC.silver, opacity:.6 }}/>
            ✦ EDITORIAL Nº 04 ✦
            <span style={{ width:18, height:1, background: LC.silver, opacity:.6 }}/>
          </div>
        </div>

        {/* Center title */}
        <div style={{ textAlign:'center' }}>
          <h1 style={{
            margin:0, fontFamily: LF.black, fontWeight:400,
            fontSize: 86, lineHeight:.82, letterSpacing:'.005em',
            textWrap:'pretty', textShadow:'0 6px 40px rgba(0,0,0,.7)',
          }}>
            Cuerpos<br/>de culto
          </h1>
          <div style={{
            marginTop:18, fontFamily: LF.goth, fontWeight:400,
            fontSize: 22, color: LC.fire, letterSpacing:'.04em',
          }}>SS / 26 · Capítulo Venganza</div>
        </div>

        {/* Bottom credits */}
        <div style={{
          display:'flex', justifyContent:'space-between', alignItems:'flex-end',
        }}>
          <div style={{
            fontFamily: LF.mono, fontSize:9, color: LC.silver,
            letterSpacing:'.24em', textTransform:'uppercase',
          }}>
            <div>Lima · PE</div>
            <div style={{ color: LC.silverDim }}>Abril 2026</div>
          </div>
          <div style={{
            display:'inline-flex', alignItems:'center', gap:6,
            fontFamily: LF.mono, fontSize:9, color: LC.silver,
            letterSpacing:'.24em', textTransform:'uppercase',
          }}>
            <LI.down/> Desliza
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────── Manifiesto editorial ───────────────
function Manifesto() {
  return (
    <section style={{ padding:'72px 28px 64px', position:'relative' }}>
      {/* eyebrow */}
      <div style={{
        fontFamily: LF.mono, fontSize:9.5, color: LC.silver,
        letterSpacing:'.32em', textTransform:'uppercase', marginBottom:18,
        display:'flex', alignItems:'center', gap:10,
      }}>
        <span style={{ width:20, height:1, background: LC.fire }}/>
        ✦ Nota del director
      </div>

      <p style={{
        margin:0, fontFamily: LF.body, fontSize:15, lineHeight:1.6,
        color:'#dcdcdc', letterSpacing:'.01em', textWrap:'pretty',
      }}>
        Lima no perdona. <span style={{ color: LC.fire, fontWeight:700 }}>Tampoco esta colección.</span>
        Cuarenta cuerpos vestidos para resistir el algoritmo, el barrio
        y el silencio. Cada pieza pesa lo que pesa el ritual: <em>500
        gramos de venganza</em> contra la moda barata.
      </p>

      <div style={{
        marginTop:28, display:'flex', alignItems:'center', gap:14,
      }}>
        <div style={{ flex:1, height:1, background: LC.silver, opacity:.25 }}/>
        <span style={{
          fontFamily: LF.mono, fontSize:9, color: LC.silver,
          letterSpacing:'.32em', textTransform:'uppercase',
        }}>JS · Director</span>
        <div style={{ flex:1, height:1, background: LC.silver, opacity:.25 }}/>
      </div>
    </section>
  );
}

// ─────────────── Look full-bleed con créditos ───────────────
function LookFull({ no, tone, title, sub, model, location, sku, alignH }) {
  return (
    <section style={{ position:'relative' }}>
      <Editorial
        tone={tone} alignH={alignH || 'center'} alignV="bottom"
        height={680}
      />
      {/* OVERLAY */}
      <div style={{
        position:'absolute', inset:0, padding:'22px 22px 26px',
        display:'flex', flexDirection:'column', justifyContent:'space-between',
        pointerEvents:'none',
      }}>
        {/* TOP: look number */}
        <div style={{
          display:'flex', justifyContent:'space-between', alignItems:'flex-start',
        }}>
          <div style={{
            fontFamily: LF.mono, fontSize:10, letterSpacing:'.32em',
            color: LC.silver, textTransform:'uppercase',
            display:'flex', alignItems:'center', gap:10,
          }}>
            <span style={{ width:18, height:1, background: LC.silver, opacity:.6 }}/>
            Look {no}
          </div>
          <div style={{
            fontFamily: LF.mono, fontSize:9, letterSpacing:'.24em',
            color: LC.silver, textTransform:'uppercase', textAlign:'right',
            opacity:.85,
          }}>
            {sku}<br/>
            <span style={{ color: LC.silverDim }}>{location}</span>
          </div>
        </div>

        {/* BOTTOM: blackletter title */}
        <div>
          <h2 style={{
            margin:0, fontFamily: LF.black, fontWeight:400,
            fontSize: 56, lineHeight:.85, letterSpacing:'.005em',
            color: LC.text, textShadow:'0 4px 30px rgba(0,0,0,.7)',
            textWrap:'pretty',
          }}>{title}</h2>
          {sub && (
            <div style={{
              marginTop:10, fontFamily: LF.body, fontSize:13.5, color:'#cfcfcf',
              lineHeight:1.45, maxWidth:280, letterSpacing:'.02em',
            }}>{sub}</div>
          )}
          <div style={{
            marginTop:14, display:'flex', alignItems:'center', gap:10,
            fontFamily: LF.mono, fontSize:9, color: LC.silver,
            letterSpacing:'.24em', textTransform:'uppercase',
          }}>
            <span style={{ width:14, height:1, background: LC.fire }}/>
            Modelo · {model}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────── Pull quote spread ───────────────
function PullQuote({ q, attribution }) {
  return (
    <section style={{
      padding:'88px 26px 92px', textAlign:'center',
      borderTop:`1px solid ${LC.border}`,
      borderBottom:`1px solid ${LC.border}`,
      background: LC.cardAlt,
      position:'relative', overflow:'hidden',
    }}>
      <div style={{ position:'absolute', inset:0, backgroundImage:L_GRAIN, opacity:.4 }}/>
      <div style={{ position:'relative' }}>
        <div style={{
          fontFamily: LF.mono, fontSize:18, color: LC.fire,
          marginBottom: 14, letterSpacing:'.4em',
        }}>" "</div>
        <blockquote style={{
          margin:0, fontFamily: LF.goth, fontWeight:400,
          fontSize: 42, lineHeight:.95, letterSpacing:'.005em',
          color: LC.text, textWrap:'pretty',
        }}>
          {q}
        </blockquote>
        <div style={{
          marginTop:30, display:'inline-flex', alignItems:'center', gap:12,
        }}>
          <span style={{ width:18, height:1, background: LC.silver, opacity:.6 }}/>
          <span style={{
            fontFamily: LF.mono, fontSize:9.5, color: LC.silver,
            letterSpacing:'.32em', textTransform:'uppercase',
          }}>{attribution}</span>
          <span style={{ width:18, height:1, background: LC.silver, opacity:.6 }}/>
        </div>
      </div>
    </section>
  );
}

// ─────────────── Diptych (dos placas lado a lado) ───────────────
function Diptych({ left, right, caption }) {
  return (
    <section style={{ position:'relative' }}>
      <div style={{
        display:'grid', gridTemplateColumns:'1fr 1fr', gap:2,
        background: LC.border,
      }}>
        <Editorial tone={left.tone} height={460} alignH="left"/>
        <Editorial tone={right.tone} height={460} alignH="right"/>
      </div>
      {/* labels under */}
      <div style={{
        display:'grid', gridTemplateColumns:'1fr 1fr', gap:14,
        padding:'14px 22px 6px',
        fontFamily: LF.mono, fontSize:9, color: LC.silver,
        letterSpacing:'.22em', textTransform:'uppercase',
      }}>
        <div>
          <div>◦ {left.sku}</div>
          <div style={{ color: LC.silverDim, marginTop:3 }}>{left.l}</div>
        </div>
        <div style={{ textAlign:'right' }}>
          <div>{right.sku} ◦</div>
          <div style={{ color: LC.silverDim, marginTop:3 }}>{right.l}</div>
        </div>
      </div>

      {/* caption gótica */}
      {caption && (
        <div style={{ padding:'24px 22px 36px' }}>
          <div style={{
            fontFamily: LF.mono, fontSize:9.5, color: LC.silver,
            letterSpacing:'.32em', textTransform:'uppercase', marginBottom:10,
            display:'flex', alignItems:'center', gap:8,
          }}>
            <span style={{ width:14, height:1, background: LC.fire }}/>
            {caption.eye}
          </div>
          <h3 style={{
            margin:0, fontFamily: LF.goth, fontWeight:400,
            fontSize:34, lineHeight:.95, letterSpacing:'.005em',
          }}>{caption.title}</h3>
        </div>
      )}
    </section>
  );
}

// ─────────────── Editorial type spread (sin imagen) ───────────────
function TypeSpread({ eye, title, body }) {
  return (
    <section style={{
      padding:'88px 26px', background: LC.bg, textAlign:'center',
      borderTop:`1px dashed ${LC.border}`,
      borderBottom:`1px dashed ${LC.border}`,
    }}>
      <div style={{
        fontFamily: LF.mono, fontSize:9.5, color: LC.silver,
        letterSpacing:'.4em', textTransform:'uppercase', marginBottom:14,
      }}>{eye}</div>
      <h2 style={{
        margin:0, fontFamily: LF.black, fontWeight:400,
        fontSize: 70, lineHeight:.85, letterSpacing:'.005em',
        textWrap:'pretty',
      }}>{title}</h2>
      {body && (
        <p style={{
          margin:'24px auto 0', maxWidth:300,
          fontFamily: LF.body, fontSize:13.5, color:'#cfcfcf',
          lineHeight:1.55, letterSpacing:'.02em',
        }}>{body}</p>
      )}
    </section>
  );
}

// ─────────────── Look con panel lateral (imagen + texto) ───────────────
function LookPanel({ no, tone, title, body, sku, model, location }) {
  return (
    <section style={{ position:'relative' }}>
      <Editorial tone={tone} height={420} alignH="left"/>
      <div style={{ padding:'24px 22px 36px', background: LC.bg }}>
        <div style={{
          fontFamily: LF.mono, fontSize:10, color: LC.silver,
          letterSpacing:'.32em', textTransform:'uppercase', marginBottom:10,
          display:'flex', alignItems:'center', gap:10,
        }}>
          <span style={{ width:18, height:1, background: LC.fire }}/>
          Look {no} · {sku}
        </div>
        <h3 style={{
          margin:0, fontFamily: LF.black, fontWeight:400,
          fontSize: 44, lineHeight:.88, letterSpacing:'.005em',
        }}>{title}</h3>
        <p style={{
          margin:'14px 0 16px', fontFamily: LF.body, fontSize:13.5,
          lineHeight:1.6, color:'#cfcfcf', letterSpacing:'.01em',
        }}>{body}</p>
        <div style={{
          display:'flex', justifyContent:'space-between',
          paddingTop:14, borderTop:`1px solid ${LC.silver}`,
          fontFamily: LF.mono, fontSize:9, color: LC.silver,
          letterSpacing:'.22em', textTransform:'uppercase',
        }}>
          <span>Modelo · {model}</span>
          <span>{location}</span>
        </div>
      </div>
    </section>
  );
}

// ─────────────── Índice / créditos ───────────────
function Index() {
  const rows = [
    ['01','Hoodie Cruz · OX-04-H01',     'Mercado Central, Lima'],
    ['02','Cargo Ritual · OX-04-P03',    'Azotea · Chorrillos'],
    ['03','Tee Liturgia · OX-04-T02',    'Iglesia Las Nazarenas'],
    ['04','Joggers Cripta · OX-04-J06',  'Surquillo · esquina'],
    ['05','Top Gym Furia · OX-04-G10',   'Costa Verde · 6:42 am'],
    ['06','Hoodie Sermón · OX-04-H05',   'Av. Petit Thouars'],
  ];
  return (
    <section style={{
      padding:'52px 22px 24px',
      borderTop:`1px solid ${LC.border}`, background: LC.bg,
    }}>
      <div style={{
        fontFamily: LF.mono, fontSize:9.5, color: LC.silver,
        letterSpacing:'.32em', textTransform:'uppercase', marginBottom:10,
        display:'flex', alignItems:'center', gap:8,
      }}>
        <span style={{ width:14, height:1, background: LC.fire }}/>
        ✦ Índice
      </div>
      <h2 style={{
        margin:'0 0 22px', fontFamily: LF.goth, fontWeight:400,
        fontSize: 44, lineHeight:.9,
      }}>Los seis cuerpos</h2>

      <div>
        {rows.map(([n,name,loc],i,a)=>(
          <div key={n} style={{
            display:'grid', gridTemplateColumns:'30px 1fr auto', gap:14,
            alignItems:'baseline', padding:'14px 0',
            borderTop:`1px solid ${LC.silver}`,
            borderBottom: i===a.length-1 ? `1px solid ${LC.silver}` : 'none',
            opacity: i===0 ? 1 : 1,
          }}>
            <div style={{
              fontFamily: LF.mono, fontSize:13, color: LC.silver,
              letterSpacing:'.16em',
            }}>{n}</div>
            <div>
              <div style={{
                fontFamily: LF.body, fontSize:13.5, fontWeight:700,
                color: LC.text, letterSpacing:'.04em', textTransform:'uppercase',
              }}>{name.split('·')[0].trim()}</div>
              <div style={{
                marginTop:3, fontFamily: LF.mono, fontSize:9.5,
                color: LC.silver, letterSpacing:'.18em', textTransform:'uppercase',
              }}>{name.split('·')[1].trim()}</div>
            </div>
            <div style={{
              fontFamily: LF.mono, fontSize:9, color: LC.silverDim,
              letterSpacing:'.18em', textTransform:'uppercase', textAlign:'right',
              maxWidth:120,
            }}>{loc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─────────────── Créditos finales ───────────────
function Credits() {
  return (
    <section style={{
      padding:'40px 22px 64px', textAlign:'center',
      background: LC.bg,
    }}>
      <div style={{
        fontFamily: LF.mono, fontSize:9.5, color: LC.silver,
        letterSpacing:'.36em', textTransform:'uppercase', marginBottom:24,
      }}>
        ✦ Créditos ✦
      </div>

      <div style={{
        display:'grid', gridTemplateColumns:'auto 1fr', gap:'14px 18px',
        textAlign:'left', maxWidth:280, margin:'0 auto',
      }}>
        {[
          ['Dirección',  'Jose Sosa · @oxjs'],
          ['Foto',       'L. Quispe · @lkqsp'],
          ['Estilismo',  'M. Cárdenas'],
          ['Casting',    'Sangre Nueva'],
          ['Producción', 'Taller Gamarra'],
          ['Locación',   'Lima · varios'],
          ['Tipografía', 'UnifrakturCook / Pirata One'],
        ].map(([k,v])=>(
          <React.Fragment key={k}>
            <div style={{
              fontFamily: LF.mono, fontSize:9.5, color: LC.silver,
              letterSpacing:'.22em', textTransform:'uppercase',
            }}>{k}</div>
            <div style={{
              fontFamily: LF.body, fontSize:12.5, color: LC.text,
              letterSpacing:'.02em',
            }}>{v}</div>
          </React.Fragment>
        ))}
      </div>

      {/* Wordmark final */}
      <div style={{
        marginTop:56, fontFamily: LF.black, fontWeight:400,
        fontSize: 56, lineHeight:1, letterSpacing:'.005em',
      }}>OnExotic</div>
      <div style={{
        marginTop:12,
        fontFamily: LF.mono, fontSize:9, color: LC.silver, opacity:.6,
        letterSpacing:'.32em', textTransform:'uppercase',
      }}>
        © 2026 · Lima · SS26
      </div>

      {/* CTA: ver piezas */}
      <a href="#" style={{
        marginTop:36, display:'inline-flex', alignItems:'center', gap:14,
        padding:'16px 22px', textDecoration:'none',
        background: LC.fire, color:'#fff',
        fontFamily: LF.body, fontWeight:800, fontSize:12,
        letterSpacing:'.28em', textTransform:'uppercase',
        boxShadow:`0 8px 24px rgba(184,20,20,.3)`,
      }}>
        Comprar el capítulo <span style={{ fontFamily: LF.mono }}>→</span>
      </a>
    </section>
  );
}

// ─────────────── Lookbook root ───────────────
function Lookbook() {
  return (
    <div data-screen-label="Lookbook" style={{
      background: LC.bg, color: LC.text, fontFamily: LF.body,
      minHeight:'100%', overflowY:'auto',
    }}>
      <LHeader/>
      <Cover/>
      <Manifesto/>

      <LookFull
        no="01" tone="a"
        title={<>Cruz<br/>al pecho</>}
        sub="Hoodie 500 GSM. Algodón pesado. Bordado a tres dimensiones sobre el corazón."
        model="K. Pareja · @karenpareja"
        location="Mercado Central · 5:42 am"
        sku="OX-04-H01"
        alignH="left"
      />

      <TypeSpread
        eye="✦ Entre dos cuerpos"
        title={<>No es ropa.<br/>Es <span style={{ color: LC.fire }}>armadura.</span></>}
        body="Cada pieza nace de un sermón distinto. Cada cuerpo lo carga como suyo."
      />

      <Diptych
        left={ { tone:'c', sku:'OX-04-P03', l:'Cargo Ritual' } }
        right={{ tone:'h', sku:'OX-04-T02', l:'Tee Liturgia' } }
        caption={{ eye:'Look 02 · 03', title:'Vestir lo que pesa' }}
      />

      <PullQuote
        q={<>"Lima me vistió de negro<br/>para que nadie me viera caer."</>}
        attribution="K. Pareja · modelo · Look 01"
      />

      <LookFull
        no="04" tone="e"
        title={<>Cripta<br/>en movimiento</>}
        sub="Joggers de tiro alto, pretina elástica y bolsillos cargados con la noche."
        model="D. Rivera · @djr_lima"
        location="Surquillo · 9:17 pm"
        sku="OX-04-J06"
        alignH="right"
      />

      <LookPanel
        no="05" tone="d"
        title={<>Furia<br/>en frío.</>}
        body={<>Top técnico hecho para sudar y resistir. La frase del pecho — <em>«No piedad»</em> — es bordada, no estampada. Doble costura, cuello refuerzo.</>}
        sku="OX-04-G10"
        model="A. Mendoza"
        location="Costa Verde · 6:42 am"
      />

      <LookFull
        no="06" tone="f"
        title={<>Sermón<br/>de la calle</>}
        sub="Capucha doble forrada, cordón plano negro mate. El último capítulo del drop."
        model="J. Vega · @jotavega"
        location="Av. Petit Thouars · 11 pm"
        sku="OX-04-H05"
        alignH="left"
      />

      <PullQuote
        q={<>"El que no sangra,<br/>no entiende el corte."</>}
        attribution="Manifiesto OnExotic"
      />

      <Index/>
      <Credits/>
    </div>
  );
}

window.Lookbook = Lookbook;
