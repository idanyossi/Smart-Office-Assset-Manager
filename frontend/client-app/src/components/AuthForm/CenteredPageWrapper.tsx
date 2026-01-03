import { Box, useTheme } from "@mui/material";

export const CenteredPageWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const theme = useTheme(); 
  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: theme.palette.background.default, 
        padding: 2,
      }}
    >
      {children}
    </Box>
  );
};
