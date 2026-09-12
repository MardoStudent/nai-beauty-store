import React, { useContext, useState, useRef } from 'react';
import { SiteContentContext } from '../context/SiteContentContext';
import { Save, RotateCcw, Plus, Trash2, Upload, Check } from 'lucide-react';
import { readImageAsDataUrl } from '../utils/image';
import { supabase } from '../supabaseClient';
import { uploadImage } from '../lib/storage';

/* --- Petits champs réutilisables --- */
const Field = ({ label, value, onChange, placeholder }) => (
  <div className="input-group">
    <label>{label}</label>
    <input type="text" className="modern-input" value={value ?? ''} placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)} />
  </div>
);

const Area = ({ label, value, onChange, rows = 3 }) => (
  <div className="input-group" style={{ gridColumn: '1 / -1' }}>
    <label>{label}</label>
    <textarea className="modern-input" rows={rows} value={value ?? ''}
      onChange={(e) => onChange(e.target.value)} style={{ resize: 'vertical', fontFamily: 'inherit' }} />
  </div>
);

const ImageField = ({ label, value, onChange }) => {
  const ref = useRef(null);
  const onFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    (supabase ? uploadImage(file, 'site') : readImageAsDataUrl(file))
      .then(onChange)
      .catch((error) => window.alert(error.message));
  };
  return (
    <div className="input-group" style={{ gridColumn: '1 / -1' }}>
      <label>{label}</label>
      <div className="image-upload-row">
        <div className="image-preview">
          {value ? <img src={value} alt="Aperçu" /> : <span className="image-preview-empty">Aperçu</span>}
        </div>
        <div className="image-upload-actions">
          <input ref={ref} type="file" accept="image/*" onChange={onFile} style={{ display: 'none' }} />
          <button type="button" className="btn-secondary flex-center gap-2" onClick={() => ref.current?.click()}>
            <Upload size={16} /> Choisir une image
          </button>
          <span className="upload-hint">ou collez un lien ci-dessous</span>
          <input type="text" className="modern-input" placeholder="https://... ou /image.jpg"
            value={value?.startsWith('data:') ? '' : (value ?? '')}
            onChange={(e) => onChange(e.target.value)} />
        </div>
      </div>
    </div>
  );
};

const Card = ({ title, children }) => (
  <div className="glass-card editor-block">
    <h4 className="editor-block-title">{title}</h4>
    <div className="grid-form">{children}</div>
  </div>
);

