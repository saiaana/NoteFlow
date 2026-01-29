import { FormControl, MenuItem, Select } from "@mui/material";

type SortDropdownProps = {
  sortOrder: "asc" | "desc";
  setSortOrder: (order: "asc" | "desc") => void;
};

export default function SortDropdown({
  sortOrder,
  setSortOrder,
}: SortDropdownProps) {
  return (
    <FormControl
      size="small"
      sx={{
        maxWidth: 140,
      }}
    >
      <Select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
        sx={{
          "& .MuiOutlinedInput-notchedOutline": {
            borderRadius: "12px",
          },
          "& .MuiSelect-select": {
            fontSize: "0.85rem",
            py: 1,
          },
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              "& .MuiMenuItem-root": {
                fontSize: "0.85rem",
                py: 1,
              },
            },
          },
        }}
      >
        <MenuItem value="asc">Newest first</MenuItem>
        <MenuItem value="desc">Oldest first</MenuItem>
      </Select>
    </FormControl>
  );
}
