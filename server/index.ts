import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { router, procedure } from "./trpc";
import z from "zod";

type User = {
    id: number;
    name: string;
}

const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
]

const appRouter = router({
    userList: procedure.query(async () => {
        return Promise.resolve(users);
    }),
    userById: procedure.input(z.string()).query(async (opts) => {
        const { input } = opts;
        return users.find((user) => user.id === Number(input));
    }),
    userCreate: procedure.input(z.object({ name: z.string() })).mutation(async (opts) => {
        const { input } = opts;
        const newUser = { id: users.length + 1, name: input.name };
        users.push(newUser);
        return newUser;
    }),
})

export type AppRouter = typeof appRouter;

const server = createHTTPServer({
    router: appRouter,
});

server.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
})