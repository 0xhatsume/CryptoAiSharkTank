import React from 'react';
//import { FaShark } from "react-icons/fa6";
import { GiSharkJaws } from "react-icons/gi";
import { LiaRobotSolid } from "react-icons/lia";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";


export interface NavbarProps {
    isMobileOrTelegram: boolean;
}

export function Navbar ({ isMobileOrTelegram }: NavbarProps) {
    return (
        <div className="border-b">
            <div className={`${isMobileOrTelegram ? 'max-w-lg' : 'max-w-7xl'} mx-auto px-4 py-3`}>
                <div className="flex flex-col sm:flex-row sm:items-center sm:h-16 gap-3 sm:gap-0">
                    {/* Logo and Name */}
                    <div className="ml-2 flex items-center space-x-3">
                        <span className="flex items-center py-2">
                            <LiaRobotSolid className="h-10 w-10 aspect-square text-primary" />
                            <GiSharkJaws className="h-10 w-10 aspect-square text-primary" />
                        </span>
                        <span className="text-primary font-bold text-xl">
                            Crypto.AI.SharkTank
                            </span>
                    </div>
            
                    {/* Wallet Connect */}
                    <Button 
                        variant="outline" 
                        className="w-full sm:w-auto sm:ml-auto flex items-center justify-center space-x-2">
                            <Wallet className="h-4 w-4 text-primary" />
                            <span className="text-primary">
                                Connect Wallet
                                </span>
                    </Button>
                </div>
            </div>
        </div>
        );
}