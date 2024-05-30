import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  // Trier les événements par date décroissante
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );

  // Fonction pour passer à la carte suivante
  const nextCard = () => {
    setTimeout(
      () => setIndex(index < byDateDesc.length - 1 ? index + 1 : 0),
      5000
    );
  };

  // Exécuter la fonction nextCard à chaque changement d'index
  useEffect(() => {
    nextCard();
  });

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((ev²ent, idx) => (
        // Utiliser event.id comme clé unique pour chaque SlideCard
        <div key={events.id} className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}>
          <img src={events.cover} alt="forum" />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{events.title}</h3>
              <p>{events.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc?.map((event, radioIdx) => (
            // Utiliser event.id comme clé unique pour chaque bouton radio
            <input
              key={`radio-${event.id}`} // Assurez-vous que event.id est unique
              type="radio"
              name="radio-button"
              checked={index === radioIdx}
              readOnly // Rendre le champ en lecture seule pour éviter les erreurs
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
