import {
  Box,
  Chip,
  IconButton,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

type TagProps = {
  tags: string[];
  recommendedTags: string[];
  inputValue: string;
  setInputValue: (value: string) => void;
  handleAddTag: () => void;
  handleRemoveTag: (tagToRemove: string) => void;
  handleAddRecommendedTag: (tag: string) => void;
};

export default function Tags({
  tags,
  recommendedTags,
  inputValue,
  handleAddTag,
  setInputValue,
  handleRemoveTag,
  handleAddRecommendedTag,
}: TagProps) {
  const theme = useTheme();
  const styles = theme.custom;

  const handleSubmitTag = () => {
    if (inputValue.trim()) handleAddTag();
  };

  return (
    <Box>
      <Typography variant="subtitle1" fontWeight={600} gutterBottom>
        Tags
      </Typography>

      <Stack direction="row" sx={styles.tagInputWrapper}>
        <TextField
          size="small"
          placeholder="Add a tag..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          fullWidth
          variant="standard"
          InputProps={{ disableUnderline: true }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSubmitTag();
            }
          }}
        />

        <IconButton
          color="primary"
          onClick={handleSubmitTag}
          disabled={!inputValue.trim()}
        >
          <AddIcon />
        </IconButton>
      </Stack>

      {tags.length > 0 && (
        <Box sx={styles.tagList}>
          {tags.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              onDelete={() => handleRemoveTag(tag)}
              size="small"
              color="primary"
              variant="filled"
            />
          ))}
        </Box>
      )}

      {recommendedTags.length > 0 && (
        <Box sx={styles.recommendedTagsSection}>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            gutterBottom
            fontWeight={500}
          >
            Recommended tags
          </Typography>
          <Box sx={styles.tagList}>
            {recommendedTags.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                variant="outlined"
                color="primary"
                size="small"
                onClick={() => handleAddRecommendedTag(tag)}
              />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}
