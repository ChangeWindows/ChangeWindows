import React from "react";

import {
  Button,
  Card,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  ListItemDecorator,
  Stack,
  Typography,
} from "@mui/joy";
import { Head, Link } from "@inertiajs/react";
import Page from "../Layout/Page";
import AmaranthIcon, { aiPlus } from "@studio384/amaranth";
import { format, parseISO } from "date-fns";
import PlatformIcon from "../Components/PlatformIcon";
import Pagination from "../Components/Pagination";

export default function Index({ can, timeline, pagination }) {
  return (
    <>
      <Head title="Joy" />
      <Page>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ py: 1 }}
        >
          <Typography level="h2" fontSize="xl2">
            Flights
          </Typography>
          {can.flights.create && (
            <Button
              component={Link}
              size="sm"
              startDecorator={<AmaranthIcon icon={aiPlus} />}
              href={route("admin.flights.create")}
            >
              Add
            </Button>
          )}
        </Stack>

        {Object.keys(timeline).map((date, key) => (
          <Grid container spacing={1} key={key}>
            <Grid xs={12}>
              <Typography level="h3" fontSize="lg" sx={{ mt: 1 }}>
                {format(parseISO(timeline[date].date), "dd MMMM yyyy")}
              </Typography>
            </Grid>
            {timeline[date].flights.map((platform, _key) => (
              <Grid xs={12} sm={6} md={4} lg={3} key={_key}>
                <Card size="sm" variant="outlined">
                  <List
                    size="sm"
                    sx={{
                      "--List-padding": 0,
                      "--List-gap": "2px",
                      "--ListItem-radius": "4px",
                      "--ListItemDecorator-size": "1.75rem",
                    }}
                  >
                    {platform.map((flight, key) => (
                      <ListItem key={key}>
                        <ListItemButton
                          component={Link}
                          href={route("admin.flights.edit", flight)}
                        >
                          <ListItemDecorator>
                            <PlatformIcon
                              platform={platform[0].platform}
                              color
                            />
                          </ListItemDecorator>
                          <ListItemContent>
                            <Typography>{flight.version}</Typography>
                          </ListItemContent>
                          <ListItemDecorator>
                            <Chip
                              size="sm"
                              variant="outlined"
                              color={
                                flight.release_channel.color === "#673ab7"
                                  ? "purple"
                                  : flight.release_channel.color === "#e74018"
                                  ? "red"
                                  : flight.release_channel.color === "#fb8009"
                                  ? "orange"
                                  : flight.release_channel.color === "#ffc000"
                                  ? "amber"
                                  : flight.release_channel.color === "#97c800"
                                  ? "lime"
                                  : flight.release_channel.color === "#c0d700"
                                  ? "green"
                                  : flight.release_channel.color === "#46c429"
                                  ? "emerald"
                                  : flight.release_channel.color === "#10b08f"
                                  ? "teal"
                                  : flight.release_channel.color === "#0098df"
                                  ? "sky"
                                  : "primary"
                              }
                            >
                              {flight.release_channel.name}
                            </Chip>
                          </ListItemDecorator>
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Card>
              </Grid>
            ))}
          </Grid>
        ))}
        <Pagination pagination={pagination} />
      </Page>
    </>
  );
}
