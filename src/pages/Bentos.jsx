import Ara from "../images/Ara.png";
import Galop from "../images/Galop sauvage.png"
import Cv2 from "../images/2CV.jpg";

import { AiOutlineMail } from 'react-icons/ai';
import { FaCalendarAlt, FaImages } from 'react-icons/fa';

export default function Bentos() {
  return (
    <div class="bento-grid">
      <div class="bento-item large">
        <div class="content">
          <h2>Bienvenue Izaberu Creations!</h2>
          <p>Découvrez des watercolors creations et plus.</p>
          <img src={Galop} alt="watercolor des pic d'Osseau" />
        </div>
      </div>

      <div class="bento-item" id="bento-galerie">
        <div class="content">
          <h3>Galerie</h3>
          <p>Découvrez nos watercolors</p>
          <FaImages style={{ marginRight: '48px', fontSize: '48px', color: 'white' }} />
        </div>
      </div>

      <div class="bento-item">
        <div class="content">
          <h3>Agenda</h3>
          <p>Agenda de l'Artiste</p>
          <FaCalendarAlt style={{ marginRight: '48px', fontSize: '48px', color: 'white' }} />
        </div>
      </div>
      <div class="bento-item">
        <div class="content">
          <h3>Outres créations</h3>
          <p>Bijoux et Broderie</p>
          <img src="/images/bijoux2.png" alt="messages" />
        </div>
      </div>
      <div class="bento-item tall">
        <div class="content">
          <h3>E-boutique</h3>
          <p>Gérez vos infos perso</p>
          <img
            src={Cv2}
            alt="watercolor d'une voiture ancienne abandone au milleiux de una grange"
          />
        </div>
      </div>
      <div class="bento-item" id="bentoFormulaire">
        <div class="content">
          <h3>Contact</h3>
          <p>Voulez-vous souscrire aux newsletters ?</p>
          <AiOutlineMail style={{ marginRight: '48px', fontSize: '48px', color: 'white' }} />
        </div>
      </div>
      <div class="bento-item wide">
        <div class="content">
          <h3>À propos</h3>
          <p>
            Bonjour, je suis aquarelliste amateur, après un an de pratique sur
            des sujets donnés par mon professeur ou trouvé sur internet je veux
            me perfectionner et quoi de mieux que de le faire à travers vos
            envies. Si vous avez une idée, paysage, photo pour offrir ou pour
            vous même je serais ravis de vous proposer mes services.
          </p>
        </div>
      </div>
    </div>
  );
}
