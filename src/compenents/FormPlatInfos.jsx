import React, { useState } from "react";
import ChoixAlimentations from "./ChoixAlimentations";

function FormPlatInfos() {
  const [plat, setPlat] = useState("");
  const [nbPersonnes, setnbPersonnes] = useState(1);
  const [alimentations, setAlimentations] = useState([
    { id: 1, type: "Végétarien" },
    { id: 2, type: "Végan" },
    { id: 3, type: "Pesco-végétarien" },
    { id: 4, type: "Flexitarien" },
    { id: 5, type: "Sans lactose" },
    { id: 6, type: "Sans gluten" },
    { id: 7, type: "keto" },
  ]);
  const [alimentationChoice, setAlimentationChoice] = useState([]);
  const [recette, setRecette] = useState("");
  const [data, setData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (plat !== "" && alimentationChoice.length === 0) {
      setRecette(
        `Donne moi la recette ${plat} pour ${nbPersonnes} personne(s)`
      );
    } else if (plat !== "" && alimentationChoice.length > 0) {
      setRecette(
        `Donne moi la recette ${plat} pour ${nbPersonnes} personne(s) ${alimentationChoice}`
      );
    } else {
      setRecette("");
    }

    fetch(`http://localhost:8080/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: recette,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data.result.choices[0].text);
      });
  };

  const handleChangePlat = (e) => {
    setPlat(e.target.value);
  };

  const handleChangeNbPersonne = (e) => {
    setnbPersonnes(e.target.valueAsNumber);
  };

  const onSelect = (choice) => {
    const alimentationCopy = [...alimentationChoice];
    alimentationCopy.push(choice);
    setAlimentationChoice(alimentationCopy);
  };

  return (
    <div>
      <form onClick={handleSubmit}>
        <input
          type="text"
          name="plat"
          id="platInput"
          placeholder="Plat à cuisiner"
          value={plat}
          onChange={handleChangePlat}
        />
        <input
          type="number"
          name="nbPersonne"
          id="nbPersonneInput"
          value={nbPersonnes}
          placeholder="Nombre de personnes"
          min={nbPersonnes}
          onChange={handleChangeNbPersonne}
        />

        {alimentations.map((alimentation) => {
          return (
            <div key={alimentation.id}>
              <ChoixAlimentations
                alimentationInfos={alimentation}
                onSelectAlimentations={onSelect}
              />
            </div>
          );
        })}
        <button>Envoyer</button>
      </form>
      {data ? <h3>{data}</h3> : null}{" "}
    </div>
  );
}

export default FormPlatInfos;
