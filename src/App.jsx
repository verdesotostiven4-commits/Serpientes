import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, Filter, BookOpen, GitBranch, X, ChevronRight, Presentation } from 'lucide-react';

const sp = (scientific, common = '', endemic = false, note = '') => ({ scientific, common, endemic, note });

const order = {
  name: 'Serpentes',
  common: 'serpientes',
  color: '#24c95a',
  summary: 'Orden de reptiles sin patas, con cuerpo largo, flexible y escamoso. En Ecuador se mencionan 9 familias de serpientes con 223 especies.',
  traits: [
    'No tienen patas y el cuerpo es largo, flexible y escamoso.',
    'Carecen de párpados y aberturas externas del oído.',
    'Los machos poseen hemipenes.',
    'Tragan a sus presas enteras.',
    'La lengua bifurcada detecta señales químicas del ambiente.',
    'Pueden ser aglifas, opistoglifas, proteroglifas o solenoglifas.'
  ],
  families: [
    {
      name: 'Aniliidae',
      common: 'falsas corales',
      count: 'familia incluida en Serpentes',
      traits: ['Escamas dorsales y ventrales del mismo tamaño.', 'Cabeza unida al cuerpo sin cuello marcado.', 'Se les conoce como falsas corales.', 'Cuerpo cilíndrico y de apariencia robusta.'],
      species: []
    },
    {
      name: 'Anomalepididae',
      common: 'serpientes ciegas',
      count: 'familia listada en el esquema',
      traits: ['Familia incluida dentro del esquema de Serpentes.', 'El PDF la presenta como una de las familias del grupo, pero no desarrolla una ficha con especies representativas.', 'Se mantiene en el esquema para conservar la clasificación general.'],
      species: []
    },
    {
      name: 'Boidae',
      common: 'boas y anacondas',
      count: '8 especies de boas en el país',
      traits: ['Alcanzan grandes tamaños, hasta cerca de 10 m.', 'No son venenosas; matan por constricción.', 'Envuelven y aprietan a sus presas causando parálisis respiratoria.', 'Presentan hileras de fosas termorreceptoras a lo largo de las mandíbulas.', 'Incluyen boas matacaballo y anacondas.', 'Son ovovivíparas.', 'Se alimentan de roedores, huevos y aves.', 'Pueden presentar colores café, verde, amarillo, naranja y visos iridiscentes.', 'Son importantes controladores de plagas en cultivos.'],
      species: [sp('Boa constrictor','boa constrictor'), sp('Corallus caninus','boa esmeralda'), sp('Eunectes murinus','anaconda o reina del Amazonas'), sp('Trachyboa gularis','dormilona',true), sp('Epicrates cenchria','boa arcoíris')]
    },
    {
      name: 'Colubridae',
      common: 'culebras y falsas corales',
      count: '151 especies en el país',
      traits: ['Es la familia con mayor número de especies en el país.', 'No son venenosas o, si tienen veneno, es poco activo.', 'Cabeza ovalada y poco diferenciada del cuello.', 'Ojos grandes y abultados con pupila circular.', 'Piel brillante con escamación hexagonal y mosaico.', 'Escamas de la cabeza amplias en forma de placa o escudo.', 'Son ovíparas.', 'Dientes aproximadamente del mismo tamaño y sin colmillos especializados para inocular veneno.', 'Poco o nada ofensivas para el ser humano.', 'Pueden ser aglifas u opistoglifas.'],
      species: [sp('Clelia clelia','chonta'), sp('Dipsas gracilis','dipsa'), sp('Imantodes cenchoa','cordoncillo'), sp('Imantodes inornatus','cordoncillo'), sp('Oxyrhopus petola','falsa coral'), sp('Camprompelis triangulum','serpiente sobrecama')]
    },
    {
      name: 'Elapidae',
      common: 'corales y serpiente marina',
      count: 'corales y serpientes marinas',
      traits: ['Serpientes venenosas con dos colmillos fijos, cortos, erectos, surcados o perforados.', 'Los colmillos se ubican en la parte anterior de la mandíbula.', 'El veneno es neurotóxico y bloquea la transmisión de impulsos nerviosos a los músculos.', 'Incluye corales y serpientes marinas.', 'Las corales habitan en oriente y occidente.', 'Miden entre 40 cm y 1 m.', 'Tienen colores llamativos con anillos rojos, negros, amarillos o crema.', 'Son poco agresivas y ovíparas.', 'Generalmente tienen boca pequeña.'],
      species: [sp('Micrurus spp.','corales'), sp('Pelamis platyurus','serpiente marina')]
    },
    {
      name: 'Leptotyphlopidae',
      common: 'serpientes ciegas delgadas',
      count: 'familia listada en el esquema',
      traits: ['Familia incluida dentro del esquema de Serpentes.', 'El PDF no presenta una ficha desarrollada con características o especies representativas para esta familia.', 'Se conserva en la clasificación general del orden.'],
      species: []
    },
    {
      name: 'Tropidophiidae',
      common: 'boas enanas',
      count: 'familia listada en el esquema',
      traits: ['Familia incluida dentro del esquema de Serpentes.', 'No se desarrolla una ficha propia con características o especies en las diapositivas del PDF.', 'Se mantiene para respetar la lista de familias del esquema.'],
      species: []
    },
    {
      name: 'Typhlopidae',
      common: 'serpientes ciegas',
      count: 'familia listada en el esquema',
      traits: ['Familia incluida dentro del esquema de Serpentes.', 'El PDF la enumera en la clasificación general de serpientes.', 'No se observan especies representativas detalladas en las diapositivas disponibles.'],
      species: []
    },
    {
      name: 'Viperidae',
      common: 'víboras, equis y verrugosas',
      count: '15 especies de víboras en el país',
      traits: ['Poseen un par de colmillos huecos en una maxila superior muy corta.', 'La maxila puede girar los colmillos hacia delante para morder.', 'Los colmillos actúan como aguja hipodérmica para inyectar veneno.', 'El veneno destruye tejidos, vasos sanguíneos y factores de coagulación.', 'Son agresivas y con veneno muy activo.', 'Cabeza ancha y achatada.', 'Presencia de un orificio sensorial a cada lado del hocico.', 'Dentadura solenoglifa.', 'Pupila vertical.', 'Escamas superpuestas y aquilladas que dan aspecto áspero y opaco.', 'Incluye equis y verrugosas.'],
      species: [sp('Bothrops atrox','equis'), sp('Bothrops achaegelii','lora'), sp('Lachesis muta','guacama, verrugosa o shushupe')]
    }
  ]
};

