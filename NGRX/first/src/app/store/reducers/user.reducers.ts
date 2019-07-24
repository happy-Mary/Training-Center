import { EUserActions } from '../actions/user.actions';
import { UserActions } from '../actions/user.actions';
import { initialUserState, IUserState } from '../states/user.config';

export const userReducers = (
    state = initialUserState,
    action: UserActions
): IUserState => {
    switch (action.type) {
        case EUserActions.GetUsersSuccess: {
            return {
                ...state,
                users: action.playload
            };
        }
        case EUserActions.GetUserSuccess: {
            return {
                ...state,
                selectedUser: action.playload
            };
        }
        default:
            return state;
    }
};


