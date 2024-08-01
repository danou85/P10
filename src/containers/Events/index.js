import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

// Constante définissant le nombre d'événements par page
const PER_PAGE = 9;

const EventList = () => {
  // Utilisation du hook useData pour récupérer les données
  const { data, error } = useData();
  // State pour stocker le type d'événement sélectionné
  const [type, setType] = useState(null);
  // State pour stocker la page actuelle
  const [currentPage, setCurrentPage] = useState(1);

  // Gestion des erreurs
  if (error) return <div>Une erreur s'est produite</div>;
  // Affichage du chargement en attendant les données
  if (!data) return "chargement";

  // Filtrage des événements en fonction du type sélectionné
  const filteredEvents = !type
    ? data.events
    : data.events.filter((event) => event.type === type);

  // Découpage des événements pour la pagination
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE
  );

  // Calcul du nombre total de pages
  const pageNumber = Math.ceil(filteredEvents.length / PER_PAGE);
  // Création de la liste des types d'événements sans doublons
  const typeList = Array.from(new Set(data.events.map((event) => event.type)));

  // Fonction pour changer le type d'événement et réinitialiser la page à 1
  const changeType = (evtType) => {
    setCurrentPage(1);
    setType(evtType);
  };

  return (
    <>
      <h3 className="SelectTitle">Catégories</h3>
      {/* Composant de sélection pour les types d'événements */}
      <Select
        selection={typeList}
        onChange={(value) => (value ? changeType(value) : changeType(null))}
      />
      <div id="events" className="ListContainer">
        {/* Affichage des événements paginés */}
        {paginatedEvents.map((event) => (
          <Modal key={event.id} Content={<ModalEvent event={event} />}>
            {({ setIsOpened }) => (
              <EventCard
                onClick={() => setIsOpened(true)}
                imageSrc={event.cover}
                title={event.title}
                date={new Date(event.date)}
                label={event.type}
                id={event.id}
              />
            )}
          </Modal>
        ))}
      </div>
      <div className="Pagination">
        {/* Affichage des liens de pagination */}
        {[...Array(pageNumber)].map((_, n) => (
          // eslint-disable-next-line react/no-array-index-key
          <a key={n} href="#events" onClick={() => setCurrentPage(n + 1)}>
            {n + 1}
          </a>
        ))}
      </div>
    </>
  );
};

export default EventList;
