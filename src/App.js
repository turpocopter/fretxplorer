import React, { Suspense, useState, useEffect, useRef } from "react";
import { Route, withRouter, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as actions from "store/actions";

import Layout from "hoc/Layout";
import Spinner from "components/UI/Spinner";
import Welcome from "pages/Welcome";
import TransitionSwitch from "react-router-transition-switch";
import Fader from "react-fader";
import MIDISounds from "midi-sounds-react";
import AudioContext from "./AudioContext";

const ChordPicker = React.lazy(() => {
	return import("pages/ChordPicker");
});
const ScalePicker = React.lazy(() => {
	return import("pages/ScalePicker");
});
const ChordGuesser = React.lazy(() => {
	return import("pages/ChordGuesser");
});
const Settings = React.lazy(() => {
	return import("pages/Settings");
});
const About = React.lazy(() => {
	return import("pages/About");
});

const INSTRUMENT_ID = 270;

function App(props) {
	const [ctxMidi, setCtxMidi] = useState(null);
	const dispatch = useDispatch();
	let midiSounds = useRef(null);
	const [isAudioActive, setIsAudioActive] = useState(false);
	useEffect(() => {
		const activate = (e) => {
			e.stopPropagation();
			setTimeout(() => {
				e.target.dispatchEvent(e);
			}, 500);
			setIsAudioActive(true);
		};
		if (!isAudioActive) {
			document.body.addEventListener("click", activate, true);
		} else {
			if (ctxMidi === null) {
				setCtxMidi({ midiSounds: midiSounds.current, INSTRUMENT_ID });
			}
		}
		return () => {
			document.body.removeEventListener("click", activate, true);
		};
	}, [isAudioActive, ctxMidi]);
	useEffect(() => {
		dispatch(actions.checkLocalSettings());
	}, [dispatch]);
	return (
		<div className='appRoot'>
			{
				<>
					<Suspense fallback={<Spinner />}>
						<AudioContext.Provider value={ctxMidi}>
							<TransitionSwitch component={Fader}>
								<Route exact path='/' component={Welcome} />
								<RouteWithLayout
									path='/chordpicker'
									component={ChordPicker}
									exact
								/>
								<RouteWithLayout
									path='/scalepicker'
									component={ScalePicker}
									exact
								/>
								<RouteWithLayout
									path='/chordguesser'
									component={ChordGuesser}
									exact
								/>
								<RouteWithLayout path='/settings' component={Settings} exact />
								<RouteWithLayout path='/about' component={About} exact />
								<Redirect to='/' />
							</TransitionSwitch>
						</AudioContext.Provider>
						{isAudioActive && (
							<div style={{ display: "none" }}>
								<MIDISounds
									ref={midiSounds}
									appElementName='root'
									instruments={[INSTRUMENT_ID]}
								/>
							</div>
						)}
					</Suspense>
				</>
			}
		</div>
	);
}

function RouteWithLayout({ component: Component, ...rest }) {
	return (
		<Route
			{...rest}
			render={(props) => (
				<Layout {...props}>
					<Component {...props} />
				</Layout>
			)}
		/>
	);
}

export default withRouter(App);
