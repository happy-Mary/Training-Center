import { Action } from '@ngrx/store';

import { IConfig } from '../../models/app.interface';

export enum EConfigActions {
    GetConfig = '[User] Get Config',
    GetConfigSuccess = '[User] Get Config Success',
}

export class GetConfig implements Action {
    public readonly type = EConfigActions.GetConfig;
}


export class GetConfigSuccess implements Action {
    public readonly type = EConfigActions.GetConfigSuccess;
    constructor(public playload: IConfig) {}
}

export type ConfigActions = GetConfig | GetConfigSuccess;
