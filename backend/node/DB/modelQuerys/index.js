import HostQuery from "./querys/HostQuery.js";
import models from "../models";
import EventQuery from "./querys/EventQuery.js";

export const hostQuery = new HostQuery(models);

export const eventQuery = new EventQuery(models);
