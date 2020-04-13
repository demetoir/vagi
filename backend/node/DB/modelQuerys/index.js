import HostQuery from "./querys/HostQuery.js";
import models from "../models";
import EventQuery from "./querys/EventQuery.js";
import GuestQuery from "./querys/GuestQuery.js";

export const hostQuery = new HostQuery(models);

export const eventQuery = new EventQuery(models);

export const guestQuery = new GuestQuery(models);


// todo candidate
// todo emoji
// todo hashtag
// todo host
// todo like
// todo poll
// todo question
// todo vote

