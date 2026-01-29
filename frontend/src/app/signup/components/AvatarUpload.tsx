import { Avatar, Button, Stack } from "@mui/material";

type AvatarUploadProps = {
  photo: string;
  onPhotoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function AvatarUpload({
  photo,
  onPhotoChange,
}: AvatarUploadProps) {
  return (
    <Stack alignItems="center" spacing={2}>
      <Avatar
        src={photo}
        sx={{
          width: 100,
          height: 100,
          fontSize: 40,
        }}
      >
        {"?"}
      </Avatar>

      <Button variant="outlined" component="label">
        Upload Photo
        <input hidden accept="image/*" type="file" onChange={onPhotoChange} />
      </Button>
    </Stack>
  );
}
