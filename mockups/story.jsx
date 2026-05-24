// OnExotic — Historia de marca · "Origen del culto"
// Long-read editorial: ¿quiénes somos / cómo nació la marca / valores / proceso / equipo.

const HC = {
  bg:'#0A0A0A', card:'#141414', cardAlt:'#1E1E1E',
  border:'#2A2A2A', text:'#FFFFFF', muted:'#888888',
  fire:'#B81414', silver:'#C0C0C0', silverDim:'#7a7a7a',
};
const HF = {
  goth: '"Pirata One", serif',
  black:'"UnifrakturCook", serif',
  body: '"Archivo", system-ui, sans-serif',
  mono: '"JetBrains Mono", ui-monospace, monospace',
};
const H_GRAIN =
 `radial-gradient(rgba(255,255,255,0.022) 1px, transparent 1px) 0 0 / 3px 3px,
  radial-gradient(rgba(255,255,255,0.014) 1px, transparent 1px) 1px 2px / 4px 4px`;

const HI = {
  back:  () => <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M14 4l-7 7 7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/></svg>,
  share: () => <svg width="20" height="20" viewBox="0 0 22 22" fill="none"><path d="M11 3v12M6 8l5-5 5 5M4 14v4h14v-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square"/></svg>,
  bag:   () => <svg width="20" height="20" viewBox="0 0 22 22" fill="none"><path d="M4 7h14l-1 12H5L4 7z" stroke="currentColor" strokeWidth="1.4"/><path d="M8 7V5a3 3 0 1 1 6 0v2" stroke="currentColor" strokeWidth="1.4"/></svg>,
  ig:    () => <svg width="14" height="14" viewBox="0 0 18 18" fill="none"><rect x="2" y="2" width="14" height="14" rx="3" stroke="currentColor" strokeWidth="1.3"/><circle cx="9" cy="9" r="3" stroke="currentColor" strokeWidth="1.3"/><circle cx="13.2" cy="4.8" r=".9" fill="currentColor"/></svg>,
  tk:    () => <svg width="14" height="14" viewBox="0 0 18 18" fill="none"><path d="M10 2v9.5a3 3 0 1 1-3-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/><path d="M10 2c0 2 1.8 3.5 4 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>,
};

// ─────────────── Placeholder de imagen ───────────────
function HImg({ tone='a', label, sub, children, style }) {
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
      <div style={{ position:'absolute', inset:0, backgroundImage:H_GRAIN, mixBlendMode:'overlay', opacity:.5 }}/>
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(120% 120% at 50% 50%, transparent 50%, rgba(0,0,0,0.9) 100%)' }}/>
      <div style={{
        position:'absolute', inset:'18% 28% 12% 28%',
        background:'linear-gradient(180deg, rgba(255,255,255,.04) 0%, transparent 60%), linear-gradient(180deg, #161616 0%, #0a0a0a 100%)',
        border:'1px solid #1a1a1a',
      }}/>
      {label && (
        <div style={{
          position:'absolute', top:10, left:10, zIndex:2,
          fontFamily: HF.mono, fontSize:9, letterSpacing:'.22em',
          color: HC.silver, opacity:.75, textTransform:'uppercase',
        }}>◦ {label}</div>
      )}
      {sub && (
        <div style={{
          position:'absolute', bottom:10, left:10, right:10, zIndex:2,
          fontFamily: HF.mono, fontSize:9, letterSpacing:'.22em',
          color: HC.silverDim, textTransform:'uppercase',
        }}>{sub}</div>
      )}
      {children}
    </div>
  );
}

// ─────────────── Header ───────────────
function HHeader() {
  return (
    <div style={{
      position:'sticky', top:0, zIndex:30,
      background:'rgba(10,10,10,.84)',
      backdropFilter:'blur(14px) saturate(140%)',
      WebkitBackdropFilter:'blur(14px) saturate(140%)',
      borderBottom:`1px solid ${HC.border}`,
      display:'grid', gridTemplateColumns:'auto 1fr auto auto', gap:14,
      alignItems:'center', padding:'12px 16px',
    }}>
      <button style={btn0}><HI.back/></button>
      <div style={{
        fontFamily: HF.mono, fontSize:10, letterSpacing:'.32em',
        color: HC.silver, textTransform:'uppercase', textAlign:'center',
      }}>Historia · OnExotic</div>
      <button style={btn0}><HI.share/></button>
      <button style={btn0}><HI.bag/></button>
    </div>
  );
}
const btn0 = {
  background:'transparent', border:'none', color:'#fff',
  padding:0, display:'flex', cursor:'pointer',
};

