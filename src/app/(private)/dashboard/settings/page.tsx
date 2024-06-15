import * as React from "react";
import type { Metadata } from "next";
import Typography from "@mui/material/Typography";

import { config } from "@/config";
import { UpdatePasswordForm } from "@/components/dashboard/settings/update-password-form";
import { UpdateNameForm } from "@/components/dashboard/settings/update-name-form";
import { Grid } from "@mui/material";
import { UpdateEmailForm } from "@/components/dashboard/settings/update-email-form";
import { PadGrid10, StackMt15 } from "@/components/styled/styled";

export const metadata = {
  title: `Settings | ${config.site.name}`,
} satisfies Metadata;

export default function Page(): React.JSX.Element {
  return (
    <StackMt15 spacing={3}>
      <Grid>
        <Typography variant="h4">Setting</Typography>
      </Grid>
      <Grid container>
        <PadGrid10 xs={12} item>
          <UpdateNameForm />
        </PadGrid10>
        <PadGrid10 xs={12} item>
          <UpdateEmailForm />
        </PadGrid10>
        <PadGrid10 xs={12} item>
          <UpdatePasswordForm />
        </PadGrid10>
      </Grid>
    </StackMt15>
  );
}
