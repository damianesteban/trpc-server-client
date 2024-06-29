import { createTRPCClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../server";

// Pass a generic app router
const trpc = createTRPCClient<AppRouter>({
    links: [httpBatchLink({ url: 'http://localhost:3000' })],
});

// Types are inferred
const user = await trpc.userById.query('1');
console.log(user);

// Types are inferred
const createdUser = await trpc.userCreate.mutate({ name: 'David' });
console.log(createdUser);