import React from "react";
import MenuItem from "@material-ui/core/MenuItem";

export default function EmptyMenuItem({onClick}) {
	return <MenuItem onClick={onClick}>최근 기록이 없습니다</MenuItem>;
}
