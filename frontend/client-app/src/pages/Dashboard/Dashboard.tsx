import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Box,
} from "@mui/material";

export const Dashboard = () => {
  // Placeholder data - this will eventually come from GET /assets
  const assets = [
    { id: 1, name: "Nanographic Press S11", type: "Press", status: "Active" },
    { id: 2, name: "Meeting Room Alpha", type: "Room", status: "Booked" },
  ];

  return (
    <Container sx={{ mt: 4 }}>
      <Box
        sx={{
          mb: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <Typography variant="h4" sx={{ color: "white", lineHeight: 1 }}>
          Office Assets
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            sx={{
              borderRadius: 0,
              bgcolor: "#00adef",
              fontWeight: "bold",
              px: 4,
              "&:hover": { bgcolor: "#008ec4" },
            }}
          >
            + ADD ASSET
          </Button>
        </Box>
      </Box>

      <TableContainer component={Paper} sx={{ bgcolor: "#161616" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#00adef" }}>Name</TableCell>
              <TableCell sx={{ color: "#00adef" }}>Type</TableCell>
              <TableCell sx={{ color: "#00adef" }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assets.map((asset) => (
              <TableRow key={asset.id}>
                <TableCell>{asset.name}</TableCell>
                <TableCell>{asset.type}</TableCell>
                <TableCell>{asset.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
