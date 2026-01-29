import {
  Avatar,
  Box,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useAuthStore } from "@/store/useAuthStore";
import { User } from "@/types/auth";

type UserGreetingProps = {
  user: User;
};

export default function UserGreeting({ user }: UserGreetingProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width:600px)");

  const { getDisplayName, isDemoUser } = useAuthStore();

  const greeting = `Hello, ${getDisplayName()} 👋`;

  const demoUserGreeting =
    isDemoUser() && !isMobile && "Welcome to Demo mode 📝";

  const avatarUrl = isDemoUser()
    ? `https://ui-avatars.com/api/?name=${encodeURIComponent(
        "Guest"
      )}&background=8faedc&color=fff`
    : user.photo ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(
        `${user.name}`
      )}&background=8faedc&color=fff`;

  const subText = isDemoUser()
    ? "Try creating a few notes to see how it works 📝✨ Your demo notes will stay saved for 24 hours or until you exit the demo mode 🚪"
    : "Here are your latest notes ✨";

  return (
    <Stack direction="row" alignItems="center" spacing={2.5}>
      <Avatar
        src={avatarUrl}
        sx={{
          width: 60,
          height: 60,
          border: "2px solid rgba(91, 143, 217, 0.4)",
          boxShadow: "0 2px 8px rgba(75, 124, 194, 0.25)",
        }}
      />
      <Box>
        <Typography
          variant="h5"
          fontWeight={700}
          sx={{ color: theme.palette.primary.main }}
        >
          {greeting} {demoUserGreeting}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 0.5, maxWidth: "500px" }}
        >
          {subText}
        </Typography>
      </Box>
    </Stack>
  );
}
