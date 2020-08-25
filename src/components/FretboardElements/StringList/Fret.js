import React from "react";
import Fade from "@material-ui/core/Fade";
import PropTypes from "prop-types";

export default function Fret(props) {
  const { display, isRoot, note, octave, playNote } = props;
  const [isActive, setIsActive] = React.useState(false);
  const onPlay = (note, octave) => {
    if (!isActive) {
      setIsActive(true);
      playNote(note, octave);
      setTimeout(() => {
        setIsActive(false);
      }, 1000);
    }
  };
  const wrapperClasses = [
    "Fret",
    `fret-${props.position}`,
    `string-${props.stringId}`,
  ];
  const fretClasses = ["FretInner"];
  const delimiterClasses = ["FretDelimiter"];
  if (props.stringId === 1) {
    wrapperClasses.push("firstString");
    delimiterClasses.push("firstString");
  }
  if (props.stringId === 6) {
    wrapperClasses.push("lastString");
    delimiterClasses.push("lastString");
  }
  if (props.position === 0) wrapperClasses.push("openString");
  if (props.isLeftHanded) wrapperClasses.push("leftHanded");
  if (
    (props.isLeftHanded && props.stringId === 1) ||
    (!props.isLeftHanded && props.stringId === 6)
  ) {
    wrapperClasses.push("leftMost");
    delimiterClasses.push("leftMost");
  } else if (
    (props.isLeftHanded && props.stringId === 6) ||
    (!props.isLeftHanded && props.stringId === 1)
  ) {
    wrapperClasses.push("rightMost");
    delimiterClasses.push("rightMost");
  }
  if (isRoot) fretClasses.push("isRoot");
  if (isActive) fretClasses.push("active");
  const content = (
    <Fade in={Boolean(display)} timeout={{ enter: 300, exit: 0 }}>
      <div
        className={fretClasses.join(" ")}
        onClick={() => onPlay(note, octave)}
      >
        {display !== "N" && display}
      </div>
    </Fade>
  );
  return (
    <>
      <div className={wrapperClasses.join(" ")}>{content}</div>
      {props.position > 0 && <div className={delimiterClasses.join(" ")} />}
    </>
  );
}
