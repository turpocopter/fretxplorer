/* eslint-disable no-undef */

export const checkPegsDirection = (
	parentSelector,
	rToL = false,
	vertical = false
) => {
	let positionPeg1;
	let positionPeg2;
	cy.get(parentSelector)
		.find(".peg:nth-child(2)")
		.then(($peg1) => {
			positionPeg1 = $peg1.position();
		});
	cy.get(parentSelector)
		.find(".peg:nth-child(3)")
		.then(($peg2) => {
			positionPeg2 = $peg2.position();
			expect(
				rToL || vertical
					? positionPeg1[vertical ? "top" : "left"] -
							positionPeg2[vertical ? "top" : "left"]
					: positionPeg2.left - positionPeg1.left
			).to.be.at.least(0);
		});
};

export const checkStringsDirection = (
	parentSelector,
	rToL = false,
	vertical = false
) => {
	let positionString1;
	let positionString2;
	cy.get(parentSelector)
		.find(".string-6")
		.then(($string1) => {
			positionString1 = $string1.position();
		});
	cy.get(parentSelector)
		.find(".string-5")
		.then(($string2) => {
			positionString2 = $string2.position();
			expect(
				rToL || vertical
					? positionString1[rToL ? "left" : "top"] -
							positionString2[rToL ? "left" : "top"]
					: positionString2.left - positionString1.left
			).to.be.at.least(0);
		});
};

export const checkFretsDirection = (parentSelector, rToL = false) => {
	let positionFret1;
	let positionFret2;
	cy.get(parentSelector)
		.find(".fret-1")
		.then(($fret1) => {
			positionFret1 = $fret1.position();
		});
	cy.get(parentSelector)
		.find(".fret-2")
		.then(($fret2) => {
			positionFret2 = $fret2.position();
			expect(
				rToL
					? positionFret1.left - positionFret2.left
					: positionFret2.left - positionFret1.left
			).to.be.at.least(0);
		});
};

export const pickChord = (latin = false) => {
	const c = latin ? "Do" : "C";
	cy.get(".chordPickerForm").as("cpf");
	cy.get("@cpf").find(".rootForm .textField").click();
	cy.get(".MuiPopover-root").contains(`${c}♯`).click();
	cy.get("@cpf").find(".qualityForm .textField").click();
	cy.get(".MuiPopover-root").contains(`diminished (${c}♯o)`).click();
	cy.get("@cpf")
		.find(".submitButton")
		.contains(`${c}♯o`)
		.should("be.visible")
		.click();
};

export const pickScale = (latin = false) => {
	const c = latin ? "Do" : "C";
	cy.get(".scalePickerForm").as("spf");
	cy.get("@spf").find(".rootForm .textField").click();
	cy.get(".MuiPopover-root").contains(`${c}♯`).click();
	cy.get("@spf").find(".scaleList").click();
	cy.get(".MuiPopover-root").contains("Harmonic minor scale").click();
	cy.get("@spf")
		.find(".submitButton")
		.contains(`${c}♯ harmonic minor`)
		.should("be.visible")
		.click();
};
