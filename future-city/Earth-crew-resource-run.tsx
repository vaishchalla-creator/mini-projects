import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { RotateCcw, Globe2, Lightbulb, Droplets, Wheat, HeartPulse, Zap, Users } from "lucide-react";

const RESOURCE_META = {
    Energy: { icon: Zap, blurb: "Powers homes, lights, and machines." },
    Water: { icon: Droplets, blurb: "Needed for people, farms, and health." },
    Food: { icon: Wheat, blurb: "Keeps the city strong and growing." },
    Health: { icon: HeartPulse, blurb: "Supports clinics, medicine, and care." },
};

const PHASES = [
    {
        id: 1,
        title: "Phase 1: Solo Build",
        subtitle: "Each group works alone with limited resources.",
        rule: "You can only use your own team's resource stash.",
        bonus: 0,
        collaboration: 25,
    },
    {
        id: 2,
        title: "Phase 2: Trade & Negotiate",
        subtitle: "Teams can trade, but each trade costs time.",
        rule: "You may use your own stash and make up to 2 trades.",
        bonus: -10,
        collaboration: 60,
    },
    {
        id: 3,
        title: "Phase 3: One Earth Crew",
        subtitle: "Everyone shares all resources to build together.",
        rule: "All resource pools are shared by the whole crew.",
        bonus: 20,
        collaboration: 100,
    },
];

const MISSIONS = [
    {
        name: "Future School",
        needs: { Energy: 2, Water: 1, Food: 1, Health: 1 },
        fact: "A great school depends on many systems working together.",
    },
    {
        name: "Healthy Neighborhood",
        needs: { Energy: 1, Water: 2, Food: 2, Health: 2 },
        fact: "Healthy communities need more than medicine alone.",
    },
    {
        name: "Innovation Hub",
        needs: { Energy: 3, Water: 1, Food: 1, Health: 1 },
        fact: "Technology grows faster when people have stable basics too.",
    },
    {
        name: "Climate-Ready City",
        needs: { Energy: 2, Water: 2, Food: 2, Health: 1 },
        fact: "Sustainability means balancing many shared needs at once.",
    },
];

const TEAM_PRESETS = [
    { name: "Sun Team", stash: { Energy: 4, Water: 0, Food: 0, Health: 0 } },
    { name: "River Team", stash: { Energy: 0, Water: 4, Food: 0, Health: 0 } },
    { name: "Harvest Team", stash: { Energy: 0, Water: 0, Food: 4, Health: 0 } },
    { name: "Care Team", stash: { Energy: 0, Water: 0, Food: 0, Health: 4 } },
];

function sumResources(pool) {
    return Object.values(pool).reduce((a, b) => a + b, 0);
}

function missionCompletion(needs, pool) {
    const keys = Object.keys(needs);
    const met = keys.filter((k) => (pool[k] || 0) >= needs[k]).length;
    const total = keys.length;
    return Math.round((met / total) * 100);
}

function buildResultText(percent, phaseTitle) {
    if (percent === 100) return `${phaseTitle}: Mission complete!`;
    if (percent >= 75) return `${phaseTitle}: Almost there.`;
    if (percent >= 50) return `${phaseTitle}: Good start, but key needs are missing.`;
    return `${phaseTitle}: The city cannot thrive yet.`;
}

