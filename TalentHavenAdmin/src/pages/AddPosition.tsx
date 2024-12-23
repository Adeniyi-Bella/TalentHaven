import { AuthenticatedTemplate, useMsal } from "@azure/msal-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AddPositionForm } from "./AddPositionForm";

export function AddPosition() {

    const navigate = useNavigate();
    const { accounts } = useMsal();

    useEffect(() => {

        if (accounts.length === 0) {
            // User is not authenticated, navigate to home
            navigate("/");
        }
    }, [accounts, navigate]);

    return (
        <>
            <AuthenticatedTemplate>
                <div>
                    <AddPositionForm />
                </div>
            </AuthenticatedTemplate>

        </>
    )
}