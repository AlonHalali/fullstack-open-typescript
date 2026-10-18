import { Typography, Stack } from '@mui/material';

import type { Entry } from '../../types';

interface Props {
  entry: Entry;
}

const Entry = ({ entry }: Props) => (
  <Stack>
    <Typography variant="inherit">
      {entry.date} {entry.description}
    </Typography>
    {entry.diagnosisCodes && (
      <ul>
        {entry.diagnosisCodes.map((code) => (
          <li key={code}>{code}</li>
        ))}
      </ul>
    )}
  </Stack>
);

export default Entry;
