import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, Filter, BookOpen, GitBranch, X, ChevronRight, Presentation } from 'lucide-react';

const sp = (scientific, common = '', endemic = false) => ({ scientific, common, endemic });

const order = {
  name: 'Serpentes',
  common: 'serpientes',
  summary: 'Orden de reptiles sin patas, con cuerpo largo, flexible y escamoso. En este esquema se dejan solo las familias desarrolladas para la actividad.',
  traits: [
    'No tienen patas y el cuerpo es largo, flexible y escamoso.',
    'Carecen de párpados y aberturas externas del oído.',
    'Tragan a sus presas enteras.',
    'La lengua bifurcada ayuda a detectar señales químicas del ambiente.',
    'Presentan distintos tipos de dentición: aglifas, opistoglifas, proteroglifas y solenoglifas.'
  ],
  families: [
    {
      name: 'Aniliidae',
      common: 'falsas corales',
      count: 'familia del orden Serpentes',
      image: 'https://multimedia20stg.blob.core.windows.net/especiesreduced/3098Anilius_scytale_principal.jpg',
      traits: [
        'Escamas dorsales y ventrales del mismo tamaño.',
        'Cabeza unida al cuerpo sin cuello marcado.',
        'Se les conoce como falsas corales.',
        'Cuerpo cilíndrico y de apariencia robusta.'
      ],
      species: []
    },
    {
      name: 'Boidae',
      common: 'boas y anacondas',
      count: '8 especies de boas en el país',
      image: 'https://multimedia20stg.blob.core.windows.net/especiesreduced/boa-imperator_1_dq.jpg',
      traits: [
        'Alcanzan grandes tamaños, hasta cerca de 10 m.',
        'No son venenosas; capturan a sus presas por constricción.',
        'Presentan hileras de fosas termorreceptoras a lo largo de las mandíbulas.',
        'Incluyen boas matacaballo y anacondas.',
        'Son ovovivíparas.',
        'Se alimentan de roedores, huevos y aves.',
        'Presentan colores variados: café, verde, amarillo, naranja y visos iridiscentes.',
        'Son importantes controladores de plagas en cultivos.'
      ],
      species: [
        sp('Boa constrictor','boa constrictor'),
        sp('Corallus caninus','boa esmeralda'),
        sp('Eunectes murinus','anaconda o reina del Amazonas'),
        sp('Epicrates cenchria','boa arcoíris'),
        sp('Trachyboa gularis','dormilona', true)
      ]
    },
    {
      name: 'Colubridae',
      common: 'culebras y falsas corales',
      count: '151 especies en el país',
      image: 'https://multimedia20stg.blob.core.windows.net/especiesreduced/img_2920.jpg',
      traits: [
        'Es la familia con mayor número de especies en el país.',
        'No son venenosas o presentan veneno poco activo.',
        'Cabeza ovalada y poco diferenciada del cuello.',
        'Ojos grandes con pupila circular.',
        'Piel brillante con escamación hexagonal y en mosaico.',
        'Escamas de la cabeza amplias en forma de placas o escudos.',
        'Son ovíparas.',
        'Poco o nada ofensivas para el ser humano.'
      ],
      species: [
        sp('Clelia clelia','chonta'),
        sp('Dipsas gracilis','dipsa'),
        sp('Imantodes cenchoa','cordoncillo'),
        sp('Imantodes inornatus','cordoncillo'),
        sp('Oxyrhopus petola','falsa coral')
      ]
    },
    {
      name: 'Elapidae',
      common: 'corales y serpiente marina',
      count: 'corales y serpientes marinas',
      image: 'https://multimedia20stg.blob.core.windows.net/especiesreduced/16962013_01_31_32253.jpg',
      traits: [
        'Incluye corales y serpientes marinas.',
        'Poseen colmillos fijos en la parte anterior de la mandíbula.',
        'Las corales habitan en oriente y occidente.',
        'Miden aproximadamente entre 40 cm y 1 m.',
        'Presentan colores llamativos con anillos rojos, negros, amarillos o crema.',
        'Son poco agresivas y ovíparas.',
        'Generalmente tienen boca pequeña.'
      ],
      species: [
        sp('Micrurus spp.','corales'),
        sp('Pelamis platyurus','serpiente marina')
      ]
    },
    {
      name: 'Viperidae',
      common: 'víboras, equis y verrugosas',
      count: '15 especies de víboras en el país',
      image: 'https://multimedia20stg.blob.core.windows.net/especiesreduced/rub__n-d_-jarr__n-e__dsc1595-copia.jpg',
      traits: [
        'Cabeza ancha y achatada.',
        'Presencia de un orificio sensorial a cada lado del hocico.',
        'Dentadura solenoglifa.',
        'Pupila vertical.',
        'Escamas superpuestas y aquilladas, con aspecto áspero y opaco.',
        'Incluye equis y verrugosas.'
      ],
      species: [
        sp('Bothrops atrox','equis'),
        sp('Bothrops achaegelii','lora'),
        sp('Lachesis muta','guacama, verrugosa o shushupe')
      ]
    }
  ]
};

