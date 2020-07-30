import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import ListSubheader from "@material-ui/core/ListSubheader";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: "flex",
    justifyContent: "center",
  },
  formControl: {
    margin: 0,
    width: 218,
  },
  select: {
    fontSize: "0.95em",
    "& span": {
      color: "#999",
      fontSize: "0.9em",
    },
  },
  label: {
    fontSize: "0.92em",
  },
  menu: {
    fontSize: "0.95em",
  },
  group: { fontSize: "1em", textAlign: "center", color: "#999" },
  option: {
    fontSize: "1em",
    minHeight: 34,
    "& span": {
      color: "#999",
      fontSize: "0.9em",
    },
  },
}));

const tuningPresets = [
  {
    cat_name: "Standard and derived",
    tunings: [
      {
        id: "EADBGE",
        name: "Standard",
        tuning: [
          { stringId: 6, note: 4, octave: 2 },
          { stringId: 5, note: 9, octave: 2 },
          { stringId: 4, note: 2, octave: 3 },
          { stringId: 3, note: 7, octave: 3 },
          { stringId: 2, note: 11, octave: 3 },
          { stringId: 1, note: 4, octave: 4 },
        ],
      },
      {
        id: "DADGBE",
        name: "Drop D",
        tuning: [
          { stringId: 6, note: 2, octave: 2 },
          { stringId: 5, note: 9, octave: 2 },
          { stringId: 4, note: 2, octave: 3 },
          { stringId: 3, note: 7, octave: 3 },
          { stringId: 2, note: 11, octave: 3 },
          { stringId: 1, note: 4, octave: 4 },
        ],
      },
      {
        id: "DADBGD",
        name: "D modal",
        tuning: [
          { stringId: 6, note: 2, octave: 2 },
          { stringId: 5, note: 9, octave: 2 },
          { stringId: 4, note: 2, octave: 3 },
          { stringId: 3, note: 7, octave: 3 },
          { stringId: 2, note: 11, octave: 3 },
          { stringId: 1, note: 2, octave: 4 },
        ],
      },
      {
        id: "BEADF#B",
        name: "Baritone",
        tuning: [
          { stringId: 6, note: 11, octave: 1 },
          { stringId: 5, note: 4, octave: 2 },
          { stringId: 4, note: 9, octave: 2 },
          { stringId: 3, note: 2, octave: 3 },
          { stringId: 2, note: 6, octave: 3 },
          { stringId: 1, note: 11, octave: 3 },
        ],
      },
    ],
  },
  {
    cat_name: "Tunings in C",
    tunings: [
      {
        id: "CGCGCE",
        name: "Open C major",
        tuning: [
          { stringId: 6, note: 0, octave: 2 },
          { stringId: 5, note: 7, octave: 2 },
          { stringId: 4, note: 0, octave: 3 },
          { stringId: 3, note: 7, octave: 3 },
          { stringId: 2, note: 0, octave: 4 },
          { stringId: 1, note: 4, octave: 4 },
        ],
      },
      {
        id: "CGCGCD♭",
        name: "Open C minor",
        tuning: [
          { stringId: 6, note: 0, octave: 2 },
          { stringId: 5, note: 7, octave: 2 },
          { stringId: 4, note: 0, octave: 3 },
          { stringId: 3, note: 7, octave: 3 },
          { stringId: 2, note: 0, octave: 4 },
          { stringId: 1, note: 3, octave: 4 },
        ],
      },
      {
        id: "CGCGGC",
        name: "Open C no third / Ben Howard",
        tuning: [
          { stringId: 6, note: 0, octave: 2 },
          { stringId: 5, note: 7, octave: 2 },
          { stringId: 4, note: 0, octave: 3 },
          { stringId: 3, note: 7, octave: 3 },
          { stringId: 2, note: 7, octave: 3 },
          { stringId: 1, note: 0, octave: 4 },
        ],
      },
    ],
  },
  {
    cat_name: "Tunings in D",
    tunings: [
      {
        id: "DADGAD",
        name: "Dsus4",
        tuning: [
          { stringId: 6, note: 2, octave: 2 },
          { stringId: 5, note: 9, octave: 2 },
          { stringId: 4, note: 2, octave: 3 },
          { stringId: 3, note: 7, octave: 3 },
          { stringId: 2, note: 9, octave: 3 },
          { stringId: 1, note: 2, octave: 4 },
        ],
      },
      {
        id: "DADF#AD",
        name: "Open D major / Vestapol",
        tuning: [
          { stringId: 6, note: 2, octave: 2 },
          { stringId: 5, note: 9, octave: 2 },
          { stringId: 4, note: 2, octave: 3 },
          { stringId: 3, note: 6, octave: 3 },
          { stringId: 2, note: 9, octave: 3 },
          { stringId: 1, note: 2, octave: 4 },
        ],
      },
      {
        id: "DADFAD",
        name: "Open D minor",
        tuning: [
          { stringId: 6, note: 2, octave: 2 },
          { stringId: 5, note: 9, octave: 2 },
          { stringId: 4, note: 2, octave: 3 },
          { stringId: 3, note: 5, octave: 3 },
          { stringId: 2, note: 9, octave: 3 },
          { stringId: 1, note: 2, octave: 4 },
        ],
      },
      {
        id: "DADEAD",
        name: "Dsus2",
        tuning: [
          { stringId: 6, note: 2, octave: 2 },
          { stringId: 5, note: 9, octave: 2 },
          { stringId: 4, note: 2, octave: 3 },
          { stringId: 3, note: 4, octave: 3 },
          { stringId: 2, note: 9, octave: 3 },
          { stringId: 1, note: 2, octave: 4 },
        ],
      },
      {
        id: "DADDAD",
        name: "Open D - no third",
        tuning: [
          { stringId: 6, note: 2, octave: 2 },
          { stringId: 5, note: 9, octave: 2 },
          { stringId: 4, note: 2, octave: 3 },
          { stringId: 3, note: 2, octave: 3 },
          { stringId: 2, note: 9, octave: 3 },
          { stringId: 1, note: 2, octave: 4 },
        ],
      },
    ],
  },
  {
    cat_name: "Tunings in G",
    tunings: [
      {
        id: "DGDGBD",
        name: "Open G major",
        tuning: [
          { stringId: 6, note: 2, octave: 2 },
          { stringId: 5, note: 7, octave: 2 },
          { stringId: 4, note: 2, octave: 3 },
          { stringId: 3, note: 7, octave: 3 },
          { stringId: 2, note: 11, octave: 3 },
          { stringId: 1, note: 2, octave: 4 },
        ],
      },
      {
        id: "DGDGB♭D",
        name: "Open G minor",
        tuning: [
          { stringId: 6, note: 2, octave: 2 },
          { stringId: 5, note: 7, octave: 2 },
          { stringId: 4, note: 2, octave: 3 },
          { stringId: 3, note: 7, octave: 3 },
          { stringId: 2, note: 10, octave: 3 },
          { stringId: 1, note: 2, octave: 4 },
        ],
      },
    ],
  },
  {
    cat_name: "Other open tunings",
    tunings: [
      {
        id: "EAC#EAE",
        name: "Open A major",
        tuning: [
          { stringId: 6, note: 4, octave: 2 },
          { stringId: 5, note: 9, octave: 2 },
          { stringId: 4, note: 1, octave: 3 },
          { stringId: 3, note: 4, octave: 3 },
          { stringId: 2, note: 9, octave: 3 },
          { stringId: 1, note: 4, octave: 4 },
        ],
      },
      {
        id: "EACEAE",
        name: "Open A minor",
        tuning: [
          { stringId: 6, note: 4, octave: 2 },
          { stringId: 5, note: 9, octave: 2 },
          { stringId: 4, note: 0, octave: 3 },
          { stringId: 3, note: 4, octave: 3 },
          { stringId: 2, note: 9, octave: 3 },
          { stringId: 1, note: 4, octave: 4 },
        ],
      },
      {
        id: "EAEACE",
        name: "Open A minor v2",
        tuning: [
          { stringId: 6, note: 4, octave: 2 },
          { stringId: 5, note: 9, octave: 2 },
          { stringId: 4, note: 4, octave: 3 },
          { stringId: 3, note: 9, octave: 3 },
          { stringId: 2, note: 0, octave: 4 },
          { stringId: 1, note: 4, octave: 4 },
        ],
      },
      {
        id: "BF#BF#BD#",
        name: "Open B major",
        tuning: [
          { stringId: 6, note: 11, octave: 1 },
          { stringId: 5, note: 6, octave: 2 },
          { stringId: 4, note: 11, octave: 2 },
          { stringId: 3, note: 6, octave: 3 },
          { stringId: 2, note: 11, octave: 3 },
          { stringId: 1, note: 3, octave: 4 },
        ],
      },
      {
        id: "CFCFAC",
        name: "Open F major",
        tuning: [
          { stringId: 6, note: 0, octave: 2 },
          { stringId: 5, note: 5, octave: 2 },
          { stringId: 4, note: 0, octave: 3 },
          { stringId: 3, note: 5, octave: 3 },
          { stringId: 2, note: 9, octave: 3 },
          { stringId: 1, note: 0, octave: 4 },
        ],
      },
    ],
  },
  {
    cat_name: "Other modal & extended tunings",
    tunings: [
      {
        id: "BEBEBE",
        name: "Nick Drake's B modal",
        tuning: [
          { stringId: 6, note: 11, octave: 1 },
          { stringId: 5, note: 4, octave: 2 },
          { stringId: 4, note: 11, octave: 2 },
          { stringId: 3, note: 4, octave: 3 },
          { stringId: 2, note: 11, octave: 3 },
          { stringId: 1, note: 4, octave: 4 },
        ],
      },
      {
        id: "CACGCE",
        name: "C6",
        tuning: [
          { stringId: 6, note: 0, octave: 2 },
          { stringId: 5, note: 9, octave: 2 },
          { stringId: 4, note: 0, octave: 3 },
          { stringId: 3, note: 7, octave: 3 },
          { stringId: 2, note: 0, octave: 4 },
          { stringId: 1, note: 4, octave: 4 },
        ],
      },
      {
        id: "CGDGCD",
        name: "Gsus4 / Orkney Tuning",
        tuning: [
          { stringId: 6, note: 0, octave: 2 },
          { stringId: 5, note: 7, octave: 2 },
          { stringId: 4, note: 2, octave: 3 },
          { stringId: 3, note: 7, octave: 3 },
          { stringId: 2, note: 0, octave: 4 },
          { stringId: 1, note: 2, octave: 4 },
        ],
      },
      {
        id: "DGDGBE",
        name: "G6",
        tuning: [
          { stringId: 6, note: 2, octave: 2 },
          { stringId: 5, note: 7, octave: 2 },
          { stringId: 4, note: 2, octave: 3 },
          { stringId: 3, note: 7, octave: 3 },
          { stringId: 2, note: 11, octave: 3 },
          { stringId: 1, note: 4, octave: 4 },
        ],
      },
    ],
  },
  {
    cat_name: "Other",
    tunings: [
      {
        id: "BF♯BGBE",
        name: "Karnivool Tuning",
        tuning: [
          { stringId: 6, note: 11, octave: 1 },
          { stringId: 5, note: 6, octave: 2 },
          { stringId: 4, note: 11, octave: 2 },
          { stringId: 3, note: 7, octave: 3 },
          { stringId: 2, note: 11, octave: 3 },
          { stringId: 1, note: 4, octave: 4 },
        ],
      },
      {
        id: "CGCFCE",
        name: "Pink Moon",
        tuning: [
          { stringId: 6, note: 0, octave: 2 },
          { stringId: 5, note: 7, octave: 2 },
          { stringId: 4, note: 0, octave: 3 },
          { stringId: 3, note: 5, octave: 3 },
          { stringId: 2, note: 0, octave: 4 },
          { stringId: 1, note: 4, octave: 4 },
        ],
      },
      {
        id: "CGDAEG",
        name: "Fripp's New Standard Tuning",
        tuning: [
          { stringId: 6, note: 0, octave: 2 },
          { stringId: 5, note: 7, octave: 2 },
          { stringId: 4, note: 2, octave: 3 },
          { stringId: 3, note: 9, octave: 3 },
          { stringId: 2, note: 4, octave: 4 },
          { stringId: 1, note: 7, octave: 4 },
        ],
      },
      {
        id: "DADEBC#",
        name: "Ålesund",
        tuning: [
          { stringId: 6, note: 2, octave: 2 },
          { stringId: 5, note: 9, octave: 2 },
          { stringId: 4, note: 2, octave: 3 },
          { stringId: 3, note: 4, octave: 3 },
          { stringId: 2, note: 11, octave: 3 },
          { stringId: 1, note: 1, octave: 4 },
        ],
      },
      {
        id: "DADF#BE",
        name: "José González tuning",
        tuning: [
          { stringId: 6, note: 2, octave: 2 },
          { stringId: 5, note: 9, octave: 2 },
          { stringId: 4, note: 2, octave: 3 },
          { stringId: 3, note: 6, octave: 3 },
          { stringId: 2, note: 11, octave: 3 },
          { stringId: 1, note: 4, octave: 4 },
        ],
      },
      {
        id: "DGCGCD",
        name: "The Rain Song",
        tuning: [
          { stringId: 6, note: 2, octave: 2 },
          { stringId: 5, note: 7, octave: 2 },
          { stringId: 4, note: 0, octave: 3 },
          { stringId: 3, note: 7, octave: 3 },
          { stringId: 2, note: 0, octave: 4 },
          { stringId: 1, note: 2, octave: 4 },
        ],
      },
    ],
  },
];

