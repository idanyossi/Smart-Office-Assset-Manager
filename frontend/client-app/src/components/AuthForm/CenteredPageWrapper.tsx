import { Box } from "@mui/material";

export const CenteredPageWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <Box
    sx={{
      minHeight: "calc(100vh - 64px)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      bgcolor: "#0a0a0a",
    }}
  >
    {children}
  </Box>
);
