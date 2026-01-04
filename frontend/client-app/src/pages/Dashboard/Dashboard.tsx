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
  DialogTitle,
  DialogContent,
  Dialog,
  TextField,
  DialogActions,
} from "@mui/material";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import { useEffect, useState } from "react";
import type { Asset } from "../../api/agent";;

export const Dashboard = observer(() => {

  const { assetStore ,userStore } = useStore();
  const theme = useTheme();

  const [open, setOpen] = useState(false);
  const [newAsset,setNewAsset]=useState<Asset>({name:'',type:''});

  useEffect(() => {
    assetStore.loadAssets();
  },[assetStore]);

  const handleOpen = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
    setNewAsset({name:'',type:''});
  }
  

  const handleAddAsset = async () => {
    try{
      await assetStore.createAsset(newAsset);
      handleClose();
      setNewAsset({name:'',type:''});
    } catch (error) {
      console.error("Failed to add asset", error);
    } 
  }

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
            onClick={handleOpen}
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
              <TableCell sx={{ color: theme.palette.primary.main }}>Asset Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assetStore.assets.map((asset) => (
              <TableRow key={asset.id || asset.name}>
                <TableCell>{asset.name}</TableCell>
                <TableCell>{asset.type}</TableCell>           
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Office Resource</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1, minWidth: 300 }}>
          <TextField
            label="Asset Name"
            fullWidth
            value={newAsset.name}
            onChange={(e) => setNewAsset({ ...newAsset, name: e.target.value })}
          />
          <TextField
            label="Asset Type"
            fullWidth
            value={newAsset.type}
            onChange={(e) => setNewAsset({ ...newAsset, type: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddAsset} variant="contained" disabled={!newAsset.name || !newAsset.type}>
            Save And Add
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
});
