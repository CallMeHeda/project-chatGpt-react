import React from "react";

function ChoixAlimentations({ alimentationInfos, onSelectAlimentations }) {
  const onSelectAlimentation = (e) => {
    const choice = e.target.value;
    onSelectAlimentations(choice);
  };

  return (
    <div>
      <label htmlFor={alimentationInfos.type}>
        <input
          type="checkbox"
          id={alimentationInfos.type}
          name={alimentationInfos.type}
          value={alimentationInfos.type}
          onChange={onSelectAlimentation}
        />
        {alimentationInfos.type}
      </label>
    </div>
  );
}

export default ChoixAlimentations;
