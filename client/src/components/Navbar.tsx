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
        <div className="border-b relative bg-[#020817]">

            {/* Background Image Container */}
            <div 
                className="absolute inset-0 opacity-40" 
                style={{
                backgroundImage: 'url("/assets/sharksswimming.png")', // Update this path
                backgroundPosition: 'top',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                }}
            />

            <div className={`${isMobileOrTelegram ? 'max-w-lg' : 'max-w-7xl'} mx-auto px-4 py-3 relative z-10 backdrop-blur-sm`}>
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