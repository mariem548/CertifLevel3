import { useState } from "react";
import PropTypes from "prop-types";

export default function AutoFilterDropDown({
  data, // un tableau d'objets à filtrer.
  filterProperty, // la propriété (une chaîne de caractères) de l'objet à utiliser pour le filtrage.
  valueChange, // la fonction à appeler lorsqu'un élément est sélectionné.
}) {
  // filterText : le texte de filtrage actuel.
  // setFilterText : la fonction pour mettre à jour le texte de filtrage.
  const [filterText, setFilterText] = useState("");
  // filteredData : les données filtrées.
  // setFilteredData : la fonction pour mettre à jour les données
  const [filteredData, setFilteredData] = useState(data);

  //handleFilterChange  une fonction appelée lorsque l'utilisateur tape dans le champ de texte.

  const handleFilterChange = (e) => {
    const text = e.target.value; // Récupère le texte de filtrage saisi par l'utilisateur.
    // Elle met à jour filterText et filtre  les données en fonction de ce texte.
    setFilterText(text);

    //Ce code filtre les éléments du tableau data
    // en fonction du texte de filtrage saisi par l'utilisateur.
    const filtered = data.filter((item) =>
      // Convertit la valeur de cette propriété en minuscules pour effectuer une comparaison insensible à la casse.
      item[filterProperty]
        .toLowerCase()
        //Convertit également le texte de filtrage saisi par l'utilisateur en minuscules.
        //includes(text.toLowerCase()) : Vérifie si la valeur de la propriété contient le texte de filtrage. Si c'est le cas, l'élément est inclus dans le tableau filtré.
        .includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };
  // une fonction appelée lorsque l'utilisateur clique sur un élément de la liste filtrée. Elle appelle valueChange avec l'élément sélectionné, puis réinitialise filterText et filteredData
  const handleItemClick = (item) => {
    valueChange(item);
    setFilterText("");
    setFilteredData(data);
  };

  //La méthode highlightText est utilisée pour mettre en évidence une partie spécifique d'un texte en la rendant en gras.
  //  prend deux arguments, text (le texte complet) et highlight (le texte à mettre en évidence).
  const highlightText = (text, highlight) => {
    //Utilise la méthode split pour diviser le texte en parties, en utilisant une expression régulière qui correspond au texte à mettre en évidence. L'expression régulière est construite dynamiquement en utilisant le texte highlight, et les drapeaux g (global) et i (insensible à la casse) sont utilisés pour trouver toutes les occurrences, sans tenir compte de la casse.
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return parts.map(
      (
        part,
        index //Utilise la méthode map pour transformer chaque partie du texte en un élément JSX. Chaque partie est comparée au texte à mettre en évidence.
      ) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <b key={index}>{part}</b>
        ) : (
          // Pour chaque partie, si elle correspond au texte à mettre en évidence (en ignorant la casse), elle est rendue en gras (<b>). Sinon, elle est rendue telle quelle.
          part
        )
    );
  };
  return (
    <div className="mx-5">
      <label htmlFor="exampleDataList" className="form-label">
        Datalist filtred
      </label>
      <input
        type="text"
        className="form-control"
        placeholder="Type to filter..."
        value={filterText}
        onChange={handleFilterChange}
      ></input>
      {/**{filteredData.map((item, index) => ( ... ))} : Utilise la méthode map pour itérer sur chaque élément de filteredData. Pour chaque élément, une fonction de rappel est exécutée, prenant item (l'élément actuel) et index (l'index de l'élément dans le tableau) comme arguments.

<li key={index} onClick={() => handleItemClick(item)}> : Pour chaque élément, crée un élément de liste (<li>). L'attribut key est défini sur index pour aider React à identifier chaque élément de manière unique. L'attribut onClick est défini pour appeler la fonction handleItemClick avec l'élément item lorsque l'utilisateur clique sur cet élément de liste.

{highlightText(item[filterProperty], filterText)} : Le contenu de l'élément de liste est généré en appelant la fonction highlightText avec deux arguments : la valeur de la propriété spécifiée par filterProperty de l'élément item, et le texte de filtrage filterText. Cette fonction met en évidence les parties du texte qui correspondent au texte de filtrage. */}
      <ul>
        {filteredData.map((item, index) => (
          <li key={index} onClick={() => handleItemClick(item)}>
            {highlightText(item[filterProperty], filterText)}
          </li>
        ))}
      </ul>
    </div>
  );
}
AutoFilterDropDown.propTypes = {
  data: PropTypes.array.isRequired,
  filterProperty: PropTypes.string.isRequired,
  valueChange: PropTypes.func.isRequired,
};
