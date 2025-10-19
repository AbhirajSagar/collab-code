import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";

export default function Navbar()
{
    return (
        <div className="w-full h-12 flex justify-space items-center px-5">
            <div className="flex flex-row justify-center items-center gap-2">
                <FontAwesomeIcon icon={faCode} className="text-3xl text-amber-600 font-extrabold" />
                <h2 className="text-muted font-extrabold text-lg">Code Collab</h2>
            </div>
        </div>
    );
}