import "./NoAccess.css"
import "bootstrap/dist/css/bootstrap.min.css";

const NoAccess = () => {
    return (
        <div class="outsideNoAccess">
            <div className="border border-dark containerNoAccess">
                <p className="text">You don't have access to this page.</p>
            </div>
        </div>
    )
}

export default NoAccess;