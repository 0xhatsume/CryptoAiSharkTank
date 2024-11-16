import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, DollarSign } from 'lucide-react';
import projectsData from '../constants/projects.json';

export interface Market {
    id: string;
    project: string;
    coverImage: string;
    question: string;
    yesPrice: number;
    noPrice: number;
    volume: string;
    endDate: string;
    liquidity: string;
}

export const SAMPLE_MARKETS: Market[] = projectsData.map((project, index) => ({
    id: (index + 1).toString(),
    project: project.title,
    coverImage: project.screenshots[0],
    question: `Will ${project.title} return good investment value in 1 year?`,
    yesPrice: Number((0.3 + Math.random() * 0.4).toFixed(2)),
    noPrice: Number((0.3 + Math.random() * 0.4).toFixed(2)),
    volume: `$${(100 + Math.random() * 1900).toFixed(1)}K`,
    endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    liquidity: `$${(50 + Math.random() * 450).toFixed(1)}K`
}));

SAMPLE_MARKETS.forEach(market => {
    const total = market.yesPrice + market.noPrice;
    market.yesPrice = Number((market.yesPrice / total).toFixed(2));
    market.noPrice = Number((market.noPrice / total).toFixed(2));
});

const toSentenceCase = (str: string) => {
    return str
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

export const MarketCard = ({ market }: { market: Market }) => {
    const timeRemaining = new Date(market.endDate).getTime() - new Date().getTime();
    const daysRemaining = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));

    return (
        <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
            <CardHeader className="p-4">
            <div className="text-sm font-medium">
                Will
                <span className="font-bold mx-2 bg-blue-600 rounded-sm p-1">
                    {toSentenceCase(market.project)}
                    </span>
                    return good investment value in 1 year?
                </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex gap-4 items-center">
                        <img 
                            src={market.coverImage} 
                            alt={market.project} 
                            className="w-24 h-24 object-cover rounded-md"
                        />
                        <div className="space-y-1.5">
                            <div className="flex items-center gap-2">
                                <div className="w-[60px] text-sm text-muted-foreground">Yes</div>
                                <Button variant="outline" size="sm" 
                                    className="w-[100px] bg-green-500 text-gray-800 font-bold">
                                ${market.yesPrice.toFixed(2)}
                                </Button>
                            </div>

                            <div className="flex items-center gap-2">
                                <div className="w-[60px] text-sm text-muted-foreground">No</div>
                                <Button variant="outline" size="sm" 
                                    className="w-[100px] bg-red-500 text-white font-bold">
                                ${market.noPrice.toFixed(2)}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {daysRemaining}d ({market.endDate})
                        </div>
                        <div className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4" />
                            {market.volume}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
