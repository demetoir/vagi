import React from "react";
import Box from "@material-ui/core/Box";
import grey from "@material-ui/core/colors/grey.js";

const style = {
	backgroundColor: grey[300],
};

export default function PaddingArea({p = 24}) {
	return <Box p={p} style={style}/>;
}
