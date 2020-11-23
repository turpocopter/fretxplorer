import React, { useEffect } from "react";
import { sanitize } from "dompurify";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

import extensionsList from "data/chords/extensions";

import PropTypes from "prop-types";

const ExtensionForm = (props) => {
	const {
		rootName,
		selected,
		extension,
		updateExtension,
		setTmpChordName,
		isDisabled,
	} = props;

	useEffect(() => {
		if (extension !== "" && extension !== "none") {
			setTmpChordName(extensionsList[extension].nameChord(selected));
		}
	}, [extension, rootName, selected, setTmpChordName]);

	const handleExtension = (e) => {
		updateExtension(e.target.value, extensionsList[e.target.value].notes);
	};

	const filteredExtensionsList = Object.keys(extensionsList)
		.filter((key) => extensionsList[key].isAvailable(selected))
		.map((key) => (
			<MenuItem key={key} value={key}>
				{extensionsList[key].symbol}
				{key !== "none" ? (
					<span
						dangerouslySetInnerHTML={{
							__html: sanitize(
								`&nbsp;(${rootName}${extensionsList[key].nameChord(selected)})`
							),
						}}
					/>
				) : (
					""
				)}
			</MenuItem>
		));
	const textFieldClasses = ["textField"];
	if (isDisabled) textFieldClasses.push("isDisabled");
	return (
		<div className='subFormWrapper extensionForm' data-test='extension-form'>
			<FormControl variant='outlined' className='formControl'>
				<TextField
					variant='outlined'
					id='extension'
					select
					label='Extension/Alteration'
					className={textFieldClasses.join(" ")}
					value={extension}
					onChange={handleExtension}
					SelectProps={{
						className: "select",
						MenuProps: {
							classes: { list: "menu pickerSubMenu" },
						},
						disabled: isDisabled,
					}}
					InputLabelProps={{
						className: "label",
					}}
					margin='normal'>
					{filteredExtensionsList}
				</TextField>
			</FormControl>
		</div>
	);
};

ExtensionForm.propTypes = {
	rootName: PropTypes.string.isRequired,
	extension: PropTypes.string,
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
	updateExtension: PropTypes.func.isRequired,
	setTmpChordName: PropTypes.func.isRequired,
};

export default ExtensionForm;
