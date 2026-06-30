"use client";

import * as React from "react";
import DottedMap from "dotted-map";
import { ArrowUpRight, Globe2, MapPin } from "lucide-react";

import { cn } from "@/lib/utils";

type ClientMarker = {
    city: string;
    region: string;
    lat: number;
    lng: number;
    featured?: boolean;
};

const clientMarkers: ClientMarker[] = [
    { city: "Toronto", region: "North America", lat: 43.6532, lng: -79.3832 },
    { city: "New York", region: "North America", lat: 40.7128, lng: -74.006, featured: true },
    { city: "London", region: "Europe", lat: 51.5072, lng: -0.1276, featured: true },
    { city: "Dubai", region: "Gulf", lat: 25.2048, lng: 55.2708, featured: true },
    { city: "Singapore", region: "APAC", lat: 1.3521, lng: 103.8198 },
    { city: "Sydney", region: "Oceania", lat: -33.8688, lng: 151.2093 },
];

const proofPoints = [
    "Remote-first delivery",
    "Time-zone aware handoff",
    "Global campaign support",
];

const regionStats = [
    { value: "6", label: "client regions" },
    { value: "4", label: "service tracks" },
    { value: "24h", label: "handoff rhythm" },
];

export default function DottedMapAbout({ className }: { className?: string }) {
    const { mapSrc, markers } = React.useMemo(() => {
        const map = new DottedMap({
            height: 54,
            grid: "diagonal",
            projection: { name: "robinson" },
        });

        const svg = map.getSVG({
            radius: 0.24,
            color: "rgba(245,241,234,0.28)",
            backgroundColor: "transparent",
            shape: "circle",
        });

        const positionedMarkers = clientMarkers
            .map((marker) => {
                const point = map.getPin({ lat: marker.lat, lng: marker.lng });

                if (!point) {
                    return null;
                }

                return {
                    ...marker,
                    x: (point.x / map.image.width) * 100,
                    y: (point.y / map.image.height) * 100,
                };
            })
            .filter((marker): marker is ClientMarker & { x: number; y: number } => Boolean(marker));

        return {
            mapSrc: `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`,
            markers: positionedMarkers,
        };
    }, []);

    return (
        <section
            id="about"
            className={cn(
                "relative overflow-hidden border-y border-white/8 bg-prestige-canvas px-4 py-20 sm:px-6 md:px-8 md:py-28",
                className,
            )}
        >
            <div className="pointer-events-none absolute right-[-8rem] top-12 h-[34rem] w-[18rem] rounded-full bg-[radial-gradient(ellipse_at_right,rgba(255,91,25,0.22),transparent_68%)] blur-3xl" />
            <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.026)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_bottom,transparent,black_18%,black_86%,transparent)]" />

            <div className="relative z-[1] mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-14">
                <div>
                    <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.035] px-3 py-2 text-prestige-muted shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md">
                        <Globe2 size={15} className="text-prestige-gold" strokeWidth={1.8} />
                        <span className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.22em]">
                            global delivery
                        </span>
                    </div>

                    <h2 className="max-w-3xl text-4xl font-semibold leading-[0.9] tracking-[-0.07em] text-prestige-ink text-balance sm:text-5xl md:text-6xl">
                        Clients across the world, one precise delivery system.
                    </h2>

                    <p className="mt-6 max-w-xl text-sm leading-7 text-prestige-muted">
                        Presitgious Tech supports brands across North America, Europe, the Gulf, and APAC with web, automation, marketing, and social content systems.
                    </p>

                    <div className="mt-8 grid gap-2 sm:grid-cols-3">
                        {regionStats.map((stat) => (
                            <div key={stat.label} className="rounded-[1.15rem] glass-gold px-4 py-4">
                                <div className="font-mono text-2xl text-prestige-ink tabular-nums">{stat.value}</div>
                                <div className="mt-2 text-[0.62rem] uppercase leading-4 tracking-[0.18em] text-prestige-muted">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-7 grid gap-2">
                        {proofPoints.map((point) => (
                            <div key={point} className="glass-gold flex min-h-11 items-center gap-3 rounded-[1.05rem] px-3 text-sm text-prestige-ink">
                                <MapPin size={14} className="relative z-[1] shrink-0 text-prestige-gold" strokeWidth={1.8} />
                                <span className="relative z-[1]">{point}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="glass-gold relative overflow-hidden rounded-[1.75rem] p-3 sm:p-4">
                    <div className="relative z-[1] overflow-hidden rounded-[1.35rem] border border-white/10 bg-[linear-gradient(180deg,rgba(18,10,9,0.86),rgba(7,4,4,0.94))]">
                        <div className="flex flex-col gap-3 border-b border-white/10 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
                            <div>
                                <p className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-prestige-gold">
                                    active client map
                                </p>
                                <h3 className="mt-2 text-2xl font-semibold leading-[0.95] tracking-[-0.055em] text-prestige-ink sm:text-3xl">
                                    Work moves where your market moves.
                                </h3>
                            </div>
                            <a
                                href="/contact"
                                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-[1.05rem] border border-prestige-gold/45 bg-prestige-gold px-4 font-mono text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-[#170705] transition duration-300 hover:bg-[#ff7840] sm:w-auto"
                            >
                                start a project
                                <ArrowUpRight size={14} />
                            </a>
                        </div>

                        <div className="relative mx-auto aspect-[1.35/1] w-full overflow-hidden p-2 sm:aspect-[2/1] sm:p-4">
                            <img
                                src={mapSrc}
                                alt="Dotted world map showing Presitgious Tech client coverage"
                                className="h-full w-full select-none object-contain opacity-90"
                                loading="lazy"
                                decoding="async"
                            />

                            {markers.map((marker) => (
                                <div
                                    key={marker.city}
                                    className="absolute -translate-x-1/2 -translate-y-1/2"
                                    style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
                                >
                                    <div
                                        className={cn(
                                            "relative grid place-items-center rounded-full border border-prestige-gold/70 bg-prestige-gold shadow-[0_0_28px_rgba(255,90,31,0.32)]",
                                            marker.featured ? "h-4 w-4 sm:h-5 sm:w-5" : "h-3 w-3 sm:h-4 sm:w-4",
                                        )}
                                        aria-label={`${marker.city}, ${marker.region}`}
                                    >
                                        <span className="h-1.5 w-1.5 rounded-full bg-[#170705]" />
                                    </div>
                                    {marker.featured ? (
                                        <div className="absolute left-1/2 top-[calc(100%+0.45rem)] hidden -translate-x-1/2 whitespace-nowrap rounded-full border border-white/10 bg-[#100909]/90 px-2.5 py-1 font-mono text-[0.55rem] uppercase tracking-[0.16em] text-prestige-ink shadow-[0_10px_24px_rgba(0,0,0,0.34)] backdrop-blur-md sm:block">
                                            {marker.city}
                                        </div>
                                    ) : null}
                                </div>
                            ))}
                        </div>

                        <div className="grid border-t border-white/10 sm:grid-cols-3">
                            {clientMarkers.slice(0, 3).map((marker) => (
                                <div key={marker.region} className="border-b border-white/10 px-4 py-4 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
                                    <div className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-prestige-gold">
                                        {marker.region}
                                    </div>
                                    <div className="mt-2 text-sm text-prestige-muted">{marker.city}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
