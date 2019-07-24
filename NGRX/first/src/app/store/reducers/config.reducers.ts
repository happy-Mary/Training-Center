import { EConfigActions, ConfigActions } from '../actions/config.actions';
import { initialConfigState, IConfigState } from '../states/config.state';

export const configReducer = (
    state = initialConfigState,
    action: ConfigActions): IConfigState => {
        switch (action.type) {
            case EConfigActions.GetConfigSuccess: {
                return {
                    ...state,
                    config: action.playload
                };
            }
            default:
                return state;
        }
    };
