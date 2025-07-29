import { prefix, index, route } from "@react-router/dev/routes";

export const valuesRoutes =
        prefix("values", [
                index("features/values/pages/prompts.tsx"),
                route("bins", "features/values/pages/bins.tsx"),
                route("clusters", "features/values/pages/clusters.tsx"),
                route("refine", "features/values/pages/refine.tsx"),
        ])

