import React, { useEffect } from 'react';
import { STORE_NAME } from '../config';

const Confidentialite = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="page-container page-transition pt-32 mb-12">
      <div className="container legal-container">
        <div className="section-header text-center">
          <span className="hero-tag">Vos données</span>
          <h1 className="section-title">Politique de Confidentialité</h1>
        </div>

        <div className="legal-content glass-card">
          <p className="legal-updated">Dernière mise à jour : février 2026</p>

          <section>
            <h2>1. Introduction</h2>
            <p>
              La présente politique de confidentialité décrit la manière dont <strong>{STORE_NAME}</strong>,
              édité par <strong>Axis Result Consulting</strong>, collecte, utilise et protège les
              informations que vous nous communiquez lors de votre navigation et de vos commandes.
            </p>
          </section>

          <section>
            <h2>2. Données collectées</h2>
            <p>Dans le cadre de vos achats, nous pouvons être amenés à traiter :</p>
            <ul>
              <li>Les informations de commande (produits sélectionnés, quantités, montant) ;</li>
              <li>Les coordonnées que vous communiquez lors de la finalisation via WhatsApp
                  (nom, numéro de téléphone, adresse de livraison) ;</li>
              <li>Les données techniques de navigation strictement nécessaires au fonctionnement du site.</li>
            </ul>
          </section>

          <section>
            <h2>3. Stockage local (panier)</h2>
            <p>
              Votre panier est enregistré localement dans votre navigateur (localStorage) afin de
              conserver votre sélection entre deux visites. Ces données restent sur votre appareil
              et ne sont pas transmises à nos serveurs.
            </p>
          </section>

          <section>
            <h2>4. Finalité du traitement</h2>
            <p>Les données sont utilisées uniquement pour :</p>
            <ul>
              <li>Traiter et préparer vos commandes ;</li>
              <li>Assurer la livraison et le service après-vente ;</li>
              <li>Répondre à vos demandes et améliorer votre expérience.</li>
            </ul>
          </section>

          <section>
            <h2>5. Partage des données</h2>
            <p>
              Vos données ne sont ni vendues ni cédées à des tiers. La finalisation de commande
              s'effectue via WhatsApp, dont l'usage est soumis à sa propre politique de confidentialité.
            </p>
          </section>

          <section>
            <h2>6. Vos droits</h2>
            <p>
              Vous disposez d'un droit d'accès, de rectification et de suppression de vos données.
              Pour exercer ces droits, contactez Axis Result Consulting.
            </p>
          </section>

          <section>
            <h2>7. Sécurité</h2>
            <p>
              Nous mettons en œuvre des mesures raisonnables pour protéger vos informations contre
              tout accès, altération ou divulgation non autorisés.
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

export default Confidentialite;
