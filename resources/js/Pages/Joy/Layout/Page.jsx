import React from "react";

import {
  Button,
  Box,
  IconButton,
  List,
  ListDivider,
  ListItem,
  ListItemButton,
  ListItemContent,
  ListItemDecorator,
  ListSubheader,
  Stack,
  Typography,
  useColorScheme,
} from "@mui/joy";
import AmaranthIcon, {
  aiChangeWindows,
  aiDevices,
  aiFlag,
  aiLock,
  aiPaperPlane,
  aiBoxOpenFull,
  aiTwitter,
  aiPerson,
  aiPersonLock,
  aiMoon,
  aiCircleHalfInner,
  aiSun,
} from "@studio384/amaranth";
import { Link } from "@inertiajs/react";

export default function Page({ children }) {
  const { mode, setMode } = useColorScheme();

  return (
    <Box
      sx={{
        display: "grid",
        width: 1,
        height: 1,
        minHeight: "100dvh",
        gridTemplateColumns: "200px auto",
        gridTemplateRows: "48px auto",
        gridTemplateAreas: "'titlebar titlebar' 'navigation content'",
        bgcolor: "background.body",
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ gridArea: "titlebar", px: 1 }}
      >
        <Button
          color="neutral"
          variant="plain"
          size="sm"
          component={Link}
          href={route("front.timeline")}
          startDecorator={<AmaranthIcon icon={aiChangeWindows} />}
        >
          ChangeWindows
        </Button>
      </Stack>
      <Box
        sx={{
          bgcolor: "background.body",
          gridArea: "navigation",
          height: "100vh",
          overflow: "auto",
        }}
      >
        <List
          sx={{
            "--List-padding": "8px",
            "--List-gap": "2px",
            "--ListItem-radius": "4px",
            "--ListItemDecorator-size": "1.75rem",
          }}
        >
          <ListSubheader>Flights</ListSubheader>
          <NavigationItem
            target="admin.flights"
            icon={aiPaperPlane}
            name="Flights"
          />
          <NavigationItem
            target="admin.releases"
            icon={aiBoxOpenFull}
            name="Releases"
          />
          <NavigationItem
            target="admin.platforms"
            icon={aiDevices}
            name="Platforms"
          />
          <ListSubheader>Feature Store</ListSubheader>
          <NavigationItem target="admin.flags" icon={aiFlag} name="Flags" />
          <ListDivider />
          <ListSubheader>Integrations</ListSubheader>
          <NavigationItem
            target="admin.tweet_streams"
            icon={aiTwitter}
            name="Twitter"
          />
          <ListSubheader>System</ListSubheader>
          <NavigationItem target="admin.users" icon={aiPerson} name="Users" />
          <NavigationItem
            target="admin.roles"
            icon={aiPersonLock}
            name="Roles"
          />
          <NavigationItem
            target="admin.permissions"
            icon={aiLock}
            name="Permissions"
          />
        </List>
        <Stack direction="row" gap={0.25} sx={{ px: 1, py: 0.5 }}>
          <IconButton
            variant={mode === "system" ? "solid" : "plain"}
            onClick={() => setMode("system")}
            size="sm"
            color="neutral"
          >
            <AmaranthIcon icon={aiCircleHalfInner} />
          </IconButton>
          <IconButton
            variant={mode === "light" ? "solid" : "plain"}
            onClick={() => setMode("light")}
            size="sm"
            color="neutral"
          >
            <AmaranthIcon icon={aiSun} />
          </IconButton>
          <IconButton
            variant={mode === "dark" ? "solid" : "plain"}
            onClick={() => setMode("dark")}
            size="sm"
            color="neutral"
          >
            <AmaranthIcon icon={aiMoon} />
          </IconButton>
        </Stack>
      </Box>
      <Box
        sx={{
          bgcolor: "background.level1",
          borderTopLeftRadius: 12,
          gridArea: "content",
          height: "calc(100vh - 48px)",
          overflow: "auto",
          borderColor: "rgba(var(--joy-palette-neutral-mainChannel) / .1)",
          borderWidth: "1px 0 0 1px",
          borderStyle: "solid",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

function NavigationItem({ name, icon, target }) {
  return (
    <ListItem>
      <ListItemButton
        component={Link}
        href={route(target)}
        selected={route().current(`${target}*`)}
      >
        <ListItemDecorator>
          <AmaranthIcon icon={icon} />
        </ListItemDecorator>
        <ListItemContent>
          <Typography>{name}</Typography>
        </ListItemContent>
      </ListItemButton>
    </ListItem>
  );
}
