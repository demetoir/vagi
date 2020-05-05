import React, {useEffect, useRef, useState} from "react";
import Card from "@material-ui/core/Card";
import {CardContent} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import QuestionHeader from "./QuestionCardHeader.js";
import QuestionBody from "./QuestionCardBody.js";
import EmojiArea from "../EmojiArea/EmojiArea.js";
import ReplyPreviewArea from "../ReplyPreviewArea/ReplyPreviewArea.js";
import {scrollSyncManager} from "../../socket";

const cardColor = {
	focused: "rgb(242,248,255)",
	unfocused: "rgba(255,255,255,100)",
	unsynced: "rgba(255,255,255,100)",
	synced: "rgb(242,248,100)",
};

const QuestionCard = props => {
	const [backgroundColor, setState] = useState(cardColor.unfocused);
	const selfRef = useRef(null);
	const {scrollRef} = props;

	const scrollEl = scrollRef.current;

	useEffect(() => {
		// set add only in viewPort self component
		const handleScroll = () => {
			const viewStart = scrollEl.scrollTop;
			const viewEnd = scrollEl.scrollTop + scrollEl.clientHeight;

			const selfStart = selfRef.current.offsetTop;
			const selfEnd =
				selfRef.current.offsetTop + selfRef.current.clientHeight;

			// on out of screen with +- margin of boarder px
			const SCROLL_BOARDER_MARGIN = 300;

			if (
				viewEnd + SCROLL_BOARDER_MARGIN < selfStart ||
				selfEnd < viewStart - SCROLL_BOARDER_MARGIN
			) {
				setState(cardColor.unfocused);
				scrollSyncManager.remove(props.id);
			} else {
				setState(cardColor.synced);
				scrollSyncManager.add(props.id);
			}
		};

		// init on didMount
		handleScroll();

		scrollEl.addEventListener("scroll", handleScroll);

		return () => {
			//on didUnMount remove Lisnter and unSync selfComponent
			scrollEl.removeEventListener("scroll", handleScroll);

			scrollSyncManager.remove(props.id);
		};
	}, []);

	return (
		<Card style={{margin: "0.5rem", backgroundColor}} ref={selfRef}>
			<CardContent style={{paddingTop: "1rem", paddingBottom: "0"}}>
				<QuestionHeader {...props} />
				<Divider
					style={{marginTop: "0.5rem", marginBottom: "0.5rem"}}
				/>
				<QuestionBody {...props} />
				<EmojiArea {...props} />
				<ReplyPreviewArea {...props} />
			</CardContent>
		</Card>
	);
};

QuestionCard.proptypes = {};

export default React.memo(QuestionCard);