const Presets = ({ preset, selectPreset }) => {
  const classes = useStyles();
  const listContents = tuningPresets.map((cat) => {
    const catItems = cat.tunings.map((el) => (
      <MenuItem
        key={el.id}
        value={el.id}
        data-cat={cat.cat_name}
        className={classes.option}
      >
        {el.id}&nbsp;<span>({el.name})</span>
      </MenuItem>
    ));
    return [
      <ListSubheader key={cat.cat_name} className={classes.group} disableSticky>
        {cat.cat_name}
      </ListSubheader>,
      catItems,
    ];
  });
  const onChangePreset = (e) => {
    if (e.currentTarget.dataset.hasOwnProperty("cat")) {
      const cat = tuningPresets.find(
        (cat) => cat.cat_name === e.currentTarget.dataset.cat
      );
      const preset = cat.tunings.find((tuning) => tuning.id === e.target.value);
      selectPreset(preset.id, preset.tuning);
    } else {
      e.preventDefault();
    }
  };
  return (
    <div className={classes.wrapper}>
      <FormControl variant='outlined' className={classes.formControl}>
        <TextField
          variant='outlined'
          id='tuningPreset'
          select
          label='Tuning presets'
          value={preset}
          onChange={onChangePreset}
          className={classes.textField}
          SelectProps={{
            className: classes.select,
            MenuProps: {
              className: classes.menu,
            },
          }}
          InputLabelProps={{
            className: classes.label,
          }}
          margin='normal'
          size='small'
        >
          {listContents}
        </TextField>
      </FormControl>
    </div>
  );
};

export default Presets;
