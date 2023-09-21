import d, { FastifyInstance } from "fastify";

/**
 * Fastify tries not to impose you any design decision, but we highly
 * recommend to use the Fastify plugin system, as it gives you some neat features,
 * such as the load order and the guarantee that every part of your application
 * has been loaded before start listening to incoming requests.
 * See https://www.fastify.io/docs/latest/Plugins/.
 * For this reason routes and business logic should always wrapped inside plugins,
 * but you should never use `fastify-plugin` in this case, as you don't want to leak
 * your business logic or custom plugins to the rest of the application.
 *
 * As you will see the project structure is very boring™,
 * and this is on purpose. You don't need to think about how
 * anything should be done, that's simple! Do you need to declare
 * a set of routes? Plugin! Do you want to wrap each domain of your
 * application in a different folder? Plugin! Do you need to interact with the
 * request/response? Hook! And everytime the function signature will be the same.
 * Why we designed Fastify in this way? Because boring things are predictable.
 * You can have homogeneous or heterogeneous team, and the result will always
 * be the same. The entry barrier in the codebase will be low and everyone
 * will be able to undertand what's happening.
 *
 * It's always a good idea to expose a status route, so you can quickly
 * understand if your application is running and which version is deployed.
 */
const route = async (fastify: FastifyInstance) => {

    fastify.get<{ QueryString: { foo: string }, Headers: {}, Reply: { bar: string } }>("/", {

    }, async (_, reply) => {

        await reply.send({
            bar: "bar"
        });
    });
};

export default route;