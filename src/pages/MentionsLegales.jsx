import React, { useEffect } from 'react';
import { STORE_NAME, CONTACT_EMAIL, INSTAGRAM_URL } from '../config';

const MentionsLegales = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="page-container page-transition pt-32 mb-12">
      <div className="container legal-container">
        <div className="section-header text-center">
          <span className="hero-tag">Informations légales</span>
          <h1 className="section-title">Mentions Légales</h1>
        </div>

        <div className="legal-content glass-card">
          <p className="legal-updated">Dernière mise à jour : février 2026</p>

          <section>
            <h2>1. Éditeur du site</h2>
            <p>
              Le présent site <strong>{STORE_NAME}</strong> est édité par <strong>Axis Result Consulting</strong>.
            </p>
            <ul>
              <li><strong>Raison sociale :</strong> Axis Result Consulting</li>
              <li><strong>Adresse :</strong> [à compléter]</li>
              <li><strong>Téléphone :</strong> [à compléter]</li>
              <li><strong>E-mail :</strong> <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></li>
              <li><strong>Instagram :</strong> <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">@naibeauty_store</a></li>
            </ul>
          </section>

          <section>
            <h2>2. Directeur de la publication</h2>
            <p>Le directeur de la publication est le représentant légal d'Axis Result Consulting.</p>
          </section>

          <section>
            <h2>3. Hébergement</h2>
            <p>
              Le site est hébergé par son prestataire technique. Les coordonnées de l'hébergeur
              sont disponibles sur simple demande auprès de l'éditeur.
            </p>
          </section>

          <section>
            <h2>4. Propriété intellectuelle</h2>
            <p>
              L'ensemble des contenus présents sur ce site (textes, images, logos, graphismes, mise en page,
              code) est la propriété exclusive d'Axis Result Consulting, sauf mention contraire.
              Ce document est <strong>confidentiel</strong> et l'ensemble des droits est réservé.
              Toute reproduction, représentation, modification ou exploitation, totale ou partielle,
              sans autorisation écrite préalable est strictement interdite et constitue une contrefaçon.
            </p>
          </section>

          <section>
            <h2>5. Responsabilité</h2>
            <p>
              Les informations fournies sur ce site le sont à titre indicatif. Axis Result Consulting
              s'efforce d'assurer l'exactitude des informations diffusées mais ne saurait être tenue
              responsable des erreurs, omissions ou d'une indisponibilité du site.
            </p>
          </section>

          <section>
            <h2>6. Contact</h2>
            <p>
              Pour toute question relative aux présentes mentions légales, vous pouvez contacter
              Axis Result Consulting via les coordonnées indiquées ci-dessus.
            </p>
          </section>

          <p className="legal-footer-note">
            Document confidentiel · Tous droits réservés. © 2026 Axis Result Consulting.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MentionsLegales;
