// OnExotic — Checkout (mobile)
// Paso 02/03 · contacto · envío · pago · confirmar.

const KC = {
  bg:'#0A0A0A', card:'#141414', cardAlt:'#1E1E1E',
  border:'#2A2A2A', text:'#FFFFFF', muted:'#888888',
  silver:    '#C0C0C0',
  silverDim: '#7a7a7a',
  fire:'#B81414',
};
const KF = {
  goth: '"Pirata One", serif',
  black:'"UnifrakturCook", serif',
  body: '"Archivo", system-ui, sans-serif',
  mono: '"JetBrains Mono", ui-monospace, monospace',
};
const K_GRAIN =
 `radial-gradient(rgba(255,255,255,0.018) 1px, transparent 1px) 0 0 / 3px 3px,
  radial-gradient(rgba(255,255,255,0.012) 1px, transparent 1px) 1px 2px / 4px 4px`;

// ─────────────── Iconos ───────────────
const KI = {
  back:  () => <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M14 4l-7 7 7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/></svg>,
  clock: () => <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.3"/><path d="M8 4v4l3 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="square"/></svg>,
  shield:() => <svg width="14" height="14" viewBox="0 0 22 22" fill="none"><path d="M11 2l8 3v5c0 5-3.5 9-8 10-4.5-1-8-5-8-10V5l8-3z" stroke="currentColor" strokeWidth="1.4"/><path d="M8 11l2.5 2.5L15 9" stroke="currentColor" strokeWidth="1.4"/></svg>,
  whats: () => <svg width="20" height="20" viewBox="0 0 22 22" fill="none"><path d="M3.2 18.8l1.2-4.1A8 8 0 1 1 11 19a8 8 0 0 1-3.7-.9l-4.1 1.1.0-.4z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/><path d="M8.2 7.8c.2-.5.6-.5.9-.5h.4c.2 0 .4 0 .6.4l.7 1.6c.1.3 0 .4 0 .6l-.4.5c-.1.2-.3.3-.1.6.6 1 1.5 1.9 2.6 2.4.3.1.5 0 .6-.1l.5-.6c.2-.2.3-.2.5-.1l1.5.7c.3.1.4.2.5.4.0.5-.2 1.1-.4 1.3-.4.4-1.4.7-2 .6-.5-.1-1.2-.3-3.4-1.6-2.3-1.4-3.3-3-3.6-3.4-.3-.4-.5-1.0-.5-1.6 0-.6.4-1 .6-1.2z" fill="currentColor"/></svg>,
  chev:  () => <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M3 4l2.5 3L8 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square"/></svg>,
  chevUp:() => <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M3 7l2.5-3L8 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square"/></svg>,
  copy:  () => <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><rect x="3" y="3" width="8" height="8" stroke="currentColor" strokeWidth="1.2"/><path d="M3 6V2h6" stroke="currentColor" strokeWidth="1.2"/></svg>,
  check: () => <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square"/></svg>,
  truck: () => <svg width="16" height="16" viewBox="0 0 22 22" fill="none"><rect x="2" y="6" width="11" height="9" stroke="currentColor" strokeWidth="1.3"/><path d="M13 9h4l3 3v3h-7V9z" stroke="currentColor" strokeWidth="1.3"/><circle cx="6" cy="16" r="1.6" stroke="currentColor" strokeWidth="1.3"/><circle cx="16" cy="16" r="1.6" stroke="currentColor" strokeWidth="1.3"/></svg>,
  globe: () => <svg width="14" height="14" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.3"/><path d="M2 9h14M9 2c2.5 3 2.5 11 0 14M9 2c-2.5 3-2.5 11 0 14" stroke="currentColor" strokeWidth="1.3"/></svg>,
  store: () => <svg width="14" height="14" viewBox="0 0 18 18" fill="none"><path d="M2 4h14l-1 4H3L2 4zM3 8v8h12V8M7 16v-5h4v5" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/></svg>,
};

