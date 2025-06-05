import { prefix, index, route } from "@react-router/dev/routes";

export const valuesRoutes =
        prefix("values", [
                index("features/values/pages/prompts.tsx"),
                route("bins", "features/values/pages/bins.tsx"),
        ])

