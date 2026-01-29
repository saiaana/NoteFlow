"use client";

import { useState, useEffect, useRef } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { Box } from "@mui/material";
import { useNoteStore } from "@/store/useNotesStore";

export default function SearchBar() {
  const [searchValue, setSearchValue] = useState("");
  const { searchNotes, clearSearch, searchQuery } = useNoteStore();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Sync with store
  useEffect(() => {
    if (!searchQuery) {
      setSearchValue("");
    }
  }, [searchQuery]);

  // Debounce search
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (searchValue.trim()) {
      timeoutRef.current = setTimeout(() => {
        searchNotes(searchValue);
      }, 500);
    } else {
      clearSearch();
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [searchValue, searchNotes, clearSearch]);

  const handleClear = () => {
    setSearchValue("");
    clearSearch();
  };

  return (
    <Box sx={{ width: "100%", maxWidth: { xs: "100%", sm: "400px" }, flex: 1 }}>
      <TextField
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search notes..."
        size="small"
        fullWidth
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon fontSize="small" />
            </InputAdornment>
          ),
          endAdornment: searchValue && (
            <InputAdornment position="end">
              <IconButton onClick={handleClear} size="small" edge="end">
                <ClearIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
          },
        }}
      />
    </Box>
  );
}