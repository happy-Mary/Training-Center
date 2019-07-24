import { IConfig } from '../../models/app.interface';

export interface IConfigState {
    config: IConfig;
}

export const initialConfigState: IConfigState = {
    config: null,
};
