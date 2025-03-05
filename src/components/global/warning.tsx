"use client";
import React, { FunctionComponent } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Props {
    TriggerComp: FunctionComponent;
    titleText?: string;
    bodyText?: string;
    onCancel?: () => void;
    onConfirm: () => void;
}

const Warning = ({
    onCancel,
    onConfirm,
    TriggerComp,
    bodyText,
    titleText,
}: Props) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <TriggerComp />
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        {titleText || "Are you absolutely sure?"}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        {bodyText || `This action cannot be undone.`}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel
                        onClick={() => {
                            if (onCancel) {
                                onCancel();
                            }
                        }}
                    >
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => {
                            onConfirm();
                        }}
                    >
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default Warning;
