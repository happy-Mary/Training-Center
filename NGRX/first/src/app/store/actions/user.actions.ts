import { Action } from '@ngrx/store';

import { IUser } from '../../models/app.interface';

export enum EUserActions {
    GetUsers = '[User] Get Users',
    GetUsersSuccess = '[User] Get Users Success',
    GetUser = '[User] Get User',
    GetUserSuccess = '[User] Get User Success'
}

export class GetUsers implements Action {
    public readonly type = EUserActions.GetUsers;
}


export class GetUsersSuccess implements Action {
    public readonly type = EUserActions.GetUsersSuccess;
    constructor(public playload: IUser[]) {}
}

export class GetUser implements Action {
    public readonly type = EUserActions.GetUser;
}

export class GetUserSuccess implements Action {
    public readonly type = EUserActions.GetUserSuccess;
    constructor(public playload: IUser) {}
}

export type UserActions = GetUsers | GetUsersSuccess | GetUser | GetUserSuccess;