export default function EarthCrewResourceRun() {
    const [missionIndex, setMissionIndex] = useState(0);
    const [phaseIndex, setPhaseIndex] = useState(0);
    const [selectedTeam, setSelectedTeam] = useState(0);
    const [tradeCount, setTradeCount] = useState(0);
    const [tradeResource, setTradeResource] = useState("Water");
    const [score, setScore] = useState(0);
    const [history, setHistory] = useState([]);

    const mission = MISSIONS[missionIndex];
    const phase = PHASES[phaseIndex];
    const currentTeam = TEAM_PRESETS[selectedTeam];

    const sharedPool = useMemo(() => {
        const total = { Energy: 0, Water: 0, Food: 0, Health: 0 };
        TEAM_PRESETS.forEach((team) => {
            Object.entries(team.stash).forEach(([k, v]) => {
                total[k] += v;
            });
        });
        return total;
    }, []);

    const activePool = useMemo(() => {
        if (phase.id === 1) return currentTeam.stash;
        if (phase.id === 3) return sharedPool;

        const base = { ...currentTeam.stash };
        const tradeBoost = tradeCount > 0 ? tradeCount : 0;
        if (tradeBoost > 0) {
            base[tradeResource] = (base[tradeResource] || 0) + tradeBoost;
        }
        return base;
    }, [phase.id, currentTeam, sharedPool, tradeCount, tradeResource]);

    const completion = missionCompletion(mission.needs, activePool);
    const teamworkScore = Math.max(0, completion + phase.bonus);
    const totalScore = Math.max(0, Math.min(100, Math.round((teamworkScore + phase.collaboration) / 2)));

    function useTrade() {
        if (phase.id !== 2) return;
        if (tradeCount >= 2) return;
        setTradeCount((c) => c + 1);
    }

    function lockRound() {
        const roundScore = totalScore;
        setScore((s) => s + roundScore);
        setHistory((h) => [
            ...h,
            {
                phase: phase.title,
                mission: mission.name,
                result: buildResultText(completion, phase.title),
                roundScore,
            },
        ]);

        if (phaseIndex < PHASES.length - 1) {
            setPhaseIndex((p) => p + 1);
            setTradeCount(0);
            return;
        }

        setPhaseIndex(0);
        setTradeCount(0);
        setMissionIndex((m) => (m + 1) % MISSIONS.length);
        setSelectedTeam((t) => (t + 1) % TEAM_PRESETS.length);
    }

    function resetGame() {
        setMissionIndex(0);
        setPhaseIndex(0);
        setSelectedTeam(0);
        setTradeCount(0);
        setTradeResource("Water");
        setScore(0);
        setHistory([]);
    }

    return (
        <div className="min-h-screen bg-slate-50 p-4 md:p-8">
        <div className="mx-auto max-w-6xl space-y-6">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]"
    >
    <Card className="rounded-3xl border-0 shadow-lg">
    <CardHeader>
        <div className="flex items-center gap-3">
    <div className="rounded-2xl bg-slate-100 p-3">
    <Globe2 className="h-6 w-6" />
    </div>
    <div>
    <CardTitle className="text-2xl md:text-3xl">The Earth Crew: Resource Run</CardTitle>
    <CardDescription className="mt-1 text-base">
        A kid-friendly cooperation game about building a stronger future together.
    </CardDescription>
    </div>
    </div>
    </CardHeader>
    <CardContent className="space-y-4">
    <div className="rounded-2xl bg-slate-100 p-4 text-sm leading-6 text-slate-700">
    <p>
        <span className="font-semibold">Mission:</span> Build a thriving city by balancing shared needs like energy,
    water, food, and health. Try three different systems and compare what works best.
    </p>
    </div>

    <div className="grid gap-3 md:grid-cols-3">
    {PHASES.map((item, idx) => (
            <div
                key={item.id}
        className={`rounded-2xl border p-4 ${idx === phaseIndex ? "border-slate-900 bg-white shadow" : "border-slate-200 bg-slate-50"}`}
    >
    <div className="flex items-center justify-between gap-2">
    <p className="font-semibold">{item.title}</p>
        <Badge variant={idx === phaseIndex ? "default" : "secondary"}>{item.collaboration}% teamwork</Badge>
    </div>
    <p className="mt-2 text-sm text-slate-600">{item.subtitle}</p>
        </div>
))}
    </div>
    </CardContent>
    </Card>

    <Card className="rounded-3xl border-0 shadow-lg">
    <CardHeader>
        <CardTitle className="text-xl">Scoreboard</CardTitle>
        <CardDescription>Compare how each system affects the mission outcome.</CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
    <div>
        <div className="mb-2 flex items-center justify-between text-sm">
        <span>Total Score</span>
    <span className="font-semibold">{score}</span>
        </div>
        <Progress value={Math.min(100, score % 100)} />
    </div>

    <div className="rounded-2xl bg-slate-100 p-4">
    <p className="text-sm text-slate-600">Current mission</p>
    <p className="text-lg font-semibold">{mission.name}</p>
        <p className="mt-2 text-sm text-slate-700">{mission.fact}</p>
        </div>

        <div className="flex gap-2">
    <Button onClick={resetGame} variant="outline" className="rounded-2xl">
    <RotateCcw className="mr-2 h-4 w-4" /> Reset
        </Button>
        </div>
        </CardContent>
        </Card>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1fr_0.9fr]">
    <Card className="rounded-3xl border-0 shadow-lg">
        <CardHeader>
            <CardTitle>Mission Needs</CardTitle>
    <CardDescription>These are the resources required to complete the city mission.</CardDescription>
    </CardHeader>
    <CardContent className="grid gap-3 sm:grid-cols-2">
        {Object.entries(mission.needs).map(([name, amount]) => {
                const Icon = RESOURCE_META[name].icon;
                return (
                    <div key={name} className="rounded-2xl border border-slate-200 p-4">
                <div className="flex items-center gap-3">
                <div className="rounded-xl bg-slate-100 p-2">
                <Icon className="h-5 w-5" />
                </div>
                <div>
                <p className="font-semibold">{name}</p>
                    <p className="text-sm text-slate-600">Need: {amount}</p>
                </div>
                </div>
                <p className="mt-2 text-sm text-slate-600">{RESOURCE_META[name].blurb}</p>
                    </div>
            );
            })}
        </CardContent>
        </Card>

        <Card className="rounded-3xl border-0 shadow-lg">
        <CardHeader>
            <CardTitle>{phase.title}</CardTitle>
        <CardDescription>{phase.rule}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
    <div className="rounded-2xl bg-slate-100 p-4">
    <div className="flex items-center gap-2 text-sm text-slate-600">
    <Users className="h-4 w-4" /> Current team
    </div>
    <p className="mt-1 text-lg font-semibold">{currentTeam.name}</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
        {Object.entries(activePool).map(([name, amount]) => {
                const Icon = RESOURCE_META[name].icon;
                const enough = amount >= mission.needs[name];
                return (
                    <div key={name} className={`rounded-2xl border p-4 ${enough ? "border-emerald-300 bg-emerald-50" : "border-slate-200"}`}>
                <div className="flex items-center gap-3">
                <div className="rounded-xl bg-white p-2 shadow-sm">
                <Icon className="h-5 w-5" />
                </div>
                <div>
                <p className="font-semibold">{name}</p>
                    <p className="text-sm text-slate-600">Available: {amount}</p>
                </div>
                </div>
                </div>
            );
            })}
        </div>

    {phase.id === 2 && (
        <div className="rounded-2xl border border-slate-200 p-4">
        <p className="font-semibold">Trade Center</p>
    <p className="mt-1 text-sm text-slate-600">Use up to 2 trades. Each trade helps, but costs time.</p>
    <div className="mt-3 flex flex-wrap items-center gap-2">
        {Object.keys(RESOURCE_META).map((resource) => (
                <Button
                    key={resource}
            variant={tradeResource === resource ? "default" : "outline"}
        className="rounded-2xl"
        onClick={() => setTradeResource(resource)}
    >
        {resource}
        </Button>
    ))}
        </div>
        <div className="mt-3 flex items-center gap-3">
    <Button onClick={useTrade} disabled={tradeCount >= 2} className="rounded-2xl">
        Add Trade
    </Button>
    <span className="text-sm text-slate-600">Trades used: {tradeCount}/2</span>
    </div>
    </div>
    )}

    <div>
        <div className="mb-2 flex items-center justify-between text-sm">
        <span>Mission Completion</span>
    <span className="font-semibold">{completion}%</span>
        </div>
        <Progress value={completion} />
    </div>

    <div className="rounded-2xl bg-slate-100 p-4">
    <p className="text-sm text-slate-600">Round result</p>
    <p className="mt-1 font-semibold">{buildResultText(completion, phase.title)}</p>
    <p className="mt-2 text-sm text-slate-700">
        Round score: <span className="font-semibold">{totalScore}</span>
        </p>
        </div>

        <Button onClick={lockRound} className="w-full rounded-2xl py-6 text-base">
        {phaseIndex < PHASES.length - 1 ? "Finish This Phase" : "Finish Mission"}
        </Button>
        </CardContent>
        </Card>

        <Card className="rounded-3xl border-0 shadow-lg">
        <CardHeader>
            <CardTitle>Think Like a Global Problem Solver</CardTitle>
    <CardDescription>Reflection prompts for tutoring or class discussion.</CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
    <div className="rounded-2xl bg-slate-100 p-4">
    <div className="flex items-center gap-2 font-semibold">
    <Lightbulb className="h-4 w-4" /> Question of the round
    </div>
    <p className="mt-2 text-sm leading-6 text-slate-700">
        Which system helped the city most: working alone, trading with limits, or sharing resources as one crew?
        </p>
        </div>

        <div>
        <p className="mb-3 font-semibold">Recent history</p>
        <div className="space-y-3">
        {history.length === 0 && <p className="text-sm text-slate-500">No rounds completed yet.</p>}
    {history.slice().reverse().map((item, idx) => (
        <div key={`${item.phase}-${idx}`} className="rounded-2xl border border-slate-200 p-3">
    <p className="text-sm font-semibold">{item.phase}</p>
        <p className="text-sm text-slate-600">{item.mission}</p>
        <p className="mt-1 text-sm text-slate-700">{item.result}</p>
        <p className="mt-1 text-sm font-medium">+{item.roundScore} points</p>
    </div>
    ))}
    </div>
    </div>

    <div className="rounded-2xl border border-dashed border-slate-300 p-4 text-sm text-slate-600">
        Teacher tip: after kids play all 3 phases, ask them to design their own “future city” and explain how it uses resources fairly and wisely.
    </div>
    </CardContent>
    </Card>
    </div>
    </div>
    </div>
);
}
