import React from "react";

import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Switch from "@material-ui/core/Switch";
import IconButton from "@material-ui/core/IconButton";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import useNotes from "hooks/noteNames";

import PropTypes from "prop-types";

const Modes = ({
	modes,
	selected,
	current,
	setCurrent,
	pickPrevious,
	pickNext,
	parallelModes,
	toggleParallelModes,
	namingConvention,
}) => {
	const { translateNote } = useNotes(namingConvention);
	return (
		<div data-test='modes' className='modes'>
			<div className='wrapper'>
				<div className='btnPrevious'>
					<IconButton aria-label='delete' onClick={pickPrevious}>
						<NavigateBeforeIcon fontSize='large' />
					</IconButton>
				</div>
				<div className='mainCtrlsWrapper'>
					<div className='modeSelector'>
						<FormControl variant='outlined' className='formControl'>
							<TextField
								variant='outlined'
								id='modes'
								select
								label='Modes'
								className='textField'
								value={current}
								onChange={(e) =>
									setCurrent(e.target.value, e.currentTarget.dataset.name)
								}
								SelectProps={{
									className: "select",
									MenuProps: {
										classes: { list: "menu" },
									},
								}}
								InputLabelProps={{
									className: "label",
								}}
								margin='normal'
								size='small'>
								{modes.map((mode, i) => {
									const rootForMode = translateNote(
										selected[
											parallelModes
												? 0
												: (selected.length + i - current) % selected.length
										].displayName
									);
									const modeName = mode.hasOwnProperty("shortName")
										? mode.shortName
										: mode.fullName;
									const displayName = mode.hasOwnProperty("listName")
										? mode.listName
										: modeName;
									return (
										<MenuItem
											key={i}
											value={i}
											data-name={`${modeName}`}
											className='option'>
											{`${rootForMode} ${displayName}`}
										</MenuItem>
									);
								})}
							</TextField>
						</FormControl>
					</div>
					<div className='modeSwitch'>
						<label className='flatSwitch'>
							Relative <span className='switchLabelExtras'>modes</span>
							<Switch
								checked={parallelModes}
								onChange={toggleParallelModes}
								color='default'
							/>
							Parallel <span className='switchLabelExtras'>modes</span>
						</label>
					</div>
				</div>
				<div className='btnNext'>
					<IconButton aria-label='delete' onClick={pickNext}>
						<NavigateNextIcon fontSize='large' />
					</IconButton>
				</div>
			</div>
		</div>
	);
};

Modes.propTypes = {
	modes: PropTypes.arrayOf(
		PropTypes.shape({
			fullName: PropTypes.string.isRequired,
			shortName: PropTypes.string,
			listName: PropTypes.string,
			aliases: PropTypes.arrayOf(PropTypes.string),
		})
	).isRequired,
	current: PropTypes.number.isRequired,
	setCurrent: PropTypes.func.isRequired,
	pickPrevious: PropTypes.func.isRequired,
	pickNext: PropTypes.func.isRequired,
	selected: PropTypes.arrayOf(
		PropTypes.shape({
			degree: PropTypes.number.isRequired,
			displayInterval: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
				.isRequired,
			semitonesFromRoot: PropTypes.number.isRequired,
			displayName: PropTypes.shape({
				alt: PropTypes.string,
				id: PropTypes.number.isRequired,
			}).isRequired,
		})
	),
	parallelModes: PropTypes.bool.isRequired,
	toggleParallelModes: PropTypes.func.isRequired,
	namingConvention: PropTypes.oneOf(["letters", "latin"]),
};

export default Modes;
