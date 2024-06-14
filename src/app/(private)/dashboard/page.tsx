import * as React from "react";
import type { Metadata } from "next";
import { config } from "@/config";
import { Box, Stack, Typography } from "@mui/material";

export const metadata = {
  title: `Dashboard | ${config.site.name}`,
} satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <Box
      component="main"
      sx={{
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Stack spacing={3} sx={{ alignItems: "center", maxWidth: "md" }}>
        <Typography variant="h3" sx={{ textAlign: "center" }}>
          Welcome to the dashboard
        </Typography>
      </Stack>
    </Box>
  );
}
