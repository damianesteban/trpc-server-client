import { initTRPC } from "@trpc/server";

// TRPC Backend
const t = initTRPC.create();

// Reusable Router and Procedure Helpers
export const router = t.router;
export const procedure = t.procedure;