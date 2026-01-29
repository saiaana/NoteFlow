import { Stack, useMediaQuery, useTheme } from "@mui/material";
import UserGreeting from "./UserGreeting";
import ShortButton from "@/components/ui/buttons/ShortButton";
import { User } from "@/types/auth";

type NotesHeaderProps = {
  user: User;
};

export default function NotesHeader({ user }: NotesHeaderProps) {
  const theme = useTheme();
  const notDesktop = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Stack
      direction="column"
      spacing={notDesktop ? 2 : 0}
      sx={{ width: "100%", mb: 3 }}
    >
      <Stack
        direction={notDesktop ? "column" : "row"}
        justifyContent="space-between"
        alignItems={notDesktop ? "flex-start" : "center"}
        spacing={notDesktop ? 2 : 0}
        sx={{ width: "100%" }}
      >
        <UserGreeting user={user} />

        {!notDesktop && (
          <ShortButton buttonText="+ New Note" navigateTo="/new-note" />
        )}
      </Stack>
      {notDesktop && (
        <ShortButton
          buttonText="+ New Note"
          navigateTo="/new-note"
          customStyles={{
            width: "100%",
            padding: "12px 16px",
            borderRadius: "10px",
            fontSize: "1rem",
          }}
        />
      )}
    </Stack>
  );
}
