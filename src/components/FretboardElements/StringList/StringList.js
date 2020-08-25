import React from "react";
import String from "./String";

import PropTypes from "prop-types";

const StringList = (props) => {
  const stringList = props.tuning.map((el) => (
    <String
      {...props}
      key={el.stringId}
      name={el.stringId}
      isLeftHanded={props.isLeftHanded}
      tuning={el}
    />
  ));
  let stringListClasses = "StringList";
  if (props.isLeftHanded) stringListClasses += " leftHanded";
  return (
    <div data-test='string-list' className={stringListClasses}>
      {stringList}
    </div>
  );
};

StringList.propTypes = {
  isLeftHanded: PropTypes.bool.isRequired,
  tuning: PropTypes.arrayOf(
    PropTypes.shape({
      stringId: PropTypes.number.isRequired,
      note: PropTypes.number.isRequired,
      octave: PropTypes.number.isRequired,
    })
  ),
};

export default StringList;