// ─────────────── Header con stepper ───────────────
function KHeader() {
  return (
    <div style={{
      position:'sticky', top:0, zIndex:20,
      background:'rgba(10,10,10,.92)',
      backdropFilter:'blur(14px) saturate(140%)',
      WebkitBackdropFilter:'blur(14px) saturate(140%)',
      borderBottom:`1px solid ${KC.border}`,
    }}>
      <div style={{
        display:'grid', gridTemplateColumns:'auto 1fr auto', gap:14,
        alignItems:'center', padding:'12px 16px',
      }}>
        <button style={btnZ}><KI.back/></button>
        <div style={{
          fontFamily:KF.mono, fontSize:10, letterSpacing:'.24em',
          color:KC.silver, textTransform:'uppercase', textAlign:'center',
        }}>Checkout · paso 02 / 03</div>
        <div style={{
          display:'inline-flex', alignItems:'center', gap:6,
          padding:'5px 8px', border:`1px solid ${KC.fire}`,
          fontFamily:KF.mono, fontSize:9, letterSpacing:'.2em',
          color:KC.fire, textTransform:'uppercase',
        }}>
          <KI.clock/> 14:23
        </div>
      </div>

      {/* título + stepper */}
      <div style={{ padding:'4px 16px 16px' }}>
        <div style={{
          fontFamily:KF.mono, fontSize:10, letterSpacing:'.28em',
          color:KC.silver, textTransform:'uppercase',
          display:'flex', alignItems:'center', gap:8, marginBottom:6,
        }}>
          <span style={{ width:14, height:1, background:KC.fire }}/>
          Capítulo 04 · 3 piezas
        </div>
        <h1 style={{
          margin:0, fontFamily:KF.black, fontWeight:400,
          fontSize: 54, lineHeight:.9, letterSpacing:'.005em',
        }}>Pacto final</h1>

        {/* Stepper */}
        <div style={{
          display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8,
          marginTop:18,
        }}>
          {[
            { n:'01', l:'Bolsa',       state:'done' },
            { n:'02', l:'Envío y pago', state:'active' },
            { n:'03', l:'Confirmación', state:'pending' },
          ].map((s,i)=>{
            const c = s.state==='active' ? KC.fire : (s.state==='done' ? KC.text : KC.muted);
            return (
              <div key={i} style={{
                borderTop:`2px solid ${s.state==='pending' ? KC.border : c}`,
                paddingTop:8,
              }}>
                <div style={{
                  fontFamily:KF.mono, fontSize:9, color:c,
                  letterSpacing:'.22em',
                }}>{s.n}</div>
                <div style={{
                  marginTop:2,
                  fontFamily:KF.body, fontSize:11,
                  fontWeight: s.state==='active' ? 800 : 600,
                  letterSpacing:'.04em', textTransform:'uppercase',
                  color: s.state==='pending' ? KC.muted : KC.text,
                }}>{s.l}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
const btnZ = {
  background:'transparent', border:'none', color:'#fff',
  padding:0, display:'flex', cursor:'pointer',
};

// ─────────────── Sección con título ritual ───────────────
function Section({ no, eye, title, children, right }) {
  return (
    <section style={{
      borderTop:`1px solid ${KC.border}`, padding:'24px 20px 6px',
    }}>
      <div style={{
        display:'flex', justifyContent:'space-between', alignItems:'baseline',
        marginBottom:14,
      }}>
        <div>
          <div style={{
            fontFamily:KF.mono, fontSize:10, letterSpacing:'.28em',
            color:KC.silver, textTransform:'uppercase', marginBottom:6,
            display:'flex', alignItems:'center', gap:8,
          }}>
            <span style={{ width:14, height:1, background:KC.fire }}/>
            ◦ {no} {eye}
          </div>
          <h2 style={{
            margin:0, fontFamily:KF.goth, fontWeight:400,
            fontSize:30, lineHeight:.95,
          }}>{title}</h2>
        </div>
        {right}
      </div>
      {children}
    </section>
  );
}

// ─────────────── Resumen pequeño plegable ───────────────
function MiniSummary({ subtotal, discount, shipping, total }) {
  return (
    <section style={{
      margin:'14px 16px 0', background:KC.card, border:`1px solid ${KC.border}`,
      overflow:'hidden',
    }}>
      <button style={{
        width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center',
        padding:'14px 14px', background:'transparent', border:'none',
        color:KC.text, cursor:'pointer',
      }}>
        <div style={{ textAlign:'left' }}>
          <div style={{
            fontFamily:KF.mono, fontSize:10, color:KC.silver,
            letterSpacing:'.22em', textTransform:'uppercase',
          }}>Tu ofrenda · 3 piezas</div>
          <div style={{
            marginTop:4, fontFamily:KF.body, fontSize:18, fontWeight:800,
            letterSpacing:'.02em',
          }}>S/ {total}</div>
        </div>
        <span style={{ color:KC.muted, display:'inline-flex', alignItems:'center', gap:6 }}>
          <span style={{ fontFamily:KF.mono, fontSize:10, letterSpacing:'.2em' }}>VER</span>
          <KI.chev/>
        </span>
      </button>
      {/* línea con items mini */}
      <div style={{
        display:'flex', gap:6, padding:'0 14px 14px',
      }}>
        {['a','b','c'].map((t,i)=>(
          <div key={i} style={{
            width:44, height:44,
            background: t==='a'
              ? 'radial-gradient(120% 80% at 70% 20%, #2a1208 0%, #0e0606 55%, #050202 100%)'
              : t==='b'
              ? 'radial-gradient(110% 90% at 30% 30%, #1a1a1a 0%, #0b0b0b 60%, #050505 100%)'
              : 'radial-gradient(130% 90% at 50% 100%, #3a1505 0%, #160906 55%, #060303 100%)',
            border:`1px solid ${KC.border}`,
            position:'relative',
          }}>
            <div style={{
              position:'absolute', inset:'18% 28% 12% 28%',
              background:'linear-gradient(180deg, rgba(255,255,255,.05) 0%, transparent 60%), #161616',
              border:'1px solid #1a1a1a',
            }}/>
          </div>
        ))}
        <div style={{ flex:1, alignSelf:'center' }}>
          <div style={{
            fontFamily:KF.mono, fontSize:9.5, color:KC.silver,
            letterSpacing:'.16em', textTransform:'uppercase',
          }}>
            Subtotal S/ 686 · Desc. − S/ 60 · Envío gratis
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────── Inputs / campos ───────────────
function Field({ label, value, placeholder, hint, right, half }) {
  return (
    <label style={{
      display:'block',
      gridColumn: half ? 'auto' : '1 / -1',
    }}>
      <div style={{
        fontFamily:KF.mono, fontSize:9.5, color:KC.silver,
        letterSpacing:'.22em', textTransform:'uppercase', marginBottom:6,
        display:'flex', justifyContent:'space-between',
      }}>
        <span>{label}</span>
        {hint && <span style={{ color: hint==='ok' ? KC.fire : KC.muted }}>
          {hint==='ok' ? '✓ válido' : hint}
        </span>}
      </div>
      <div style={{
        display:'flex', alignItems:'center',
        border:`1px solid ${KC.border}`, background:KC.card,
      }}>
        <input
          defaultValue={value}
          placeholder={placeholder}
          style={{
            flex:1, background:'transparent', border:'none', outline:'none',
            padding:'14px 14px', color:KC.text,
            fontFamily:KF.body, fontSize:13.5, letterSpacing:'.02em',
          }}
        />
        {right && <div style={{ paddingRight:12, color:KC.muted, display:'flex' }}>{right}</div>}
      </div>
    </label>
  );
}

// ─────────────── Contacto ───────────────
function Contacto() {
  return (
    <Section
      no="01" eye="Contacto" title="Quién recibe"
      right={
        <a href="#" style={{
          color:KC.fire, textDecoration:'none',
          fontFamily:KF.mono, fontSize:10, letterSpacing:'.2em',
          textTransform:'uppercase', borderBottom:`1px solid ${KC.fire}`, paddingBottom:2,
        }}>Ingresa →</a>
      }
    >
      <div style={{ display:'grid', gap:10 }}>
        <Field label="Correo del fiel" value="jose@onexotic.pe" hint="ok"/>
        <Field label="Celular · WhatsApp" value="+51 945 218 304" hint="ok"/>
      </div>
      <label style={{
        display:'flex', alignItems:'center', gap:10, marginTop:14, cursor:'pointer',
      }}>
        <span style={{
          width:18, height:18, border:`1px solid ${KC.fire}`,
          background: KC.fire, color:'#fff',
          display:'flex', alignItems:'center', justifyContent:'center',
        }}><KI.check/></span>
        <span style={{
          fontFamily:KF.body, fontSize:12, color:'#cfcfcf', letterSpacing:'.02em',
        }}>Avísame por WhatsApp cuando salga del taller.</span>
      </label>
    </Section>
  );
}

// ─────────────── Zona y envío ───────────────
function Envio() {
  const zones = [
    { id:'pe',  l:'Perú',         sub:'24 ciudades', active:true },
    { id:'int', l:'Internacional', sub:'10 países',   active:false },
  ];
  return (
    <Section no="02" eye="Envío" title="A dónde llega">
      {/* Zona toggle */}
      <div style={{
        display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, marginBottom:14,
      }}>
        {zones.map(z=>(
          <button key={z.id} style={{
            padding:'14px 14px', textAlign:'left',
            background: z.active ? KC.text : 'transparent',
            color: z.active ? KC.bg : KC.text,
            border: `1px solid ${z.active ? KC.text : KC.border}`,
            cursor:'pointer',
            display:'flex', flexDirection:'column', gap:4,
          }}>
            <span style={{ display:'flex', alignItems:'center', gap:8 }}>
              <span style={{ color: z.active ? KC.bg : KC.muted, display:'flex' }}>
                {z.id==='pe' ? <KI.truck/> : <KI.globe/>}
              </span>
              <span style={{
                fontFamily:KF.body, fontSize:13, fontWeight:800,
                letterSpacing:'.06em', textTransform:'uppercase',
              }}>{z.l}</span>
            </span>
            <span style={{
              fontFamily:KF.mono, fontSize:9.5, letterSpacing:'.18em',
              color: z.active ? '#3a3a3a' : KC.muted,
              textTransform:'uppercase',
            }}>{z.sub}</span>
          </button>
        ))}
      </div>

      {/* Campos */}
      <div style={{
        display:'grid', gridTemplateColumns:'1fr 1fr', gap:10,
      }}>
        <Field label="Departamento" value="Lima" right={<KI.chev/>} half/>
        <Field label="Distrito"     value="Miraflores" right={<KI.chev/>} half/>
        <Field label="Dirección"    value="Av. Larco 1232, dpto 802"/>
        <Field label="Referencia"   value="Edificio rojo, frente al parque"/>
        <Field label="DNI / RUC" value="74 218 304" half/>
        <Field label="Código postal" value="15074" half/>
      </div>

      {/* Métodos de envío */}
      <div style={{ marginTop:18 }}>
        <div style={{
          fontFamily:KF.mono, fontSize:9.5, color:KC.silver,
          letterSpacing:'.22em', textTransform:'uppercase', marginBottom:8,
        }}>Método</div>
        <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
          {[
            { id:'olva',  i:<KI.truck/>, t:'Olva Courier', d:'2–3 días hábiles · Lima', p:'Gratis', active:true, badge:'incluido' },
            { id:'sh',    i:<KI.truck/>, t:'Shalom Express',d:'24 h · provincias',     p:'S/ 18' },
            { id:'rec',   i:<KI.store/>, t:'Recojo en tienda',d:'Av. Petit Thouars 5021, Lince', p:'S/ 0' },
          ].map(o=>(
            <label key={o.id} style={{
              display:'flex', alignItems:'center', gap:12, cursor:'pointer',
              padding:'14px', background: o.active ? KC.cardAlt : KC.card,
              border:`1px solid ${o.active ? KC.fire : KC.border}`,
              borderLeft: o.active ? `2px solid ${KC.fire}` : `1px solid ${KC.border}`,
            }}>
              <span style={{
                width:18, height:18, borderRadius:99,
                border:`1.5px solid ${o.active ? KC.fire : KC.border}`,
                display:'flex', alignItems:'center', justifyContent:'center',
                flex:'0 0 auto',
              }}>
                {o.active && <span style={{ width:8, height:8, borderRadius:99, background:KC.fire }}/>}
              </span>
              <span style={{ color: o.active ? KC.fire : KC.muted, display:'flex' }}>{o.i}</span>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{
                  fontFamily:KF.body, fontSize:12.5, fontWeight:700,
                  letterSpacing:'.04em', textTransform:'uppercase',
                }}>{o.t}</div>
                <div style={{
                  fontFamily:KF.mono, fontSize:9.5, color:KC.muted,
                  marginTop:2, letterSpacing:'.04em',
                }}>{o.d}</div>
              </div>
              <div style={{ textAlign:'right' }}>
                <div style={{
                  fontFamily:KF.body, fontSize:13, fontWeight:700,
                  color: o.p==='Gratis' ? KC.fire : KC.text,
                  letterSpacing:'.04em',
                }}>{o.p}</div>
                {o.badge && (
                  <div style={{
                    fontFamily:KF.mono, fontSize:8.5, color:KC.silver,
                    letterSpacing:'.18em', textTransform:'uppercase', marginTop:2,
                  }}>{o.badge}</div>
                )}
              </div>
            </label>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─────────────── Logo bricks de pago ───────────────
function YapeLogo() {
  return (
    <div style={{
      width:42, height:42, borderRadius:8,
      background:'#7B2BFF', color:'#fff',
      display:'flex', alignItems:'center', justifyContent:'center',
      fontFamily:KF.body, fontWeight:900, fontSize:11, letterSpacing:'.04em',
    }}>Yape</div>
  );
}
function PlinLogo() {
  return (
    <div style={{
      width:42, height:42, borderRadius:8,
      background:'#00B7C7', color:'#04141a',
      display:'flex', alignItems:'center', justifyContent:'center',
      fontFamily:KF.body, fontWeight:900, fontSize:11, letterSpacing:'.04em',
    }}>plin</div>
  );
}
function CardLogo() {
  return (
    <div style={{
      width:42, height:42, borderRadius:8,
      background:'#0a0a0a', border:`1px solid ${KC.border}`,
      display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:3,
    }}>
      <div style={{ display:'flex', gap:2 }}>
        <span style={{ width:10, height:6, background:'#FF5F00', borderRadius:99 }}/>
        <span style={{ width:10, height:6, background:'#EB001B', borderRadius:99, marginLeft:-4, opacity:.85 }}/>
      </div>
      <span style={{ fontFamily:KF.mono, fontSize:7, color:KC.muted, letterSpacing:'.16em' }}>VISA · MC</span>
    </div>
  );
}
function WAlogo() {
  return (
    <div style={{
      width:42, height:42, borderRadius:8,
      background:'#0e3325', color:'#25D366',
      display:'flex', alignItems:'center', justifyContent:'center',
    }}><KI.whats/></div>
  );
}

// ─────────────── Métodos de pago ───────────────
function Pago() {
  return (
    <Section no="03" eye="Pago" title="Cómo pagas el pacto">
      <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
        <PayOpt id="yape" logo={<YapeLogo/>} t="Yape" d="Transferencia móvil" extra="Sin comisión" active expanded/>
        <PayOpt id="plin" logo={<PlinLogo/>} t="Plin" d="Interbancario móvil"/>
        <PayOpt id="card" logo={<CardLogo/>} t="Tarjeta" d="Visa · Mastercard · Hasta 3 cuotas" extra="Cuotas"/>
        <PayOpt id="wa"   logo={<WAlogo/>}    t="WhatsApp" d="Coordina con un fiel del taller" extra="Manual"/>
      </div>

      {/* Acepto */}
      <label style={{
        display:'flex', alignItems:'flex-start', gap:10, marginTop:16, cursor:'pointer',
      }}>
        <span style={{
          width:18, height:18, border:`1px solid ${KC.border}`,
          background:KC.card, color:'transparent', flex:'0 0 auto',
          display:'flex', alignItems:'center', justifyContent:'center',
        }}/>
        <span style={{
          fontFamily:KF.body, fontSize:11.5, color:KC.muted, letterSpacing:'.02em', lineHeight:1.5,
        }}>
          Acepto los <span style={{ color:KC.text, textDecoration:'underline' }}>términos del culto</span> y
          la <span style={{ color:KC.text, textDecoration:'underline' }}>política de privacidad</span>.
          Mis piezas no tienen restock.
        </span>
      </label>
    </Section>
  );
}

function PayOpt({ logo, t, d, extra, active, expanded }) {
  return (
    <div style={{
      background: active ? KC.cardAlt : KC.card,
      border:`1px solid ${active ? KC.fire : KC.border}`,
      borderLeft: active ? `2px solid ${KC.fire}` : `1px solid ${KC.border}`,
    }}>
      <label style={{
        display:'flex', alignItems:'center', gap:12, cursor:'pointer',
        padding:'12px 14px',
      }}>
        <span style={{
          width:18, height:18, borderRadius:99,
          border:`1.5px solid ${active ? KC.fire : KC.border}`,
          display:'flex', alignItems:'center', justifyContent:'center',
          flex:'0 0 auto',
        }}>
          {active && <span style={{ width:8, height:8, borderRadius:99, background:KC.fire }}/>}
        </span>
        {logo}
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{
            fontFamily:KF.body, fontSize:13, fontWeight:700,
            letterSpacing:'.04em', textTransform:'uppercase',
          }}>{t}</div>
          <div style={{
            fontFamily:KF.mono, fontSize:9.5, color:KC.muted,
            marginTop:2, letterSpacing:'.04em',
          }}>{d}</div>
        </div>
        {extra && (
          <div style={{
            padding:'4px 7px', background:'transparent', border:`1px solid ${active ? KC.fire : KC.border}`,
            fontFamily:KF.mono, fontSize:9, color: active ? KC.fire : KC.muted,
            letterSpacing:'.18em', textTransform:'uppercase',
          }}>{extra}</div>
        )}
      </label>

      {/* Yape expanded */}
      {expanded && (
        <div style={{
          padding:'14px', borderTop:`1px solid ${KC.border}`,
          background:KC.bg,
        }}>
          <div style={{
            fontFamily:KF.body, fontSize:12, color:'#cfcfcf', lineHeight:1.55,
            marginBottom:14,
          }}>
            Yapea <span style={{ color:KC.fire, fontWeight:800 }}>S/ 626</span> al número del culto.
            Adjunta tu comprobante y nosotros confirmamos en minutos.
          </div>

          {/* QR + número */}
          <div style={{ display:'grid', gridTemplateColumns:'88px 1fr', gap:12 }}>
            {/* QR placeholder */}
            <div style={{
              width:88, height:88, background:'#fff',
              padding:6, position:'relative',
            }}>
              <div style={{
                width:'100%', height:'100%',
                backgroundImage:
                  `linear-gradient(90deg, #000 25%, transparent 25%, transparent 50%, #000 50%, #000 75%, transparent 75%),
                   linear-gradient(0deg,  #000 25%, transparent 25%, transparent 50%, #000 50%, #000 75%, transparent 75%)`,
                backgroundSize:'8px 8px',
              }}/>
              {/* corner brackets */}
              {[
                {top:0,left:0},  {top:0,right:0},  {bottom:0,left:0},
              ].map((p,i)=>(
                <div key={i} style={{
                  position:'absolute', ...p,
                  width:18, height:18, background:'#fff',
                  outline:'2px solid #000', outlineOffset:-3,
                }}/>
              ))}
            </div>

            <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
              <div style={{
                fontFamily:KF.mono, fontSize:9.5, color:KC.silver,
                letterSpacing:'.22em', textTransform:'uppercase',
              }}>Número Yape · OnExotic</div>
              <div style={{
                display:'flex', justifyContent:'space-between', alignItems:'center',
                padding:'10px 12px', background:KC.card, border:`1px solid ${KC.border}`,
              }}>
                <span style={{
                  fontFamily:KF.mono, fontSize:15, color:KC.text, letterSpacing:'.12em',
                }}>+51 945 218 304</span>
                <span style={{
                  display:'inline-flex', alignItems:'center', gap:5,
                  fontFamily:KF.mono, fontSize:9, color:KC.fire,
                  letterSpacing:'.2em', textTransform:'uppercase',
                }}>
                  <KI.copy/> Copiar
                </span>
              </div>
              <div style={{
                display:'flex', justifyContent:'space-between',
                fontFamily:KF.mono, fontSize:9.5, color:KC.silver,
                letterSpacing:'.18em', textTransform:'uppercase',
              }}>
                <span>Titular</span><span style={{ color:KC.text }}>ONEXOTIC SAC</span>
              </div>
            </div>
          </div>

          {/* Subir comprobante */}
          <button style={{
            marginTop:14, width:'100%', padding:'14px',
            background:'transparent', border:`1px dashed ${KC.border}`,
            color:KC.text, cursor:'pointer',
            fontFamily:KF.mono, fontSize:11, letterSpacing:'.22em', textTransform:'uppercase',
            display:'flex', alignItems:'center', justifyContent:'center', gap:8,
          }}>
            ↑ Adjuntar comprobante
            <span style={{ color:KC.muted, fontSize:9 }}>· JPG / PNG / PDF</span>
          </button>
        </div>
      )}
    </div>
  );
}

// ─────────────── Notas para el culto ───────────────
function Notas() {
  return (
    <Section no="04" eye="Notas" title="Algo más">
      <div style={{
        border:`1px solid ${KC.border}`, background:KC.card,
      }}>
        <textarea
          rows={3}
          defaultValue="Si no estoy, dejen con el portero. Que el paquete no diga 'OnExotic' por fuera 🙏"
          style={{
            width:'100%', boxSizing:'border-box',
            background:'transparent', border:'none', outline:'none', resize:'none',
            padding:'14px', color:KC.text,
            fontFamily:KF.body, fontSize:13, lineHeight:1.55, letterSpacing:'.02em',
          }}
        />
      </div>
      <div style={{
        marginTop:6,
        fontFamily:KF.mono, fontSize:9, color:KC.silver, letterSpacing:'.18em', textTransform:'uppercase',
        textAlign:'right',
      }}>Opcional · máx. 240</div>
    </Section>
  );
}

// ─────────────── Resumen final ───────────────
function FinalSummary() {
  return (
    <Section no="05" eye="Resumen" title="El pacto">
      <div style={{
        background:KC.cardAlt, border:`1px solid ${KC.border}`,
        position:'relative', overflow:'hidden',
      }}>
        <div style={{ position:'absolute', inset:0, backgroundImage:K_GRAIN, opacity:.35 }}/>
        <div style={{ position:'relative', padding:'16px' }}>
          {[
            ['Subtotal',               'S/ 686', null],
            ['Descuento VENGANZA10',   '− S/ 60', KC.fire],
            ['Envío Olva · Lima',      'S/ 0 · gratis', KC.fire],
            ['IGV incluido',           'S/ 95', KC.muted],
          ].map(([k,v,col],i)=>(
            <div key={i} style={{
              display:'flex', justifyContent:'space-between', padding:'6px 0',
              fontFamily:KF.body, fontSize:13,
            }}>
              <span style={{ color:KC.muted }}>{k}</span>
              <span style={{
                color: col || KC.text,
                fontFamily:KF.mono, fontSize:12.5, letterSpacing:'.04em',
              }}>{v}</span>
            </div>
          ))}

          <div style={{
            marginTop:10, paddingTop:14,
            borderTop:`1px dashed ${KC.border}`,
            display:'flex', justifyContent:'space-between', alignItems:'baseline',
          }}>
            <div style={{
              fontFamily:KF.mono, fontSize:10, color:KC.silver,
              letterSpacing:'.24em', textTransform:'uppercase',
            }}>Total</div>
            <div style={{
              fontFamily:KF.body, fontSize:34, fontWeight:800, lineHeight:1,
              letterSpacing:'.01em',
            }}>S/ 626</div>
          </div>
        </div>
      </div>

      <div style={{
        marginTop:12, display:'flex', alignItems:'center', justifyContent:'center', gap:8,
        fontFamily:KF.mono, fontSize:9.5, color:KC.silver,
        letterSpacing:'.22em', textTransform:'uppercase',
      }}>
        <KI.shield/>
        Pago cifrado · SSL · datos protegidos
      </div>
    </Section>
  );
}

// ─────────────── Sticky bottom ───────────────
function ConfirmBar() {
  return (
    <div style={{
      position:'sticky', bottom:0, zIndex:30,
      background:'rgba(10,10,10,0.95)',
      backdropFilter:'blur(18px) saturate(160%)',
      borderTop:`1px solid ${KC.border}`,
      padding:'12px 16px 14px',
      display:'flex', flexDirection:'column', gap:10,
    }}>
      <div style={{
        display:'flex', justifyContent:'space-between', alignItems:'baseline',
      }}>
        <div style={{
          fontFamily:KF.mono, fontSize:10, color:KC.silver,
          letterSpacing:'.22em', textTransform:'uppercase',
        }}>Confirmas · 3 piezas</div>
        <div style={{
          fontFamily:KF.body, fontSize:18, fontWeight:800, letterSpacing:'.02em',
        }}>S/ 626</div>
      </div>

      <a href="#" style={{
        display:'flex', alignItems:'center', justifyContent:'space-between',
        padding:'16px 18px', textDecoration:'none',
        background: KC.fire, color:'#fff',
        fontFamily:KF.body, fontWeight:800, fontSize:13,
        letterSpacing:'.22em', textTransform:'uppercase',
        boxShadow:`0 -4px 24px rgba(184,20,20,.32)`,
      }}>
        <span>Confirmar pedido</span>
        <span style={{ fontFamily:KF.mono, fontSize:13 }}>Sellar pacto →</span>
      </a>
    </div>
  );
}

// ─────────────── Checkout root ───────────────
function Checkout() {
  return (
    <div data-screen-label="Checkout" style={{
      background:KC.bg, color:KC.text, fontFamily:KF.body,
      minHeight:'100%', overflowY:'auto',
    }}>
      <KHeader/>
      <MiniSummary total={626}/>
      <Contacto/>
      <Envio/>
      <Pago/>
      <Notas/>
      <FinalSummary/>
      <ConfirmBar/>
    </div>
  );
}

window.Checkout = Checkout;
