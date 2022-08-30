import { EventEmitter } from "events";

type ServerEvents = "FILE" | "FOLDER";
type ServerEventMode = "CREATED" | "UPDATED" | "DELETED" | "READ";
type ServerEventNames<T extends ServerEvents = ServerEvents> = `${T}::${ServerEventMode}`;

const socketServerEvent = new EventEmitter();
export const socketServerEventEmit = (event: ServerEventNames, ...args: any[]) => {
	socketServerEvent.emit(event, ...args);
};

export const socketServerEventListenOn = (event: ServerEventNames, listener: (...args: any[]) => void) => {
	return socketServerEvent.on(event, listener);
};