/* --- Éditeur principal --- */
const SiteContentEditor = () => {
  const { content, updateContent, resetContent } = useContext(SiteContentContext);
  const [draft, setDraft] = useState(() => structuredClone(content));
  const [saved, setSaved] = useState(false);

  // Modifie une valeur imbriquée dans le brouillon
  const edit = (mutator) => {
    setSaved(false);
    setDraft((prev) => {
      const next = structuredClone(prev);
      mutator(next);
      return next;
    });
  };

  const handleSave = () => {
    updateContent(draft);
    setSaved(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => setSaved(false), 3000);
  };

  const handleReset = () => {
    if (window.confirm('Réinitialiser tout le contenu de l\'accueil aux textes d\'origine ? Cette action est irréversible.')) {
      resetContent();
      setDraft(structuredClone(content));
      window.location.reload();
    }
  };

  const addTestimonial = () => edit((d) => {
    d.testimonials.list.push({ name: 'Nouvelle cliente', text: 'Son avis ici...', loc: 'Ville' });
  });
  const removeTestimonial = (i) => edit((d) => { d.testimonials.list.splice(i, 1); });

  return (
    <div className="content-editor">
      <div className="editor-intro">
        <p>✍️ Modifiez ici tous les textes et images de la page d'accueil. Cliquez sur <strong>Enregistrer</strong> en bas pour publier vos changements.</p>
      </div>

      {/* HERO */}
      <Card title="🌟 Section principale (Hero)">
        <Field label="Petit texte du haut" value={draft.hero.eyebrow} onChange={(v) => edit((d) => (d.hero.eyebrow = v))} />
        <Field label="Note (ex: 4.9/5)" value={draft.hero.ratingScore} onChange={(v) => edit((d) => (d.hero.ratingScore = v))} />
        <Field label="Titre : début" value={draft.hero.titleBefore} onChange={(v) => edit((d) => (d.hero.titleBefore = v))} />
        <Field label="Titre : mot en rose (italique)" value={draft.hero.titleAccent} onChange={(v) => edit((d) => (d.hero.titleAccent = v))} />
        <Field label="Titre : fin" value={draft.hero.titleAfter} onChange={(v) => edit((d) => (d.hero.titleAfter = v))} />
        <Field label="Texte à côté de la note" value={draft.hero.ratingText} onChange={(v) => edit((d) => (d.hero.ratingText = v))} />
        <Area label="Description" value={draft.hero.desc} onChange={(v) => edit((d) => (d.hero.desc = v))} />
        <Field label="Bouton principal" value={draft.hero.primaryBtn} onChange={(v) => edit((d) => (d.hero.primaryBtn = v))} />
        <Field label="Bouton secondaire" value={draft.hero.secondaryBtn} onChange={(v) => edit((d) => (d.hero.secondaryBtn = v))} />
        <ImageField label="Image principale" value={draft.hero.image} onChange={(v) => edit((d) => (d.hero.image = v))} />
        <Field label="Badge haut : valeur" value={draft.hero.badgeTopValue} onChange={(v) => edit((d) => (d.hero.badgeTopValue = v))} />
        <Field label="Badge haut : libellé" value={draft.hero.badgeTopLabel} onChange={(v) => edit((d) => (d.hero.badgeTopLabel = v))} />
        <Field label="Badge bas : titre" value={draft.hero.badgeBottomTitle} onChange={(v) => edit((d) => (d.hero.badgeBottomTitle = v))} />
        <Field label="Badge bas : libellé" value={draft.hero.badgeBottomLabel} onChange={(v) => edit((d) => (d.hero.badgeBottomLabel = v))} />
      </Card>

      {/* BENEFITS */}
      <Card title="✅ Les 4 avantages">
        {draft.benefits.map((b, i) => (
          <React.Fragment key={i}>
            <Field label={`Avantage ${i + 1} : titre`} value={b.title} onChange={(v) => edit((d) => (d.benefits[i].title = v))} />
            <Field label={`Avantage ${i + 1} : texte`} value={b.text} onChange={(v) => edit((d) => (d.benefits[i].text = v))} />
          </React.Fragment>
        ))}
      </Card>

      {/* FEATURED */}
      <Card title="💖 Titre section « Coups de Cœur »">
        <Field label="Petit texte" value={draft.featured.eyebrow} onChange={(v) => edit((d) => (d.featured.eyebrow = v))} />
        <Field label="Titre" value={draft.featured.title} onChange={(v) => edit((d) => (d.featured.title = v))} />
        <Field label="Sous-titre" value={draft.featured.subtitle} onChange={(v) => edit((d) => (d.featured.subtitle = v))} />
      </Card>

      {/* WELCOME */}
      <Card title="🌷 Section « Notre histoire »">
        <Field label="Petit texte" value={draft.welcome.eyebrow} onChange={(v) => edit((d) => (d.welcome.eyebrow = v))} />
        <Field label="Titre" value={draft.welcome.title} onChange={(v) => edit((d) => (d.welcome.title = v))} />
        <Area label="Paragraphe 1" value={draft.welcome.p1} onChange={(v) => edit((d) => (d.welcome.p1 = v))} />
        <Area label="Paragraphe 2" value={draft.welcome.p2} onChange={(v) => edit((d) => (d.welcome.p2 = v))} rows={2} />
        <Field label="Bouton" value={draft.welcome.btn} onChange={(v) => edit((d) => (d.welcome.btn = v))} />
        <ImageField label="Image de la section" value={draft.welcome.image} onChange={(v) => edit((d) => (d.welcome.image = v))} />
      </Card>

      {/* CATEGORIES */}
      <Card title="🗂️ Section « Explorez nos univers »">
        <Field label="Titre" value={draft.categories.title} onChange={(v) => edit((d) => (d.categories.title = v))} />
        <Field label="Sous-titre" value={draft.categories.subtitle} onChange={(v) => edit((d) => (d.categories.subtitle = v))} />
        {draft.categories.cards.map((c, i) => (
          <React.Fragment key={i}>
            <Field label={`Carte ${i + 1} : nom`} value={c.name} onChange={(v) => edit((d) => (d.categories.cards[i].name = v))} />
            <ImageField label={`Carte ${i + 1} : image`} value={c.image} onChange={(v) => edit((d) => (d.categories.cards[i].image = v))} />
          </React.Fragment>
        ))}
      </Card>

      {/* TESTIMONIALS */}
      <Card title="⭐ Avis clientes">
        <Field label="Petit texte" value={draft.testimonials.eyebrow} onChange={(v) => edit((d) => (d.testimonials.eyebrow = v))} />
        <Field label="Titre" value={draft.testimonials.title} onChange={(v) => edit((d) => (d.testimonials.title = v))} />
        {draft.testimonials.list.map((t, i) => (
          <div className="editor-subcard" key={i} style={{ gridColumn: '1 / -1' }}>
            <div className="editor-subcard-head">
              <span>Avis {i + 1}</span>
              <button type="button" className="icon-btn text-danger hover-danger" onClick={() => removeTestimonial(i)} title="Supprimer cet avis">
                <Trash2 size={16} />
              </button>
            </div>
            <div className="grid-form">
              <Field label="Nom" value={t.name} onChange={(v) => edit((d) => (d.testimonials.list[i].name = v))} />
              <Field label="Ville" value={t.loc} onChange={(v) => edit((d) => (d.testimonials.list[i].loc = v))} />
              <Area label="Avis" value={t.text} onChange={(v) => edit((d) => (d.testimonials.list[i].text = v))} rows={2} />
            </div>
          </div>
        ))}
        <div style={{ gridColumn: '1 / -1' }}>
          <button type="button" className="btn-secondary flex-center gap-2" onClick={addTestimonial}>
            <Plus size={16} /> Ajouter un avis
          </button>
        </div>
      </Card>

      {/* CTA */}
      <Card title="🥰 Bandeau final (appel à l'action)">
        <Field label="Titre" value={draft.cta.title} onChange={(v) => edit((d) => (d.cta.title = v))} />
        <Area label="Texte" value={draft.cta.text} onChange={(v) => edit((d) => (d.cta.text = v))} rows={2} />
        <Field label="Bouton" value={draft.cta.btn} onChange={(v) => edit((d) => (d.cta.btn = v))} />
      </Card>

      {/* BARRE DE SAUVEGARDE */}
      <div className="editor-savebar">
        <button className="btn-secondary flex-center gap-2" onClick={handleReset}>
          <RotateCcw size={16} /> Réinitialiser
        </button>
        <button className={`btn-primary flex-center gap-2 ${saved ? 'added' : ''}`} onClick={handleSave}>
          {saved ? <><Check size={18} /> Enregistré !</> : <><Save size={18} /> Enregistrer les modifications</>}
        </button>
      </div>
    </div>
  );
};

export default SiteContentEditor;
