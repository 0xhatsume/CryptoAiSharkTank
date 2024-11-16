import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, DollarSign } from 'lucide-react';


export interface Market {
    id: string;
    question: string;
    yesPrice: number;
    noPrice: number;
    volume: string;
    endDate: string;
    liquidity: string;
}

export const SAMPLE_MARKETS: Market[] = [
    {
        id: '1',
        question: "Will Bitcoin close above $75,000 on March 31, 2024?",
        yesPrice: 0.65,
        noPrice: 0.35,
        volume: "$1.2M",
        endDate: "2024-03-31",
        liquidity: "$234.5K"
    },
    {
        id: '2',
        question: "Will ETH market cap exceed $500B in 2024?",
        yesPrice: 0.28,
        noPrice: 0.72,
        volume: "$892K",
        endDate: "2024-12-31",
        liquidity: "$156.2K"
    },
// Add more sample markets as needed
];



export const MarketCard = ({ market }: { market: Market }) => {
    const timeRemaining = new Date(market.endDate).getTime() - new Date().getTime();
    const daysRemaining = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));

    return (
        <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
            <CardHeader className="p-4">
            <div className="text-sm font-medium">{market.question}</div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
            <div className="flex justify-between items-center mb-4">
                <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                    <div className="w-[60px] text-sm text-muted-foreground">Yes</div>
                    <Button variant="outline" size="sm" className="w-[100px]">
                    ${market.yesPrice.toFixed(2)}
                    </Button>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-[60px] text-sm text-muted-foreground">No</div>
                    <Button variant="outline" size="sm" className="w-[100px]">
                    ${market.noPrice.toFixed(2)}
                    </Button>
                </div>
                </div>
                <div className="text-right space-y-1">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {daysRemaining}d
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <DollarSign className="h-4 w-4" />
                    {market.volume}
                </div>
                </div>
            </div>
            </CardContent>
        </Card>
    );
};
