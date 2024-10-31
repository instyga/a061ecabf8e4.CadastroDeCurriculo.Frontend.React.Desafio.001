import { PropTypes } from "prop-types";
import { Stack, Text } from "@mantine/core";

export const DataBlock = ({ label, value }) => {
  return (
    <Stack gap={0}>
      <Text fw={700} size="sm" c="dark">
        {label}
      </Text>
      <Text fw={400}>{typeof value === "object" ? value.toString() : value}</Text>
    </Stack>
  );
};

DataBlock.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Date), 
  ]).isRequired,
};