// ─────────────── Hero · cover de la historia ───────────────
function HHero() {
  return (
    <section style={{
      position:'relative', height: 640, overflow:'hidden',
    }}>
      <HImg tone="a" style={{ position:'absolute', inset:0 }}/>
      {/* tribal accents */}
      <svg viewBox="0 0 400 640" preserveAspectRatio="none" style={{
        position:'absolute', inset:0, width:'100%', height:'100%', opacity:.45,
      }}>
        <defs>
          <linearGradient id="hhs" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0"  stopColor={HC.silver} stopOpacity="0"/>
            <stop offset=".5" stopColor={HC.silver} stopOpacity=".6"/>
            <stop offset="1"  stopColor={HC.silver} stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="hhf" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0"  stopColor={HC.fire} stopOpacity="0"/>
            <stop offset=".5" stopColor={HC.fire} stopOpacity=".75"/>
            <stop offset="1"  stopColor={HC.fire} stopOpacity="0"/>
          </linearGradient>
        </defs>
        <line x1="40" y1="220" x2="360" y2="220" stroke="url(#hhs)" strokeWidth=".8"/>
        <line x1="200" y1="60" x2="200" y2="200" stroke="url(#hhs)" strokeWidth=".6"/>
        <path d="M-20 500 Q120 380 200 460 T 440 360" stroke="url(#hhf)" strokeWidth="1.2" fill="none"/>
        <circle cx="200" cy="200" r="2.5" fill={HC.silver} opacity=".8"/>
      </svg>

      <div style={{
        position:'absolute', inset:0, padding:'40px 24px 32px',
        display:'flex', flexDirection:'column', justifyContent:'space-between',
      }}>
        {/* top */}
        <div style={{ textAlign:'center' }}>
          <div style={{
            fontFamily: HF.mono, fontSize:9.5, letterSpacing:'.4em',
            color: HC.silver, textTransform:'uppercase',
            display:'inline-flex', alignItems:'center', gap:10,
          }}>
            <span style={{ width:18, height:1, background: HC.silver, opacity:.6 }}/>
            ✦ ORIGEN ✦
            <span style={{ width:18, height:1, background: HC.silver, opacity:.6 }}/>
          </div>
        </div>

        {/* center */}
        <div style={{ textAlign:'center' }}>
          <div style={{
            fontFamily: HF.mono, fontSize:9.5, color: HC.silver,
            letterSpacing:'.36em', textTransform:'uppercase', marginBottom: 12,
          }}>Lima · 2025 — hoy</div>

          <h1 style={{
            margin:0, fontFamily: HF.black, fontWeight:400,
            fontSize: 80, lineHeight:.82, letterSpacing:'.005em',
            textWrap:'pretty', textShadow:'0 6px 40px rgba(0,0,0,.7)',
          }}>
            Nacimos<br/>en la grieta.
          </h1>

          <p style={{
            margin:'22px auto 0', maxWidth: 290,
            fontFamily: HF.body, fontSize:13.5, lineHeight:1.55, color:'#cfcfcf',
          }}>
            La historia de cómo tres pendejos limeños
            <span style={{ color: HC.fire }}> convirtieron el barrio en altar.</span>
          </p>
        </div>

        {/* bottom: meta */}
        <div style={{
          display:'flex', justifyContent:'space-between',
          fontFamily: HF.mono, fontSize:9, color: HC.silver,
          letterSpacing:'.24em', textTransform:'uppercase',
        }}>
          <span>Lectura · 4 min</span>
          <span>04 capítulos</span>
        </div>
      </div>
    </section>
  );
}

