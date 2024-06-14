import * as React from "react";
import type { Metadata } from "next";
import RouterLink from "next/link";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { config } from "@/config";
import { paths } from "@/paths";

export const metadata = {
  title: `Terms | ${config.site.name}`,
} satisfies Metadata;

export default function NotFound(): React.JSX.Element {
  return (
    <Box
      component="main"
      sx={{
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        minHeight: "100%",
      }}
    >
      <Stack spacing={3} sx={{ alignItems: "center", maxWidth: "md" }}>
        <Typography variant="h3" sx={{ textAlign: "center" }}>
          No terms and conditions!
        </Typography>
        <Button
          component={RouterLink}
          href={paths.common.home}
          startIcon={<ArrowBackIcon />}
          variant="contained"
        >
          Go back to home
        </Button>
      </Stack>
    </Box>
  );
}
