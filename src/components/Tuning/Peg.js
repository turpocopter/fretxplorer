import React from "react";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";

import PropTypes from "prop-types";

const Peg = ({
  tuning,
  useFlats = false,
  getNoteName,
  onClickPeg,
  isActive,
  isOpen,
  isOpening,
  isClosing,
  alwaysOpen,
  isLinked,
  stringId,
  tuneUp,
  tuneDown,
  tuneUpDisabled,
  tuneDownDisabled,
}) => {
  const pegClasses = ["peg"];
  const tuneUpClasses = ["tuneBtn", "tuneUpBtn"];
  const tuneDownClasses = ["tuneBtn", "tuneDownBtn"];
  if (alwaysOpen) pegClasses.push("alwaysOpen");
  if (isOpen) pegClasses.push("open");
  if (isActive) pegClasses.push("active");
  if (isLinked) pegClasses.push("linked");
  if (isOpening || isClosing) {
    tuneUpClasses.push("hidden");
    tuneDownClasses.push("hidden");
  }
  return (
    <div className={pegClasses.join(" ")}>
      {isOpen && !isLinked && (
        <button
          className={tuneDownClasses.join(" ")}
          onClick={() => tuneDown(stringId)}
          disabled={tuneDownDisabled}
        >
          <RemoveCircleIcon />
        </button>
      )}
      <div onClick={onClickPeg}>{getNoteName(tuning.n, useFlats)}</div>
      {isOpen && !isLinked && (
        <button
          className={tuneUpClasses.join(" ")}
          onClick={() => tuneUp(stringId)}
          disabled={tuneUpDisabled}
        >
          <AddCircleIcon />
        </button>
      )}
    </div>
  );
};

Peg.propTypes = {
  tuning: PropTypes.shape({
    n: PropTypes.number.isRequired,
    o: PropTypes.number.isRequired,
  }).isRequired,
  useFlats: PropTypes.bool,
  getNoteName: PropTypes.func.isRequired,
  onClickPeg: PropTypes.func.isRequired,
  isActive: PropTypes.bool,
  isOpen: PropTypes.bool,
  isOpening: PropTypes.bool,
  isClosing: PropTypes.bool,
  alwaysOpen: PropTypes.bool,
  isLinked: PropTypes.bool,
  stringId: PropTypes.number.isRequired,
  tuneUp: PropTypes.func.isRequired,
  tuneDown: PropTypes.func.isRequired,
  tuneUpDisabled: PropTypes.bool,
  tuneDownDisabled: PropTypes.bool,
};

export default Peg;
