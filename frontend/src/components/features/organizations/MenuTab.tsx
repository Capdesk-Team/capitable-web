import React from 'react';
import {
  Toolbar,
  Button,
  Stack,
} from '@mui/material';

export default function MenuTab() {

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Stack
          sx={{ pt: 4 }}
          direction="row"
          spacing={4}
          justifyContent="center"
        >
          <Button size="large">求人一覧</Button>
          <Button size="large">会社情報</Button>
        </Stack>
      </Toolbar>
    </React.Fragment>
  );
}