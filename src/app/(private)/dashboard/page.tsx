import * as React from "react";
import type { Metadata } from "next";
import { config } from "@/config";
import { Typography } from "@mui/material";
import { CCBox, CStack } from "@/components/styled/styled";

export const metadata = {
  title: `Dashboard | ${config.site.name}`,
} satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <CCBox>
      <CStack spacing={3}>
        <Typography variant="h3" sx={{ textAlign: "center" }}>
          Welcome to the dashboard
        </Typography>
      </CStack>
    </CCBox>
  );
}
