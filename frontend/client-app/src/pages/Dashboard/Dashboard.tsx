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
  useTheme,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";

export const Dashboard = observer(() => {

  const { userStore } = useStore();
  const theme = useTheme();
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
        <Typography variant="h4" sx={{ color: theme.palette.text.primary, lineHeight: 1 }}>
          Office Assets
        </Typography>

        {userStore.role === "Admin" && (
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            sx={{
              borderRadius: 0,
              bgcolor: theme.palette.primary.main,
              fontWeight: "bold",
              px: 4,
              "&:hover": { bgcolor: "#008ec4" },
            }}
          >
            + ADD ASSET
          </Button>
        </Box>
        )}
       
      </Box>

      <TableContainer component={Paper} sx={{ bgcolor: theme.palette.background.paper }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: theme.palette.primary.main }}>Name</TableCell>
              <TableCell sx={{ color: theme.palette.primary.main }}>Type</TableCell>
              <TableCell sx={{ color: theme.palette.primary.main }}>Status</TableCell>
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
});
