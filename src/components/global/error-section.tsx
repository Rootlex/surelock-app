import { TriangleAlertIcon } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/router";

interface Props {
    text?: string;
    onClick?: () => void;
}

const ErrorSection = ({ text, onClick }: Props) => {
    const router = useRouter();
    return (
        <div className="p-6 h-full flex flex-col items-center space-y-5 bg-white justify-center">
            <TriangleAlertIcon className="text-red-color text-5xl" />
            <p className="text-lg font-medium text-header-text">
                {text || "Unable to fetch management at the moment."}
            </p>
            <Button
                onClick={() => {
                    if (onClick) {
                        onClick();
                    } else {
                        router.push("/");
                    }
                }}
            >
                Go Home
            </Button>
        </div>
    );
};

export default ErrorSection;
