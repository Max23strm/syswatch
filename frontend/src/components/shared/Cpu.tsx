import { useEffect, useRef, useState } from "react";
import { CpuIcon } from "lucide-react";
import {
    d3Curve,
  defineChart,
  lineY,
  mountChart,
  type ChartHost,
} from "@tanstack/charts";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { scalePoint } from "@tanstack/charts/scales/point";
import { curveNatural } from 'd3-shape'
interface CpuSample {
  t: number;
  usage: number;
}

const MAX_SAMPLES = 10;
  const curve = curveNatural
const buildCpuChart = (data: readonly CpuSample[]) =>
  defineChart({
    legend: false,
    marks: [
        lineY(data, {
            id: "cpu-usage",
            x: "t",
            y: "usage",
            points: true,
            curve: d3Curve(curve),
        }),
    ],
    scales: {
      x: {
        scale: () => scalePoint<number>(),
        axis:false, 
        // line: false,
      },
      y: {
        scale: scaleLinear,
        axis:false, 
        domain: [0,50, 100],
      },
    },
    theme: {
        foreground: '#e5e7eb',
        muted: '#94a3b8',
        grid: '#334155',
        palette: ['#ef8e21', '#3998a7'],
    },
  });

const CpuChart = ({ cpuStats }: { cpuStats: readonly number[] }) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const hostRef = useRef<ChartHost<CpuSample, number, number> | null>(null);

     useEffect(() => {
        const container = containerRef.current;
        if (!container) {
        return;
        }

        hostRef.current = mountChart(container, {
            definition: buildCpuChart([]),
            // height: 360,
            initialWidth: 400,
            ariaLabel: "CPU usage",
        });

        return () => {
            hostRef.current?.destroy();
            hostRef.current = null;
        };
    }, []);
    useEffect(() => {
        const host = hostRef.current;
            if (!host || cpuStats.length === 0) {
            return;
        }

        const samples: CpuSample[] = cpuStats.map((usage, t) => ({ t, usage }));

        host.update({
            definition: buildCpuChart(samples),
            initialWidth: 840,
            ariaLabel: "CPU usage",
        });
    }, [cpuStats]);

  return <div ref={containerRef} className="cpu_chart" />;
};

const Cpu = ({ cpuPerc }: { cpuPerc: number | null }) => {
    const [cpuStats, setCpuStats] = useState<readonly number[]>([]);

    useEffect(() => {
        const value = cpuPerc === null  ? 0 : cpuPerc;
        setCpuStats((prev) =>
            prev.length >= MAX_SAMPLES
                ? [...prev.slice(1), value]
                : [...prev, value],
        );

    }, [cpuPerc]);

    const display = cpuPerc === null ? "—" : cpuPerc.toFixed(2);

    return (
        <div className="cpu_container">
            <div className="cpu_numbers">
                <div className="cpu_main_number_container">
                    <CpuIcon />
                    <p className="main_number">{display}</p>
                    <p>%</p>
                </div>
                <h5>Cpu usage</h5>
            </div>
            <CpuChart cpuStats={cpuStats} />
        </div>
    );
};

export default Cpu;