order.families = order.families
  .sort((a, b) => a.name.localeCompare(b.name))
  .map(f => ({ ...f, species: f.species.sort((a, b) => a.scientific.localeCompare(b.scientific)) }));

function Species({ item }) {
  return <div className="species"><em>{item.scientific}</em>{item.common && <span> — {item.common}</span>}{item.endemic && <b>Endémica</b>}</div>;
}

function FamilyImage({ family, modal = false }) {
  return <div className={modal ? 'familyImage familyImageModal' : 'familyImage'}><img src={family.image} alt={`Imagen representativa de ${family.name}`} loading="lazy" referrerPolicy="no-referrer" /></div>;
}

function Modal({ family, onClose }) {
  return <AnimatePresence>{family && <motion.div className="modalBackdrop" onClick={onClose} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}><motion.article className="modal" onClick={e=>e.stopPropagation()} initial={{opacity:0,y:25,scale:.96}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:25,scale:.96}}><button className="close" onClick={onClose}><X size={20}/></button><p className="eyebrow">Orden Serpentes · Familia</p><h2>{family.name}</h2><p className="familyCommon">{family.common}</p><FamilyImage family={family} modal /><div className="modalGrid"><section><h3>Características de la familia</h3>{family.traits.map(t=><p key={t}>• {t}</p>)}</section><section><h3>Especies representativas</h3>{family.species.length ? <div className="speciesList">{family.species.map(s=><Species key={s.scientific} item={s}/>)}</div> : <p>No se detallan especies científicas para esta familia en el PDF.</p>}</section></div></motion.article></motion.div>}</AnimatePresence>;
}

function FamilyCard({ family, i, onOpen }) {
  return <motion.button className="familyCard" onClick={()=>onOpen(family)} initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{delay:i*.03}}><div className="cardTop"><span>{String(i+1).padStart(2,'0')}</span><strong>{family.name}</strong></div><p>{family.common}</p><FamilyImage family={family} /><small>{family.count}</small><div className="preview">{family.traits.slice(0,2).map(t=><span key={t}>{t}</span>)}</div><div className="openLine">Ver ficha <ChevronRight size={16}/></div></motion.button>;
}

export default function App(){
  const [open,setOpen]=useState(false);
  const [query,setQuery]=useState('');
  const [selected,setSelected]=useState(null);
  const [present,setPresent]=useState(false);
  const families=useMemo(()=>order.families.filter(f=>`${f.name} ${f.common} ${f.traits.join(' ')} ${f.species.map(s=>s.scientific+' '+s.common).join(' ')}`.toLowerCase().includes(query.toLowerCase())),[query]);
  return <main className={present?'app presentation':'app'}><section className="hero"><div className="orb one"/><div className="orb two"/><p className="badge">Clase Reptiles · Orden</p><h1>Serpentes</h1><p className="subtitle">Serpientes del Ecuador · esquema taxonómico interactivo</p><div className="stats"><div><b>5</b><span>familias</span></div><div><b>223</b><span>especies en Ecuador</span></div><div><b>204</b><span>serpientes en el país</span></div></div></section><section className="scheme"><div className="box top">Reptiles</div><div className="line v1"/><div className="box mid">Lepidosauria</div><div className="line v2"/><div className="box low">Squamata</div><div className="line v3"/><button className={open?'serpentBtn active':'serpentBtn'} onClick={()=>setOpen(!open)}><span>🐍</span><strong>SERPENTES</strong><em>serpientes</em></button></section>{open && <><section className="controls"><label><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Buscar familia o especie..."/></label><label><Filter size={18}/><select value="Serpentes" disabled><option>Serpentes</option></select></label></section><section className="intro"><BookOpen size={20}/><div><h2>Familias del orden Serpentes</h2><p>{order.summary}</p></div><button onClick={()=>setPresent(!present)}><Presentation size={18}/>{present?'Salir':'Presentar'}</button></section><section className="orderBlock"><div className="orderHead"><div className="icon">🐍</div><div><p className="eyebrow">Orden</p><h2>Serpentes</h2><p>serpientes</p></div></div><div className="traits">{order.traits.map(t=><span key={t}>{t}</span>)}</div><div className="grid">{families.map((f,i)=><FamilyCard key={f.name} family={f} i={i} onOpen={setSelected}/>)}</div></section></>}<footer><GitBranch size={18}/> Orden Serpentes · Clase Reptiles</footer><Modal family={selected} onClose={()=>setSelected(null)}/></main>;
}
