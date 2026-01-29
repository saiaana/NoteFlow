import { Stack, Typography } from "@mui/material";

type EmptyStateProps = {
  title: string;
  subtitle: string;
};

export default function EmptyState({ title, subtitle }: EmptyStateProps) {
  return (
    <Stack spacing={2} display="flex" alignItems="center">
      <Typography variant="h5" fontWeight={600}>
        {title}
      </Typography>
      <Typography variant="h5">{subtitle}</Typography>
    </Stack>
  );
}
