import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import { useNavigate } from "react-router-dom";

export function Home() {
    const navigate = useNavigate();

    const addNewPositionWithDescription = () => navigate("/add");
    const editOrDeletePosition = () => navigate("/edit");
    return (
        <>
            <AuthenticatedTemplate>
                <div className="flex justify-center space-x-4 mt-4">
                    <button 
                    onClick={addNewPositionWithDescription}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                        ADD
                    </button>
                    <button 
                    onClick={editOrDeletePosition}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                        EDIT/DELETE
                    </button>
                </div>

            </AuthenticatedTemplate>

            <UnauthenticatedTemplate>
                Please sign-in to see your profile information.
            </UnauthenticatedTemplate>
        </>
    );
}