import USERS_TYPES from "./roles.js"
import Cookies from "js-cookie";
import NoAccess from "./NoAccess.js";


export const AdminElement = ({children}) => {
    const type = Cookies.get('role');

    if (type === USERS_TYPES.ADMIN_USER) {
        return <>{children}</>;
    }
    return <NoAccess/>
}

export const UserElement = ({children}) => {
    const type = Cookies.get('role');

    if (type === USERS_TYPES.NORMAL_USER) {
        return <>{children}</>;
    }
    return <NoAccess/>
}
