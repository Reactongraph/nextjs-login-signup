import { Box, Skeleton } from "@mui/material";

const BarSkeleton = ({ rows = 10, height = 30, gap = "10px", color = "#ffffff20" }) => {
  const rowList = [];
  for (let i = 0; i < rows; i += 1) {
    rowList.push(`row_${i}`);
  }
  return (
    <Box sx={{ width: "100%", padding: "5px" }}>
      {rowList.map((row) => {
        return (
          <Skeleton
          variant="rounded"
            key={row}
            animation="wave"
            sx={{ background: color, marginBottom: gap }}
            height={height}
          />
        );
      })}
    </Box>
  );
};

export default BarSkeleton;