// ─────────────── Marquee de números ───────────────
function StatsRibbon() {
  return (
    <section style={{
      borderTop:`1px solid ${HC.border}`,
      borderBottom:`1px solid ${HC.border}`,
      background: HC.cardAlt, position:'relative', overflow:'hidden',
    }}>
      <div style={{ position:'absolute', inset:0, backgroundImage:H_GRAIN, opacity:.35 }}/>
      <div style={{
        position:'relative', display:'grid', gridTemplateColumns:'1fr 1fr 1fr',
      }}>
        {[
          ['04', 'Capítulos lanzados'],
          ['180', 'Piezas vivas total'],
          ['2,400+', 'Fieles activos'],
        ].map(([n,l], i, a)=>(
          <div key={l} style={{
            padding:'24px 10px', textAlign:'center',
            borderRight: i<a.length-1 ? `1px solid ${HC.border}` : 'none',
          }}>
            <div style={{
              fontFamily: HF.goth, fontWeight:400, fontSize:36, lineHeight:1,
              letterSpacing:'.005em',
            }}>{n}</div>
            <div style={{
              marginTop:8, fontFamily: HF.mono, fontSize:8.5,
              color: HC.silver, letterSpacing:'.22em', textTransform:'uppercase',
            }}>{l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─────────────── Capítulo (chapter heading) ───────────────
function Chapter({ no, eye, title, children }) {
  return (
    <section style={{
      padding:'56px 22px 8px', borderTop:`1px dashed ${HC.border}`,
    }}>
      <div style={{
        display:'flex', alignItems:'baseline', gap:14, marginBottom:18,
      }}>
        <div style={{
          fontFamily: HF.goth, fontWeight:400, fontSize:48, lineHeight:1,
          color: HC.silver, letterSpacing:'.04em',
        }}>{no}</div>
        <div style={{ flex:1 }}>
          <div style={{
            fontFamily: HF.mono, fontSize:9.5, letterSpacing:'.32em',
            color: HC.silver, textTransform:'uppercase', marginBottom:6,
            display:'flex', alignItems:'center', gap:8,
          }}>
            <span style={{ width:14, height:1, background: HC.fire }}/>
            {eye}
          </div>
          <h2 style={{
            margin:0, fontFamily: HF.black, fontWeight:400,
            fontSize: 42, lineHeight:.88, letterSpacing:'.005em',
            textWrap:'pretty',
          }}>{title}</h2>
        </div>
      </div>
      {children}
    </section>
  );
}

// ─────────────── Párrafo editorial ───────────────
function P({ children, lede }) {
  return (
    <p style={{
      margin: lede ? '0 0 22px' : '0 0 18px',
      fontFamily: HF.body, fontSize: lede ? 15 : 13.5, lineHeight:1.65,
      color: lede ? '#e0e0e0' : '#cfcfcf', letterSpacing:'.01em',
      textWrap:'pretty',
    }}>{children}</p>
  );
}

// ─────────────── Capítulo 01 · El origen ───────────────
function Cap01() {
  return (
    <Chapter no="01" eye="Cómo empezó esto" title="Una cocina en San Borja.">
      <P lede>
        Tres amigos. Una máquina de coser prestada. Cuarenta soles
        para tela. Nada más.
      </P>
      <P>
        Era marzo del <b>2025</b>. <span style={{ color: HC.fire }}>Jose</span> había vuelto de
        Buenos Aires sin trabajo. <span style={{ color: HC.fire }}>Diego</span> tatuaba en su cuarto.
        <span style={{ color: HC.fire }}> Luana</span> diseñaba flyers para discotecas que no le pagaban.
        Los tres compartían una sola obsesión: la calle limeña tenía
        códigos visuales únicos en el mundo, y nadie los estaba
        vistiendo.
      </P>
      <P>
        Las primeras cinco piezas se hicieron a mano en la cocina
        de Luana. Se vendieron por DM en una semana. La sexta no la
        terminamos: el algodón se nos acabó.
      </P>

      <HImg tone="b" label="archivo · 2025" sub="Primera mesa de corte · San Borja"
        style={{ aspectRatio:'5/4', marginTop:14, border:`1px solid ${HC.border}` }}/>
    </Chapter>
  );
}

// ─────────────── Pull quote ───────────────
function HQuote({ q, who }) {
  return (
    <section style={{
      padding:'58px 24px', background: HC.cardAlt, position:'relative', overflow:'hidden',
      borderTop:`1px solid ${HC.border}`,
      borderBottom:`1px solid ${HC.border}`,
    }}>
      <div style={{ position:'absolute', inset:0, backgroundImage:H_GRAIN, opacity:.4 }}/>
      <div style={{ position:'relative', textAlign:'center' }}>
        <div style={{
          fontFamily: HF.mono, fontSize:20, color: HC.fire,
          marginBottom:10, letterSpacing:'.4em',
        }}>" "</div>
        <blockquote style={{
          margin:0, fontFamily: HF.goth, fontWeight:400,
          fontSize: 32, lineHeight:1, letterSpacing:'.005em',
          color: HC.text, textWrap:'pretty',
        }}>{q}</blockquote>
        <div style={{
          marginTop:24, display:'inline-flex', alignItems:'center', gap:10,
          fontFamily: HF.mono, fontSize:9.5, color: HC.silver,
          letterSpacing:'.32em', textTransform:'uppercase',
        }}>
          <span style={{ width:18, height:1, background: HC.silver, opacity:.6 }}/>
          {who}
          <span style={{ width:18, height:1, background: HC.silver, opacity:.6 }}/>
        </div>
      </div>
    </section>
  );
}

// ─────────────── Capítulo 02 · El nombre ───────────────
function Cap02() {
  return (
    <Chapter no="02" eye="Cómo se llamó" title={<>"OnExotic" no fue un nombre.<br/>Fue un insulto.</>}>
      <P>
        Un cliente nos escribió en agosto del 2025: <em>"sus diseños son
        muy <u>on exotic</u> para Lima, hermano"</em>. Quería decir
        excesivos. Quería decir <span style={{ color: HC.fire }}>fuera de lugar.</span>
      </P>
      <P>
        Nos quedamos con la palabra. La grafiamos como ataque.
        Si ser de Lima y vestir distinto era exótico, íbamos a
        empujar la línea hasta romperla.
      </P>

      <div style={{
        display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginTop:14,
      }}>
        <HImg tone="c" label="logo · v0" style={{ aspectRatio:'1/1', border:`1px solid ${HC.border}` }}/>
        <HImg tone="e" label="logo · hoy" style={{ aspectRatio:'1/1', border:`1px solid ${HC.silver}` }}/>
      </div>
      <div style={{
        marginTop:10, display:'grid', gridTemplateColumns:'1fr 1fr',
        fontFamily: HF.mono, fontSize:9, color: HC.silver,
        letterSpacing:'.22em', textTransform:'uppercase',
      }}>
        <span>v0 · marzo 2025</span>
        <span style={{ textAlign:'right' }}>v3 · abril 2026</span>
      </div>
    </Chapter>
  );
}

// ─────────────── Cronología ───────────────
function Timeline() {
  const milestones = [
    { d:'MAR 2025', t:'Pieza 01',     n:'Hoodie negro a mano, vendido en DM por S/ 140.' },
    { d:'AGO 2025', t:'El insulto',   n:'Un cliente nos llama "on exotic". Adoptamos el nombre.' },
    { d:'OCT 2025', t:'Drop 01',      n:'40 piezas. Se agotan en 6 horas. Sin restock.' },
    { d:'DIC 2025', t:'Taller',       n:'Tomamos un cuarto en Gamarra. Costureras de planta.' },
    { d:'ENE 2026', t:'Lookbook 01',  n:'Primera editorial. Modelos del barrio, fotos en 35mm.' },
    { d:'MAR 2026', t:'Comunidad',    n:'2,400 fieles. Lista de espera para cada drop.' },
    { d:'ABR 2026', t:'Drop 04',      n:'"Venganza". El capítulo más oscuro hasta hoy.', live:true },
  ];
  return (
    <section style={{ padding:'56px 22px 8px', borderTop:`1px dashed ${HC.border}` }}>
      <div style={{
        fontFamily: HF.mono, fontSize:9.5, color: HC.silver,
        letterSpacing:'.32em', textTransform:'uppercase', marginBottom:10,
        display:'flex', alignItems:'center', gap:8,
      }}>
        <span style={{ width:14, height:1, background: HC.fire }}/>
        Cronología
      </div>
      <h2 style={{
        margin:'0 0 26px', fontFamily: HF.black, fontWeight:400,
        fontSize: 44, lineHeight:.88,
      }}>Línea de sangre.</h2>

      <div style={{ position:'relative', paddingLeft:24 }}>
        {/* línea vertical */}
        <div style={{
          position:'absolute', left:6, top:6, bottom:6, width:1,
          background:`linear-gradient(180deg, ${HC.silver} 0%, ${HC.fire} 100%)`,
          opacity:.6,
        }}/>
        {milestones.map((m,i)=>(
          <div key={m.d} style={{
            position:'relative', paddingBottom:22,
          }}>
            {/* dot */}
            <div style={{
              position:'absolute', left:-22, top:6,
              width:9, height:9,
              background: m.live ? HC.fire : HC.silver,
              boxShadow: m.live ? `0 0 12px ${HC.fire}` : 'none',
              border:`2px solid ${HC.bg}`,
              transform:'rotate(45deg)',
            }}/>
            <div style={{
              fontFamily: HF.mono, fontSize:9.5, color: HC.silver,
              letterSpacing:'.28em', textTransform:'uppercase',
            }}>{m.d}{m.live && <span style={{ color: HC.fire, marginLeft:8 }}>● VIVO</span>}</div>
            <div style={{
              marginTop:4,
              fontFamily: HF.body, fontSize:15, fontWeight:800,
              letterSpacing:'.04em', textTransform:'uppercase',
            }}>{m.t}</div>
            <div style={{
              marginTop:4, fontFamily: HF.body, fontSize:12.5, color:'#cfcfcf',
              lineHeight:1.55,
            }}>{m.n}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─────────────── Valores / pilares ───────────────
function Pillars() {
  const items = [
    {
      no:'I',
      t:'Drops limitados, sin restock.',
      d:'Una pieza vendida es una pieza menos. Cuando se acaba, se acabó. Sin excepciones.',
    },
    {
      no:'II',
      t:'Hecho en Lima.',
      d:'Todo se corta y se cose en Gamarra. Sin maquila barata, sin intermediarios.',
    },
    {
      no:'III',
      t:'El cliente es fiel, no consumidor.',
      d:'Acceso anticipado, no descuentos. Comunidad, no segmentación.',
    },
    {
      no:'IV',
      t:'La calle manda.',
      d:'Las decisiones de diseño se toman caminando, no mirando dashboards.',
    },
  ];
  return (
    <section style={{ padding:'56px 22px 12px', borderTop:`1px dashed ${HC.border}` }}>
      <div style={{
        fontFamily: HF.mono, fontSize:9.5, color: HC.silver,
        letterSpacing:'.32em', textTransform:'uppercase', marginBottom:10,
        display:'flex', alignItems:'center', gap:8,
      }}>
        <span style={{ width:14, height:1, background: HC.fire }}/>
        ✦ Los cuatro juramentos
      </div>
      <h2 style={{
        margin:'0 0 24px', fontFamily: HF.black, fontWeight:400,
        fontSize: 44, lineHeight:.88,
      }}>Por qué somos así.</h2>

      <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
        {items.map((it,i)=>(
          <div key={it.no} style={{
            background: HC.card,
            border:`1px solid ${HC.border}`,
            borderLeft:`2px solid ${HC.fire}`,
            padding:'16px 16px',
            display:'grid', gridTemplateColumns:'48px 1fr', gap:14,
          }}>
            <div style={{
              fontFamily: HF.goth, fontWeight:400, fontSize:42, lineHeight:.9,
              color: HC.silver, letterSpacing:'.04em',
            }}>{it.no}</div>
            <div>
              <div style={{
                fontFamily: HF.body, fontSize:14, fontWeight:800,
                letterSpacing:'.04em', textTransform:'uppercase', color: HC.text,
              }}>{it.t}</div>
              <div style={{
                marginTop:6, fontFamily: HF.body, fontSize:12.5,
                color:'#cfcfcf', lineHeight:1.55,
              }}>{it.d}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─────────────── Proceso · 4 pasos ───────────────
function Process() {
  const steps = [
    ['01', 'Bocetar', 'Reunión los lunes. Una libreta. Sin Photoshop hasta el paso 03.'],
    ['02', 'Cortar',  'Patronaje en papel, prueba en algodón crudo. Si no cae, se rompe.'],
    ['03', 'Bordar',  'Bordado a mano de la pieza principal. Tres tintas máximo.'],
    ['04', 'Drop',    'Foto. Manifiesto. Aviso a los fieles. 40 piezas. Sin restock.'],
  ];
  return (
    <section style={{ padding:'56px 22px 18px', borderTop:`1px dashed ${HC.border}` }}>
      <div style={{
        fontFamily: HF.mono, fontSize:9.5, color: HC.silver,
        letterSpacing:'.32em', textTransform:'uppercase', marginBottom:10,
        display:'flex', alignItems:'center', gap:8,
      }}>
        <span style={{ width:14, height:1, background: HC.fire }}/>
        Proceso
      </div>
      <h2 style={{
        margin:'0 0 22px', fontFamily: HF.black, fontWeight:400,
        fontSize: 44, lineHeight:.88,
      }}>De la libreta<br/>al altar.</h2>

      <div style={{
        display:'grid', gridTemplateColumns:'1fr 1fr', gap:10,
      }}>
        {steps.map(([n,t,d])=>(
          <div key={n} style={{
            border:`1px solid ${HC.border}`, padding:'14px 12px',
            background: HC.card,
            display:'flex', flexDirection:'column', gap:8,
          }}>
            <div style={{
              display:'flex', alignItems:'center', justifyContent:'space-between',
            }}>
              <div style={{
                fontFamily: HF.goth, fontWeight:400, fontSize:30, lineHeight:1,
                color: HC.silver, letterSpacing:'.04em',
              }}>{n}</div>
              <div style={{ flex:1, marginLeft:10, height:1, background: HC.silver, opacity:.3 }}/>
            </div>
            <div style={{
              fontFamily: HF.body, fontSize:13, fontWeight:800,
              letterSpacing:'.06em', textTransform:'uppercase',
            }}>{t}</div>
            <div style={{
              fontFamily: HF.body, fontSize:11.5, color: HC.silver,
              lineHeight:1.5, letterSpacing:'.01em',
            }}>{d}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─────────────── Equipo ───────────────
function Team() {
  const members = [
    { ini:'JS', n:'Jose Sosa',     r:'Director · Pieza', tone:'a', ig:'@oxjs' },
    { ini:'DR', n:'Diego Ramos',   r:'Arte · Tinta',     tone:'c', ig:'@dramos.ink' },
    { ini:'LF', n:'Luana Flores',  r:'Diseño · Patrón',  tone:'b', ig:'@luflo' },
  ];
  return (
    <section style={{ padding:'56px 22px 18px', borderTop:`1px dashed ${HC.border}` }}>
      <div style={{
        fontFamily: HF.mono, fontSize:9.5, color: HC.silver,
        letterSpacing:'.32em', textTransform:'uppercase', marginBottom:10,
        display:'flex', alignItems:'center', gap:8,
      }}>
        <span style={{ width:14, height:1, background: HC.fire }}/>
        El altar
      </div>
      <h2 style={{
        margin:'0 0 22px', fontFamily: HF.black, fontWeight:400,
        fontSize: 44, lineHeight:.88,
      }}>Los tres que firman.</h2>

      <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
        {members.map(m=>(
          <div key={m.ini} style={{
            display:'grid', gridTemplateColumns:'82px 1fr', gap:14,
            background: HC.card, border:`1px solid ${HC.border}`,
            padding:'12px',
          }}>
            <HImg tone={m.tone} style={{ aspectRatio:'1/1', border:`1px solid ${HC.silver}` }}>
              <div style={{
                position:'absolute', inset:0,
                display:'flex', alignItems:'center', justifyContent:'center',
                fontFamily: HF.black, fontWeight:400, fontSize:32,
                color: HC.text, letterSpacing:'.02em',
              }}>{m.ini}</div>
            </HImg>
            <div style={{ display:'flex', flexDirection:'column', justifyContent:'center', gap:4 }}>
              <div style={{
                fontFamily: HF.goth, fontWeight:400, fontSize:26, lineHeight:1,
              }}>{m.n}</div>
              <div style={{
                fontFamily: HF.mono, fontSize:10, color: HC.silver,
                letterSpacing:'.22em', textTransform:'uppercase',
              }}>{m.r}</div>
              <div style={{
                marginTop:4,
                fontFamily: HF.mono, fontSize:9.5, color: HC.silver, opacity:.7,
                letterSpacing:'.16em',
                display:'inline-flex', alignItems:'center', gap:5,
              }}>
                <HI.ig/> {m.ig}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─────────────── Cierre + CTA ───────────────
function Close() {
  return (
    <section style={{
      padding:'74px 22px 32px', textAlign:'center',
      borderTop:`1px solid ${HC.border}`,
      background:`linear-gradient(180deg, ${HC.bg} 0%, #160707 100%)`,
      position:'relative', overflow:'hidden',
    }}>
      <div style={{ position:'absolute', inset:0, backgroundImage:H_GRAIN, opacity:.4 }}/>
      <div style={{
        position:'absolute', left:'50%', bottom:-80, transform:'translateX(-50%)',
        width:340, height:340, borderRadius:'50%',
        background:'radial-gradient(circle, rgba(184,20,20,.32) 0%, transparent 65%)',
      }}/>
      <div style={{ position:'relative' }}>
        <div style={{
          fontFamily: HF.mono, fontSize:9.5, color: HC.silver,
          letterSpacing:'.42em', textTransform:'uppercase', marginBottom: 12,
        }}>✦ Final ✦</div>

        <h2 style={{
          margin:0, fontFamily: HF.black, fontWeight:400,
          fontSize: 60, lineHeight:.85, letterSpacing:'.005em',
        }}>
          La calle<br/>nos hizo.<br/>
          <span style={{ color: HC.fire }}>El culto<br/>nos hace.</span>
        </h2>

        <p style={{
          margin:'24px auto 30px', maxWidth:280,
          fontFamily: HF.body, fontSize:13, lineHeight:1.55, color:'#cfcfcf',
        }}>
          Esto recién empieza. Si llegaste hasta acá,
          ya eres parte del próximo capítulo.
        </p>

        <a href="#" style={{
          display:'inline-flex', alignItems:'center', gap:14,
          padding:'18px 24px', textDecoration:'none',
          background: HC.fire, color:'#fff',
          fontFamily: HF.body, fontWeight:800, fontSize:12,
          letterSpacing:'.28em', textTransform:'uppercase',
          boxShadow:`0 10px 28px rgba(184,20,20,.35)`,
        }}>
          Entrar al culto <span style={{ fontFamily: HF.mono }}>→</span>
        </a>

        {/* Social ribbon */}
        <div style={{
          marginTop:46, display:'flex', justifyContent:'center', gap:14,
          fontFamily: HF.mono, fontSize:10, color: HC.silver,
          letterSpacing:'.24em', textTransform:'uppercase',
        }}>
          <span style={{ display:'inline-flex', alignItems:'center', gap:6 }}>
            <HI.ig/> @onexotic.pe
          </span>
          <span style={{ color: HC.silverDim }}>·</span>
          <span style={{ display:'inline-flex', alignItems:'center', gap:6 }}>
            <HI.tk/> @onexotic
          </span>
        </div>

        <div style={{
          marginTop:30,
          fontFamily: HF.black, fontWeight:400,
          fontSize: 56, lineHeight:1, letterSpacing:'.005em',
        }}>OnExotic</div>

        <div style={{
          marginTop:10,
          fontFamily: HF.mono, fontSize:9, color: HC.silver, opacity:.55,
          letterSpacing:'.32em', textTransform:'uppercase',
        }}>
          © 2026 · Lima · PE · Hecho con sangre
        </div>
      </div>
    </section>
  );
}

// ─────────────── Story root ───────────────
function Story() {
  return (
    <div data-screen-label="Historia" style={{
      background: HC.bg, color: HC.text, fontFamily: HF.body,
      minHeight:'100%', overflowY:'auto',
    }}>
      <HHeader/>
      <HHero/>
      <StatsRibbon/>
      <Cap01/>
      <HQuote
        q={<>"No queríamos<br/>una marca.<br/>Queríamos<br/>una iglesia."</>}
        who="Jose · Director"
      />
      <Cap02/>
      <Timeline/>
      <Pillars/>
      <Process/>
      <Team/>
      <Close/>
    </div>
  );
}

window.Story = Story;
