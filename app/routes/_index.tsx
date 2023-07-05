import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/server-runtime";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from "date-fns";
import React, { useEffect, useReducer } from "react";
import { H1 } from "~/components/typeography/h1";
import { P } from "~/components/typeography/p";
import { authenticator } from "~/services/auth.server";
import { prisma } from "~/services/prisma.server";

export async function loader({ request }: LoaderArgs) {
  const user = await authenticator.isAuthenticated(request);

  const event = await prisma.event.findFirst({
    where: {
      date: {
        gt: new Date().toISOString(),
      },
    },
    orderBy: {
      date: "asc",
    },
  });

  return json({ user, event });
}

interface State {
  date: Date;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function reducer({ date }: State, now: Date): State {
  const days = Math.max(differenceInDays(date, now), 0);
  const hours = Math.max(differenceInHours(date, now) % 24, 0);
  const minutes = Math.max(differenceInMinutes(date, now) % 60, 0);
  const seconds = Math.max(differenceInSeconds(date, now) % 60, 0);

  return { date, days, hours, minutes, seconds };
}

interface CountDownProps {
  date: Date;
  title: string;
}
function CountDown({ date, title }: CountDownProps) {
  const [{ days, hours, minutes, seconds }, dispatch] = useReducer(reducer, {
    date,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <P className="mb-1">Countdown to '{title}'</P>
      <div className="grid grid-flow-col gap-5 text-center justify-center auto-cols-max">
        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
          <span className="countdown font-mono text-5xl">
            <span style={{ "--value": days } as React.CSSProperties}></span>
          </span>
          days
        </div>
        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
          <span className="countdown font-mono text-5xl">
            <span style={{ "--value": hours } as React.CSSProperties}></span>
          </span>
          hours
        </div>
        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
          <span className="countdown font-mono text-5xl">
            <span style={{ "--value": minutes } as React.CSSProperties}></span>
          </span>
          min
        </div>
        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
          <span className="countdown font-mono text-5xl">
            <span style={{ "--value": seconds } as React.CSSProperties}></span>
          </span>
          sec
        </div>
      </div>
    </div>
  );
}

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <div className="hero bg-base-100">
        <div className="hero-content text-center">
          <H1>Basement of Stinkology</H1>

          {data.event && data.event.date ? (
            <CountDown
              title={data.event.name}
              date={new Date(data.event.date)}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
