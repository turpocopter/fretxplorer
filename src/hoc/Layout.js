import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import Header from "../components/Navigation/Header";
import SideDrawer from "components/Navigation/SideDrawer";

const Layout = (props) => {
	const [drawerIsOpened, setDrawerIsOpened] = useState(false);

	const toggleDrawer = (isOpened) => (event) => {
		if (
			event.type === "keydown" &&
			(event.key === "Tab" || event.key === "Shift")
		) {
			return;
		}
		setDrawerIsOpened(isOpened);
	};

	return (
		<>
			<CssBaseline />
			<Box style={{ minHeight: "100%", height: "100%" }}>
				<SideDrawer isOpened={drawerIsOpened} toggle={toggleDrawer} />
				<Header toggleDrawer={toggleDrawer} />
				<>{props.children}</>
			</Box>
		</>
	);
};

export default Layout;
