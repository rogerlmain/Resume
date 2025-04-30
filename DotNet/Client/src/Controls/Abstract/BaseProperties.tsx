import { IBaseModel } from "Models/BaseModels";
import { ReactNode } from "react";


class ReactNodeList extends Array<ReactNode> {}


type ReactNodeContainer = ReactNode | ReactNodeList


/**** Interfaces ****/


export interface IBaseProps { id?: string }

export interface IFormProps extends IBaseProps { data?: IBaseModel }

export interface IBaseState {}

export interface IFormState {}


/**** Classes ****/


export class BaseProps implements IBaseProps { 
	public id?: string = null;
}// BaseProps;

export class BaseState implements IBaseState {}


export class Fertile {
	public children?: ReactNodeContainer = null;
}// Fertile;
