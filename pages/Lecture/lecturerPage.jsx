import * as React from "react";

import { alpha } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import AppNavbar from "../dashboard/components/AppNavbar";
import Header from "../dashboard/components/Header";
import SideMenu from "../dashboard/components/SideMenu";
import AppTheme from "../shared-theme/AppTheme";
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from "../dashboard/theme/customizations";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Divider from "@mui/material/Divider";
import Skeleton from "@mui/material/Skeleton";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import SlideshowRoundedIcon from "@mui/icons-material/SlideshowRounded";
import SegmentRoundedIcon from "@mui/icons-material/SegmentRounded";

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

export default function Dashboard(props) {
  const [prompt, setPrompt] = React.useState("");
  const [file, setFile] = React.useState(null);
  const [generatedLesson, setGeneratedLesson] = React.useState("");
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/lecturerPage");
      return;
    }
    axios
      .get("http://localhost:8080/api/auth/user", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.data.role !== "Lecturer") {
          navigate("/unauthorized");
        }
      })
      .catch(() => navigate("/lecturerPage"));
  }, [navigate]);

  const handlePromptSubmit = async () => {
    if (!prompt && !file) {
      setSnackbarMessage("Please enter a prompt or upload a file.");
      setSnackbarOpen(true);
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      if (prompt) formData.append("prompt", prompt);
      if (file) formData.append("file", file);

      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8080/api/lessons/", // Sử dụng endpoint đúng từ backend
        { title: "Generated Lesson", text_content: prompt, language: "en" }, // Gửi dữ liệu theo schema backend
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setGeneratedLesson(response.data || "Lesson generated successfully!");

      setPrompt("");
      setFile(null);
      setSnackbarMessage(
        response.data.message || "Lesson generated successfully!"
      );
      setDialogOpen(true);
      setTimeout(() => {
        setDialogOpen(false);
        // navigate('/lecturerPage'); // Nếu muốn chuyển trang, bỏ comment dòng này
      }, 1500);
    } catch (error) {
      setSnackbarMessage(
        error.response?.data?.message || "Error generating lesson"
      );
      setSnackbarOpen(true);
    }
    setLoading(false);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  // Render the main dashboard layout with the lesson generation form
  // and the generated lesson display

  // phần đầu vẫn giữ nguyên như bạn có — import, state, useEffect...
  // ... đến phần return:

  return (
    <AppTheme {...props} themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <SideMenu />
        <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
          <AppNavbar />
          <Box
            component="main"
            sx={(theme) => ({
              flexGrow: 1,
              background: `linear-gradient(135deg, ${theme.palette.background.default} 70%, ${theme.palette.primary.light} 100%)`,
              overflow: "auto",
              p: { xs: 1, md: 3 },
            })}
          >
            <Stack
              spacing={3}
              sx={{ maxWidth: "900px", mx: "auto", mt: { xs: 8, md: 0 } }}
            >
              <Header title="Generate Lesson" />
              <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, borderRadius: 3 }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  color="primary"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <SchoolRoundedIcon fontSize="large" /> Create a Lesson with AI
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <TextField
                  label="Enter your lesson prompt"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  helperText="e.g. Explain Newton’s Laws to 10-year-olds"
                  InputLabelProps={{ shrink: true }}
                  sx={{ mb: 2 }}
                />
                <Button variant="outlined" component="label" sx={{ mb: 2 }}>
                  Upload File
                  <input type="file" hidden onChange={handleFileChange} />
                </Button>
                {file && (
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    Selected file: {file.name}
                  </Typography>
                )}
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2, py: 1.5, fontWeight: 700 }}
                  onClick={handlePromptSubmit}
                  disabled={loading}
                  startIcon={<SchoolRoundedIcon />}
                >
                  {loading ? "Generating..." : "Generate Lesson"}
                </Button>
              </Paper>

              {/* Hiển thị kết quả lesson */}
              {loading && (
                <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
                  <Skeleton variant="text" width={200} height={40} />
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={80}
                    sx={{ my: 2 }}
                  />
                  <Skeleton
                    variant="rectangular"
                    width="100%"
                    height={120}
                    sx={{ my: 2 }}
                  />
                </Paper>
              )}

              {!loading && generatedLesson && (
                <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, borderRadius: 3 }}>
                  <Typography
                    variant="h5"
                    fontWeight={600}
                    gutterBottom
                    color="primary"
                  >
                    🎓 Generated Lesson
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                  <Typography
                    variant="h6"
                    sx={{
                      mt: 2,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <SchoolRoundedIcon /> Title:{" "}
                    {generatedLesson.lesson?.title || "No title"}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    {generatedLesson.lesson?.text_content || "No content"}
                  </Typography>
                  <Box sx={{ mt: 3 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <SegmentRoundedIcon /> Segments
                    </Typography>
                    <Stack spacing={1} sx={{ mt: 1 }}>
                      {(generatedLesson.segments || []).length === 0 ? (
                        <Typography variant="body2" color="text.secondary">
                          No segments available.
                        </Typography>
                      ) : (
                        generatedLesson.segments.map((segment, index) => (
                          <Paper
                            key={index}
                            elevation={1}
                            sx={{ p: 2, borderLeft: "5px solid #1976d2" }}
                          >
                            <Typography variant="body2">
                              <strong>Segment {index + 1}</strong>: {segment.text}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Start: {segment.start_time}s | Duration:{" "}
                              {segment.duration}s
                            </Typography>
                          </Paper>
                        ))
                      )}
                    </Stack>
                  </Box>
                  <Box sx={{ mt: 4 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <SlideshowRoundedIcon /> Slides
                    </Typography>
                    <Stack
                      direction="row"
                      spacing={2}
                      sx={{ mt: 2 }}
                      flexWrap="wrap"
                    >
                      {(generatedLesson.slides || []).length === 0 ? (
                        <Typography variant="body2" color="text.secondary">
                          No slides available.
                        </Typography>
                      ) : (
                        generatedLesson.slides.map((slide, index) => (
                          <Paper
                            key={index}
                            elevation={2}
                            sx={{
                              p: 2,
                              width: 220,
                              borderRadius: 2,
                              textAlign: "center",
                              backgroundColor: "#fafafa",
                            }}
                          >
                            <Typography variant="subtitle2" gutterBottom>
                              Slide {slide.order_index}
                            </Typography>
                            <img
                              src={slide.image_url}
                              alt={`Slide ${slide.order_index}`}
                              style={{ width: "100%", borderRadius: 8 }}
                            />
                          </Paper>
                        ))
                      )}
                    </Stack>
                  </Box>
                </Paper>
              )}

              {!loading && !generatedLesson && (
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    textAlign: "center",
                    color: "text.secondary",
                  }}
                >
                  <Typography variant="body1">
                    Enter a prompt and click{" "}
                    <strong>Generate Lesson</strong> to see results here.
                  </Typography>
                </Paper>
              )}
            </Stack>
          </Box>
        </Box>
      </Box>

      {/* Snackbar và Dialog thông báo */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1500}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>

      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { textAlign: "center", py: 6, borderRadius: 3 } }}
      >
        <DialogTitle sx={{ fontSize: 28, fontWeight: 700, pb: 2 }}>
          {snackbarMessage}
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ fontSize: 18 }}>
            You will be redirected shortly...
          </Typography>
        </DialogContent>
      </Dialog>
    </AppTheme>
  );
}
