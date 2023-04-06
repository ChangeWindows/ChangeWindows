import React from "react";

import {
  Button,
  Card,
  Container,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  ListItemDecorator,
  Typography,
} from "@mui/joy";
import { Head, Link } from "@inertiajs/react";
import Page from "../Layout/Page";
import AmaranthIcon, { aiPlus } from "@studio384/amaranth";
import { format, parseISO } from "date-fns";
import PlatformIcon from "../Components/PlatformIcon";
import Pagination from "../Components/Pagination";
import ChannelChip from "../Components/ChannelChip";
import Toolbar from "../Components/Toolbar";

export default function Index({ can, timeline, pagination }) {
  return (
    <>
      <Head title="Joy" />
      <Page>
        <Toolbar title="Flights">
          {can.flights.create && (
            <Button
              component={Link}
              startDecorator={<AmaranthIcon icon={aiPlus} />}
              href={route("admin.flights.create")}
              sx={{
                "--Button-minHeight": "2rem",
              }}
            >
              Add
            </Button>
          )}
        </Toolbar>

        <Container>
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
                              <ChannelChip channel={flight.release_channel} />
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
        </Container>
        <Pagination pagination={pagination} />
      </Page>
    </>
  );
}
