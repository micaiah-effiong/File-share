import express, { Request, Response, NextFunction } from "express";
export type MiddlewareFunction = (req: Request, res: Response, next: NextFunction) => void;

export type FileData = {
	filename: string;
	short: string;
	size: string;
	createdAt: Date;
	link: string;
	downloadLink: string;
	streamLink: string;
	fileType: string;
};
