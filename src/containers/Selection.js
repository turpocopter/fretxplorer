import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "store/actions";
import { sanitize } from "dompurify";
import Notes from "components/Selection/Notes";
//import Modes from "components/Selection/Modes";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import useNoteNames from "hooks/noteNames";

const useStyles = makeStyles((theme) => {
  let chordTablet;
  return {
    paper: {
      padding: theme.spacing(1, 0, 1),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      borderBottom: "1px solid #ddd",
      backgroundColor: theme.palette.background.main,
      [`${theme.breakpoints.up(
        "sm"
      )} and (orientation: portrait)`]: (chordTablet = {
        paddingTop: 0,
        paddingBottom: theme.spacing(3),
      }),
      [`${theme.breakpoints.up(
        "md"
      )} and (orientation: landscape)`]: chordTablet,
      "@media (min-height: 680px) and (orientation: landscape)": {
        paddingTop: 12,
        borderBottom: "none",
        minHeight: "16.6em",
      },
      "@media (min-height: 840px) and (orientation: landscape)": {
        minHeight: "19.7em" /*"23.1em",*/,
      },
      "@media (min-height: 840px) and (min-width: 1140px) and (orientation: landscape)": {
        display: "flex",
        minWidth: 400,
        flexFlow: "column nowrap",
        justifyContent: "center",
        fontSize: "1em",
      },
    },
    scaleInfo: {
      width: "100%",
    },
    scaleHeader: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    title: {},
    extraInfo: {
      color: theme.palette.gray.main,
      fontSize: "0.8em",
      lineHeight: 1.5,
      marginTop: "0.4em",
    },
    buttonWrapper: {
      marginLeft: "1em",
      [`${theme.breakpoints.up("sm")} and (orientation: portrait)`]: {
        position: "relative",
        top: 30,
      },
    },
    button: {
      margin: "0.3em 0",
    },
  };
});

const Selection = ({ children, type, extraInfo }) => {
  const dispatch = useDispatch();
  const chordName = useSelector((state) => state.notePicker.chordName);
  const scaleName = useSelector((state) => state.notePicker.scaleName);
  //const scaleInfo = useSelector((state) => state.notePicker.scaleInfo);
  //const modeIndex = useSelector((state) => state.notePicker.modeIndex);
  //const parallelModes = useSelector((state) => state.settings.parallelModes);
  const rootNote = useSelector((state) => state.notePicker.rootNote);
  const selected = useSelector((state) => state.notePicker.selected);
  const namingConvention = useSelector((state) => state.settings.noteNaming);
  const classes = useStyles();
  const biggerButton = useMediaQuery("(min-width: 600px)");
  const { translateNote } = useNoteNames(namingConvention);
  //const largeScreen = useMediaQuery('(min-height: 680px) and (orientation: landscape)');

  const rootNoteValue = rootNote + (rootNote >= 4 ? 36 : 48); // on la veut à la 3è octave de la librairie (ou 4è si entre C et D#)
  const selectedWithValues = selected.map((el) => ({
    ...el,
    midiValue: rootNoteValue + el.semitonesFromRoot + (el.degree > 7 ? 12 : 0),
  }));

  const onDiscardSelection = () => {
    return dispatch(actions.reinitSelection());
  };

  return (
    selected.length > 0 && (
      <div className={classes.paper}>
        <div className={classes.scaleInfo}>
          <div className={classes.scaleHeader}>
            <div>
              <Typography
                className={classes.title}
                variant='h5'
                component='h2'
                color='primary'
                dangerouslySetInnerHTML={{
                  __html: sanitize(
                    `${translateNote(selected[0].displayName)}${
                      type === "scale" ? " " + scaleName : chordName
                    }`
                  ),
                }}
              />
              {extraInfo && (
                <div className={classes.extraInfo}>({extraInfo})</div>
              )}
            </div>
            <div className={classes.buttonWrapper}>
              <Button
                className={classes.button}
                variant='contained'
                color='primary'
                size={biggerButton ? "medium" : "small"}
                onClick={onDiscardSelection}
              >
                Pick&nbsp;Another
              </Button>
            </div>
          </div>
          <Notes
            selectionType={type}
            selectedWithValues={selectedWithValues}
            namingConvention={namingConvention}
          ></Notes>
        </div>
        {/* we might have an instance of Modes as child when selection is a scale */}
        {children}
      </div>
    )
  );
};

export default Selection;