order.families = order.families.sort((a,b)=>a.name.localeCompare(b.name)).map(f => ({...f, species: f.species.sort((a,b)=>a.scientific.localeCompare(b.scientific))}));

function Species({ item }) {
  return <div className="species"><em>{item.scientific}</em>{item.common && <span> — {item.common}</span>}{item.endemic && <b>Endémica</b>}{item.note && <small>{item.note}</small>}</div>;
}

function Modal({ family, onClose }) {
  return <AnimatePresence>{family && <motion.div className="modalBackdrop" onClick={onClose} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}><motion.article className="modal" onClick={e=>e.stopPropagation()} initial={{opacity:0,y:25,scale:.96}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:25,scale:.96}}><button className="close" onClick={onClose}><X size={20}/></button><p className="eyebrow">Orden Serpentes · Familia</p><h2>{family.name}</h2><p className="familyCommon">{family.common}</p><div className="modalGrid"><section><h3>Características de la familia</h3>{family.traits.map(t=><p key={t}>• {t}</p>)}</section><section><h3>Especies representativas</h3>{family.species.length ? <div className="speciesList">{family.species.map(s=><Species key={s.scientific} item={s}/>)}</div> : <p>No se detallan especies científicas para esta familia en el PDF.</p>}</section></div></motion.article></motion.div>}</AnimatePresence>
}

function FamilyCard({ family, i, onOpen }) {
  return <motion.button className="familyCard" onClick={()=>onOpen(family)} initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{delay:i*.03}}><div className="cardTop"><span>{String(i+1).padStart(2,'0')}</span><strong>{family.name}</strong></div><p>{family.common}</p><small>{family.count}</small><div className="preview">{family.traits.slice(0,2).map(t=><span key={t}>{t}</span>)}</div><div className="openLine">Ver ficha <ChevronRight size={16}/></div></motion.button>
}

export default function App(){
  const [open,setOpen]=useState(false); const [query,setQuery]=useState(''); const [selected,setSelected]=useState(null); const [present,setPresent]=useState(false);
  const families=useMemo(()=>order.families.filter(f=>`${f.name} ${f.common} ${f.traits.join(' ')} ${f.species.map(s=>s.scientific+' '+s.common).join(' ')}`.toLowerCase().includes(query.toLowerCase())),[query]);
  return <main className={present?'app presentation':'app'}><section className="hero"><div className="orb one"/><div className="orb two"/><p className="badge">Clase Reptiles · Orden</p><h1>Serpentes</h1><p className="subtitle">Serpientes del Ecuador · esquema taxonómico interactivo</p><div className="stats"><div><b>9</b><span>familias</span></div><div><b>223</b><span>especies en Ecuador</span></div><div><b>204</b><span>serpientes en el país</span></div></div></section><section className="scheme"><div className="box top">Reptiles</div><div className="line v1"/><div className="box mid">Lepidosauria</div><div className="line v2"/><div className="box low">Squamata</div><div className="line v3"/><button className={open?'serpentBtn active':'serpentBtn'} onClick={()=>setOpen(!open)}><span>🐍</span><strong>SERPENTES</strong><em>serpientes</em></button></section>{open && <><section className="controls"><label><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Buscar familia o especie..."/></label><label><Filter size={18}/><select value="Serpentes" disabled><option>Serpentes</option></select></label></section><section className="intro"><BookOpen size={20}/><div><h2>Familias del orden Serpentes</h2><p>{order.summary}</p></div><button onClick={()=>setPresent(!present)}><Presentation size={18}/>{present?'Salir':'Presentar'}</button></section><section className="orderBlock"><div className="orderHead"><div className="icon">🐍</div><div><p className="eyebrow">Orden</p><h2>Serpentes</h2><p>serpientes</p></div></div><div className="traits">{order.traits.map(t=><span key={t}>{t}</span>)}</div><div className="grid">{families.map((f,i)=><FamilyCard key={f.name} family={f} i={i} onOpen={setSelected}/>)}</div></section></>}<footer><GitBranch size={18}/> Orden Serpentes · Clase Reptiles</footer><Modal family={selected} onClose={()=>setSelected(null)}/></main>
}
