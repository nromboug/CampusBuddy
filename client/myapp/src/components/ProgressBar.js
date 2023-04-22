import { LinearProgress } from "@mui/material";

export default function ProgressBar({ numerator, denominator }) {
  const progress = (numerator / denominator) * 100;

  return (
    <LinearProgress
      variant="determinate"
      value={progress}
      color="primary"
      sx={{ width: "100%", height: 8 }}
    />
  );
}